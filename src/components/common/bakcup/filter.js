import React, { Component } from 'react';
import axios from 'axios';

class FilterCars extends Component {
	constructor(props) {
		super(props);

		this.state = {
			carModels: [],
			gettingAllModels: false,
			allYears: [],
			filterFields: {}
		}

		this.getAllModels = this.getAllModels.bind(this);
		this.getAllYears = this.getAllYears.bind(this);
		this.setFilterFields = this.setFilterFields.bind(this);
		this.filterSubmit = this.filterSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	getAllModels(event) {

		const {filterFields} = this.state;
		const makeid = event.target[event.target.selectedIndex].getAttribute('data-makeid');
		const url = `https://theelitecars.com/wp-json/wp/v2/makes_models?parent=${makeid}&per_page=100`;

		if (this._isMounted) {
			this.setState({
				carModels: [],
			})
		}

		if (makeid) {
			if (this._isMounted) {
				this.setState({
					gettingAllModels: true,
				})
			}

			axios.get(url)
			.then((response) => {
				if (this._isMounted) {
					this.setState({
						carModels: response.data,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => {
				if (this._isMounted) {
					this.setState({
						gettingAllModels: false,
					});
				}
			})
		}

		this.setFilterFields(event.target.name, event.target.value);
		this.setFilterFields("model", "");
	}

	getAllYears() {
		const dateToday = new Date();
		const maxYear = dateToday.getFullYear();
		const minYear = 2000;
		let allYears = [];

		for(let y = maxYear; y >= minYear; y--) {
			allYears.push(y);
		}

		this.setState({
			allYears: allYears
		})
	}

	setFilterFields(fieldname, value) {
		const {filterFields} = this.state;
		filterFields[fieldname] = value;
		this.setState({
			filterFields
		})
	}

	handleOnChange(event) {
		this.setFilterFields(event.target.name, event.target.value);
	}

	filterSubmit(event){ 
		event.preventDefault();

		const {filterFields} = this.state;
		const {submit} = this.props;

		if (Object.keys(filterFields).length > 0 && filterFields.constructor === Object) {
			submit(filterFields);
		} else {
			return false;
		}
	}

	componentDidMount() {
		this.getAllYears();
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.setState({
			carModels: [],
			gettingAllModels: false,
		});

		this._isMounted = false;
	}

	render () {

		const {value} = this.props;
		const {carModels, gettingAllModels, allYears, filterFields} = this.state;

		let carMakes = JSON.parse(localStorage.getItem('all_makes_models'));

		let makeOptions = all_makes_models.map((all_makes, index) => {
			return <option key={index} value={Object.keys(all_makes)[0]}>{this.itemMakeFormatDisplay(Object.keys(all_makes)[0])}</option>
		});

		return (
			<div>
				<form method="POST" onSubmit={this.filterSubmit}>
					<div className="form_item">
						<select name="make" disabled={carMakes.length === 0 ? true : false} onChange={this.getAllModels} value={filterFields.make}>
							<option value="">Select A Make</option>
							<option value="any">Any</option>
							{ makeOptions }
						</select>
					</div>
					<div className="form_item">
						<select name="model" disabled={carModels.length === 0 ? true : false} onChange={this.handleOnChange} value={filterFields.model}>
							<option>{gettingAllModels ? "Getting models..." : "Select A Model"}</option>
							{
								carModels.map((carmodel, index) => {
									return <option key={index} value={carmodel.slug}>{carmodel.name}</option>
								})
							}
						</select>
					</div>
					<div className="form_item">
						<select name="year" onChange={this.handleOnChange} value={filterFields.year}>
							<option>Select A Year</option>
							{
								allYears.map((allyear, index) => {
									return <option key={index} value={allyear}>{allyear}</option>
								})
							}
						</select>
					</div>
					<div className="form_item">
						<select name="price_range" onChange={this.handleOnChange} value={filterFields.price_range}>
							<option>Select A Price Range</option>
							<option value="any">Any</option>
							<option value="[10000,200000]">AED 10k - 200k</option>
							<option value="[200000,400000]">AED 200k - 400k</option>
							<option value="[400000,700000]">AED 400k - 700k</option>
							<option value="[700000,1000000]">AED 700k - 1M</option>
							<option value="[1000000,1500000]">AED 1M - 1.5M</option>
							<option value="[1500000]">AED 1.5M+</option>
						</select>
					</div>
					<div className="form_item">
						<select name="body_type" onChange={this.handleOnChange} value={filterFields.body_type}>
							<option>Select A Body Type</option>
							<option value="any">Any</option>
							<option value="convertible">Convertible</option>
							<option value="sedan">Sedan</option>
							<option value="coupe">Coupe</option>
							<option value="hatchback">Hatchback</option>
							<option value="sports-car">Sports Car</option>
							<option value="suv">SUV</option>
							<option value="wagon">Wagon</option>
							<option value="van">Van</option>
						</select>
					</div>
					<div className="form_item">
						<select name="mileage" onChange={this.handleOnChange} value={filterFields.mileage}>
							<option>Select A Mileage</option>
							<option value="any">Any</option>
							<option value="[0,10000]">0 - 10000</option>
							<option value="[10000,20000]">10000 - 20000</option>
							<option value="[20000,30000]">20000 - 30000</option>
							<option value="[30000,40000]">30000 - 40000</option>
							<option value="[40000,50000]">40000 - 50000</option>
							<option value="[50000,60000]">50000 - 60000</option>
							<option value="[60000,70000]">60000 - 70000</option>
							<option value="[70000,80000]">70000 - 80000</option>
							<option value="[80000,90000]">80000 - 90000</option>
							<option value="[90000,100000]">90000 - 100000</option>
							<option value="[100000,110000]">100000 - 110000</option>
							<option value="[110000,120000]">110000 - 120000</option>
							<option value="[120000,130000]">120000 - 130000</option>
							<option value="[130000]">130000+</option>
						</select>
					</div>
					<div className="form_item">
						<select name="exterior_color" onChange={this.handleOnChange} value={filterFields.exterior_color}>
							<option>Select Exterior Color</option>
							<option value="any">Any</option>
							<option value="blue">Blue</option>
							<option value="grey">Grey</option>
							<option value="dark-grey">Dark Grey</option>
							<option value="beige">Beige</option>
							<option value="gold">Gold</option>
							<option value="violet">Violet</option>
							<option value="yellow">Yellow</option>
							<option value="black">Black</option>
							<option value="green">Green</option>
							<option value="red">Red</option>
							<option value="metallic">Metallic</option>
							<option value="silver">Silver</option>
							<option value="brown">Brown</option>
							<option value="orange-">Orange</option>
							<option value="white">White</option>
							<option value="dark-blue">Dark Blue</option>
							<option value="orange/silver">Orange/Silver</option>
							<option value="purple/black">Purple/Black</option>
							<option value="silicon-silver">Silicon Silver</option>
							<option value="yulong-white">Yulong White</option>
							<option value="kaikoura-stone">Kaikoura Stone</option>
							<option value="caviar">Caviar</option>
							<option value="purple">Purple</option>
							<option value="matte-grey">Matte Grey</option>
							<option value="matte-black">Matte Black</option>
						</select>
					</div>
					<div className="form_item">
						<select name="fuel_type" onChange={this.handleOnChange} value={filterFields.fuel_type}>
							<option>Select Fuel Type</option>
							<option value="any">Any</option>
							<option value="gasoline">Gasoline</option>
							<option value="diesel">Diesel</option>
							<option value="hybrid">Hybrid</option>
							<option value="electric">Electric</option>
						</select>
					</div>
					<div className="form_item">
						<button type="submit" className="tec_button">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}			

export default FilterCars

				