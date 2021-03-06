///<reference types = 'cypress'/>

describe('Inserindo informações fixture',() =>{

    it('Inserindo informa no form', function () {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.fixture('cadForm').as('user').then(() => {
            cy.get('#formNome').type(this.user.nome)
            cy.get('#formSobrenome').type(this.user.sobrenome)
            cy.get(`[name=formSexo][value=${this.user.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.user.comida}]`)
            cy.get('#formEscolaridade').select(this.user.escolaridade)
            cy.get('#formEsportes').select(this.user.esporte)
            cy.get('#formCadastrar').click()

            cy.get('#resultado > :nth-child(1)')
                .should('be.visible')
                .and('contain.text','Cadastrado!')
        })
    })
})