import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

import { CarListView, CarListViewLoading, CarListViewNoNumber } from '../views/car_lists';

import pageLoading from '../../images/pageload.gif';

const imageFilename = (url) => {
	const imagename = url.split('/').pop();
	return imagename.replace(/\.[^/.]+$/, "");
}

class HomeSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderImages: [],
		}
	}

	componentDidMount() {
		this._isMounted = true;

		const sliderImages = [
			'https://theelitecars.com/wp-content/uploads/2018/11/featured-banner.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/11/the-elite-cars-choose-it-own-it.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/11/november-promotion-3.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/09/Banner-2.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/10/Banner-4-3.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/09/Banner-5-1.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/10/Banner-7-4.jpg',
			'https://theelitecars.com/wp-content/uploads/2018/11/the-elite-cars-generic.jpg'
		]

		if (this._isMounted) {
			this.setState({
				sliderImages: sliderImages,
			});	
		}
	}

	componentWillUnmount() {
		this.setState({
			sliderImages: []
		})
		this._isMounted = false;
	}

	render() {

		const {sliderImages, noConnectionError} = this.state;

		const mainSliderSettings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
  			autoplaySpeed: 3000,
		}

		return (
			<Slider {...mainSliderSettings}>
				{
					sliderImages.map((sliderImage, index) =>
						<div key={index}>
							<img src={sliderImage} className="img-fluid" alt={imageFilename(sliderImage)} />
						</div>
					)
				}
			</Slider>
		)
	}
}

class PremiumCars extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latestStocks: [],
			isLoading: false,
			perPage: 10,
			page: 1,
			noConnectionError: false,
		}

		this.formatPrice = this.formatPrice.bind(this);
		this.getLatestStocks = this.getLatestStocks.bind(this);
	}

	getLatestStocks() {

		const {perPage, page} = this.state;

		const url = `http://theelitecars.com/mobile/controllers/get_cars/get_premium_cars.php`;

		if (this._isMounted) {
			this.setState({
				isLoading: true,
				noConnectionError: false,
			})
		}

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					latestStocks: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
			if (this._isMounted) {
				this.setState({
					noConnectionError: true,
				})
			}
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				})
			}
		})
	}

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	componentDidMount() {
		this._isMounted = true;
		this.getLatestStocks();
	}

	componentWillUnmount() {
		this.setState({
			latestStocks: [],
			isLoading: false
		});
		this._isMounted = false;
	}

	render() {
		const {latestStocks, isLoading, noConnectionError} = this.state;
		const latestStocksLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const sOneCarsSlider = {
			centerMode: true,
			centerPadding: '15px',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: false,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				},
			]
		}

		let latestStocksHtml = latestStocksLoading.map((loading, index) => {
			return <div key={index} className="car-item">
				<CarListViewLoading />
			</div>
		})

		if (!isLoading) {
			latestStocksHtml = latestStocks.map((lateststock, index) => 
				<div key={index}>
					<Link to={{
						pathname: "/listings/" + lateststock.slug,
						state: {
							carname: lateststock.title,
							carprice: lateststock.sale_price !== "" ? lateststock.sale_price : lateststock.car_price,
							exteriorColor: lateststock.exterior_color
						}
					}}>
						<CarListViewNoNumber carDetails={lateststock} />
					</Link>
				</div>
			)
		}

		return(
			<div className="showroom_two slick-with-padding">
				<Slider {...sOneCarsSlider}>
					{ latestStocksHtml }
				</Slider>
				{noConnectionError ? (<div className="my-4 text-center" style={{fontSize: '0.9em', color: '#666'}}>Network Error. Please try again</div>): ""}
			</div>
		)
	}
}

class LuxuryCars extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latestStocks: [],
			isLoading: false,
			perPage: 10,
			page: 1,
			noConnectionError: false,
		}

		this.formatPrice = this.formatPrice.bind(this);
		this.getLatestStocks = this.getLatestStocks.bind(this);
	}

	getLatestStocks() {

		const {perPage, page} = this.state;

		const url = `http://theelitecars.com/mobile/controllers/get_cars/get_luxury_cars.php`;

		if (this._isMounted) {
			this.setState({
				isLoading: true,
				noConnectionError: false,
			})
		}

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					latestStocks: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
			if (this._isMounted) {
				this.setState({
					noConnectionError: true,
				})
			}
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				})
			}
		})
	}

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	componentDidMount() {
		this._isMounted = true;
		this.getLatestStocks();
	}

	componentWillUnmount() {
		this.setState({
			latestStocks: [],
			isLoading: false
		});
		this._isMounted = false;
	}

	render() {
		const {latestStocks, isLoading, noConnectionError} = this.state;
		const latestStocksLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const sOneCarsSlider = {
			centerMode: true,
			centerPadding: '15px',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: false,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				},
			]
		}

		let latestStocksHtml = latestStocksLoading.map((loading, index) => {
			return <div key={index} className="car-item">
				<CarListViewLoading />
			</div>
		})

		if (!isLoading) {
			latestStocksHtml = latestStocks.map((lateststock, index) => 
				<div key={index}>
					<Link to={{
						pathname: "/listings/" + lateststock.slug,
						state: {
							carname: lateststock.title,
							carprice: lateststock.sale_price !== "" ? lateststock.sale_price : lateststock.car_price,
							exteriorColor: lateststock.exterior_color
						}
					}}>
						<CarListViewNoNumber carDetails={lateststock} />
					</Link>
				</div>
			)
		}

		return(
			<div className="showroom_one slick-with-padding">
				<Slider {...sOneCarsSlider}>
					{ latestStocksHtml }
				</Slider>
				{noConnectionError ? (<div className="my-4 text-center" style={{fontSize: '0.9em', color: '#666'}}>Network Error. Please try again</div>): ""}
			</div>
		)
	}
}

class HomeLatestStocks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			latestStocks: [],
			isLoading: false,
			perPage: 10,
			page: 1,
			noConnectionError: false,
		}

		this.formatPrice = this.formatPrice.bind(this);
		this.getLatestStocks = this.getLatestStocks.bind(this);
	}

	getLatestStocks() {

		const {perPage, page} = this.state;

		const url = `https://theelitecars.com/wp-json/wp/v2/listings?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&filter[meta_query][0][key]=car_sold&filter[meta_query][0][value]=2&filter[meta_query][0][compare]==`;

		if (this._isMounted) {
			this.setState({
				isLoading: true,
				noConnectionError: false,
			})
		}

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					latestStocks: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
			if (this._isMounted) {
				this.setState({
					noConnectionError: true,
				})
			}
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				})
			}
		})
	}

	formatPrice(price) {
		return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
	}

	componentDidMount() {
		this._isMounted = true;
		this.getLatestStocks();
	}

	componentWillUnmount() {
		this.setState({
			latestStocks: [],
			isLoading: false
		});
		this._isMounted = false;
	}

	render() {
		const {latestStocks, isLoading, noConnectionError} = this.state;
		const latestStocksLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const sOneCarsSlider = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
		}

		let latestStocksHtml = latestStocksLoading.map((loading, index) => {
			return <div key={index} className="car-item">
				<CarListViewLoading />
			</div>
		})

		if (!isLoading) {
			latestStocksHtml = latestStocks.map((lateststock, index) => 
				<div key={index}>
					<Link to={{
						pathname: "/listings/" + lateststock.slug,
						state: {
							carname: lateststock.title.rendered,
							carprice: lateststock.post_meta_fields.sale_price && lateststock.post_meta_fields.sale_price[0] !== "" ? lateststock.post_meta_fields.sale_price[0] : lateststock.post_meta_fields.car_price[0],
							exteriorColor: lateststock.post_meta_fields['exterior-color'][0]
						}
					}}>
						<CarListView carDetails={lateststock} />
					</Link>
				</div>
			)
		}

		return(
			<div className="showroom_one slick-with-padding">
				<Slider {...sOneCarsSlider}>
					{ latestStocksHtml }
				</Slider>
				{noConnectionError ? (<div className="my-4 text-center" style={{fontSize: '0.9em', color: '#666'}}>Network Error. Please try again</div>): ""}
			</div>
		)
	}
}

class HomeTestimonials extends Component {
	constructor(props) {
		super(props);

		this.state = {
			testimonials: [],
			isLoading: false,
			noConnectionError: false,
		}

		this.getTestimonials = this.getTestimonials.bind(this);
		this.createMarkup = this.createMarkup.bind(this);
	}

	getTestimonials() {

		if (this._isMounted) {
			this.setState({
				noConnectionError: false,
			})
		}

		axios.get('https://theelitecars.com/wp-json/wp/v2/elite_testimonials?per_page=15&page=1')
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					testimonials: response.data
				});		
			}
		})
		.catch((error) => {
			console.log(error);
			if (this._isMounted) {
				this.setState({
					noConnectionError: true,
				})
			}
		})
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	componentDidMount() {
		this._isMounted = true;
		this.getTestimonials();
	}

	componentWillUnmount() {
		
		this.setState({
			testimonials: [],
			isLoading: false
		});
		this._isMounted = false;

	}

	render() {

		const {testimonials, noConnectionError} = this.state;

		const testimonialsSliderSettings = {
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
  			autoplaySpeed: 3000,
		}

		return(
			<div>
				<Slider {...testimonialsSliderSettings}>
					{
						testimonials.map((testimonial, index) =>
							<div key={index}>
								<div className="testimonials-item">
									<div className="ti-container" dangerouslySetInnerHTML={this.createMarkup(testimonial.content.rendered)} />
									<h3>{testimonial.title.rendered}</h3>
								</div>
							</div>
						)
					}
				</Slider>
				{noConnectionError ? (<div className="my-4 text-center" style={{fontSize: '0.9em', color: '#666'}}>Network Error. Please try again</div>): ""}
			</div>
		)
	}
	
}

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

class Home extends Component {

	constructor(props) {
		super(props);

		this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
	}

	handleSearchFormSubmit(formdata) {
		this.props.history.push('/pre-owned-used-approved-cars-dubai', formdata);
	}

	render() {
		return (
			<div className="home_page">
				<Helmet>
					<title>The Elite Cars | The True Definition of Luxury - The Elite Cars for brand new and pre-owned luxury cars in Dubai</title>
					<meta name="description" content="The Elite Cars, Leading new and pre-owned luxury car dealers in UAE. We have a large selection of Jaguar, Range Rover, Bentley, Porsche, Audi, BMW and more."/>
					<link rel="canonical" href="https://theelitecars.com/" />
				</Helmet>
				<HomeSlider />
				<div className="container-fluid py-4">
					<SearchOurStock handleSearchFormSubmit={this.handleSearchFormSubmit} />
					<h1>Welcome To The Elite Cars</h1>
					<p className="text-center">With over 400 iconic cars at our posh showrooms in Dubai and Sharjah, we offer a wide collection of marques and models to select from. Hence, you will find the one that perfectly suits your needs, lifestyle and budget.</p>
					<hr/>
					<section>
						<div className="d-flex align-items-center justify-content-between mb-3">
							<h2 className="mb-0 text-left" style={{maxWidth: '70%'}}>Own A Luxury Car</h2>
							<Link to="/pre-owned-used-approved-cars-dubai" className="tec_button">View All</Link>
						</div>
						<PremiumCars />
					</section>
					<hr/>
					<section>
						<div className="d-flex align-items-center justify-content-between mb-3">
							<h2 className="mb-0 text-left" style={{maxWidth: '70%'}}>Drive A Perfect Exotic Car</h2>
							<Link to="/pre-owned-used-approved-cars-dubai" className="tec_button">View All</Link>
						</div>
						<LuxuryCars />
					</section>
				</div>
			</div>
		)
	}
}

export default Home;