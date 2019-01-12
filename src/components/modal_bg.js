import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class ModalBg extends Component {

	constructor(props) {
		super(props);
		this.addCustomClassBody = this.addCustomClassBody.bind(this);
		this.removeCustomClassBody = this.removeCustomClassBody.bind(this);
	}

	addCustomClassBody() {
		document.body.classList.add('show_modal_bg');
	}

	removeCustomClassBody() {
		document.body.classList.remove('show_modal_bg');
	}

	render() {
		if(this.props.mbtoggle) {
			this.addCustomClassBody();
		} else {
			this.removeCustomClassBody();
		}

		return (
			<div className={"modal_bg"} onMouseDown={this.props.handleMbClose}></div>
		)
	}
}

export default ModalBg;