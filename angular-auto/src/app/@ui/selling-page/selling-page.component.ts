import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-selling-page',
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss']
})
export class SellingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public captureScreen() {
    var data = document.getElementById('sellingContainer');
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
      pdf.save('selling.pdf'); // Generated PDF
    });
  }

}
