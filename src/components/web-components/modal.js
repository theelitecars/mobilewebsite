import React, { Component } from 'react';

import './css/modal.scss';

class Modal extends Component {
	constructor(props) {
		super(props);
	}
	
	render () {

		const {isActive, toggle, closeButton,  children, disableClose, overlayClick, maxWidth} = this.props;

		let parentModalStyles = {
			display: isActive ? "block" : "none",
		}

		let tmDialogStyles = {
			maxWidth: maxWidth + "px",
		}

		return (
			<div className="tec_modal" style={parentModalStyles}>
				<div className="overlay" onClick={disableClose ? () => {return false} : overlayClick ? toggle : () => {return false}}></div>
				<div className="tec_modal_container">
					<div className="t_m_dialog" style={tmDialogStyles}>
						{closeButton ? (<button className="t_m_close" onClick={toggle} disabled={disableClose ? true : false}><i className="material-icons">clear</i></button>):("")}
						{children}
					</div>	
				</div>
			</div>
		)
	}
}

export default Modal;