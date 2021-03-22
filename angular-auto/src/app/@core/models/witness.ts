import {WitnessAddress} from "./witnessAddress";

export class Witness {
  id: number;
  witnessAddress: WitnessAddress;
  idCardNumber: string;
  name: string;

  constructor(id: number, witnessAddress: WitnessAddress, idCardNumber: string, name: string) {
    this.id = id;
    this.witnessAddress = witnessAddress;
    this.idCardNumber = idCardNumber;
    this.name = name;
  }
}

export interface IWitness {
  id: number;
  witnessAddress: WitnessAddress;
  idCardNumber: string;
  name: string;
}
