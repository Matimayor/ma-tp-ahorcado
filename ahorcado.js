class Ahorcado {
  constructor(palabras, palabraParaPrueba = null) {
    this.palabras = palabras;
    this.palabra = palabraParaPrueba || this.seleccionarPalabra();
    this.estado = '_'.repeat(this.palabra.length);
    this.letrasIncorrectas = [];
    this.letrasCorrectas = [];
    this.intentos = 0;
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
    this.estado = Array(this.palabra.length).fill('_').join('');
    this.intentos = 0;
    this.letrasIncorrectas = [];
    this.letrasCorrectas = [];
  }

  adivinar(letra) {
    if (!this.esLetraValida(letra)) {
      return;
    }

    if (this.letrasCorrectas.includes(letra) || this.letrasIncorrectas.includes(letra)) {
      return;
    }

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
      this.letrasCorrectas.push(letra);
    } else {
      this.letrasIncorrectas.push(letra);
      this.intentos++;
    }
  }

  esLetraValida(letra) {
    return /^[a-zA-Z]$/.test(letra);
  }

  getLetrasIncorrectas() {
    return this.letrasIncorrectas;
  }

  esGanador() {
    return this.estado === this.palabra;
  }

  esPerdedor() {
    return this.intentos >= 6; // 6 intentos incorrectos como límite
  }

  getVidasRestantes() {
    return 6 - this.intentos; // Calcula las vidas restantes
  }
}
