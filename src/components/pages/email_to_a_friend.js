import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';

import { Helmet } from 'react-helmet';
import slideHeaderImage from '../../images/menu_header.jpg';

class EmailToAFriend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {},
			errors: {},
			isSending: false,
			redirect: false,
		}

		this.handleFormData = this.handleFormData.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}

	handleFormData(event) {
		let fields = this.state.fields;
		fields[event.target.name] = event.target.value;

		this.setState({
			fields
		})
	}

	validateForm() {
		const {fields} = this.state;
		let errors = {};
		let formIsValid = true;

		if (!fields['full_name']) {

			formIsValid = false;
			errors['full_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( fields['full_name'].length <= 2 || !validateText.test(fields['full_name'])) {
				formIsValid = false;
				errors['full_name'] = 'Please enter a valid first name';
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

		if (!fields['friends_email_address']) {

			formIsValid = false;
			errors['friends_email_address'] = 'Please enter email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( fields['friends_email_address'].length <= 6 || !validateEmail.test(fields['friends_email_address'])) {
				formIsValid = false;
				errors['friends_email_address'] = 'Please enter a valid email address';
			}

		}

		this.setState({
			errors: errors
		});

		return formIsValid;
	}

	handleSubmitForm(e) {
		e.preventDefault();

		const {fields} = this.state;

		if (this.validateForm()) {
			this.setState({
				isSending: true
			});

			axios.post('https://theelitecars.com/mobile/controllers/tec_send_mail/email_friend_send_mail.php', fields)
			.then(
				(response) => {
					/*let emptyFields = {}

					this.setState({
						fields: emptyFields,
						redirect: true,
					});*/
					console.log(response.data);
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

	componentDidMount() {
		const {fields} = this.state;
		fields['car_details'] = this.props.location.state;
		this.setState({
			fields
		});
	}

	render () {
		const {fields, errors, redirect} = this.state;

		return (
			<div className="email_to_a_friend">
				<Helmet>

					<title>Email To A Friend - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Got questions or need assistance regarding our products and services? Please don&#8217;t hesitate to get in touch with us. Fill out the form below or visit our showroom personally. ADDRESS The Elite Cars – Main Showroom The Elite Cars &#8211; Posh Lounge The Elite Cars – Head Office Sheikh Zayed..."/>
					<link rel="canonical" href="https://theelitecars.com/location/" />

					<meta name="og:title" property="og:title" content="Email To A Friend - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Got questions or need assistance regarding our products and services? Please don&#8217;t hesitate to get in touch with us. Fill out the form below or visit our showroom personally. ADDRESS The Elite Cars – Main Showroom The Elite Cars &#8211; Posh Lounge The Elite Cars – Head Office Sheikh Zayed..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/location/" />

				</Helmet>
				<h1>Email To A Friend</h1>
				<div className="container">
					<form method="POST" onSubmit={this.handleSubmitForm}>
						<div className="form_item">
							<label>Full Name *</label>
							<input type="text" name="full_name" onChange={this.handleFormData} value={fields.full_name || ''} className={errors.full_name ? "error":""} />
							<span>{errors.full_name}</span>
						</div>
						<div className="form_item">
							<label>Email Address *</label>
							<input type="email" name="email_address" onChange={this.handleFormData} value={fields.email_address || ''} className={errors.email_address ? "error":""} />
							<span>{errors.email_address}</span>
						</div>
						<div className="form_item">
							<label>Friend's Email Address *</label>
							<input type="email" name="friends_email_address" onChange={this.handleFormData} value={fields.friends_email_address || ''} className={errors.friends_email_address ? "error":""} />
							<span>{errors.friends_email_address}</span>
						</div>
						<div className="form_item">
							<label>Message</label>
							<textarea name="message" onChange={this.handleFormData} value={fields.message || ''}></textarea>
						</div>
						<div className="form_item">
							<button type="submit" className="tec-button">Send</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default EmailToAFriend;