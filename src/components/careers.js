import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import headerImage from '../images/careers.jpg';

class Careers extends Component {
	render() {
		return (
			<div className="careers_page">
				<h1>Careers</h1>
				<div className="container">
					<img src={headerImage} className="img-fluid header-image" alt="The Elite Cars - Careers" title="The Elite Cars - Careers" />
					<p>Our enterprise is growing and if you want to be part of our journey ahead, check out the latest vacancies on our <a href="https://www.linkedin.com/jobs/search?locationId=OTHERS%2Eworldwide&f_C=5341932&trk=companyTopCard_top-card-button" target="_blank">Linkedin</a> page or send your CV to <a href="hr@theelitecars.com">hr@theelitecars.com</a>.</p>
					<div className="form_container">
						<form method="POST">
							<div className="form_item">
								<label>First Name *</label>
								<input type="text" name="first_name" required="required" onChange={this.handleFirstName} />
							</div>
							<div className="form_item">
								<label>Last Name *</label>
								<input type="text" name="first_name" required="required" />
							</div>
							<div className="form_item">
								<label>Email Address *</label>
								<input type="email" name="first_name" required="required" />
							</div>
							<div className="form_item">
								<label>Mobile Number *</label>
								<input type="tel" name="first_name" required="required" />
							</div>
							<div className="form_item">
								<label>Position Applied For *</label>
								<input type="text" name="position_applied_for" required="required" />
							</div>
							<div className="form_item">
								<label>CV/Resume *</label>
								<input type="file" name="cv_resume" required="required" />
							</div>
							<div className="form_item">
								<label>Cover Letter *</label>
								<textarea name="cover_letter" required="required"></textarea>
							</div>
							<div className="form_item">
								<button type="submit" className="tec-button">Send</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Careers;