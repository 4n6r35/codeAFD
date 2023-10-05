const readline = require('readline');

// Crear una interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definir el conjunto de estados del AFD
const estados = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', 'A1', 'B1', 'C1', 'D1',
  'E1', 'F1', 'G1'
];

tv = ['Carrera','Cra','kra','Calle','calle','Cl','Avenida','Av']

const numSin2 = ['1','2','3','4','5','6','7','8','9']
const prim4num = [1,2,3,4] 
const ult4num = [6,7,8,9] 

// Estado de aceptación
const estadoAceptacion = 'C';

// Matriz de transición del AFD
const matrizTransicion = {
  'A': { 'tv': 'B' },
  'B': { 'numSin2': 'C', '0': 'D' },
  'C': { 'dig': 'E' },
  'D': { '0': 'F' },
  'E': { 'dig': 'G' },
  'F': { 'num': 'H' },
  'G': { 'suf': 'I', 'simb': 'J' },
  'H': { 'suf': 'K', 'simb': 'L' },
  'I': { 'simb': 'J' },
  'J': { '0': 'M', 'numSin2': 'N' },
  'K': { 'simb': 'L' },
  'L': { '0': 'O', 'numSin2': 'P' },
  'M': { '0': 'Q' },
  'N': { 'dig': 'R' },
  'O': { '0': 'S' },
  'P': { 'dig': 'T' },
  'Q': { 'num': 'U' },
  'R': { 'dig': 'U', '-': 'V' },
  'S': { 'num': 'W' },
  'T': { 'dig': 'W' },
  'U': { 'suf': 'X', '-': 'V' },
  'V': { '5': 'Y', 'ult4num': 'Z' },
  'W': { 'suf': 'A1', '-': 'B1' },
  'X': { '-': 'V' },
  'Y': { 'num': 'C1' },
  'Z': { 'dig': 'C1' },
  'A1': { '-': 'B1' },
  'B1': { '0': 'C1' }
};

// Función para validar una dirección
function validarDireccion(direccion) {
  let estadoActual = 'A';

  for (const simbolo of direccion.split(" ")) {
    const transiciones = matrizTransicion[estadoActual];
    const alpha = Object.keys(matrizTransicion[estadoActual]);
    console.log(alpha)
    if(alpha == 'tv'){
      const find = tv.find((simb) => simb == simbolo)
      console.log(find)
    }
    const estadoSiguiente = transiciones[alpha];
    
    if (!estadoSiguiente) {
      return false; // No hay transición válida para el símbolo
    }
    
    estadoActual = estadoSiguiente;
  }

  // for (const simbolo of direccion) {
  //   const transiciones = matrizTransicion[estadoActual];
  //   const estadoSiguiente = transiciones[simbolo];
    
  //   if (!estadoSiguiente) {
  //     return false; // No hay transición válida para el símbolo
  //   }
    
  //   estadoActual = estadoSiguiente;
  // }

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
    
    // Continuar leyendo direcciones
    leerDireccion();
  });
}

// Iniciar la lectura de direcciones
leerDireccion();
