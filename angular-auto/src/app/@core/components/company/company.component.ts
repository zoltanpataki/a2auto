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
      if (this.companyData.id == null) {
        this.httpService.saveCompany(this.createCompanyObj(form, false)).subscribe(data => {
          this.companyData = data;
          this.orderProgress.emit('saved');
          this.newCompany.emit(data);
          this.utilService.openSnackBar('A társaság sikeresen mentve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
        });
      } else {
        this.httpService.saveCompany(this.createCompanyObj(form, true)).subscribe(data => {
          this.companyData = data;
          this.orderProgress.emit('saved');
          this.newCompany.emit(data);
          this.utilService.openSnackBar('A társaság sikeresen frissítve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A társaságot nem sikerült frissíteni!', 'Hiba :(');
        });
      }
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
    let company;
    if (this.companyData.id == null) {
      company = this.createCompanyObj(form, false);
    } else {
      company = this.createCompanyObj(form, true);
    }
    sessionStorage.setItem('newCompany', JSON.stringify(company));
  }

  private createCompanyObj(form: any, updateOrNew: boolean): Company {
    const capitalObject = this.transformToCapitalData(form);
    if (updateOrNew) {
      return new Company(
        this.companyData.id,
        capitalObject['capitalName'],
        new Address(
          this.companyData.address.id,
          capitalObject['capitalZipCode'],
          capitalObject['capitalCountry'],
          capitalObject['capitalCity'],
          capitalObject['capitalAddress'],
          ),
        capitalObject['capitalCompanyRegistrationNumber'],
        capitalObject['capitalRepresentation'],
        capitalObject['capitalTaxNumber'],
        capitalObject['capitalPhoneNumber'],
        capitalObject['capitalEmail']
        )
    } else {
      return new Company(
        null,
        capitalObject['capitalName'],
        new Address(
          null,
          capitalObject['capitalZipCode'],
          capitalObject['capitalCountry'],
          capitalObject['capitalCity'],
          capitalObject['capitalAddress'],
        ),
        capitalObject['capitalCompanyRegistrationNumber'],
        capitalObject['capitalRepresentation'],
        capitalObject['capitalTaxNumber'],
        capitalObject['capitalPhoneNumber'],
        capitalObject['capitalEmail']
      )
    }
  }

  private transformToCapitalData(form: any): Object {
    const capitalObject = {};
    capitalObject['capitalName'] = form.value.name != null ? form.value.name.toUpperCase() : null;
    capitalObject['capitalZipCode'] = form.value.zipcode != null ? form.value.zipcode.toUpperCase() : null;
    capitalObject['capitalCity'] = form.value.city != null ? form.value.city.toUpperCase() : null;
    capitalObject['capitalCountry'] = form.value.country != null ? form.value.country.toUpperCase() : null;
    capitalObject['capitalAddress'] = form.value.address != null ? form.value.address.toUpperCase() : null;
    capitalObject['capitalCompanyRegistrationNumber'] = form.value.companyRegistrationNumber != null ? form.value.companyRegistrationNumber.toUpperCase() : null;
    capitalObject['capitalEmail'] = this.emailFormControl.value != null ? this.emailFormControl.value.toUpperCase() : null;
    capitalObject['capitalRepresentation'] = form.value.representation != null ? form.value.representation.toUpperCase() : null;
    capitalObject['capitalTaxNumber'] = form.value.taxNumber != null ? form.value.taxNumber.toUpperCase() : null;
    capitalObject['capitalPhoneNumber'] = form.value.phoneNumber != null ? form.value.phoneNumber.toUpperCase() : null;
    return capitalObject;
  }

}
