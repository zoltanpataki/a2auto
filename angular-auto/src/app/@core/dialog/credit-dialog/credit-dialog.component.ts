import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Credit} from "../../models/credit";
import {Car} from "../../models/car";
import {CountInCarSupplement} from "../../models/countInCarSupplement";
import {Order} from "../../models/order";

@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss']
})
export class CreditDialogComponent implements OnInit {

  private credit: Credit;
  private creditAmount: number;

  constructor(private dialogRef: MatDialogRef<CreditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    if (this.data.credit == null) {
      this.countCreditAmount(this.data.car, this.data.countInCarSupplement, this.data.downPayment, this.data.extra);
      this.credit = new Credit(null, null, null, this.creditAmount, null, null);
    } else {
      console.log(this.data);
      this.credit = new Credit(this.data.credit.bank, this.data.credit.creditType, this.data.credit.initialPayment, this.data.credit.creditAmount, this.data.credit.creditLength, this.data.credit.repayment);
    }
  }

  close() {
    this.dialogRef.close();
  }

  closeWithData() {
    this.dialogRef.close(this.credit);
  }

  private saveCredit(form: any) {
    this.credit = new Credit(form.value.bank, form.value.creditType, form.value.initialPayment, form.value.creditAmount, form.value.creditLength, form.value.repayment);
    this.closeWithData()
  }

  private countCreditAmount(car: Car, countInCarSupplement: CountInCarSupplement, downPayment: number, extra: number) {
    const countInPrice = countInCarSupplement && countInCarSupplement.countInPrice ? countInCarSupplement.countInPrice : 0;
    const downPaymentAmount = downPayment ? downPayment : 0;
    const extraAmount = extra ? extra : 0;
    this.creditAmount = (car.price) - (countInPrice + downPaymentAmount + extraAmount);
  }

}
