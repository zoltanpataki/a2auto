import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { Select } from '@ngxs/store';
import {HttpService} from "./@core/services/http.service";
import {UtilService} from "./@core/services/util.service";
import {LoaderState} from "./@core/services/loader.state";
import {Observable} from "rxjs";
import {Witness} from "./@core/models/witness";
import { environment } from '../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(LoaderState.status)
  public loadingStatus$: Observable<boolean>;
  title = 'angular-auto';

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, private httpService: HttpService,
              private utilService: UtilService,) {
  }

  ngOnInit(): void {
    this.httpService.getCompany('A2', 'name').subscribe(data => {
      sessionStorage.setItem('A2Auto', JSON.stringify(data[0]));
      this.utilService.a2Company = data[0];
    });

  if (!isPlatformBrowser(this.platformId)) {
    const bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
        bases[0].setAttribute('href', environment.baseHref);
    }
}}



}
