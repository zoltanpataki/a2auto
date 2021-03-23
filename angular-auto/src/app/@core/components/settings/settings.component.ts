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
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {InheritanceTax} from "../../models/inheritanceTax";
import {DeleteWitness, GetWitnesses, StoreWitness} from "../../../@store/actions/witness.actions";
import {DeleteSalesman, GetSalesmen, StoreSalesman} from "../../../@store/actions/salesman.actions";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../../../@store/state/app.state";
import {selectSalesmenList} from "../../../@store/selectors/salesman.selectors";
import {selectWitnessList} from "../../../@store/selectors/witness.selectors";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private carSalesmen = [];
  public salesmen = new MatTableDataSource<any>();
  public salesmanDisplayedColumns = ['name', 'symbol'];
  private witnessList = [];
  public witnesses = new MatTableDataSource<any>();
  public witnessDisplayedColumns = ['name', 'idCardNumber', 'symbol'];
  public inheritanceTax1 = new MatTableDataSource<any>();
  public inheritanceTax1Columns = ['kw', 'min', 'max', 'young', 'mediumAged', 'old'];
  public utilityList = [];
  public inheritanceInfoList = [];
  public inheritanceTax1ContainsWrongData: boolean = false;

  constructor(private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private utilService: UtilService,
              private httpService: HttpService,
              private router: Router,
              private _store: Store<IAppState>,) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
          sessionStorage.removeItem('userSearchDataOnUserPage');
          sessionStorage.removeItem('pickedUserOnUserPage');
          sessionStorage.removeItem('indexOfPickedUserOnUserPage');
        }
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
          sessionStorage.removeItem('companySearchDataOnCompanyPage');
          sessionStorage.removeItem('pickedCompanyOnCompanyPage');
          sessionStorage.removeItem('indexOfPickedCompanyOnCompanyPage');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {

    if (this.utilService.witnessesObs == null) {
      this._store.dispatch(new GetWitnesses(this.utilService.ignoreBlankWitnessOnSettingsPage()));
    }

    if (this.utilService.salesmenObs == null) {
      this._store.dispatch(new  GetSalesmen());
    }

    this.utilService.salesmenObs = this._store.pipe(select(selectSalesmenList));
    this.utilService.witnessesObs = this._store.pipe(select(selectWitnessList));

    this.utilService.salesmenObs.subscribe(salesmen => {
      console.log(salesmen)
      this.salesmen.data = salesmen;
    });

    this.utilService.witnessesObs.subscribe(witnesses => {
      this.witnesses.data = witnesses;
    });

    this.httpService.getAllUtilities().subscribe(data => {
      this.utilityList = data;
      this.httpService.getAllInheritanceTaxInfo().subscribe(data => {
        this.inheritanceInfoList = data;
        this.inheritanceTax1.data = this.createTableDataForInheritanceTax1(this.utilityList, this.inheritanceInfoList);
      });
    });
  }

  public updateInheritanceInfo1(event: Event, index: number, column: string) {
    if (!isNaN(Number(event))) {
      this.inheritanceTax1ContainsWrongData = false;
      this.inheritanceTax1.data[index][column] = Number(event);
      this.changeDetectorRefs.detectChanges();
      const tableData = this.inheritanceTax1.data;
      const updatedInheritanceTaxInfo = [];
      let rowId = 1;
      tableData.forEach(row => {
        console.log(row);
        let newRow = new InheritanceTax(rowId, row.kW, Number(row.young), Number(row.mediumAged), Number(row.old));
        console.log(newRow);
        updatedInheritanceTaxInfo.push(newRow);
        switch (rowId) {
          case 1:
            this.utilityList[6].value = row.min.toString().length > 0 ? row.min.toString() : '0';
            this.utilityList[7].value = row.max.toString().length > 0 ? row.max.toString() : '0';
            break;
          case 2:
            this.utilityList[8].value = row.min.toString().length > 0 ? row.min.toString() : '0';
            this.utilityList[9].value = row.max.toString().length > 0 ? row.max.toString() : '0';
            break;
          case 3:
            this.utilityList[10].value = row.min.toString().length > 0 ? row.min.toString() : '0';
            this.utilityList[11].value = row.max.toString().length > 0 ? row.max.toString() : '0';
            break;
          case 4:
            this.utilityList[12].value = row.min.toString().length > 0 ? row.min.toString() : '0';
            break;
        }
        rowId = rowId + 1;
      });
      console.log(this.utilityList);
      this.httpService.updateUtility(this.utilityList).subscribe(data => {
        console.log(data);
      });
      this.httpService.updateInheritanceTaxInfo(updatedInheritanceTaxInfo).subscribe(data => {
        console.log(data);
      });
    } else {
      this.inheritanceTax1ContainsWrongData = true;
    }
  }

  private createTableDataForInheritanceTax1(utilities: Array<any>, inheritanceInfo: Array<any>): Array<any> {
    const tableData = [];
    const firstRow = {};
    firstRow['kW'] = inheritanceInfo[0].kW;
    firstRow['min'] = utilities[6].value;
    firstRow['max'] = utilities[7].value;
    firstRow['young'] = inheritanceInfo[0].young.toString();
    firstRow['mediumAged'] = inheritanceInfo[0].mediumAged.toString();
    firstRow['old'] = inheritanceInfo[0].old.toString();
    tableData.push(firstRow);
    const secondRow = {};
    secondRow['kW'] = inheritanceInfo[1].kW;
    secondRow['min'] = utilities[8].value;
    secondRow['max'] = utilities[9].value;
    secondRow['young'] = inheritanceInfo[1].young.toString();
    secondRow['mediumAged'] = inheritanceInfo[1].mediumAged.toString();
    secondRow['old'] = inheritanceInfo[1].old.toString();
    tableData.push(secondRow);
    const thirdRow = {};
    thirdRow['kW'] = inheritanceInfo[2].kW;
    thirdRow['min'] = utilities[10].value;
    thirdRow['max'] = utilities[11].value;
    thirdRow['young'] = inheritanceInfo[2].young.toString();
    thirdRow['mediumAged'] = inheritanceInfo[2].mediumAged.toString();
    thirdRow['old'] = inheritanceInfo[2].old.toString();
    tableData.push(thirdRow);
    const fourthRow = {};
    fourthRow['kW'] = inheritanceInfo[3].kW;
    fourthRow['min'] = utilities[12].value;
    fourthRow['max'] = null;
    fourthRow['young'] = inheritanceInfo[3].young.toString();
    fourthRow['mediumAged'] = inheritanceInfo[3].mediumAged.toString();
    fourthRow['old'] = inheritanceInfo[3].old.toString();
    tableData.push(fourthRow);
    return tableData;
  }

  public deleteSalesman(id: number) {
    this._store.dispatch(new DeleteSalesman(id));
  }

  public deleteWitness(id: number) {
    this._store.dispatch(new DeleteWitness(id));
  }

  public addSalesman(salesman: any) {
    const newSalesman = new Salesmen(null, salesman);
    this._store.dispatch(new StoreSalesman(newSalesman));
  }

  public addWitness(witness: any) {
    const newWitness = new Witness(null, new WitnessAddress(null, witness.zipcode, witness.city, witness.address), witness.idCardNumber, witness.name);
    this._store.dispatch(new StoreWitness(newWitness));
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
