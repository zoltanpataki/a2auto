import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {Car} from "../../@core/models/car";
import {Order} from "../../@core/models/order";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";
import {UtilService} from "../../@core/services/util.service";
import {Witness} from "../../@core/models/witness";
import {HttpService} from "../../@core/services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss']
})
export class SellingPageComponent implements OnInit{

  public orderedCar: Car;
  public order: Order;
  public today: Date;
  public userSearchResult: Users[];
  public companySearchResult: Company[];
  public indexOfPickedUser: number;
  public indexOfPickedCompany: number;
  public pickedUser: Users;
  public pickedCompany: Company;
  public carHandoverTime = {};
  public switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: boolean;
  public sellerCompany: Company;
  public buyerCompany: Company;
  public sellerIndividual: Users;
  public buyerIndividual: Users;
  public witness1: Witness;
  public witness2: Witness;
  public a2Representation: string;
  public sellerCompanyRepresentation: string;
  public buyerCompanyRepresentation: string;
  public remarkList;
  public typeOfBuying;
  private singles = ['egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
  private doublesWithZero = ['tíz', 'húsz'];
  private doubles = ['tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
  private hundred = 'száz';
  private thousand = 'ezer';
  private million = 'millió';
  private hyphen = '-';
  public priceInString = '';
  public nameOfBuyer: string;
  public url: string;

  constructor(private utilService: UtilService,
              private httpService: HttpService,
              private cdRef:ChangeDetectorRef,
              public router: Router) { }

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
      this.nameOfBuyer = history.state.data.nameOfBuyer;
      this.url = history.state.data.url;

      if (history.state.data.url != null) {
        sessionStorage.setItem('url', history.state.data.url);
      }
      if (history.state.data.clickedCarIndex != null) {
        sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      }
      if (this.orderedCar != null) {
        sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      }
      if (this.orderedCar != null) {
        sessionStorage.setItem('newCar', JSON.stringify(this.orderedCar));
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
      if (this.nameOfBuyer != null) {
        sessionStorage.setItem('nameOfBuyer', this.nameOfBuyer);
      }
      if (this.typeOfBuying != null) {
        sessionStorage.setItem('typeOfBuying', this.typeOfBuying);
      }
      if (this.witness1 != null) {
        sessionStorage.setItem('witness1', JSON.stringify(this.witness1));
      }
      if (this.witness2 != null) {
        sessionStorage.setItem('witness2', JSON.stringify(this.witness2));
      }
      if (this.a2Representation != null) {
        sessionStorage.setItem('a2Representation', this.a2Representation);
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
      if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer != null) {
        sessionStorage.setItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer', JSON.stringify(this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer));
      }
      this.setCarHandoverTime(this.orderedCar.carHandover);
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    this.setUserData(this.order);

    if (this.orderedCar && this.orderedCar.price) {
      this.turnPriceIntoText(this.orderedCar.price);
    }
    this.cdRef.detectChanges();
  }

  private turnPriceIntoText(price: number) {
    const priceInString = price.toString();
    let priceInText = '';
    if (priceInString.length === 1) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]);
    } else if (priceInString.length === 2) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString);
    } else if (priceInString.length === 3) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString);
    } else if (priceInString.length === 4) {
      priceInText = priceInText + this.convertAllFourDigitsIntoText(priceInString);
    } else if (priceInString.length === 5) {
      priceInText = priceInText + this.convertAllFiveDigitsIntoText(priceInString);
    } else if (priceInString.length === 6) {
      priceInText = priceInText + this.convertAllSixDigitsIntoText(priceInString);
    } else if (priceInString.length === 7) {
      priceInText = priceInText + this.convertAllSevenDigitsIntoText(priceInString);
    } else if (priceInString.length === 8) {
      priceInText = priceInText + this.convertAllEightDigitsIntoText(priceInString);
    } else if (priceInString.length === 9) {
      priceInText = priceInText + this.convertAllNineDigitsIntoText(priceInString);
    }
    priceInText = priceInText.charAt(0).toUpperCase() + priceInText.slice(1);
    console.log(priceInText);
    this.priceInString = priceInText;
  }

  private convertSingleIntoText(digitInText: string): string {
    const digit = Number(digitInText);
    return this.singles[digit - 1];
  }

  private convertDoubleIntoText(digitInText: string): string {
    const digit = Number(digitInText);
    return this.doubles[digit - 1];
  }

  private convertAllDoublesIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[0]) === 1 && Number(priceInString[1]) === 0) {
      priceInText = priceInText + this.doublesWithZero[0];
    } else if (Number(priceInString[0]) === 2 && Number(priceInString[1]) === 0) {
      priceInText = priceInText + this.doublesWithZero[1];
    } else if (Number(priceInString[1]) === 0) {
      priceInText = priceInText + this.convertDoubleIntoText(priceInString[0]);
    } else {
      priceInText = priceInText + this.convertDoubleIntoText(priceInString[0]) + this.convertSingleIntoText(priceInString[1]);
    }
    return priceInText;
  }

  private convertAllThreeDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0) {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.hundred : priceInText + this.convertSingleIntoText(priceInString[0]) + this.hundred;
    } else if (Number(priceInString[1]) === 0) {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.hundred + this.convertSingleIntoText(priceInString[2]) : priceInText + this.convertSingleIntoText(priceInString[0]) + this.hundred + this.convertSingleIntoText(priceInString[2]);
    } else {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.hundred + this.convertAllDoublesIntoText(priceInString.slice(1)) : priceInText + this.convertSingleIntoText(priceInString[0]) + this.hundred + this.convertAllDoublesIntoText(priceInString.slice(1));
    }
    return priceInText;
  }

  private convertAllFourDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0) {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.thousand : priceInText + this.convertSingleIntoText(priceInString[0]) + this.thousand;
    } else if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0) {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.thousand + this.convertSingleIntoText(priceInString[3]) : priceInText + this.convertSingleIntoText(priceInString[0]) + this.thousand + this.hyphen + this.convertSingleIntoText(priceInString[3]);
    } else if (Number(priceInString[1]) === 0) {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.thousand + this.convertAllDoublesIntoText(priceInString.slice(2)) : priceInText + this.convertSingleIntoText(priceInString[0]) + this.thousand + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(2));
    } else {
      priceInText = Number(priceInString[0]) === 1 ? priceInText + this.thousand + this.convertAllThreeDigitsIntoText(priceInString.slice(1)) : priceInText + this.convertSingleIntoText(priceInString[0]) + this.thousand + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(1));
    }
    return priceInText;
  }

  private convertAllFiveDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.thousand;
    } else if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.thousand + this.hyphen + this.convertSingleIntoText(priceInString[4]);
    } else if (Number(priceInString[2]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.thousand + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(3));
    } else {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.thousand + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(2));
    }
    return priceInText;
  }

  private convertAllSixDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.thousand;
    } else if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.thousand + this.hyphen + this.convertSingleIntoText(priceInString[5]);
    } else if (Number(priceInString[3]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.thousand + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(4));
    } else {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.thousand + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(3));
    }
    return priceInText;
  }

  private convertAllSevenDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million;
    } else if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.hyphen + this.convertSingleIntoText(priceInString[6]);
    } else if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(5));
    } else if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(4));
    } else if (Number(priceInString[1]) === 0 && Number(priceInString[2]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.convertAllFourDigitsIntoText(priceInString.slice(3));
    } else if (Number(priceInString[1]) === 0) {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.convertAllFiveDigitsIntoText(priceInString.slice(2));
    } else {
      priceInText = priceInText + this.convertSingleIntoText(priceInString[0]) + this.million + this.convertAllSixDigitsIntoText(priceInString.slice(1));
    }
    return priceInText;
  }

  private convertAllEightDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0 && Number(priceInString[7]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million;
    } else if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.hyphen + this.convertSingleIntoText(priceInString[7]);
    } else if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(6));
    } else if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(5));
    } else if (Number(priceInString[2]) === 0 && Number(priceInString[3]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.convertAllFourDigitsIntoText(priceInString.slice(4));
    } else if (Number(priceInString[2]) === 0) {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.convertAllFiveDigitsIntoText(priceInString.slice(3));
    } else {
      priceInText = priceInText + this.convertAllDoublesIntoText(priceInString.substring(0, 2)) + this.million + this.convertAllSixDigitsIntoText(priceInString.slice(2));
    }
    return priceInText;
  }

  private convertAllNineDigitsIntoText(priceInString: string): string {
    let priceInText = '';
    if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0 && Number(priceInString[7]) === 0 && Number(priceInString[8]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million;
    } else if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0 && Number(priceInString[7]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.hyphen + this.convertSingleIntoText(priceInString[8]);
    } else if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0 && Number(priceInString[6]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.hyphen + this.convertAllDoublesIntoText(priceInString.slice(7));
    } else if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0 && Number(priceInString[5]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.hyphen + this.convertAllThreeDigitsIntoText(priceInString.slice(6));
    } else if (Number(priceInString[3]) === 0 && Number(priceInString[4]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.convertAllFourDigitsIntoText(priceInString.slice(5));
    } else if (Number(priceInString[3]) === 0) {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.convertAllFiveDigitsIntoText(priceInString.slice(4));
    } else {
      priceInText = priceInText + this.convertAllThreeDigitsIntoText(priceInString.substring(0, 3)) + this.million + this.convertAllSixDigitsIntoText(priceInString.slice(3));
    }
    return priceInText;
  }

  public captureScreen() {
    const jsPDF = require('jspdf');
    var data = document.getElementById('sellingContainer');
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
      pdf.save('selling.pdf'); // Generated PDF
    });
  }

  private setCarHandoverTime(dateString: any) {
    const carHandoverDate: Date = new Date(dateString);
    if (null != dateString) {
      this.carHandoverTime['hour'] = carHandoverDate.getHours();
      this.carHandoverTime['minute'] = carHandoverDate.getMinutes();
    } else {
      if (carHandoverDate.getHours() === 0 ) {
        this.carHandoverTime['hour'] = null;
      }
      if (carHandoverDate.getMinutes() === 0 ) {
        this.carHandoverTime['minute'] = null;
      }
    }
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
        this.buyerCompanyRepresentation = order.company.representation;
      }
    } else {
      this.buyerCompany = this.utilService.a2Company;
      this.buyerCompanyRepresentation = this.a2Representation;
      if (order != null && order.users != null) {
        this.sellerIndividual = order.users;
      } else if (order != null && order.company != null) {
        this.sellerCompany = order.company;
        this.sellerCompanyRepresentation = order.company.representation;
      } else if (this.pickedUser != null) {
        this.sellerIndividual = this.pickedUser;
      } else if (this.pickedCompany != null) {
        this.sellerCompany = this.pickedCompany;
        this.sellerCompanyRepresentation = this.pickedCompany.representation;
      }
    }
  }

  public navigateBack() {
    if (this.url == null) {
      this.router.navigate(['/filter']);
    } else {
      this.router.navigate([this.url]);
    }
  }

}
