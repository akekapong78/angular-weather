import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenWeatherService } from '../service/open-weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  // import service
  constructor(private service: OpenWeatherService) {}

  ngOnInit(): void {
    console.log('1. Oninit');
    this.getWeatherByLocation();
  }

  // สร้างค่า class เปล่าๆ ให้ form
  weatherForm = new FormGroup({
    location: new FormControl(''),
  });

  // ประกาศค่าเปล่า รอรับ res
  public resData: any;
  public isError: any;
  public lat: any;
  public lon: any;

  locationPromise(options?: PositionOptions): Promise<any> {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
  }

  async getLocation(): Promise<any> {
    console.log('2. get then save Lat Lon');
    if (navigator.geolocation) {
      try {
        const location = await this.locationPromise();
        this.lat = location.coords.latitude;
        this.lon = location.coords.longitude;
        console.log(this.lat);
        console.log(this.lon);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  async getWeatherByLocation(): Promise<any> {
    // wait data async from locationPromise()
    await this.getLocation();
    console.log('3. call api by lat lon oninit');
    this.service.getWeatherByLatlon(this.lat,this.lon).subscribe({
      next: (res) => {
        this.resData = res;
        // console.log(this.resData);
      },
      error: (err) => {
        console.log(err);
        this.isError = true;
      },
      complete: () => {
        this.isError = false;
      },
    });
  }

  getWeatherByCity() {
    console.log('4. call api by city name when click');
    if (this.weatherForm.value.location) {
      this.service.getWeatherByCity(this.weatherForm.value.location).subscribe({
        next: (res) => {
          this.resData = res;
          // console.log(this.resData);
        },
        error: (err) => {
          console.log(err);
          this.isError = true;
        },
        complete: () => {
          this.isError = false;
        },
      });
    } else {
      alert('Please input your City');
    }
  }
}
