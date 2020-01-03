import { Component, OnInit } from '@angular/core';
import {Order} from "../../@core/models/order";
import {Car} from "../../@core/models/car";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  private orderedCar: Car;
  private order: Order;
  private today: Date;
  private userSearchResult: Users[];
  private companySearchResult: Company[];
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private pickedUser: Users;
  private pickedCompany: Company;
  private remainingPrice: number;
  private blankPage: boolean;
  private extraAmountChargedForTheUser: number;


  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('order') != null) {
      this.order = JSON.parse(sessionStorage.getItem('order'));
    }
    if (sessionStorage.getItem('orderedCar') != null) {
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (sessionStorage.getItem('blankPage') != null) {
      this.blankPage = JSON.parse(sessionStorage.getItem('blankPage'));
    }
    this.today = new Date();
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

    } else if (history.state.blankData) {
      this.orderedCar = history.state.blankData.orderedCar;
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      this.blankPage = history.state.blankData.blankPage;
      sessionStorage.setItem('blankPage', this.blankPage.toString());
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (this.order && this.orderedCar) {
      this.remainingPrice = this.countRemainingPrice(this.order, this.orderedCar);
    }
  }

  private countRemainingPrice(order: Order, car: Car): number {
    const inheritance = order.inheritanceTax ? order.inheritanceTax : 0;
    const downPayment = order.downPayment ? order.downPayment : 0;
    const carPrice = car.price;
    const countInCarPrice = order.countInCarSupplement ? order.countInCarSupplement.countInPrice : 0;
    const credit = order.credit ? order.credit.creditAmount : 0;
    const extra = order.extra ? order.extra : 0;
    return (carPrice + inheritance + this.countAmountOfExtraCharge(order)) - (downPayment + countInCarPrice + credit + extra);
  }

  private countAmountOfExtraCharge(order: Order): number {
    if (order.descriptionsWithAmount != null) {
      let result = 0;
      order.descriptionsWithAmount.forEach(descriptionWithAmount => {
        result += descriptionWithAmount.amount;
      });
      this.extraAmountChargedForTheUser = result;
      return result;
    } else {
      return 0;
    }
  }

  public captureScreen() {
    var data = document.getElementById('orderContainer');
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
      pdf.save('order.pdf'); // Generated PDF
    });
  }

}
