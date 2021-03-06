///<reference types = 'cypress'/>

import loc from '../../support/locators'


describe('Acessar a tela de conta',() => {
    beforeEach(() => {
        cy.visit('http://barrigareact.wcaquino.me')
        cy.acessarSistema('w@w.com','123456')
        cy.get(loc.MENU.MOVIMENTACAO).click()
    });

    it('Deve realizar uma movimentação',() => {
       cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Campo descrição')
       cy.get(loc.MOVIMENTACAO.VALOR).type(100)
       cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Teste 123')
       cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()

       cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Movimentação inserida com sucesso!')
    })
})