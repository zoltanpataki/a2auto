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


  constructor(id: number, name: string, type: string, color: string, plateNumber: string, specification: string, bodyNumber: string, engineNumber: string, capacity: number, vintage: number, mileage: number, motExpiry: Date, price: number, cost: number, costDescriptions: string, dateOfArrival: Date, dateOfLeaving: Date, typeOfBuying: string, inheritanceTax: number, downPayment: number, payedAmount: number, kwh: number, carRegistry: string, documentsHandover: Date, dueOfContract: Date, carHandover: Date, dateOfContract: Date, sold: boolean, carOrTruck: string, salesman: string) {
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
  }
}
