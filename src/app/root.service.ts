import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RootService {
  constructor(private http: HttpClient) {}

  weather = {};

  handleDataWeather(data) {
    console.log(data);
    const result = {
      city: data.request[0].query,
      temp_C: data.current_condition[0].temp_C,
      FeelsLikeC: data.current_condition[0].FeelsLikeC,
      humidity: data.current_condition[0].humidity,
      windspeedKmph: data.current_condition[0].windspeedKmph,
      uvIndex: data.weather[0].uvIndex,
      days: [
        {
          mintempC: data.weather[0].mintempC,
          maxtempC: data.weather[0].maxtempC
        },
        {
          mintempC: data.weather[1].mintempC,
          maxtempC: data.weather[1].maxtempC
        },
        {
          mintempC: data.weather[2].mintempC,
          maxtempC: data.weather[2].maxtempC
        },
        {
          mintempC: data.weather[3].mintempC,
          maxtempC: data.weather[3].maxtempC
        },
        {
          mintempC: data.weather[4].mintempC,
          maxtempC: data.weather[4].maxtempC
        },
        {
          mintempC: data.weather[5].mintempC,
          maxtempC: data.weather[5].maxtempC
        },
        {
          mintempC: data.weather[6].mintempC,
          maxtempC: data.weather[6].maxtempC
        }
      ]
    };

    this.weather = { ...result };
  }
}
