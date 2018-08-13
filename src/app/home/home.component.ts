import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as $ from "jquery";
import { RootService } from "../root.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { fakeNews } from "../data/fake-news";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  weather: any;
  gotInfo: boolean;

  handleSubmitInput(event) {
    console.log(event);
    event = event.replace(' ', '')
    $.get(
      `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=7528520a53864c53a34165313180308&q=${event}&format=json&lang=vi`,
      res => {
        console.log(res.data);
        const result = {
          ...res.data,
          city: res.data.request[0].query,
          title: res.data.current_condition[0].lang_vi[0].value,
          temp_C: res.data.current_condition[0].temp_C,
          FeelsLikeC: res.data.current_condition[0].FeelsLikeC,
          humidity: res.data.current_condition[0].humidity,
          windspeedKmph: res.data.current_condition[0].windspeedKmph,
          uvIndex: res.data.weather[0].uvIndex,
          days: [
            {
              mintempC: res.data.weather[0].mintempC,
              maxtempC: res.data.weather[0].maxtempC
            },
            {
              mintempC: res.data.weather[1].mintempC,
              maxtempC: res.data.weather[1].maxtempC
            },
            {
              mintempC: res.data.weather[2].mintempC,
              maxtempC: res.data.weather[2].maxtempC
            },
            {
              mintempC: res.data.weather[3].mintempC,
              maxtempC: res.data.weather[3].maxtempC
            },
            {
              mintempC: res.data.weather[4].mintempC,
              maxtempC: res.data.weather[4].maxtempC
            },
            {
              mintempC: res.data.weather[5].mintempC,
              maxtempC: res.data.weather[5].maxtempC
            },
            {
              mintempC: res.data.weather[6].mintempC,
              maxtempC: res.data.weather[6].maxtempC
            }
          ]
        };
        this.gotInfo = true;
        this.weather = result;
      }
    );
  }
  results = [];
  input: string = null;
  newsData = [];

  constructor() {}

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

  getProvince(event) {
    if (event.target.value == null || event.target.value == "") {
      this.results = [];
      return;
    }
    let value = this.change_alias(event.target.value);
    let provinceRegex = new RegExp("\\b^" + value, "gi");
    let matched = this.province.filter(provinceName =>
      this.change_alias(provinceName).match(provinceRegex)
    );
    this.results = matched;
  }

  bindResultToInput(result) {
    this.handleSubmitInput(this.change_alias(result));
    this.input = result;
    this.results = [];
  }

  ngOnInit() {
    this.newsData = fakeNews;
    $(function() {
      $(".day").click(function() {
        $(this)
          .siblings()
          .removeClass("active");
        $(this)
          .siblings()
          .find(".day-stats")
          .removeClass("active");
        $(this)
          .find(".day-stats")
          .toggleClass("active");
        $(this).toggleClass("active");
      });

      $(window).scroll(function() {
        if ($(window).scrollTop() > window.innerHeight - $(".city-forecast").offset().top + 300) {
          $(".city-forecast").addClass("active");
        }
      });

      $("img").on('error',function(){
        $(this).attr('src','./assets/img/error.png')

      })

    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const googleApiCall = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`;

        $.get(googleApiCall, res => {
          console.log(res.results);
          const city = res.results[2].address_components[1].short_name;
          this.handleSubmitInput(this.change_alias(city));
        });
      });
    }
  }

  ngAfterViewInit() {

  }
}
