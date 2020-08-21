export class Organizer {
  value: string;
  viewValue: string;
  direction: Direction;

  constructor(value: string, viewValue:string, direction: Direction) {
    this.value = value;
    this.viewValue = viewValue;
    this.direction = direction;
  }
}

export enum Direction {
  up,
  down
}

