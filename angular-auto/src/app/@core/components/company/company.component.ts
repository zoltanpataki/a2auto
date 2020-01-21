import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../models/company";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Address} from "../../models/address";
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
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Input('companyData')
  public companyData: Company;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newCompany: EventEmitter<any> = new EventEmitter<any>();
  public fields = {country: 'Ország', zipcode: 'Irányítószám', city: 'Város', address: 'Cím'};
  public fields2 = {companyRegistrationNumber: 'Cégjegyzékszám', representation: 'Képviselő', taxNumber: 'Adószám', phoneNumber: 'Telefonszám'};
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
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
        }
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newCompany') != null) {
      this.companyData = JSON.parse(sessionStorage.getItem('newCompany'));
    }
    if (this.companyData == null) {
      this.companyData = new Company(null, null, new Address(null, null, null, null, null), null, null, null, null, null);
    } else {
      this.emailFormControl.setValue(this.companyData.email);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveCompany(form: any) {
    if (!this.emailFormControl.hasError('email') && this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = true;
      const company = new Company(null, form.value.name, new Address(null, form.value.zipcode, form.value.country, form.value.city, form.value.address), form.value.companyRegistrationNumber, form.value.representation, form.value.taxNumber, form.value.phoneNumber, this.emailFormControl.value);
      this.httpService.saveCompany(company).subscribe(data => {
        console.log(data);
        this.orderProgress.emit('saved');
        this.newCompany.emit(data);
        this.utilService.openSnackBar('A társaság sikeresen mentve!', 'Szuper :)');
      }, error => {
        this.orderProgress.emit('unsaved');
        this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
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
    const company = new Company(null, form.value.name, new Address(null, form.value.zipcode, form.value.country, form.value.city, form.value.address), form.value.companyRegistrationNumber, form.value.representation, form.value.taxNumber, form.value.phoneNumber, this.emailFormControl.value);
    sessionStorage.setItem('newCompany', JSON.stringify(company));
  }

}
