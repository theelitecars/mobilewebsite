import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

import '../css/index.scss';

/*Pages*/
import Home from './pages/home';
import OurStocks from './pages/our_stocks';
import OurOffers from './pages/our_offers';
import SingleView from './pages/single_view';

/* Common */
import Header from './common/header';



import Footer from './footer';
import MenuSlide from './menu_slide';


import News from './news';
import SingleNews from './single_news';
import Chat from './chat';
import Export from './export';
import ContactUs from './contact_us';
import ServiceDepartment from './service_department';
import SparePartsDepartment from './spare_parts_department';
import FinanceInsurance from './finance_insurance';
import AftersalesSupport from './aftersales_support';
import RegistrationServices from './registration_services';
import OurStory from './our_story';
import MeetOurTeam from './meet_our_team';
import Careers from './careers';
import WriteYourFeedback from './write_your_feedback';
import Location from './location';
import Testimonials from './testimonials';
import VideoGallery from './video_gallery';
import SocialMediaGallery from './social_media_gallery';
import SellYourCar from './sell_your_car';
import TradeIn from './trade_in';
import Consignment from './consignment';
import HowItWorks from './how_it_works';
import Faq from './faq';
import ThankYou from './thank_you';

import ScrollToTop from './scroll';
import SellYourCarStep from './sell_your_car_step';
import TradeInStep from './trade_in_step';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			menu_visible: false,
			allMakes: [],
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleMenuButton = this.handleMenuButton.bind(this);
		this.addCustomClassBodyApp = this.addCustomClassBodyApp.bind(this);
		this.removeCustomClassBodyApp = this.removeCustomClassBodyApp.bind(this);
		this.getAllMakes = this.getAllMakes.bind(this);
	}

	addCustomClassBodyApp() {
		document.body.classList.add('show_modal_bg_app');
	}

	removeCustomClassBodyApp() {
		document.body.classList.remove('show_modal_bg_app');
	}

	handleMenuButton(e) {
		this.toggleMenu();
		e.stopPropagation();
	}

	toggleMenu() {
		this.setState((prevState, props) => ({
			menu_visible: !this.state.menu_visible
		}));
	}

	getAllMakes() {
		const url = 'https://theelitecars.com/wp-json/wp/v2/makes_models?parent=0&per_page=100';

		axios.get(url)
		.then((response) => {
			if (this._isMounted) {
				this.setState({
					allMakes: response.data,
				});
			}
		})
		.catch((error) => {
			console.log(error);
		})
		.then(() => {
			if (this._isMounted) {
				this.setState({
					isLoading: false,
				});
			}
		})
	}

	componentDidMount() {
		this.getAllMakes();
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		if (this.state.menu_visible) {
			this.addCustomClassBodyApp();
		} else {
			this.removeCustomClassBodyApp();
		}

		return (
			<Router basename="/">
				<ScrollToTop>
					<div>
						<Header handleMenuButton={this.handleMenuButton}/>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/pre-owned-used-approved-cars-dubai" render={()=><OurStocks carMakes={this.state.allMakes} />} />
							<Route path="/used-cars-promotion-and-offer-in-dubai"  render={()=><OurOffers />} />
							<Route path="/news" exact component={News} />
							<Route path="/news/:slugid" component={SingleNews} />
							<Route path="/chat" component={Chat} />
							<Route path="/import-export" component={Export} />
							<Route path="/contact-us" component={ContactUs} />
							<Route path="/services/service-department" component={ServiceDepartment} />
							<Route path="/services/spare-parts-department" component={SparePartsDepartment} />
							<Route path="/services/finance-insurance" component={FinanceInsurance} />
							<Route path="/services/aftersales-support" component={AftersalesSupport} />
							<Route path="/services/registration-services" component={RegistrationServices} />
							<Route path="/about-us/our-story" component={OurStory} />
							<Route path="/about-us/meet-our-team" component={MeetOurTeam} />
							<Route path="/careers" component={Careers} />
							<Route path="/write-your-feedback" component={WriteYourFeedback} />
							<Route path="/location" component={Location} />
							<Route path="/testimonials" component={Testimonials} />
							<Route path="/video-gallery" component={VideoGallery} />
							<Route path="/used-cars-showroom-gallery" component={SocialMediaGallery} />
							<Route path="/sell-your-car" exact component={SellYourCar} />
							<Route path="/trade-in" exact component={TradeIn} />
							<Route path="/consignment" component={Consignment} />
							<Route path="/how-it-works" component={HowItWorks} />
							<Route path="/faq" component={Faq} />
							<Route path="/thank-you" component={ThankYou} />
							<Route path="/listings/:slugid" component={SingleView} />
							<Route path="/sell-your-car/steps" exact render={()=><SellYourCarStep carMakes={this.state.allMakes} />} />
							<Route path="/trade-in/steps" exact render={()=><TradeInStep carMakes={this.state.allMakes} />} />
						</Switch>
						<Footer />
						<MenuSlide menuVisibility={this.state.menu_visible} handleMenuButton={this.handleMenuButton} />
						<div className="modal_bg_app" onMouseDown={this.toggleMenu}></div>
					</div>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;