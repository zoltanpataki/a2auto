export class Salesmen {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface ISalesmen {
  id: number;
  name: string;
}
