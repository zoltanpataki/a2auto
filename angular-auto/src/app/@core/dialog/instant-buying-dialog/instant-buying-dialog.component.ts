import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../models/car";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Description} from "../../models/description";
import {Witness} from "../../models/witness";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-instant-buying-dialog',
  templateUrl: './instant-buying-dialog.component.html',
  styleUrls: ['./instant-buying-dialog.component.scss']
})
export class InstantBuyingDialogComponent implements OnInit {

  private closingData: {};
  private carData : Car;
  private remarkPartOpen: boolean = false;
  private remarkForm: FormGroup;
  private description: FormArray;
  private remarkList: Description[] = [];
  public carHandoverTime = {};
  public fields1 = {dueOfContract: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja'};
  public keepOriginalOrder = (a, b) => a.key;
  private witness1: Witness;
  private witness2: Witness;
  private listOfA2Representation = ['SOÓS GÁBOR', 'VINCZ ANTAL'];
  private pickedRepresentation: string;

  constructor(private dialogRef: MatDialogRef<InstantBuyingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private utilService: UtilService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.carData = this.data;
    this.setRemarkForm();
    this.initiateDatesWithToday();
  }

  private setRemarkForm() {
    this.remarkForm = this.formBuilder.group({
      description: this.formBuilder.array([]),
    });
    if (this.remarkList.length > 0) {
      this.remarkList.forEach(remark => {
        this.addNewRemarkRow(remark.description);
      });
    } else {
      this.addNewRemarkRow(null);
    }
  }

  private addNewRemarkRow(description: string) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.push(this.createRemarkRow(description));
  }

  private removeRemarkRow(index: number) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.removeAt(index);
  }

  private createRemarkRow(remark: string) {
    if (remark == null) {
      return this.formBuilder.group({
        description: [null],
      });
    } else {
      return this.formBuilder.group({
        description: [remark],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  closeWithData() {
    this.dialogRef.close(this.closingData);
  }

  private saveCarData(form: any) {
    const carHandover = new Date(this.carData.carHandover);
    carHandover.setHours(this.carHandoverTime['hour']);
    carHandover.setMinutes(this.carHandoverTime['minute']);
    this.carData.carHandover = carHandover;
    this.witness1 = form.value.witness1.name === 'Egyik sem' ? null : form.value.witness1;
    this.witness2 = form.value.witness2.name === 'Egyik sem' ? null : form.value.witness2;
    this.pickedRepresentation = form.value.representation;
    this.remarkPartOpen = true;
  }

  private saveRemark(form: FormGroup) {
    this.remarkPartOpen = false;
    this.remarkList = [];
    form.value.description.forEach(description => {
      if (description.description != null) {
        const newDescription = new Description(null, description.description, 'buy');
        this.remarkList.push(newDescription);
      }
    });
    this.closeWithData();
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private setDatesToNull() {
    if (new Date(this.carData.dateOfLeaving).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dateOfLeaving = null;
    }
    if (new Date(this.carData.dateOfContract).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dateOfContract = null;
    }
    if (new Date(this.carData.dueOfContract).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dueOfContract = null;
    }
    if (new Date(this.carData.documentsHandover).getFullYear() === new Date(0).getFullYear()) {
      this.carData.documentsHandover = null;
    }
    if (new Date(this.carData.carHandover).getFullYear() === new Date(0).getFullYear()) {
      this.carData.carHandover = null;
    }
  }

  private initiateDatesWithToday() {
    this.setDatesToNull();
    if (this.carData.dateOfContract == null && this.carData.dueOfContract == null) {
      this.carData.carHandover = this.carData.carHandover == null ? new Date() : this.carData.carHandover;
      this.carData.dueOfContract = new Date();
      this.carData.dateOfArrival = new Date();
      this.carData.dateOfLeaving = new Date();
      this.carData.documentsHandover = new Date();
      this.carData.dateOfContract = new Date();
    }
  }

  private changeAllDateFieldIfEmptyElseOnlyThisOne(dateString: string, item: string) {
    const date = new Date(dateString);
    if (this.carData.dateOfContract != null && this.carData.dueOfContract != null) {
      this.carData[item] = new Date(date);
    } else {
      this.carData.carHandover = new Date(date);
      this.carData.dueOfContract = new Date(date);
      this.carData.dateOfArrival = new Date(date);
      this.carData.dateOfLeaving = new Date(date);
      this.carData.documentsHandover = new Date(date);
      this.carData.dateOfContract = new Date(date);
    }
  }

}
