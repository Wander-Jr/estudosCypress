/// <reference types = 'Cypress'/>


 describe('Helpers',() =>{

    it('Wrap',() => {

        const obj = {
            nome:'Wander', 
            idade: 33
        }

        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property',('idade'))

        expect(obj.nome).to.equal('Wander')
        console.log(obj)
        cy.wrap(obj.nome).should('eq','Wander')

        cy.visit('http://wcaquino.me/cypress/componentes.html')   

        const promise = new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve('Wander')
            },3000)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

    })

    it('Its...',() =>{
        const obj = {
            nome: 'Wander',
            idade: 33,
            Sexo: 'Masculino',
            endereco: {
                rua: 'Teste',
                bairro:'QA',
                cidade: 'Campo Grande',
                estado: 'MS'
            }
        }

        cy.wrap(obj).should('have.property','nome','Wander')
        cy.wrap(obj).its('nome').should('be.equal','Wander')
        cy.wrap(obj).its('endereco').should('have.property','cidade')
        cy.wrap(obj).its('endereco').its('cidade').should('be.equal','Campo Grande')
        cy.wrap(obj).its('endereco.bairro').should('be.equal','QA')


        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it.only('Invoke', () => {

        const getValue = () => 1
        const soma = (a, b) => a + b

        //Trabalha com o getValue como um objeto. Nesse caso deve é chamado com uma função sem parâmetros
        cy.wrap({ fn:getValue }).invoke('fn').should('be.equal', 1) 

        //Trabalha com a soma como um objeto. Nesse caso deve é chamado com uma função com parâmetros
        cy.wrap({ fn:soma }).invoke('fn', 1, 9).should('be.equal', 10) 

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').invoke('val', 'Teste Wander')
        

        cy.get('#resultado').invoke('html','<input type="button" value="se fudeu!" />')

    })
})
 