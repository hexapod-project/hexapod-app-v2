export class Vector {
  x: number = 0;
  y: number = 0;

  constructor(props?: {x: number; y: number}) {
    const {x, y} = props ?? {};

    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  add(b: Vector): Vector {
    return new Vector({x: this.x + b.x, y: this.y + b.y});
  }

  toObject() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
