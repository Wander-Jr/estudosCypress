///<reference types = 'cypress'/>

describe('Inserir informaões no campos de texto',() => {

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it.only('Alerta',() =>{
        // cy.get('#alert').click();
        // // Pegando a mensagem do alerta 
        // cy.on('window:alert',msg =>{
        //     console.log(msg)
        //     expect(msg).to.be.equal('Alert Simples');
        // });
        cy.clickAlert('#alert','Alert Simples')
    })

    it('Alerta com Mock 1',() =>{
        const stub = cy.stub();
        cy.on('window:alert',stub)
        cy.get('#alert').click();
    });

    it('Alerta com Mock 2',() =>{
        const stub = cy.stub().as('Alerta 2');
        cy.on('window:alert',stub)
        cy.get('#alert').click().then(() =>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        });
    });

    it('Confirmar',() => {
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Confirm Simples');
        });

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado');
        })  

        cy.get('#confirm').click()
    })

    it('Negar',() => {
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Confirm Simples');
            return false
        });

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado');
        })  

        cy.get('#confirm').click()
    })

    it('Prompt',() => {
        
        cy.window().then(win =>{
            cy.stub(win, 'prompt').returns('Wander')
        })
        
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Era Wander?');
        });

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D');
        })  

        cy.get('#prompt').click()
    })

    it('Desafio do alerta', () => {
        
        const stub = cy.stub().as('alerta')

        cy.on('window:alert',stub)

        cy.get('#formCadastrar')
            .click()
            .then(() => 
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Wander')
        cy.get('#formCadastrar')
        .click()
        .then(() => 
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('#formSobrenome').type('Júnior')
        cy.get('#formCadastrar')
        .click()
        .then(() => 
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado').should('contain.text','Cadastrado!')

    })
});