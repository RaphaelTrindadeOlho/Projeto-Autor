const jwt = require('jsonwebtoken');

// Esse middleware intercepta a requisição antes de chegar no controller
module.exports = function(req, res, next) {
    // 1. Busca o token no cabeçalho da requisição (header 'x-auth-token')
    const token = req.header('x-auth-token');

    // 2. Se não tiver token, bloqueia o acesso
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado. Falta o token de autenticação.' });
    }

    // 3. Se tiver token, tenta validar
    try {
        // Usa o nosso segredo (que está no .env) para decifrar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Se der certo, coloca o id do usuário na requisição para usarmos depois
        req.usuario = decoded.usuario;
        
        // next() diz: "Pode passar, vá para a próxima etapa"
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inválido.' });
    }
};