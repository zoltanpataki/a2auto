import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './@core/components/sidebar/sidebar.component';
import { LandingComponent } from './@core/components/landing/landing.component';
import { SaldoComponent } from './@core/components/saldo/saldo.component';
import { CarComponent } from './@core/components/car/car.component';
import { UserComponent } from './@core/components/user/user.component';
import { FilterComponent } from './@core/components/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "./@core/dialog/dialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { WarningDialogComponent } from './@core/dialog/warning-dialog/warning-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CompanyComponent } from './@core/components/company/company.component';
import { CreditDialogComponent } from './@core/dialog/credit-dialog/credit-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import { OrderPageComponent } from './@ui/order-page/order-page.component';
import { SellingPageComponent } from './@ui/selling-page/selling-page.component';
import { GdprPageComponent } from './@ui/gdpr-page/gdpr-page.component';
import {FlexModule} from "@angular/flex-layout";
import { CarTimeInfoComponent } from './@core/dialog/car-time-info/car-time-info.component';
import { SettingsComponent } from './@core/components/settings/settings.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { SalesmanComponent } from './@core/dialog/salesman/salesman.component';
import { WitnessDialogComponent } from './@core/dialog/witness-dialog/witness-dialog.component';
import { WarrantPageComponent } from './@ui/warrant-page/warrant-page.component';
import { WitnessPickerDialogComponent } from './@core/dialog/witness-picker-dialog/witness-picker-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LandingComponent,
    SaldoComponent,
    CarComponent,
    UserComponent,
    FilterComponent,
    DialogComponent,
    WarningDialogComponent,
    CompanyComponent,
    CreditDialogComponent,
    OrderPageComponent,
    SellingPageComponent,
    GdprPageComponent,
    CarTimeInfoComponent,
    SettingsComponent,
    SalesmanComponent,
    WitnessDialogComponent,
    WarrantPageComponent,
    WitnessPickerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgbModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    FlexModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, WarningDialogComponent, CreditDialogComponent, CarTimeInfoComponent, SalesmanComponent, WitnessDialogComponent, WitnessPickerDialogComponent]
})
export class AppModule { }
