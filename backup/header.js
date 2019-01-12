import React, { Component } from 'react';

import Logo from '../../public/images/the-elite-cars-logo.png';

class Header extends Component {
	render() {
		return (
			<header>
				<a href="" className="menu_button" onClick={this.props.toggleMenu}><i className="material-icons">{this.props.menuIsShown ? 'clear' : 'menu'}</i></a>
				<div className="logo"><img src={Logo} /></div>
				<div className="contact_menu">
					<a href="" className="mail_button"><i className="material-icons">email</i></a>
					<a href="" className="call_button"><i className="material-icons">phone</i></a>
				</div>
			</header>
		);
	}
}

export default Header;