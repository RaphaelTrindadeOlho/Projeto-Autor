const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    paginas: { type: Number },
    // AQUI ESTÁ O RELACIONAMENTO
    autor: {
        type: mongoose.Schema.Types.ObjectId, // O ID do autor no banco
        ref: 'Autor', // Referência ao modelo 'Autor'
        required: true
    }
});

module.exports = mongoose.model('Livro', LivroSchema);