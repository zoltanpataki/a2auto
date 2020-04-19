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
  }

  save() {
    console.log("save");
  }

  close() {
    this.dialogRef.close();
  }

  public closeDialog(event: any) {
    console.log(event);
    if (event === 'close') {
      this.dialogRef.close();
    }
  }

  public saveUpdatedCar(updatedCar: Event) {
    this.dialogRef.close(updatedCar);
  }

}
