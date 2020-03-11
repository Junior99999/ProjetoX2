var conexao = require('./conexao');

var ProdutoSchema = new conexao.Schema({
    nome:{
        type:String
    },
    CodBarra:{
        type:Number
    },
    preco:{
        type:Number
    }
});

module.exports = conexao.model('Produto', ProdutoSchema);