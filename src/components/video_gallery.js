import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

import pageLoading from '../images/pageload.gif';

class VideoGallery extends Component {

	constructor(props) {
		super(props);

		this.state = {
			videoGallery: [],
			isLoading: true,
			scrolling: false,
			perPage: 5,
			totalResults: 0,
			pageToken: '',
		}

		this.getAllVideos = this.getAllVideos.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		
	}

	getAllVideos() {

		const {videoGallery, perPage, pageToken} = this.state;
		const apiKey = 'AIzaSyAWK-OWHG1TsmD7kspfcrPsQ0CQXQhlqbQ';
		const channelId = 'UCXqJk5ZZSwY7SzsDSQk2bUA';

		const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${perPage}&pageToken=${pageToken}`;

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					videoGallery: [...videoGallery, ...response.data.items],
					pageToken: response.data.nextPageToken,
					scrolling: false,
					totalResults: response.data.pageInfo.totalResults
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
				scrolling: true,
				isLoading: true,
			}), this.getAllVideos);		
		}
	}

	handleScroll() {
		const { totalResults, scrolling } = this.state;
		const currentItemNumber = this.state.videoGallery.length;

		if (scrolling) return
		if (currentItemNumber >= totalResults) return
		
		const lastVideoItem = document.querySelector('.row.video_gallery_lists > [class^="col-"]:last-child');
		const lastVideoItemOffset = (lastVideoItem ? lastVideoItem.offsetTop + lastVideoItem.clientHeight : 0);
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastVideoItemOffset - bottomOffset) this.loadMore()
	}

	componentDidMount() {
		this.getAllVideos();
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e);
		})
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			videoGallery: [],
		});

		window.removeEventListener('scroll', (e) => {
			this.handleScroll(e);
		})

		this._isMounted = false;
	}

	render() {
		const videoGalleryHtml = this.state.videoGallery.map((videohtml, index) => 
			<div className="col-12" key={index}>
				<div className="video_gallery_list_item">
					<iframe src={"https://www.youtube-nocookie.com/embed/" + videohtml.id.videoId + "?rel=0&amp;fs=0&amp;showinfo=0"} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					<h3>{videohtml.snippet.title}</h3>
					<hr />
				</div>
			</div>
		);

		return (
			<div className="video_gallery_page">
				<h1>Video Gallery</h1>
				<div className="container">
					<div className="row video_gallery_lists">
						{videoGalleryHtml}
						{this.state.isLoading ? ( <div className="text-center col-12"><img src={pageLoading} className="img-fluid page-loading"/></div> ) : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default VideoGallery;