import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import jsonp from 'jsonp';
import { Helmet } from 'react-helmet';

import TecModal from './modal';
import Modal from './web-components/modal';
import slideHeaderImage from '../images/menu_header.jpg';

class SocialMediaGallery extends Component {

	constructor(props) {
		super(props);

		this.state = {
			socialMediaImage: [],
			showHideModal: []
		}

		this.getAllSocialMediaImage = this.getAllSocialMediaImage.bind(this);
		this.handleShowHideModal = this.handleShowHideModal.bind(this);
		
	}

	getAllSocialMediaImage() {

		const {socialMediaImage, perPage, page} = this.state;
		const accessToken = "1489251270.b401838.da4b0db7fd734f169d7271015eab9fad";

		const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`;

		jsonp( url, null, (err, data) => {
			if (err) {
				console.error(err.message);
			} else {
				if (this._isMounted) {
					this.setState({
						socialMediaImage: data.data,
						scrolling: false,
					});
				}
			}
			
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				});
			}
			
		});

		/*axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					socialMediaImage: response.data.data,
					scrolling: false,
				});
			}

			console.log(this.state.socialMediaImage);
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
		})*/
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	handleShowHideModal(id) {

		let showHideModal = this.state.showHideModal.slice();

		if (showHideModal[id]) {
			showHideModal[id] = false;
			this.removeCustomClassBodyApp();
	    	this.setState({showHideModal});
		} else {
			showHideModal[id] = true;
			this.addCustomClassBodyApp();
	    	this.setState({showHideModal});
		}
	}



	componentDidMount() {
		this.getAllSocialMediaImage();
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			socialMediaImage: [],
		});
		this._isMounted = false;
	}

	render() {
		const socialMediaHtml = this.state.socialMediaImage.map((socialhtml, index) => 
			<div className="col-6" key={index}>
				<div className="social_media_gallery_list_item">
					<div className="smg_image" style={{backgroundImage:"url("+ socialhtml.images.standard_resolution.url +")"}} onClick={this.handleShowHideModal.bind(this, index)}></div>
					<Modal
					isActive={this.state.showHideModal[index] || false}
					toggle={this.handleShowHideModal.bind(this, index)}
					closeButton={true}
					overlayClick={true}
					maxWidth="500">
						<div className="social_media_gallery_modal">
							<img src={socialhtml.images.standard_resolution.url} className="img-fluid" />
							<div className="smg_desc">
								<p dangerouslySetInnerHTML={this.createMarkup(socialhtml.caption.text.replace(/(\r\n|\n|\r)/gm,"<br/>"))} />
							</div>
							<a href={socialhtml.link} className="smg_link" target="_blank"><i className="material-icons">remove_red_eye</i>View</a>	
						</div>
					</Modal>
				</div>
			</div>
		);

		return (
			<div className="social_media_gallery_page">
				<Helmet>

					<title>SOCIAL MEDIA GALLERY - The Elite Cars | The True Definition of Luxury</title>
					<link rel="canonical" href="https://theelitecars.com/used-cars-showroom-gallery/" />

					<meta name="og:title" property="og:title" content="The Elite cars | Video Gallery" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/used-cars-showroom-gallery/" />

				</Helmet>
				<h1>Social Media Gallery</h1>
				<div className="container">
					<div className="row social_media_gallery_lists">
						{socialMediaHtml}
						{this.state.isLoading ? ( <div className="pageloading"><img src={pageLoading} className="img-fluid"/></div> ) : ''}
					</div>
				</div>				
			</div>
		)
	}
}

export default SocialMediaGallery;