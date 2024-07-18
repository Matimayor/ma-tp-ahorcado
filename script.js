document.addEventListener('DOMContentLoaded', () => {
  const palabras = ['javascript', 'programacion', 'desarrollo', 'frontend', 'backend'];
  const game = new Ahorcado(palabras, 'desarrollo');
  const wordElement = document.getElementById('word');
  const incorrectLettersElement = document.getElementById('incorrect-letters');
  const guessInput = document.getElementById('guess-input');
  const guessButton = document.getElementById('guess-button');
  const messageElement = document.getElementById('message');
  const livesElement = document.getElementById('lives'); // Elemento para mostrar vidas restantes

  function updateDisplay() {
    // Limpiar elementos actuales
    wordElement.innerHTML = '';
    incorrectLettersElement.textContent = `Letras incorrectas: ${game.getLetrasIncorrectas().join(', ')}`;

    // Mostrar la palabra a adivinar con guiones
    const wordToGuess = game.getEstado();
    wordToGuess.split('').forEach(letter => {
      const letterElement = document.createElement('span');
      letterElement.textContent = letter === '_' ? '_' : letter.toUpperCase(); // Mostrar guiones sin cambios
      wordElement.appendChild(letterElement);
      wordElement.appendChild(document.createTextNode(' ')); // Añadir un espacio después de cada letra o guión
    });

    // Mostrar vidas restantes
    livesElement.textContent = `Vidas restantes: ${game.getVidasRestantes()}`;
  }

  guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    
    // Validaciones
    if (!/^[a-z]$/.test(guess)) {
      messageElement.textContent = 'Por favor, ingrese solo una letra válida (a-z).';
      guessInput.value = '';
      return;
    }

    if (game.getLetrasIncorrectas().includes(guess) || game.getEstado().includes(guess)) {
      messageElement.textContent = 'Ya has adivinado esa letra. Intenta con otra.';
      guessInput.value = '';
      return;
    }

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
    } else {
      messageElement.textContent = ''; // Limpiar el mensaje de error si la validación fue exitosa
    }
  });

  updateDisplay();
});
