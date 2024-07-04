/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
       
       cy.get('#username').type('joaomarcosbrum@hotmail.com')
       cy.get('#password').type('Chacalteam@16')
       cy.get('.woocommerce-form > .button').click()
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, joaomarcosbrum (não é joaomarcosbrum? Sair)')

    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
       
        cy.get('#username').type('joaomarcos@hotmail.com')
        cy.get('#password').type('Chacalteam@16')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')

    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        
        cy.get('#username').type('joaomarcosbrum@hotmail.com')
        cy.get('#password').type('Chaca111')
        cy.get('.woocommerce-form > .button').click()
        
         cy.get('.woocommerce-error').should('contain','Erro: A senha fornecida para o e-mail joaomarcosbrum@hotmail.com está incorreta. Perdeu a senha?')
         cy.get('.woocommerce-error').should('exist')
        
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
            cy.get('#username').type(perfil.usuario)
            cy.get('#password').type(perfil.senha)
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, joaomarcosbrum (não é joaomarcosbrum? Sair)')
        })
       
        it('Deve fazer login com sucesso - Usando Fixture', () => {
         cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario, {log: false})
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, joaomarcosbrum (não é joaomarcosbrum? Sair)')

         })
       
     });
    

    it.only('Deve fazer login com sucesso -  Usando os comandos customizado', () => {
       cy.login('joaomarcosbrum@hotmail.com','Chacalteam@16' )
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, joaomarcosbrum (não é joaomarcosbrum? Sair)')

    });

})