import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import { Helmet } from 'react-helmet';
import slideHeaderImage from '../../images/menu_header.jpg';

class TermsOfUse extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="terms_of_use">
				<Helmet>

					<title>Terms of Use - The Elite Cars | The True Definition of Luxury</title>
					<meta name="description" content="Terms of Use  Last updated: February 3, 2018 Please read these terms of use (“Terms of Use”) carefully before using https://theelitecars.com/. Your access to and use of the website is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who..."/>
					<link rel="canonical" href="https://theelitecars.com/terms-of-use" />

					<meta name="og:title" property="og:title" content="Terms of Use - The Elite Cars | The True Definition of Luxury" />
					<meta name="og:site_name" property="og:site_name" content="The Elite Cars | The True Definition of Luxury" />
					<meta name="og:description" property="og:description" content="Terms of Use  Last updated: February 3, 2018 Please read these terms of use (“Terms of Use”) carefully before using https://theelitecars.com/. Your access to and use of the website is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who..." />
					<meta name="og:type" property="og:type" content="website" />
					<meta name="og:image" property="og:image" content={slideHeaderImage} />
					<meta name="og:url" property="og:url" content="https://theelitecars.com/terms-of-use" />

				</Helmet>
				<h1>Terms Of Use</h1>
				<div className="container">
					<p><em>Last updated: February 3, 2018</em></p>
					<p>Please read these terms of use ("Terms of Use") carefully before using <Link to="/">https://theelitecars.com/</Link>.</p>
					<p>Your access to and use of the website is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use our website when purchasing, for registration, and for feedback purposes.</p>
					<p>By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not be permitted to access the website.</p>

					<h2>I. Introduction</h2>
					<p>These are the terms of use ("Terms of Use") for your use of services or features on the sites owned and controlled by The Elite Cars LLC ("The Elite Cars"), including theelitecars.com (the "Site"). You may be accessing our Site from a computer or a mobile phone device and these Terms of Use govern your use of our Site and your conduct, regardless of the means of access.</p>
					<p>We also like to interact with you on third party sites where we post content or invite your feedback, such as <a href="https://twitter.com/TheEliteCars" target="_blank">https://twitter.com/TheEliteCars</a>, <a href="https://www.facebook.com/theelitecars/" target="_blank">https://www.facebook.com/theelitecars/</a>, <a href="https://plus.google.com/u/1/+TheEliteCarsLLC" target="_blank">https://plus.google.com/u/1/+TheEliteCarsLLC</a>, <a href="https://www.instagram.com/theelitecars/" target="_blank">https://www.instagram.com/theelitecars/</a>, and <a href="https://www.linkedin.com/company/the-elite-cars" target="_blank">https://www.linkedin.com/company/the-elite-cars</a>.</p>
					<p>The Elite Cars has no control over, and assumes no responsibility for, the content, privacy policies, practices of any third party websites or services, or the actions of people that The Elite Cars does not employ or manage. Hence, you should acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such websites or services. You should always check the terms of use posted on Third Party Sites.</p>
					<p>By using the Sites, you signify your agreement to these Terms of Use and Privacy Policy whether or not you have read them. The Elite Cars reserves the right to change or modify any of the terms and conditions contained in the Terms of Use from time to time at any time, without notice, and in its sole discretion. If The Elite Cars decides to change these Terms of Use, The Elite Cars will post a new version on the Sites and update the date set forth above. Any changes or modifications to these Terms of Use will be effective upon posting of the revisions. Your continued use of the sites following posting of any changes or modifications constitutes your acceptance of such changes or modifications and if you do not agree with these changes or modifications, you must immediately cease using the sites. For this reason, you should frequently review these Terms of Use and any other applicable policies, including their dates, to understand the terms and conditions that apply to your use of the Sites.</p>

					<h2>II. Copyright</h2>
					<p>All design, text, graphics, logos, button icons, images, audio and video clips, the selection and arrangement thereof, and all software on the Sites is Copyright (c) 2018 The Elite Cars LLC. All rights reserved. All design, text, graphics, logos, button icons, images, audio and video clips, the selection and arrangement thereof, and all software on the Sites is Copyright (c) 2018 The Elite Cars LLC. All rights reserved. The compilation (meaning the collection, arrangement and assembly) of all content on the Sites is the exclusive property of The Elite Cars and protected by U.S. and international copyright laws. All software used on the Sites is the property of The Elite Cars or its software suppliers and is protected by international copyright laws. Permission is granted to electronically copy and to print in hard copy portions of the Sites for the sole purpose of placing an order with The Elite Cars, using the Sites as a shopping resource. Any other use of materials on the Sites – including reproduction for purposes other than those permitted above, modification, distribution, republishing, transmission, display or performance – without the prior written permission of The Elite Cars is strictly prohibited.</p>

					<h2>III. Trademarks</h2>
					<p>TheEliteCars.com and all page headers, custom graphics and button icons are service marks, trademarks, and/or trade dress of The Elite Cars and may not be used in connection with any product or service that is not offered by The Elite Cars in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits The Elite Cars. All other trademarks, product names and company names or logos cited herein are the property of their respective owners.</p>

					<h2>IV. Product Information</h2>
					<p>The products displayed on the Site can be ordered and exported within the UAE and other countries. All prices displayed on TheEliteCars.com are quoted in UAE dirham and are valid and effective only in the UAE. Reference to any products, services, processes or other information by trade name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof by The Elite Cars. All information presented by The Elite Cars is designed to be used for informational purposes only.</p>

					<h2>V. Responsibility for Your Content</h2>
					<p>You are solely responsible for all content that you upload, post, email or otherwise transmit via or to the Sites, or otherwise including the submission of product ratings and reviews and all other data, profile information, documents, text, software, applications, music, sound, photographs, graphics, video, messages, forum postings, comments, questions, answers or other materials (collectively, "Content"). We will not accept Content from you unless you are a registered user of the Sites.</p>

					<h2>VI. Third Party Content and Third Party Sites</h2>
					<p>The Elite Cars may provide content of third parties ("Third Party Content") or links to Third Party Sites as a service to those interested in this information. The Elite Cars does not monitor, approve or have any control over any Third Party Content or the Third Party Sites and the inclusion of links to Third Party Content or Third Party Sites does not imply any association or relationship between The Elite Cars and such third party. The Elite Cars does not guarantee, endorse or adopt the accuracy or completeness of any Third Party Content or any Third Party Site. The Elite Cars is not responsible for updating or reviewing Third Party Content or Third Party Sites. You use Third Party Content and Third Party Sites at your own risk. Third Party Content, including comments from third party users submitted to The Elite Cars do not necessarily reflect the views or The Elite Cars.</p>

					<h2>VII. Mobile Services</h2>
					<p>If you access the Sites via your mobile phone, we do not currently charge for this access. Please note that your carrier’s normal rates and fees such as data charges, will still apply.</p>

					<h2>VIII. Content Modification</h2>
					<p>All textual Content that you submit is not confidential and may be used at The Elite Cars’ sole discretion. The Elite Cars may or may not pre-screen Content. However, The Elite Cars and its designees will have the right (but not the obligation) in their sole discretion to pre-screen, change, condense or delete any textual Content on the Sites. In particular, The Elite Cars and its designees will have the right to remove any Content that The Elite Cars, in its sole discretion, to violate any other provision of these Terms of Use or is otherwise objectionable. The Elite Cars does not guarantee that you will have any recourse through The Elite Cars to edit or delete any textual Content you have submitted. In addition, none of the Content that you submit shall be subject to any obligation of confidence on the part of The Elite Cars, its agents, subsidiaries, affiliates, partners or third-party service providers and their respective directors, officers and employees.</p>

					<h2>IX. Reservation of Rights</h2>
					<p>The Elite Cars reserves the right at any time, without notice and in its sole discretion, to terminate your license to use the Sites and to block or prevent your future access to use the Sites. The Elite Cars may access, preserve and disclose your account information and Content if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary to (i) comply with legal process; (ii) enforce these Terms of Use, (iii) respond to claims that any Content violates the rights of third parties, (iv) respond to your requests for customer service, or (v) protect the rights, property or personal safety of The Elite Cars (and its employees), its users and the public.</p>

					<h2>X. Disclaimer of Liabilities</h2>
					<p>The Elite Cars will not be liable for any damages of any kind arising out of or in connection with the use of the Sites. This is an all-encompassing limitation of liability that applies to all damages of any kind, including but not limited to direct, indirect, incidental, punitive or consequential damages, loss of data, income or profit, loss of or damage of property and claims of third parties.</p>

					<h2>XI. Indemnification</h2>
					<p>You agree to defend, indemnify and hold harmless The Elite Cars (and its officers, directors, agents, subsidiaries, joint ventures, employees and third-party service providers) from all claims, demands, losses, liabilities, costs, expenses, obligations and damages including reasonable legal fees, arising out of (a) your misuse of the Sites; (b) your violation of any term of these Terms of Use; (c) a breach of your representatives and warranties set forth above concerning Content; (d) your violation of any law or the rights of a third party (including, without limitation, any copyright, property or privacy right); or (e) any claim that any Content you submitted caused damage to a third party. This indemnification obligation will survive the termination of these Terms of Use and your misuse of the Sites.</p>

					<h2>XII. Fraud Protection Program</h2>
					<p>As part of our order processing procedures, we screen all received orders for fraud or other types of unauthorized or illegal activity. We reserve the right to refuse to process an order due to suspected fraud or unauthorized or illegal activity. If such is the case, we may reject your order or our Customer Service department may call you at the phone number you provided (or use your email address) to confirm your order. We also reserve the right to cancel any accounts or refuse to ship to certain addresses due to suspected fraud or unauthorized or illegal activity. We take these measures to protect our customers as well as ourselves from fraud or other unauthorized or illegal activity.</p>

				</div>
			</div>
		)
	}

}

export default TermsOfUse;