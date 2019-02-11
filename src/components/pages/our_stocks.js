import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Stocks from '../views/stocks';
import SlideRight from '../web-components/slide_right';
import FilterCars from '../common/filter';

class OurStocks extends Component {

	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			perPage: 10,
			page: 1,
			totalPages: 0,
			scrolling: false,
			isLoading: true,
			filter_visible: false,
			allModels: [],
			gettingModels: false,
			filterUrl: "",
			sortUrl: "",
		}

		this.getAllStocks = this.getAllStocks.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.toggleFilter = this.toggleFilter.bind(this);
		this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
		this.handleSortSelect = this.handleSortSelect.bind(this);
	}

	getAllStocks() {
		const {allStocks, perPage, page, filterUrl, sortUrl} = this.state;

		let url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[post_status]=publish${sortUrl ? sortUrl : "&filter[orderby]=date&filter[order]=DESC"}&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][0][compare]==${filterUrl ? filterUrl : ""}`;

		if (this._isMounted) {
			this.setState({
				isLoading: true,
				noData: false,
			});
		}

		axios.get(url)
		.then((response) => {

			if (this._isMounted) {
				this.setState({
					allStocks: [...allStocks, ...response.data],
					scrolling: false,
					totalPages: response.headers["x-wp-totalpages"]
				});
			}
			
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				});
			}
		})
	}

	handleFilterSubmit(filterFields){

		let urlMetaQuery = [];
		let urlTaxQuery = [];
		let filterUrlStocks = '';
		let metaQueryCount = 1;

		if (filterFields.make && filterFields.make != 'Select A Make' && filterFields.make != 'any') {
			urlTaxQuery.push({taxonomy: 'makes_models', terms: filterFields.make, field: 'slug'})
		}

		if (filterFields.model && filterFields.model != 'Select A Model' && filterFields.model != 'any' && filterFields.make != 'Select A Make' && filterFields.make != 'any') {
			urlTaxQuery.push({taxonomy: 'makes_models', terms: filterFields.model, field: 'slug'})
		}

		if (filterFields.year && filterFields.year != 'Select A Year' && filterFields.year != 'any') {
			urlTaxQuery.push({taxonomy: 'years', terms: filterFields.year, field: 'slug'})
		}

		if (filterFields.price_range && filterFields.price_range != 'Select A Price Range' && filterFields.price_range != 'any') {
			const priceRange = JSON.parse(filterFields.price_range);
			
			if (priceRange.length === 2) {
				urlMetaQuery.push({key: 'car_price', value: filterFields.price_range, compare: 'BETWEEN', type: 'NUMERIC'})
				urlMetaQuery.push({key: 'sale_price', value: filterFields.price_range, compare: 'BETWEEN', type: 'NUMERIC'})
			} else {
				if (priceRange.length === 1 && priceRange[0] === 1500000) {
					urlMetaQuery.push({key: 'car_price', value: priceRange[0], compare: '>', type: 'NUMERIC'})
					urlMetaQuery.push({key: 'sale_price', value: priceRange[0], compare: '>', type: 'NUMERIC'})
				}
			}
		}

		if (filterFields.body_type && filterFields.body_type != 'Select A Body Type' && filterFields.body_type != 'any') {
			urlMetaQuery.push({key: 'body-type', value: filterFields.body_type, compare: '=', type: 'CHAR'})
		}

		if (filterFields.mileage && filterFields.mileage != 'Select A Mileage' && filterFields.mileage != 'any') {
			const mileage = JSON.parse(filterFields.mileage);
			
			if (mileage.length === 2) {
				urlMetaQuery.push({key: 'kilometers', value: filterFields.mileage, compare: 'BETWEEN', type: 'NUMERIC'})
			} else {
				if (mileage.length === 1 && mileage[0] === 130000) {
					urlMetaQuery.push({key: 'kilometers', value: mileage[0], compare: '>', type: 'NUMERIC'})
				}
			}
		}

		if (filterFields.exterior_color && filterFields.exterior_color != 'Select Exterior Color' && filterFields.exterior_color != 'any') {
			urlMetaQuery.push({key: 'exterior-color', value: filterFields.exterior_color, compare: '=', type: 'CHAR'})
		}

		if (filterFields.fuel_type && filterFields.fuel_type != 'Select Fuel Type' && filterFields.fuel_type != 'any') {
			urlMetaQuery.push({key: 'fuel-type', value: filterFields.fuel_type, compare: '=', type: 'CHAR'})
		}

		for (var t = 0; t < urlTaxQuery.length; t++) {
			filterUrlStocks += '&filter[tax_query]['+ t +'][taxonomy]='+ urlTaxQuery[t].taxonomy;
			filterUrlStocks += '&filter[tax_query]['+ t +'][terms]='+ urlTaxQuery[t].terms;
			filterUrlStocks += '&filter[tax_query]['+ t +'][field]='+ urlTaxQuery[t].field;
		}

		for (var m = 0; m < urlMetaQuery.length; m++) {
			filterUrlStocks += '&filter[meta_query]['+ metaQueryCount +'][key]='+ urlMetaQuery[m].key;
			filterUrlStocks += '&filter[meta_query]['+ metaQueryCount +'][value]='+ urlMetaQuery[m].value;
			filterUrlStocks += '&filter[meta_query]['+ metaQueryCount +'][compare]='+ urlMetaQuery[m].compare;
			filterUrlStocks += '&filter[meta_query]['+ metaQueryCount +'][type]='+ urlMetaQuery[m].type;
			metaQueryCount++;
		}

		if (this._isMounted) {
			this.setState((prevState, props) => ({
				filterUrl: "" + filterUrlStocks,
				perPage: 10,
				page: 1,
				allStocks: [],
				filter_visible: false
			}), this.getAllStocks);	

		}
	}

	handleSortSelect(event) {
		let sortUrl = '';

		switch(event.target.value * 1) {
			case 1: 
				sortUrl = "&filter[orderby]=date&filter[order]=DESC";
			break;
			case 2: 
				sortUrl = "&filter[orderby]=date&filter[order]=ASC";
			break;
			case 3: 
				sortUrl = "&filter[orderby]=meta_value_num&filter[order]=DESC&filter[meta_key]=common_price";
			break;
			case 4: 
				sortUrl = "&filter[orderby]=meta_value_num&filter[order]=ASC&filter[meta_key]=common_price";
			break;
		}

		if (this._isMounted) {
			this.setState({
				sortUrl: sortUrl,
				perPage: 10,
				page: 1,
				allStocks: [],
			}, this.getAllStocks);		
		}

	}

	loadMore() {
		if (this._isMounted) {
			this.setState((prevState, props) => ({
				page: prevState.page + 1,
				scrolling: true,
				isLoading: true,
			}), this.getAllStocks);		
		}
	}

	handleScroll() {
		const { page, totalPages, scrolling } = this.state;
		if (scrolling) return
		if (page >= totalPages) return
		const lastCarItem = document.querySelector('.car_item_container > div:last-child');
		const lastCarItemOffset = (lastCarItem ? lastCarItem.offsetTop + lastCarItem.clientHeight : 0);
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastCarItemOffset - bottomOffset) this.loadMore()
	}

	toggleFilter() {
		const {filter_visible} = this.state;

		if (filter_visible) {
			this.setState({
				filter_visible: false
			})
		} else {
			this.setState({
				filter_visible: true
			})
		}
	}

	componentDidMount() {
		this._isMounted = true;
		if (typeof this.props.location.state != 'undefined') {
			this.handleFilterSubmit(this.props.location.state);
		} else {
			this.getAllStocks();	
		}

		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})
	}

	componentWillUnmount() {
		this.setState({
			allStocks: [],
			perPage: 10,
			page: 1,
			totalPages: 0,
			scrolling: false,
			isLoading: true,
			filter_visible: false,
			allModels: [],
			gettingModels: false,
			filterFields: {},
			filterUrl: "",
		});

		window.removeEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = false;
	}

	render() {
		const {filter_visible, noData, allStocks, isLoading} = this.state;
		const {location} = this.props;
		let all_makes_models = JSON.parse(localStorage.getItem('all_makes_models'));

		return (
			<div className="our_stocks">
				<Helmet>
					<title>The Elite Cars | New &amp; Used Cars in Dubai | Best Price | Used Cars for sale in Dubai</title>
					<meta name="description" content="New &amp; Used Cars in Dubai, New and used Cars for sale in Dubai approved used cars e.g. Ferrari, Porsche, Land Rover, Range Rover, Mercedes, Jaguar, BMW, etc"/>
					<link rel="canonical" href="https://theelitecars.com/pre-owned-used-approved-cars-dubai/" />
				</Helmet>
				<h1>Our Latest Stocks</h1>
				<div className="sort_filter">
					<div className="sort">
						<select name="sort_cars" onChange={this.handleSortSelect} >
							<option>Sort By</option>
							<option value="1">Newest to Oldest Stocks</option>
							<option value="2">Oldest to Newest Stocks</option>
							<option value="3">Highest to Lowest Price</option>
							<option value="4">Lowest to Highest Price</option>
						</select>
						<i className="material-icons">sort</i>
					</div>	
					<div className="filter" onMouseDown={this.toggleFilter}>
						<span>Filter</span>
						<i className="material-icons">filter_list</i>
					</div>	
				</div>
				
				<Stocks stocks={allStocks} isLoading={isLoading} />
				<SlideRight 
					title="Filter Vehicles"
					toggle={this.toggleFilter}
					slideRight={filter_visible}>
					<FilterCars filterSubmit={this.handleFilterSubmit} />
				</SlideRight>
			</div>
		)
	}
}

export default OurStocks;