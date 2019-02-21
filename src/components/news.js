import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';

import slideHeaderImage from '../images/menu_header.jpg';
import pageLoading from '../images/pageload.gif';

class News extends Component {
	constructor(props) {
		super(props);

		this.state = {
			news: [],
			isLoading: true,
			totalPages: 0,
			scrolling: false,
			perPage: 10,
			page: 1,
		}

		this.getAllNews = this.getAllNews.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		
	}

	getAllNews() {

		const {news, perPage, page} = this.state;

		const url = `https://theelitecars.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&filter[post_status]=publish&filter[orderby]=date&filter[order]=DESC&_embed`;

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					news: [...news, ...response.data],
					scrolling: false,
					totalPages: response.headers["x-wp-totalpages"]
				});
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

	createMarkup(markup) {
		return {__html: markup};
	}

	loadMore() {
		if (this._isMounted) {
			this.setState((prevState, props) => ({
				page: prevState.page + 1,
				scrolling: true,
				isLoading: true,
			}), this.getAllNews);		
		}
	}

	handleScroll() {
		const { page, totalPages, scrolling } = this.state;
		if (scrolling) return
		if (page >= totalPages) return
		
		const lastNewsItem = document.querySelector('.row.news_lists > [class^="col-"]:last-child');
		const lastNewsItemOffset = (lastNewsItem ? lastNewsItem.offsetTop + lastNewsItem.clientHeight : 0);
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastNewsItemOffset - bottomOffset) this.loadMore()
	}

	componentDidMount() {
		this.getAllNews();
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			news: [],
		});

		window.removeEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = false;
	}

	render() {

		const newsHtml = this.state.news.map((bloghtml, index) => 
			<div className="col-12" key={index}>
				<div className="news_list_item">
					<figure>
						<NavLink to={"/news/" + bloghtml.slug}>
							<div className="news_image" style={{backgroundImage: `url('${bloghtml._embedded["wp:featuredmedia"][0].source_url}')`}}></div>
						</NavLink>
					</figure>
					<NavLink to={"/news/" + bloghtml.slug}><h3 dangerouslySetInnerHTML={this.createMarkup(bloghtml.title.rendered)} /></NavLink>
				</div>
			</div>
		);

		return (
			<div className="news_page">
				<Helmet>

					<title>News Room - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Looking best Car Offers in UAE. Land Rover, Jaguar, BMW, Porsche, Mercedes cars offers in Dubai, best car deals for new and used cars for sale in Dubai."/>
					<link rel="canonical" href="https://theelitecars.com/news/" />

					<meta name="og:title" property="og:title" content="News Room - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Looking best Car Offers in UAE. Land Rover, Jaguar, BMW, Porsche, Mercedes cars offers in Dubai, best car deals for new and used cars for sale in Dubai." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/news/" />

				</Helmet>
				<h1>News</h1>
				<div className="container">
					<div className="row news_lists">
						{newsHtml}
						{this.state.isLoading ? ( <div className="col-12 text-center"><img src={pageLoading} className="img-fluid page-loading"/></div> ) : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default News;