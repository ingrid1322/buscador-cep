# 🗺️ Buscador de CEP Avançado

Uma aplicação moderna, responsiva e de alta performance desenvolvida em JavaScript Vanilla para busca automatizada de endereços em tempo real, consumindo a API pública e externa do **ViaCEP**.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Estruturação semântica de formulários, garantindo acessibilidade e otimização SEO.
- **CSS3:** Design moderno em *Dark Mode*, utilizando CSS Grid e Flexbox para total responsividade (Mobile-First) e transições suaves de interface.
- **JavaScript (ES6+):** Manipulação dinâmica do DOM, consumo de APIs HTTP e persistência de dados.

---

## 🚀 Funcionalidades em Destaque

*   **Busca Assíncrona Automatizada:** Consumo em tempo real da API ViaCEP atualizando a interface dinamicamente sem recarregar a página.
*   **Tratamento de Erros Robusto:** Sistema preparado para alertar o usuário visualmente caso o formato do CEP seja inválido, o número não exista ou ocorra alguma falha de conexão de rede.
*   **Controle de Interface (UX):** Bloqueio temporário do botão de busca (`disabled`) e alteração do texto para "Buscando..." para evitar requisições duplicadas indesejadas.
*   **Histórico Local Persistente:** Armazenamento automático das últimas 5 buscas no navegador do usuário. Ao clicar em qualquer item do histórico, o formulário é repovoado instantaneamente sem gastar banda de internet.

---

## 🧠 Conceitos de Programação Aplicados

Para construir esta aplicação, apliquei conceitos fundamentais de desenvolvimento de software que demonstram maturidade no código:

1.  **Asynchrony (Async/Await & Fetch API):** Gerenciamento de promessas (Promises) para garantir que a aplicação continue fluida e responsiva enquanto espera a resposta do servidor externo.
2.  **Tratamento de Exceções (Try/Catch/Finally):** Isolamento de fluxos de erro para impedir o travamento do sistema e garantir uma experiência amigável ao usuário final (UX).
3.  **Sanitização de Dados e Expressões Regulares (Regex):** Uso de padrões de texto (`/\D/g`) para remover traços, espaços ou letras digitadas por engano, processando apenas os dígitos numéricos essenciais.
4.  **Manipulação de Estado com LocalStorage:** Serialização e desserialização de objetos complexos em strings JSON para gravar e ler dados diretamente na memória do navegador.

---

## 📂 Como rodar o projeto localmente

1. Clone este repositório para sua máquina:
   ```bash
   git clone https://github.com
   ```
2. Acesse a pasta criada:
   ```bash
   cd buscador-cep
   ```
3. Abra o arquivo `index.html` diretamente em seu navegador (ou execute através da extensão *Live Server* no VS Code).

---

## 📄 Licença
Este projeto está sob a licença MIT. Desenvolvido por [Ingrid](http://127.0.0.1:5500/index.html).
