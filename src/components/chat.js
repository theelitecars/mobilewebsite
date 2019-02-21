import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';

import slideHeaderImage from '../images/menu_header.jpg';

class Chat extends Component {
	render() {
		return (
			<div className="chat_page">
				<Helmet>

					<title>Chat  - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Got questions or need assistance regarding our products and services? Please don&#8217;t hesitate to get in touch with us."/>
					<link rel="canonical" href="https://theelitecars.com/location/" />

					<meta name="og:title" property="og:title" content="Chat  - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Got questions or need assistance regarding our products and services? Please don&#8217;t hesitate to get in touch with us." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/location/" />

				</Helmet>

				<iframe src="https://lc.chat/now/8673901/"></iframe>
			</div>
		)
	}
}

export default Chat;