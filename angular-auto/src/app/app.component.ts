import {Component, OnInit} from '@angular/core';
import {HttpService} from "./@core/services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-auto';

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.httpService.getCompany('A2', 'name').subscribe(data => {
      sessionStorage.setItem('A2Auto', JSON.stringify(data[0]));
    });
  }

}
