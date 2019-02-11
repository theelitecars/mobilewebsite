import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import Slider from 'react-rangeslider';
import DatePicker from "react-datepicker";

import { CarListViewMinified } from './views/car_lists';
import TecModal from './modal';
import Modal from './web-components/modal';

import 'react-rangeslider/lib/index.css';
import "react-datepicker/dist/react-datepicker.css";

import pageLoading from '../images/pageload.gif';

class CarDetailsTradeIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelContainer: [],
			all_makes_models: [],
		}

		this.itemMakeFormatDisplay = this.itemMakeFormatDisplay.bind(this);
		this.getModels = this.getModels.bind(this);
		this.handleModelChange = this.handleModelChange.bind(this);
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
		this.props.setsellYourCarFieldsMake(event.target.value);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getAllMakes();
	}

	componentWillUnmount() {
		this.setState({
			allYears: []
		});
	}

	render () {
		const {values, handleChange, carDetailsSubmit, carDetailsError, sendingError} = this.props;
		const {modelContainer, all_makes_models} = this.state;

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

		return (
			<div className="sell_your_car_steps_page">
				<h1>Trade-In - Car Details</h1>
				<div className="container">
					<form method="POST" onSubmit={carDetailsSubmit}>
						{ sendingError ? (
								<div className="alert alert-danger" role="alert">{sendingError}</div>
							) : (
								""
							)
						}
						<div className="form_item">
							<label>Select A Make*</label>
							<select name="car_make" onChange={this.handleModelChange} value={values.car_make} className={carDetailsError.car_make ? "error":""}>
								<option value=""></option>
								{makeOptions}
							</select>
							<span>{carDetailsError.car_make}</span>
						</div>
						<div className="form_item">
							<label>Select A Model (Select a Car Make first) *</label>
							<select name="car_model" disabled={modelContainer.length > 0 ? false : true} onChange={handleChange} value={values.car_model} className={carDetailsError.car_model ? "error":""}>
								<option value=""></option>
								{modelOptions}
							</select>
							<span>{carDetailsError.car_model}</span>
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
							<label>Select A Year *</label>
							<select name="car_year" onChange={handleChange} value={values.car_year} className={carDetailsError.car_year ? "error":""}>
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
							<input type="number" name="car_mileage" onChange={handleChange} value={values.car_mileage || ''} className={carDetailsError.car_mileage ? "error":""} />
							<span>{carDetailsError.car_mileage}</span>
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

class CarSelectTradeIn extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			volume: this.props.selectedPrice * 1 === 100000 || this.props.selectedPrice * 1 === 0 ? 100000 : this.props.selectedPrice * 1,
			allStocks: [],
			perPage: 10,
			page: 1,
			totalPages: 0,
			scrolling: false,
			isLoading: false,
			carListNoData: false,
			isLoadingScroll: false,
		}

		this.handleOnChangeRange = this.handleOnChangeRange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
		this.formatPrice = this.formatPrice.bind(this);
		this.getAllStocksTradeIn = this.getAllStocksTradeIn.bind(this);
		this.handleCarIsSelected = this.handleCarIsSelected.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);

	}

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	getAllStocksTradeIn() {
		const {allStocks, perPage, page, volume} = this.state;

		let carpricemax = volume;
		let carpricemin = (volume > 300000 ? volume - 200000: (volume < 200000 ? 0 : 100000));

		let url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][0][compare]==&filter[meta_query][1][key]=car_price&filter[meta_query][1][value][0]=${carpricemin}&filter[meta_query][1][value][1]=${carpricemax}&filter[meta_query][1][compare]=between&filter[meta_query][1][type]=numeric&filter[meta_query][2][key]=sale_price&filter[meta_query][2][value][0]=${carpricemin}&filter[meta_query][2][value][1]=${carpricemax}&filter[meta_query][2][compare]=between&filter[meta_query][2][type]=numeric`;

		if (this._isMounted) {
			if (this.fromHandleRange) {
				this.setState({
					isLoading: true,
					allStocks: [],
				});
			} else {
				this.setState({
					isLoadingScroll: true,
				});
			}
		}

		axios.get(url)
		.then((response) => {
			if (response.data.length > 0) {
				if (this._isMounted) {
					if (this.fromHandleRange) {
						this.setState({
							allStocks: response.data,
							scrolling: false,
							totalPages: response.headers["x-wp-totalpages"]
						});	
					} else {
						this.setState({
							allStocks: [...allStocks, ...response.data],
							scrolling: false,
							totalPages: response.headers["x-wp-totalpages"]
						});	
					}
					
				}
			} else {
				this.setState({
					carListNoData: true,
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
					isLoadingScroll: false,
				});
			}
		})
	}

	handleOnChangeRange(value){
		this.setState({
			volume: value,
			page: 1,
			totalPages: 0,
		})

		this.props.handleSelectedPrice(value);
	}

	handleChangeComplete() {
		this.fromHandleRange = true;
		this.getAllStocksTradeIn();
	}

	handleCarIsSelected(data) {
		this.props.handleCarIsSelected(data);

		setTimeout(() => {
			window.scrollTo({
				top: 0,
  				left: 0,
  				behavior: 'smooth'
  			});
		}, 500)
	}

	loadMore() {
		if (this._isMounted) {
			this.fromHandleRange = false;
			this.setState((prevState, props) => ({
				page: prevState.page + 1,
				scrolling: true,
				isLoadingScroll: true,
			}), this.getAllStocksTradeIn);		
		}
	}

	handleScroll() {
		const { page, totalPages, scrolling } = this.state;
		if (scrolling) return
		if (page >= totalPages) return
		const lastCarItem = document.querySelector('.trade_in_car_lists > div:last-child');
		const lastCarItemOffset = (lastCarItem ? lastCarItem.offsetTop + lastCarItem.clientHeight : 0);
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastCarItemOffset - bottomOffset) this.loadMore()
	}

	componentDidMount() {
		this._isMounted = true;
		this.fromHandleRange = false;

		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this.handleChangeComplete();
		this.props.handleSelectedPrice(this.state.volume);

		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render () {
		const {volume, isLoading, allStocks, carListNoData} = this.state;
		const {prevForm, selectedCar, selectedPrice, carSelectedSubmit, selectedCarError, sendingError} = this.props;

		let car_lists = <div className="my-4 text-center"><img src={pageLoading} className="page-loading img-fluid"/></div>;

		if (!isLoading) {
			if (allStocks.length > 0) {
				car_lists = allStocks.map((allstock, index) => {
					return <div key={index} className={selectedCar.id === allstock.id ? "active":""} onClick={this.handleCarIsSelected.bind(this, allstock)}><CarListViewMinified carDetails={allstock} /></div>
				})	
			} else {
				if (carListNoData) {
					car_lists = <div className="fetch_text_msg mt-4">No Vehicle Found Based On Budget.</div>
				}
			}	
		}
		
		return (
			<div className="sell_your_car_steps_page">
				<h1>Trade-In - Select Car</h1>
				<div className="container">
					{ sendingError ? (
							<div className="alert alert-danger" role="alert">{sendingError}</div>
						) : (
							""
						)
					}
					<div className="price_range">
						<div className="p_r_header">
							<span>Select Budget:</span>
							<span>AED {this.formatPrice(volume)}</span>
						</div>
						<Slider
							value={(selectedPrice * 1 !== volume ? selectedPrice * 1 : volume)}
							orientation="horizontal"
							onChange={this.handleOnChangeRange} 
							min={ 100000 }
							max={ 1000000 } 
							tooltip={false} 
							onChangeComplete={this.handleChangeComplete} />
					</div>
					<div className="tec-button-container two-button mb-4 mt-4">
						<button type="button" className="tec-button" onClick={prevForm}>Back</button>
						<button type="button" className="tec-button" onClick={carSelectedSubmit}>Proceed</button>
					</div>
					{selectedCarError.selectedCar ? (<div className="car_select_error text-center mb-2">{selectedCarError.selectedCar}</div>) : ''}
					<div className="trade_in_car_lists">
						{ car_lists }
					</div>
					{this.state.isLoadingScroll ? ( <div className="my-4 text-center"><img src={pageLoading} className="page-loading img-fluid"/></div> ) : ''}
				</div>
			</div>
		)
	}
}

class AppointmentTradeIn extends Component {
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

	render () {
		const {handleChange, values, prevForm, appointmentSubmit, appointmentError, isSending, sendingError, handleShowHideSending} = this.props;
		const {dateToday, gettingAvailableTimes, showTimings} = this.state;

		let showTimingsHtml = "";

		if (showTimings.length > 0) {
			showTimingsHtml = showTimings.map((showtiming, index) => {
				return <option key={index} value={showtiming.value} disabled={showtiming.disabled ? "disabled":""} style={showtiming.disabled ? {backgroundColor: '#f5f5f5'}:{}}>{this.convertMilitaryTime(showtiming.value)}</option>
			})
		}

		return (
			<div className="sell_your_car_steps_page">
				<h1>Trade-In - Appointment</h1>
				<div className="container">
					{ sendingError ? (
							<div className="alert alert-danger" role="alert">{sendingError}</div>
						) : (
							""
						)
					}
					<form method="POST" onSubmit={appointmentSubmit} autoComplete="off">
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
								<button type="submit" className="tec-button">Send</button>
							</div>
					</form>
				</div>
				<Modal
					isActive={isSending}
					toggle={handleShowHideSending}
					closeButton={false}
					overlayClick={false}>
					<div className="text-center page-loading-container"><img src={pageLoading} className="img-fluid page-loading" /></div>
				</Modal>
			</div>
		)
	}
}

class TradeInStep extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
			sellYourCarFields: {},
			carDetailsError: {},
			selectedCarError: {},
			appointmentError: {},
			selectedPrice: '',
			isSending: false,
			sendingError: '',
			isSendingSuccess: false,
		}

		this.nextForm = this.nextForm.bind(this);
		this.prevForm = this.prevForm.bind(this);
		this.getAppointmentTicket = this.getAppointmentTicket.bind(this);
		this.carDetailsSubmit = this.carDetailsSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.validateCarDetails = this.validateCarDetails.bind(this);
		this.handleCarIsSelected = this.handleCarIsSelected.bind(this);
		this.handleSelectedPrice = this.handleSelectedPrice.bind(this);
		this.carSelectedSubmit = this.carSelectedSubmit.bind(this);
		this.validateSelectedCar = this.validateSelectedCar.bind(this);
		this.resetAppointmentTime = this.resetAppointmentTime.bind(this);
		this.updateDatePicker = this.updateDatePicker.bind(this);
		this.appointmentSubmit = this.appointmentSubmit.bind(this);
		this.submitSellYourCar = this.submitSellYourCar.bind(this);
		this.handleShowHideSending = this.handleShowHideSending.bind(this);
		this.validateAppointment = this.validateAppointment.bind(this);
		this.setsellYourCarFieldsMake = this.setsellYourCarFieldsMake.bind(this);
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

        sellYourCarFields['token'] = "TIYC-" + token;

        if (this._isMounted) {
        	this.setState({
        		sellYourCarFields
        	})
        }
	}

	carDetailsSubmit(e) {
		e.preventDefault();
		if (this.validateCarDetails()) {
			this.nextForm();
		}
	}

	carSelectedSubmit(e) {
		e.preventDefault();

		if (this.validateSelectedCar()) {
			this.nextForm();
		}
	}

	appointmentSubmit(e) {
		e.preventDefault();
		if (this.validateAppointment()) {
			this.submitSellYourCar();	
		}
	}

	submitSellYourCar() {

		const {sellYourCarFields} = this.state;

		this.setState({
			isSending: true
		});

		axios.post('http://theelitecars.com/mobile/controllers/send_mail/trade_in_send.php', sellYourCarFields)
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

						if(response.data[rd].input_field == "car_condition") {
							carDetailsError['car_condition'] = 'Please select a car condition';
						}

						if(response.data[rd].input_field == "car_specification") {
							carDetailsError['car_specification'] = 'Please select a car specification';
						}

						if(response.data[rd].input_field == "car_year") {
							carDetailsError['car_year'] = 'Please select a car year';
						}

						if(response.data[rd].input_field == "car_mileage") {
							carDetailsError['car_mileage'] = 'Please input your car mileage';
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
				console.log(error);

				console.log(error.response);

				if (error) {
					if (this._isMounted) {
						this.setState({
							sendingError: "Your message failed to send. Please try again",
						})
					}
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

	handleChange(event) {
		const { sellYourCarFields } = this.state;
		sellYourCarFields[event.target.name] = event.target.value;
		if (this._isMounted) {
			this.setState({
				sellYourCarFields
			});
		}
	}

	handleCarIsSelected(data) {
		const { sellYourCarFields } = this.state;
		sellYourCarFields['selectedCar'] = data;
		if (this._isMounted) {
			this.setState({
				sellYourCarFields
			});
		}
	}

	handleSelectedPrice(price) {
		this.setState({
			selectedPrice: price,
		})
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

		if(!sellYourCarFields['car_condition']) {
			errors['car_condition'] = 'Please select a car condition';
			formIsValid = false;
		}

		if(!sellYourCarFields['car_specification']) {
			errors['car_specification'] = 'Please select a car specification';
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

	validateSelectedCar() {
		const {sellYourCarFields} = this.state;
		let errors = {}
		let formIsValid = true;

		if (!this.state.sellYourCarFields.selectedCar || !this.state.sellYourCarFields.selectedCar === undefined) {
			errors['selectedCar'] = "Please select below car";
			formIsValid = false
		} else {
			if (Object.keys(this.state.sellYourCarFields.selectedCar).length < 1 && this.state.sellYourCarFields.selectedCar.constructor !== Object) {
				errors['selectedCar'] = "Please select below car";
				formIsValid = false
			}
		}

		if (this._isMounted) {
			this.setState({
				selectedCarError: errors
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

	setsellYourCarFieldsMake(make_name_value) {
		const { sellYourCarFields } = this.state;
		sellYourCarFields['car_make'] = make_name_value;
		sellYourCarFields['car_model'] = "";

		if (this._isMounted) {
			this.setState({
				sellYourCarFields
			})
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
		});
		this._isMounted = false;
	}

	render() {
		const {step, sellYourCarFields, carDetailsError, selectedPrice, selectedCarError, appointmentError, isSending, sendingError, isSendingSuccess} = this.state;

		if (isSendingSuccess) {
			this.removeCustomClassBodyApp();
			return <Redirect to={"/thank-you"} push={true}/>;
		}

		console.log(sellYourCarFields);

		switch(step) {
			case 1:
				return <CarDetailsTradeIn 
					setsellYourCarFieldsMake={this.setsellYourCarFieldsMake}
					values={sellYourCarFields} 
					carDetailsSubmit={this.carDetailsSubmit}
					carDetailsError={carDetailsError}
					handleChange={this.handleChange} 
					sendingError={sendingError} />
			break;
			case 2:
				return <CarSelectTradeIn 
					prevForm={this.prevForm}
					selectedCar={sellYourCarFields.selectedCar || {}}
					handleCarIsSelected={this.handleCarIsSelected} 
					handleSelectedPrice={this.handleSelectedPrice} 
					selectedPrice={selectedPrice} 
					carSelectedSubmit={this.carSelectedSubmit}
					selectedCarError={selectedCarError} 
					sendingError={sendingError} />
			break;
			case 3:
				return <AppointmentTradeIn 
					handleChange={this.handleChange} 
					values={this.state.sellYourCarFields} 
					appointmentSubmit={this.appointmentSubmit} 
					prevForm={this.prevForm} 
					resetAppointmentTime={this.resetAppointmentTime}
					appointmentError={this.state.appointmentError}
					updateDatePicker={this.updateDatePicker}
					isSending={isSending} 
					handleShowHideSending={this.handleShowHideSending} 
					sendingError={sendingError} />
		}
	}
}

export default TradeInStep;