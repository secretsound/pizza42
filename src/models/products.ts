/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Guid } from 'guid-typescript';

export interface product {
  readonly sku: string;
  readonly title: string;
  readonly description: string;
  readonly stars: number;
  readonly picture: string;
  readonly price: number;
}

export class Product implements product {
  readonly sku: string;
  readonly title: string;
  readonly description: string;
  readonly stars: number;
  readonly picture: string;
  readonly price: number;

  guid: Guid;

  constructor(
    sku: string,
    title: string,
    description: string,
    stars: number,
    picture: string,
    price: number
  ) {
    this.sku = sku;
    this.title = title;
    this.description = description;
    this.stars = stars;
    this.picture = picture;
    this.price = price;
    this.guid = this.generateGuid();
  }

  generateGuid() {
    return Guid.create();
  }

  toJsonString(): string {
    return JSON.stringify({
      sku: this.sku,
      title: this.title,
      description: this.description,
      stars: this.stars,
      picture: this.picture,
      price: this.price,
    });
  }
}

export class Pizza extends Product implements product {
  constructor(
    sku: string,
    title: string,
    description: string,
    stars: number,
    picture: string,
    price: number
  ) {
    super(sku, title, description, stars, picture, price);
  }
}

export class Soda extends Product implements product {
  constructor(
    sku: string,
    title: string,
    description: string,
    stars: number,
    picture: string,
    price: number
  ) {
    super(sku, title, description, stars, picture, price);
  }
}
