export class InheritanceTax {
  id:number
  kW: string;
  young: number;
  mediumAged: number;
  old: number;

  constructor(id: number, kW: string, young: number, mediumAged: number, old: number) {
    this.id = id;
    this.kW = kW;
    this.young = young;
    this.mediumAged = mediumAged;
    this.old = old;
  }
}
