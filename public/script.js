const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('token'); // Tenta recuperar token salvo
let tipoAtual = 'autores'; // Começa mostrando autores

// Verifica se já está logado ao abrir a página
if (token) {
    mostrarDashboard();
}

// --- FUNÇÕES DE AUTENTICAÇÃO ---

async function registrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    const res = await fetch(`${API_URL}/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    
    const data = await res.json();
    alert(data.msg);
}

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.token) {
        token = data.token;
        localStorage.setItem('token', token); // Salva no navegador
        mostrarDashboard();
    } else {
        document.getElementById('msg-erro').innerText = data.msg;
    }
}

function logout() {
    localStorage.removeItem('token');
    location.reload(); // Recarrega a página
}

function mostrarDashboard() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    carregar('autores'); // Carrega a primeira aba
}

// --- FUNÇÕES DO CRUD (DADOS) ---

// Monta o formulário dependendo do que estamos vendo (Livro, CD, Autor...)
function montarFormulario(tipo) {
    const div = document.getElementById('inputs-dinamicos');
    div.innerHTML = ''; // Limpa

    // Campo Título/Nome (comum a todos)
    let html = `<input type="text" id="campo-titulo" placeholder="${tipo === 'autores' ? 'Nome do Autor' : 'Título'}">`;

    // Campos específicos
    if (tipo === 'autores') {
        html += `<input type="text" id="campo-extra" placeholder="Biografia (Opcional)">`;
    } else if (tipo === 'livros') {
        html += `<input type="number" id="campo-extra" placeholder="Número de Páginas">`;
    } else if (tipo === 'cds') {
        html += `<input type="text" id="campo-extra" placeholder="Duração (ex: 40 min)">`;
    } else if (tipo === 'dvds') {
        html += `<input type="number" id="campo-extra" placeholder="Ano de Lançamento">`;
    }

    // Se NÃO for Autor, precisa vincular a um Autor (Relacionamento)
    if (tipo !== 'autores') {
        html += `<input type="text" id="campo-autor-id" placeholder="Cole aqui o ID do Autor">`;
        html += `<small style="color:gray">Dica: Copie o ID da lista de Autores</small>`;
    }

    div.innerHTML = html;
    document.getElementById('titulo-form').innerText = `Adicionar em ${tipo.toUpperCase()}`;
}

async function carregar(tipo) {
    tipoAtual = tipo;
    montarFormulario(tipo);
    
    // GET não precisa de token (pela regra do professor), mas se mandar não tem problema
    const res = await fetch(`${API_URL}/${tipo}`);
    const itens = await res.json();

    const lista = document.getElementById('lista-itens');
    lista.innerHTML = '';

    itens.forEach(item => {
        const li = document.createElement('li');
        
        // Formata o texto para exibir
        let texto = `<strong>${item.nome || item.titulo}</strong>`;
        
        // Se tiver autor vinculado, mostra o nome dele
        if (item.autor && item.autor.nome) {
            texto += ` - Autor: ${item.autor.nome}`;
        }
        // Mostra o ID para facilitar copiar
        texto += ` <br><small style="font-size:10px; color:grey">ID: ${item._id}</small>`;

        li.innerHTML = `
            <span>${texto}</span>
            <button class="delete-btn" onclick="deletar('${item._id}')">X</button>
        `;
        lista.appendChild(li);
    });
}

async function salvarItem() {
    const titulo = document.getElementById('campo-titulo').value;
    const extra = document.getElementById('campo-extra').value;
    
    const body = {};

    if (tipoAtual === 'autores') {
        body.nome = titulo;
        body.biografia = extra;
    } else {
        body.titulo = titulo;
        // Mapeia o campo extra para o nome certo no banco
        if (tipoAtual === 'livros') body.paginas = extra;
        if (tipoAtual === 'cds') body.duracao = extra;
        if (tipoAtual === 'dvds') body.ano = extra;
        
        // Pega o ID do autor digitado
        const autorId = document.getElementById('campo-autor-id').value;
        body.autor = autorId;
    }

    const res = await fetch(`${API_URL}/${tipoAtual}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // AQUI VAI O TOKEN DE SEGURANÇA
        },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        alert('Salvo com sucesso!');
        carregar(tipoAtual); // Recarrega a lista
    } else {
        alert('Erro ao salvar. Verifique se preencheu tudo (e o ID do autor).');
    }
}

async function deletar(id) {
    if (!confirm('Tem certeza?')) return;

    const res = await fetch(`${API_URL}/${tipoAtual}/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
    });

    if (res.ok) {
        carregar(tipoAtual);
    } else {
        alert('Erro ao deletar (Você está logado?)');
    }
}