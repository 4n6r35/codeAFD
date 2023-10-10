const tv = ["Carrera", "Cra", "kra", "Calle", "calle", "Cl", "Avenida", "Av"];
const suf = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const numSin2 = [1, 3, 4, 5, 6, 7, 8, 9];
const prim4num = [1, 2, 3, 4];
const ult4num = [...prim4num, 6, 7, 8, 9];
const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const dig = [0, ...num];
const simb = ["#", "No"];
const guion = ["-"];
const zero = [0];
const five = [5];

const alphabets = {
  0: tv,
  1: dig,
  2: num,
  3: suf,
  4: simb,
  5: numSin2,
  6: prim4num,
  7: ult4num,
  8: guion,
  9: zero,
  10: five,
};

const states = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  AA: 26,
  BB: 27,
  CC: 28,
  DD: 29,
  EE: 30,
  FF: 31,
};

const matriz = [
  ["B", null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "C", null, null, null, "D", null],
  [null, "E", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "F", null],
  [null, "G", null, null, null, null, null, null, null, null, null],
  [null, null, "H", null, null, null, null, null, null, null, null],
  [null, null, null, "I", "J", null, null, null, null, null, null],
  [null, null, null, "K", "L", null, null, null, null, null, null],
  [null, null, null, null, "J", null, null, null, null, null, null],
  [null, null, null, null, null, "N", null, null, null, "M", null],
  [null, null, null, null, "L", null, null, null, null, null, null],
  [null, null, null, null, null, "P", null, null, null, "O", null],
  [null, null, null, null, null, null, null, null, null, "Q", null],
  [null, "R", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "S", null],
  [null, "T", null, null, null, null, null, null, null, null, null],
  [null, null, "U", null, null, null, null, null, null, null, null],
  [null, "U", null, null, null, null, null, null, "V", null, null],
  [null, null, "W", null, null, null, null, null, null, null, null],
  [null, "W", null, null, null, null, null, null, null, null, null],
  [null, null, null, "X", null, null, null, null, "V", null, null],
  [null, null, null, null, null, null, null, "Z", null, null, "Y"],
  [null, null, null, "AA", null, null, null, null, "BB", null, null],
  [null, null, null, null, null, null, null, null, "V", null, null],
  [null, null, "CC", null, null, null, null, null, null, null, null],
  [null, "CC", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, "BB", null, null],
  [null, null, null, null, null, null, "EE", null, null, "DD", "FF"],
  [null, null, null, null, null, null, null, null, null, null, null],
  [null, null, "CC", null, null, null, null, null, null, null, null],
  [null, "CC", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "CC", null],
];

const direccion = "Cra 26 # 73c-114";

const direccion2 = direccion.split(" ");

direccion2.forEach((symbol) => {
  if (symbol !== "") {
    let breakLoop = false;

    let currentState = "A";

    for (let i = 0; i < matriz.length; i++) {
      const state = states[currentState];
      if (state === i) {
        for (let j = 0; j < matriz[0].length; j++) {
          const alphabet = alphabets[j];
          if (alphabet && Array.isArray(alphabet)) {
            if (alphabet.includes(symbol)) {
              currentState = matriz[i][j];
              breakLoop = true;
              break;
            }
          }
        }
      }

      if (breakLoop) {
        break;
      }
    }

    console.log(currentState)
  }
});
