export class Address {
  id:number;
  zipcode: string;
  country: string;
  city: string;
  address: string;

  constructor(id: number, zipcode: string, country: string, city: string, address: string) {
    this.id = id;
    this.zipcode = zipcode;
    this.country = country;
    this.city = city;
    this.address = address;
  }
}
