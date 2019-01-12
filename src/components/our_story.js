import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/our_story.jpg';

class OurStory extends Component {
	render() {
		return (
			<div className="about_us">
				<h1>Our Story</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="About Us - Our Story" title="About Us - Our Story" />
					<p>Shortly after its establishment in Dubai, The Elite Cars has gained a phenomenal reputation which catapulted us to become one of the fastest growing luxury car dealerships in the region. The outstanding quality of our products, competitive market prices, world-class customer service, and strong international presence have paved the way for us to become a force to be reckoned with.</p>
					<p>One of the key factors that enabled us to achieve this milestone is the prowess and passion of our founders. Originating from multicultural backgrounds and with a number of talents to bring to the table, their mission is to dominate the motoring industry through devising revolutionary approaches and strategies in the business.</p>
					<p>To date, we have multiple showroom locations in the country and had recently launched our Posh Lounge on Sheikh Zayed Road, which houses the most iconic collection of supercars, hypercars, exotic cars, and luxury cars from different marques. Hence, we offer nothing but the widest variety of options to suit every customer’s taste, lifestyle and budget.</p>
					<p>To create a distinction in the competition, we want to be known as an organization that not only sells iconic cars, but a place where dream-come-true moments are made and the journey to pleasurable road trips begin.</p>
					<p>Visit us and discover the <em>True Definition of Luxury</em>.</p>
				</div>
			</div>
		)
	}
}

export default OurStory;