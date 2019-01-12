import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

import { CarListView, CarListViewLoading } from '../views/car_lists';

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
			<div className="content-section">
				{ latestStocksHtml }
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

class Home extends Component {

	constructor(props) {
		super(props);
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
				<div className="container py-4">
					<h1>Welcome To The Elite Cars</h1>
					<p className="text-center">With over 400 iconic cars at our posh showrooms in Dubai and Sharjah, we offer a wide collection of marques and models to select from. Hence, you will find the one that perfectly suits your needs, lifestyle and budget.</p>
					<section className="pt-3">
						<div className="title-section">
							<h2>Our Latest Stocks</h2>
							<Link to="/pre-owned-used-approved-cars-dubai">View All</Link>
						</div>
						<HomeLatestStocks />
					</section>
					<Link to="/pre-owned-used-approved-cars-dubai" className="tec-button">View All Our Stocks</Link>
				</div>
				<div className="container home_sell_your_car">
					<iframe src="https://www.youtube.com/embed/FBw94hg8sto" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" className="mb-4"></iframe>
					<p>We will buy your car within 3 minutes! Let’s get started by telling us something about it.</p>
					<Link to="/sell-your-car/steps" className="tec-button">Start</Link>
				</div>
				<div className="container testimonials slick-with-padding">
					<h2>Happy Customers</h2>
					<HomeTestimonials />
				</div>
			</div>
		)
	}
}

export default Home;