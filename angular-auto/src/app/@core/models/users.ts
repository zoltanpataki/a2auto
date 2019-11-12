export class Users {

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


  constructor(fullName: string, birthName: string, zipCode: string, city: string, address: string, birthPlace: string, phoneNumber: string, email: string, nameOfMother: string, birthDate: Date, personNumber: string, idCardNumber: string, dueTimeOfIdCard: string, drivingLicenceNumber: string, dueTimeOfDrivingLicence: string, taxNumber: string, healthcareNumber: string) {
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
  }
}
