import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-witness-dialog',
  templateUrl: './witness-dialog.component.html',
  styleUrls: ['./witness-dialog.component.scss']
})
export class WitnessDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WitnessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

  public saveNewWitness(form: any) {
    this.dialogRef.close(form.value);
  }
}
