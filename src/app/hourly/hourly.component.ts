import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as $ from "jquery";
import * as moment from "moment";

@Component({
	selector: 'app-hourly',
	templateUrl: './hourly.component.html',
	styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {
	weather: any;
	hourly: any;
	h = 0;

	constructor(
		private route: ActivatedRoute,
		private Title: Title,
		) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			var city = this.route.snapshot.paramMap.get('city');
			var date = this.route.snapshot.paramMap.get('date');
			$.get(
				`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=7528520a53864c53a34165313180308&q=${city}&format=json&lang=vi&date=${date}`,
				res => {
					const result = {
						...res.data,
						date: moment(res.data.weather[0].date, "YYYY-MM-DD")
						.locale("vi")
						.format("dddd"),
						day: moment(res.data.weather[0].date, "YYYY-MM-DD")
						.locale("vi")
						.format("DD-MM-YYYY"),
						city: res.data.request[0].query,
						city_name: event,
						title: res.data.weather[0].hourly[0].lang_vi[0].value,
						maxtempC: res.data.weather[0].maxtempC,
						mintempC: res.data.weather[0].mintempC,
						FeelsLikeC: res.data.current_condition[0].FeelsLikeC,
						windspeedKmph: res.data.weather[0].hourly[0].windspeedKmph,
						humidity: res.data.weather[0].hourly[0].humidity,
						uvIndex: res.data.weather[0].uvIndex,
					};
					this.weather = result;
					this.hourly = res.data.weather[0].hourly;
					this.hourly.shift();
				}
				);
		});
	}

	getHour(time) {
		return parseInt(time) / 100 + ' giờ';
	}

}
