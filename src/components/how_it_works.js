import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import step_one from '../images/step1.png';
import step_two from '../images/step2.png';

import slideHeaderImage from '../images/menu_header.jpg';

class HowItWorks extends Component {
	render() {
		return (
			<div className="sell_your_car_page how_it_works">
				<Helmet>

					<title>How It Works - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="HOW IT WORKS TELL US SOMETHING ABOUT YOUR CAR Enter correct details on the free evaluation form and book an appointment. BRING YOUR CAR AND GET YOUR CASH Let us inspect it and we&#8217;ll pay you instantly. We eliminate all the drama entailed in selling a car through our quick..."/>
					<link rel="canonical" href="https://theelitecars.com/how-it-works" />

					<meta name="og:title" property="og:title" content="How It Works - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="HOW IT WORKS TELL US SOMETHING ABOUT YOUR CAR Enter correct details on the free evaluation form and book an appointment. BRING YOUR CAR AND GET YOUR CASH Let us inspect it and we&#8217;ll pay you instantly. We eliminate all the drama entailed in selling a car through our quick..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/how-it-works" />

				</Helmet>
				<h1>How It Works</h1>
				<div className="container">
					<div className="row steps_graph mb-4">
						<div className="col-12 text-center">
							<img src={step_one} className="img-fluid" />
							<h2>TELL US SOMETHING ABOUT YOUR CAR</h2>
							<p>Enter correct details on the free evaluation form and book an appointment.</p>
						</div>
						<div className="col-12 text-center">
							<img src={step_two} className="img-fluid" />
							<h2>BRING YOUR CAR AND GET YOUR CASH</h2>
							<p>Let us inspect it and we’ll pay you instantly.</p>
						</div>
					</div>
					<p>We eliminate all the drama entailed in selling a car through our quick and simple process.</p>
					<p><strong>Step 1:</strong> Provide us with the complete and correct details of your car.</p>
					<p><strong>Step 2:</strong> Bring your car to our showroom and let our team of professionals inspect it to verify its condition. When done, get a great cash offer in just a matter of minutes.</p>
					<p>Amazing, isn’t it?</p>
					<div className="appointment">
						<h2 className="mb-3">Start Selling Your Car Today!</h2>
						<Link to="/sell-your-car/steps" className="tec_button mx-auto">Proceed</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default HowItWorks;