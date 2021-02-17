export class Users {

  id: number;
  fullName: string;
  birthName: string;
  zipCode: string;
  city: string;
  address: string;
  birthPlace: string;
  phoneNumber: string;
  email: string;
  nameOfMother: string;
  birthDate: Date;
  personNumber: string;
  idCardNumber: string;
  dueTimeOfIdCard: string;
  drivingLicenceNumber: string;
  dueTimeOfDrivingLicence: string;
  taxNumber: string;
  healthcareNumber: string;
  nationality: string;


  constructor(id: number, fullName: string, birthName: string, zipCode: string, city: string, address: string, birthPlace: string, phoneNumber: string, email: string, nameOfMother: string, birthDate: Date, personNumber: string, idCardNumber: string, dueTimeOfIdCard: string, drivingLicenceNumber: string, dueTimeOfDrivingLicence: string, taxNumber: string, healthcareNumber: string, nationality: string) {
    this.id = id;
    this.fullName = fullName;
    this.birthName = birthName;
    this.zipCode = zipCode;
    this.city = city;
    this.address = address;
    this.birthPlace = birthPlace;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.nameOfMother = nameOfMother;
    this.birthDate = birthDate;
    this.personNumber = personNumber;
    this.idCardNumber = idCardNumber;
    this.dueTimeOfIdCard = dueTimeOfIdCard;
    this.drivingLicenceNumber = drivingLicenceNumber;
    this.dueTimeOfDrivingLicence = dueTimeOfDrivingLicence;
    this.taxNumber = taxNumber;
    this.healthcareNumber = healthcareNumber;
    this.nationality = nationality;
  }
}

export interface IUser {
  id: number;
  fullName: string;
  birthName: string;
  zipCode: string;
  city: string;
  address: string;
  birthPlace: string;
  phoneNumber: string;
  email: string;
  nameOfMother: string;
  birthDate: Date;
  personNumber: string;
  idCardNumber: string;
  dueTimeOfIdCard: string;
  drivingLicenceNumber: string;
  dueTimeOfDrivingLicence: string;
  taxNumber: string;
  healthcareNumber: string;
  nationality: string;
}

export class UserFilterRequest {
  filter: string;
  filterType: string;

  constructor(filter: string, filterType: string) {
    this.filter = filter;
    this.filterType = filterType;
  }
}
