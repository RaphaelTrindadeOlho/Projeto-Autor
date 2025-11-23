const mongoose = require('mongoose');

const DVDSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    ano: { type: Number },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    }
});

module.exports = mongoose.model('DVD', DVDSchema);