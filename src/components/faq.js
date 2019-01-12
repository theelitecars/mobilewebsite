import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class Faq extends Component {
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
			<div className="sell_your_car_page faq">
				<h1>FAQ's</h1>
				<div className="container">
					<div className="dropdown_group">
						<div className="dropdown_item">
							<div className="di_toggler one" onClick={this.handleDropDownToggle}>
								<h2>What’s the process in selling a car to you?</h2>
							</div>
							<div className="di_content">
								<p>Visit the 'How It Works' page to get a complete picture of the entire process, which involves three quick and simple steps:</p>
								<ul>
									<li><strong>Step 1:</strong> Provide complete and correct details of your car on our free online car evaluation form and book an appointment.</li>
									<li><strong>Step 2:</strong> Bring your car to our showroom for inspection and valuation. Next, get an amazing cash offer in no time.</li>
								</ul>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Why is The Elite Cars a good place to sell my car?</h2>
							</div>
							<div className="di_content">
								<p>There are several reasons why we are the perfect place to sell your prized possession. To sum them up, we handle all the legwork related to the process and offer the most competitive price in the market. Hence, selling your beloved car will be a pleasurable experience.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>What do I have to bring for the inspection?</h2>
							</div>
							<div className="di_content">
								<p>Please don't forget to bring your Emirates ID, driving license, registration card, and car keys.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Do you purchase a car with outstanding finance?</h2>
							</div>
							<div className="di_content">
								<p>Of course, we do. We will arrange any outstanding finance on your car, but we will require you to provide a letter which details a current settlement figure from your finance company. The amount of the settlement will be deducted from the cash offer for your car.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>How long will it take to sell my car to you?</h2>
							</div>
							<div className="di_content">
								<p>The minimum time to get your car sold is within 24 hours. However, this will depend on certain factors such as the car’s condition, outstanding bank finance, approvals, etc.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>How long will it take to get my payment and how will I get paid? </h2>
							</div>
							<div className="di_content">
								<p>We will pay you as soon as your car gets sold, which usually takes within 24 hours only. Among the secured payment options we offer are cash, bank transfer, and manager’s cheque.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>I'm having issues with your website. What should I do?</h2>
							</div>
							<div className="di_content">
								<p>This happens rarely. However, in the event that you experience a technical glitch, please contact us on <a href="tel:+97143212290">+971 4321 2290</a>.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>My car is worth more than your offer. Do you offer another option on how I can get a favorable resale value?</h2>
							</div>
							<div className="di_content">
								<p>No worries. We offer a consignment option which enables you to display your car at our showroom for a mutually agreed period. With our high marketing efforts, your car will gain more exposure among potential buyers and you will find better selling opportunities.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Can I sell an import car?</h2>
							</div>
							<div className="di_content">
								<p>No, we don't buy import cars.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>What if my car is registered outside the UAE? Are you going to buy it?</h2>
							</div>
							<div className="di_content">
								<p>Yes, we will buy your car provided that it was registered in any GCC country.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Is it possible to sell a car in behalf of my family member or friend?</h2>
							</div>
							<div className="di_content">
								<p>Unfortunately, as part of our Standard Operating Procedures (SOP), we don’t accept representative sellers. The owner of the car must personally sell his/her car to us.</p>
							</div>
						</div>
						<div className="dropdown_item">
							<div className="di_toggler two" onClick={this.handleDropDownToggle}>
								<h2>Is it possible to sell a car in behalf of a company?</h2>
							</div>
							<div className="di_content">
								<p>Yes, provided that you have authorization from your company. We will also require you to provide the following documents:</p>
								<ul>
									<li>A government-issued ID</li>
									<li>An authorization letter signed and stamped by the company’s authorized signatory on the corporate letterhead.</li>
									<li>Bank account details of the company</li>
									<li>Company trade license</li>
									<li>Key, service history book and registration card</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Faq;