import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';

import pageLoading from '../../images/pageload.gif';
import mechanicalCheck from '../../images/mechanical-check.png';
import serviceContract from '../../images/service-contract.png';
import tradeIn from '../../images/trade-in.png';
import registration from '../../images/registration.png';
import warranty from '../../images/warranty.png';
import finance from '../../images/finance.png';

import TecModal from '../modal';
import Modal from '../web-components/modal';

const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<button type="button" className={className} onClick={onClick}><i className="material-icons">arrow_back</i></button>
	);
}

const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<button type="button" className={className} onClick={onClick}><i className="material-icons">arrow_forward</i></button>
	);
}

const formatPrice = (price) => {
	return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
}

const createMarkup = (markup) => {
	return {__html: markup};
}

class FinanceCalculator extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const {handleSubmitFinance, financeCalculatorChange, fields} = this.props;

		return(
			<div className="finance_calculator_container">
				<div className="row">
					<div className="col-12">
						<form method="POST" onSubmit={handleSubmitFinance}>
							<table>
								<tbody>
									<tr>
										<td><label htmlFor="cost_of_vehicle">Cost of Vehicle (AED):</label></td>
										<td><input type="number" name="cost_of_vehicle" id="cost_of_vehicle" onChange={financeCalculatorChange} value={fields.cost_of_vehicle} /></td>
									</tr>
									<tr>
										<td><label htmlFor="down_payment">Down Payment (AED):</label></td>
										<td><input type="number" name="down_payment" id="down_payment" onChange={financeCalculatorChange} value={fields.down_payment} /></td>
									</tr>
									<tr>
										<td><label htmlFor="annual_interest_rate">Annual Interest Rate (%):<br /><small><em>Terms & Conditions apply</em></small></label></td>
										<td><input type="number" name="annual_interest_rate" id="annual_interest_rate" onChange={financeCalculatorChange} value={fields.annual_interest_rate} /></td>
									</tr>
									<tr>
										<td><label htmlFor="term_of_loan">Term of Loan in Years:</label></td>
										<td><input type="number" name="term_of_loan" id="term_of_loan" onChange={financeCalculatorChange} value={fields.term_of_loan} /></td>
									</tr>
									<tr>
										<td><label htmlFor="frequency_of_payments">Frequency of Payments:</label></td>
										<td>
											<select name="frequency_of_payments" id="frequency_of_payments" onChange={financeCalculatorChange} value={fields.frequency_of_payments}>
												<option value="0">Bi-Weekly</option>
												<option value="1">Weekly</option>
												<option value="2">Monthly</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colSpan="2" className="text-center">
											<button type="submit" className="tec-button">Calculate My Payment</button>
										</td>
									</tr>
									<tr>
										<td><label>NUMBER OF PAYMENTS:</label></td>
										<td className="text-right"><span className="number_of_payment">{fields.number_of_payment}</span></td>
									</tr>
									<tr>
										<td><label>PAYMENT AMOUNT:</label></td>
										<td className="text-right"><span className="payment_amount">AED {formatPrice(fields.payment_amount)}</span></td>
									</tr>
								</tbody>
							</table>
						</form>
						<ul>
							<li>Interest rate varies based on individual cases and car year models.</li>
							<li>Interest Rate is variable depending on the Bank.</li>
							<li>Down payment is variable depending on customer requirements.</li>
							<li>Terms & Conditions apply.</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

class SingleViewSlider extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const {slideImages, carSold, badgeText, salePrice} = this.props;

		const sliderSettings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
  			autoplaySpeed: 3000,
  			prevArrow: <PrevArrow />,
  			nextArrow: <NextArrow />,
		}

		return(
			<div className="svp_slider">
				<Slider {...sliderSettings}>
					{
						slideImages.map((slideImage, index) =>
							<div key={index}>
								<img src={slideImage} className="img-fluid" />
							</div>
						)
					}
				</Slider>
				{carSold == 1 ? (
					<div className="sold_badge">
						<span>Sold</span>
					</div>
				) : (
					badgeText  ? (
						<div className="angle_badge reserved">
							<span>Reserved</span>
						</div>
					) : (
						salePrice ? (
							<div className="angle_badge special-offer">
								<span>Special Offer</span>
							</div>
						) : (
							''
						)
					)
				)}
			</div>
		)
	}
}

class SimilarVehicles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			similarVehicles: [],
			isLoading: true,
			perPage: 15,
			page: 1,
		}

		this.getSimilarVehicles = this.getSimilarVehicles.bind(this);
	}

	getSimilarVehicles() {

		const {perPage, page, isLoading} = this.state;
		const {bodyType, currentID} = this.props;

		const url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][0][compare]==&filter[meta_query][1][key]=body-type&filter[meta_query][1][value]=${bodyType}&filter[meta_query][1][compare]==`;

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					similarVehicles: response.data.filter(data => data.id !== currentID)
				})
			}
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

	

	componentDidMount() {
		this._isMounted = true;
		this.getSimilarVehicles();
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.setState({
			similarVehicles: [],
			isLoading: true,
			perPage: 15,
			page: 1,
		});
	}

	render() {

		const {similarVehicles, isLoading} = this.state;

		const sliderSettings = {
			centerMode: true,
			centerPadding: '50px',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			autoplay: true,
  			autoplaySpeed: 3000,
  			prevArrow: <PrevArrow />,
  			nextArrow: <NextArrow />,
		}

		const numbers = [1,2,3,4,5,6,7,8,9,10];

		let similarCarsHtml = numbers.map((number, index) => 
			<div key={index}>
				<div className="sv_tile">
					<div className="sv_t_image">
						<div className="loading-gradient"></div>
					</div>
					<div className="sv_t_details">
						<h3 className="loading-gradient"></h3>
						<span className="loading-gradient"></span>
					</div>
				</div>
			</div>
		)

		if (!isLoading) {
			similarCarsHtml = similarVehicles.map((similarvehiclehtml, index) => 
				<div key={index}>
					<Link to={{
						pathname: "/listings/" + similarvehiclehtml.slug,
						state: {
							carname: similarvehiclehtml.title.rendered,
							carprice: similarvehiclehtml.post_meta_fields.sale_price && similarvehiclehtml.post_meta_fields.sale_price[0] !== "" ? similarvehiclehtml.post_meta_fields.sale_price[0] : similarvehiclehtml.post_meta_fields.car_price[0],
							exteriorColor: similarvehiclehtml.post_meta_fields['exterior-color'][0]
						}
					}}>
						<div className="sv_tile">
							<div className="sv_t_image">
								<img src={similarvehiclehtml.gallery_images[0]} className="img-fluid" />
								{similarvehiclehtml.post_meta_fields.car_sold == 1 ? (
									<div className="sold_badge">
										<span>Sold</span>
									</div>
								) : (
									similarvehiclehtml.listing_status.badge_text ? (
										<div className="angle_badge reserved">
											<span>Reserved</span>
										</div>
									) : (
										similarvehiclehtml.post_meta_fields.sale_price ? (
											<div className="angle_badge special-offer">
												<span>Special Offer</span>
											</div>
										) : (
											''
										)
									)
								)}
							</div>
							<div className="sv_t_details">
								<h3 dangerouslySetInnerHTML={createMarkup(similarvehiclehtml.title.rendered)} />
								{similarvehiclehtml.post_meta_fields.sale_price && similarvehiclehtml.post_meta_fields.sale_price[0] !== "" ? (
									<div className="ci-price">
										<span className="sale-price">AED {formatPrice(parseFloat(similarvehiclehtml.post_meta_fields.car_price[0]))}</span>
										<span className="car-price">AED {formatPrice(parseFloat(similarvehiclehtml.post_meta_fields.sale_price[0]))}</span>
									</div>
								) : (
									<div className="ci-price">
										<span className="car-price">AED {formatPrice(parseFloat(similarvehiclehtml.post_meta_fields.car_price[0]))}</span>
									</div>
								)}
							</div>
						</div>
					</Link>
				</div>
			)
		}

		return(
			<Slider {...sliderSettings}>{similarCarsHtml}</Slider>
		)
	}
}

class SendInquiry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {
				interested_in: this.props.interestedIn,
				slug: this.props.slug,
			},
			errors: {},
			isSending: false,
			sendingError: "",
			isSendingSuccess: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
	}

	handleChange(event) {
		let fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		if (this._isMounted) {
			this.setState({
				fields
			})
		}
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	validateForm() {

		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!fields['interested_in']) {

			formIsValid = false;
			errors['interested_in'] = 'Please enter your the vehicle you interested in';

		}

		if (!fields['your_name']) {

			formIsValid = false;
			errors['your_name'] = 'Please enter your name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( fields['your_name'].length <= 2 || !validateText.test(fields['your_name'])) {
				formIsValid = false;
				errors['your_name'] = 'Please enter a valid name';
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
		if (this._isMounted) {
			this.setState({
				errors: errors
			});
		}

		return formIsValid;
	}

	submitForm(event) {
		event.preventDefault();

		console.log(this.state.fields);

		let fields = {};

		if(this.validateForm()) {
			if (this._isMounted) {
				this.setState({
					isSending: true,
					sendingError: "",
					errors: {}
				});
			}

			axios.post('http://localhost/tecmobilewebsite/controllers/tec_send_mail/send_car_inquiry_send_mail.php', {
				interested_in: this.state.fields.interested_in,
				your_name: this.state.fields.your_name,
				email_address: this.state.fields.email_address,
				mobile_number: this.state.fields.mobile_number,
				message: this.state.fields.message,
				slug: this.state.fields.slug,
			})
			.then(
				(response) => {

					console.log(response);

					if (response.data.msg_code === 0) {
						fields['your_name'] = "";
						fields['email_address'] = "";
						fields['mobile_number'] = "";
						fields['message'] = "";
						fields['interested_in'] = this.props.interestedIn;
						fields['slug'] = this.props.slug;

						if (this._isMounted) {
							this.setState({
								fields: fields,
								isSendingSuccess: true,
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
					if (this._isMounted) {
						this.setState({
							sendingError: "Your message failed to send. Please try again",
						})
					}
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

	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		const {isSendingSuccess} = this.state;

		if (isSendingSuccess) {
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		return (
			<div className="container">
				<div className="form_container">
					{ this.state.sendingError ? (
							<div className="alert alert-danger" role="alert">{this.state.sendingError}</div>
						) : (
							""
						)
					}
					<form method="POST" onSubmit={this.submitForm}>
						<div className="form_item">
							<label>Interested In</label>
							<input type="text" name="interested_in" value={this.props.interestedIn || ''} onChange={this.handleChange} className={this.state.errors.interested_in ? "error":""} disabled="disabled" />
							<span>{this.state.errors.interested_in}</span>
						</div>
						<div className="form_item">
							<label>Your Name *</label>
							<input type="text" name="your_name" value={this.state.fields.your_name || ''} onChange={this.handleChange} className={this.state.errors.your_name ? "error":""} disabled={this.state.isSending ? "disabled" : ""} />
							<span>{this.state.errors.your_name}</span>
						</div>
						<div className="form_item">
							<label>Email Address *</label>
							<input type="email" name="email_address" value={this.state.fields.email_address || ''} onChange={this.handleChange} className={this.state.errors.email_address ? "error":""} disabled={this.state.isSending ? "disabled" : ""} />
							<span>{this.state.errors.email_address}</span>
						</div>
						<div className="form_item">
							<label>Mobile Number (Numbers only)*</label>
							<input type="tel" name="mobile_number" value={this.state.fields.mobile_number || ''} onChange={this.handleChange} className={this.state.errors.mobile_number ? "error":""} disabled={this.state.isSending ? "disabled" : ""} />
							<span>{this.state.errors.mobile_number}</span>
						</div>
						<div className="form_item">
							<label>Message</label>
							<textarea name="message" value={this.state.fields.message || ''} onChange={this.handleChange} disabled={this.state.isSending ? "disabled" : ""}></textarea>
						</div>
						<div className="form_item mb-0">
							<div className="tec-button-container two-button">
								<button className="tec-button" disabled={this.state.isSending ? "disabled" : ""} onClick={this.props.showHideModal}>Close</button>
								<button type="submit" className="tec-button" disabled={this.state.isSending ? "disabled" : ""}>{this.state.isSending ? "Sending..." : "Send"}</button>
							</div>
						</div>
					</form>
				</div>	
			</div>
		)
	}
}

class SingleView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			singleViewCar: [],
			singleViewCarImages: [],
			carSold: "",
			badgeText: "",
			salePrice: "",
			carPrice: "",
			isLoading: true,
			dataID: "",
			svShowInquiry: false,
			financeCalculator: {
				cost_of_vehicle: 0,
				down_payment: 0,
				annual_interest_rate: 2.99,
				term_of_loan: 5,
				frequency_of_payments: 2,
				number_of_payment: 0,
				payment_amount: 0
			},
			svShowShare: false,
			modalShareIsActive: false,
		}

		this.getSingleViewCar = this.getSingleViewCar.bind(this);
		this.financeCalculatorHandleChange = this.financeCalculatorHandleChange.bind(this);
		this.calculateFinance = this.calculateFinance.bind(this);
		this.handleSubmitFinance = this.handleSubmitFinance.bind(this);
		this.handleSVShowHideModal = this.handleSVShowHideModal.bind(this);
		this.handleSVShareShowHideModal = this.handleSVShareShowHideModal.bind(this);

		/*Modal*/
		this.handleShareModalToggle = this.handleShareModalToggle.bind(this);

	}

	getSingleViewCar(slugid) {

		const url = `https://theelitecars.com/wp-json/wp/v2/listings?slug=${slugid}&_embed`;

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {

				this.setState({
					singleViewCar: response.data,
					singleViewCarImages: response.data[0].gallery_images,
					carSold: response.data[0].post_meta_fields['car_sold'],
					badgeText: response.data[0].listing_status.badge_text,
					salePrice: response.data[0].post_meta_fields.sale_price,
					carPrice: response.data[0].post_meta_fields.car_price,
					dataID: response.data[0].id,
				})

				let vechiclePrice = 0;

				if (!response.data[0].post_meta_fields.sale_price || response.data[0].post_meta_fields.sale_price[0] == "" || response.data[0].post_meta_fields.sale_price[0] === 0) {
					vechiclePrice = response.data[0].post_meta_fields.car_price[0];
				} else {
					vechiclePrice = response.data[0].post_meta_fields.sale_price[0];
				}

				let tmpState = Object.assign({}, this.state);
				tmpState.financeCalculator.cost_of_vehicle = vechiclePrice;
				this.setState(tmpState);

				this.calculateFinance();
			}
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

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	financeCalculatorHandleChange(event) {
		let financeCalculator = this.state.financeCalculator;
		financeCalculator[event.target.name] = event.target.value;

		this.setState({
			financeCalculator
		})
	}

	handleSubmitFinance(event) {
		event.preventDefault();
		this.calculateFinance();
	}

	calculateFinance() {
		let {financeCalculator} = this.state;
		let frequency_rate = 0;
		
		switch(parseFloat(financeCalculator.frequency_of_payments)) {
			case 0:
				frequency_rate = 26;
				break;
			case 1:
				frequency_rate = 52;
				break;
			case 2:
				frequency_rate = 12;
				break;	
		}

		let interest_rate = (parseFloat(financeCalculator.annual_interest_rate)) / 100;
		let rate          = interest_rate / frequency_rate;
		let payments      = parseFloat(financeCalculator.term_of_loan) * frequency_rate;
		let difference    = parseFloat(financeCalculator.cost_of_vehicle) - parseFloat(financeCalculator.down_payment);

		let total_interest = (difference * interest_rate * parseFloat(financeCalculator.term_of_loan));
		let payment = Math.floor((difference+total_interest)/payments);

		let tmpState = Object.assign({}, this.state);
		tmpState.financeCalculator.number_of_payment = payments;
		tmpState.financeCalculator.payment_amount = payment;

		if (this._isMounted) {
			this.setState(tmpState);
		}
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	handleSVShowHideModal(e) {
		e.preventDefault();
		const {svShowInquiry} = this.state;

		if (svShowInquiry) {
			this.removeCustomClassBodyApp();
	    	this.setState({svShowInquiry: false});
		} else {
			this.addCustomClassBodyApp();
	    	this.setState({svShowInquiry: true});
		}
	}

	handleSVShareShowHideModal(e) {
		e.preventDefault();
		const {svShowShare} = this.state;

		if (svShowShare) {
			this.removeCustomClassBodyApp();
	    	this.setState({svShowShare: false});
		} else {
			this.addCustomClassBodyApp();
	    	this.setState({svShowShare: true});
		}
	}

	/*Modal*/
	handleShareModalToggle (e) {
		e.preventDefault();

		if (this.state.modalShareIsActive) {
			this.setState({
				modalShareIsActive: false
			})
		} else {
			this.setState({
				modalShareIsActive: true
			})
		}
	}

	componentDidMount() {
		this._isMounted = true;
		this.getSingleViewCar(this.props.match.params.slugid);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.match.params.slugid !== nextProps.match.params.slugid) {
			this.setState({
				isLoading: true,
			})
			this.getSingleViewCar(nextProps.match.params.slugid);
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.setState({
			singleViewCar: [],
			isLoading: true
		});
	}

	render() {

		const { singleViewCar, isLoading, carSold, badgeText, salePrice, carPrice } = this.state;
		const {carname, carprice, exteriorColor} = this.props.location.state;
		let singleViewCarHtml = <div className="pageloading mt-4"><img src={pageLoading} className="img-fluid"/></div>
		
		if (!isLoading) {
			singleViewCarHtml = singleViewCar.map((singlecarhtml, index) => 
				<div key={index}>
					<SingleViewSlider slideImages={this.state.singleViewCarImages} carSold={this.state.carSold} badgeText={this.state.badgeText} salePrice={this.state.salePrice} />
					<div className="single_view_container">
						<div className="container">
							<h1 dangerouslySetInnerHTML={this.createMarkup(singlecarhtml.title.rendered)} />
							{singlecarhtml.post_meta_fields.sale_price && singlecarhtml.post_meta_fields.sale_price[0] !== "" ? (
								<div className="ci-price">
									<span className="sale-price">AED {this.formatPrice(parseFloat(singlecarhtml.post_meta_fields.car_price[0]))}</span>
									<span className="car-price">AED {this.formatPrice(parseFloat(singlecarhtml.post_meta_fields.sale_price[0]))}</span>
								</div>
							) : (
								<div className="ci-price">
									<span className="car-price">AED {this.formatPrice(parseFloat(singlecarhtml.post_meta_fields.car_price[0]))}</span>
								</div>
							)}
						</div>
						<div className="row no-gutters svc-buttons">
							<div className="col-3">
								<a href="tel:+97143212290">
									<i className="material-icons">call</i>
									<span>CALL US</span>
								</a>
							</div>
							<div className="col-3">
								<a href="" onClick={this.handleSVShowHideModal}>
									<i className="material-icons">email</i>
									<span>SEND INQUIRY</span>
								</a>
								<TecModal modalToggle={this.state.svShowInquiry} showHideModal={this.handleSVShowHideModal} closeButton={false}>
									<h2>Inquire Now</h2>
									<SendInquiry interestedIn={singlecarhtml.title.rendered} slug={this.props.match.params.slugid} showHideModal={this.handleSVShowHideModal} afterSent={this.props.history} />
								</TecModal>
							</div>
							<div className="col-3">
								<NavLink to="/trade-in">
									<i className="material-icons">swap_horiz</i>
									<span>TRADE-IN</span>
								</NavLink>
							</div>
							<div className="col-3">
								<a href="" onClick={this.handleShareModalToggle}>
									<i className="material-icons">share</i>
									<span>SHARE</span>
								</a>
								<Modal 
									isActive={this.state.modalShareIsActive}
									closeButton={true}
									toggle={this.handleShareModalToggle}
									overlayClick={true}
									title="Share Now"
									maxWidth="300">
									<div className="share_buttons">
										<FacebookShareButton url={singlecarhtml.link} className="share_facebook">Facebook</FacebookShareButton>
										<TwitterShareButton url={singlecarhtml.link} title={singlecarhtml.title.rendered} className="share_twitter">Twitter</TwitterShareButton>
										<LinkedinShareButton url={singlecarhtml.link} title={singlecarhtml.title.rendered} className="share_linkedin">LinkedIn</LinkedinShareButton>
										<WhatsappShareButton url={singlecarhtml.link} title={singlecarhtml.title.rendered} className="share_whatsapp">Whatsapp</WhatsappShareButton>
									</div>
								</Modal>
							</div>
						</div>
						<div className="container">
							<h3>Insurance and Licensing Available</h3>
							<table>
								<tbody>
									{singlecarhtml.post_meta_fields['stock-no'] ? <tr><th>Stock No.</th><td>{singlecarhtml.post_meta_fields['stock-no']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['motors-trim'] ? <tr><th>Motors Trim</th><td>{singlecarhtml.post_meta_fields['motors-trim']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['kilometers'] ? <tr><th>Kilometers</th><td>{singlecarhtml.post_meta_fields['kilometers']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['exterior-color'] ? <tr><th>Exterior Color</th><td>{singlecarhtml.post_meta_fields['exterior-color']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['engine'] ? <tr><th>Engine</th><td>{singlecarhtml.post_meta_fields['engine']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['horsepower'] ? <tr><th>Horsepower</th><td>{singlecarhtml.post_meta_fields['horsepower']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['body-type'] ? <tr><th>Body Type</th><td>{singlecarhtml.post_meta_fields['body-type']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['no-of-cylinders'] ? <tr><th>No. of Cylinders</th><td>{singlecarhtml.post_meta_fields['no-of-cylinders']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['fuel-type'] ? <tr><th>Fuel Type</th><td>{singlecarhtml.post_meta_fields['fuel-type']}</td></tr> : ""}
									{singlecarhtml.post_meta_fields['warranty'] ? <tr><th>Warranty</th><td>{singlecarhtml.post_meta_fields['warranty']}</td></tr> : ""}
								</tbody>
							</table>
						</div>
						<div className="container-fluid">
							<div className="row no-gutters">
								<div className="col-12"><h2>Enjoy The Following Privileges</h2></div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={mechanicalCheck} className="img-fluid" /></div>
										<span>Mechanical Checks</span>
									</div>
								</div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={serviceContract} className="img-fluid" /></div>
										<span>Service Contract Can Be Arrange</span>
									</div>
								</div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={tradeIn} className="img-fluid" /></div>
										<span>Trade-In Assistance</span>
									</div>
								</div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={registration} className="img-fluid" /></div>
										<span>Registration Assistance</span>
									</div>
								</div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={warranty} className="img-fluid" /></div>
										<span>Warranty Available</span>
									</div>
								</div>
								<div className="col-12">
									<div className="svp_priviliges">
										<div className="svp_p_image"><img src={finance} className="img-fluid" /></div>
										<span>Finance And Insurance Assistance</span>
									</div>
								</div>
							</div>
						</div>
						<div className="container-fluid mb-3">
							<h2>Financing Options</h2>
							<p>We always find ways to make your dream of owning a luxury car possible. Offering flexible finance and insurance options as well as quick loan approval that takes within 48 hours, we ensure a convenient and hassle-free way to pay for your purchase. Let our in-house team of experts walk you through the entire process today!</p>
							<FinanceCalculator handleSubmitFinance={this.handleSubmitFinance} fields={this.state.financeCalculator} financeCalculatorChange={this.financeCalculatorHandleChange} />
							<h2>Similar Vehicles</h2>
							<SimilarVehicles currentID={this.state.dataID} bodyType={singlecarhtml.post_meta_fields['body-type']} />
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="single_view_page">
				<Helmet>
					<title>{ carname + " for Sale in Dubai, AED "+ carprice +" , " + exteriorColor}</title>
				</Helmet>
				{ singleViewCarHtml }
			</div>
		)
	}
}

export default SingleView;