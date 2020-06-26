export class InheritanceTax {
  id:number
  kw: string;
  young: number;
  mediumAged: number;
  old: number;

  constructor(id: number, kw: string, young: number, mediumAged: number, old: number) {
    this.id = id;
    this.kw = kw;
    this.young = young;
    this.mediumAged = mediumAged;
    this.old = old;
  }
}
