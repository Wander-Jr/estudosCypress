
describe('Trabalhando com o tempo',() => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Voltadno no passado', () => {

        const date = new Date(1987,6,4,7,0,10)
        cy.clock(date.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '04/07/1987')
    })
    
    it.only('Avançando para o futuro', () => {
        
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain','1614')
        cy.get('#resultado > span').invoke('text')
            .then(parseFloat)
            .should('be.gt',1614351054798)

        cy.get('#resultado').should(($span) => {
            expect($span).to.contain('161')
        })

        cy.clock()// zerar o tempo
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()

        cy.get('#resultado > span')
            .invoke('text')
            .then(parseFloat)
            .should('lte',15000)

        cy.tick(15000)// avançar no tempo
         
        
        cy.get('#resultado > span')
            .invoke('text')
            .then(parseFloat)
            .should('lte',5000)


    })
})