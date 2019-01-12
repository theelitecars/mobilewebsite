import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class TradeInStepOne extends Component {
	render() {
		return (
			<div className="sell_your_car_page">
				<div className="trade_in_step_1">
					<h2>3 STEPS TO TRADE-IN YOUR CAR</h2>
					<h3>FAST & EASY PROCESS TO BOOK ONLINE</h3>
					<ul className="ti_steps">
						<li data-step="1">Vehicle Details</li>
						<li data-step="2">Select Vehicle</li>
						<li data-step="3">Appointment</li>
					</ul>
					<p className="text-center mt-3">Would you like to trade in your current vehicle?</p>
					<button className="tec-button">Start</button>
				</div>
			</div>
		)
	}
}

export default TradeInStepOne;