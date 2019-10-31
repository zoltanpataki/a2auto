export class InheritanceTax {
  kw: string;
  young: number;
  mediumAged: number;
  old: number;

  constructor(kw: string, young: number, mediumAged: number, old: number) {
    this.kw = kw;
    this.young = young;
    this.mediumAged = mediumAged;
    this.old = old;
  }
}
