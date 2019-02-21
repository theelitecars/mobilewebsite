import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import headerImage from '../images/spare_parts_department.jpg';

class SparePartsDepartment extends Component {
	render() {
		return (
			<div className="service_page">
				<Helmet>

					<title>Spare Parts Department  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Elite International Motors Elite International Motors, one of our partner companies, specializes in genuine, OEM, and aftermarket spare parts &amp; accessories solely for Jaguar and Land Rover vehicles. Setting them apart from the competition is their over 150,000 items in stock. Hence, they can meet the demands of even the..."/>
					<link rel="canonical" href="https://theelitecars.com/spare-parts-department/" />

					<meta name="og:title" property="og:title" content="Service Department  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Elite International Motors Elite International Motors, one of our partner companies, specializes in genuine, OEM, and aftermarket spare parts &amp; accessories solely for Jaguar and Land Rover vehicles. Setting them apart from the competition is their over 150,000 items in stock. Hence, they can meet the demands of even the..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={headerImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/spare-parts-department/" />

				</Helmet>
				
				<h1>Spare Parts Department</h1>
				<div className="container">
					<iframe src="https://www.youtube.com/embed/myLe2ce_ap8" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
					<h2>Elite International Motors</h2>
					<p>Elite International Motors, one of our partner companies, specializes in genuine, OEM, and aftermarket spare parts & accessories solely for Jaguar and Land Rover vehicles. Setting them apart from the competition is their over 150,000 items in stock. Hence, they can meet the demands of even the most discerning customers. They offer their services online, via phone, email or can be visited at their luxurious warehouse in Dubai.In efforts to expand their horizon and achieve further growth, they export their products to different parts of the world such as China, Russia, GCC (Kuwait, Saudi, UAE, Bahrain & Oman), MENA, and South Africa.</p>
					<img src={headerImage} className="img-fluid header-image" alt="Spare Parts Department" title="Spare Parts Department" />
					<div className="appointment">
						<h2>Shop Parts &amp; Accessories on Our Webstore</h2>
						<a href="http://theelitecarparts.com/" target="_blank" className="tec_button mx-auto">Take Me There</a>
					</div>
				</div>
			</div>
		)
	}
}

export default SparePartsDepartment;