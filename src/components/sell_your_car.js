import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import slideHeaderImage from '../images/menu_header.jpg';

class SellYourCar extends Component {
	render() {
		return (
			<div className="sell_your_car_page">
				<Helmet>

					<title>Sell Your Car - The Elite Cars | The True Definition of Luxury</title>
					<link rel="canonical" href="https://theelitecars.com/sell-your-car/" />

					<meta name="og:title" property="og:title" content="Sell Your Car - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/sell-your-car/" />

				</Helmet>
				<h1>Sell Your Car</h1>
				<div className="container">
					<iframe src="https://www.youtube.com/embed/FBw94hg8sto" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
					<p>We will buy your car within 3 minutes!. Let's get started by clicking the button below.</p>
					<div><Link to="/sell-your-car/steps" className="tec_button mx-auto">Start Selling Your Car Today!</Link></div>
					<h2 className="mt-4">Why Sell Your Car To Us?</h2>
					<ul>
						<li>In-house team of valuation experts specializing in luxury cars</li>
						<li>Get an honest and accurate valuation</li>
						<li>Get paid in no time</li>
						<li>Thousands of happy customers worldwide</li>
						<li>Proven track record in the industry</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default SellYourCar;