const cepInput = document.getElementById('cep-input');
const btnBuscar = document.getElementById('btn-buscar');
const errorMessage = document.getElementById('error-message');
const addressForm = document.getElementById('address-form');

// Campos do formulário de resposta
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const localidadeInput = document.getElementById('localidade');
const ufInput = document.getElementById('uf');

// Elementos do Histórico
const historyList = document.getElementById('history-list');
const btnLimparHistorico = document.getElementById('btn-limpar-historico');

// Inicializa o array de histórico buscando dados salvos no navegador
let historicoBuscas = JSON.parse(localStorage.getItem('historico_cep')) || [];

/* ==========================================================================
   2. CONSUMO DA API E TRATAMENTO DE DADOS
   ========================================================================== */

// Função assíncrona principal que conecta com a API do ViaCEP
async function buscarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        mostrarErro(''); // Limpa erros anteriores
        btnBuscar.textContent = 'Buscando...';
        btnBuscar.disabled = true;

        const response = await fetch(url);
        
        // Verifica se a requisição HTTP falhou (ex: erro 404 ou 500)
        if (!response.ok) {
            throw new Error('Não foi possível conectar ao serviço de CEP.');
        }

        const dados = await response.json();

        // A API do ViaCEP retorna "erro: true" se o CEP não existir na base deles
        if (dados.erro) {
            throw new Error('CEP não encontrado em nossa base de dados.');
        }

        // Se deu tudo certo, preenche os campos e salva no histórico
        preencherFormulario(dados);
        salvarNoHistorico(dados);

    } catch (error) {
        mostrarErro(error.message);
        limparFormulario();
    } finally {
        // Código que sempre roda, dando certo ou errado
        btnBuscar.textContent = 'Buscar';
        btnBuscar.disabled = false;
    }
}

/* ==========================================================================
   3. FUNÇÕES AUXILIARES / UTILITÁRIAS
   ========================================================================== */

function preencherFormulario(dados) {
    logradouroInput.value = dados.logradouro || 'Sem logradouro disponível';
    bairroInput.value = dados.bairro || 'Sem bairro disponível';
    localidadeInput.value = dados.localidade;
    ufInput.value = dados.uf || '--';
}

function limparFormulario() {
    logradouroInput.value = '';
    bairroInput.value = '';
    localidadeInput.value = '';
    ufInput.value = '';
}

// Controla a exibição das mensagens de erro na interface
function mostrarErro(mensagem) {
    if (mensagem) {
        errorMessage.textContent = mensagem;
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }
}

/* ==========================================================================
   4. GERENCIAMENTO DO HISTÓRICO (LOCALSTORAGE)
   ========================================================================== */

function salvarNoHistorico(dados) {
    // Evita duplicar o mesmo CEP sequencialmente no histórico
    const cepJaExiste = historicoBuscas.some(item => item.cep === dados.cep);
    if (cepJaExiste) return;

    // Adiciona o novo CEP no início da lista e limita o histórico em até 5 itens
    historicoBuscas.unshift(dados);
    if (historicoBuscas.length > 5) {
        historicoBuscas.pop();
    }

    // Salva a string JSON no armazenamento local do navegador
    localStorage.setItem('historico_cep', JSON.stringify(historicoBuscas));
    renderizarHistorico();
}

function renderizarHistorico() {
    historyList.innerHTML = '';

    if (historicoBuscas.length === 0) {
        historyList.innerHTML = '<p class="empty-history">Nenhum CEP pesquisado ainda.</p>';
        btnLimparHistorico.classList.add('hidden');
        return;
    }

    btnLimparHistorico.classList.remove('hidden');

    historicoBuscas.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';
        itemDiv.innerHTML = `
            <strong>CEP: ${item.cep}</strong>
            <p>${item.localidade} - ${item.uf}</p>
        `;
        
        // UX: Clicar em um item do histórico repovoa o formulário automaticamente
        itemDiv.addEventListener('click', () => preencherFormulario(item));
        
        historyList.appendChild(itemDiv);
    });
}

/* ==========================================================================
   5. EVENTOS (LISTENERS)
   ========================================================================== */

// Evento do botão Buscar
btnBuscar.addEventListener('click', () => {
    // Remove qualquer caractere que não seja número digitado pelo usuário
    const cepLimpo = cepInput.value.replace(/\D/g, '');

    // Validação básica: precisa ter exatamente 8 dígitos numéricos
    if (cepLimpo.length !== 8) {
        mostrarErro('Por favor, digite um CEP válido com 8 números.');
        return;
    }

    buscarCEP(cepLimpo);
});

// Evento para buscar ao pressionar a tecla "Enter" no input
cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnBuscar.click();
    }
});

// Evento para limpar o histórico completo
btnLimparHistorico.addEventListener('click', () => {
    historicoBuscas = [];
    localStorage.removeItem('historico_cep');
    renderizarHistorico();
    limparFormulario();
});

// Renderiza o histórico assim que a página é carregada pela primeira vez
renderizarHistorico();