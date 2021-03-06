import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Credit} from "../../models/credit";
import {Car} from "../../models/car";
import {CountInCarSupplement} from "../../models/countInCarSupplement";

@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss']
})
export class CreditDialogComponent implements OnInit {

  public credit: Credit;
  private creditAmount: number;
  private initialPayment : number;

  constructor(private dialogRef: MatDialogRef<CreditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.countCreditAmount(this.data.car, this.data.countInCarSupplement, this.data.downPayment, this.data.extra, this.data.credit);
    if (this.data.credit == null) {
      this.credit = new Credit(null,null, null, this.initialPayment, this.creditAmount, null, null);
    } else {
      this.credit = new Credit(this.data.credit.id, this.data.credit.bank, this.data.credit.creditType, this.initialPayment, this.creditAmount, this.data.credit.creditLength, this.data.credit.repayment);
    }
  }

  close() {
    this.dialogRef.close();
  }

  closeWithData() {
    this.dialogRef.close(this.credit);
  }

  public saveCredit(form: any) {
    console.log(form);
    console.log(form.value);
    console.log(form.value.initialPayment);
    this.credit = new Credit(this.credit.id, form.value.bank, form.value.creditType, form.value.initialPayment, form.value.creditAmount, form.value.creditLength, form.value.repayment);
    this.closeWithData()
  }

  private countCreditAmount(car: Car, countInCarSupplement: CountInCarSupplement, downPayment: number, extra: number, credit: Credit) {
    const carPrice = car.purchasingPrice ? car.purchasingPrice : 0;
    const countInPrice = countInCarSupplement && countInCarSupplement.countInPrice ? countInCarSupplement.countInPrice : 0;
    const downPaymentAmount = downPayment ? downPayment : 0;
    const extraAmount = extra ? extra : 0;

    if (credit != null && credit.initialPayment == null || credit == null) {
      this.initialPayment = (countInPrice + downPaymentAmount + extraAmount) === 0 ? null : countInPrice + downPaymentAmount + extraAmount;
    } else {
      this.initialPayment = credit.initialPayment;
    }

    if (credit != null && credit.creditAmount == null || credit == null) {
      this.creditAmount = (carPrice - this.initialPayment) === 0 ? null : carPrice - this.initialPayment;
    } else {
      this.creditAmount = credit.creditAmount;
    }
  }

}
