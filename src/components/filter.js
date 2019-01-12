import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class FilterSlide extends Component {
	render() {

		var visibility = "hide";
 
	    if (this.props.filterVisibility) {
	    	visibility = "show";
	    }

		return (
			<div className={"filter_slide_container" + " " + visibility }>
				<div className="filter_slide">
					<div className="fs_header">
						Filter Results
						<button className="close-menu" onMouseDown={this.props.handleFilterModal}><i className="material-icons">close</i></button>
					</div>
					<div className="fs_body">
						{this.props.children}
					</div>
				</div>
				<div className="filter_overlay" onMouseDown={this.props.handleFilterModal}></div>
			</div>
		)
	}
}

export default FilterSlide;