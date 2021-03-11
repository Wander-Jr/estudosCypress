///<reference types = 'cypress'/>


describe('Acessar a tela de conta',() => {
    
    let token

    before(() => {
        cy.getToken('w@w.com','123456')
            .then(tkn => {
                token = tkn
            })
        
    });

    beforeEach(() => {
        
    })

    it('Deve castarar uma conta', () => {
       
        // Realizando o cadastro da conta
        cy.request({ 
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{
                nome: 'Conta via Request 4'
            }   
        }).as('response')            

        // Realizando a validação de retorno do Json
        cy.get('@response').then(res => {
            expect(res.status).to.be.eql(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via Request 4')
        })
    })

    it('Deve alterar nome da conta',() => {
        
    })


    it('Não deve criar uma conta com mesmo nome', () => {
        
    })

    
    it('Deve excluir conta', () => {
           
    })


    it('Deve realizar uma movimentação',() => {
        
    })

    it('Deve mostrar o saldo', () => {
        
    })

    it('Deve remover uma movimentação',() => {
        
    })
})  
