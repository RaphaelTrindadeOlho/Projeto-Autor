const Autor = require('../models/Autor');
const Livro = require('../models/Livro');
const CD = require('../models/CD');
const DVD = require('../models/DVD');

// Mapa para saber qual modelo usar baseado na string (ex: "autores" -> Modelo Autor)
const modelos = {
    'autores': Autor,
    'livros': Livro,
    'cds': CD,
    'dvds': DVD
};

// LISTAR (GET) - Aberto a todos
exports.listar = async (req, res) => {
    try {
        const tipo = req.params.tipo; // Pega o que veio na URL (ex: livros)
        const Model = modelos[tipo];

        if (!Model) return res.status(400).json({ msg: 'Tipo inválido' });

        // Se for Livro, CD ou DVD, traz os dados do Autor junto (.populate)
        let items;
        if (tipo === 'autores') {
            items = await Model.find();
        } else {
            items = await Model.find().populate('autor', 'nome'); // Traz o nome do autor
        }

        res.json(items);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

// CRIAR (POST) - Só Logado
exports.criar = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const Model = modelos[tipo];
        
        // Cria o item com os dados que vieram no corpo da requisição (req.body)
        const novoItem = new Model(req.body);
        await novoItem.save();

        res.json(novoItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar');
    }
};

// ATUALIZAR (PUT) - Só Logado
exports.atualizar = async (req, res) => {
    try {
        const { tipo, id } = req.params;
        const Model = modelos[tipo];

        // Procura pelo ID e atualiza
        let item = await Model.findByIdAndUpdate(id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).send('Erro ao atualizar');
    }
};

// DELETAR (DELETE) - Só Logado
exports.deletar = async (req, res) => {
    try {
        const { tipo, id } = req.params;
        const Model = modelos[tipo];

        await Model.findByIdAndDelete(id);
        res.json({ msg: 'Item removido com sucesso' });
    } catch (err) {
        res.status(500).send('Erro ao deletar');
    }
};