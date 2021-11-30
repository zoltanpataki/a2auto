import { Component, OnInit, OnDestroy } from '@angular/core';
import {Order} from "../../@core/models/order";
import {Car} from "../../@core/models/car";
import {Users} from "../../@core/models/users";
import {Company} from "../../@core/models/company";

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {HttpService} from "../../@core/services/http.service";
import {Router} from "@angular/router";
import {UtilService} from "../../@core/services/util.service";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectActualOrder} from "../../@store/selectors/order.selectors";
import {IAppState} from "../../@store/state/app.state";
import {selectPickedCar} from "../../@store/selectors/car.selectors";
import {selectIsBlankPage, selectIsTrophyClicked} from "../../@store/selectors/util.selectors";
import {StoreIsBlankPage, StoreIsTrophyClicked} from "../../@store/actions/util.actions";
import {UpdateOrder} from "../../@store/actions/order.actions";
import {StorePickedCar} from "../../@store/actions/car.actions";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  public orderedCar$: Observable<Car>;
  public orderedCar: Car;
  public order$: Observable<Order>;
  public order: Order;
  public today: Date = new Date();

  public userSearchResult: Users[];
  public companySearchResult: Company[];
  public indexOfPickedUser: number;
  public indexOfPickedCompany: number;
  public pickedUser: Users;
  public pickedCompany: Company;
  public remainingPrice: number;
  public isBlankPage$: Observable<boolean>;
  public isBlankPage: boolean;
  public extraAmountChargedForTheUser: number;
  public countInCar: Car;
  public isTrophyClicked$: Observable<boolean>;
  public isTrophyClicked: boolean;

  public subscriptionOrderedCar$: Subscription;
  public subscriptionOrder$: Subscription;
  public subscriptionIsBlankPage$: Subscription;
  public subscriptionIsTrophyClicked$: Subscription;
  public subscriptions: Subscription[] = [];


  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private router: Router,
              private _store: Store<IAppState>,) { }


  ngOnInit(): void {

    this.getDataFromSessionStorageAfterRefresh();

    //ngrx selectors

    this.order$ = this._store.pipe(select(selectActualOrder));
    this.orderedCar$ = this._store.pipe(select(selectPickedCar));
    this.isBlankPage$ = this._store.pipe(select(selectIsBlankPage));
    this.isTrophyClicked$ = this._store.pipe(select(selectIsTrophyClicked));

    this.subscriptionOrder$ = this.order$.subscribe(order => {
      this.order = order;
      console.log(this.order);
      if (null != this.order) {
        sessionStorage.setItem('order', JSON.stringify(this.order));
      }
    });

    this.subscriptionOrderedCar$ = this.orderedCar$.subscribe(car => {
      this.orderedCar = car;
      console.log(this.orderedCar);
      if (null != this.orderedCar) {
        sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      }
    });

    this.subscriptionIsBlankPage$ = this.isBlankPage$.subscribe(isBlankPage => {
      this.isBlankPage = isBlankPage;
      if (null != this.isBlankPage) {
        sessionStorage.setItem('isBlankPage', JSON.stringify(this.isBlankPage));
      }
    });

    this.subscriptionIsTrophyClicked$ = this.isTrophyClicked$.subscribe(isTrophyClicked => {
      this.isTrophyClicked = isTrophyClicked;
      if (null != this.isTrophyClicked) {
        sessionStorage.setItem('isTrophyClicked', JSON.stringify(this.isTrophyClicked));
      }
    });

    this.subscriptions.push(this.subscriptionOrder$);
    this.subscriptions.push(this.subscriptionOrderedCar$);
    this.subscriptions.push(this.subscriptionIsBlankPage$);
    this.subscriptions.push(this.subscriptionIsTrophyClicked$);

    // if (sessionStorage.getItem('order') != null) {
    //   this.order = JSON.parse(sessionStorage.getItem('order'));
    // }
    // if (sessionStorage.getItem('orderedCar') != null) {
    //   this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    // }
    // if (sessionStorage.getItem('blankPage') != null) {
    //   this.isBlankPage = JSON.parse(sessionStorage.getItem('blankPage'));
    // }
    // if (sessionStorage.getItem('trophyClick') != null) {
    //   this.isTrophyClicked = JSON.parse(sessionStorage.getItem('trophyClick'));
    // }
    if (history.state.data) {
      // this.order = history.state.data.order;
      // this.orderedCar = history.state.data.orderedCar;
      this.userSearchResult = history.state.data.userSearchResult;
      this.companySearchResult = history.state.data.companySearchResult;
      this.indexOfPickedUser = history.state.data.indexOfPickedUser;
      this.indexOfPickedCompany = history.state.data.indexOfPickedCompany;
      this.pickedUser = history.state.data.pickedUser;
      this.pickedCompany = history.state.data.pickedCompany;
      if (null != history.state.data.trophyClick) {
        this.isTrophyClicked = history.state.data.trophyClick;
        sessionStorage.setItem('trophyClick', JSON.stringify(this.isTrophyClicked));
      }
      sessionStorage.setItem('clickedCarIndex', history.state.data.clickedCarIndex);
      // sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      // sessionStorage.setItem('order', JSON.stringify(this.order));
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
      this.isBlankPage = history.state.blankData.blankPage;
      sessionStorage.setItem('blankPage', this.isBlankPage.toString());
    } else {
      this.order = JSON.parse(sessionStorage.getItem('order'));
      this.orderedCar = JSON.parse(sessionStorage.getItem('orderedCar'));
    }
    if (this.order && this.orderedCar) {
      this.remainingPrice = this.countRemainingPrice(this.order, this.orderedCar);
    }
    if (this.orderedCar && !this.orderedCar.sold && !this.isBlankPage) {
      this.setStateOfCarToSold(this.orderedCar);
    }
    if (this.order && this.order.countInCarId) {
      this.httpService.getSingleCarById(this.order.countInCarId.toString()).subscribe(data => {
        this.countInCar = data;
      });
    }
  }

  private getDataFromSessionStorageAfterRefresh() {
    //Set initial value for isTrophyClicked and isBlankPage
    if (sessionStorage.getItem('isTrophyClicked')) {
      this._store.dispatch(new StoreIsTrophyClicked(JSON.parse(sessionStorage.getItem('isTrophyClicked'))));
    } else {
      this._store.dispatch(new StoreIsTrophyClicked(false));
    }

    if (sessionStorage.getItem('isBlankPage')) {
      this._store.dispatch(new StoreIsBlankPage(JSON.parse(sessionStorage.getItem('isBlankPage'))));
    } else {
      this._store.dispatch(new StoreIsBlankPage(false));
    }

    if (sessionStorage.getItem('order')) {
      this._store.dispatch(new UpdateOrder(JSON.parse(sessionStorage.getItem('order'))));
    }

    if (sessionStorage.getItem('orderedCar')) {
      this._store.dispatch(new StorePickedCar(JSON.parse(sessionStorage.getItem('orderedCar'))));
    }
  }

  private countRemainingPrice(order: Order, car: Car): number {
    const inheritance = order.inheritanceTax ? order.inheritanceTax : 0;
    const downPayment = order.downPayment ? order.downPayment : 0;
    const carPrice = car.purchasingPrice;
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
    const jsPDF = require('jspdf');
    var data = document.getElementById('orderContainer');
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
      pdf.save('order.pdf'); // Generated PDF
    });
  }

  public navigateBack() {
    if (this.isTrophyClicked) {
      this.utilService.removeItemsFromSessionStorage();
      this.router.navigate(['/filter']);
    } else {
      this.router.navigate(['/filter']);
    }
  }

  private setStateOfCarToSold(car:Car) {
    car.sold = true;
    car.dateOfLeaving =  new Date();
    this.httpService.updateCar(car).subscribe(data => {
      console.log(data);
      this.orderedCar = data;
      if (sessionStorage.getItem('clickedCarIndex') != null
        && sessionStorage.getItem('selectedCars') != null) {
        const clickedCarIndex = JSON.parse(sessionStorage.getItem('clickedCarIndex'));
        const selectedCars = JSON.parse(sessionStorage.getItem('selectedCars'));
        selectedCars[clickedCarIndex] = data;
        sessionStorage.setItem('selectedCars', JSON.stringify(selectedCars));
      }
      sessionStorage.setItem('orderedCar', JSON.stringify(this.orderedCar));
      this.utilService.openSnackBar('Az autó eladott státuszba került!', 'Szuper :)');
    }, error => {
      this.utilService.openSnackBar('Sajnos nem sikerült az autót eladott státuszba helyezni!', 'Hiba :(');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
