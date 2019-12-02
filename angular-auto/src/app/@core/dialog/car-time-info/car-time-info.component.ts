import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../models/car";
import {UtilService} from "../../services/util.service";
import {Witness} from "../../models/witness";

@Component({
  selector: 'app-car-time-info',
  templateUrl: './car-time-info.component.html',
  styleUrls: ['./car-time-info.component.scss']
})
export class CarTimeInfoComponent implements OnInit {

  private carData: Car;
  public fields1 = {dateOfLeaving: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};
  private clickedCarIndex: number;
  private selectedCars: Car[];
  private witness1: Witness;
  private witness2: Witness;

  constructor(private dialogRef: MatDialogRef<CarTimeInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private utilService: UtilService,) {}

  ngOnInit() {
    this.carData = this.data.car;
    this.clickedCarIndex = this.data.clickedCarIndex;
    this.selectedCars = this.data.selectedCars;
    const carHandoverDate: Date = new Date(this.carData.carHandover);
    this.carHandoverTime['hour'] = carHandoverDate.getHours();
    this.carHandoverTime['minute'] = carHandoverDate.getMinutes();
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  private saveCarData(form: any) {
    const carHandover = new Date(this.carData.carHandover);
    carHandover.setHours(this.carHandoverTime['hour']);
    carHandover.setMinutes(this.carHandoverTime['minute']);
    this.carData.carHandover = carHandover;
    this.witness1 = form.value.witness1;
    this.witness2 = form.value.witness2;
    this.closeWithData();
  }

  closeWithData() {
    const closingData = {};
    closingData['car'] = this.carData;
    closingData['witness1'] = this.witness1;
    closingData['witness2'] = this.witness2;

    this.dialogRef.close(closingData);
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
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
