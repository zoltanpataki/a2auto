import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public carData) { }

  ngOnInit() {
  }

  save() {
    console.log("save");
  }

  close() {
    this.dialogRef.close();
  }

  private saveUpdatedCar(updatedCar: Event) {
    this.dialogRef.close(updatedCar);
  }

}
