import React, { Component } from 'react';

export default class Modal extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tec_m_modal">
				<div className="tec_m_modal_dialog">
					<div className="tec_m_modal_content">
						<div className="tmc_header">
							{this.props.modalTitle}
						</div>
						{this.props.children}
					</div>
					<div className="close_modal"><i className="material-icons">close</i>Close</div>
				</div>
			</div>
		);
	}
}