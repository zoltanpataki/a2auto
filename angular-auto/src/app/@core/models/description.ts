export class Description {
  id: number;
  description: string;
  type: string;

  constructor(id: number, description: string, type: string) {
    this.id = id;
    this.description = description;
    this.type = type;
  }
}
