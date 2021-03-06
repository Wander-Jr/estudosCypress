///<reference types = 'cypress'/>

import loc from '../../support/locators'


describe('Acessar a tela de conta',() => {
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me')
    });

    it('Deve logar e ver a mensagem de bem vindo', () =>{
        cy.acessarSistema('w@w.com','123456')

        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Bem vindo, Teste !')
        
        cy.get('#root').should('be.visible')
    })

    it('Não deve ser feito login, com usuário errado', () => {
        cy.acessarSistema('teste@teste000.com','000')
        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Erro: Error: Request failed with status code 400')
    })

    it.only('Deve deslogar do sistema',() => {
        cy.acessarSistema('w@w.com','123456')
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.SAIR).click()
 
        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text', 'Até Logo!')
    })
})