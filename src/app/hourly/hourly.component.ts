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

  province = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bạc Liêu",
    "Bắc Kạn",
    "Bắc Giang",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Dương",
    "Bình Định",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Cần Thơ",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Đồng Nai",
    "Đồng Tháp",
    "Điện Biên",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hòa Bình",
    "Hậu Giang",
    "Hưng Yên",
    "Thành phố Hồ Chí Minh",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lào Cai",
    "Lạng Sơn",
    "Lâm Đồng",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên - Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
  ];

  change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }

	ngOnInit() {
		this.route.params.subscribe(params => {
			var city = this.route.snapshot.paramMap.get('city');
      city = city.replace("-", " ")
      if (city == 'dak lak') {
        city = 'dac lac'
      }
			var date = this.route.snapshot.paramMap.get('date');
			$.get(
				`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=0acb0aa11bcb4ec8a67114454181412&q=${city}&format=json&lang=vi&date=${date}`,
				res => {
          let value = res.data.request[0].query.split(',')[0];
          let provinceRegex = new RegExp("\\b^" + value, "gi");
          let cityName = this.province.filter(provinceName =>
            this.change_alias(provinceName).match(provinceRegex)
          );
          if (res.data.request[0].query.split(',')[0] == 'Vung Tau') {
            cityName[0] = "Bà Rịa - Vũng Tàu"
          }
          else if (res.data.request[0].query.split(',')[0] ==  'Ap Binh Thuan') {
            cityName[0] = "Bình Thuận"
          }
          else if (res.data.request[0].query.split(',')[0] ==  'Buon Bubo Dak Nong') {
            cityName[0] = "Đắk Nông"
          }
          else if (res.data.request[0].query.split(',')[0] ==  'Dac Lac') {
            cityName[0] = "Đắk Lắk"
          }
          else if (res.data.request[0].query.split(',')[0] ==  'Bi Giang') {
            cityName[0] = "Hậu Giang"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Yen Hung') {
            cityName[0] = "Hưng Yên"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Dong Lam') {
            cityName[0] = "Lâm Đồng"
          }
          else if (res.data.request[0].query.split(',')[0] == 'An Long') {
            cityName[0] = "Long An"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Ban Nghe') {
            cityName[0] = "Nghệ An"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Ap Quang Binh') {
            cityName[0] = "Quảng Bình"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Hue') {
            cityName[0] = "Thừa Thiên - Huế"
          }
          else if (res.data.request[0].query.split(',')[0] == 'Tien Tien') {
            cityName[0] = "Tiền Giang"
          }
					const result = {
						...res.data,
						date: moment(res.data.weather[0].date, "YYYY-MM-DD")
						.locale("vi")
						.format("dddd"),
						day: moment(res.data.weather[0].date, "YYYY-MM-DD")
						.locale("vi")
						.format("DD-MM-YYYY"),
						city: cityName[0] + ', Việt Nam',
						city_name: this.change_alias(cityName[0]).replace(" ", "-"),
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
