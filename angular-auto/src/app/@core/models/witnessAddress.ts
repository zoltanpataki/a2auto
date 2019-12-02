export class WitnessAddress {
  id: number;
  zipcode: string;
  city: string;
  address: string;

  constructor(id: number, zipcode: string, city: string, address: string) {
    this.id = id;
    this.zipcode = zipcode;
    this.city = city;
    this.address = address;
  }
}
