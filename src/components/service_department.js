import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/service_department.jpg';

class ServiceDepartment extends Component {
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
			<div className="service_page">
				<h1>Service Department</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="Service Department" title="Service Department" />
					<p>At The Elite Cars, we don’t just sell cars. Our partner company, Elite Motors Services, offers a range of services including maintenance, repair and valet services. Hence, you will never have to experience the hassle of searching all over Dubai for a reliable car service center that specializes in luxury cars.</p>
					<p>Based at the same location as The Elite Cars, you will find Elite Motors Services as a convenient place to have your prized possession serviced or repaired.</p>
					<p>They specialize in the following:</p>
					<div className="dropdown_group">
						<div className="dropdown_item">
							<div className="di_toggler one" onClick={this.handleDropDownToggle}>
								<h2>Full Detailing & Valeting</h2>
							</div>
							<div className="di_content">
								<p>Full detailing is designed to restore the showroom-look of your vehicle both in the interior and exterior while improving its value and increasing your pride of ownership. This service encompasses the following:</p>
								<ul>
									<li>Eliminating bad odors in the interior</li>
									<li>Deep cleaning of seats, surfaces and interior components</li>
									<li>Fixing sticky buttons</li>
									<li>Keeping the body panels lustrous and shiny</li>
									<li>Wheels and tires cleaning</li>
									<li>Headlights, taillights and exterior trim care</li>
									<li>Paint care</li>
									<li>Engine bay cleaning</li>
								</ul>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Painting Service</h2>
							</div>
							<div className="di_content">
								<p>Car painting is quite a tough and complex job, which when not done right can make the problem worse. Hence, entrusting this job to professionals rather than doing it yourself is still a better option. Our goal is to provide each car with the highest level of care and maintenance it needs to make it look brand new again and restore its market value. Included in this service are fixing dents, chips, cracks and the paint as well as painting rims and accessories with Black and Gray Edition.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Complete Auto Service</h2>
							</div>
							<div className="di_content">
								<p>To provide you with a smooth, safe, and fun driving experience, we offer a comprehensive range of maintenance services suited to your specific needs such as washing, underchassis washing, and many more. Hence, you can always ensure that your car is at its best condition all season long.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Mechanical Works</h2>
							</div>
							<div className="di_content">
								<p>Studies show that vehicle mechanical condition is one of the leading contributors to road mishaps. This is why from the smallest to the largest mechanical part, the inner workings of the vehicle must be in excellent condition. Included in our mechanical works service are the following parts:</p>
								<ul>
									<li>Engine</li>
									<li>Suspension & drive shafts</li>
									<li>Steering</li>
									<li>Gearbox & differentials</li>
									<li>Exhaust system</li>
									<li>Wheels & tires</li>
									<li>Braking system</li>
								</ul>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Car Tinting</h2>
							</div>
							<div className="di_content">
								<p>To ensure your satisfaction and comfort every time you hit the road, we use high quality HAVERKAMP tinting films available in neutral standard shades as well as in 20%, 30%, 50% and 70%, which are compliant with the Federal Traffic Law.</p>
								<h3>Here are the benefits of our service:</h3>
								<ul>
									<li>German DIN standards</li>
									<li>Shielding against UV rays</li>
									<li>Excellent glare reduction</li>
									<li>Optimum heat rejection</li>
									<li>Good light transmission & optical clarity</li>
									<li>ECool warranty</li>
								</ul>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Car Modifications (body kits)</h2>
							</div>
							<div className="di_content">
								<p>To customize the look and feel of your luxury car, we also offer a modification service exclusively for Range Rover models. We offer a wide range of body kits that will perfectly suit any model of this British make.</p>
							</div>
						</div>
					</div>
					<div className="appointment">
						<h2>Book Your Appointment Today</h2>
						<a href="tel:600-543628"><h4><i className="material-icons">call</i>CALL: 600-543628</h4></a>
						<button className="tec-button">Proceed</button>
					</div>
				</div>
			</div>
		)
	}
}

export default ServiceDepartment;