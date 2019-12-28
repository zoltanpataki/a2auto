import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {HttpService} from "../../@core/services/http.service";
import {Utility} from "../../@core/models/utility";
import {Car} from "../../@core/models/car";
import {Order} from "../../@core/models/order";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";

@Component({
  selector: 'app-insurance-page',
  templateUrl: './insurance-page.component.html',
  styleUrls: ['./insurance-page.component.scss']
})
export class InsurancePageComponent implements OnInit {

  private today: Date;
  private insuranceOfferNumber: number;
  private orderedCar: Car;
  private order: Order;
  private userSearchResult: Users[];
  private companySearchResult: Company[];
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private pickedUser: Users;
  private pickedCompany: Company;
  private insurancePrice: number;
  private insuredCar: Car;

  constructor(private httpService: HttpService,) { }

  ngOnInit() {
    this.today = new Date();
    this.insurancePrice = this.randomIntFromInterval(20000, 35000);
    if (sessionStorage.getItem('order') != null) {
      this.order = JSON.parse(sessionStorage.getItem('order'));
    }
    if (sessionStorage.getItem('orderedCar') != null) {
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
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
      sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      sessionStorage.setItem('order', JSON.stringify(this.order));
      sessionStorage.setItem('userSearchData', JSON.stringify(this.userSearchResult));
      sessionStorage.setItem('companySearchData', JSON.stringify(this.companySearchResult));
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
      if (this.order && this.order.countInCar) {
        this.insuredCar = this.order.countInCar;
        sessionStorage.setItem('insuredCar', JSON.stringify(this.insuredCar));
      } else {
        this.insuredCar = history.state.data.insuredCar;
        sessionStorage.setItem('insuredCar', JSON.stringify(this.insuredCar));
      }
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (sessionStorage.getItem('insuranceOfferNumber') != null) {
      this.insuranceOfferNumber = Number(sessionStorage.getItem('insuranceOfferNumber'));
    } else {
      this.httpService.getSingleCarById(this.order.countInCar.id.toString()).subscribe(data => {
        if (data.insuranceNumber == null) {
          this.httpService.getUtility('insuranceOfferNumber').subscribe(data => {
            this.insuranceOfferNumber = Number(data.value) + 1;
            const insuranceUtilityObject = new Utility(data.id, data.name, this.insuranceOfferNumber.toString());
            sessionStorage.setItem('insuranceOfferNumber', this.insuranceOfferNumber.toString());
            this.httpService.saveUtility(insuranceUtilityObject).subscribe(data => {
              this.order.countInCar.insuranceNumber = this.insuranceOfferNumber.toString();
              this.httpService.updateCar(this.order.countInCar).subscribe(data => {
                this.order.countInCar = data;
                sessionStorage.setItem('order', JSON.stringify(this.order));
              });
            });
          });
        }
      });
    }
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public captureScreen() {
    var data = document.getElementById('gdprContainer');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('GDPR.pdf'); // Generated PDF
    });
  }

}
