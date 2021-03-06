import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import pageLoading from '../images/pageload.gif';
import TecModal from './modal';

class SellYourCarDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			allYears: []
		}

		this.getYears = this.getYears.bind(this);
	}

	getYears() {
		const dateToday = new Date();
		const maxYear = dateToday.getFullYear();
		const minYear = 2000;
		const {allYears} = this.state;

		for(let y = maxYear; y >= minYear; y--) {
			allYears.push(y);
		}

		this.setState({
			allYears
		})
	}

	componentDidMount() {
		this.getYears();
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		this.setState({
			allYears: []
		});
	}

	render() {
		const {carMakes, getMakeId, values, handleChange, models, gettingModels, carDetailsSubmit, carDetailsError} = this.props;
		const {allYears} = this.state;
		const carMakeLength = carMakes.length;
		const carModelsLength = models.length;

		return (
			<div className="sell_your_car_steps_page">
				<h1>Car Details</h1>
				<div className="container">
					<p><span>Step 1:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<form method="POST" onSubmit={carDetailsSubmit}>
						<div className="form_item">
							<label>Select A Make*</label>
							<select name="car_make" disabled={carMakeLength > 0 ? "" : "disabled"} onChange={getMakeId} value={values.car_make} className={carDetailsError.car_make ? "error":""}>
								<option value="">{carMakeLength > 0 ? "" : "Getting car makes..."}</option>
								{
									carMakes.map((carmake, index) => {
										return <option key={index} value={carmake.slug} data-makeid={carmake.id}>{carmake.name}</option>
									})
								}
							</select>
							<span>{carDetailsError.car_make}</span>
						</div>
						<div className="form_item">
							<label>Select A Model (Select a Car Make first) *</label>
							<select name="car_model" disabled={carModelsLength > 0 ? "" : "disabled"} onChange={handleChange} value={values.car_model} className={carDetailsError.car_model ? "error":""}>
								<option value="">{gettingModels ? "Getting car models..." : ""}</option>
								{
									models.map((model, index) => {
										return <option key={index} value={model.slug}>{model.name}</option>
									})
								}
							</select>
							<span>{carDetailsError.car_model}</span>
						</div>
						<div className="form_item">
							<label>Select A Year *</label>
							<select name="car_year" disabled={allYears.length > 0 ? "" : "disabled"} onChange={handleChange} value={values.car_year} className={carDetailsError.car_year ? "error":""}>
								<option value=""></option>
								{
									allYears.map((allyear, index) => {
										return <option key={index} value={allyear} >{allyear}</option>
									})
								}
							</select>
							<span>{carDetailsError.car_year}</span>
						</div>
						<div className="form_item">
							<label>Mileage *</label>
							<input type="number" name="car_mileage" onChange={handleChange} value={values.car_mileage || ''} className={carDetailsError.car_mileage ? "error":""} />
							<span>{carDetailsError.car_mileage}</span>
						</div>
						<div className="form_item">
							<label>Select A Specification *</label>
							<select name="car_specification" onChange={handleChange} value={values.car_specification} className={carDetailsError.car_specification ? "error":""}>
								<option value=""></option>
								<option value="GCC">GCC</option>
								<option value="Non-GCC">Non-GCC</option>
								<option value="I Don't Know">I Don't Know</option>
							</select>
							<span>{carDetailsError.car_specification}</span>
						</div>
						<div className="form_item">
							<label>Select A Vehicle Condition *</label>
							<select name="car_condition" onChange={handleChange} value={values.car_condition} className={carDetailsError.car_condition ? "error":""}>
								<option value=""></option>
								<option value="Good">Good</option>
								<option value="Average">Average</option>
								<option value="Below Average">Below Average</option>
							</select>
							<span>{carDetailsError.car_condition}</span>
						</div>
						<div className="form_item">
							<label>Select A Service History *</label>
							<select name="car_service_history" onChange={handleChange} value={values.car_service_history} className={carDetailsError.car_service_history ? "error":""}>
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
							<select name="car_body_type" onChange={handleChange} value={values.car_body_type} className={carDetailsError.car_body_type ? "error":""}>
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
							<select name="car_option" onChange={handleChange} value={values.car_option} className={carDetailsError.car_option ? "error":""}>
								<option value=""></option>
								<option value="Basic">Basic</option>
								<option value="Mid Option">Mid Option</option>
								<option value="Full Option">Full Option</option>
							</select>
							<span>{carDetailsError.car_option}</span>
						</div>
						<div className="form_item">
							<label>Engine</label>
							<input type="text" name="car_engine" onChange={handleChange} value={values.car_engine || ''} />
							<span></span>
						</div>
						<div className="form_item mt-4">
							<button type="submit" className="tec-button">Continue</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

class SellYourAppointment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gettingAvailableTimes: false,
			dateToday: null,
			timings: [
				"09:00",
				"09:30",
				"10:00",
				"10:30",
				"11:00",
				"11:30",
				"12:00",
				"12:30",
				"13:00",
				"13:30",
				"14:00",
				"14:30",
				"15:00",
				"15:30",
				"16:00",
				"16:30",
				"17:00",
				"17:30",
				"18:00",
				"18:30",
				"19:00",
				"19:30",
	        ],
			unavailableTimings: [],
			showTimings: [],
		}

		this.datePickerOnChange = this.datePickerOnChange.bind(this);
		this.getAvailableTimings = this.getAvailableTimings.bind(this);
		this.showAvailableTimings = this.showAvailableTimings.bind(this);
		this.convertMilitaryTime = this.convertMilitaryTime.bind(this);
		this.addDays = this.addDays.bind(this);
	}

	getAvailableTimings(date) {

		const dateSelected = date.toLocaleDateString();

		const url = `http://theelitecars.com/mobile/controllers/available_times.php?dateSelected=${dateSelected}`;
		this.setState({
			gettingAvailableTimes: true,
		});
		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					unavailableTimings: response.data,
				})
				this.showAvailableTimings();
			}
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					gettingAvailableTimes: false,
				});
			}
		})
	}

	convertMilitaryTime(getTime) {
        var m_time = getTime;
        var hourValue;
        var minutesValue;
        var ampm = "AM";
        
        m_time = m_time.split(':');
        
        var hours = Number(m_time[0]);
        var minutes = Number(m_time[1]);

        if (hours > 0 && hours < 10) {
            hourValue= "0" + hours;
        } else if (hours > 12) {
            hourValue= "0" + (hours - 12);
            ampm = "PM"
        } else if (hours === 0) {
            hourValue= "12";
        } else if (hours === 12) {
            hourValue= "12";
            if (minutes > 29) {
                ampm = "PM"
            }
        }else {
            hourValue = hours;
        }
        
        if (minutes >= 0 && minutes < 10) {
            minutesValue = "0" + minutes;
        } else {
            minutesValue = minutes;
        }
        
        return hourValue + ":" + minutesValue + " " + ampm;
    }

	showAvailableTimings() {
		const {timings, unavailableTimings, showTimings} = this.state;

        for (var t = 0; t < timings.length; t++) {
        	let disabled = false;

        	if (unavailableTimings.length > 0) {
				for(var ut = 0; ut < unavailableTimings.length; ut++) {
					if (unavailableTimings[ut] == timings[t]) {
						disabled = true;
					}
				}
        	}

        	if (!disabled) {
        		showTimings.push({value: timings[t], disabled: false});
            } else {
            	showTimings.push({value: timings[t], disabled: true});
            }
        }
	}

	datePickerOnChange(date) {
		const {resetAppointmentTime, updateDatePicker} = this.props;

		this.getAvailableTimings(date);
		resetAppointmentTime();
		updateDatePicker(date);

		this.setState({
			showTimings: [],
			dateToday: date
		})

	}

	addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	componentDidMount() {
		this._isMounted = true;
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		this.setState({
			gettingAvailableTimes: false,
			dateToday: null,
			timings: [
				"09:00",
				"09:30",
				"10:00",
				"10:30",
				"11:00",
				"11:30",
				"12:00",
				"12:30",
				"13:00",
				"13:30",
				"14:00",
				"14:30",
				"15:00",
				"15:30",
				"16:00",
				"16:30",
				"17:00",
				"17:30",
				"18:00",
				"18:30",
				"19:00",
				"19:30",
	        ],
			unavailableTimings: [],
			showTimings: [],
		});
		this._isMounted = false;
	}

	render() {
		const {handleChange, values, prevForm, appointmentSubmit, appointmentError, isSending} = this.props;
		const {dateToday, gettingAvailableTimes, showTimings} = this.state;

		let showTimingsHtml = "";


		if (showTimings.length > 0) {
			showTimingsHtml = showTimings.map((showtiming, index) => {
				return <option key={index} value={showtiming.value} disabled={showtiming.disabled ? "disabled":""} style={showtiming.disabled ? {backgroundColor: '#f5f5f5'}:{}}>{this.convertMilitaryTime(showtiming.value)}</option>
			})
		}

		return(
			<div className="sell_your_car_steps_page">
				<h1>Appointment</h1>
				<div className="container">
					<p><span>Step 2:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<form method="POST" onSubmit={appointmentSubmit}>
						<div className="form_item mt-4">
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" onChange={handleChange} value={values.first_name || ''} className={appointmentError.first_name ? "error":""} />
								<span>{appointmentError.first_name}</span>
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="last_name" onChange={handleChange} value={values.last_name || ''} className={appointmentError.last_name ? "error":""} />
								<span>{appointmentError.last_name}</span>
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="email_address" onChange={handleChange} value={values.email_address || ''} className={appointmentError.email_address ? "error":""} />
								<span>{appointmentError.email_address}</span>
							</div>
							<div className="form_item">
								<label>Mobile Number *</label>
								<input type="tel" name="mobile_number" onChange={handleChange} value={values.mobile_number || ''} className={appointmentError.mobile_number ? "error":""} />
								<span>{appointmentError.mobile_number}</span>
							</div>
							<div className={appointmentError.appointment_time ? "form_item apt_date_picker error":"form_item apt_date_picker"}>
								<label>Appointment Date *</label>
								<DatePicker
									selected={dateToday}
									onChange={this.datePickerOnChange}
									minDate={this.addDays(new Date(), 1)}
									name="appointment_date"
									className={appointmentError.appointment_date ? "error":""}
								/>
								<span>{appointmentError.appointment_date}</span>
							</div>
							<div className="form_item">
								<label>Appointment Time *</label>
								<select name="appointment_time" onChange={handleChange} value={values.appointment_time} className={appointmentError.appointment_time ? "error":""}>
									<option value="">{gettingAvailableTimes ? "Getting available timings...":""}</option>
									{ showTimingsHtml }
								</select>
								<span>{appointmentError.appointment_time}</span>
							</div>
							<div className="form_item">
								<label>Message</label>
								<textarea name="message" onChange={handleChange} value={values.message || ''}></textarea>
								<span></span>
							</div>
							<div className="tec-button-container two-button">
								<button type="button" className="tec-button" onClick={prevForm}>Back</button>
								<button type="submit" className="tec-button">Book An Appointment</button>
							</div>
						</div>
					</form>
				</div>
				<TecModal modalToggle={isSending} showHideModal={this.handleShowHideSending} closeButton={false} modalDialog={true}>
					<img src={pageLoading} className="img-fluid page-loading"/>
				</TecModal>
			</div>
		)
	}
}

class SellYourCarStep extends Component {

	constructor(props) {
		super(props);

		this.state = {
			step: 1,
			sellYourCarFields: {},
			models: [],
			gettingModels: false,
			carDetailsError: {},
			appointmentError: {},
			token: '',
			isSending: false,
			isSendingSuccess: false,
			sendingError: ''
		}

		this.getAllModels = this.getAllModels.bind(this);
		this.getMakeId = this.getMakeId.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.nextForm = this.nextForm.bind(this);
		this.prevForm = this.prevForm.bind(this);
		this.carDetailsSubmit = this.carDetailsSubmit.bind(this);
		this.appointmentSubmit = this.appointmentSubmit.bind(this);
		this.resetAppointmentTime = this.resetAppointmentTime.bind(this);
		this.validateCarDetails = this.validateCarDetails.bind(this);
		this.validateAppointment = this.validateAppointment.bind(this);
		this.updateDatePicker = this.updateDatePicker.bind(this);
		this.getAppointmentTicket = this.getAppointmentTicket.bind(this);
		this.submitSellYourCar = this.submitSellYourCar.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);
	}

	getAllModels(makeid) {

		const url = `https://theelitecars.com/wp-json/wp/v2/makes_models?parent=${makeid}&per_page=100`;

		if (this._isMounted) {
			this.setState({
				models: [],
				gettingModels: true,
			})
		}

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					models: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					gettingModels: false,
				});
			}
		})
	}

	getMakeId(event) {
		const makeid = event.target[event.target.selectedIndex].getAttribute('data-makeid');
		const { sellYourCarFields } = this.state;
		sellYourCarFields[event.target.name] = event.target.value;
		sellYourCarFields['car_model'] = "";

		if (makeid) {
			this.getAllModels(makeid);
			if (this._isMounted) {
				this.setState({
					sellYourCarFields
				})
			}
		} else {
			if (this._isMounted) {
				this.setState({
					models: []
				})
			}
		}
	}

	handleChange(event) {
		const { sellYourCarFields } = this.state;
		sellYourCarFields[event.target.name] = event.target.value;
		if (this._isMounted) {
			this.setState({
				sellYourCarFields
			});
		}
	}

	resetAppointmentTime(event) {
		const { sellYourCarFields } = this.state;
		sellYourCarFields['appointment_time'] = "";
		if (this._isMounted) {
			this.setState({
				sellYourCarFields
			});
		}
	}

	updateDatePicker(date){
		const { sellYourCarFields } = this.state;
		sellYourCarFields['appointment_date'] = date.toLocaleDateString();

		this.setState({
			sellYourCarFields
		});
	}

	nextForm() {
		const {step} = this.state;
		this.setState({
			step: step + 1,
		})
	}

	prevForm() {
		const {step} = this.state;
		this.setState({
			step: step - 1,
		})
	}

	carDetailsSubmit(e) {
		e.preventDefault();
		if (this.validateCarDetails()) {
			this.nextForm();
		}
	}

	appointmentSubmit(e) {
		e.preventDefault();
		const {sellYourCarFields} = this.state;

		if (this.validateAppointment()) {
			this.submitSellYourCar();
		}
	}

	submitSellYourCar() {

		const {sellYourCarFields} = this.state;

		console.log(sellYourCarFields)

		this.setState({
			isSending: true
		});

		axios.post('https://theelitecars.com/mobile/controllers/tec_send_mail/sell_your_car_send.php', sellYourCarFields)
		.then(
			(response) => {

				console.log(response);

				if (response.data.msg_code === 0) {
					if (this._isMounted) {
						this.setState({
							sellYourCarFields: {},
							isSendingSuccess: true,
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
					let appointmentError = {}

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

						if(response.data[rd].input_field == "appointment_date") {
							appointmentError['appointment_date'] = 'Please select an appointment date';
						}

						if(response.data[rd].input_field == "appointment_time") {
							appointmentError['appointment_time'] = 'Please select an appointment time';
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
		const {sellYourCarFields} = this.state;
		let errors = {}
		let formIsValid = true;

		if(!sellYourCarFields['car_make']) {
			errors['car_make'] = 'Please select a car make';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_model']) {
			errors['car_model'] = 'Please select a car model';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_year']) {
			errors['car_year'] = 'Please select a car year';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_mileage']) {
			errors['car_mileage'] = 'Please input your car mileage';
			formIsValid = false;
		} else {
			if (parseFloat(sellYourCarFields['car_mileage']) < 0) {
				errors['car_mileage'] = 'Please input a valid car mileage';
				formIsValid = false;
			}
		}

		if(!sellYourCarFields['car_specification']) {
			errors['car_specification'] = 'Please select a car specification';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_condition']) {
			errors['car_condition'] = 'Please select a car condition';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_service_history']) {
			errors['car_service_history'] = 'Please select a car service history';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_body_type']) {
			errors['car_body_type'] = 'Please select a car body type';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_option']) {
			errors['car_option'] = 'Please select a car option';
			formIsValid = false;
		}
		if (this._isMounted) {
			this.setState({
				carDetailsError: errors
			});	
		}
		
		return formIsValid;
	}

	validateAppointment() {
		const {sellYourCarFields} = this.state;
		let errors = {}
		let formIsValid = true;

		if (!sellYourCarFields['first_name']) {
			formIsValid = false;
			errors['first_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( sellYourCarFields['first_name'].length <= 2 || !validateText.test(sellYourCarFields['first_name'])) {
				formIsValid = false;
				errors['first_name'] = 'Please enter a valid first name';
			}
		}

		if (!sellYourCarFields['last_name']) {

			formIsValid = false;
			errors['last_name'] = 'Please enter your last name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( sellYourCarFields['last_name'].length <= 2 || !validateText.test(sellYourCarFields['last_name'])) {
				formIsValid = false;
				errors['last_name'] = 'Please enter a valid last name';
			}

		}

		if (!sellYourCarFields['email_address']) {

			formIsValid = false;
			errors['email_address'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( sellYourCarFields['email_address'].length <= 6 || !validateEmail.test(sellYourCarFields['email_address'])) {
				formIsValid = false;
				errors['email_address'] = 'Please enter your valid email address';
			}

		}

		if (!sellYourCarFields['mobile_number']) {

			formIsValid = false;
			errors['mobile_number'] = 'Please enter your mobile number';

		} else {

			let validatePhone = /^[+-]?\d+$/;

			if ( sellYourCarFields['mobile_number'].length <= 5 || !validatePhone.test(sellYourCarFields['mobile_number'])) {
				formIsValid = false;
				errors['mobile_number'] = 'Please enter your valid mobile number';
			}

		}

		if(!sellYourCarFields['appointment_date']) {
			errors['appointment_date'] = 'Please select an appointment date';
			formIsValid = false;
		}

		if(!sellYourCarFields['appointment_time']) {
			errors['appointment_time'] = 'Please select an appointment time';
			formIsValid = false;
		}

		if (this._isMounted) {
			this.setState({
				appointmentError: errors
			});	
		}

		return formIsValid;
	}

	getAppointmentTicket(tokenLength) {
		let token = "";
		let codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        codeAlphabet += "abcdefghijklmnopqrstuvwxyz";
        codeAlphabet += "0123456789";

        const { sellYourCarFields } = this.state;
        const max = codeAlphabet.length;

        for (var i = 0; i < tokenLength; i++) {
        	token += codeAlphabet[Math.floor(Math.random() * max)];
        }

        sellYourCarFields['token'] = "SFIC-" + token;

        if (this._isMounted) {
        	this.setState({
        		sellYourCarFields
        	})
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
		this.getAppointmentTicket(7);
	}

	componentWillUnmount() {
		this.setState({
			step: 1,
			sellYourCarFields: {},
			models: [],
			gettingModels: false,
			carDetailsError: {},
			appointmentError: {},
			token: '',
			isSending: false,
			isSendingSuccess: false,
			sendingError: ''
		});
		this._isMounted = false;
	}

	render() {

		const {isSendingSuccess} = this.state;

		if (isSendingSuccess) {
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		switch(this.state.step) {
			case 1:
				return <SellYourCarDetails 
					carMakes={this.props.carMakes} 
					models={this.state.models} 
					getMakeId={this.getMakeId} 
					handleChange={this.handleChange} 
					values={this.state.sellYourCarFields} 
					gettingModels={this.state.gettingModels}
					carDetailsSubmit={this.carDetailsSubmit}
					carDetailsError={this.state.carDetailsError}/>
			break;
			case 2:
				return <SellYourAppointment
					handleChange={this.handleChange} 
					values={this.state.sellYourCarFields} 
					appointmentSubmit={this.appointmentSubmit} 
					prevForm={this.prevForm} 
					resetAppointmentTime={this.resetAppointmentTime}
					appointmentError={this.state.appointmentError}
					updateDatePicker={this.updateDatePicker}
					isSending={this.state.isSending} 
					handleShowHideSending={this.handleShowHideSending} />
			break;
		}	
	}
}


export default SellYourCarStep;