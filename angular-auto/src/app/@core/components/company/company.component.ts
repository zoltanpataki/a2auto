import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from "../../models/company";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  public fields = {name: 'Cégnév', address: 'Cím', companyRegistrationNumber: 'Cégjegyzékszám', representation: 'Képviselő'};
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
    const company = new Company(null, form.value.name, form.value.address, form.value.companyRegistrationNumber, form.value.representation);
    this.httpService.saveCompany(company).subscribe(data => {
      console.log(data);
      this.orderProgress.emit('saved');
    }, error => {
      this.orderProgress.emit('unsaved');
      this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
    });
  }

}
