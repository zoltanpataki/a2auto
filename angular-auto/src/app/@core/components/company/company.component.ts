import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../../models/company";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Address} from "../../models/address";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input('companyData')
  public companyData: Company;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newCompany: EventEmitter<any> = new EventEmitter<any>();
  public fields = {country: 'Ország', zipcode: 'Irányítószám', city: 'Város', address: 'Cím'};
  public fields2 = {companyRegistrationNumber: 'Cégjegyzékszám', representation: 'Képviselő', taxNumber: 'Adószám', phoneNumber: 'Telefonszám', email: 'E-mail cím'};
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
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
        }
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newCompany') != null) {
      this.companyData = JSON.parse(sessionStorage.getItem('newCompany'));
    }
    if (this.companyData == null) {
      this.companyData = new Company(null, null, new Address(null, null, null, null, null), null, null, null, null, null);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveCompany(form: any) {
    const company = new Company(null, form.value.name, new Address(null, form.value.zipcode, form.value.country, form.value.city, form.value.address), form.value.companyRegistrationNumber, form.value.representation, form.value.taxNumber, form.value.phoneNumber, form.value.email);
    this.httpService.saveCompany(company).subscribe(data => {
      console.log(data);
      this.orderProgress.emit('saved');
      this.newCompany.emit(data);
      this.utilService.openSnackBar('A társaság sikeresen mentve!', 'Szuper :)');
    }, error => {
      this.orderProgress.emit('unsaved');
      this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
    });
  }

  private itemChanged(form: any) {
    const company = new Company(null, form.value.name, new Address(null, form.value.zipcode, form.value.country, form.value.city, form.value.address), form.value.companyRegistrationNumber, form.value.representation, form.value.taxNumber, form.value.phoneNumber, form.value.email);
    sessionStorage.setItem('newCompany', JSON.stringify(company));
  }

}
