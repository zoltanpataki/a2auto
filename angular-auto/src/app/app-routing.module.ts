import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./@core/components/landing/landing.component";
import {CarComponent} from "./@core/components/car/car.component";
import {UserComponent} from "./@core/components/user/user.component";
import {FilterComponent} from "./@core/components/filter/filter.component";
import {CompanyComponent} from "./@core/components/company/company.component";


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
