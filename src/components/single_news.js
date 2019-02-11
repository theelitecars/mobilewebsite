import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

import pageLoading from '../images/pageload.gif';

class SingleNews extends Component {

	constructor(props) {
		super(props);

		this.state = {
			singlePost: [],
			isLoading: true
		}

		this.getSinglePost = this.getSinglePost.bind(this);
	}

	getSinglePost() {
		const url = `https://theelitecars.com/wp-json/wp/v2/posts?slug=${this.props.match.params.slugid}&_embed`;
		
		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					singlePost: response.data,
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

	componentDidMount() {
		this._isMounted = true;
		this.getSinglePost();
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.setState({
			singlePost: [],
			isLoading: true
		});
	}

	render() {

		let singleNewsHtml = <div className="text-center my-4"><img src={pageLoading} className="img-fluid page-loading"/></div>

		if (!this.state.isLoading) {
			singleNewsHtml = this.state.singlePost.map((singlebloghtml, index) => 
				<div key={index} className="single_news_container">
					<h1 dangerouslySetInnerHTML={this.createMarkup(singlebloghtml.title.rendered)} />
					<div className="content" dangerouslySetInnerHTML={this.createMarkup(singlebloghtml.content.rendered)} />
				</div>
			)
		}

		return (
			<div className="single_news_page">
				<div className="container">
					{singleNewsHtml}
				</div>
			</div>
		)
	}
}

export default SingleNews;