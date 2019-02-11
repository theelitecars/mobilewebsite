import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch, withRouter } from "react-router-dom";
import axios from 'axios';

import Modal from '../web-components/modal';

class SearchOurStock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelContainer: [],
			searchFormFields: {},
			all_makes_models: [],
		}

		this.itemMakeFormatDisplay = this.itemMakeFormatDisplay.bind(this);
		this.getModels = this.getModels.bind(this);
		this.handleModelChange = this.handleModelChange.bind(this);
		this.setFilterFields = this.setFilterFields.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
		const {searchFormFields} = this.state;
		searchFormFields['make'] = event.target.value;
		searchFormFields['model'] = '';
		this.setState({
			searchFormFields
		})
	}

	setFilterFields(fieldname, value) {
		const {searchFormFields} = this.state;
		searchFormFields[fieldname] = value;
		this.setState({
			searchFormFields
		})
	}

	handleOnChange(event) {
		this.setFilterFields(event.target.name, event.target.value);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		this.props.handleSearchFormSubmit(this.state.searchFormFields);
	}

	componentDidMount() {
		this.getAllMakes();
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			modelContainer: [],
			searchFormFields: {},
			all_makes_models: [],
		});
		this._isMounted = false;
	}

	render() {

		const {modelContainer, searchFormFields, all_makes_models} = this.state;

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

		return(
			<div className="search_our_tock">
				<h2 className="text-uppercase">Search Our Stock</h2>
				<form method="POST" onSubmit={this.handleFormSubmit}>
					<div className="form_item">
						<select name="make" onChange={this.handleModelChange} value={searchFormFields.make}>
							<option value="">Select A Make</option>
							<option value="any">Any</option>
							{makeOptions}
						</select>
					</div>
					<div className="form_item">
						<select name="model" disabled={modelContainer.length > 0 ? false : true} onChange={this.handleOnChange} value={searchFormFields.model}>
							<option value="">Select A Model</option>
							<option value="any">Any</option>
							{modelOptions}
						</select>
					</div>
					<div className="form_item">
						<select name="year" onChange={this.handleOnChange} value={searchFormFields.year}>
							<option value="">Select A Year</option>
							<option value="any">Any</option>
							{
								formYears.map((formYear, index) => {
									return <option value={formYear} key={index}>{formYear}</option>
								})
							}
						</select>
					</div>
					<div className="form_item">
						<select name="price_range" onChange={this.handleOnChange} value={searchFormFields.price_range}>
							<option>Select A Price Range</option>
							<option value="any">Any</option>
							<option value="[10000,200000]">AED 10k - 200k</option>
							<option value="[200000,400000]">AED 200k - 400k</option>
							<option value="[400000,700000]">AED 400k - 700k</option>
							<option value="[700000,1000000]">AED 700k - 1M</option>
							<option value="[1000000,1500000]">AED 1M - 1.5M</option>
							<option value="[1500000]">AED 1.5M+</option>
						</select>
					</div>
					<div className="form_item">
						<select name="mileage" onChange={this.handleOnChange} value={searchFormFields.mileage}>
							<option>Select A Mileage</option>
							<option value="any">Any</option>
							<option value="[0,10000]">0 - 10000</option>
							<option value="[10000,20000]">10000 - 20000</option>
							<option value="[20000,30000]">20000 - 30000</option>
							<option value="[30000,40000]">30000 - 40000</option>
							<option value="[40000,50000]">40000 - 50000</option>
							<option value="[50000,60000]">50000 - 60000</option>
							<option value="[60000,70000]">60000 - 70000</option>
							<option value="[70000,80000]">70000 - 80000</option>
							<option value="[80000,90000]">80000 - 90000</option>
							<option value="[90000,100000]">90000 - 100000</option>
							<option value="[100000,110000]">100000 - 110000</option>
							<option value="[110000,120000]">110000 - 120000</option>
							<option value="[120000,130000]">120000 - 130000</option>
							<option value="[130000]">130000+</option>
						</select>
					</div>
					<div className="form_item mb-0">
						<button className="tec_button" type="submit">Search</button>
					</div>
				</form>
			</div>
		)
		
	}
}

class Footer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fields: {},
			errors: {},
			isSending: false,
			redirect: false,
			alertMessage: {},
			showSearchForm: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.setRedirectValue = this.setRedirectValue.bind(this, true);
		this.handleShowHideSending = this.handleShowHideSending.bind(this, true);
		this.toggleSearchForm = this.toggleSearchForm.bind(this);
		this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
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

	setRedirectValue() {
		if (this._isMounted) {
			this.setState({
				fields: {},
				errors: {},
				isSending: false,
				redirect: false,
				alertMessage: {},
			});
		}
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

		if (!fields['subscribe_email']) {

			formIsValid = false;
			errors['subscribe_email'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( fields['subscribe_email'].length <= 6 || !validateEmail.test(fields['subscribe_email'])) {
				formIsValid = false;
				errors['subscribe_email'] = 'Please enter your valid email address';
			}

		}

		this.setState({
			errors: errors
		});

		return formIsValid;
	}

	submitForm(event) {
		event.preventDefault();

		if(this.validateForm()) {

			const {fields, errors} = this.state;

			this.setState({
				isSending: true
			});

			axios.post('https://theelitecars.com/mobile/controllers/send_mail/newsletter_subscription.php', fields)
			.then(
				(response) => {
					if (response.data.msg_code === 0) {
						if (this._isMounted) {
							this.setState({
								fields: {},
								alertMessage: {
									code: response.data.msg_code,
									message: response.data.message
								},
								redirect: true,
							});
						}
					} else if (response.data.msg_code === 2) {
						if (this._isMounted) {
							this.setState({
								alertMessage: {
									code: response.data.msg_code,
									message: response.data.message
								}
							});
						}
					} else {
						console.log(response);
					}
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

	toggleSearchForm(event) {
		event.preventDefault();
		const {showSearchForm} = this.state;
		if (showSearchForm) {
			this.setState({
				showSearchForm: false,
			})
		} else {
			this.setState({
				showSearchForm: true,
			})
		}
	}

	handleSearchFormSubmit(formdata) {
		const {pathname, state} = this.props.location;

		this.setState({
			showSearchForm: false,
		})

		if (typeof state != 'undefined' && pathname == '/pre-owned-used-approved-cars-dubai') {
			this.props.history.push({pathname: '/empty'});
			setTimeout(() => {
	            this.props.history.replace({ pathname: '/pre-owned-used-approved-cars-dubai', state: formdata });
	        });
		} else {
			this.props.history.push('/pre-owned-used-approved-cars-dubai', formdata);	
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			fields: {},
			errors: {},
			isSending: false,
			redirect: false,
			alertMessage: {},
		});
		this._isMounted = false;
	}

	render() {
		const {fields, errors, alertMessage, redirect, isSending, showSearchForm} = this.state;
		let alertMessageClass = '';

		if (alertMessage) {
			if (alertMessage.code === 0) {
				alertMessageClass = 'success';
			} else {
				alertMessageClass = 'error';
			}
		}

		if (redirect) {
			this.setRedirectValue();
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		return (
			<footer>
				<div className="container">
					<form method="POST" onSubmit={this.submitForm}>
						<div className="subscribe">
							<label>Get the latest news and deals</label>
							<div>
								<input type="email" name="subscribe_email" placeholder="Enter Email Address" value={fields.subscribe_email || ''} onChange={this.handleChange} className={errors.subscribe_email ? "error":""} disabled={isSending ? true : false}/>
								<button type="submit" className="tec_button" disabled={isSending ? true : false}>Subscribe</button>
							</div>
							<span className="error">{errors.subscribe_email}</span>
							<span className={alertMessageClass}>{alertMessage.message}</span>
						</div>
					</form>
					<hr/>
					<ul className="social_media">
						<li><a href="" className="facebook"><img src="https://img.icons8.com/material/25/ffffff/facebook-f.png" className="img-fluid" /></a></li>
						<li><a href="" className="instagram"><img src="https://img.icons8.com/material-outlined/25/ffffff/instagram-new.png" className="img-fluid" /></a></li>
						<li><a href="" className="twitter"><img src="https://img.icons8.com/material/25/ffffff/twitter-squared.png" className="img-fluid" /></a></li>
						<li><a href="" className="youtube"><img src="https://img.icons8.com/material/25/ffffff/youtube-play.png" className="img-fluid" /></a></li>
						<li><a href="" className="linkedin"><img src="https://img.icons8.com/ios-glyphs/25/ffffff/linkedin-2.png" className="img-fluid" /></a></li>
					</ul>
					<div className="bottom_footer">
						<ul>
							<li><a href="">Terms of Use</a></li>
							<li><span className="separator">|</span></li>
							<li><a href="">Privacy Policy</a></li>
						</ul>
						<div>&copy; 2019 | All Rights Reserved | <Link to="/">The Elite Cars LLC</Link></div>
					</div>
				</div>
				<div className="footer_links">
					<div className="container">
						<NavLink exact to="/">
							<i className="material-icons">home</i>
							<span>Home</span>
						</NavLink>
						<NavLink to="/news">
							<i className="material-icons">description</i>
							<span>News</span>
						</NavLink>
						<a href="#" className="search" onClick={this.toggleSearchForm}>
							<i className="material-icons">directions_car</i>
							<span>Search</span>
						</a>
						<NavLink to="/contact-us">
							<i className="material-icons">mail</i>
							<span>Message</span>
						</NavLink>
						<NavLink to="/chat">
							<i className="material-icons">chat</i>
							<span>Chat</span>
						</NavLink>
					</div>
				</div>
				<Modal
				isActive={showSearchForm}
				toggle={this.toggleSearchForm}
				closeButton={true}
				overlayClick={true}
				maxWidth="500">
					<div className="footer_search_form">
						<SearchOurStock handleSearchFormSubmit={this.handleSearchFormSubmit} />
					</div>
				</Modal>
			</footer>
		)
	}
}

export default withRouter(Footer);