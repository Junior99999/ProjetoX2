const endereco = "mongodb://localhost:27017/produtos";
const mongoose = require('mongoose');

mongoose.connect(endereco, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

module.exports = mongoose;