import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../services/util.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              private utilService: UtilService,
              @Inject(MAT_DIALOG_DATA) public carData) { }

  ngOnInit() {
    console.log(this.carData);
  }

  save() {
    console.log("save");
  }

  close() {
    this.dialogRef.close();
  }

  private closeDialog(event: any) {
    console.log(event);
    if (event === 'close') {
      this.dialogRef.close();
    }
  }

  private saveUpdatedCar(updatedCar: Event) {
    this.dialogRef.close(updatedCar);
  }

}
