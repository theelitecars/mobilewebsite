import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";

import headerImage from '../images/service_department.jpg';
import pageLoading from '../images/pageload.gif';
import Modal from './web-components/modal';
import axios from 'axios';
import DatePicker from "react-datepicker";

class ServiceDepartmentAppointment extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dateToday: null,
			serviceAppointmentFields: {},
			serviceAppointmentError: {},
			redirect: false,
			sendingError: '',
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
	        ]
		}

		this.datePickerOnChange = this.datePickerOnChange.bind(this);
		this.addDays = this.addDays.bind(this);
		this.convertMilitaryTime = this.convertMilitaryTime.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submitServiceForm = this.submitServiceForm.bind(this);
		this.validateServiceForm = this.validateServiceForm.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		
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

    handleChange(event) {
		const { serviceAppointmentFields } = this.state;
		serviceAppointmentFields[event.target.name] = event.target.value;
		if (this._isMounted) {
			this.setState({
				serviceAppointmentFields
			});
		}
	}

	datePickerOnChange(date) {
		const { serviceAppointmentFields } = this.state;

		serviceAppointmentFields["appointment_date"] = date.toLocaleDateString();

		if (this._isMounted) {
			this.setState({
				serviceAppointmentFields,
				dateToday: date,
			})
		}
	}

	addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	submitServiceForm(event) {
		event.preventDefault();

		const {handleIsSending} = this.props;
		const {serviceAppointmentFields, serviceAppointmentError} = this.state;

		if (this.validateServiceForm()) {
			handleIsSending();

		axios.post('https://theelitecars.com/mobile/controllers/send_mail/service_department_send_mail.php', serviceAppointmentFields)
		.then(
			(response) => {

				if (response.data.msg_code === 0) {
					if (this._isMounted) {
						this.setState({
							dateToday: null,
							serviceAppointmentFields: {},
							serviceAppointmentError: {},
							sellYourCarFields: {},
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
					let serviceAppointmentError = {}

					for (var rd = response.data.length - 1; rd >= 0; rd--) {

						if(response.data[rd].input_field == "service_option") {
							serviceAppointmentError['service_option'] = 'Please select a car body type';
						}

						if(response.data[rd].input_field == "first_name") {
							serviceAppointmentError['first_name'] = 'Please enter a valid first name';
						}

						if(response.data[rd].input_field == "last_name") {
							serviceAppointmentError['last_name'] = 'Please enter a valid last name';
						}

						if(response.data[rd].input_field == "email_address") {
							serviceAppointmentError['email_address'] = 'Please enter a valid email address';
						}

						if(response.data[rd].input_field == "mobile_number") {
							serviceAppointmentError['mobile_number'] = 'Please enter a valid number';
						}

						if(response.data[rd].input_field == "appointment_date") {
							serviceAppointmentError['appointment_date'] = 'Please select an appointment date';
						}

						if(response.data[rd].input_field == "appointment_time") {
							serviceAppointmentError['appointment_time'] = 'Please select an appointment time';
						}

						if (this._isMounted) {
							this.setState({
								sendingError: "Please enter a valid form input.",
								serviceAppointmentError: serviceAppointmentError,
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
	}

	validateServiceForm() {
		const {serviceAppointmentFields} = this.state;
		let errors = {}
		let formIsValid = true;

		if(!serviceAppointmentFields['service_option']) {
			errors['service_option'] = 'Please select a service';
			formIsValid = false;
		}

		if(!serviceAppointmentFields['appointment_date']) {
			errors['appointment_date'] = 'Please select an appointment date';
			formIsValid = false;
		}

		if(!serviceAppointmentFields['appointment_time']) {
			errors['appointment_time'] = 'Please select an appointment time';
			formIsValid = false;
		}

		if(!serviceAppointmentFields['appointment_time']) {
			errors['appointment_time'] = 'Please select an appointment time';
			formIsValid = false;
		}

		if (!serviceAppointmentFields['first_name']) {
			formIsValid = false;
			errors['first_name'] = 'Please enter your first name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( serviceAppointmentFields['first_name'].length <= 2 || !validateText.test(serviceAppointmentFields['first_name'])) {
				formIsValid = false;
				errors['first_name'] = 'Please enter a valid first name';
			}
		}

		if (!serviceAppointmentFields['last_name']) {

			formIsValid = false;
			errors['last_name'] = 'Please enter your last name';

		} else {

			let validateText = /^[a-zA-Z ]*$/;

			if ( serviceAppointmentFields['last_name'].length <= 2 || !validateText.test(serviceAppointmentFields['last_name'])) {
				formIsValid = false;
				errors['last_name'] = 'Please enter a valid last name';
			}

		}

		if (!serviceAppointmentFields['email_address']) {

			formIsValid = false;
			errors['email_address'] = 'Please enter your email address';

		} else {
			
			let validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( serviceAppointmentFields['email_address'].length <= 6 || !validateEmail.test(serviceAppointmentFields['email_address'])) {
				formIsValid = false;
				errors['email_address'] = 'Please enter your valid email address';
			}

		}

		if (!serviceAppointmentFields['mobile_number']) {

			formIsValid = false;
			errors['mobile_number'] = 'Please enter your mobile number';

		} else {

			let validatePhone = /^[+-]?\d+$/;

			if ( serviceAppointmentFields['mobile_number'].length <= 5 || !validatePhone.test(serviceAppointmentFields['mobile_number'])) {
				formIsValid = false;
				errors['mobile_number'] = 'Please enter your valid mobile number';
			}

		}

		if (this._isMounted) {
			this.setState({
				serviceAppointmentError: errors
			});	
		}

		return formIsValid;
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
	}

	componentWillUnmount() {
		this.setState({
			dateToday: null,
			serviceAppointmentFields: {},
			serviceAppointmentError: {},
			redirect: false,
			sendingError: '',
		})
		this._isMounted = false;
	}

	render () {

		const {dateToday, serviceAppointmentError, serviceAppointmentFields, redirect, sendingError, timings} = this.state;
		const {isSending, handleIsSending} = this.props;

        if (redirect) {
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		return (
			<div className="service_department_form">
				<h2>Book Your Appointment</h2>
				<form method="POST" autoComplete="off" onSubmit={this.submitServiceForm}>
					{ sendingError ? (
							<div className="alert alert-danger" role="alert">{sendingError}</div>
						) : (
							""
						)
					}
					<div className="form_item">
						<label>Select A Service *</label>
						<select name="service_option" onChange={this.handleChange} value={serviceAppointmentFields.service_option} className={serviceAppointmentError.service_option ? "error":""} disabled={isSending ? true : false}>
							<option value=""></option>
							<option value="Full Detailing & Valeting">Full Detailing & Valeting</option>
							<option value="Painting Service">Painting Service</option>
							<option value="Complete Auto Service">Complete Auto Service</option>
							<option value="Mechanical Works">Mechanical Works</option>
							<option value="Car Tinting">Car Tinting</option>
							<option value="Car Modifications (Body Kits)">Car Modifications (Body Kits)</option>
						</select>
						<span>{serviceAppointmentError.service_option}</span>
					</div>
					<div className="form_item">
						<label>Appointment Date *</label>
						<DatePicker
							selected={dateToday}
							onChange={this.datePickerOnChange}
							minDate={this.addDays(new Date(), 1)}
							name="appointment_date"
							className={serviceAppointmentError.appointment_date ? "error":""}
							disabled={isSending ? true : false}
						/>
						<span>{serviceAppointmentError.appointment_date}</span>
					</div>
					<div className="form_item">
						<label>Appointment Time *</label>
						<select name="appointment_time" onChange={this.handleChange} value={serviceAppointmentFields.appointment_time} className={serviceAppointmentError.appointment_time ? "error":""} disabled={isSending ? true : false}>
							<option value=""></option>
							{
								timings.map((timing, index) => {
									return <option key={index} value={timing}>{this.convertMilitaryTime(timing)}</option>
								})
							}
						</select>
						<span>{serviceAppointmentError.appointment_time}</span>
					</div>
					<div className="form_item">
						<label>First Name *</label>
						<input type="text" name="first_name" onChange={this.handleChange} value={serviceAppointmentFields.first_name || ''} className={serviceAppointmentError.first_name ? "error":""} disabled={isSending ? true : false} />
						<span>{serviceAppointmentError.first_name}</span>
					</div>
					<div className="form_item">
						<label>Last Name *</label>
						<input type="text" name="last_name" onChange={this.handleChange} value={serviceAppointmentFields.last_name || ''} className={serviceAppointmentError.last_name ? "error":""} disabled={isSending ? true : false} />
						<span>{serviceAppointmentError.last_name}</span>
					</div>
					<div className="form_item">
						<label>Email Address *</label>
						<input type="email" name="email_address" onChange={this.handleChange} value={serviceAppointmentFields.email_address || ''} className={serviceAppointmentError.email_address ? "error":""} disabled={isSending ? true : false} />
						<span>{serviceAppointmentError.email_address}</span>
					</div>
					<div className="form_item">
						<label>Mobile Number *</label>
						<input type="tel" name="mobile_number" onChange={this.handleChange} value={serviceAppointmentFields.mobile_number || ''} className={serviceAppointmentError.mobile_number ? "error":""} disabled={isSending ? true : false} />
						<span>{serviceAppointmentError.mobile_number}</span>
					</div>
					<div className="form_item">
						<label>Message</label>
						<textarea name="message" onChange={this.handleChange} value={serviceAppointmentFields.message || ''} disabled={isSending ? true : false} ></textarea>
					</div>
					<div className="form_item">
						<button type="submit" className="tec_button" disabled={isSending ? true : false}>{isSending ? 'Sending...' : 'Send Inquiry'}</button>
					</div>
				</form>
			</div>
		)
	}
}

class ServiceDepartment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showHideModal: false,
			isSending: false,
		}

		this.handleDropDownToggle = this.handleDropDownToggle.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.handleIsSending = this.handleIsSending.bind(this);
	}

	handleIsSending() {
		const {isSending} = this.state;

		if (isSending) {
			this.setState({
				isSending: false
			})
		} else {
			this.setState({
				isSending: true
			})
		}
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

	handleShowHideSending() {

		const {showHideModal}  = this.state;

		if (showHideModal) {
			this.removeCustomClassBodyApp();
	    	this.setState({showHideModal: false});
		} else {
			this.addCustomClassBodyApp();
	    	this.setState({showHideModal: true});
		}
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	render() {
		const {showHideModal, isSending} = this.state;

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
						<button className="tec_button mx-auto" onClick={this.handleShowHideSending}>Proceed</button>
					</div>
				</div>
				<Modal
					isActive={showHideModal}
					toggle={this.handleShowHideSending}
					closeButton={true}
					overlayClick={true}
					maxWidth="500"
					disableClose={isSending}>
					<ServiceDepartmentAppointment handleIsSending={this.handleIsSending} isSending={isSending} />
				</Modal>
			</div>
		)
	}
}

export default ServiceDepartment;