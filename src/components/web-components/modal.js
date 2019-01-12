import React, { Component } from 'react';

import './css/modal.scss';

class Modal extends Component {
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

	componentDidMount() {

	}

	render () {

		const {isActive, toggle, closeButton,  children, disableClose, overlayClick, maxWidth} = this.props;

		let parentModalStyles = {
			display: isActive ? "flex" : "none",
		}

		let tmDialogStyles = {
			maxWidth: maxWidth + "px",
		}

		if (isActive) {
			this.addCustomClassBodyApp();
		} else {
			this.removeCustomClassBodyApp();
		}

		return (
			<div className="tec_modal" style={parentModalStyles}>
				<div className="overlay" onClick={overlayClick ? toggle : () => {return false}}></div>
				<div className="t_m_dialog" style={tmDialogStyles}>
					{closeButton ? (<button className="t_m_close" onClick={toggle} disabled={disableClose ? true : false}><i className="material-icons">clear</i></button>):("")}
					{children}
				</div>
			</div>
		)
	}
}

export default Modal;