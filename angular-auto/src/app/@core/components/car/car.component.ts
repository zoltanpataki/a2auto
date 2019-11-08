import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../models/car";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  @Input('carData')
  public carData: Car;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public countInCar: EventEmitter<any> = new EventEmitter<any>();
  public fieldsOneFirstHalf = {name: 'Auto neve', type: 'Auto tipusa', color: 'Szin'};
  public fieldsOneSecondHalf = {specification: 'Felszereltseg', bodyNumber: 'Alvazszam', engineNumber: 'Motorszam', carRegistry: 'Forgalmi engedely szama'};
  public fieldTwo = {vintage: 'Evjarat', mileage: 'Futott km', price: 'Ar', cost: 'Koltseg', inheritanceTax: 'Atirasi illetek', downPayment: 'Foglalo', payedAmount: 'Befizetett osszeg', kwh: 'Teljesitmeny'};
  public fieldFour = {dateOfArrival: 'Vetel datuma', dateOfLeaving: 'Eladas datuma', documentsHandover: 'Dokumentumok atadasanak idopontja', dateOfContract : 'Szerzodes szerinti teljesites idopontja', dueOfContract: 'Szerzodes lejarata'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};

  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public carOrTruck = ['SZEMÉLYGÉPJÁRMŰ', 'TEHERGÉPJÁRMŰ'];

  constructor(private httpService: HttpService,
              private utilService: UtilService,) { }

  public ngOnInit() {
    if (this.carData == null) {
      this.carData = new Car(null,null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    } else {
      const carHandoverDate: Date = new Date(this.carData.carHandover);
      this.carHandoverTime['hour'] = carHandoverDate.getHours();
      this.carHandoverTime['minute'] = carHandoverDate.getMinutes();
    }
  }

  public saveCar(form: any) {
    if (form.value.plateNumber.length < 6) {
      this.utilService.validPlateNumber = false;
    } else if (this.utilService.carUpdate){
      this.setValidPlateNumber();
      this.httpService.updateCar(this.createNewCarObject(form)).subscribe(data => {
          console.log(data);
        }
      )} else {
      this.setValidPlateNumber();
      this.httpService.saveCar(this.createNewCarObject(form)).subscribe(data => {
          const newCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data. bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), Boolean(JSON.parse(data.sold)), data.carOrTruck, data.salesman);
          this.orderProgress.emit('saved');
          this.countInCar.emit(newCar);
        }, error => {
          this.utilService.openSnackBar('Az adatbáziskapcsolat váratlanul megszakadt!', 'Hiba :(');
        }
      )}
  }

  private setValidPlateNumber() {
    this.utilService.validPlateNumber = true;
  }

  public createNewCarObject(form: any): Car {
    if (this.utilService.carUpdate) {
      return  new Car(this.carData.id, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman);
    } else {
      return  new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman);

    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

}
