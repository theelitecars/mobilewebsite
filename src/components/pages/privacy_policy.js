import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import { Helmet } from 'react-helmet';
import slideHeaderImage from '../../images/menu_header.jpg';

class PrivacyPolicy extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="privacy_policy">
				<Helmet>

					<title>Privacy Policy - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="PRIVACY POLICY The Elite Cars is committed to maintaining the highest level of privacy protection for its users. Our Privacy Policy, which has been updated for the General Data Protection Regulation (GDPR) launched on 25th May 2018, is designed to help you understand how we collect, use and safeguard the..."/>
					<link rel="canonical" href="https://theelitecars.com/privacy-policy" />

					<meta name="og:title" property="og:title" content="Privacy Policy - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="PRIVACY POLICY The Elite Cars is committed to maintaining the highest level of privacy protection for its users. Our Privacy Policy, which has been updated for the General Data Protection Regulation (GDPR) launched on 25th May 2018, is designed to help you understand how we collect, use and safeguard the..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/privacy-policy" />

				</Helmet>
				<h1>Privacy Policy</h1>
				<div className="container">
					<p>The Elite Cars is committed to maintaining the highest level of privacy protection for its users. Our Privacy Policy, which has been updated for the General Data Protection Regulation (GDPR) launched on 25th May 2018, is designed to help you understand how we collect, use and safeguard the information you provide to us and to assist you in making informed decisions when using our website.</p>

					<p>By accepting our newly updated Privacy Policy, you consent to our collection, storage, use and disclosure of your personal information as described herein.</p>

					<h2>I. Information We Collect</h2>
					<p>We collect "Personal Information". This includes your name, phone number, and email, which you submit to us through the Contact Form in this webpage: <Link to="/contact-us">https://theelitecars.com/contact-us/</Link>.</p>

					<h2>II. How We Use And Share Information</h2>
					<p>Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or otherwise share for marketing purposes your Personal Information with third parties without your consent. In general, the Personal Information you provide to us is primarily used to help us communicate with you. For example, we use it to contact users in response to questions, solicit feedback, and notify about our promotional offers.</p>

					<h2>III. Email Marketing And Newsletters</h2>
					<p>Whenever we have a promotion or special announcement, which we believe is of interest to you, we may send out content via email from time to time. The same goes for companies which we deem interested in our services and/or offerings, which may include invitation for partnership and/or events we participate in.</p>
					<p>If you don’t wish to receive these communications, please let us know by clicking the "unsubscribe" button/ link on all the email correspondence we send out. Please be informed that we have a strong internal policy in place to ensure that unsubscribe requests are dealt with properly and in a timely fashion.</p>

					<h2>IV. How We Protect Your Information</h2>
					<p>Our customers trust us to protect their personal information. This is why we take that task seriously and maintain reasonable and appropriate physical, electronic and procedural safeguards to help protect any personal information provided to us.</p>

					<h2>V. Your Rights Regarding The Use Of Your Personal Information</h2>
					<p>You have the right at any time to prevent us from contacting you for marketing purposes. When we send a promotional communication to a user, the user can opt out of further promotional communications by following the unsubscribe instructions provided in each promotional e-mail and or SMS.</p>

					<h2>VI. Changes To Our Privacy Policy</h2>
					<p>The Company reserves the right to change this policy. You should periodically check the website and this privacy page for updates.</p>

					<h2>VII. Contact Us</h2>
					<p>If you have any questions regarding this Privacy Policy or the practices of this website, please contact us by sending an email to <a href="mailto: Customer-Care@TheEliteCars.com">Customer-Care@TheEliteCars.com</a>.</p>

					<p><strong>Last Updated:</strong> This Privacy Policy was last updated on May 26, 2018.</p>

				</div>
			</div>
		)
	}

}

export default PrivacyPolicy;