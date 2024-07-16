// script.js
document.addEventListener('DOMContentLoaded', () => {
  const palabras = ['javascript', 'programacion', 'desarrollo', 'frontend', 'backend'];
  const game = new Ahorcado(palabras);
  const wordElement = document.getElementById('word');
  const incorrectLettersElement = document.getElementById('incorrect-letters');
  const guessInput = document.getElementById('guess-input');
  const guessButton = document.getElementById('guess-button');
  const messageElement = document.getElementById('message');

  function updateDisplay() {
    wordElement.textContent = game.getEstado();
    incorrectLettersElement.textContent = `Letras incorrectas: ${game.getLetrasIncorrectas().join(', ')}`;
  }

  guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (guess && guess.length === 1) {
      game.adivinar(guess);
      guessInput.value = '';
      updateDisplay();
      
      if (game.esGanador()) {
        messageElement.textContent = '¡Has ganado!';
        guessInput.disabled = true;
        guessButton.disabled = true;
      } else if (game.esPerdedor()) {
        messageElement.textContent = 'Has perdido. La palabra era: ' + game.palabra;
        guessInput.disabled = true;
        guessButton.disabled = true;
      }
    }
  });

  updateDisplay();
});
