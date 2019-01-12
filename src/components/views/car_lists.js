import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

import './css/car_lists.scss';

const formatPrice = (price) => {
	return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
}

export class CarListViewMinified extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {carDetails} = this.props;

		return (
			<div className="car_list_view_minified">
				<div className="cl_image">
					<img src={carDetails.gallery_images[0]} className="img-fluid" alt={carDetails.title.rendered} />
				</div>
				<div className="cl_details">
					<h3>{carDetails.title.rendered}</h3>
					{carDetails.post_meta_fields.sale_price && carDetails.post_meta_fields.sale_price[0] !== "" ? (
						<div className="ci-price">
							<span className="sale-price">AED {formatPrice(parseFloat(carDetails.post_meta_fields.car_price[0]))}</span>
							<span className="car-price">AED {formatPrice(parseFloat(carDetails.post_meta_fields.sale_price[0]))}</span>
						</div>
					) : (
						<div className="ci-price">
							<span className="car-price">AED {formatPrice(parseFloat(carDetails.post_meta_fields.car_price[0]))}</span>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export class CarListView extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {carDetails} = this.props;
		return(
			<div className="car_list_view">
				<div className="cl-image">
					<img src={carDetails.gallery_images[0]} className="img-fluid" alt={carDetails.title.rendered} />
					{carDetails.post_meta_fields.car_sold[0] == 1 ? (
						<div className="sold_badge">
							<span>Sold</span>
						</div>
					) : (
						carDetails.listing_status.badge_text  ? (
							<div className="angle_badge reserved">
								<span>Reserved</span>
							</div>
						) : (
							carDetails.post_meta_fields.sale_price ? (
								<div className="angle_badge special-offer">
									<span>Special Offer</span>
								</div>
							) : (
								''
							)
						)
					)}
				</div>
				<h3>{carDetails.title.rendered}</h3>
				{carDetails.post_meta_fields.sale_price && carDetails.post_meta_fields.sale_price[0] !== "" ? (
					<div className="cl-price">
						<span className="car-price">AED {formatPrice(parseInt(carDetails.post_meta_fields.sale_price[0]))}</span>
						<span className="sale-price">AED {formatPrice(parseInt(carDetails.post_meta_fields.car_price[0]))}</span>
					</div>
				) : (
					<div className="cl-price">
						<span className="car-price">AED {formatPrice(parseInt(carDetails.post_meta_fields.car_price[0]))}</span>
					</div>
				)}
			</div>
		)
	}
}

export class CarListViewLoading extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {items} = this.props;

		return(
			<div className="car_loading">
				<div className="cl-image"></div>
				<div className="cl-title"></div>
				<div className="cl-price"></div>
			</div>
		)
	}
}