import React, { Component } from 'react';

import './css/slide_right.scss';

class SlideRight extends Component {
	constructor(props) {
		super(props);

		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
	}

	addCustomClassBodyApp() {
		document.body.classList.add('tec-modal-show');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('tec-modal-show');
	}

	render () {

		const { title, toggle, children, slideRight } = this.props;

		let slideToggle = {
			right: slideRight ? "0px" : "-300px",
		}

		let overlay = {
			display: slideRight ? "block" : "none",
		}

		if (slideRight) {
			this.addCustomClassBodyApp();
		} else {
			this.removeCustomClassBodyApp();
		}

		return (
			<div className="slide_right">
				<div className="overlay" onMouseDown={toggle} style={overlay}></div>
				<div className="sr_container" style={slideToggle}>
					<div className="sr_header">
						{ title }
						<button className="close-menu" onMouseDown={toggle}><i className="material-icons">close</i></button>
					</div>
					<div className="sr_body">
						{ children }
					</div>
				</div>
			</div>
		);
	}
}		

export default SlideRight;
