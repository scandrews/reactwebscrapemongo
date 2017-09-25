
// search.js
import React from "react";

import helpers from "../utils/helpers";

import Query from "./Search/Query";
import Results from "./Search.Results";

// import {Link} from "react-router";

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			results:{}
		}
	}

	setQuery (newQuery, newStart, newEnd) => {
		helpers.runQuery, newStart, newEnd).then(function(data){
			this.setState({ result:{docs: data.docs}})
		}.bind(this));
	},

	render(){
		return(
			<div className="main-container">
				<Query setQuery={this.setQuery()} />
				<Results results={this.state.results} />
			</div>
		)
	}

exports.

// {*/
// 	,

// 	render(){
// 		return (
// 			<div>
// 				<h1>Hello</h1>
// 			</div>
// 		)
// 	}
/*}
}


//  helpers file

import axios from "axios";

const APIKey = 

const helpers = {
	runQuery: (topic, start, end) => {
		const formatedTopic = topic.trim();
		const formatedTopic = state.trim() + "1010" ;
		const formatedEnd = end.trim() + "1231"

		return axios.get("")
	}
}