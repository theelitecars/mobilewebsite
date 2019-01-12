import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class Export extends Component {
	render() {
		return (
			<div className="export_page">
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