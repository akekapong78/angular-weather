import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  constructor(private http:HttpClient) {}

  // สร้างเส้น api
  apiKey: String = '41e315fedb145c2ed2f004b0a1460e35';
  getWeatherByCity(city: any) {
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(cityUrl);
  }
  getWeatherByLatlon(lat: any, lon: any) {
    const latlonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(latlonUrl);
  }
}
