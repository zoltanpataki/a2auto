import { Component, OnInit } from '@angular/core';
import {Company} from "../../@core/models/company";
import {HttpService} from "../../@core/services/http.service";
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {NavigationEnd, Router} from "@angular/router";
import {UtilService} from "../../@core/services/util.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-gdpr-page',
  templateUrl: './gdpr-page.component.html',
  styleUrls: ['./gdpr-page.component.scss']
})
export class GdprPageComponent implements OnInit {

  private Autocentrum: Company;
  private AutocentrumAddress: string;
  private today: Date;

  constructor(private httpService: HttpService,
              private router: Router,
              private utilService: UtilService,) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
        }
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
    this.today = new Date();
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

  public captureScreen() {
    var data = document.getElementById('gdprContainer');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('GDPR.pdf'); // Generated PDF
    });
  }
}
