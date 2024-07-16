const Ahorcado = require('./Ahorcado')

test('debería iniciar el juego con una palabra oculta de un conjunto de palabras', () => {
  const palabras = ['javascript', 'programacion', 'desarrollo'];
  const juego = new Ahorcado(palabras);
  expect(juego.getEstado()).toBe('_'.repeat(juego.palabra.length));
});

test('debería permitir al jugador adivinar letras', () => {
  const palabras = ['javascript'];
  const juego = new Ahorcado(palabras);
  juego.adivinar('j');
  expect(juego.getEstado()).toBe('j_________');
});

test('debería llevar un registro de las letras adivinadas incorrectamente', () => {
  const palabras = ['javascript'];
  const juego = new Ahorcado(palabras);
  juego.adivinar('x');
  expect(juego.getLetrasIncorrectas()).toEqual(['x']);
});

test('debería indicar si el jugador ha ganado', () => {
  const palabras = ['javascript'];
  const juego = new Ahorcado(palabras);
  juego.adivinar('j');
  juego.adivinar('a');
  juego.adivinar('v');
  juego.adivinar('s');
  juego.adivinar('c');
  juego.adivinar('r');
  juego.adivinar('i');
  juego.adivinar('p');
  juego.adivinar('t');
  expect(juego.esGanador()).toBe(true);
});

test('debería indicar si el jugador ha perdido', () => {
  const palabras = ['javascript'];
  const juego = new Ahorcado(palabras);
  juego.adivinar('x');
  juego.adivinar('y');
  juego.adivinar('z');
  juego.adivinar('w');
  juego.adivinar('q');
  juego.adivinar('m');
  expect(juego.esPerdedor()).toBe(true);
});

test('Debe seleccionar una palabra del conjunto proporcionado', () => {
  const palabras = ['javascript', 'programacion', 'desarrollo'];
  const game = new Ahorcado(palabras);
  const selectedWord = game.seleccionarPalabra(palabras);
  expect(palabras).toContain(selectedWord);
});

test('Debe reiniciar el estado del juego correctamente', () => {
  const palabras = ['javascript'];
  const game = new Ahorcado(palabras);
  game.adivinar('a');
  game.reiniciar(palabras);
  expect(game.getEstado()).toBe('__________'); // 10 guiones bajos para 'javascript'
  expect(game.getLetrasIncorrectas()).toEqual([]);
  expect(game.intentos).toBe(0);
});

test('Debe incrementar los intentos y añadir la letra a las incorrectas cuando se adivina una letra incorrecta', () => {
  const palabras = ['javascript'];
  const game = new Ahorcado(palabras);
  game.adivinar('z');
  expect(game.getEstado()).toBe('__________');
  expect(game.getLetrasIncorrectas()).toEqual(['z']);
  expect(game.intentos).toBe(1);
});

test('Debe reconocer cuando se ha ganado el juego', () => {
  const palabras = ['a'];
  const game = new Ahorcado(palabras);
  game.adivinar('a');
  expect(game.esGanador()).toBe(true);
});

test('Debe reconocer cuando se ha perdido el juego', () => {
  const palabras = ['a'];
  const game = new Ahorcado(palabras);
  const letrasIncorrectas = ['b', 'c', 'd', 'e', 'f', 'g'];
  letrasIncorrectas.forEach(letra => game.adivinar(letra));
  expect(game.esPerdedor()).toBe(true);
});
