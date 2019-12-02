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
}
