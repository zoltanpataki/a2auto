export class ZipCode {
  id: number;
  code: string;
  zipCity: string;

  constructor(id: number, code: string, zipCity: string) {
    this.id = id;
    this.code = code;
    this.zipCity = zipCity;
  }
}
