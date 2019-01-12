import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/write_your_feedback.jpg';

class WriteYourFeedback extends Component {
	render() {
		return (
			<div className="write_your_feedback_page">
				<h1>Write Your Feedback</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="The Elite Cars - Write Your Feedback" title="The Elite Cars - Write Your Feedback" />
					<p>Thank you for choosing The Elite Cars. It is our pleasure to provide you with the best quality of service that you deserve.</p>
					<p>Your valuable feedback will help us serve you to the highest standard and we will ensure confidentiality of all your information at all times. If in case you wish to have your feedback live for public view in the future, tick the corresponding option provided in the box below.</p>
					<div className="form_container">
						<form method="POST">
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" required="required" onChange={this.handleFirstName} />
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="first_name" required="required" />
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="first_name" required="required" />
							</div>
							<div className="form_item">
								<label>Mobile Number</label>
								<input type="tel" name="first_name" />
							</div>
							<div className="form_item">
								<label>My Feedback is About *</label>
								<div className="radio_group">
									<label className="radio"><input type="radio" name="feedback_about" /><span>Compliment</span></label>
									<label className="radio"><input type="radio" name="feedback_about" /><span>Query</span></label>
									<label className="radio"><input type="radio" name="feedback_about" /><span>Testimonial</span></label>
									<label className="radio"><input type="radio" name="feedback_about" /><span>Suggestion</span></label>
									<label className="radio"><input type="radio" name="feedback_about" /><span>Concern</span></label>
								</div>
							</div>
							<div className="form_item">
								<label>Make My Review Public *</label>
								<div className="radio_group">
									<label className="radio"><input type="radio" name="is_public" /><span>Yes</span></label>
									<label className="radio"><input type="radio" name="is_public" /><span>No</span></label>
								</div>
							</div>
							<div className="form_item">
								<label>Message *</label>
								<textarea></textarea>
							</div>
							<div className="form_item">
								<button type="submit" className="tec-button">Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default WriteYourFeedback;