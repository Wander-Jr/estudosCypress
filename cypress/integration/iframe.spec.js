///<reference types = 'cypress'/>
 
describe('Trabalhando com Iframes',() => {

    it.only('Deve preencher o campo de texto',() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            
            cy.wrap(body).find('#tfield')
                .type('Teste')
                .should('have.value','Teste')
        })
    })

    it('Deve testar o frame direto',() => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it('Deve testar o frame direto com stub',() => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        const stub = cy.stub().as('Alerta')

        cy.on('window:alert',stub)

        cy.get('#otherButton').click()
            .then(() =>{
                expect(stub.getCall(0)).to.be.calledWith('Click OK!')
            })  
        cy.get('#tfield').type('teste wander').should('have.value','teste wander')
        
    })
})

 