import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Users} from "../../models/users";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input('userData')
  public userData: Users;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newUser: EventEmitter<any> = new EventEmitter<any>();
  public fieldsOne = {fullName: 'Teljes Név', birthName: 'Születéskori Név', zipCode: 'Irányítószám', city: 'Város', address: 'Lakcím', phoneNumber: 'Telefonszám'};
  public fieldsTwo = {birthPlace: 'Születési hely', email: 'E-mail', nameOfMother: 'Anyja neve', idCardNumber: 'Személyi igazolvány szám', drivingLicenceNumber: 'Vezetői engedély száma'};
  public fieldsThree = {personNumber: 'Személyi szám', taxNumber: 'Adószám', healthCareNumber: 'TAJ szám'};
  public fieldsFour = {dueTimeOfDrivingLicence: 'Vezetői engedély lejárata', dueTimeOfIdCard: 'Személyi igazolvány lejárata'};
  public keepOriginalOrder = (a, b) => a.key;
  private currentUrl;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.route.url.subscribe(activtedUrl => {
      this.currentUrl = window.location.pathname;
    });
    router.events
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newUser') != null) {
      this.userData = JSON.parse(sessionStorage.getItem('newUser'));
    }
    if (this.userData == null) {
      this.userData = new Users(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveUser(form: any) {
    const user = new Users(null, form.value.fullName, form.value.birthName, form.value.zipCode, form.value.city, form.value.address, form.value.birthPlace, form.value.phoneNumber, form.value.email, form.value.nameOfMother, form.value.birthDate, form.value.personNumber, form.value.idCardNumber, form.value.dueTimeOfIdCard, form.value.drivingLicenceNumber, form.value.dueTimeOfDrivingLicence, form.value.taxNumber, form.value.healthCareNumber);
    this.httpService.saveUser(user).subscribe(data => {
      console.log(data);
      this.orderProgress.emit('saved');
      this.newUser.emit(data);
    }, error => {
      this.orderProgress.emit('unsaved');
      this.utilService.openSnackBar('A felhasználót nem sikerült menteni!', 'Hiba :(');
    });
  }

  private itemChanged(form: any) {
    const user = new Users(null, form.value.fullName, form.value.birthName, form.value.zipCode, form.value.city, form.value.address, form.value.birthPlace, form.value.phoneNumber, form.value.email, form.value.nameOfMother, form.value.birthDate, form.value.personNumber, form.value.idCardNumber, form.value.dueTimeOfIdCard, form.value.drivingLicenceNumber, form.value.dueTimeOfDrivingLicence, form.value.taxNumber, form.value.healthCareNumber);
    sessionStorage.setItem('newUser', JSON.stringify(user));
  }
}
