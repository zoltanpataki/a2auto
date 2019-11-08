import {Address} from "./address";

export class Company {

  id?: number;
  name: string;
  address: Address;
  companyRegistrationNumber: string;
  representation: string;

  constructor(id: number, name: string, address: Address, companyRegistrationNumber: string, representation: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.companyRegistrationNumber = companyRegistrationNumber;
    this.representation = representation;
  }
}
