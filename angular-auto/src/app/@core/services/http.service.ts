import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private carServerUrl =  'http://localhost:60000/';

  constructor(private http: HttpClient) { }

  public saveCar(car: Car): Observable<any> {
    const urlPostFix = 'saveCar';
    return this.http.post(this.carServerUrl + urlPostFix, car, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public updateCar(car: Car): Observable<any> {
    const urlPostFix = 'updateCar';
    return this.http.put(this.carServerUrl + urlPostFix, car, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public deleteCar(carId: any): Observable<any> {
    const urlPostFix = `deleteCar/${carId}`;
    return this.http.delete(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public saveUser(user: any): Observable<any> {
    const urlPostFix = 'saveUser';
    return this.http.post(this.carServerUrl + urlPostFix, user, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public saveCompany(company: any): Observable<any> {
    const urlPostFix = 'saveCompany';
    return this.http.post(this.carServerUrl + urlPostFix, company, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public getUser(filter: string, filterType: string): Observable<any> {
    const urlPostFix = 'getUser';
    const params = new HttpParams()
      .set('filter', filter)
      .set('filterType', filterType);
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    });
  }

  public getCompany(filter: string, filterType: string): Observable<any> {
    const urlPostFix = 'getCompany';
    const params = new HttpParams()
      .set('filter', filter)
      .set('filterType', filterType);
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    });
  }

  public getAllCars(): Observable<any> {
    const urlPostFix = 'getAllCars';
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public getSingleCar(filter: string, filterType: string): Observable<any> {
    const urlPostFix = 'getSingleCar';
    const params = new HttpParams()
      .set('filter', filter)
      .set('filterType', filterType);
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    })
  }

  public getUtility(name: string): Observable<any> {
    const urlPostFix = `getUtility/${name}`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public getChargeForInheritanceTax(kw: string, age: string): Observable<any> {
    const urlPostFix = `getChargeForInheritanceTax/${kw}/${age}`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }
}
