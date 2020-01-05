import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../models/car";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

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
  @Output()
  public updatedCar: EventEmitter<any> = new EventEmitter<any>();
  public fieldsOneFirstHalf = {type: 'Autó típusa', name: 'Modell', color: 'Szín'};
  public fieldsOneSecondHalf = {specification: 'Felszereltség', bodyNumber: 'Alvázszám', engineNumber: 'Motorszám', carRegistry: 'Forgalmi engedély száma'};
  public fieldTwo = {vintage: 'Évjárat', mileage: 'Futott km', price: 'Vételár', purchasingPrice: 'Beszerzési ár', cost: 'Költség', inheritanceTax: 'Átírási illeték', downPayment: 'Foglaló', payedAmount: 'Befizetett összeg', kwh: 'Teljesítmény'};
  public fieldFour = {dateOfArrival: 'Vétel dátuma', dateOfLeaving: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja', dueOfContract: 'Szerződés lejárata'};
  public fieldRelatedToWeight = {weight: 'Saját tömeg', maxWeightAllowed: 'Megengedett legnagyobb össztömeg'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};
  private showInsuranceButton: boolean = false;

  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public fuelTypes = ['BENZIN', 'DÍZEL', 'GÁZ', 'HIBRID', 'ELEKTROMOS'];
  public carOrTruck = ['SZEMÉLYGÉPJÁRMŰ', 'TEHERGÉPJÁRMŰ'];

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  public ngOnInit() {
    if (sessionStorage.getItem('newCar') != null) {
      this.carData = JSON.parse(sessionStorage.getItem('newCar'));
    }
    if (this.router.url === '/newCar') {
      this.showInsuranceButton = true;
    }
    if (this.carData == null) {
      this.carData = new Car(null, null,null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
          this.utilService.openSnackBar('Az autó adatai sikeresen frissültek!', 'Szuper :)');
          const updatedCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data. bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.purchasingPrice), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), Boolean(JSON.parse(data.sold)), data.carOrTruck, data.salesman, data.insuranceNumber, Number(data.weight), Number(data.maxWeightAllowed), data.fuelType);
          this.updatedCar.emit(updatedCar);
          this.utilService.carUpdate = false;
        }, error1 => {
          this.utilService.openSnackBar('Sajnos nem sikerült frissíteni az autó adatait!', 'Hiba :(');
        }
      )} else {
      this.setValidPlateNumber();
      this.httpService.saveCar(this.createNewCarObject(form)).subscribe(data => {
          const newCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data. bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.purchasingPrice), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), Boolean(JSON.parse(data.sold)), data.carOrTruck, data.salesman, data.insuranceNumber, Number(data.weight), Number(data.maxWeightAllowed), data.fuelType);
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
          this.utilService.openSnackBar('Az autót sikerült elmenteni!', 'Szuper :)');
        }, error => {
          this.utilService.openSnackBar('Az adatbáziskapcsolat váratlanul megszakadt!', 'Hiba :(');
        }
      )}
  }

  private setValidPlateNumber() {
    this.utilService.validPlateNumber = true;
  }

  private addTimeToCarHandoverDate(carHandover: Date): Date {
    const carHandoverWithTime = carHandover;
    carHandoverWithTime.setHours(this.carHandoverTime['hour']);
    carHandoverWithTime.setMinutes(this.carHandoverTime['minute']);
    return carHandoverWithTime;
  }

  public createNewCarObject(form: any): Car {
    let carHandoverWithTime = null;
    if (form.value.carHandover != null) {
      carHandoverWithTime = this.addTimeToCarHandoverDate(new Date(form.value.carHandover));
    }
    if (this.utilService.carUpdate) {
      return  new Car(this.carData.id, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, carHandoverWithTime, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed, form.value.fuelType);
    } else {
      return  new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, carHandoverWithTime, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed, form.value.fuelType);

    }
  }

  private navigateToInsurancePage(form: any) {
    const carForInsurance = new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed, form.value.fuelType);
    this.httpService.saveCar(carForInsurance).subscribe(data => {
      this.router.navigate(['/insurance'], {state: {data: {
            insuredCar: carForInsurance,
          }}});
    });
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private itemChanged(form: any) {
    const car = new Car(null, form.value.name, form.value.type, form.value.color, form.value.plateNumber, form.value.specification, form.value.bodyNumber, form.value.engineNumber, form.value.capacity, form.value.vintage, form.value.mileage, form.value.motExpiry, form.value.price, form.value.purchasingPrice, form.value.cost, form.value.costDescription, form.value.dateOfArrival, form.value.dateOfLeaving, form.value.typeOfBuying, form.value.inheritanceTax, form.value.downPayment, form.value.payedAmount, form.value.kwh, form.value.carRegistry, form.value.documentsHandover, form.value.dueOfContract, form.value.carHandover, form.value.dateOfContract, false, form.value.carOrTruck, form.value.salesman, null, form.value.weight, form.value.maxWeightAllowed, form.value.fuelType);
    sessionStorage.setItem('newCar', JSON.stringify(car));
  }

  private makeTheFormBlank() {
    this.carData = null;
    sessionStorage.removeItem('newCar');
    this.ngOnInit();
  }
}
