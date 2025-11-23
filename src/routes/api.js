// src/routes/api.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // O nosso guarda-costas
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

// --- ROTAS DE AUTENTICAÇÃO ---
// Qualquer um pode registrar ou tentar logar
router.post('/auth/registrar', authController.registrar);
router.post('/auth/login', authController.login);


// --- ROTAS DE DADOS (CRUD) ---

// GET: Listar (Público - Qualquer um vê)
// Exemplo de uso: /api/livros, /api/autores
router.get('/:tipo', dataController.listar);

// POST: Criar (Privado - Precisa de Token)
router.post('/:tipo', auth, dataController.criar);

// PUT: Atualizar (Privado - Precisa de Token)
router.put('/:tipo/:id', auth, dataController.atualizar);

// DELETE: Apagar (Privado - Precisa de Token)
router.delete('/:tipo/:id', auth, dataController.deletar);

module.exports = router;