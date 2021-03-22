export class Salesmen {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface ISalesman {
  id: number;
  name: string;
}
