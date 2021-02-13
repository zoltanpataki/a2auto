export class Car {
  id?: number;
  name: string;
  type: string;
  color: string;
  plateNumber : string;
  specification: string;
  bodyNumber: string;
  engineNumber: string;
  capacity: number;
  vintage: number;
  mileage: number;
  motExpiry: Date;
  price?: number;
  purchasingPrice?: number;
  cost?: number;
  costDescriptions: string;
  dateOfArrival?: Date;
  dateOfLeaving?: Date;
  typeOfBuying: string;
  inheritanceTax?: number;
  downPayment?: number;
  payedAmount?: number;
  kwh?: number;
  carRegistry: string;
  documentsHandover?: Date;
  dueOfContract?: Date;
  carHandover?: Date;
  dateOfContract?: Date;
  sold?: boolean;
  carOrTruck: string;
  salesman: string;
  insuranceNumber: string;
  weight: number;
  maxWeightAllowed: number;
  fuelType: string;
  nameOfBuyer: string;
  firstRegistration: Date;
  vehicleRegistrationCard: string;


  constructor(id: number, name: string, type: string, color: string, plateNumber: string, specification: string, bodyNumber: string, engineNumber: string, capacity: number, vintage: number, mileage: number, motExpiry: Date, price: number, purchasingPrice: number, cost: number, costDescriptions: string, dateOfArrival: Date, dateOfLeaving: Date, typeOfBuying: string, inheritanceTax: number, downPayment: number, payedAmount: number, kwh: number, carRegistry: string, documentsHandover: Date, dueOfContract: Date, carHandover: Date, dateOfContract: Date, sold: boolean, carOrTruck: string, salesman: string, insuranceNumber: string, weight: number, maxWeightAllowed: number, fuelType: string, nameOfBuyer: string, firstRegistration: Date, vehicleRegistrationCard: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.color = color;
    this.plateNumber = plateNumber;
    this.specification = specification;
    this.bodyNumber = bodyNumber;
    this.engineNumber = engineNumber;
    this.capacity = capacity;
    this.vintage = vintage;
    this.mileage = mileage;
    this.motExpiry = motExpiry;
    this.price = price;
    this.purchasingPrice = purchasingPrice;
    this.cost = cost;
    this.costDescriptions = costDescriptions;
    this.dateOfArrival = dateOfArrival;
    this.dateOfLeaving = dateOfLeaving;
    this.typeOfBuying = typeOfBuying;
    this.inheritanceTax = inheritanceTax;
    this.downPayment = downPayment;
    this.payedAmount = payedAmount;
    this.kwh = kwh;
    this.carRegistry = carRegistry;
    this.documentsHandover = documentsHandover;
    this.dueOfContract = dueOfContract;
    this.carHandover = carHandover;
    this.dateOfContract = dateOfContract;
    this.sold = sold;
    this.carOrTruck = carOrTruck;
    this.salesman = salesman;
    this.insuranceNumber = insuranceNumber;
    this.weight = weight;
    this.maxWeightAllowed = maxWeightAllowed;
    this.fuelType = fuelType;
    this.nameOfBuyer = nameOfBuyer;
    this.firstRegistration = firstRegistration;
    this.vehicleRegistrationCard = vehicleRegistrationCard;
  }
}

export interface ICar {
  id?: number;
  name: string;
  type: string;
  color: string;
  plateNumber : string;
  specification: string;
  bodyNumber: string;
  engineNumber: string;
  capacity: number;
  vintage: number;
  mileage: number;
  motExpiry: Date;
  price?: number;
  purchasingPrice?: number;
  cost?: number;
  costDescriptions: string;
  dateOfArrival?: Date;
  dateOfLeaving?: Date;
  typeOfBuying: string;
  inheritanceTax?: number;
  downPayment?: number;
  payedAmount?: number;
  kwh?: number;
  carRegistry: string;
  documentsHandover?: Date;
  dueOfContract?: Date;
  carHandover?: Date;
  dateOfContract?: Date;
  sold?: boolean;
  carOrTruck: string;
  salesman: string;
  insuranceNumber: string;
  weight: number;
  maxWeightAllowed: number;
  fuelType: string;
  nameOfBuyer: string;
  firstRegistration: Date;
  vehicleRegistrationCard: string;
}

export class CarFilterRequest {
  formValue: string;
  selectedFilterValue: string;
  soldOrNot: string;

  constructor(formValue: string, selectedFilterValue: string, soldOrNot: string) {
    this.formValue = formValue;
    this.selectedFilterValue = selectedFilterValue;
    this.soldOrNot = soldOrNot;
  }
}

export class CarUpdateModel {
  nameOfBuyer: string;
  salesman: string;
  clickedCarIndex: number;
  downPayment: number;

  constructor(nameOfBuyer: string, salesman: string, downPayment: number, clickedCarIndex: number) {
    this.nameOfBuyer = nameOfBuyer;
    this.salesman = salesman;
    this.clickedCarIndex = clickedCarIndex;
    this.downPayment = downPayment;
  }
}
