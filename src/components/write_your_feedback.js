import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import headerImage from '../images/write_your_feedback.jpg';
import pageLoading from '../images/pageload.gif';
import Modal from './web-components/modal';

class WriteYourFeedback extends Component {
	constructor(props) {
		super(props);

		this.state = {
			feedbackFields: {},
			errors: {},
			isSending: false,
			redirect: false,
			sendingError: "",
		}

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);	

	}

	handleChange(event) {
		const {feedbackFields} = this.state;
		feedbackFields[event.target.name] = event.target.value;

		this.setState({
			feedbackFields
		})
	}

	validateForm() {
		let feedbackFields = this.state.feedbackFields;
		let errors = {};
		let formIsValid = true;

		if (!feedbackFields['first_name']) {

			formIsValid = false;
			errors['first_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( feedbackFields['first_name'].length <= 2 || !validateText.test(feedbackFields['first_name'])) {
				formIsValid = false;
				errors['first_name'] = 'Please enter a valid first name';
			}
		}

		if (!feedbackFields['last_name']) {

			formIsValid = false;
			errors['last_name'] = 'Please enter your last name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( feedbackFields['last_name'].length <= 2 || !validateText.test(feedbackFields['last_name'])) {
				formIsValid = false;
				errors['last_name'] = 'Please enter a valid last name';
			}

		}

		if (!feedbackFields['email_address']) {

			formIsValid = false;
			errors['email_address'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( feedbackFields['email_address'].length <= 6 || !validateEmail.test(feedbackFields['email_address'])) {
				formIsValid = false;
				errors['email_address'] = 'Please enter your valid email address';
			}

		}

		if (!feedbackFields['mobile_number']) {

			formIsValid = false;
			errors['mobile_number'] = 'Please enter your mobile number';

		} else {

			let validatePhone = /^[+-]?\d+$/;

			if ( feedbackFields['mobile_number'].length <= 5 || !validatePhone.test(feedbackFields['mobile_number'])) {
				formIsValid = false;
				errors['mobile_number'] = 'Please enter your valid mobile number';
			}

		}

		if (!feedbackFields['feedback_about']) {

			formIsValid = false;
			errors['feedback_about'] = 'Please select what your feedback is about';

		}

		if (!feedbackFields['feedback_about']) {

			formIsValid = false;
			errors['is_public'] = 'Please select if your review will be Public or Not';

		}

		this.setState({
			errors: errors
		});

		return formIsValid;
	}

	submitForm(event) {
		event.preventDefault();
		if(this.validateForm()) {
			
			if (this._isMounted) {
				this.setState({
					isSending: true
				});
			}

			axios.post('https://theelitecars.com/mobile/controllers/send_mail/write_your_feedback.php', this.state.feedbackFields)
			.then(
				(response) => {

					console.log(response);

					if (response.data.msg_code === 0) {

						if (this._isMounted) {
							this.setState({
								feedbackFields: {},
								redirect: true,
							});	
						}

					} else if (response.data.msg_code === 3){
						if (this._isMounted) {
							this.setState({
								sendingError: "Your message failed to send. Please try again",
							})
						}
					} else {

						let errors = {};

						for (var rd = response.data.length - 1; rd >= 0; rd--) {

							if (response.data[rd].input_field == "interested_in") {
								errors['interested_in'] = 'Please enter your the vehicle you interested in';
							}

							if (response.data[rd].input_field == "your_name") {
								errors['your_name'] = 'Please enter a valid name';
							}

							if (response.data[rd].input_field == "email_address") {
								errors['email_address'] = 'Please enter your valid email address';
							}

							if (response.data[rd].input_field == "mobile_number") {
								errors['mobile_number'] = 'Please enter your valid mobile number';
							}
						}

						if (this._isMounted) {
							this.setState({
								sendingError: "Please enter a valid form input.",
								errors: errors
							})
						}
					}
				}
			)
			.catch(
				(error) => {
					console.log(error)
				}
			)
			.then(() => {
				if (this._isMounted) {
					this.setState({
						isSending: false
					});
				}
			});
		}
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	handleShowHideSending() {

		let isSending = this.state.isSending;

		if (isSending) {
			isSending = false;
			this.removeCustomClassBodyApp();
	    	this.setState({isSending});
		} else {
			isSending = true;
			this.addCustomClassBodyApp();
	    	this.setState({isSending});
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this.setState({
			feedbackFields: {},
			errors: {},
			isSending: false,
			redirect: false,
			sendingError: "",
		})
		this._isMounted = false;
	}

	render() {

		const {feedbackFields, sendingError, redirect, errors, isSending} = this.state;

		console.log(isSending);

		if (redirect) {
			return <Redirect to="/thank-you" />
		}

		return (
			<div className="write_your_feedback_page">
				<Helmet>

					<title>Write Your Feedback - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Thank you for choosing The Elite Cars. It is our pleasure to provide you with the best quality of service that you deserve. Your valuable feedback will help us ..."/>
					<link rel="canonical" href="https://theelitecars.com/writeareview/" />

					<meta name="og:title" property="og:title" content="Write Your Feedback - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Thank you for choosing The Elite Cars. It is our pleasure to provide you with the best quality of service that you deserve. Your valuable feedback will help us ..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={headerImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/writeareview/" />

				</Helmet>
				<h1>Write Your Feedback</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="The Elite Cars - Write Your Feedback" title="The Elite Cars - Write Your Feedback" />
					<p>Thank you for choosing The Elite Cars. It is our pleasure to provide you with the best quality of service that you deserve.</p>
					<p>Your valuable feedback will help us serve you to the highest standard and we will ensure confidentiality of all your information at all times. If in case you wish to have your feedback live for public view in the future, tick the corresponding option provided in the box below.</p>
					<div className="form_container">
						{ sendingError ? (
								<div className="alert alert-danger" role="alert">{sendingError}</div>
							) : (
								""
							)
						}
						<form method="POST" onSubmit={this.submitForm}>
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" value={feedbackFields.first_name || ''} onChange={this.handleChange} className={errors.first_name ? "error":""} />
								<span>{this.state.errors.first_name}</span>
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="last_name" value={feedbackFields.last_name || ''} onChange={this.handleChange} className={errors.last_name ? "error":""} />
								<span>{this.state.errors.last_name}</span>
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="email_address" value={feedbackFields.email_address || ''} onChange={this.handleChange} className={errors.email_address ? "error":""} />
								<span>{this.state.errors.email_address}</span>
							</div>
							<div className="form_item">
								<label>Mobile Number</label>
								<input type="tel" name="mobile_number" value={feedbackFields.mobile_number || ''} onChange={this.handleChange} className={errors.mobile_number ? "error":""} />
								<span>{this.state.errors.mobile_number}</span>
							</div>
							<div className="form_item">
								<label>My Feedback is About *</label>
								<div className="radio_group">
									<label className="radio"><input type="radio" name="feedback_about" onChange={this.handleChange} value="Compliment" checked={feedbackFields.feedback_about === 'Compliment'} /><span>Compliment</span></label>
									<label className="radio"><input type="radio" name="feedback_about" onChange={this.handleChange} value="Query" checked={feedbackFields.feedback_about === 'Query'} /><span>Query</span></label>
									<label className="radio"><input type="radio" name="feedback_about" onChange={this.handleChange} value="Testimonial" checked={feedbackFields.feedback_about === 'Testimonial'} /><span>Testimonial</span></label>
									<label className="radio"><input type="radio" name="feedback_about" onChange={this.handleChange} value="Suggestion" checked={feedbackFields.feedback_about === 'Suggestion'} /><span>Suggestion</span></label>
									<label className="radio"><input type="radio" name="feedback_about" onChange={this.handleChange} value="Concern" checked={feedbackFields.feedback_about === 'Concern'} /><span>Concern</span></label>
								</div>
								<span>{this.state.errors.feedback_about}</span>
							</div>
							<div className="form_item">
								<label>Make My Review Public *</label>
								<div className="radio_group">
									<label className="radio"><input type="radio" name="is_public" onChange={this.handleChange} value="Yes" checked={feedbackFields.is_public === 'Yes'} /><span>Yes</span></label>
									<label className="radio"><input type="radio" name="is_public" onChange={this.handleChange} value="No" checked={feedbackFields.is_public === 'No'} /><span>No</span></label>
								</div>
								<span>{this.state.errors.is_public}</span>
							</div>
							<div className="form_item">
								<label>Message *</label>
								<textarea name="message" onChange={this.handleChange}></textarea>
							</div>
							<div className="form_item">
								<button type="submit" className="tec-button">Send</button>
							</div>
						</form>
					</div>
				</div>
				<Modal
					isActive={isSending}
					toggle={this.handleShowHideSending}
					closeButton={false}
					overlayClick={false}>
					<div className="text-center page-loading-container"><img src={pageLoading} className="img-fluid page-loading" /></div>
				</Modal>
			</div>
		)
	}
}

export default WriteYourFeedback;