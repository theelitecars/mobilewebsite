import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect} from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import ConsignmentStepOne from './consignment_step_1';
import Modal from './web-components/modal';
import pageLoading from '../images/pageload.gif';

import slideHeaderImage from '../images/menu_header.jpg';

class Consignment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelContainer: [],
			consignmentFields: {},
			carDetailsError: {},
			sendingError: '',
			isSending: false,
			redirect: false,
			all_makes_models: [],
		}

		this.itemMakeFormatDisplay = this.itemMakeFormatDisplay.bind(this);
		this.setConsignmentFieldsMake = this.setConsignmentFieldsMake.bind(this);
		this.getModels = this.getModels.bind(this);
		this.handleModelChange = this.handleModelChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.carDetailsSubmit = this.carDetailsSubmit.bind(this);
		this.submitConsignment = this.submitConsignment.bind(this);
		this.validateCarDetails = this.validateCarDetails.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);
		this.getAllMakes = this.getAllMakes.bind(this);
	}

	getAllMakes() {
		const url = 'http://theelitecars.com/mobile/controllers/get_cars/get_makes_models.php';

		axios.get(url)
		.then((response) => {
			this.setState({
				all_makes_models: response.data
			})
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				});
			}
		})
	}

	itemMakeFormatDisplay(make_model_text) {
		if (make_model_text == 'bmw') {
			return 'BMW';
		} else if (make_model_text == 'gmc') {
			return 'GMC';
		} else if (make_model_text == 'mclaren') {
			return 'McLaren';
		} else if (make_model_text == 'mercedes-benz') {
			return 'Mercedes-Benz';
		} else {
			let mmt = make_model_text.replace(/-/g, ' ');
			return mmt.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );	
		}
	}

	setConsignmentFieldsMake(make_name_value) {
		const { consignmentFields } = this.state;
		consignmentFields['car_make'] = make_name_value;
		consignmentFields['car_model'] = "";

		if (this._isMounted) {
			this.setState({
				consignmentFields
			})
		}
	}

	getModels(make_name) {
		const {all_makes_models} = this.state;

		if (make_name && make_name != 'any') {
			let model = all_makes_models.filter(all_makes_model => Object.keys(all_makes_model)[0] == make_name);
			if (model[0][make_name].length > 0) {
				this.setState({
					modelContainer: model[0][make_name],
				})
			}
		} else {
			this.setState({
				modelContainer: [],
			})
		}
		
	}

	handleModelChange(event) {
		this.getModels(event.target.value);
		this.setConsignmentFieldsMake(event.target.value);
	}

	handleChange(event) {
		const { consignmentFields } = this.state;
		consignmentFields[event.target.name] = event.target.value;
		if (this._isMounted) {
			this.setState({
				consignmentFields
			});
		}
	}

	carDetailsSubmit(e) {
		e.preventDefault();
		if (this.validateCarDetails()) {
			this.submitConsignment();
		}
	}

	submitConsignment() {

		const {consignmentFields} = this.state;

		this.setState({
			isSending: true
		});

		axios.post('https://theelitecars.com/mobile/controllers/send_mail/consignment_send_mail.php', consignmentFields)
		.then(
			(response) => {

				if (response.data.msg_code === 0) {
					if (this._isMounted) {
						this.setState({
							consignmentFields: {},
							redirect: true,
						});
					}
				} else if (response.data.msg_code === 3) {
					if (this._isMounted) {
						this.setState({
							sendingError: "Your message failed to send. Please try again",
						})
					}
				} else {
					let carDetailsError = {}

					for (var rd = response.data.length - 1; rd >= 0; rd--) {

						if(response.data[rd].input_field == "car_make") {
							carDetailsError['car_make'] = 'Please select a car make';
						}

						if(response.data[rd].input_field = "car_model") {
							carDetailsError['car_model'] = 'Please select a car model';
						}

						if(response.data[rd].input_field == "car_year") {
							carDetailsError['car_year'] = 'Please select a car year';
						}

						if(response.data[rd].input_field == "car_mileage") {
							carDetailsError['car_mileage'] = 'Please input your car mileage';
						}

						if(response.data[rd].input_field == "car_specification") {
							carDetailsError['car_specification'] = 'Please select a car specification';
						}

						if(response.data[rd].input_field == "car_condition") {
							carDetailsError['car_condition'] = 'Please select a car condition';
						}

						if(response.data[rd].input_field == "car_service_history") {
							carDetailsError['car_service_history'] = 'Please select a car service history';
						}

						if(response.data[rd].input_field == "car_body_type") {
							carDetailsError['car_body_type'] = 'Please select a car body type';
						}

						if(response.data[rd].input_field == "car_option") {
							carDetailsError['car_option'] = 'Please select a car option';
						}

						if(response.data[rd].input_field == "first_name") {
							appointmentError['first_name'] = 'Please enter a valid first name';
						}

						if(response.data[rd].input_field == "last_name") {
							appointmentError['last_name'] = 'Please enter a valid last name';
						}

						if(response.data[rd].input_field == "email_address") {
							appointmentError['email_address'] = 'Please enter a valid email address';
						}

						if(response.data[rd].input_field == "mobile_number") {
							appointmentError['mobile_number'] = 'Please enter a valid number';
						}

						if (Object.keys(carDetailsError).length > 0 && carDetailsError.constructor === Object) {
							if (this._isMounted) {
								this.setState({
									step: 1,
								})
							}
						}

						if (this._isMounted) {
							this.setState({
								sendingError: "Please enter a valid form input.",
								carDetailsError: carDetailsError,
								appointmentError: appointmentError,
							})
						}
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

	validateCarDetails() {
		const {consignmentFields} = this.state;
		let errors = {}
		let formIsValid = true;

		if(!consignmentFields['car_make']) {
			errors['car_make'] = 'Please select a car make';
			formIsValid = false;
		}

		if(!consignmentFields['car_model']) {
			errors['car_model'] = 'Please select a car model';
			formIsValid = false;
		}

		if(!consignmentFields['car_year']) {
			errors['car_year'] = 'Please select a car year';
			formIsValid = false;
		}

		if(!consignmentFields['car_mileage']) {
			errors['car_mileage'] = 'Please input your car mileage';
			formIsValid = false;
		} else {
			if (parseFloat(consignmentFields['car_mileage']) < 0) {
				errors['car_mileage'] = 'Please input a valid car mileage';
				formIsValid = false;
			}
		}

		if(!consignmentFields['car_specification']) {
			errors['car_specification'] = 'Please select a car specification';
			formIsValid = false;
		}

		if(!consignmentFields['car_condition']) {
			errors['car_condition'] = 'Please select a car condition';
			formIsValid = false;
		}

		if(!consignmentFields['car_service_history']) {
			errors['car_service_history'] = 'Please select a car service history';
			formIsValid = false;
		}

		if(!consignmentFields['car_body_type']) {
			errors['car_body_type'] = 'Please select a car body type';
			formIsValid = false;
		}

		if(!consignmentFields['car_option']) {
			errors['car_option'] = 'Please select a car option';
			formIsValid = false;
		}

		if (!consignmentFields['first_name']) {
			formIsValid = false;
			errors['first_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( consignmentFields['first_name'].length <= 2 || !validateText.test(consignmentFields['first_name'])) {
				formIsValid = false;
				errors['first_name'] = 'Please enter a valid first name';
			}
		}

		if (!consignmentFields['last_name']) {

			formIsValid = false;
			errors['last_name'] = 'Please enter your last name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( consignmentFields['last_name'].length <= 2 || !validateText.test(consignmentFields['last_name'])) {
				formIsValid = false;
				errors['last_name'] = 'Please enter a valid last name';
			}

		}

		if (!consignmentFields['email_address']) {

			formIsValid = false;
			errors['email_address'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( consignmentFields['email_address'].length <= 6 || !validateEmail.test(consignmentFields['email_address'])) {
				formIsValid = false;
				errors['email_address'] = 'Please enter your valid email address';
			}

		}

		if (!consignmentFields['mobile_number']) {

			formIsValid = false;
			errors['mobile_number'] = 'Please enter your mobile number';

		} else {

			let validatePhone = /^[+-]?\d+$/;

			if ( consignmentFields['mobile_number'].length <= 5 || !validatePhone.test(consignmentFields['mobile_number'])) {
				formIsValid = false;
				errors['mobile_number'] = 'Please enter your valid mobile number';
			}

		}


		if (this._isMounted) {
			this.setState({
				carDetailsError: errors
			});	
		}
		
		return formIsValid;
	}

	handleShowHideSending() {

		const {isSending}  = this.state;

		if (isSending) {
			this.removeCustomClassBodyApp();
	    	this.setState({isSending: false});
		} else {
			this.addCustomClassBodyApp();
	    	this.setState({isSending: true});
		}
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	componentDidMount() {
		this._isMounted = true;
		window.scrollTo(0, 0);
		this.getAllMakes();
	}

	componentWillUnmount() {
		this.setState({
			modelContainer: [],
			carDetailsError: {},
		});
		this._isMounted = false;
	}

	render() {

		const {modelContainer, consignmentFields, carDetailsError, sendingError, isSending, redirect, all_makes_models} = this.state;

		let modelOptions = '';
		let makeOptions = '';
		let formYears = [];
		let d = new Date();

		if (all_makes_models.length > 0) {
			makeOptions = all_makes_models.map((all_makes, index) => {
				return <option key={index} value={Object.keys(all_makes)[0]}>{this.itemMakeFormatDisplay(Object.keys(all_makes)[0])}</option>
			});	
		}
		

		if (modelContainer.length > 0) {
			modelOptions = modelContainer.map((model_container, index) => {
				return <option key={index} value={model_container.value}>{model_container.display}</option>
			})
		} else {
			modelOptions = '';
		}

		for (var y = d.getFullYear(); y >= 2000; y--) {
			formYears.push(y);
		}

		if (redirect) {
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		return (
			<div className="sell_your_car_page consignment">
				<Helmet>

					<title>Consignment - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Consignment If you think that your car is worthy of a higher value than our cash offer, then you can opt for our consignment service. This is designed to provide you with better selling opportunities, and among the privileges you can enjoy are as follows: Display your car at our..."/>
					<link rel="canonical" href="https://theelitecars.com/consignment/" />

					<meta name="og:title" property="og:title" content="Consignment - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Consignment If you think that your car is worthy of a higher value than our cash offer, then you can opt for our consignment service. This is designed to provide you with better selling opportunities, and among the privileges you can enjoy are as follows: Display your car at our..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/consignment/" />

				</Helmet>
				<h1>Consignment</h1>
				<div className="container">
					<p>If you think that your car is worthy of a higher value than our cash offer, then you can opt for our consignment service. This is designed to provide you with better selling opportunities, and among the privileges you can enjoy are as follows:</p>
					<ul>
						<li>Display your car at our showroom</li>
						<li>High marketing efforts on your behalf for increased exposure</li>
						<li>More than 20 walk-ins daily</li>
						<li>More than 30 calls and emails daily</li>
						<li>Conveniently located on Sheikh Zayed Road</li>
						<li>Proven track record in the industry</li>
						<li>Honest, quick, and secure transaction</li>
						<li>We offer assistance from A to Z</li>
						<li>We handle all your needs when it comes to registration, approvals and bank loan settlement</li>
					</ul>
					<div className="consignment_form mt-4">
						<h2>Tell Us Something About Your Car</h2>
						<form method="POST" onSubmit={this.carDetailsSubmit}>
							{ sendingError ? (
									<div className="alert alert-danger" role="alert">{sendingError}</div>
								) : (
									""
								)
							}
							<div className="form_item">
								<label>Select A Make*</label>
								<select name="car_make" onChange={this.handleModelChange} value={consignmentFields.car_make} className={carDetailsError.car_make ? "error":""}>
									<option value=""></option>
									{makeOptions}
								</select>
								<span>{carDetailsError.car_make}</span>
							</div>
							<div className="form_item">
								<label>Select A Model (Select a Car Make first) *</label>
								<select name="car_model" disabled={modelContainer.length > 0 ? false : true} onChange={this.handleChange} value={consignmentFields.car_model} className={carDetailsError.car_model ? "error":""}>
									<option value=""></option>
									{modelOptions}
								</select>
								<span>{carDetailsError.car_model}</span>
							</div>
							<div className="form_item">
								<label>Select A Year *</label>
								<select name="car_year" onChange={this.handleChange} value={consignmentFields.car_year} className={carDetailsError.car_year ? "error":""}>
									<option value=""></option>
									{
										formYears.map((formYear, index) => {
											return <option value={formYear} key={index}>{formYear}</option>
										})
									}
								</select>
								<span>{carDetailsError.car_year}</span>
							</div>
							<div className="form_item">
								<label>Mileage *</label>
								<input type="number" name="car_mileage" onChange={this.handleChange} value={consignmentFields.car_mileage || ''} className={carDetailsError.car_mileage ? "error":""} />
								<span>{carDetailsError.car_mileage}</span>
							</div>
							<div className="form_item">
								<label>Select A Specification *</label>
								<select name="car_specification" onChange={this.handleChange} value={consignmentFields.car_specification} className={carDetailsError.car_specification ? "error":""}>
									<option value=""></option>
									<option value="GCC">GCC</option>
									<option value="Non-GCC">Non-GCC</option>
									<option value="I Don't Know">I Don't Know</option>
								</select>
								<span>{carDetailsError.car_specification}</span>
							</div>
							<div className="form_item">
								<label>Select A Vehicle Condition *</label>
								<select name="car_condition" onChange={this.handleChange} value={consignmentFields.car_condition} className={carDetailsError.car_condition ? "error":""}>
									<option value=""></option>
									<option value="Good">Good</option>
									<option value="Average">Average</option>
									<option value="Below Average">Below Average</option>
								</select>
								<span>{carDetailsError.car_condition}</span>
							</div>
							<div className="form_item">
								<label>Select A Service History *</label>
								<select name="car_service_history" onChange={this.handleChange} value={consignmentFields.car_service_history} className={carDetailsError.car_service_history ? "error":""}>
									<option value=""></option>
									<option value="Full Service History">Full Service History</option>
									<option value="Part Service History">Part Service History</option>
									<option value="First Service Not Due">First Service Not Due</option>
									<option value="No Service History">No Service History</option>
								</select>
								<span>{carDetailsError.car_service_history}</span>
							</div>
							<div className="form_item">
								<label>Select A Body Type *</label>
								<select name="car_body_type" onChange={this.handleChange} value={consignmentFields.car_body_type} className={carDetailsError.car_body_type ? "error":""}>
									<option value=""></option>
									<option value="Sedan">Sedan</option>
									<option value="Hatchback">Hatchback</option>
									<option value="SUV">SUV</option>
									<option value="Convertible">Convertible</option>
								</select>
								<span>{carDetailsError.car_body_type}</span>
							</div>
							<div className="form_item">
								<label>Select A Car Option *</label>
								<select name="car_option" onChange={this.handleChange} value={consignmentFields.car_option} className={carDetailsError.car_option ? "error":""}>
									<option value=""></option>
									<option value="Basic">Basic</option>
									<option value="Mid Option">Mid Option</option>
									<option value="Full Option">Full Option</option>
								</select>
								<span>{carDetailsError.car_option}</span>
							</div>
							<div className="form_item">
								<label>Engine</label>
								<input type="text" name="car_engine" onChange={this.handleChange} value={consignmentFields.car_engine || ''} />
								<span></span>
							</div>
							<hr />
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" onChange={this.handleChange} value={consignmentFields.first_name || ''} className={carDetailsError.first_name ? "error":""} />
								<span>{carDetailsError.first_name}</span>
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="last_name" onChange={this.handleChange} value={consignmentFields.last_name || ''} className={carDetailsError.last_name ? "error":""} />
								<span>{carDetailsError.last_name}</span>
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="email_address" onChange={this.handleChange} value={consignmentFields.email_address || ''} className={carDetailsError.email_address ? "error":""} />
								<span>{carDetailsError.email_address}</span>
							</div>
							<div className="form_item">
								<label>Mobile Number *</label>
								<input type="tel" name="mobile_number" onChange={this.handleChange} value={consignmentFields.mobile_number || ''} className={carDetailsError.mobile_number ? "error":""} />
								<span>{carDetailsError.mobile_number}</span>
							</div>
							<div className="form_item mt-4">
								<button type="submit" className="tec-button">Send</button>
							</div>
						</form>
					</div>
					<Modal
						isActive={isSending}
						toggle={this.handleShowHideSending}
						closeButton={false}
						overlayClick={false}>
						<div className="text-center page-loading-container"><img src={pageLoading} className="img-fluid page-loading" /></div>
					</Modal>
				</div>
			</div>
		)
	}
}

export default Consignment;