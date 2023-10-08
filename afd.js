const { log } = require('console');
const readline = require('readline');

// Crear una interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tv = ['Carrera','Cra','kra','Calle','calle','Cl','Avenida','Av']
const suf = ['A','B','C','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const numSin2 = [1,3,4,5,6,7,8,9]
const prim4num = [1,2,3,4] 
const ult4num = [6,7,8,9] 
const num = [1,2,3,4,5,6,7,8,9]
const dig = [0, ...num]
const simb = ['#','No']

// Estado de aceptación
const estadoAceptacion = 'C1';

// L = { '0':{'value': '0', 'estado_prox': 'O' } , 'numSin2': {'value': numSin2, 'estado_prox': 'P'}}

const matrizTransicion = {
  'A': { 'tv':{'value':tv, 'estado_prox': 'B' }},  //'A': { 'tv': 'B' },
  'B': { 'numSin2': {'value': numSin2, 'estado_prox': 'C'}, '0':{'value':'0', 'estado_prox':'D'}},//{ 'numSin2': 'C', '0': 'D' },
  'C': { 'dig':{'value': dig, 'estado_prox': 'E'} },
  'D': { '0':{'value': '0', 'estado_prox': 'F' }},
  'E': { 'dig':{'value': dig, 'estado_prox': 'G'}},
  'F': { 'num': {'value': num, 'estado_prox':'H'}},
  'G': { 'suf':{'value': suf, 'estado_prox':'I'}}, //, 'simb': 'J'
  'H': { 'suf': {'value':suf, 'estado_prox':'K'}}, // simb: 'L'
  'I': { 'simb':{'value': simb, 'estado_prox': 'J'}},
  'J': { '0':{'value':'0', 'estado_prox':'M'}}, //'numSin2': 'N'
  'K': { 'simb':{'value': simb, 'estado_prox': 'L'}},
  'L': { '0':{'value': '0', 'estado_prox': 'O' }, 'numSin2': {'value': numSin2, 'estado_prox': 'P'} },
  'M': { '0':{'value':'0', 'estado_prox':'Q'}},
  'N': { 'dig': 'R' },
  'O': { '0':{'value':'0', 'estado_prox':'S'}},
  'P': { 'dig':{'value': dig, 'estado_prox': 'T'}},
  'Q': { 'num': {'value': num, 'estado_prox': 'U'}},
  'R': { 'dig': 'U', '-': 'V' },
  'S': { 'num': {'value': num, 'estado_prox': 'W'}},
  'T': { 'dig':{'value': dig, 'estado_prox': 'W'} },
  'U': { 'suf': {'value': suf, 'estado_prox': 'X'}}, //'-': 'V'
  'V': { '5': {'value': '5', 'estado_prox': 'Y'}}, //'ult4num': 'Z'
  'W': { 'suf': {'value': suf, 'estado_prox': 'A1'}}, //'-': {'value': '-', 'estado_prox': 'B1'}
  'X': { '-': {'value': '-', 'estado_prox': 'V'}},
  'Y': { 'num': {'value': num, 'estado_prox': 'C1'}},
  'Z': { 'dig': 'C1' },
  'A1': { '-': {'value': '-', 'estado_prox': 'Y'}},
  'B1': { '0': 'C1' }
};

// Función para validar una dirección
function validarDireccion(direccion) {
  let estadoActual = 'A';
  for (const simbolo of direccion.split(" ")) { //splitAddress(direccion)
    let find
    let definicion
    const transiciones = matrizTransicion[estadoActual];
    const definiciones = Object.keys(transiciones);
                              // console.log(definiciones) //  console.log(transiciones[definiciones].value)
      // estado A
    
      if(estadoActual == 'A'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, "")
    }

    if(estadoActual == 'A1'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    // estado B
    if(estadoActual =='B'){
      for (let definition of definiciones){
        let def = transiciones[definition].value
        //for (const char of simbolo) { 
          find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
          console.log(find)

          if (simbolo[0] === '0') {
            direccion = direccion.replace(simbolo[0], " ")
            definicion = find != undefined ?  definition : find
            break;
          }
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ?  definition : find
        //}
      }
    }
    // estado C
    if(estadoActual =='C'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
          console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='D'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        if (simbolo[0] === '0') {
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ?  definiciones : find
          break;
        }
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='E'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='F'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual == 'G'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    if (estadoActual === 'H') {
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    if(estadoActual == 'I'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    if(estadoActual =='J'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual == 'K'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    if(estadoActual =='L'){
      for (let definition of definiciones){
        let def = transiciones[definition].value
        //for (const char of simbolo) { 
          find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
          console.log(find)

          if (simbolo[0] === '0') {
            direccion = direccion.replace(simbolo[0], " ")
            definicion = find != undefined ?  definition : find
            break;
          }
          direccion = direccion.replace(simbolo[0], " ")
          definicion = find != undefined ?  definition : find
        //}
      }
    }

    if(estadoActual =='M'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='O'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='P'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='Q'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='S'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='T'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual == 'U'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    //----
    if(estadoActual =='V'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if (estadoActual === 'W') {
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
      direccion = direccion.replace(simbolo, " ")
    }

    if(estadoActual == 'X'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    if(estadoActual =='Y'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
        console.log(find)
        direccion = direccion.replace(simbolo[0], " ")
        definicion = find != undefined ?  definiciones : find
      }
    }

    const estadoSiguiente = definicion != undefined ? transiciones[definicion].estado_prox : definicion ;

    if (!estadoSiguiente) {
      return false; // No hay transición válida para el símbolo
    }
    estadoActual = estadoSiguiente;
  }

  return estadoActual === estadoAceptacion;
}

// Leer una dirección desde la consola
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