import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company} from "../models/company";
import {Salesmen} from "../models/salesmen";
import {Witness} from "../models/witness";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public validPlateNumber = true;
  public emptySearchField = false;
  public carUpdate = false;
  public a2Company: Company;
  public salesmen: Salesmen[];
  public witnesses: Witness[];

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
  }

  public createBlankWitnessToUtilServiceWitnessList(): Witness {
    return new Witness(null, null, null, 'Egyik sem');
  }
}
