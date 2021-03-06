///<reference types = 'cypress'/>

describe('Inserir informaões no campos de texto',() => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food => {
        it(`Cadastro de comida ${food}`, () => {
            cy.get('#formNome').type('Wander')
            cy.get('#formSobrenome').type('Júnior')
            cy.get(`[name=formSexo][value=M]`).click({force:true})
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()  
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('futebol')

            cy.get('#formCadastrar').click()
            
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
            cy.get('#descComida > span')
                .should(($f) => {
                    expect($f).to.visible
                    expect($f).to.contain(`${food}`)

                })
        })
    })

    it.only('Deve seleciona todos com each', () => {
        cy.get('#formNome').type('Wander')
        cy.get('#formSobrenome').type('Júnior')
        cy.get(`[name=formSexo][value=M]`).click({force:true})

        cy.get('[name=formComidaFavorita]').each($el => {

            if($el.val()!= 'vegetariano')
                cy.wrap($el).click()

        })
        
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('futebol')

        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
        cy.get('#descComida > span')
            .should(($f) => {
                expect($f).to.visible
                expect($f).to.contains.text(' Carne  Frango  Pizza ')

            })
    })
})
