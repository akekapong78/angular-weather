import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  constructor(private http:HttpClient) {}

  // สร้างเส้น api openweather
  apiKey: String = '41e315fedb145c2ed2f004b0a1460e35';
  getWeatherByCity(city: any) {
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(cityUrl);
  }
  getWeatherByLatlon(lat: any, lon: any) {
    const latlonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(latlonUrl);
  }

  // สร้างเส้น api ambee
  apiKey_ambee: String = 'e23b02cf0596899438430f2facf8cd9455f9990acce5f68993a9dcac0eff736a';
  httpHeaders = new HttpHeaders({
		"x-api-key": `${this.apiKey_ambee}`,
		"Content-type": "application/json"
	});

  getPM25byCity(city: any) {
    // console.log(this.httpHeaders)
    const cityUrl = `https://api.ambeedata.com/latest/by-city?city=${city}`;
    return this.http.get(cityUrl, {headers: this.httpHeaders});
  }

  getPM25byLatLon(lat: any, lon: any) {
    // console.log(this.httpHeaders)
    const latlonUrl = `https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lon}`;
    return this.http.get(latlonUrl, {headers: this.httpHeaders});
  }
}
