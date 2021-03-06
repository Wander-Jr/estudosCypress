/// <reference types = 'Cypress'/>

describe('Esperas',() =>{

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Esperando campo ficar visível',() => {

        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo')
            .type('Passou aqui!')
            .should('have.value', 'Passou aqui!')
    });

    it('Deve fazer retrys',() => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist').type('Passou aqui 2')

    })

    it('Usando comando Find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
        .find('span')
        .should('contain','Item 1')

        cy.get('#lista li span')
        .should('contain','Item 2')

        cy.get('#lista li span')
        .should('contain','Item 1')
        .and('contain', 'Item 2')
    });

    it('Usando timeout',() => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', { timeout: 100 }).should('not.exist')
    })

    it.only('Click retry',() => {
        var i;
        for (i = 0; i < 3; i++){
            cy.get('#buttonCount')
            .click()
            .should('have.value','1')

            
            
        } 
    });
});