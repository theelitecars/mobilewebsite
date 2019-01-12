import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class Location extends Component {
	render() {
		return (
			<div className="location_page">
				<h1>Location</h1>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir/25.1445248,55.2542208/The+Elite+Cars/@25.1312964,55.1976091,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f6bd1a26ee393:0x31908953c6606f5!2m2!1d55.217029!2d25.133604" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars - Main Showroom</span>
							</a>
						</div>
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir/25.1445248,55.2542208/The+Elite+Cars/@25.1312964,55.1976091,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f6bd1a26ee393:0x31908953c6606f5!2m2!1d55.217029!2d25.133604" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars - Head Office</span>
							</a>
						</div>
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir//The+Elite+Cars+%E2%80%93+Posh+Lounge/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3e5f6bd1f88eab17:0x2a7a6a87e08fb306?sa=X&amp;ved=2ahUKEwjD1sePlZfeAhUHnRoKHXfBAO4Q9RcwGHoECAoQEw" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars - Posh Lounge</span>
							</a>
						</div>
						<div className="col-12">
							<ul className="contact_group">
								<li><i className="material-icons">place</i> Sheikh Zayed Road, Dubai, United Arab Emirates</li>
								<li><a href="tel:600543628"><i className="material-icons">local_phone</i> 600 543628 (Within UAE)</a></li>
								<li><a href="tel:+97143212290"><i className="material-icons">local_phone</i> +971 4 321 2290 (Outside UAE)</a></li>
								<li><a href="mailto:info@theelitecars.com"><i className="material-icons">email</i> info@theelitecars.com</a></li>
							</ul>
						</div>
						<div className="col-12">
							<iframe src="https://www.google.com/maps/embed?pb=!4v1533384231030!6m8!1m7!1sCAoSLEFGMVFpcE16WXBtYkV2bU9IRWJlWWpBcTI2Nko5VVYzQUpQNG14S1hRdTRE!2m2!1d25.13414976816199!2d55.21526112172531!3f113.85!4f-2.430000000000007!5f0.5970117501821992" frameBorder="0" allowFullScreen></iframe>
						</div>
						<div className="col-12">
							<iframe src="https://www.google.com/maps/embed?pb=!4v1533384701595!6m8!1m7!1sCAoSLEFGMVFpcE1HV1JKWHdUUkRmeDRNd1dSelNjbk01TnN0S1lENXZkQ1FQaURZ!2m2!1d25.13381321361803!2d55.21650296756221!3f124.99!4f-23.510000000000005!5f0.5970117501821992" frameBorder="0" allowFullScreen></iframe>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir/25.1445248,55.2542208/The+Elite+Cars/@25.1312964,55.1976091,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f6bd1a26ee393:0x31908953c6606f5!2m2!1d55.217029!2d25.133604" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars - Sharjah</span>
							</a>
						</div>
						<div className="col-12">
							<ul className="contact_group mt-0">
								<li><i className="material-icons">place</i> Shop No. 25, Souq Al Haraj, Sharjah Car Market, Sharjah, UAE</li>
								<li><a href="tel:+97165727770"><i className="material-icons">local_phone</i> +971 6 572 7770</a></li>
								<li><a href="tel:+971521460000"><i className="material-icons">local_phone</i> +971 52 146 0000</a></li>
								<li><a href="mailto:shj@theelitecars.com"><i className="material-icons">email</i> shj@theelitecars.com</a></li>
							</ul>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							<h2>Auto Parts & Body Shop Centers</h2>
							<hr className="mb-0"/>
						</div>
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir/25.1445248,55.2542208/The+Elite+Cars/@25.1312964,55.1976091,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f6bd1a26ee393:0x31908953c6606f5!2m2!1d55.217029!2d25.133604" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars Service Dept.</span>
							</a>
						</div>
						<div className="col-12">
							<ul className="contact_group mt-0">
								<li><i className="material-icons">place</i> Street 4, Al Quoz 3, Dubai, United Arab Emirates</li>
								<li><a href="tel:+97143212290"><i className="material-icons">local_phone</i> +971 4 321 2290</a></li>
								<li><a href="mailto:service@theelitecars.com"><i className="material-icons">email</i> service@theelitecars.com</a></li>
							</ul>
						</div>
						<div className="col-12">
							<a href="https://www.google.ae/maps/dir/25.1445248,55.2542208/The+Elite+Cars/@25.1312964,55.1976091,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e5f6bd1a26ee393:0x31908953c6606f5!2m2!1d55.217029!2d25.133604" className="tec-button" target="_blank" rel="noopener">
								<i className="material-icons">map</i><span>The Elite Cars Spare Parts Dept.</span>
							</a>
						</div>
						<div className="col-12">
							<ul className="contact_group mt-0">
								<li><i className="material-icons">place</i> 4th Street, Al Quoz 3,Dubai, United Arab Emirates</li>
								<li><a href="tel:+971 4 338 7844"><i className="material-icons">local_phone</i> +971 4 338 7844</a></li>
								<li><a href="tel:+971561677064"><i className="material-icons">local_phone</i> + 971 56 167 7064</a></li>
								<li><a href="mailto:parts@theelitecarparts.com"><i className="material-icons">email</i> parts@theelitecarparts.com</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Location;