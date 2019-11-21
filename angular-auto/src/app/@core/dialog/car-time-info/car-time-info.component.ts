import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../models/car";

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

  constructor(private dialogRef: MatDialogRef<CarTimeInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.carData = this.data.car;
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  private saveCarData(form: any) {
    console.log(form.value);
    console.log(this.carHandoverTime);

    this.closeWithData();
  }

  closeWithData() {
    this.dialogRef.close(this.carData);
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private changeAllDateFieldIfEmptyElseOnlyThisOne(dateString: string, item: string) {
    const date = new Date(dateString);
    console.log(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2));
    console.log(item);
    if (this.carData.carHandover != null && this.carData.dueOfContract != null) {
      this.carData[item] = date;
    } else {
      this.carData.carHandover = date;
      this.carData.dueOfContract = date;
      this.carData.dateOfArrival = date;
      this.carData.dateOfLeaving = date;
      this.carData.documentsHandover = date;
      this.carData.dateOfContract = date;
    }
  }

}
