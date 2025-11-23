require('dotenv').config(); // Carrega as variáveis do .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database'); // Importa a conexão

const app = express();

// Conectar ao Banco
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API Funcionando! Banco conectado.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});