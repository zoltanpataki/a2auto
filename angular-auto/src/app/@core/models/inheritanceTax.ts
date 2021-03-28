export class InheritanceTax {
  id:number;
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

export class InfoForInheritanceCalculation {
  stringKw: string;
  stringAge: string;
  stringCapacity: string;

  constructor(stringKw: string, stringAge: string, stringCapacity: string) {
    this.stringKw = stringKw;
    this.stringAge = stringAge;
    this.stringCapacity = stringCapacity;
  }
}

export class InheritanceChargeRequest {
  kw: string;
  age: string;

  constructor(kw: string, age: string) {
    this.kw = kw;
    this.age = age;
  }
}

export class InheritanceTaxInfoForChainedApiCall {
  capacity: number;
  carRegistry: number;
  charge: number;
  extraChargeAtSelling: number;
  kwh: number;
  inheritanceChargeRequest: InheritanceChargeRequest;
  capacityRequest: string;
  carRegistryRequest: string;
  extraChargeAtSellingRequest: string;


  constructor(capacity: number,
              carRegistry: number,
              charge: number,
              extraChargeAtSelling: number,
              kwh: number,
              inheritanceChargeRequest: InheritanceChargeRequest,
              capacityRequest: string,
              carRegistryRequest: string,
              extraChargeAtSellingRequest: string) {
    this.capacity = capacity;
    this.carRegistry = carRegistry;
    this.charge = charge;
    this.extraChargeAtSelling = extraChargeAtSelling;
    this.kwh = kwh;
    this.inheritanceChargeRequest = inheritanceChargeRequest;
    this.capacityRequest = capacityRequest;
    this.carRegistryRequest = carRegistryRequest;
    this.extraChargeAtSellingRequest = extraChargeAtSellingRequest;
  }
}

export class InheritanceTaxErrorResponse {
  errorMsg: string;
  wantInheritanceTaxCalculation: boolean;
  askForInheritanceTaxCalculation: string;

  constructor(errorMsg: string, wantInheritanceTaxCalculation: boolean, askForInheritanceTaxCalculation: string) {
    this.errorMsg = errorMsg;
    this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
    this.askForInheritanceTaxCalculation = askForInheritanceTaxCalculation;
  }
}
