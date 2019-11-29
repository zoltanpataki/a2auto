import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WarningDialogComponent} from "../../dialog/warning-dialog/warning-dialog.component";
import {SalesmanComponent} from "../../dialog/salesman/salesman.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private carSalesmen = ['SOÓS GÁBOR', 'VINCZ ANTAL'];
  private salesmen = new MatTableDataSource<any>();
  private salesmanDisplayedColumns = ['name', 'symbol'];

  constructor(private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,) { }

  ngOnInit() {
    this.salesmen.data = this.carSalesmen;
  }

  private deleteSalesman(index: number) {
    console.log(this.carSalesmen[index]);
  }

  private addSalesman(salesman: string) {
    this.carSalesmen.push(salesman);
    this.salesmen.data = this.carSalesmen;
    this.changeDetectorRefs.detectChanges();
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

}
