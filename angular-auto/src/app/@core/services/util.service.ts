import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company} from "../models/company";
import {ISalesmen, Salesmen} from "../models/salesmen";
import {IWitness, Witness} from "../models/witness";
import {Observable} from "rxjs";
import {ICar} from "../models/car";
import {InfoForInheritanceCalculation} from "../models/inheritanceTax";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public validPlateNumber = true;
  public emptySearchField = false;
  public carUpdate = false;
  public a2Company: Company;
  public salesmenObs: Observable<ISalesmen[]>;
  public witnessesObs: Observable<IWitness[]>;

  constructor(private _snackBar: MatSnackBar,) { }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public removeItemsFromSessionStorage() {
    sessionStorage.removeItem('clickedCarIndex');
    sessionStorage.removeItem('order');
    sessionStorage.removeItem('userSearchData');
    sessionStorage.removeItem('companySearchData');
    sessionStorage.removeItem('indexOfPickedUser');
    sessionStorage.removeItem('indexOfPickedCompany');
    sessionStorage.removeItem('pickedUser');
    sessionStorage.removeItem('pickedCompany');
    sessionStorage.removeItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready');
    sessionStorage.removeItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate');
    sessionStorage.removeItem('wantInheritanceTaxCalculation');
    sessionStorage.removeItem('thereIsCountInCar');
    sessionStorage.removeItem('downPayment');
    sessionStorage.removeItem('extra');
    sessionStorage.removeItem('descriptionsWithAmount');
    sessionStorage.removeItem('giftIndexList');
    sessionStorage.removeItem('selectedTypeOfBuying');
    sessionStorage.removeItem('salesman');
    sessionStorage.removeItem('countInCarSupplement');
    sessionStorage.removeItem('countInCar');
    sessionStorage.removeItem('inheritanceTax');
    sessionStorage.removeItem('orderedCar');
    sessionStorage.removeItem('descriptionList');
    sessionStorage.removeItem('insuranceOfferNumber');
    sessionStorage.removeItem('credit');
    sessionStorage.removeItem('a2representation');
    sessionStorage.removeItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer');
    sessionStorage.removeItem('warrantType');
    sessionStorage.removeItem('witness1');
    sessionStorage.removeItem('witness2');
    sessionStorage.removeItem('newUserDuringSell');
    sessionStorage.removeItem('newCompanyDuringSell');
    sessionStorage.removeItem('a2Representation');
    sessionStorage.removeItem('typeOfBuying');
    sessionStorage.removeItem('nameOfBuyer');
  }

  public createBlankWitnessToUtilServiceWitnessList(): Witness {
    return new Witness(null, null, null, 'Egyik sem');
  }

  public ignoreBlankWitnessOnSettingsPage(): Witness {
    return new Witness(null, null, null, 'NOT');
  }

  public gatherInfoForInheritanceCalculation(car: ICar): InfoForInheritanceCalculation {
    const carAge = (new Date()).getFullYear() - car.vintage;
    let stringKw = null;
    let stringAge = null;
    let stringCapacity = null;

    if (car.kwh < 41) {
      stringKw = 'S';
    } else if (car.kwh > 40 && car.kwh < 81) {
      stringKw = 'M';
    } else if (car.kwh > 80 && car.kwh < 121) {
      stringKw = 'L';
    } else if (car.kwh > 120) {
      stringKw = 'XL';
    }

    if (carAge < 4) {
      stringAge = 'young';
    } else if (carAge > 3 && carAge < 9) {
      stringAge = 'mediumAged';
    } else if (carAge > 8) {
      stringAge = 'old';
    }

    if (car.carOrTruck === 'SZEMÉLYGÉPJÁRMŰ' || car.carOrTruck == null) {
      if (car.capacity < 1401) {
        stringCapacity = 'smallCapacity';
      } else if (car.capacity > 1400 && car.capacity < 2001) {
        stringCapacity = 'mediumCapacity';
      } else if (car.capacity > 2000) {
        stringCapacity = 'largeCapacity';
      }
    } else {
      stringCapacity = 'largeCapacity';
    }

    return new InfoForInheritanceCalculation(stringKw, stringAge, stringCapacity);
  }

}
