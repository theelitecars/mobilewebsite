import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

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

		let singleNewsHtml = <span>Loading</span>

		if (!this.state.isLoading) {
			singleNewsHtml = this.state.singlePost.map((singlebloghtml, index) => 
				<div key={index} className="single_news_container">
					<h1 dangerouslySetInnerHTML={this.createMarkup(singlebloghtml.title.rendered)} />
					<figure>
						<img src={singlebloghtml._embedded["wp:featuredmedia"][0].source_url} className="img-fluid" />
					</figure>
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