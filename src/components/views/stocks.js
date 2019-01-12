import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

import pageLoading from '../../images/pageload.gif';

import { CarListView } from './car_lists';

class Stocks extends Component {

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	render() {

		const {stocks, isLoading} = this.props;
		let stocksItems = "";

		const noVehiclesHtml = <div className="mb-4">
			<div className="alert alert-info car_select_error text-center mb-2">No Vehicles Found</div>
			<p>Ooops, it seems that what you're looking for is currently unavailable. Don't lose hope as we have multiple branches and partner companies across the UAE that will arrange and provide you with your dream car.</p>
			<p>Take the first step by clicking on the button below.</p>
			<div><Link to="/contact-us" className="tec-button">Inquire Now</Link></div>
		</div>;

		if (stocks.length > 0) {
			stocksItems = stocks.map((stocksItem, index) =>
				<div key={index}>
					<Link to={{
						pathname: "/listings/" + stocksItem.slug,
						state: {
							carname: stocksItem.title.rendered,
							carprice: stocksItem.post_meta_fields.sale_price && stocksItem.post_meta_fields.sale_price[0] !== "" ? stocksItem.post_meta_fields.sale_price[0] : stocksItem.post_meta_fields.car_price[0],
							exteriorColor: stocksItem.post_meta_fields['exterior-color'][0]
						}
					}}>
						<CarListView carDetails={stocksItem} />
					</Link>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="car_item_container">
					{stocksItems}
				</div>
				{isLoading ? (<div className="pageloading"><img src={pageLoading} className="img-fluid"/></div>) : stocks.length === 0 ? noVehiclesHtml : ""}
			</div>
		)
	}
}

export default Stocks;