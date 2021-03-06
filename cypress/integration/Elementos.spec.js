///<reference types = 'cypress'/>
 
describe('Inserir informaões no campos de texto',() => {

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Campos texto',() => {
        cy.get('#formNome').type('Teste Wander campo nome')
        //Para comparar uma texto de um campo text deve se usar o comando have.value
        cy.get('#formNome').should('have.value','Teste Wander campo nome')

        cy.get('[data-cy=dataSobrenome]').type('West')
        cy.get('[data-cy=dataSobrenome]').should('have.value','West')

        //No caso a onde o Cypress mostra \ no elemento, deve colocar mais uma barra para que o sistema reconheça
        cy.get('#elementosForm\\:sugestoes').type('Teste campo área!')
        cy.get('#elementosForm\\:sugestoes').should('have.value','Teste campo área!')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('Wander 123{backspace}{backspace}{backspace}{backspace}')
            .should('have.value','Wander')

        cy.get('[data-cy=dataSobrenome]').clear()
        cy.get('[data-cy=dataSobrenome]').type('Campo será limpo')
        cy.get('[data-cy=dataSobrenome]').clear()
        cy.wait(1000)
        cy.get('[data-cy=dataSobrenome]').type('Campo foi limpo com sucesso.')
        cy.wait(1000)
        cy.get('[data-cy=dataSobrenome]').should('have.value','Campo foi limpo com sucesso.')

        cy.get('[data-cy=dataSobrenome]')
            .clear()
            .type('Campo será limpo{selectall}Agora escreveu certo',{delay:200})
            .should('have.value','Agora escreveu certo')
    });

    it('Links', () => {
        cy.get('#resultado').should('not.to.have.text','Status: Não cadastrado')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('to.have.text','Voltou!')

        cy.reload()
        cy.get('#resultado').should('not.to.have.text','Status: Não cadastrado')

        cy.contains('Voltar').click()
        cy.get('#resultado').should('to.have.text', 'Voltou!')
    });

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length',2)
        cy.get("[name='formSexo']").should('not.have.length',3)

        cy.get('#formSexoFem').click()
        cy.get('#formSexoMasc').click()
        cy.get('#formSexoFem').should('not.be.checked')

    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({multiple:true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaFrango').should('be.checked')

    })
    
    it.only('Select', () => {
        cy.get('#formEscolaridade')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
        cy.reload()

        cy.get('#formEscolaridade')
            .select('Mestrado')
            .should('have.value','mestrado')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length',8)

        // Inserir todos os valores da combo e um array e verificar se existem
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = [] 

            $arr.each (function () {
                
                values.push(this.innerHTML)
                console.log(values)
            })
            expect(values).to.include.members(["Doutorado", "Mestrado"])
        })
    })

    it.only('Combos Multiplos...', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['futebol','Corrida'])

        cy.get('[data-testid=dataEsportes]').then($el => {
             expect($el.val()).to.be.deep.equal(['futebol','corrida'])
             expect($el.val()).to.have.length(2)
        })

        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql',['futebol, corrida']) 
    })
})