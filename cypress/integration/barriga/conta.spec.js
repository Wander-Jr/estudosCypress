///<reference types = 'cypress'/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Acessar a tela de conta',() => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me')
        cy.logarSistema('w@w.com','123456')
    });

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Deve castarar uma conta', () => {
        cy.acessarMenuConta()
        cy.salvarConta('Teste 1')
        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Conta inserida com sucesso!')    
    })

    it('Deve alterar nome da conta',() => {
        cy.acessarMenuConta()
        cy.editarConta('Conta para alterar','Conta alterada')
        cy.get(loc.MENSAGE)
            .should('to.visible')
            .and('contain.text','Conta atualizada com sucesso!')
    })


    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.salvarConta('Conta mesmo nome')
        cy.get(loc.MENSAGE)
            .should('to.visible')
            .and('contain.text', 'Erro: Error: Request failed with status code 400')
    })

    it('Deve excluir conta', () => {
        cy.acessarMenuConta()
        cy.excluirConta('Excluir conta')

        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Conta excluída com sucesso!')      
    })


    it('Deve realizar uma movimentação',() => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Campo descrição')
        cy.get(loc.MOVIMENTACAO.VALOR).type(534)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Teste editado')
        cy.get(loc.MOVIMENTACAO.CONTAS).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click()

        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Movimentação inserida com sucesso!')

        console.log(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Campo descrição','534,00'))
            .should('exist')
    })

    it('Deve mostrar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo'))
            .should('contain.text', '534,00')
    })

    it('Deve remover uma movimentação',() => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_BTN_EXCLUIR_MOVIMENTACAO('Campo descrição')).click()
        cy.get(loc.MENSAGE)
            .should('be.visible')
            .and('contain.text','Movimentação removida com sucesso!')

        cy.xpath(loc.EXTRATO.FN_XP_BTN_EXCLUIR_MOVIMENTACAO('Conta com movimentacao'))
            .should('not.exist')
    })
})  
