import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/meet_our_team.jpg';

class MeetOurTeam extends Component {
	constructor(props) {
		super(props);
		this.handleDropDownToggle = this.handleDropDownToggle.bind(this);
	}

	handleDropDownToggle(event) {
		const dropdownItems = event.currentTarget;
		const content = dropdownItems.nextElementSibling;
		const parent = dropdownItems.parentElement;

		if (content.style.display === "block" ) {
			parent.classList.remove("di_show");
			content.style.display = "none";
		} else {
			parent.classList.add("di_show");
			content.style.display = "block";
		}
	}
	render() {
		return (
			<div className="about_us">
				<h1>Meet Our Team</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="About Us - Meet Our Team" title="About Us - Meet Our Team" />
					<p>As a Group, we embrace and celebrate cultural diversity at its finest. This is evident in our multicultural staff that work together in harmony towards achieving corporate growth and meeting overall business objectives.</p>
					<p>Here are the different teams that serve as the backbone of our organization and are always at your service:</p>
					<div className="dropdown_group">
						<div className="dropdown_item">
							<div className="di_toggler one" onClick={this.handleDropDownToggle}>
								<h2>Administration Department</h2>
							</div>
							<div className="di_content">
								<p>Our administration specialists serve as the backbone of our organization by ensuring the smooth flow of information from one part to another. For any concerns or assistance, you can reach our professionals at <a href="mailto:info@theelitecars.com">info@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Customer Service Department</h2>
							</div>
							<div className="di_content">
								<p>Our customer service specialists play an integral role when it comes to establishing a strong client base and enriching customers' satisfaction. Get in touch with them by sending a message to <a href="mailto:customer-care@theelitecars.com">customer-care@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Finance And Insurance Department</h2>
							</div>
							<div className="di_content">
								<p>Our talented financial advisors make car shopping a smooth and stress-free experience. To understand more about our banks and insurance providers, speak to our experts by sending a message to <a href="mailto:finance@theelitecars.com">finance@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Human Resource Department</h2>
							</div>
							<div className="di_content">
								<p>Our HR specialists promote an amicable company culture. For any employment-related inquiries or assistance, send a message to <a href="mailto:hr@theelitecars.com">hr@theelitecars.com</a> or career@theelitecars.com and our professionals will be more than happy to help you.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>IT Department</h2>
							</div>
							<div className="di_content">
								<p>Our tech-savvy professionals serve as the powerhouse of our organization through establishing, monitoring and maintaining information technology systems and services. Should you have any equipment supply-related proposals, please drop a mail on <a href="mailto:it.admin@theelitecars.com">it.admin@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Marketing Department</h2>
							</div>
							<div className="di_content">
								<p>The most dynamic and diverse among all our departments, this serves as the voice of our brand. Speak to our creative minds for any marketing proposals or project collaboration by sending an email to <a href="mailto:marketing@theelitecars.com">marketing@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Operations Department</h2>
							</div>
							<div className="di_content">
								<p>Comprising of proactive and highly reliable professionals, this department is responsible for receiving cars at the showroom until they are delivered to the customer. For any inquiries and/or concerns regarding the status of your car, please drop a mail on <a href="mailto:operations@theelitecars.com">operations@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Sales Department</h2>
							</div>
							<div className="di_content">
								<p>Originating from diverse cultural backgrounds, our sales executives walk you through the entire car buying process from the moment you arrive at our showroom until you drive home your car. Whether you are interested in any of the models in our collection or want to avail our latest deals or promotions, get in touch with our friendly and knowledgeable professionals by sending an email to <a href="sales@theelitecars.com">sales@theelitecars.com</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Service Department</h2>
							</div>
							<div className="di_content">
								<p>A team of qualified and experienced mechanics specializing in luxury cars, this department aims to enrich your car ownership experience through providing superior car care, maintenance, repair, and customization services. Get in touch with our friendly and reliable experts today by sending an email to <a href="service@theelitecars.com">service@theelitecars.com</a>.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MeetOurTeam;