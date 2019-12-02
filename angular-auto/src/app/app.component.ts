import {Component, OnInit} from '@angular/core';
import {HttpService} from "./@core/services/http.service";
import {UtilService} from "./@core/services/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-auto';

  constructor(private httpService: HttpService,
              private utilService: UtilService) {

  }

  ngOnInit(): void {
    this.httpService.getCompany('A2', 'name').subscribe(data => {
      sessionStorage.setItem('A2Auto', JSON.stringify(data[0]));
      this.utilService.a2Company = data[0];
    });

    this.httpService.getAllSalesmen().subscribe(data => {
      this.utilService.salesmen = data;
    });

    this.httpService.getAllWitnesses().subscribe(data => {
      this.utilService.witnesses = data;
    });
  }

}
