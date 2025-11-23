const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Para criptografar senha
const jwt = require('jsonwebtoken'); // Para criar o token

// ROTA: Registrar novo usuário
exports.registrar = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Verifica se o usuário já existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        // 2. Cria o novo objeto de usuário
        usuario = new Usuario({ email, senha });

        // 3. Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(senha, salt);

        // 4. Salva no banco
        await usuario.save();

        // 5. Retorna sucesso
        res.json({ msg: "Usuário criado com sucesso! Faça login para pegar o token." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// ROTA: Login (Autenticação)
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Verifica se o usuário existe
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciais inválidas (Email não encontrado)' });
        }

        // 2. Compara a senha enviada com a senha criptografada no banco
        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas (Senha incorreta)' });
        }

        // 3. Se a senha bater, cria o Token (o "crachá")
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token expira em 5 horas
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Envia o token pro usuário
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};