import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../models/car";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";

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
  public fieldsOneFirstHalf = {type: 'Autó típusa', name: 'Modell', color: 'Szín'};
  public fieldsOneSecondHalf = {specification: 'Felszereltség', bodyNumber: 'Alvázszám', engineNumber: 'Motorszám', carRegistry: 'Forgalmi engedély száma'};
  public fieldTwo = {vintage: 'Évjárat', mileage: 'Futott km', price: 'Vételár', purchasingPrice: 'Beszerzési ár', cost: 'Költség', inheritanceTax: 'Átírási illeték', downPayment: 'Foglaló', payedAmount: 'Befizetett összeg', kwh: 'Teljesítmény'};
  public fieldFour = {dateOfArrival: 'Vétel dátuma', dateOfLeaving: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja', dueOfContract: 'Szerződés lejárata'};
  public fieldRelatedToWeight = {weight: 'Saját tömeg', maxWeightAllowed: 'Megengedett legnagyobb össztömeg'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};
  private emptyDate: any;
  private showInsuranceButton: boolean = false;

  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public carOrTruck = ['SZEMÉLYGÉPJÁRMŰ', 'TEHERGÉPJÁRMŰ'];

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private router: Router) { }

  public ngOnInit() {
    if (this.router.url === '/newCar') {
      this.showInsuranceButton = true;
    }
    if (this.carData == null) {
      this.carData = new Car(null, null,null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
          const newCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data. bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.purchasingPrice), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), Boolean(JSON.parse(data.sold)), data.carOrTruck, data.salesman, data.insuranceNumber, Number(data.weight), Number(data.maxWeightAllowed));
          if (newCar.motExpiry.getFullYear() === new Date(0).getFullYear()) {
            newCar.motExpiry = null;
          }
          if (newCar.dateOfArrival.getFullYear() === new Date(0).getFullYear()) {
            newCar.dateOfArrival = null;
          }
          if (newCar.dateOfLeaving.getFullYear() === new Date(0).getFullYear()) {
            newCar.dateOfLeaving = null;
          }
          if (newCar.dateOfContract.getFullYear() === new Date(0).getFullYear()) {
            newCar.dateOfContract = null;
          }
          if (newCar.dueOfContract.getFullYear() === new Date(0).getFullYear()) {
            newCar.dueOfContract = null;
          }
          if (newCar.documentsHandover.getFullYear() === new Date(0).getFullYear()) {
            newCar.documentsHandover = null;
          }
          if (newCar.carHandover.getFullYear() === new Date(0).getFullYear()) {
            newCar.carHandover = null;
          }
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
      return  new Car(this.carData.id, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed);
    } else {
      return  new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed);

    }
  }

  private navigateToInsurancePage(form: any) {
    const carForInsurance = new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed)
    this.httpService.saveCar(carForInsurance).subscribe(data => {
      console.log(data);
      this.router.navigate(['/insurance'], {state: {data: {
            insuredCar: carForInsurance,
          }}});
    });
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

}
