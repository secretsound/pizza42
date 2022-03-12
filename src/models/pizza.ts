import { Pizza } from './products';

const pizzaArray = [
  {
    sku: 'sku-p0001',
    title: 'Three Cheese',
    image:
      'https://imgs.search.brave.com/KIW1KlMUH5sL-1BpCzgQVciR8NxbocIjBouM2XaSreg/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/bW9kZXJuaG9uZXku/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA1L1RoZS1C/ZXN0LTMtQ2hlZXNl/LVdoaXRlLVBpenph/LTMuanBn',
    stars: 3.5,
    description: 'Delicious three cheese pizza!',
    price: 10.5,
  },
  {
    sku: 'sku-p0002',
    title: 'Pepperoni',
    image:
      'https://imgs.search.brave.com/8-5CyUAD0rp6l00VJ4mrgAZXbP7aPssgEExfFPqoon4/rs:fit:691:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC50/ZEdPU1pmNjBJNDN4/enlZVFczZTJBSGFG/RiZwaWQ9QXBp',
    stars: 4,
    description: 'All around classic!',
    price: 12.0,
  },
  {
    sku: 'sku-p0003',
    title: 'Meatzilla',
    image:
      'https://imgs.search.brave.com/K-tctGCrS5PA9bDzNMHvC3lbq0jiA7WkIUeFdhKAteE/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5u/bkQ2Yk15NW5vdHct/dElJQkgtTzZ3SGFF/OCZwaWQ9QXBp',
    stars: 4.5,
    description: 'Want more meat?',
    price: 14.0,
  },
  {
    sku: 'sku-p0004',
    title: 'Vegironi',
    image:
      'https://imgs.search.brave.com/unBTPvjcyTY8cPSo1M-06jQciiE5ybCG9NxXlMtsgUU/rs:fit:720:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5I/MmlDdWdwMWV2RGV2/M2tJTERzdXhnSGFF/NCZwaWQ9QXBp',
    stars: 4,
    description: 'For the Vegi lovers out there!',
    price: 10.0,
  },
];

export function getPizzaOpts() {
  const pizzaOpts: Array<Pizza> = [];
  for (const i of pizzaArray) {
    pizzaOpts.push(
      new Pizza(i.sku, i.title, i.description, i.stars, i.image, i.price)
    );
  }
  return pizzaOpts;
}
