import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Menu extends Component {

	render() {
		return (
			<div id="menu" style={{ left: this.props.menuIsShown ? '0px' : '-302px' }}>
				<div className="menu_header">
					<span>Opp. Subaru Service Center, Street 4, Al Quoz 3 Sheikh Zayed Road, Dubai UAE</span>
				</div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/blog">Blog</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Menu;