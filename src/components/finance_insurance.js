import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/finance_insurance.jpg';

class FinanceInsurance extends Component {
	render() {
		return (
			<div className="service_page">
				<h1>Finance And Insurance</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="Finance And Insurance" title="Finance And Insurance" />
					<p>Whether you are an expat who just recently relocated to the country or a local who is buying a car for the first time, we always find ways to make your dream of owning a luxury automobile possible.Here are some of the benefits of dealing with us:</p>
					<ul>
						<li>Low down payment</li>
						<li>Listed by the most preferred banks</li>
						<li>Quick loan approval process</li>
						<li>Flexible payment scheme of up to 60 months</li>
						<li>Competitive market price</li>
						<li>Convenient and hassle-free way to pay for your purchase</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default FinanceInsurance;