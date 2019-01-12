import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

import ConsignmentStepOne from './consignment_step_1';

class Consignment extends Component {
	render() {
		return (
			<div className="sell_your_car_page consignment">
				<h1>Consignment</h1>
				<div className="container">
					<ConsignmentStepOne />
					<p>If you think that your car is worthy of a higher value than our cash offer, then you can opt for our consignment service. This is designed to provide you with better selling opportunities, and among the privileges you can enjoy are as follows:</p>
					<ul>
						<li>Display your car at our showroom</li>
						<li>High marketing efforts on your behalf for increased exposure</li>
						<li>More than 20 walk-ins daily</li>
						<li>More than 30 calls and emails daily</li>
						<li>Conveniently located on Sheikh Zayed Road</li>
						<li>Proven track record in the industry</li>
						<li>Honest, quick, and secure transaction</li>
						<li>We offer assistance from A to Z</li>
						<li>We handle all your needs when it comes to registration, approvals and bank loan settlement</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Consignment;