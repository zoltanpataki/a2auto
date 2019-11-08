import { Component, OnInit } from '@angular/core';
import {Company} from "../../@core/models/company";
import {HttpService} from "../../@core/services/http.service";

@Component({
  selector: 'app-gdpr-page',
  templateUrl: './gdpr-page.component.html',
  styleUrls: ['./gdpr-page.component.scss']
})
export class GdprPageComponent implements OnInit {

  private Autocentrum: Company;
  private AutocentrumAddress: string;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    if (sessionStorage.getItem('A2Auto')) {
      this.setAutocentrumData(JSON.parse(sessionStorage.getItem('A2Auto')));
    } else {
      this.httpService.getCompany('A2', 'name').subscribe(data => {
        this.setAutocentrumData(data[0]);
      });
    }
  }

  private setAutocentrumData(data: Company) {
    this.Autocentrum = data;
    this.AutocentrumAddress = this.Autocentrum.address.zipcode + ' ' + this.Autocentrum.address.city + ' ' + this.Autocentrum.address.address;
  }

}
