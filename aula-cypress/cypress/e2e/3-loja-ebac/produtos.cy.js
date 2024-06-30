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

    it.only('Deve adicionar produto ao carrinho', () => {
      const qtd = 7
      produtosPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
      produtosPage.addProdutoCarrinho('L', 'Red', qtd)

      cy.get('.woocomerce-message').should('contain', qtd + 'x "Ariel Roll Sleeve Sweatshirt" foram adicionados no seu carrinho.')

    });

  });

  
     