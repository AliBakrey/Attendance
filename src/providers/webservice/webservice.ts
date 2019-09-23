import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SERVER_URL = 'http://10.3.14.1:8080';
/*
  Generated class for the WebserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WebserviceProvider Provider');
  }

  public attend = SERVER_URL+ '/attend';
  public leave = SERVER_URL+ '/leave';
  
}
