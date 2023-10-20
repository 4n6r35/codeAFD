const { log } = require('console');
const readline = require('readline');

// Interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tv = ['Carrera', 'Cra', 'Kra', 'Calle', 'Cl', 'Avenida', 'Av']
const suf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const numSin2 = [1, 3, 4, 5, 6, 7, 8, 9]
const prim4num = [1, 2, 3, 4]
const ult4num = [6, 7, 8, 9]
const num = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const dig = [0, ...num]
const simb = ['#', 'No']

// Estado de aceptación
const estadoAceptacion = 'C1';
const matrizTransicion = {
  'A': { 'tv': { 'value': tv, 'estado_prox': 'B' } }, 
  'B': { 'numSin2': { 'value': numSin2, 'estado_prox': 'C' }, '0': { 'value': '0', 'estado_prox': 'D' } },
  'C': { 'dig': { 'value': dig, 'estado_prox': 'E' } },
  'D': { 'dig': { 'value': dig, 'estado_prox': 'F' } },
  'E': { 'dig': { 'value': dig, 'estado_prox': 'G' } },
  'F': { 'num': { 'value': num, 'estado_prox': 'H' } },
  'G': { 'suf': { 'value': suf, 'estado_prox': 'I' }, 'simb': { 'value': simb, 'estado_prox': 'J' } },
  'H': { 'suf': { 'value': suf, 'estado_prox': 'K' }, 'simb': { 'value': simb, 'estado_prox': 'L' } }, 
  'I': { 'simb': { 'value': simb, 'estado_prox': 'J' } },
  'J': { '0': { 'value': '0', 'estado_prox': 'M' }, 'numSin2': { 'value': numSin2, 'estado_prox': 'N' } }, 
  'K': { 'simb': { 'value': simb, 'estado_prox': 'L' } },
  'L': { '0': { 'value': '0', 'estado_prox': 'O' }, 'numSin2': { 'value': numSin2, 'estado_prox': 'P' } },
  'M': { '0': { 'value': '0', 'estado_prox': 'Q' } },
  'N': { 'dig': { 'value': dig, 'estado_prox': 'R' } }, 
  'O': { 'numSin2': { 'value': numSin2, 'estado_prox': 'S' }, '0': { 'value': '0', 'estado_prox': 'S' } },
  'P': { 'dig': { 'value': dig, 'estado_prox': 'T' } },
  'Q': { 'num': { 'value': num, 'estado_prox': 'U' } },
  'R': { 'dig': { 'value': dig, 'estado_prox': 'U' }, '-': { 'value': '-', 'estado_prox': 'V' } }, 
  'S': { 'dig': { 'value': dig, 'estado_prox': 'W' } },
  'T': { 'dig': { 'value': dig, 'estado_prox': 'W' } },
  'U': { 'suf': { 'value': suf, 'estado_prox': 'X' }, '-': { 'value': '-', 'estado_prox': 'V' } }, 
  'V': { '5': { 'value': '5', 'estado_prox': 'B1' }, 'prim4num': { 'value': prim4num, 'estado_prox': 'E1' } },
  'W': { 'suf': { 'value': suf, 'estado_prox': 'A1' }, '-': { 'value': '-', 'estado_prox': 'B1' } },
  'X': { '-': { 'value': '-', 'estado_prox': 'V' } },
  'Y': { 'num': { 'value': num, 'estado_prox': 'C1' } },
  'Z': { 'dig': { 'value': dig, 'estado_prox': 'C1' } },
  'A1': { '-': { 'value': '-', 'estado_prox': 'B1' } },
  'B1': { 'prim4num': { 'value': prim4num, 'estado_prox': 'E1' }, '0': { 'value': '0', 'estado_prox': 'D1' }, '5': { 'value': '5', 'estado_prox': 'F1' } },
  'C1': {}, //estado de aceptación
  'D1': { 'num': { 'value': num, 'estado_prox': 'C1' } },
  'E1': { 'dig': { 'value': dig, 'estado_prox': 'C1' } },
  'F1': { '0': { 'value': '0', 'estado_prox': 'C1' } }
};

// Función para validar una dirección
function validarDireccion(direccion) {
  let estadoActual = 'A';
  for (const simbolo of direccion.split(" ")) { //splitAddress(direccion)
    let find
    let definicion
    const transiciones = matrizTransicion[estadoActual];
    const definiciones = Object.keys(transiciones);
    
    // Estado A
    if (estadoActual == 'A') {
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)

      definicion = find != undefined ? definiciones : find
      direccion = direccion.replace(simbolo, " ");
    }

    //Estado A'
    if (estadoActual == 'A1') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado B
    if (estadoActual == 'B') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        
        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado B'
    if (estadoActual == 'B1') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    // Estado C
    if (estadoActual == 'C') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado D
    if (estadoActual == 'D') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        
        if (simbolo[0] === '0') {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definiciones : find
          break;
        }
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado D'
    if (estadoActual == 'D1') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado E
    if (estadoActual == 'E') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado E'
    if (estadoActual == 'E1') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado F
    if (estadoActual == 'F') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado F'
    if (estadoActual == 'F1') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado G
    if (estadoActual == 'G') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado H
    if (estadoActual === 'H') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo)
        console.log(find)

        if (find == simbolo) {
          direccion = direccion.replace(simbolo, " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado I
    if (estadoActual == 'I') {
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ? definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    //Estado J
    if (estadoActual == 'J') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado K
    if (estadoActual == 'K') {
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)

      definicion = find != undefined ? definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    //Estado L
    if (estadoActual == 'L') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado M
    if (estadoActual == 'M') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado N
    if (estadoActual == 'N') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado O
    if (estadoActual == 'O') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado P
    if (estadoActual == 'P') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado Q
    if (estadoActual == 'Q') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado R
    if (estadoActual == 'R') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado S
    if (estadoActual == 'S') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado T
    if (estadoActual == 'T') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado U
    if (estadoActual == 'U') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value

        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado V
    if (estadoActual == 'V') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value

        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado W
    if (estadoActual === 'W') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value

        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        if (find == simbolo[0]) {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ? definition : find
          break
        }
      }
    }

    //Estado X
    if (estadoActual == 'X') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado Y
    if (estadoActual == 'Y') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)

        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    //Estado Z
    if (estadoActual == 'Z') {
      for (let definition of definiciones) {
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ? definiciones : find
      }
    }

    const estadoSiguiente = definicion != undefined ? transiciones[definicion].estado_prox : definicion;

    if (!estadoSiguiente) {
      return false; // No hay transición válida, por lo que sale y evalua si cumple con el estado de aceptación
    }
    estadoActual = estadoSiguiente;
  }

  return estadoActual === estadoAceptacion;
}

// Leer una dirección desde consola
function leerDireccion() {

  rl.question('Ingrese una dirección: ', (direccion) => {
    if (validarDireccion(direccion)) {
      console.log(`La dirección "${direccion}" es válida.`);
    } else {
      console.log(`La dirección "${direccion}" no es válida.`);
    }

    leerDireccion();
  });
}

leerDireccion();