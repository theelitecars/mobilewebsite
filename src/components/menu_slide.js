import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import slideHeaderImage from '../images/menu_header.jpg';

const slideHeader = {
	backgroundImage: `url(${slideHeaderImage})`
}

class MenuSlide extends Component {
	constructor(props) {
		super(props);
		this.handleMenuDropDown = this.handleMenuDropDown.bind(this);
	}

	handleMenuDropDown(event) {
		//console.log(event.target.parentElement.classList)
		const thisParentClass = event.target.parentElement;

		event.preventDefault();
		if (!thisParentClass.classList.contains("show_menu")) {
			thisParentClass.classList.add("show_menu");	
		} else {
			thisParentClass.classList.remove("show_menu");
		}
		
	}

	render() {

		var visibility = "hide";
 
	    if (this.props.menuVisibility) {
	    	visibility = "show";
	    }

		return (
			<div className={"menu-slide" + " " + visibility}>
				<div className="ms-header" style={slideHeader}>
					<button className="close-menu" onMouseDown={this.props.handleMenuButton}><i className="material-icons">close</i></button>
					<span>The Elite Cars LLC, Street 4, Al Quoz 3, Sheikh Zayed Road, Dubai UAE</span>
				</div>
				<ul className="ms-menu">
					<li className="has_children">
						<a href="#" onClick={this.handleMenuDropDown}>Sell Your Car</a>
						<ul>
							<li><NavLink to="/sell-your-car" onClick={this.props.handleMenuButton}>Sell Your Car</NavLink></li>
							<li><NavLink to="/trade-in" onClick={this.props.handleMenuButton}>Trade-In</NavLink></li>
							<li><NavLink to="/consignment" onClick={this.props.handleMenuButton}>Consignment</NavLink></li>
							<li><NavLink to="/how-it-works" onClick={this.props.handleMenuButton}>How It Works</NavLink></li>
							<li><NavLink to="/faq" onClick={this.props.handleMenuButton}>FAQ's</NavLink></li>
						</ul>
					</li>
					<li className="has_children">
						<a href="#" onClick={this.handleMenuDropDown}>Services</a>
						<ul>
							<li><NavLink to="/services/service-department" onClick={this.props.handleMenuButton}>Service Department</NavLink></li>
							<li><NavLink to="/services/spare-parts-department" onClick={this.props.handleMenuButton}>Spare Parts Department</NavLink></li>
							<li><NavLink to="/services/finance-insurance" onClick={this.props.handleMenuButton}>Finance and Insurance</NavLink></li>
							<li><NavLink to="/services/aftersales-support" onClick={this.props.handleMenuButton}>Aftersales Support</NavLink></li>
							<li><NavLink to="/services/registration-services" onClick={this.props.handleMenuButton}>Registration Services</NavLink></li>
						</ul>
					</li>
					<li className="has_children">
						<a href="#" onClick={this.handleMenuDropDown}>About Us</a>
						<ul>
							<li><NavLink to="/about-us/our-story" onClick={this.props.handleMenuButton}>Our Story</NavLink></li>
							<li><NavLink to="/about-us/meet-our-team" onClick={this.props.handleMenuButton}>Meet Our Team</NavLink></li>
						</ul>
					</li>
					<li className="has_children">
						<a href="#" onClick={this.handleMenuDropDown}>Media</a>
						<ul>
							<li><NavLink to="/video-gallery" onClick={this.props.handleMenuButton}>Video Gallery</NavLink></li>
							<li><NavLink to="/used-cars-showroom-gallery" onClick={this.props.handleMenuButton}>Social Media Gallery</NavLink></li>
						</ul>
					</li>
					<li><NavLink to="/testimonials" onClick={this.props.handleMenuButton}>Testimonials</NavLink></li>
					<li><NavLink to="/careers" onClick={this.props.handleMenuButton}>Careers</NavLink></li>
					<li><NavLink to="/write-your-feedback" onClick={this.props.handleMenuButton}>Write Your Feedback</NavLink></li>
					<li><NavLink to="/location" onClick={this.props.handleMenuButton}>Location</NavLink></li>
				</ul>
				<ul className="social_media">
					<li><a href="" className="facebook"><img src="https://img.icons8.com/material/25/ffffff/facebook-f.png" className="img-fluid" /></a></li>
					<li><a href="" className="instagram"><img src="https://img.icons8.com/material-outlined/25/ffffff/instagram-new.png" className="img-fluid" /></a></li>
					<li><a href="" className="twitter"><img src="https://img.icons8.com/material/25/ffffff/twitter-squared.png" className="img-fluid" /></a></li>
					<li><a href="" className="youtube"><img src="https://img.icons8.com/material/25/ffffff/youtube-play.png" className="img-fluid" /></a></li>
					<li><a href="" className="linkedin"><img src="https://img.icons8.com/ios-glyphs/25/ffffff/linkedin-2.png" className="img-fluid" /></a></li>
				</ul>
			</div>
		)
	}
}

export default MenuSlide;