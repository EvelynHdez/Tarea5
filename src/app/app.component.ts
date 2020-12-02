import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {JsonService} from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'http-client';

  http;
  constructor (
    private JsonService : JsonService,
    private cookie: CookieService
    ){
  }

  ngOnInit(){
  }

getJson(cityName: string){
    this.JsonService.getJson(cityName)
    .subscribe(
      res =>{
        console.log(res);
        this.cookie.set("ciudad",res["name"]);
        this.cookie.set("vientos",res["wind"].deg);

        alert("Los vientos de " + this.cookie.get("ciudad") + " son de " + this.cookie.get("viento") + " km por hora");

        this.http = res},
      err => console.log(err)
    )

  }

  submitLocation(cityName: HTMLInputElement,countryCode: HTMLInputElement){
    if(cityName.value){
      this.getJson(cityName.value);
      cityName.value = '';
    }
    else{
      alert('Inserta algun dato')
    }
    cityName.focus();
    return false;

  }
  

}
