import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="container">
					<NavLink to="/">
						<i className="material-icons">home</i>
						<span>Home</span>
					</NavLink>
					<NavLink to="/news">
						<i className="material-icons">description</i>
						<span>News</span>
					</NavLink>
					<a href="" className="search">
						<i className="material-icons">directions_car</i>
						<span>Search</span>
					</a>
					<NavLink to="/contact-us">
						<i className="material-icons">mail</i>
						<span>Message</span>
					</NavLink>
					<NavLink to="/chat">
						<i className="material-icons">chat</i>
						<span>Chat</span>
					</NavLink>
				</div>
			</footer>
		)
	}
}

export default Footer;