const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true // É obrigatório ter nome
    },
    biografia: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Autor', AutorSchema);