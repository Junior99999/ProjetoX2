const express = require('express');
var app = express();
var bodyparser = require('body-parser');
var Produto = require('./model/produtos');
var flash = require('req-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var path = require('path')

app.use(cookieParser());
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set('view engine','ejs');

//ADICIONAR PRODUTO//
app.get('/add',function(req,res){
    res.render('adicionar.ejs', {msg: ""})
});
app.post('/add',function(req,res){
    var produto = new Produto({
        nome: req.body.nome,
        CodBarra: req.body.CodBarra,
        preco: req.body.preco
    })
    produto.save(function(err){
        if(err){
            res.render("adicionar.ejs",{msg : err})
        }else{
            res.render("adicionar.ejs",{msg: "Adicionado com Sucesso"})
        }
      
    })
});
//FIM//

//LER PRODUTOS//
app.get('/',function(req,res){
    Produto.find({}).exec(function(err,docs){
        res.render('listar.ejs', { listaProdutos: docs, msg: req.flash('msg')})
    });
    
});
app.post('/',function(req,res){
    Produto.find(
        {
            nome: new RegExp(req.body.pesquisa, 'i')
        },
        function(err,docs){
        res.render('listar.ejs', {listaProdutos: docs, msg:""})
    })
}); 
//FIM//

//EDITAR//
app.get('/editar/:id',function(req,res){
    Produto.findById(req.params.id, function(err,docs){
        res.render('editar.ejs', {produto:docs})
    })
    
});
app.post('/editar/:id',function(req,res){
    Produto.findByIdAndUpdate(
        req.body.id,
        {
            nome: req.body.nome,
            CodBarra: req.body.CodBarra,
            preco: req.body.preco
        }, function(err, docs){
            if(err){
                req.flash('msg','Problema ao alterar!')
                res.redirect('/')
            }else{
                req.flash('msg',docs.nome +'alterado com sucesso!')
                res.redirect('/')
            }
        }
    )
});
//FIM//

//DELETAR PRODUTO//
app.get('/del/:id', function(req,res){
    Produto.findByIdAndDelete(req.params.id, function(err){
        if(err){
            req.flash('msg', 'Problema ao excluir!')
            res.redirect("/");
        }else{
            req.flash('msg', 'Excluido com sucesso!')
            res.redirect("/");
        }
    });
  //  res.redirect("/");//
});
//FIM//
app.listen(3001,function(){
    console.log("Estou escutando na porta 3001!")
});