const mongoose = require('mongoose');

const CDSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    duracao: { type: String }, 
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    }
});

module.exports = mongoose.model('CD', CDSchema);