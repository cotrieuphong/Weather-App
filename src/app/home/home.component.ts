import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { RootService } from "../root.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  weather: any;
  gotInfo: boolean;

  constructor(private rootService: RootService, private http: HttpClient) {}

  handleSubmitInput(event) {
    console.log(event.target.value);
    $.get(
      `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=7528520a53864c53a34165313180308&q=${
        event.target.value
      }&format=json&lang=vi`,
      res => {
        console.log(res.data);
        const result = {
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

  ngOnInit() {
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
        if ($(window).scrollTop() > window.outerHeight - $(".a").offset().top) {
          $(".a").addClass("active");
        }
      });
    });
  }
}
