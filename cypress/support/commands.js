// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'


Cypress.Commands.add('logarSistema',(user,password) => {
        cy.get(loc.LOGIN.USER).type(user)
        cy.get(loc.LOGIN.PASSWORD).type(password)
        cy.get(loc.LOGIN.BTN_LOGIN).click()
})


Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})


Cypress.Commands.add('clickAlert',(locator, message) =>{
    cy.get(locator).click();
        // Pegando a mensagem do alerta 
        cy.on('window:alert',msg =>{
            console.log(msg)
            expect(msg).to.be.equal(message);
        });
})

Cypress.Commands.add('getToken',(email, senha) => {
    cy.request({ // Gerando o token
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body:{
            email: email,
            redirecionar: false,
            senha: senha
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })

    
})