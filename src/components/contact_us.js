import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';

import pageLoading from '../images/pageload.gif';

import TecModal from './modal';

class ContactUs extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fields: {},
			errors: {},
			isSending: false,
			redirect: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);	

	}

	handleChange(event) {
		let fields = this.state.fields;
		fields[event.target.name] = event.target.value;

		this.setState({
			fields
		})
	}

	validateForm() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!fields['first_name']) {

			formIsValid = false;
			errors['first_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( fields['first_name'].length <= 2 || !validateText.test(fields['first_name'])) {
				formIsValid = false;
				errors['first_name'] = 'Please enter a valid first name';
			}
		}

		if (!fields['last_name']) {

			formIsValid = false;
			errors['last_name'] = 'Please enter your last name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( fields['last_name'].length <= 2 || !validateText.test(fields['last_name'])) {
				formIsValid = false;
				errors['last_name'] = 'Please enter a valid last name';
			}

		}

		if (!fields['email_address']) {

			formIsValid = false;
			errors['email_address'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( fields['email_address'].length <= 6 || !validateEmail.test(fields['email_address'])) {
				formIsValid = false;
				errors['email_address'] = 'Please enter your valid email address';
			}

		}

		if (!fields['mobile_number']) {

			formIsValid = false;
			errors['mobile_number'] = 'Please enter your mobile number';

		} else {

			let validatePhone = /^[+-]?\d+$/;

			if ( fields['mobile_number'].length <= 5 || !validatePhone.test(fields['mobile_number'])) {
				formIsValid = false;
				errors['mobile_number'] = 'Please enter your valid mobile number';
			}

		}

		this.setState({
			errors: errors
		});

		return formIsValid;
	}

	submitForm(event) {
		event.preventDefault();

		let fields = {};

		if(this.validateForm()) {

			this.setState({
				isSending: true
			});

			axios.post('http://localhost/tecmobilewebsite/controllers/tec_send_mail/contact_us_send_mail.php', {
				first_name: this.state.fields.first_name,
				last_name: this.state.fields.last_name,
				email_address: this.state.fields.email_address,
				mobile_number: this.state.fields.mobile_number,
				message: this.state.fields.message,
			})
			.then(
				(response) => {

					fields['first_name'] = "";
					fields['last_name'] = "";
					fields['email_address'] = "";
					fields['mobile_number'] = "";
					fields['message'] = "";

					this.setState({
						fields: fields,
						redirect: true,
					});

					const { redirect } = this.state;

					if (redirect) {
						return <Redirect to='/thank-you'/>;
					}

					return <RenderYourForm/>;
				}
			)
			.catch(
				(error) => {
					console.log(error)
				}
			)
			.then(() => {
				this.setState({
					isSending: false
				});
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

	render() {
		return (
			<div className="contact_us_page">
				<h1>Contact Us</h1>
				<div className="container">
					<p>Got questions or need assistance regarding our products and services? Please don’t hesitate to get in touch with us. Fill out the form below or visit our showroom personally.</p>
					<div className="form_container">
						<form method="POST" onSubmit={this.submitForm}>
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" value={this.state.fields.first_name || ''} onChange={this.handleChange} className={this.state.errors.first_name ? "error":""} />
								<span>{this.state.errors.first_name}</span>
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="last_name" value={this.state.fields.last_name || ''} onChange={this.handleChange} className={this.state.errors.last_name ? "error":""} />
								<span>{this.state.errors.last_name}</span>
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="email_address" value={this.state.fields.email_address || ''} onChange={this.handleChange} className={this.state.errors.email_address ? "error":""} />
								<span>{this.state.errors.email_address}</span>
							</div>
							<div className="form_item">
								<label>Mobile Number (Numbers only)*</label>
								<input type="tel" name="mobile_number" value={this.state.fields.mobile_number || ''} onChange={this.handleChange} className={this.state.errors.mobile_number ? "error":""} />
								<span>{this.state.errors.mobile_number}</span>
							</div>
							<div className="form_item">
								<label>Message *</label>
								<textarea name="message" value={this.state.fields.message || ''} onChange={this.handleChange}></textarea>
							</div>
							<div className="form_item">
								<button type="submit" className="tec-button">Send</button>
							</div>
						</form>
					</div>
				</div>
				<TecModal modalToggle={this.state.isSending} showHideModal={this.handleShowHideSending} closeButton={false} modalDialog={true}>
					<img src={pageLoading} className="img-fluid page-loading"/>
				</TecModal>
			</div>
		)
	}
}

export default ContactUs;