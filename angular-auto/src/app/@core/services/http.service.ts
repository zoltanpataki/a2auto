import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";
import {Order} from "../models/order";
import {Salesmen} from "../models/salesmen";
import {Witness} from "../models/witness";
import {Utility} from "../models/utility";
import {InheritanceTax} from "../models/inheritanceTax";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'http://192.168.0.4:80',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // private carServerUrl =  'http://192.168.0.4:60000/';
  private carServerUrl =  'http://localhost:60000/';

  constructor(private http: HttpClient) { }

  public saveCar(car: Car): Observable<any> {
    const urlPostFix = 'saveCar';
    return this.http.post(this.carServerUrl + urlPostFix, car, httpOptions);
  }

  public updateCar(car: Car): Observable<any> {
    const urlPostFix = 'updateCar';
    return this.http.put(this.carServerUrl + urlPostFix, car, httpOptions);
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
    return this.http.post(this.carServerUrl + urlPostFix, user, httpOptions);
  }

  public saveCompany(company: any): Observable<any> {
    const urlPostFix = 'saveCompany';
    return this.http.post(this.carServerUrl + urlPostFix, company, httpOptions);
  }

  public saveUtility(utility: any): Observable<any> {
    const urlPostFix = 'saveUtility';
    return this.http.post(this.carServerUrl + urlPostFix, utility, httpOptions);
  }

  public saveOrder(order: any): Observable<any> {
    const urlPostFix = 'saveOrder';
    return this.http.post(this.carServerUrl + urlPostFix, order, httpOptions);
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
    const urlPostFix = `getAllCars`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public getSingleCar(filter: string, filterType: string, soldOrNot: string): Observable<any> {
    const urlPostFix = 'getSingleCar';
    const params = new HttpParams()
      .set('filter', filter)
      .set('filterType', filterType)
      .set('soldOrNot', soldOrNot);
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    })
  }

  public getSingleCarById(id: string): Observable<any> {
    const urlPostFix = `getSingleCarById/${id}`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public getOrder(carId: number): Observable<any> {
    const urlPostFix = 'getOrder';
    const params = new HttpParams()
      .set('carId', carId.toString());
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    })
  }

  public getDescriptionsForCountInCarSupplement(countInCarSupplementId: number): Observable<any> {
    const urlPostFix = 'getDescriptions';
    const params = new HttpParams()
      .set('countInCarSupplementId', countInCarSupplementId.toString());
    return this.http.get(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      params: params
    })
  }

  public updateOrder(order: Order): Observable<any> {
    const urlPostFix = 'updateOrder';
    return this.http.put(this.carServerUrl + urlPostFix, order, httpOptions);
  }

  public getUtility(name: string): Observable<any> {
    const urlPostFix = `getUtility/${name}`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public getAllUtilities(): Observable<any> {
    const urlPostFix = 'getAllUtilities';
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public updateUtility(utilities: Array<Utility>): Observable<any> {
    const urlPostFix = 'updateUtility';
    return this.http.post(this.carServerUrl + urlPostFix, utilities, httpOptions);
  }

  public getAllInheritanceTaxInfo(): Observable<any> {
    const urlPostFix = 'getAllInheritanceTaxInfo';
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public updateInheritanceTaxInfo(inheritanceTaxInfo: Array<InheritanceTax>): Observable<any> {
    const urlPostFix = 'updateInheritanceTax';
    return this.http.post(this.carServerUrl + urlPostFix, inheritanceTaxInfo, httpOptions);
  }

  public getChargeForInheritanceTax(kw: string, age: string): Observable<any> {
    const urlPostFix = `getChargeForInheritanceTax/${kw}/${age}`;
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public saveSalesman(salesman: Salesmen): Observable<any> {
    const urlPostFix = 'saveSalesman';
    return this.http.post(this.carServerUrl + urlPostFix, salesman, httpOptions);
  }

  public getAllSalesmen(): Observable<any> {
    const urlPostFix = 'getAllSalesmen';
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public deleteSalesman(salesmanId: any): Observable<any> {
    const urlPostFix = `deleteSalesman/${salesmanId}`;
    return this.http.delete(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public saveWitness(witness: Witness): Observable<any> {
    const urlPostFix = 'saveWitness';
    return this.http.post(this.carServerUrl + urlPostFix, witness, httpOptions);
  }

  public getAllWitnesses(): Observable<any> {
    const urlPostFix = 'getAllWitnesses';
    return this.http.get(this.carServerUrl + urlPostFix, httpOptions);
  }

  public deleteWitness(witnessId: any): Observable<any> {
    const urlPostFix = `deleteWitness/${witnessId}`;
    return this.http.delete(this.carServerUrl + urlPostFix, {
      headers: httpOptions.headers,
      responseType: 'text',
    });
  }

  public callZipCodeService(zipcode: string): Observable<any> {
    // external zipCode provider but it is a little bit slow
    // const corsUrl = 'https://cors-anywhere.herokuapp.com/';
    // const baseZipCodeUrl = 'https://irmeva.herokuapp.com/api/v1/node?irsz=';
    const baseZipCodeUrl = `getZipCode/${zipcode}`;
    return this.http.get(this.carServerUrl + baseZipCodeUrl, httpOptions);
  }
}
