import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import pageLoading from '../images/pageload.gif';
import slideHeaderImage from '../images/menu_header.jpg';

class Testimonials extends Component {

	constructor(props) {
		super(props);

		this.state = {
			testimonials: [],
			isLoading: true,
			totalPages: 0,
			scrolling: false,
			perPage: 10,
			page: 1,
		}

		this.getAllTestimonials = this.getAllTestimonials.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		
	}

	getAllTestimonials() {

		const {testimonials, perPage, page} = this.state;

		const url = `https://theelitecars.com/wp-json/wp/v2/elite_testimonials?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&_embed`;

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					testimonials: [...testimonials, ...response.data],
					scrolling: false,
					totalPages: response.headers["x-wp-totalpages"]
				});
			}

			console.log(this.state.testimonials);
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

	createMarkup(markup) {
		return {__html: markup};
	}

	loadMore() {
		if (this._isMounted) {
			this.setState((prevState, props) => ({
				page: prevState.page + 1,
				scrolling: true,
				isLoading: true,
			}), this.getAllTestimonials);		
		}
	}

	handleScroll() {
		const { page, totalPages, scrolling } = this.state;
		if (scrolling) return
		if (page >= totalPages) return
		
		const lastTestimonialItem = document.querySelector('.row.testimonials_lists > [class^="col-"]:last-child');
		const lastTestimonialItemOffset = (lastTestimonialItem ? lastTestimonialItem.offsetTop + lastTestimonialItem.clientHeight : 0);
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastTestimonialItemOffset - bottomOffset) this.loadMore()
	}

	componentDidMount() {
		this.getAllTestimonials();
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			testimonials: [],
		});

		window.removeEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = false;
	}

	render() {

		const testimonialsHtml = this.state.testimonials.map((testimonialhtml, index) => 
			<div className="col-12" key={index}>
				<div className="testimonial_list_item">
					<div className="testi_content" dangerouslySetInnerHTML={this.createMarkup(testimonialhtml.content.rendered)} />
					<div className="testi_name">
						<h3 dangerouslySetInnerHTML={this.createMarkup(testimonialhtml.title.rendered)} />
					</div>
					<hr />
				</div>
			</div>
		);

		return (
			<div className="testimonial_page">
				<Helmet>

					<title>Testimonials by Elite Cars Customers</title>
					<meta name="description" content="Testimonials by elite customers and their experience with The Elite Cars, the leading car resellers in Dubai for new and old cars"/>
					<link rel="canonical" href="https://theelitecars.com/testimonials/" />

					<meta name="og:title" property="og:title" content="Testimonials by Elite Cars Customers" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Testimonials by elite customers and their experience with The Elite Cars, the leading car resellers in Dubai for new and old cars" />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/testimonials/" />

				</Helmet>
				<h1>Testimonials</h1>
				<div className="container">
					<div className="row testimonials_lists">
						{testimonialsHtml}
						{this.state.isLoading ? ( <div className="text-center col-12 my-4"><img src={pageLoading} className="page-loading img-fluid"/></div> ) : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default Testimonials;