import { writable } from "svelte/store";

const matrixA = {
  letter: "A",
  equation: "",
  val: [
    [1,2,3],
    [4,5,6]
  ]
};

export const currentMatrix = writable(matrixA);
export const matrixs = writable([
  matrixA
]);
