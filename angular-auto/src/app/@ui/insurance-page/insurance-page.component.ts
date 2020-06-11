import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {HttpService} from "../../@core/services/http.service";
import {Utility} from "../../@core/models/utility";
import {Car} from "../../@core/models/car";
import {Order} from "../../@core/models/order";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insurance-page',
  templateUrl: './insurance-page.component.html',
  styleUrls: ['./insurance-page.component.scss']
})
export class InsurancePageComponent implements OnInit {

  public today: Date;
  public insuranceOfferNumber: number;
  public orderedCar: Car;
  public order: Order;
  public userSearchResult: Users[];
  public companySearchResult: Company[];
  public indexOfPickedUser: number;
  public indexOfPickedCompany: number;
  public pickedUser: Users;
  public pickedCompany: Company;
  public insurancePrice: number;
  public insuredCar: Car;
  public insuranceDateExpiry: Date;

  constructor(private httpService: HttpService,
              public router: Router) { }

  ngOnInit() {
    this.today = new Date();
    this.insurancePrice = this.randomIntFromInterval(20000, 35000);
    if (sessionStorage.getItem('order') != null) {
      this.order = JSON.parse(sessionStorage.getItem('order'));
    }
    if (sessionStorage.getItem('orderedCar') != null) {
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (sessionStorage.getItem('insuredCar') != null) {
      this.insuredCar = JSON.parse(sessionStorage.getItem('insuredCar'));
    }
    if (history.state.data) {
      this.order = history.state.data.order;
      this.orderedCar = history.state.data.orderedCar;
      this.userSearchResult = history.state.data.userSearchResult;
      this.companySearchResult = history.state.data.companySearchResult;
      this.indexOfPickedUser = history.state.data.indexOfPickedUser;
      this.indexOfPickedCompany = history.state.data.indexOfPickedCompany;
      this.pickedUser = history.state.data.pickedUser;
      this.pickedCompany = history.state.data.pickedCompany;
      if (history.state.data.clickedCarIndex != null) {
        sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      }
      if (this.orderedCar != null) {
        sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      }
      if (this.order != null) {
        sessionStorage.setItem('order', JSON.stringify(this.order));
      }
      if (this.userSearchResult != null) {
        sessionStorage.setItem('userSearchData', JSON.stringify(this.userSearchResult));
      }
      if (this.companySearchResult != null) {
        sessionStorage.setItem('companySearchData', JSON.stringify(this.companySearchResult));
      }
      if (this.orderedCar != null) {

      }
      if (this.indexOfPickedUser != null) {
        sessionStorage.setItem('indexOfPickedUser', JSON.stringify(this.indexOfPickedUser));
      }
      if (this.indexOfPickedCompany != null) {
        sessionStorage.setItem('indexOfPickedCompany', JSON.stringify(this.indexOfPickedCompany));
      }
      if (this.pickedUser != null) {
        sessionStorage.setItem('pickedUser', JSON.stringify(this.pickedUser));
      }
      if (this.pickedCompany != null) {
        sessionStorage.setItem('pickedCompany', JSON.stringify(this.pickedCompany));
      }
      if (this.order && this.order.countInCarId) {
        this.httpService.getSingleCarById(this.order.countInCarId.toString()).subscribe(data => {
          this.insuredCar = data;
          sessionStorage.setItem('insuredCar', JSON.stringify(this.insuredCar));
          sessionStorage.setItem('newCar', JSON.stringify(this.insuredCar));
        });
      } else {
        this.insuredCar = history.state.data.insuredCar;
        sessionStorage.setItem('insuredCar', JSON.stringify(this.insuredCar));
        sessionStorage.setItem('newCar', JSON.stringify(this.insuredCar));
      }
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (sessionStorage.getItem('insuranceOfferNumber') != null) {
      this.insuranceOfferNumber = Number(sessionStorage.getItem('insuranceOfferNumber'));
    } else {
      if (this.order != null) {
        this.httpService.getSingleCarById(this.order.countInCarId.toString()).subscribe(car => {
          if (car.insuranceNumber == null) {
            this.httpService.getUtility('insuranceOfferNumber').subscribe(utility => {
              this.insuranceOfferNumber = Number(utility.value) + 1;
              const insuranceUtilityObject = new Utility(utility.id, utility.name, this.insuranceOfferNumber.toString());
              sessionStorage.setItem('insuranceOfferNumber', this.insuranceOfferNumber.toString());
              this.httpService.saveUtility(insuranceUtilityObject).subscribe(savedUtility => {
                car.insuranceNumber = this.insuranceOfferNumber;
                this.httpService.updateCar(car).subscribe(updatedCar => {
                  this.order.countInCarId = updatedCar.id;
                  sessionStorage.setItem('order', JSON.stringify(this.order));
                });
              });
            });
          } else {
            this.insuranceOfferNumber = car.insuranceNumber;
          }
        });
      } else {
        this.httpService.getUtility('insuranceOfferNumber').subscribe(data => {
          this.insuranceOfferNumber = Number(data.value) + 1;
          const insuranceUtilityObject = new Utility(data.id, data.name, this.insuranceOfferNumber.toString());
          sessionStorage.setItem('insuranceOfferNumber', this.insuranceOfferNumber.toString());
          this.httpService.saveUtility(insuranceUtilityObject).subscribe(data => {
            this.insuredCar.insuranceNumber = this.insuranceOfferNumber.toString();
            this.httpService.updateCar(this.insuredCar).subscribe(data => {
              this.insuredCar = data;
            });
          });
        });
      }
    }
    if (this.insuredCar != null) {
      this.determineInsuranceDateExpiry();
    }
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private determineInsuranceDateExpiry() {
    const date = new Date(this.insuredCar.dateOfArrival);
    date.setDate(date.getDate() + 30);
    this.insuranceDateExpiry = date;
  }

  public captureScreen() {
    const jsPDF = require('jspdf');
    var data = document.getElementById('insuranceContainer');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('insurance.pdf'); // Generated PDF
    });
  }

  public navigateBack() {
    this.router.navigate(['/filter']);
  }

}
