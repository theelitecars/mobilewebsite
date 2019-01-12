import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Stocks from '../views/stocks';
import FilterSlide from '../filter';
import ModalBg from '../modal_bg';


class FilterGetMake extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const makeLength = this.props.carMakes.length;

		return (
			<select name="make" onChange={this.props.getMakeId} disabled={makeLength > 0 ? "" : "disabled"} value={this.props.value}>
				<option>Select A Make</option>
				{
					this.props.carMakes.map((makehtml, index) =>
						<option key={index} value={makehtml.slug} data-makeid={makehtml.id}>{makehtml.name}</option>
					)
				}
			</select>
		)
	}

}

class FilterGetModels extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const modelLength = this.props.carModels.length;
		return (
			<select name="model" onChange={this.props.handleChange} disabled={!this.props.gettingModels && modelLength > 0 ? "" : "disabled"} value={this.props.value}>
				<option>{this.props.gettingModels ? "Getting Models ..." : "Select A Model"}</option>
				{
					this.props.carModels.map((modelhtml, index) =>
						<option key={index} value={modelhtml.slug} data-makeid={modelhtml.id}>{modelhtml.name}</option>
					)
				}
			</select>
		)
	}

}

class FilterGetYear extends Component {
	render() {

		const dateToday = new Date();
		const maxYear = dateToday.getFullYear();
		const minYear = 2000;
		let yearList = "";

		let allYears = [];

		for(let y = maxYear; y >= minYear; y--) {
			allYears.push(y);
		}

		if (allYears.length > 0) {
			yearList = allYears.map((y) => {return(<option key={y} value={y}>{y}</option>)});
		}

		return (
			<select name="year" value={this.props.value} onChange={this.props.handleChange}>
				<option>Select A Year</option>
				<option value="any">Any</option>
				{yearList}
			</select>
		)
	}
}

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
			filterFields: {},
			filterUrl: "",
		}

		this.getAllStocks = this.getAllStocks.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleFilterModal = this.handleFilterModal.bind(this);
		this.toggleFilter = this.toggleFilter.bind(this);
		this.getAllModels = this.getAllModels.bind(this);
		this.getMakeId = this.getMakeId.bind(this);
		this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	getAllModels(makeid) {

		const url = `https://theelitecars.com/wp-json/wp/v2/makes_models?parent=${makeid}&per_page=100`;

		this.setState({
			allModels: [],
			gettingModels: true,
		})

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					allModels: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					gettingModels: false,
				});
			}
		})
	}

	/* Also Handling Make Value */
	getMakeId(event) {
		const makeid = event.target[event.target.selectedIndex].getAttribute('data-makeid');
		let filterFields = this.state.filterFields;
		filterFields[event.target.name] = event.target.value;
		filterFields['model'] = "";

		if (makeid) {
			this.getAllModels(makeid);
			this.setState({
				filterFields
			})
		} else {
			this.setState({
				allModels: []
			})
		}
	}

	handleChange(event) {
		let filterFields = this.state.filterFields;
		filterFields[event.target.name] = event.target.value;

		this.setState({
			filterFields
		})
	}

	getAllStocks() {
		const {allStocks, perPage, page, filterUrl} = this.state;

		let url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][0][compare]==${filterUrl ? filterUrl : ""}`;

		if (this._isMounted) {
			this.setState({
				isLoading: true,
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

	handleFilterSubmit(e) {
		e.preventDefault();

		let urlMetaQuery = [];
		let urlTaxQuery = [];
		let filterUrlStocks = '';
		let metaQueryCount = 1;

		const {filterFields} = this.state;

		if (filterFields.make && filterFields.make != 'Select A Make') {
			urlTaxQuery.push({taxonomy: 'makes_models', terms: filterFields.make, field: 'slug'})
		}

		if (filterFields.model && filterFields.model != 'Select A Model' && filterFields.make != 'Select A Make') {
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

	handleFilterModal() {
		this.toggleFilter();
	}

	toggleFilter() {
		this.setState((prevState, props) => ({
			filter_visible: !this.state.filter_visible
		}));
	}

	componentDidMount() {
		this.getAllStocks();
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = true;
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
		return (
			<div className="our_stocks">
				<Helmet>
					<title>The Elite Cars | New &amp; Used Cars in Dubai | Best Price | Used Cars for sale in Dubai</title>
					<meta name="description" content="New &amp; Used Cars in Dubai, New and used Cars for sale in Dubai approved used cars e.g. Ferrari, Porsche, Land Rover, Range Rover, Mercedes, Jaguar, BMW, etc"/>
					<link rel="canonical" href="https://theelitecars.com/pre-owned-used-approved-cars-dubai/" />
				</Helmet>
				<h1>Our Latest Stocks</h1>
				<div className="os_filter" onMouseDown={this.handleFilterModal}><span>Filter Vehicle Stocks</span> <i className="material-icons">filter_list</i></div>
				<Stocks stocks={this.state.allStocks} isLoading={this.state.isLoading} />
				<FilterSlide filterVisibility={this.state.filter_visible} handleFilterModal={this.handleFilterModal}>
					<form method="POST" onSubmit={this.handleFilterSubmit}>
						<div className="form_item">
							<FilterGetMake carMakes={this.props.carMakes} getMakeId={this.getMakeId} value={this.state.filterFields.make || ''} />
						</div>
						<div className="form_item">
							<FilterGetModels carModels={this.state.allModels} handleChange={this.handleChange} gettingModels={this.state.gettingModels} value={this.state.filterFields.model || ''} />
						</div>
						<div className="form_item">
							<FilterGetYear value={this.state.filterFields.year || ''} handleChange={this.handleChange} />
						</div>
						<div className="form_item">
							<select name="price_range" value={this.state.filterFields.price_range || ''} onChange={this.handleChange}>
								<option>Select A Price Range</option>
								<option value="any">Any</option>
								<option value="[10000,200000]">AED 10k - 200k</option>
								<option value="[200000,400000]">AED 200k - 400k</option>
								<option value="[400000,700000]">AED 400k - 700k</option>
								<option value="[700000,1000000]">AED 700k - 1M</option>
								<option value="[1000000,1500000]">AED 1M - 1.5M</option>
								<option value="[1500000]">AED 1.5M+</option>
							</select>
						</div>
						<div className="form_item">
							<select name="body_type" value={this.state.filterFields.body_type || ''} onChange={this.handleChange}>
								<option>Select A Body Type</option>
								<option value="any">Any</option>
								<option value="convertible">Convertible</option>
								<option value="sedan">Sedan</option>
								<option value="coupe">Coupe</option>
								<option value="hatchback">Hatchback</option>
								<option value="sports-car">Sports Car</option>
								<option value="suv">SUV</option>
								<option value="wagon">Wagon</option>
								<option value="van">Van</option>
							</select>
						</div>
						<div className="form_item">
							<select name="mileage" value={this.state.filterFields.mileage || ''} onChange={this.handleChange}>
								<option>Select A Mileage</option>
								<option value="any">Any</option>
								<option value="[0,10000]">0 - 10000</option>
								<option value="[10000,20000]">10000 - 20000</option>
								<option value="[20000,30000]">20000 - 30000</option>
								<option value="[30000,40000]">30000 - 40000</option>
								<option value="[40000,50000]">40000 - 50000</option>
								<option value="[50000,60000]">50000 - 60000</option>
								<option value="[60000,70000]">60000 - 70000</option>
								<option value="[70000,80000]">70000 - 80000</option>
								<option value="[80000,90000]">80000 - 90000</option>
								<option value="[90000,100000]">90000 - 100000</option>
								<option value="[100000,110000]">100000 - 110000</option>
								<option value="[110000,120000]">110000 - 120000</option>
								<option value="[120000,130000]">120000 - 130000</option>
								<option value="[130000]">130000+</option>
							</select>
						</div>
						<div className="form_item">
							<select name="exterior_color" value={this.state.filterFields.exterior_color || ''} onChange={this.handleChange}>
								<option>Select Exterior Color</option>
								<option value="any">Any</option>
								<option value="blue">Blue</option>
								<option value="grey">Grey</option>
								<option value="dark-grey">Dark Grey</option>
								<option value="beige">Beige</option>
								<option value="gold">Gold</option>
								<option value="violet">Violet</option>
								<option value="yellow">Yellow</option>
								<option value="black">Black</option>
								<option value="green">Green</option>
								<option value="red">Red</option>
								<option value="metallic">Metallic</option>
								<option value="silver">Silver</option>
								<option value="brown">Brown</option>
								<option value="orange-">Orange</option>
								<option value="white">White</option>
								<option value="dark-blue">Dark Blue</option>
								<option value="orange/silver">Orange/Silver</option>
								<option value="purple/black">Purple/Black</option>
								<option value="silicon-silver">Silicon Silver</option>
								<option value="yulong-white">Yulong White</option>
								<option value="kaikoura-stone">Kaikoura Stone</option>
								<option value="caviar">Caviar</option>
								<option value="purple">Purple</option>
								<option value="matte-grey">Matte Grey</option>
								<option value="matte-black">Matte Black</option>
							</select>
						</div>
						<div className="form_item">
							<select name="fuel_type" value={this.state.filterFields.fuel_type || ''} onChange={this.handleChange}>
								<option>Select Fuel Type</option>
								<option value="any">Any</option>
								<option value="gasoline">Gasoline</option>
								<option value="diesel">Diesel</option>
								<option value="hybrid">Hybrid</option>
								<option value="electric">Electric</option>
							</select>
						</div>
						<div className="form_item">
							<button type="submit" className="tec-button">Submit</button>
						</div>
					</form>
				</FilterSlide>
			</div>
		)
	}
}

export default OurStocks;