/// <reference types="cypress"/>
import produtosPage from "../../support/page-objetcs/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
      produtosPage.visitarUrl()


    });

    it('Deve selecionar um produto da lista', () => {
      produtosPage.buscarprodutoLista('Aero Daily Fitness Tee')
      cy.get('#tab-title-description > a').should('contain', 'Descrição')
        
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Aether Gym Pant'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain',produto)
    });

    it('Deve visitar a página do produto', () => {
      produtosPage.visitarProduto('Aether Gym Pant')
      cy.get('.product_title').should('contain','Aether Gym Pant')
        
    });

    it('Deve adicionar produto ao carrinho', () => {
      const qtd = 7
      produtosPage.buscarProduto('Abominable Hoodie')
      produtosPage.addProdutoCarrinho('L', 'Red', qtd)

      cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')

    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
          produtosPage.buscarProduto(dados[2].nomeProduto)
          produtosPage.addProdutoCarrinho(
            dados[2].tamanho,
            dados[2].cor,
            dados[2].quantidade)
    
          cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
    

        })

    
    });

  });

  
     