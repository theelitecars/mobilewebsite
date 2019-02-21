import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import headerImage from '../images/aftersales_support.jpg';

class AftersalesSupport extends Component {
	render() {
		return (
			<div className="service_page">
				<Helmet>

					<title>Aftersales Support  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="We value your car ownership experience, so you can always count on us when any issue related to your purchase arises. To ensure your satisfaction at all times, we have a team of dedicated aftersales experts who are adept in handling all customer care-related services which include inquiries, concerns and..."/>
					<link rel="canonical" href="https://theelitecars.com/after-sales-support/" />

					<meta name="og:title" property="og:title" content="Aftersales Support  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="We value your car ownership experience, so you can always count on us when any issue related to your purchase arises. To ensure your satisfaction at all times, we have a team of dedicated aftersales experts who are adept in handling all customer care-related services which include inquiries, concerns and..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={headerImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/after-sales-support/" />

				</Helmet>
				<h1>Aftersales Support</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="Finance And Insurance" title="Finance And Insurance" />
					<p>We value your car ownership experience, so you can always count on us when any issue related to your purchase arises. To ensure your satisfaction at all times, we have a team of dedicated aftersales experts who are adept in handling all customer care-related services which include inquiries, concerns and complaints.</p>
					<p>You can reach them at:</p>
					<ul className="list-unstyled">
						<li><strong>Email: </strong><a href="mailto:customer-care@theelitecars.com">customer-care@theelitecars.com</a></li>
						<li><strong>Within the UAE: </strong><a href="tel:600543628">600 543628</a></li>
						<li><strong>Outside the UAE: </strong><a href="tel:+97143212290">+971 4321 2290</a></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default AftersalesSupport;