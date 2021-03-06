///<reference types = 'cypress'/>

describe('Inserir informaões no campos de texto',() => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    it('Trabalhando com popup', () =>{
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })

        cy.get('#tfield')
        .type('Wander')
        .should('contain.text', 'Wander')
    })

    it('Deve invocar o popup chamado',() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win,'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })
})

describe.only('Trabalhando com links...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });
    
    it ('Checando url da popup',() => {
        
        cy.contains('Popup2') // Veriicando se o texto Popup2 está presente
            .should('have.prop','href')// Acessando a propriedade href
            .and('equal','https://wcaquino.me/cypress/frame.html')// Verificando se o conteúdo da prop. href contem o link
    })

    it('Acessando popup dinâmico', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href') // Acessando o informação do href e inserindo em uma variável
            cy.visit(href) // Acessando o a tela com as informação da variável
            cy.get('#tfield')
                .type('Wander Teste')
                .should('contain.value','Wander Teste')
        })
    })

    it.only('Forçando abrir o link na mesma página', () =>{
        cy.contains('Popup2')
            .invoke('removeAttr','target')// remove atributo do targe, para não abrir em outra aba
            .click()

        cy.get('#tfield')
        .type('Wander Teste')
        .should('contain.value','Wander Teste')
    })
})