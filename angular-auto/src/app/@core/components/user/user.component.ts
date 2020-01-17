import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Users} from "../../models/users";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";
import {filter} from "rxjs/operators";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Input('userData')
  public userData: Users;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newUser: EventEmitter<any> = new EventEmitter<any>();
  public fieldsOne = {
    fullName: 'Teljes Név',
    birthName: 'Születéskori Név',
    zipCode: 'Irányítószám',
    city: 'Város',
    address: 'Lakcím',
    phoneNumber: 'Telefonszám'
  };
  public fieldsTwo = {
    birthPlace: 'Születési hely',
    nameOfMother: 'Anyja neve',
    idCardNumber: 'Személyi igazolvány szám',
    drivingLicenceNumber: 'Vezetői engedély száma'
  };
  public fieldsThree = {
    nationality: 'Állampolgárság',
    personNumber: 'Személyi szám',
    taxNumber: 'Adószám',
  };
  public fieldsFour = {
    dueTimeOfDrivingLicence: 'Vezetői engedély megszerzése',
    dueTimeOfIdCard: 'Személyi igazolvány lejárata'
  };
  public keepOriginalOrder = (a, b) => a.key;
  private currentUrl;
  private isCompleteAddress: boolean = true;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.route.url.subscribe(activtedUrl => {
      this.currentUrl = window.location.pathname;
    });
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newUser') != null) {
      this.userData = JSON.parse(sessionStorage.getItem('newUser'));
    }
    if (this.userData == null) {
      this.userData = new Users(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveUser(form: any) {
    if (!this.emailFormControl.hasError('email') && this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = true;
      const user = new Users(null, form.value.fullName, form.value.birthName, form.value.zipCode, form.value.city, form.value.address, form.value.birthPlace, form.value.phoneNumber, form.value.email, form.value.nameOfMother, form.value.birthDate, form.value.personNumber, form.value.idCardNumber, form.value.dueTimeOfIdCard, form.value.drivingLicenceNumber, form.value.dueTimeOfDrivingLicence, form.value.taxNumber, form.value.healthCareNumber, form.value.nationality);
      this.httpService.saveUser(user).subscribe(data => {
        console.log(data);
        this.orderProgress.emit('saved');
        this.newUser.emit(data);
        this.utilService.openSnackBar('A felhasználó sikeresen mentve!', 'Szuper :)');
      }, error => {
        this.orderProgress.emit('unsaved');
        this.utilService.openSnackBar('A felhasználót nem sikerült menteni!', 'Hiba :(');
      });
    } else if (!this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = false;
    }
  }

  private nullCheckOnAddress(form: any): boolean {
    let nullCounter = 0;
    nullCounter = form.value.zipcode == null || form.value.zipcode.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.city == null || form.value.city.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.address == null || form.value.address.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    return Math.abs(nullCounter) === 3;
  }

  private itemChanged(form: any) {
    const user = new Users(null, form.value.fullName, form.value.birthName, form.value.zipCode, form.value.city, form.value.address, form.value.birthPlace, form.value.phoneNumber, form.value.email, form.value.nameOfMother, form.value.birthDate, form.value.personNumber, form.value.idCardNumber, form.value.dueTimeOfIdCard, form.value.drivingLicenceNumber, form.value.dueTimeOfDrivingLicence, form.value.taxNumber, form.value.healthCareNumber, form.value.nationality);
    sessionStorage.setItem('newUser', JSON.stringify(user));
  }
}
