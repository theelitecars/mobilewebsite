import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import headerImage from '../images/finance_insurance.jpg';

class FinanceInsurance extends Component {
	render() {
		return (
			<div className="service_page">
				<Helmet>

					<title>Finance &amp; Insurance  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Whether you are an expat who just recently relocated to the country or a local who is buying a car for the first time, we always find ways to make your dream of owning a luxury automobile possible. Here are some of the benefits of dealing with us: Low down payment..."/>
					<link rel="canonical" href="https://theelitecars.com/finance-insurance/" />

					<meta name="og:title" property="og:title" content="Finance &amp; Insurance  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Whether you are an expat who just recently relocated to the country or a local who is buying a car for the first time, we always find ways to make your dream of owning a luxury automobile possible. Here are some of the benefits of dealing with us: Low down payment..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={headerImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/finance-insurance/" />

				</Helmet>
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