// Classe usada para criar os objetos.
class Cardapio {
    constructor(codigo, descricao, valor) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

// Classe responsável por manter o cardápio
// Foi criada um array com as instanciações de Cardapio.
class LanchoneteCardapio {
    constructor() {
        this.cardapio = [
            new Cardapio('cafe', 'Café', 3.00),
            new Cardapio('chantily', 'Chantily (extra do Café)', 1.50),
            new Cardapio('suco', 'Suco Natural', 6.20),
            new Cardapio('sanduiche', 'Sanduíche', 6.50),
            new Cardapio('queijo', 'Queijo (extra do Sanduíche)', 2.00),
            new Cardapio('salgado', 'Salgado', 7.25),
            new Cardapio('combo1', '1 Suco e 1 Sanduíche', 9.50),
            new Cardapio('combo2', '1 Café e 1 Sanduíche', 7.50),
        ];
    }
    // Método para pegar o código do item.
    // Verifica se o produto atual é igual ao código.
    pegarCodigoDoItem(codigo) {
        return this.cardapio.find(produto => produto.codigo === codigo);
    }
}

// Classe para representar os pedidos dos clientes
class PedidoCliente {
    constructor(codigo, produtoExtra = null) {
        this.codigo = codigo;
        this.extra = produtoExtra;
    }
}

// Classe com a implementação da Lógica
// Contém instaciações da classe LanchoneteCardapio para acessar o cardápio
class CaixaDaLanchonete {
    constructor() {
        this.lanchoneteCardapio = new LanchoneteCardapio();
    }
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;

        itens.forEach(produto => {
            const produtoPrincipal = this.lanchoneteCardapio.pegarCodigoDoItem(produto.codigo);
            if (!produtoPrincipal) {
                return 'Item inválido!';
            }

            valorTotal = valorTotal + produtoPrincipal.valor;

            if (produto.extra) {
                const produtoExtra = this.lanchoneteCardapio.pegarCodigoDoItem(produto.extra);
                if (!produtoExtra) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            
                valorTotal = valorTotal + produtoExtra.valor;
            }
        });

        if (valorTotal === 0) {
            return 'Quantidade inválida!';
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal = valorTotal * 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal = valorTotal * 1.03;
        } else if (metodoDePagamento !== 'debito') {
            return 'Forma de pagamento invalida!';
        }

        return `Valor total do pedido: R$ ${valorTotal.toFixed(2)}`;
    }

}

const pedidoExemplo = [new PedidoCliente('cafe', 'chantily')];
  const formaPagamentoExemplo = 'debito';
  
  const caixa = new CaixaDaLanchonete();
  console.log(caixa.calcularValorDaCompra(formaPagamentoExemplo, pedidoExemplo));

export { CaixaDaLanchonete };
