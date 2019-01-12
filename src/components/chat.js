import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import axios from 'axios';

class Chat extends Component {
	render() {
		return (
			<div className="chat_page">
				<iframe src="https://lc.chat/now/8673901/"></iframe>
			</div>
		)
	}
}

export default Chat;