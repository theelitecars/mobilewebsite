import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/spare_parts_department.jpg';

class SparePartsDepartment extends Component {
	render() {
		return (
			<div className="service_page">
				<h1>Spare Parts Department</h1>
				<div className="container">
					<iframe src="https://www.youtube.com/embed/myLe2ce_ap8" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
					<h2>Elite International Motors</h2>
					<p>Elite International Motors, one of our partner companies, specializes in genuine, OEM, and aftermarket spare parts & accessories solely for Jaguar and Land Rover vehicles. Setting them apart from the competition is their over 150,000 items in stock. Hence, they can meet the demands of even the most discerning customers. They offer their services online, via phone, email or can be visited at their luxurious warehouse in Dubai.In efforts to expand their horizon and achieve further growth, they export their products to different parts of the world such as China, Russia, GCC (Kuwait, Saudi, UAE, Bahrain & Oman), MENA, and South Africa.</p>
					<img src={headerImage} className="img-fluid header-image" alt="Spare Parts Department" title="Spare Parts Department" />
					<div className="appointment">
						<h2>Shop Parts &amp; Accessories on Our Webstore</h2>
						<button className="tec-button">Take Me There</button>
					</div>
				</div>
			</div>
		)
	}
}

export default SparePartsDepartment;