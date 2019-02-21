import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

import thankyou from '../images/thank-you.jpg';

class ThankYouTestimonials extends Component {
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

		return(
			<div className="slick-with-padding">
				<Slider {...testimonialsSliderSettings}>
					{
						testimonials.map((testimonial, index) =>
							<div key={index}>
								<div className="testimonials-item">
									<div className="ti-container" dangerouslySetInnerHTML={this.createMarkup(testimonial.content.rendered)} />
									<h3 className="text-right">{testimonial.title.rendered}</h3>
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


class ThankYou extends Component {
	render() {
		return (
			<div className="thank_you_page">
				<Helmet>

					<title>Thank You - The Elite Cars | The True Definition of Luxury</title>
					<link rel="canonical" href="https://theelitecars.com/thank-you" />

					<meta name="og:title" property="og:title" content="Thank You - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={thankyou} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/thank-you" />

				</Helmet>
				<h1>Thank You</h1>
				<div className="container">
					<img src={thankyou} className="img-fluid mb-3" />
					<p>Thank you for contacting us. One of our Sales Executives will respond to your inquiry as soon as possible.</p>
					<div className="text-center"><Link to="/pre-owned-used-approved-cars-dubai" className="tec_button mx-auto">Back to Stock Page</Link></div>
					<h2 className="mt-4 mb-3">Testimonials</h2>
					<ThankYouTestimonials />
				</div>
			</div>
		)
	}
}

export default ThankYou;