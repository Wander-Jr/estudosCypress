import loc from './locators'

Cypress.Commands.add('acessarMenuConta',() => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('salvarConta',conta => {
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR_CONTA).click()
})

Cypress.Commands.add('editarConta', (nome,novoNome)  => {
    cy.xpath(loc.CONTAS.FN_XP_BTN_EDITAR_CONTA(nome)).click()
    cy.get(loc.CONTAS.NOME)
        .clear()
        .type(novoNome)
    cy.get(loc.CONTAS.BTN_SALVAR_CONTA).click()
})

Cypress.Commands.add('excluirConta',nome => {
    cy.get(loc.CONTAS.NOME).clear()
    cy.salvarConta(nome)
    cy.xpath(loc.CONTAS.FN_XP_BTN_EXCLUIR_CONTA(nome))
        .click()
})