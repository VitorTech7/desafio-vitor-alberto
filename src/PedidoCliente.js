// Classe para representar os pedidos dos clientes
export class PedidoCliente {
    constructor(codigo, produtoExtra = null) {
        this.codigo = codigo;
        this.extra = produtoExtra;
    }
}