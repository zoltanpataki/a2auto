import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../../models/car";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CarTimeInfoComponent} from "../../dialog/car-time-info/car-time-info.component";
import {InstantBuyingDialogComponent} from "../../dialog/instant-buying-dialog/instant-buying-dialog.component";

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
  public fieldsOneSecondHalf = {
    specification: 'Felszereltség',
    bodyNumber: 'Alvázszám',
    engineNumber: 'Motorszám',
    carRegistry: 'Forgalmi engedély száma'
  };
  public fieldTwo = {
    vintage: 'Évjárat',
    mileage: 'Futott km',
    price: 'Vételár',
    // purchasingPrice: 'Beszerzési ár',
    // cost: 'Költség',
    // inheritanceTax: 'Átírási illeték',
    // downPayment: 'Foglaló',
    // payedAmount: 'Befizetett összeg',
    kwh: 'Teljesítmény'
  };
  public fieldFour = {
    dateOfArrival: 'Vétel dátuma',
    // dateOfLeaving: 'Eladás dátuma',
    // documentsHandover: 'Dokumentumok átadásának időpontja',
    // dateOfContract: 'Szerződés szerinti teljesítés időpontja',
    // dueOfContract: 'Szerződés lejárata'
  };
  public fieldRelatedToWeight = {weight: 'Saját tömeg', maxWeightAllowed: 'Megengedett legnagyobb össztömeg'};
  public keepOriginalOrder = (a, b) => a.key;
  public carHandoverTime = {};
  private showInsuranceButton: boolean = false;

  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public fuelTypes = ['BENZIN', 'DÍZEL', 'GÁZ', 'HIBRID', 'ELEKTROMOS'];
  public carOrTruck = ['SZEMÉLYGÉPJÁRMŰ', 'TEHERGÉPJÁRMŰ'];

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private dialog: MatDialog,
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
      this.carData = new Car(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null, null);
    } else {
      const carHandoverDate: Date = new Date(this.carData.carHandover);
      this.carHandoverTime['hour'] = carHandoverDate.getHours();
      this.carHandoverTime['minute'] = carHandoverDate.getMinutes();
    }
  }

  public saveCar(form: any) {
    if (form.value.plateNumber.length < 6) {
      this.utilService.validPlateNumber = false;
    } else if (this.utilService.carUpdate) {
      this.setValidPlateNumber();
      this.updateCar(form, this.carData.id);
    } else {
      this.setValidPlateNumber();
      this.checkIfCarExistsAlreadyWithTheGivenPlateNumberAndActAccordingly(form);
    }
  }

  public openInstantBuyingDialog(car: Car) {
    const instantBuyingDialogConfig = new MatDialogConfig();

    instantBuyingDialogConfig.disableClose = true;
    instantBuyingDialogConfig.width = '50%';

    instantBuyingDialogConfig.data = {
      car: car,
    };

    const dialogRef = this.dialog.open(InstantBuyingDialogComponent, instantBuyingDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.router.navigate(['/sellingPage'], {state: {data: {
              orderedCar: result.car,
              pickedUser: result.user,
              pickedCompany: result.company,
              switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: false,
              witness1: result.witness1,
              witness2: result.witness2,
              a2Representation: result.representation,
              remarkList: result.remarkList
            }}});
      }

    });
  }

  private openDialog(carForm: any) {
    const carForBuying = this.createCarObjectNoId(carForm, this.transformToCapitalData(carForm));
    this.openInstantBuyingDialog(carForBuying);
  }

  private checkIfCarExistsAlreadyWithTheGivenPlateNumberAndActAccordingly(form: any) {
    this.httpService.getSingleCar(form.value.plateNumber.toUpperCase(), 'plateNumber').subscribe(data => {
      console.log(data);
      if (data == null) {
        this.httpService.saveCar(this.createNewCarObject(form, null)).subscribe(data => {
            const newCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data.bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.purchasingPrice), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), false, data.carOrTruck, data.salesman, data.insuranceNumber, Number(data.weight), Number(data.maxWeightAllowed), data.fuelType, data.nameOfBuyer);
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
        )
      } else {
        this.utilService.carUpdate = true;
        this.updateCar(form, data.id);
      }
    }, error => {
      console.log(error);
      this.utilService.carUpdate = false;
    });
  }

  private updateCar(form: any, carId: any) {
    this.httpService.updateCar(this.createNewCarObject(form, carId)).subscribe(data => {
        this.utilService.openSnackBar('Az autó adatai sikeresen frissültek!', 'Szuper :)');
        const updatedCar = new Car(data.id, data.name, data.type, data.color, data.plateNumber, data.specification, data.bodyNumber, data.engineNumber, Number(data.capacity), Number(data.vintage), Number(data.mileage), new Date(data.motExpiry), Number(data.price), Number(data.purchasingPrice), Number(data.cost), data.costDescriptions, new Date(data.dateOfArrival), new Date(data.dateOfLeaving), data.typeOfBuying, Number(data.inheritanceTax), Number(data.downPayment), Number(data.payedAmount), Number(data.kwh), data.carRegistry, new Date(data.documentsHandover), new Date(data.dueOfContract), new Date(data.carHandover), new Date(data.dateOfContract), false, data.carOrTruck, data.salesman, data.insuranceNumber, Number(data.weight), Number(data.maxWeightAllowed), data.fuelType, null);
        if (this.router.url === "/filter") {
          this.updatedCar.emit(updatedCar);
        }
        this.utilService.carUpdate = false;
      }, error1 => {
        this.utilService.openSnackBar('Sajnos nem sikerült frissíteni az autó adatait!', 'Hiba :(');
      }
    )
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

  private nullCheckOnCarHandoverTime(carHandover: any): Date {
    return carHandover != null ? this.addTimeToCarHandoverDate(new Date(carHandover)) : null;
  }

  public createNewCarObject(form: any, carId: any): Car {
    if (this.utilService.carUpdate) {
      console.log('Frissitesben');
      return this.createCarObjectWithId(form, this.transformToCapitalData(form), carId);
    } else {
      return this.createCarObjectNoId(form, this.transformToCapitalData(form));
    }
  }

  private transformToCapitalData(form: any): Object {
    const capitalObject = {};
    capitalObject['capitalName'] = form.value.name.toUpperCase();
    capitalObject['capitalType'] = form.value.type.toUpperCase();
    capitalObject['capitalColor'] = form.value.color.toUpperCase();
    capitalObject['capitalPlateNumber'] = form.value.plateNumber.toUpperCase();
    capitalObject['capitalSpecification'] = form.value.specification.toUpperCase();
    capitalObject['capitalBodyNumber'] = form.value.bodyNumber.toUpperCase();
    capitalObject['capitalEngineNumber'] = form.value.engineNumber.toUpperCase();
    capitalObject['capitalCostDescriptions'] = form.value.costDescriptions.toUpperCase();
    // capitalObject['capitalTypeOfBuying'] = form.value.typeOfBuying != null ? form.value.typeOfBuying.toUpperCase(): null;
    capitalObject['capitalCarRegistry'] = form.value.carRegistry.toUpperCase();
    capitalObject['capitalCarOrTruck'] = form.value.carOrTruck != null ? form.value.carOrTruck.toUpperCase(): null;
    // capitalObject['capitalSalesman'] = form.value.salesman != null ? form.value.salesman.toUpperCase() : null;
    capitalObject['capitalFuelType'] = form.value.fuelType != null ? form.value.fuelType.toUpperCase(): null;
    return capitalObject;
  }

  private createCarObjectWithId(form: any, capitalData: Object, carId: any): Car {
    const isSold = this.carData.sold != false;
    const insuranceNumber = this.carData.insuranceNumber != null ? this.carData.insuranceNumber : null;
    const nameOfBuyer = this.carData.nameOfBuyer != null ? this.carData.nameOfBuyer : null;
    console.log('Ez az id ' + this.carData.id);
    return new Car(
      carId,
      capitalData['capitalName'],
      capitalData['capitalType'],
      capitalData['capitalColor'],
      capitalData['capitalPlateNumber'],
      capitalData['capitalSpecification'],
      capitalData['capitalBodyNumber'],
      capitalData['capitalEngineNumber'],
      form.value.capacity,
      form.value.vintage,
      form.value.mileage,
      form.value.motExpiry,
      form.value.price,
      this.carData.purchasingPrice,
      this.carData.cost,
      capitalData['capitalCostDescriptions'],
      form.value.dateOfArrival,
      this.carData.dateOfLeaving,
      this.carData.typeOfBuying,
      this.carData.inheritanceTax,
      this.carData.downPayment,
      this.carData.payedAmount,
      form.value.kwh,
      capitalData['capitalCarRegistry'],
      this.carData.documentsHandover,
      this.carData.dueOfContract,
      this.carData.carHandover,
      this.carData.dateOfContract,
      isSold,
      capitalData['capitalCarOrTruck'],
      this.carData.salesman,
      insuranceNumber,
      form.value.weight,
      form.value.maxWeightAllowed,
      capitalData['capitalFuelType'],
      nameOfBuyer);
  }

  private createCarObjectNoId(form: any, capitalData: Object) {
    return new Car(
      null,
      capitalData['capitalName'],
      capitalData['capitalType'],
      capitalData['capitalColor'],
      capitalData['capitalPlateNumber'],
      capitalData['capitalSpecification'],
      capitalData['capitalBodyNumber'],
      capitalData['capitalEngineNumber'],
      form.value.capacity,
      form.value.vintage,
      form.value.mileage,
      form.value.motExpiry,
      form.value.price,
      null,
      null,
      capitalData['capitalCostDescriptions'],
      form.value.dateOfArrival,
      null,
      null,
      null,
      null,
      null,
      form.value.kwh,
      capitalData['capitalCarRegistry'],
      null,
      null,
      null,
      null,
      false,
      capitalData['capitalCarOrTruck'],
      null,
      null,
      form.value.weight,
      form.value.maxWeightAllowed,
      capitalData['capitalFuelType'],
      null);
  }

  private navigateToInsurancePage(form: any) {
    const carForInsurance = this.createCarObjectNoId(form, this.transformToCapitalData(form));
      this.httpService.saveCar(carForInsurance).subscribe(data => {
      this.router.navigate(['/insurance'], {
        state: {
          data: {
            insuredCar: carForInsurance,
          }
        }
      });
    });
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private itemChanged(form: any) {
    console.log(form.value);
    const car = this.createCarObjectNoId(form, this.transformToCapitalData(form));
    sessionStorage.setItem('newCar', JSON.stringify(car));
  }

  private makeTheFormBlank() {
    this.carData = null;
    sessionStorage.removeItem('newCar');
    this.ngOnInit();
  }
}
