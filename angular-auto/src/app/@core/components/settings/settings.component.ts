import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SalesmanComponent} from "../../dialog/salesman/salesman.component";
import {UtilService} from "../../services/util.service";
import {HttpService} from "../../services/http.service";
import {Salesmen} from "../../models/salesmen";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private carSalesmen = [];
  private salesmen = new MatTableDataSource<any>();
  private salesmanDisplayedColumns = ['name', 'symbol'];

  constructor(private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private utilService: UtilService,
              private httpService: HttpService) { }

  ngOnInit() {

    this.httpService.getAllSalesmen().subscribe(data => {
      this.utilService.salesmen = data;
      this.salesmen.data = this.utilService.salesmen;
    });
  }

  private deleteSalesman(id: number) {
    this.prepareSalaesmanListForChange();
    this.httpService.deleteSalesman(id).subscribe(data => {
      this.carSalesmen.forEach((salesman, index) => {
        if (salesman.id === id) {
          this.carSalesmen.splice(index, 1);
        }
      });
      this.salesmen.data = this.carSalesmen;
      this.changeDetectorRefs.detectChanges();
    });
  }

  private addSalesman(salesman: string) {
    const newSalesman = new Salesmen(null, salesman);
    this.prepareSalaesmanListForChange();
    this.httpService.saveSalesman(newSalesman).subscribe(data => {
      this.carSalesmen.push(data);
      this.salesmen.data = this.carSalesmen;
      this.changeDetectorRefs.detectChanges();
    });
  }

  public openSalesmanModal(): void {
    const salesmanDialogConfig = new MatDialogConfig();

    salesmanDialogConfig.disableClose = true;
    salesmanDialogConfig.width = '30%';

    const dialogRef = this.dialog.open(SalesmanComponent, salesmanDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addSalesman(result.name);
    });
  }

  prepareSalaesmanListForChange() {
    this.carSalesmen = this.salesmen.data;
  }

}
