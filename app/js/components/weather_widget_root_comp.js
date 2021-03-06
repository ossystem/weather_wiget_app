import React, { Component } from 'react';
import InfoComp from './info_comp';
import WListComp from './weather_list_comp';
import PropTypes from 'prop-types'; 

class WWRootComp extends Component {

	

	componentDidMount() {
		this._getForecastForYou();
	}
//get weather by geolocation data of your browser
	_getForecastForYou(){
		let that = this;
		//options
		let options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
		};
		//success callback
		function success(pos) {
			let coords = pos.coords;
			let crd = {};
			crd.latitude=coords.latitude;
			crd.longitude=coords.longitude;
			//if success
			that.props.getForecast(crd);
		};
		//error callback
		function error(err) {
			console.warn(err.code+':'+err.message);
			alert(err.message);
		};

		//get geolocation info
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error, options);
		}else{
			let crd = {};
			crd.latitude=50.458347;
			crd.longitude=30.501769;
			that.props.getForecast(crd);
		}
	}

	render() {
		if (!this.props.loading_forecast) {
			let f = this.props.forecast;
			let city = f.city.name;
			let temp = Math.floor(f.list[0].temp.day);
			let w_id = f.list[0].weather[0].id;
			let list = f.list;
			let dt = f.list[0].dt;
			return (
				<div className="ww_root">
					<InfoComp 	city={city}
								temp={temp}
								w_id={w_id}
								dt={dt}/>
					<WListComp list={list}/>
				</div>
			);
			}else{
				return (<h1>Loading forecast for you</h1>);
			};
		}
}

WWRootComp.PropTypes = {
	forecast: PropTypes.object,
	loading_forecast: PropTypes.bool,
	getForecast: PropTypes.func
}

export default WWRootComp;
