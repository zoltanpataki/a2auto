import { Component, OnInit } from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {Witness} from "../../models/witness";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-witness-picker-dialog',
  templateUrl: './witness-picker-dialog.component.html',
  styleUrls: ['./witness-picker-dialog.component.scss']
})
export class WitnessPickerDialogComponent implements OnInit {

  private witness1: Witness;
  private witness2: Witness;
  public warrantTypes = ['MAGÁNSZEMÉLY', 'CÉG'];
  public warrantType: string;
  public missingWarrantType: boolean = false;

  constructor(private dialogRef: MatDialogRef<WarningDialogComponent>,
              public utilService: UtilService) { }

  ngOnInit() {
  }

  public saveWitnessPicker(form: any) {
    this.witness1 = form.value.witness1;
    this.witness2 = form.value.witness2;
    this.warrantType = form.value.warrantType;
    const closingData = {};
    closingData['witness1'] = this.witness1;
    closingData['witness2'] = this.witness2;
    closingData['warrantType'] = this.warrantType;
    this.missingWarrantType = this.warrantType.length == 0;
    if (!this.missingWarrantType) {
      this.closeWithData(closingData);
    }
  }

  close() {
    this.dialogRef.close();
  }

  closeWithData(closingData: any) {
    this.dialogRef.close(closingData);
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

}
