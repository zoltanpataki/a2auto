import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SalesmanComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SalesmanComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

  public saveNewSalesman(form: any) {
    this.dialogRef.close(form.value);
  }
}
