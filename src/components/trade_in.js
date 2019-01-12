import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class TradeIn extends Component {
	render() {
		return (
			<div className="sell_your_car_page">
				<h1>Trade-In</h1>
				<div className="container">
					<p>Want to take your drives to the next level? Here at The Elite Cars, you can upgrade your car to any luxury brand and model of your choice.</p>
					<p>Take your pick from our wide collection of iconic cars under one roof that will suit your taste, lifestyle and budget.Your satisfaction as our valued customer is our key priority, so we ensure to provide an honest and accurate car valuation. Hence, you can rest assured to enjoy an easy and convenient car upgrade.</p>
					<p>Know the value of your car. Speak to our friendly sales executives today!</p>
					<h2>Why Trade-In Your Car to Us?</h2>
					<ul>
						<li>Get an honest and accurate valuation</li>
						<li>Over 400 luxury cars in stock</li>
						<li>Strong international presence</li>
						<li>We do all the legwork concerning approvals</li>
						<li>We offer quick and smooth bank loan settlement</li>
						<li>Proven track record in the industry</li>
						<li>Thousands of happy customers worldwide</li>
						<li>In-house team of valuation experts specializing in luxury cars</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default TradeIn;