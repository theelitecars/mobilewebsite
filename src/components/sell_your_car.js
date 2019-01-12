import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class SellYourCar extends Component {
	render() {
		return (
			<div className="sell_your_car_page">
				<h1>Sell Your Car</h1>
				<div className="container">
					<iframe src="https://www.youtube.com/embed/FBw94hg8sto" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
					<p>We will buy your car within 3 minutes!. Let’s get started by telling us something about it below.</p>
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