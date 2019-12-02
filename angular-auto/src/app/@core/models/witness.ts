import {WitnessAddress} from "./witnessAddress";

export class Witness {
  id: number;
  address: WitnessAddress;
  idCardNumber: string;
  name: string;

  constructor(id: number, address: WitnessAddress, idCardNumber: string, name: string) {
    this.id = id;
    this.address = address;
    this.idCardNumber = idCardNumber;
    this.name = name;
  }
}
