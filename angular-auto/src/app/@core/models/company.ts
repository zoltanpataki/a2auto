import {Address} from "./address";

export class Company {

  id?: number;
  name: string;
  address: Address;
  companyRegistrationNumber: string;
  representation: string;
  taxNumber: string;
  phoneNumber: string;
  email: string;


  constructor(id: number, name: string, address: Address, companyRegistrationNumber: string, representation: string, taxNumber: string, phoneNumber: string, email: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.companyRegistrationNumber = companyRegistrationNumber;
    this.representation = representation;
    this.taxNumber = taxNumber;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
