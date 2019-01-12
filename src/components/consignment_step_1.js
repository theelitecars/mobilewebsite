import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class ConsignmentStepOne extends Component {
	render() {
		return (
			<div className="sell_your_car_page">
				<div className="consignment_step_1">
					<h2>TELL US SOMETHING ABOUT YOUR CAR</h2>
					<form method="POST">
						<div className="form_item">
							<label>Select A Make *</label>
							<select name="make">
								<option></option>
							</select>
						</div>
						<div className="form_item">
							<label>Select A Model *</label>
							<select name="model">
								<option></option>
							</select>
						</div>
						<div className="form_item">
							<label>Select A Year *</label>
							<select name="year">
								<option></option>
							</select>
						</div>
						<div className="form_item">
							<button type="submit" className="tec-button">Proceed</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default ConsignmentStepOne;