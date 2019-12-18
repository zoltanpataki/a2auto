import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

const SPINNER_MESSAGE = 'Loading...';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
