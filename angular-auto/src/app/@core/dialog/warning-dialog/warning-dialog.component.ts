import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public carId) { }

  ngOnInit() {
  }

  save() {
    console.log("save");
  }

  close() {
    this.dialogRef.close();
  }

  closeWithData() {
    this.dialogRef.close(this.carId);
  }

}
