import { Component, OnInit } from '@angular/core';
import {Order} from "../../@core/models/order";
import {Car} from "../../@core/models/car";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";

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


  constructor() { }

  ngOnInit() {
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

    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
  }

}
