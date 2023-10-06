const readline = require('readline');

// Crear una interfaz para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function fixExpression(data,symbol) {
  const position = data.indexOf(symbol);
  return data.replace(symbol,` ${symbol} `).split(" ").filter(x => x.length > 0);
}

function fixExpressionArr(dataArr,symbol) {
  const position = dataArr.lastIndexOf(symbol);
  return dataArr.reduce((prev,curr) => {
      if(curr.includes(symbol)){
          return [...prev, ...fixExpression(curr, symbol)]
      }
      return [...prev, curr]
  },[]);
}

function reduceExpression(expressionArr){
 return expressionArr.reduce((prev, curr) => {
     
       const existMiddleLine = curr.includes("-")
       const existAlmoadilla = curr.includes("#")
       
     
      if(existMiddleLine && curr.length > 1){
          return  [...prev, ...fixExpression(curr, "-")]   
     }
     
     if(existAlmoadilla && curr.length > 1){
         return [...prev, ...fixExpression(curr, "#")]   
     }
     
    
     
     return [...prev, curr]
 }, [])
}

function splitAddress(address = "") {
 const addressFirstSplit = address.split(" ").filter(x => x.length > 0);
 const hasMiddleLine = addressFirstSplit.some(x => x.includes("-"))
 const hasAlmoadilla = addressFirstSplit.some(x => x.includes("#"))
 
 return reduceExpression(addressFirstSplit);
}


// Definir el conjunto de estados del AFD
const estados = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', 'A1', 'B1', 'C1', 'D1',
  'E1', 'F1', 'G1'
];

const tv = ['Carrera','Cra','kra','Calle','calle','Cl','Avenida','Av']

const numSin2 = [1,3,4,5,6,7,8,9]
const prim4num = [1,2,3,4] 
const ult4num = [6,7,8,9] 
const num = [1,2,3,4,5,6,7,8,9]
const dig = [0, ...num]
const simb = ['#','No']

// Estado de aceptación
const estadoAceptacion = 'C1';
////, '0':{'value':'0', 'estado_prox':'D' }//
// Matriz de transición del AFD
//A = {'tv':{'value':tv, 'estado_prox': 'B' } };
//B = { 'numSin2': {'value': numSin2, estado_prox: 'C'} , '0':{'value':0, estado_prox:D }  }
//C = {'dig':{'value': dig, 'estado_prox': 'E'}}
//D = { '0':{'value':0, 'estado_prox':'F' }}
const matrizTransicion = {
  'A': { 'tv':{'value':tv, 'estado_prox': 'B' } },  //'A': { 'tv': 'B' },
  'B': { 'numSin2': {'value': numSin2, 'estado_prox': 'C'}   },//{ 'numSin2': 'C', '0': 'D' },
  'C': { 'dig':{'value': dig, 'estado_prox': 'E'} },
  'D': { '0':{'value':0, 'estado_prox': 'F' } },
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


  // let word = "";
  // for(const symbol of direccion) {
  //   const transiciones = matrizTransicion[estadoActual];
  //   const definiciones = Object.entries(transiciones);

  //   definiciones.forEach(([alphabet, value]) => {
        
  //   });

  // }

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
    // estado B
    if(estadoActual =='B'){
      for (let definition of definiciones){
        let def = transiciones[definition].value
        //for (const char of simbolo) { 
          find = def.length == 1 ? def : def.find((simb) => simb == simbolo[0])
          console.log(find)
          direccion = direccion.replace(simbolo[0], "")
          definicion = find != undefined ?  definition : find
        //}
      }
    }
    // estado C
    if(estadoActual == 'C'){ 
      for (let definition of definiciones){
        let def = transiciones[definition].value
        find = def.value.find((simb) => simb == simbolo[0])
        console.log(find)
        definicion = find != undefined ?  definiciones : find
      }
    }

    //Estado 
    if(estadoActual == 'D'){ 
      find = transiciones[definiciones].value.find((simb) => simb == simbolo)
      console.log(find)
      definicion = find != undefined ?  definiciones : find
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
    
    // Continuar leyendo direcciones
    leerDireccion();
  });
}

// Iniciar la lectura de direcciones
leerDireccion();
