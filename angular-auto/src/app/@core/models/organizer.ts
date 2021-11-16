export class Organizer {
  value: string;
  viewValue: string;
  direction: Direction;
  icon: string;
  iconColor: string;

  constructor(value: string, viewValue:string, direction: Direction, icon: string, iconColor: string) {
    this.value = value;
    this.viewValue = viewValue;
    this.direction = direction;
    this.icon = icon;
    this.iconColor = iconColor;
  }
}

export enum Direction {
  up = 'up',
  down = 'down'
}

