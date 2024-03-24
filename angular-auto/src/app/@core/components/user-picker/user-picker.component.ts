import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SelectedFilter} from "../../models/selectedFilter";
import {MatTableDataSource} from "@angular/material/table";
import {Users} from "../../models/users";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss']
})
export class UserPickerComponent {

  public selectedUserFilter: SelectedFilter;
  public userFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Város', value: 'city'}];
  public userSearchResult = new MatTableDataSource<Users>();
  public indexOfPickedUser: number;
  public userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  public clearUserDataButtonPressed: boolean = false;
  public tooLongFieldValue: string = '';
  public isThereLongFieldValue: boolean = false;
  public userData: Users;

  constructor(private httpService: HttpService,
              public utilService: UtilService,
              private route: ActivatedRoute,
              public router: Router,
              private changeDetectorRefs: ChangeDetectorRef
  ) {
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

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public filterUser(form: any) {
    sessionStorage.removeItem('indexOfPickedUserOnUserPickerPage');
    this.indexOfPickedUser = null;
    if (this.validateFormFieldLength(form.value)) {
      this.httpService.getUser(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value).subscribe(data => {
        this.userSearchResult.data = data;
        this.changeDetectorRefs.detectChanges();
        sessionStorage.setItem('userSearchDataOnUserPickerPage', JSON.stringify(data));
      });
    }
  }

  private validateFormFieldLength(formValue: any): boolean {
    const formValues = Object.values(formValue);
    for (const value of formValues) {
      if (typeof value === "string" && value.length > 50) {
        this.tooLongFieldValue = value;
        this.isThereLongFieldValue = true;
        return false;
      }
    }
    return true;
  }

  private setFormValuesToUpperCase(form: any): string {
    let formValue = null;
    switch (Object.keys(form.value)[0]) {
      case 'name': {
        formValue = form.value.name.toUpperCase();
        break;
      }
      case 'city': {
        formValue = form.value.city.toUpperCase();
        break;
      }
      case 'companyRegistrationNumber': {
        formValue = form.value.companyRegistrationNumber.toUpperCase();
        break;
      }
    }
    return formValue;
  }

  public pickUser(index: number) {
    this.indexOfPickedUser = index;
    const pickedUserFromDataTable = this.userSearchResult.data[index];
    this.userData = new Users(
      pickedUserFromDataTable.id,
      pickedUserFromDataTable.fullName,
      pickedUserFromDataTable.birthName,
      pickedUserFromDataTable.zipCode,
      pickedUserFromDataTable.city,
      pickedUserFromDataTable.address,
      pickedUserFromDataTable.birthPlace,
      pickedUserFromDataTable.phoneNumber,
      pickedUserFromDataTable.email,
      pickedUserFromDataTable.nameOfMother,
      pickedUserFromDataTable.birthDate,
      pickedUserFromDataTable.personNumber,
      pickedUserFromDataTable.idCardNumber,
      pickedUserFromDataTable.dueTimeOfIdCard,
      pickedUserFromDataTable.drivingLicenceNumber,
      pickedUserFromDataTable.dueTimeOfDrivingLicence,
      pickedUserFromDataTable.taxNumber,
      pickedUserFromDataTable.healthcareNumber,
      pickedUserFromDataTable.nationality);
    sessionStorage.setItem('pickedUserOnUserPickerPage', JSON.stringify(this.userData));
    sessionStorage.setItem('indexOfPickedUserOnUserPickerPage', this.indexOfPickedUser.toString());
    this.navigateToWarrantLawsPage(this.userData);
  }

  private navigateToWarrantLawsPage(userData: Users) {
    this.router.navigate(['/warrantLawsPage'], {state: {data: {
          user: userData
        }}});
  }
}
