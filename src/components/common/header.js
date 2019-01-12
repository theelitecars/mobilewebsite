import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";

/*Image import*/
import logo from '../../images/the-elite-cars-logo.png';
import stocksImage from '../../images/stocks.png';
import sellYourCarImage from '../../images/sell_your_car.png';
import offersImage from '../../images/offers.png';
import exportImage from '../../images/export.png';

const stocks = {
	backgroundImage: `url(${stocksImage})`
}

const sellYourCar = {
	backgroundImage: `url(${sellYourCarImage})`
}

const offers = {
	backgroundImage: `url(${offersImage})`
}

const exportCar = {
	backgroundImage: `url(${exportImage})`
}

class Header extends Component {
	render() {
		return (
			<header>
				<div className="top_header">
					<div className="container-fluid">
						<button className="menu_button" onMouseDown={this.props.handleMenuButton}><i className="material-icons">menu</i></button>
						<img src={logo} className="img-fluid logo" alt="The Elite Cars Logo" />
						<a href="" className="call_button"><i className="material-icons">call</i></a>
					</div>
				</div>
				<div className="bottom_header">
					<div className="container">
						<NavLink to="/pre-owned-used-approved-cars-dubai" style={stocks}>Our Stocks</NavLink>
						<NavLink to="/used-cars-promotion-and-offer-in-dubai" style={offers}>Our Offers</NavLink>
						<NavLink to="/sell-your-car" style={sellYourCar}>Sell Your Car</NavLink>
						<NavLink to="/import-export" style={exportCar}>Export</NavLink>
					</div>
				</div>
			</header>
		)
	}
}

export default Header;