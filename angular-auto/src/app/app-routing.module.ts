import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./@core/components/landing/landing.component";
import {CarComponent} from "./@core/components/car/car.component";
import {UserComponent} from "./@core/components/user/user.component";
import {FilterComponent} from "./@core/components/filter/filter.component";
import {CompanyComponent} from "./@core/components/company/company.component";
import {OrderPageComponent} from "./@ui/order-page/order-page.component";
import {SellingPageComponent} from "./@ui/selling-page/selling-page.component";
import {GdprPageComponent} from "./@ui/gdpr-page/gdpr-page.component";
import {SettingsComponent} from "./@core/components/settings/settings.component";
import {WarrantPageComponent} from "./@ui/warrant-page/warrant-page.component";
import {InsurancePageComponent} from "./@ui/insurance-page/insurance-page.component";


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'newCar',
    component: CarComponent
  },
  {
    path: 'newUser',
    component: UserComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'newCompany',
    component: CompanyComponent
  },
  {
    path: 'orderPage',
    component: OrderPageComponent
  },
  {
    path: 'sellingPage',
    component: SellingPageComponent
  },
  {
    path: 'gdprPage',
    component: GdprPageComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'warrantPage',
    component: WarrantPageComponent
  },
  {
    path: 'insurance',
    component: InsurancePageComponent
  },
  {
    path: '**',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
