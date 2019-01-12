import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Stocks from '../views/stocks';

class Offers extends Component {

	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			perPage: 10,
			page: 1,
			totalPages: 0,
			scrolling: false,
			isLoading: true
		}

		this.getAllStocks = this.getAllStocks.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	getAllStocks() {

		const {allStocks, perPage, page} = this.state;
		const url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][1][key]=sale_price&filter[meta_query][1][value]=0&filter[meta_query][1][compare]=>&filter[meta_query][1][type]=numeric`;

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
			isLoading: false
		});

		window.removeEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = false;
	}

	render() {
		return (
			<div className="our_stocks">
				<h1>Our Hottest Deals</h1>
				<div className="os_filter"><span>Filter Vehicle Stocks</span> <i className="material-icons">filter_list</i></div>
				<Stocks stocks={this.state.allStocks} isLoading={this.state.isLoading} />
			</div>
		)
	}
}

export default Offers;