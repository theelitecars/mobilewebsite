import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class TecModal extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var showStyle;

		if (this.props.modalToggle) {
			showStyle = {display: 'block'};
		}

		return (
			<div className={this.props.modalDialog ? "tec-modal dialog" : "tec-modal"} style={showStyle}>
				<div className="tec-modal-dialog">
					<div className="tec-modal-content">
						{ this.props.closeButton ? (
							<button className="close_modal" onClick={this.props.showHideModal}><i className="material-icons">close</i></button>
						) : (
							""
						)}
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

export default TecModal;