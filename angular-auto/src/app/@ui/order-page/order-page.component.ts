import { Component, OnInit } from '@angular/core';
import {Order} from "../../@core/models/order";
import {Car} from "../../@core/models/car";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  private orderedCar: Car;
  private order: Order;
  private today: Date;

  constructor() { }

  ngOnInit() {
    this.today = new Date();
    if (history.state.data) {
      this.order = history.state.data.order;
      this.orderedCar = history.state.data.orderedCar;
      sessionStorage.setItem('order', JSON.stringify(this.order));
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
  }

}
