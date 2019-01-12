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

		console.log(isLoading);

		return (
			<div className="container">
				<div className="car_item_container">
					{stocksItems}
				</div>
				{isLoading ? (<div className="pageloading"><img src={pageLoading} className="img-fluid"/></div>) : ""}
			</div>
		)
	}
}

export default Stocks;