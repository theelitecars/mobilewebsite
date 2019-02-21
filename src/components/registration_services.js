import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import headerImage from '../images/registration_services.jpg';

class RegistrationServices extends Component {
	render() {
		return (
			<div className="service_page">
				<Helmet>

					<title>Registration Services  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="It can be a lengthy process with the documents going back and forth. Hence, we cater to UAE-based clients by providing express registration service and doing all the legwork when it comes to approvals. All you have to do is sit back, relax, and enjoy at our luxurious facilities until the..."/>
					<link rel="canonical" href="https://theelitecars.com/registration-services/" />

					<meta name="og:title" property="og:title" content="Registration Services  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="It can be a lengthy process with the documents going back and forth. Hence, we cater to UAE-based clients by providing express registration service and doing all the legwork when it comes to approvals. All you have to do is sit back, relax, and enjoy at our luxurious facilities until the..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={headerImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/registration-services/" />

				</Helmet>
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