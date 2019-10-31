import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Credit} from "../../models/credit";

@Component({
  selector: 'app-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss']
})
export class CreditDialogComponent implements OnInit {

  private credit: Credit;
  public keepOriginalOrder = (a, b) => a.key;
  public fieldsString = {bank: 'Bank', creditType: 'Hitel típus'};
  public fieldsNumber = {initialPayment: 'Kezdő befizetés', creditAmount: 'Hitel összege', creditLength: 'Futamidő', repayment: 'Törlesztőrészlet/hó.'};

  constructor(private dialogRef: MatDialogRef<CreditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  closeWithData() {
    this.dialogRef.close(this.credit);
  }

  private saveCredit(form: any) {
    this.credit = new Credit(form.value.bank, form.value.creditType, form.value.initialPayment, form.value.creditAmount, form.value.creditLength, form.value.repayment);
    this.closeWithData()
  }

}
