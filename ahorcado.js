class Ahorcado {
  constructor(palabras, palabraParaPrueba = null) {
    this.palabras = palabras;
    this.palabra = palabraParaPrueba || this.seleccionarPalabra();
    this.estado = '_'.repeat(this.palabra.length);
    this.letrasIncorrectas = [];
    this.intentos = 0;
    this.vidasRestantes = 6;
  }

  seleccionarPalabra() {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio];
  }

  getEstado() {
    return this.estado;
  }

  reiniciar() {
    this.palabra = this.seleccionarPalabra();
    this.estado = '_'.repeat(this.palabra.length);
    this.intentos = 0;
    this.letrasIncorrectas = [];
    this.vidasRestantes = 6; 
  }

  adivinar(letra) {
    if (this.palabra.includes(letra)) {
      let nuevoEstado = '';
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          nuevoEstado += letra;
        } else {
          nuevoEstado += this.estado[i];
        }
      }
      this.estado = nuevoEstado;
    } else {
      this.letrasIncorrectas.push(letra);
      this.intentos++;
      this.vidasRestantes--; 
    }
  }

  getLetrasIncorrectas() {
    return this.letrasIncorrectas;
  }

  esGanador() {
    return this.estado === this.palabra;
  }

  esPerdedor() {
    return this.vidasRestantes <= 0; 
  }

  getVidasRestantes() {
    return this.vidasRestantes;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Ahorcado;
}
