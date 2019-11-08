import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from "../../models/company";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute} from "@angular/router";
import {Address} from "../../models/address";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  public fields = {name: 'Cégnév', country: 'Ország', zipcode: 'Irányítószám', city: 'Város', address: 'Cím'};
  public fields2 = {companyRegistrationNumber: 'Cégjegyzékszám', representation: 'Képviselő', taxNumber: 'Adószám', phoneNumber: 'Telefonszám', email: 'E-mail cím'};
  public keepOriginalOrder = (a, b) => a.key;
  private currentUrl;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private route: ActivatedRoute) {
    this.route.url.subscribe(activtedUrl => {
      this.currentUrl = window.location.pathname;
    })
  }

  ngOnInit() {
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveCompany(form: any) {
    const company = new Company(null, form.value.name, new Address(null, form.value.zipcode, form.value.country, form.value.city, form.value.address), form.value.companyRegistrationNumber, form.value.representation, form.value.taxNumber, form.value.phoneNumber, form.value.email);
    this.httpService.saveCompany(company).subscribe(data => {
      console.log(data);
      this.orderProgress.emit('saved');
    }, error => {
      this.orderProgress.emit('unsaved');
      this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
    });
  }

}
