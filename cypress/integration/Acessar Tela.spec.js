///<reference types = 'cypress'/>

before(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')


});

it('Acessar a tela do curso',() => {
    cy.title().should('contain', 'Campo de Treinamento')
});

it('Acessar a tela do curso asserção 2' ,() => {

    cy.title().should('contain', 'Campo de Treinamento')
      .and('include', 'Treinamento')
}); 

it('Acessar a tela do curso asserção 3' ,() => {
    cy.title().should('be.equal', 'Campo de Treinamento')
      .and('include', 'Treinamento')
}); 
