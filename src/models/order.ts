/* eslint-disable @typescript-eslint/ban-types */
interface order {
  readonly date: number;
  readonly total: number;
  readonly itemArray: Array<Object>;
}

export class Order implements order {
  readonly date: number;
  readonly total: number;
  readonly itemArray: Array<Object>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(price: number, items: Array<Object>) {
    console.log(items);
    this.date = Date.now();
    this.total = price;
    this.itemArray = items;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      date: this.date,
      price: this.total,
      order: this.itemArray,
    };
  }
}
