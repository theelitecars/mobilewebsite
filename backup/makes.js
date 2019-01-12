import React, { Component } from 'react';

import axios from 'axios';

class Makes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			makes:
			{
				error: null,
				isLoaded: false,
				items: [],
			},
		}
	}

	componentDidMount() {
		axios.get('http://theelitecars.com/wp-json/wp/v2/makes_models?parent=0&per_page=100')
			.then((res) => {
				this.setState((prevState, props) => ({
					makes: 
					{
						error: prevState.makes.error,
						isLoaded: !prevState.makes.isLoaded,
						items: res.data,
					}
				}));
			})
			.catch((error) => {
				this.setState((prevState, props) => ({
					slider: 
					{
						error: error,
						isLoaded: prevState.makes.isLoaded,
						items: prevState.makes.items,
					}
				}));
				console.log(error);
			});
	}

	render() {
		var makes = this.state.makes.items;

		return (
			<div className="search_our_stock_page">
				<div className="container-fluid">
					<h2>Select A Make</h2>
					<ul>
						{
							makes.map((make, index) =>
								<li key={index}>
									<a href="">{make.name}<i className="material-icons">chevron_right</i></a>
								</li>
							)
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Makes;