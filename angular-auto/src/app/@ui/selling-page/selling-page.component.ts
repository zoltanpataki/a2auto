import {Component, OnInit} from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {Car} from "../../@core/models/car";
import {Order} from "../../@core/models/order";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";
import {UtilService} from "../../@core/services/util.service";
import {Witness} from "../../@core/models/witness";
import {HttpService} from "../../@core/services/http.service";

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss']
})
export class SellingPageComponent implements OnInit{

  private orderedCar: Car;
  private order: Order;
  private today: Date;
  private userSearchResult: Users[];
  private companySearchResult: Company[];
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private pickedUser: Users;
  private pickedCompany: Company;
  private carHandoverTime = {};
  private switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: boolean;
  private sellerCompany: Company;
  private buyerCompany: Company;
  private sellerIndividual: Users;
  private buyerIndividual: Users;
  private witness1: Witness;
  private witness2: Witness;
  private a2Representation: string;
  private sellerCompanyRepresentation: string;
  private buyerCompanyRepresentation: string;
  private remarkList;
  private typeOfBuying;

  constructor(private utilService: UtilService,
              private httpService: HttpService,) { }

  ngOnInit() {
    if (sessionStorage.getItem('A2Auto') != null) {
      this.utilService.a2Company = JSON.parse(sessionStorage.getItem('A2Auto'));
    }
    if (sessionStorage.getItem('order') != null) {
      this.order = JSON.parse(sessionStorage.getItem('order'));
    }
    if (sessionStorage.getItem('orderedCar') != null) {
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
      this.setCarHandoverTime(this.orderedCar.carHandover);
    }
    if (sessionStorage.getItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer') != null) {
      this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer = JSON.parse(sessionStorage.getItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer'));
    }
    if (sessionStorage.getItem('witness1') != null) {
      this.witness1 = JSON.parse(sessionStorage.getItem('witness1'));
    }
    if (sessionStorage.getItem('witness2') != null) {
      this.witness2 = JSON.parse(sessionStorage.getItem('witness2'));
    }
    if (sessionStorage.getItem('remarkList') != null) {
      this.remarkList = JSON.parse(sessionStorage.getItem('remarkList'));
    }
    if (sessionStorage.getItem('a2Representation') != null) {
      this.a2Representation = sessionStorage.getItem('a2Representation');
    }
    if (sessionStorage.getItem('pickedUser') != null) {
      this.pickedUser = JSON.parse(sessionStorage.getItem('pickedUser'));
    }
    if (sessionStorage.getItem('pickedCompany') != null) {
      this.pickedCompany = JSON.parse(sessionStorage.getItem('pickedCompany'));
    }
    this.today = new Date();
    if (history.state.data) {
      this.order = history.state.data.order;
      this.remarkList = history.state.data.remarkList;
      this.typeOfBuying = history.state.data.typeOfBuying;
      if (this.remarkList != null) {
        this.order = new Order(null, null, null, null, null, null, null, null, null, null,null, null, null, null, null,this.remarkList, null);
      }
      this.orderedCar = history.state.data.orderedCar;
      if (this.typeOfBuying != null) {
        this.orderedCar.typeOfBuying = this.typeOfBuying;
      }
      this.userSearchResult = history.state.data.userSearchResult;
      this.companySearchResult = history.state.data.companySearchResult;
      this.indexOfPickedUser = history.state.data.indexOfPickedUser;
      this.indexOfPickedCompany = history.state.data.indexOfPickedCompany;
      this.pickedUser = history.state.data.pickedUser;
      this.pickedCompany = history.state.data.pickedCompany;
      this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer = history.state.data.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer;
      this.witness1 = history.state.data.witness1;
      this.witness2 = history.state.data.witness2;
      this.a2Representation = history.state.data.a2Representation;

      sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      sessionStorage.setItem('order', JSON.stringify(this.order));
      sessionStorage.setItem('userSearchData', JSON.stringify(this.userSearchResult));
      sessionStorage.setItem('companySearchData', JSON.stringify(this.companySearchResult));
      sessionStorage.setItem('witness1', JSON.stringify(this.witness1));
      sessionStorage.setItem('witness2', JSON.stringify(this.witness2));
      sessionStorage.setItem('a2Representation', this.a2Representation);
      sessionStorage.setItem('typeOfBuying', this.typeOfBuying);
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
      if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer != null) {
        sessionStorage.setItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer', JSON.stringify(this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer));
      }
      this.setCarHandoverTime(this.orderedCar.carHandover);
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    this.setUserData(this.order);
    if (this.orderedCar && !this.orderedCar.sold && this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
      this.setStateOfCarToSold(this.orderedCar);
    }
  }

  public captureScreen() {
    var data = document.getElementById('sellingContainer');
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
      pdf.save('selling.pdf'); // Generated PDF
    });
  }

  private setStateOfCarToSold(car:Car) {
    car.sold = true;
    this.httpService.updateCar(car).subscribe(data => {
      console.log(data);
      this.utilService.openSnackBar('Az autó eladott státuszba került!', 'Szuper :)');
    }, error => {
      this.utilService.openSnackBar('Sajnos nem sikerült az autót eladott státuszba helyezni!', 'Hiba :(');
    });
  }

  private setCarHandoverTime(dateString: any) {
    const carHandoverDate: Date = new Date(dateString);
    this.carHandoverTime['hour'] = carHandoverDate.getHours();
    this.carHandoverTime['minute'] = carHandoverDate.getMinutes();
  }

  private setUserData(order: Order) {
    if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
      this.sellerCompany = this.utilService.a2Company;
      this.sellerCompanyRepresentation = this.a2Representation;
      if (order.users != null) {
        this.buyerIndividual = order.users;
        console.log(this.buyerIndividual);
      } else if (order.company != null) {
        this.buyerCompany = order.company;
      }
    } else {
      this.buyerCompany = this.utilService.a2Company;
      this.buyerCompanyRepresentation = this.a2Representation;
      if (order != null && order.users != null) {
        this.sellerIndividual = order.users;
      } else if (order != null && order.company != null) {
        this.sellerCompany = order.company;
      } else if (this.pickedUser != null) {
        this.sellerIndividual = this.pickedUser;
      } else if (this.pickedCompany != null) {
        this.sellerCompany = this.pickedCompany;
      }
    }
  }

}
