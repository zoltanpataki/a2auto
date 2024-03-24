import { Component } from '@angular/core';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import {Users} from "../../@core/models/users";

@Component({
  selector: 'app-warrant-laws-page',
  templateUrl: './warrant-laws-page.component.html',
  styleUrls: ['./warrant-laws-page.component.scss']
})
export class WarrantLawsPageComponent {
  public today: Date;
  public pickedUser: Users;

  ngOnInit() {
    this.today = new Date();
    if (history.state.data) {
      this.pickedUser = history.state.data.user;
      this.pickedUser.fullName = this.changeBlockCapitalNameToCapitalCase(this.pickedUser.fullName);
    }
  }

  private changeBlockCapitalNameToCapitalCase(name: string): string {
    var splitNames = name.toLowerCase().split(' ');
    var capitalCaseNames = [];
    splitNames.forEach(namePart => capitalCaseNames.push(namePart.charAt(0).toUpperCase() + namePart.substring(1)))
    return capitalCaseNames.join(' ');
  }

  public captureScreen() {
    const jsPDF = require('jspdf');
    var data = document.getElementById('warrantLawsContainer');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var imageData = canvas.getContext('2d');

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('WarrantLaws.pdf'); // Generated PDF
    });
  }
}
