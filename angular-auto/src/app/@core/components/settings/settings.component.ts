import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SalesmanComponent} from "../../dialog/salesman/salesman.component";
import {UtilService} from "../../services/util.service";
import {HttpService} from "../../services/http.service";
import {Salesmen} from "../../models/salesmen";
import {Witness} from "../../models/witness";
import {WitnessAddress} from "../../models/witnessAddress";
import {WitnessDialogComponent} from "../../dialog/witness-dialog/witness-dialog.component";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private carSalesmen = [];
  private salesmen = new MatTableDataSource<any>();
  private salesmanDisplayedColumns = ['name', 'symbol'];
  private witnessList = [];
  private witnesses = new MatTableDataSource<any>();
  private witnessDisplayedColumns = ['name', 'idCardNumber', 'symbol'];

  constructor(private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private utilService: UtilService,
              private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAllSalesmen().subscribe(data => {
      this.salesmen.data = data;
      this.utilService.salesmen = data;
    });

    this.httpService.getAllWitnesses().subscribe(data => {
      this.witnesses.data = data;
      this.utilService.witnesses = data;
    });
  }

  private deleteSalesman(id: number) {
    this.prepareSalesmanListForChange();
    this.httpService.deleteSalesman(id).subscribe(data => {
      this.carSalesmen.forEach((salesman, index) => {
        if (salesman.id === id) {
          this.carSalesmen.splice(index, 1);
        }
      });
      this.salesmen.data = this.carSalesmen;
      this.utilService.salesmen = this.carSalesmen;
      this.changeDetectorRefs.detectChanges();
    });
  }

  private deleteWitness(id: number) {
    this.prepareWitnessListForChange();
    this.httpService.deleteWitness(id).subscribe(data => {
      this.witnessList.forEach((witness, index) => {
        if (witness.id === id) {
          this.witnessList.splice(index, 1);
        }
      });
      this.witnesses.data = this.witnessList;
      this.utilService.witnesses = this.witnessList;
      this.changeDetectorRefs.detectChanges();
    });
  }

  private addSalesman(salesman: any) {
    const newSalesman = new Salesmen(null, salesman);
    this.prepareSalesmanListForChange();
    this.httpService.saveSalesman(newSalesman).subscribe(data => {
      this.carSalesmen.push(data);
      this.salesmen.data = this.carSalesmen;
      this.utilService.salesmen = this.carSalesmen;
      this.changeDetectorRefs.detectChanges();
    });
  }

  private addWitness(witness: any) {
    const newWitness = new Witness(null, new WitnessAddress(null, witness.zipcode, witness.city, witness.address), witness.idCardNumber, witness.name);
    this.prepareWitnessListForChange();
    this.httpService.saveWitness(newWitness).subscribe(data => {
      this.witnessList.push(data);
      this.witnesses.data = this.witnessList;
      this.utilService.witnesses = this.witnessList;
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

  public openWitnessModal(): void {
    const witnessDialogConfig = new MatDialogConfig();

    witnessDialogConfig.disableClose = true;
    witnessDialogConfig.width = '30%';

    const dialogRef = this.dialog.open(WitnessDialogComponent, witnessDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addWitness(result);
    });
  }



  private prepareSalesmanListForChange() {
    this.carSalesmen = this.salesmen.data;
  }

  private prepareWitnessListForChange() {
    this.witnessList = this.witnesses.data;
  }
}
