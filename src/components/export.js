import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import slideHeaderImage from '../images/menu_header.jpg';

class Export extends Component {
	render() {
		return (
			<div className="export_page">
				<Helmet>

					<title>Export  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Aiming to establish a strong international presence, we offer a secure and reliable export service. We make this possible through the following: Over 15 years&#8217; experience in export services Over hundreds of export deals Supported by a number of professional companies and entities worldwide dealing with freight, insurance, and customs..."/>
					<link rel="canonical" href="https://theelitecars.com/import-export-2/" />

					<meta name="og:title" property="og:title" content="Export  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Aiming to establish a strong international presence, we offer a secure and reliable export service. We make this possible through the following: Over 15 years&#8217; experience in export services Over hundreds of export deals Supported by a number of professional companies and entities worldwide dealing with freight, insurance, and customs..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/import-export-2/" />

				</Helmet>

				<h1>Export</h1>
				<div className="container">
					<iframe src="https://www.youtube.com/embed/eTpxXEZKj9s?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
					<p>Aiming to establish a strong international presence, we offer a secure and reliable export service.We make this possible through the following:</p>
					<ul>
						<li>Over 15 years’ experience in export services</li>
						<li>Over hundreds of export deals</li>
						<li>Supported by a number of professional companies and entities worldwide dealing with freight, insurance, and customs</li>
					</ul>
					<p>Whatever your chosen car from our collection, we will export it to your destination. If you are interested in any overseas business opportunities, send an email to <a href="mailto:export@theelitecars.com">export@theelitecars.com</a>.</p>
				</div>
			</div>
		)
	}
}

export default Export;