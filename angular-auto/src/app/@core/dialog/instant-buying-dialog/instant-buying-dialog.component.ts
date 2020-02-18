import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../models/car";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Description} from "../../models/description";
import {Witness} from "../../models/witness";
import {UtilService} from "../../services/util.service";
import {Users} from "../../models/users";
import {HttpService} from "../../services/http.service";
import {Company} from "../../models/company";
import {Address} from "../../models/address";

@Component({
  selector: 'app-instant-buying-dialog',
  templateUrl: './instant-buying-dialog.component.html',
  styleUrls: ['./instant-buying-dialog.component.scss']
})
export class InstantBuyingDialogComponent implements OnInit {

  public carData : Car;
  public remarkPartOpen: boolean = false;
  public userPartOpen: boolean = false;
  public remarkForm: FormGroup;
  public description: FormArray;
  public remarkList: Description[] = [];
  public carHandoverTime = {};
  public fields1 = {dueOfContract: 'Eladás dátuma', documentsHandover: 'Dokumentumok átadásának időpontja', dateOfContract : 'Szerződés szerinti teljesítés időpontja'};
  public keepOriginalOrder = (a, b) => a.key;
  public witness1: Witness;
  public witness2: Witness;
  public listOfA2Representation = ['SOÓS GÁBOR', 'VINCZ ANTAL'];
  public listOfTypeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS'];
  public pickedRepresentation: string;
  public pickedTypeOfBuying: string;
  public userChooser: boolean = true;
  public privateUserOrCorporate: string;
  public fields = {
    fullName: 'Teljes Név',
    birthName: 'Születéskori Név',
  };
  public isCompleteAddress: boolean = true;

  public addressFields = {
    zipCode: 'Irányítószám',
    city: 'Város',
    address: 'Lakcím',
  };

  public fieldsTwo = {
    birthPlace: 'Születési hely',
    nameOfMother: 'Anyja neve',
    idCardNumber: 'Személyi igazolvány szám',
    nationality: 'Állampolgárság',
  };

  public companyFields = {
    companyName: 'Cégnév',
    companyRegistrationNumber: 'Cégjegyzékszám',
    representation: 'Képviselő neve',
  };

  public userOrCorporate = ['MAGÁNSZEMÉLY', 'CÉG'];

  public userData: Users;
  public companyData: Company;

  constructor(private dialogRef: MatDialogRef<InstantBuyingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private httpService: HttpService,
              public utilService: UtilService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    if (this.userData == null) {
      this.userData = new Users(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    if (this.companyData == null) {
      this.companyData = new Company(null, null, new Address(null, null, null, null, null), null, null, null, null, null);
    }
    this.carData = this.data.car;
    this.setRemarkForm();
    this.initiateDatesWithToday();
  }

  private setRemarkForm() {
    this.remarkForm = this.formBuilder.group({
      description: this.formBuilder.array([]),
    });
    if (this.remarkList.length > 0) {
      this.remarkList.forEach(remark => {
        this.addNewRemarkRow(remark.description);
      });
    } else {
      this.addNewRemarkRow(null);
    }
  }

  public addNewRemarkRow(description: string) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.push(this.createRemarkRow(description));
  }

  public removeRemarkRow(index: number) {
    this.description = this.remarkForm.get('description') as FormArray;
    this.description.removeAt(index);
  }

  private createRemarkRow(remark: string) {
    if (remark == null) {
      return this.formBuilder.group({
        description: [null],
      });
    } else {
      return this.formBuilder.group({
        description: [remark],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  public saveCarData(form: any) {
    const carHandover = new Date(this.carData.carHandover);
    if (this.carHandoverTime['hour'] != null && this.carHandoverTime['minute'] != null) {
      carHandover.setHours(this.carHandoverTime['hour'], this.carHandoverTime['minute'], 0, 0);
    } else if (this.carHandoverTime['hour'] != null && this.carHandoverTime['minute'] == null) {
      carHandover.setHours(this.carHandoverTime['hour'], 0, 0, 0);
    } else if (this.carHandoverTime['hour'] == null && this.carHandoverTime['minute'] != null) {
      carHandover.setHours(0, this.carHandoverTime['minute'], 0, 0);
    }
    this.carData.carHandover = carHandover;
    this.witness1 = form.value.witness1.name === 'Egyik sem' ? null : form.value.witness1;
    this.witness2 = form.value.witness2.name === 'Egyik sem' ? null : form.value.witness2;
    this.pickedRepresentation = form.value.representation;
    this.pickedTypeOfBuying = form.value.typeOfBuying;
    this.remarkPartOpen = true;
  }

  public saveRemark(form: FormGroup) {
    this.remarkPartOpen = false;
    this.remarkList = [];
    form.value.description.forEach(description => {
      if (description.description != null) {
        const newDescription = new Description(null, description.description, 'buy');
        this.remarkList.push(newDescription);
      }
    });
    this.userPartOpen = true;
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private setDatesToNull() {
    if (new Date(this.carData.dateOfLeaving).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dateOfLeaving = null;
    }
    if (new Date(this.carData.dateOfContract).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dateOfContract = null;
    }
    if (new Date(this.carData.dueOfContract).getFullYear() === new Date(0).getFullYear()) {
      this.carData.dueOfContract = null;
    }
    if (new Date(this.carData.documentsHandover).getFullYear() === new Date(0).getFullYear()) {
      this.carData.documentsHandover = null;
    }
    if (new Date(this.carData.carHandover).getFullYear() === new Date(0).getFullYear()) {
      this.carData.carHandover = null;
    }
  }

  private initiateDatesWithToday() {
    this.setDatesToNull();
    if (this.carData.dateOfContract == null && this.carData.dueOfContract == null) {
      this.carData.carHandover = this.carData.carHandover == null ? new Date() : this.carData.carHandover;
      this.carData.dueOfContract = new Date();
      this.carData.dateOfArrival = new Date();
      this.carData.dateOfLeaving = new Date();
      this.carData.documentsHandover = new Date();
      this.carData.dateOfContract = new Date();
    }
  }

  public changeAllDateFieldIfEmptyElseOnlyThisOne(dateString: string, item: string) {
    const date = new Date(dateString);
    if (this.carData.dateOfContract != null && this.carData.dueOfContract != null) {
      this.carData[item] = new Date(date);
    } else {
      this.carData.carHandover = new Date(date);
      this.carData.dueOfContract = new Date(date);
      this.carData.dateOfArrival = new Date(date);
      this.carData.dateOfLeaving = new Date(date);
      this.carData.documentsHandover = new Date(date);
      this.carData.dateOfContract = new Date(date);
    }
  }

  public saveUser(form: any) {
    this.companyData = null;
    if (this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = true;
      this.userData.fullName = form.value.fullName;
      this.userData.birthName = form.value.birthName;
      this.userData.zipCode = form.value.zipCode;
      this.userData.city = form.value.city;
      this.userData.address = form.value.address;
      this.userData.birthPlace = form.value.birthPlace;
      this.userData.nameOfMother = form.value.nameOfMother;
      this.userData.idCardNumber = form.value.idCardNumber;
      this.userData.nationality = form.value.nationality;
      this.userData.birthDate = form.value.birthDate;
      this.createClosingData();
    } else {
      this.isCompleteAddress = false;
    }
  }

  public saveCompany(form: any) {
    this.userData = null;
    if (this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = true;
      this.companyData.name = form.value.companyName;
      this.companyData.companyRegistrationNumber = form.value.companyRegistrationNumber;
      this.companyData.address.zipcode = form.value.zipCode;
      this.companyData.address.city = form.value.city;
      this.companyData.address.address = form.value.address;
      this.companyData.representation = form.value.representation;
      this.createClosingData();
    } else {
      this.isCompleteAddress = false;
    }
  }

  private createClosingData() {
    const closingData = {};
    closingData['car'] = this.carData;
    closingData['user'] = this.userData;
    closingData['company'] = this.companyData;
    closingData['witness1'] = this.witness1;
    closingData['witness2'] = this.witness2;
    closingData['representation'] = this.pickedRepresentation;
    closingData['remarkList'] = this.remarkList;
    closingData['typeOfBuying'] = this.pickedTypeOfBuying;
    sessionStorage.setItem('newCar', JSON.stringify(this.carData));

    this.dialogRef.close(closingData);
  }

  private nullCheckOnAddress(form: any): boolean {
    let nullCounter = 0;
    nullCounter = form.value.zipCode == null || form.value.zipCode.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.city == null || form.value.city.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.address == null || form.value.address.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    return Math.abs(nullCounter) === 3;
  }

  public checkZipCode(form: any) {
    if (form.value.zipCode && form.value.zipCode.length === 4 && !isNaN(form.value.zipCode)) {
      this.httpService.callZipCodeService(form.value.zipCode).subscribe(data => {
        this.userData.city = (data.zipCity).toUpperCase();
        form.value.city = (data.zipCity).toUpperCase();
      });
    }
  }

  public checkZipCodeForCompany(form: any) {
    if (form.value.zipCode && form.value.zipCode.length === 4 && !isNaN(form.value.zipCode)) {
      this.httpService.callZipCodeService(form.value.zipCode).subscribe(data => {
        this.companyData.address.city = (data.zipCity).toUpperCase();
        form.value.city = (data.zipCity).toUpperCase();
      });
    }
  }

  public pickPrivateOrCorporate() {
    this.userChooser = false;
  }

  get formData() {return <FormArray>this.remarkForm.get('description');}

}
