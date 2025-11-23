const mongoose = require('mongoose');

// Função para conectar ao banco
const connectDB = async () => {
    try {
        // Tenta conectar usando a string que está no arquivo .env
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("✅ MongoDB Conectado com Sucesso!");
        console.log("MongoDB Conectado com Sucesso!");
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error);
        // Encerra o processo se não conseguir conectar
        process.exit(1);
    }
};

module.exports = connectDB;