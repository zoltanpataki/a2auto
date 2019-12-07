import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {Car} from "../../@core/models/car";
import {Order} from "../../@core/models/order";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";
import {Witness} from "../../@core/models/witness";

@Component({
  selector: 'app-warrant-page',
  templateUrl: './warrant-page.component.html',
  styleUrls: ['./warrant-page.component.scss']
})
export class WarrantPageComponent implements OnInit {

  private orderedCar: Car;
  private order: Order;
  private today: Date;
  private userSearchResult: Users[];
  private companySearchResult: Company[];
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private pickedUser: Users;
  private pickedCompany: Company;
  private witness1: Witness;
  private witness2: Witness;
  private warrantType: string;

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('order') != null) {
      this.order = JSON.parse(sessionStorage.getItem('order'));
    }
    if (sessionStorage.getItem('orderedCar') != null) {
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (sessionStorage.getItem('witness1') != null) {
      this.witness1 = JSON.parse(sessionStorage.getItem('witness1'));
    }
    if (sessionStorage.getItem('witness2') != null) {
      this.witness2 = JSON.parse(sessionStorage.getItem('witness2'));
    }
    if (sessionStorage.getItem('warrantType') != null) {
      this.warrantType = JSON.parse(sessionStorage.getItem('warrantType'));
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
      this.witness1 = history.state.data.witness1;
      this.witness2 = history.state.data.witness2;
      this.warrantType = history.state.data.warrantType;
      sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      sessionStorage.setItem('order', JSON.stringify(this.order));
      sessionStorage.setItem('userSearchData', JSON.stringify(this.userSearchResult));
      sessionStorage.setItem('companySearchData', JSON.stringify(this.companySearchResult));
      sessionStorage.setItem('witness1', JSON.stringify(this.witness1));
      sessionStorage.setItem('witness2', JSON.stringify(this.witness2));
      sessionStorage.setItem('warrantType', JSON.stringify(this.warrantType));
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
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
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
