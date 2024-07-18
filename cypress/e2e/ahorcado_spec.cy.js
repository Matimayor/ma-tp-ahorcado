describe('Juego de Ahorcado', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('debería mostrar el título del juego', () => {
    cy.get('h1').should('contain.text', 'Juego de Ahorcado');
  });

  it('debería mostrar guiones para representar la palabra a adivinar', () => {
    cy.get('#word').children('span').should('have.length.greaterThan', 0);
  });

  it('debería permitir al jugador adivinar una letra correcta', () => {
    cy.get('#guess-input').type('a');
    cy.get('#guess-button').click();
    
    cy.wait(500); 
    
    cy.get('#word').children('span').should('contain.text', 'A');
  });
  
  it('debería permitir al jugador adivinar una letra incorrecta', () => {
    cy.get('#guess-input').type('z');
    cy.get('#guess-button').click();
    cy.get('#incorrect-letters').should('contain.text', 'z');
  });

  it('debería indicar cuando el jugador ha ganado', () => {  
    const correctLetters = ['d', 'e', 's', 'a', 'r', 'o', 'l'];
    correctLetters.forEach((letra) => {
      cy.get('#guess-input').type(letra, { force: true });
      cy.get('#guess-button').click({ force: true });
    });
    cy.get('#message').should('contain.text', '¡Has ganado!');
  });
  

  it('debería indicar cuando el jugador ha perdido', () => {  
    const incorrectLetters = ['x', 'y', 'z', 'w', 'v', 'u'];
    incorrectLetters.forEach((letra) => {
      cy.get('#guess-input').type(letra, { force: true });
      cy.get('#guess-button').click({ force: true });
    });
    cy.get('#message').should('contain.text', 'Has perdido');
  });

  it('no debería permitir ingresar números', () => {
    cy.get('#guess-input').type('1');
    cy.get('#guess-button').click();
    cy.get('#incorrect-letters').should('not.contain.text', '1');
    cy.get('#guess-input').should('have.value', '');
  });

  it('no debería permitir ingresar símbolos especiales', () => {
    cy.get('#guess-input').type('@');
    cy.get('#guess-button').click();
    cy.get('#incorrect-letters').should('not.contain.text', '@');
    cy.get('#guess-input').should('have.value', '');
  });

  it('no debería permitir letras repetidas', () => {
    cy.get('#guess-input').type('a');
    cy.get('#guess-button').click();
    cy.get('#guess-input').type('a');
    cy.get('#guess-button').click();
    cy.get('#message').should('contain.text', 'Ya has adivinado esa letra. Intenta con otra.');
  });
});
