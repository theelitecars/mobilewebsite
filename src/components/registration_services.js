import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/registration_services.jpg';

class RegistrationServices extends Component {
	render() {
		return (
			<div className="service_page">
				<h1>Registration Services</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="Finance And Insurance" title="Finance And Insurance" />
					<p>It can be a lengthy process with the documents going back and forth. Hence, we cater to UAE-based clients by providing express registration service and doing all the legwork when it comes to approvals. All you have to do is sit back, relax, and enjoy at our luxurious facilities until the entire process is done.</p>
					<p>Contact us for more information about this service</p>
					<ul className="list-unstyled">
						<li><strong>Email: </strong><a href="mailto:info@theelitecars.com">info@theelitecars.com</a></li>
						<li><strong>Within the UAE: </strong><a href="tel:600543628">600 543628</a></li>
						<li><strong>Outside the UAE: </strong><a href="tel:+97143212290">+971 4321 2290</a></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default RegistrationServices;