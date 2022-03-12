import { Guid } from 'guid-typescript';

export function randomGUID() {
  return Guid.raw();
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
