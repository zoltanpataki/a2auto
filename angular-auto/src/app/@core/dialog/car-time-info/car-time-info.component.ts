import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../models/car";
import {UtilService} from "../../services/util.service";
import {Witness} from "../../models/witness";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Description} from "../../models/description";

@Component({
  selector: 'app-car-time-info',
  templateUrl: './car-time-info.component.html',
  styleUrls: ['./car-time-info.component.scss']
})
export class CarTimeInfoComponent implements OnInit {

  private carData: Car;
  public fields1 = {dueOfContract: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};
  private clickedCarIndex: number;
  private selectedCars: Car[];
  private witness1: Witness;
  private witness2: Witness;
  private listOfA2Representation = ['SOÓS GÁBOR', 'VINCZ ANTAL'];
  private pickedRepresentation: string;

  private remarkPartOpen: boolean = false;
  private remarkForm: FormGroup;
  private description: FormArray;
  private remarkList: Description[] = [];
  private sellOrBuy: string;

  constructor(private dialogRef: MatDialogRef<CarTimeInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private utilService: UtilService,
              private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.sellOrBuy = this.data.sellOrBuy;
    this.carData = this.data.car;
    if (this.data.order != null) {
      const sellOrBuyRemarkList = [];
      console.log(this.data.order.description);
      this.data.order.description.forEach(description => {
        if (description.type === this.sellOrBuy) {
          sellOrBuyRemarkList.push(description);
        }
      });
      this.remarkList = sellOrBuyRemarkList;
    }
    this.clickedCarIndex = this.data.clickedCarIndex;
    this.selectedCars = this.data.selectedCars;
    const carHandoverDate: Date = new Date(this.carData.carHandover);
    this.carHandoverTime['hour'] = carHandoverDate.getHours();
    this.carHandoverTime['minute'] = carHandoverDate.getMinutes();

    if (this.remarkList.length === 0) {
      this.remarkForm = this.formBuilder.group({
        description: this.formBuilder.array([this.createRemarkRow(null)])
      });
    } else {
      this.setRemarkForm();
    }
    this.initiateDatesWithToday();
  }

  private setRemarkForm() {
    this.remarkForm = this.formBuilder.group({
      description: this.formBuilder.array([]),
    });
    this.remarkList.forEach(remark => {
      this.addNewRemarkRow(remark);
    });
  }

  private addNewRemarkRow(remark: Description) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.push(this.createRemarkRow(remark));
  }

  private removeRemarkRow(index: number) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.removeAt(index);
  }

  private createRemarkRow(remark: Description) {
    if (remark == null) {
      return this.formBuilder.group({
        id: [null],
        description: [null],
        type: [null]
      });
    } else {
      return this.formBuilder.group({
        id: [remark.id],
        description: [remark.description],
        type: [remark.type]
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  private saveCarData(form: any) {
    const carHandover = new Date(this.carData.carHandover);
    if (this.carHandoverTime['hour'] != null && this.carHandoverTime['minute'] != null) {
      carHandover.setHours(this.carHandoverTime['hour'], this.carHandoverTime['minute'], 0, 0);
    } else if (this.carHandoverTime['hour'] != null && this.carHandoverTime['minute'] == null) {
      carHandover.setHours(this.carHandoverTime['hour'], 0, 0, 0);
    } else if (this.carHandoverTime['hour'] == null && this.carHandoverTime['minute'] != null) {
      carHandover.setHours(0, this.carHandoverTime['minute'], 0, 0);
    }
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
        const newDescription = new Description(description.id, description.description, this.sellOrBuy);
        this.remarkList.push(newDescription);
      }
    });
    this.closeWithData();
  }

  closeWithData() {
    const closingData = {};
    closingData['car'] = this.carData;
    closingData['witness1'] = this.witness1;
    closingData['witness2'] = this.witness2;
    closingData['representation'] = this.pickedRepresentation;
    closingData['remarkList'] = this.remarkList;

    this.dialogRef.close(closingData);
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
