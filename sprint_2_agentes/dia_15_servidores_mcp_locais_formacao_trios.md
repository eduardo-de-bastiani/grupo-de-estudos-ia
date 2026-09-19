# 📅 Dia 15 (02/10 - Sexta-feira)
# 🛠️ Criando Servidores MCP Locais em Python & Formação dos Trios da Sprint 2

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Construir **Servidores MCP Locais** em Python utilizando a biblioteca de alto nível **FastMCP**, simplificando a criação de endpoints de ferramentas através de decoradores `@mcp.tool`.
2. Implementar ferramentas customizadas com tipagem estrita via Pydantic, parâmetros opcionais com valores default e docstrings ricas que servem de instrução para a LLM.
3. Executar testes de depuração local e validação de contratos utilizando um cliente de teste antes de conectar modelos de linguagem.
4. Conectar o modelo `gemini-3.8-flash` de ponta a ponta ao servidor FastMCP local, realizando uma sessão completa de assistência agêntica via `stdio`.
5. Realizar a **formação oficial dos 5 novos trios** para o desenvolvimento do projeto *DataOps Agent* na Semana 2, alinhando o domínio de dados de cada equipe.
6. Consolidar os conceitos da Semana 1 no **Quiz Interativo** antes do formulário semanal de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: FastMCP em Python        │
│ 14:20 - 14:50   │ Bloco 2: Criação do Servidor FastMCP Multi-Tool        │
│ 14:50 - 15:30   │ Bloco 3: Teste e Depuração Isolada do Servidor MCP     │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: Agente Gemini com FastMCP    │
│ 16:15 - 16:35   │ Bloco 5: Formação dos 5 Novos Trios & Brainstorming    │
│ 16:35 - 16:45   │ Bloco 6: Quiz Interativo da Semana 1 (quiz_dia_15.html)│
│ 16:45 - 17:00   │ Bloco 7: Formulário Diário de Auto-Avaliação & Feedback│
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## ⚡ 1. Daily Standup de Abertura (14:00 - 14:05)

Reunião em pé de 5 minutos onde cada estudante responde brevemente:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. 🌟 O QUE MAIS GOSTEI:                                               │
│    O que mais curti aprender ou explorar no encontro anterior?         │
│                                                                        │
│ 2. 🚧 MINHA MAIOR DIFICULDADE:                                         │
│    Onde eu mais me bati, qual bug enfrentei ou qual dúvida ficou?      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:05 - 14:20)

* **Tempo Dedicado:** 15 minutos (leitura individual em silêncio).
* **Foco Teórico:** A abstração FastMCP: como ela utiliza type hints e docstrings do Python para inferir os esquemas JSON-RPC do MCP automaticamente, reduzindo centenas de linhas de boilerplate em poucas linhas declarativas.
* <!-- CAMADA 2: Inserir documentação e referências sobre FastMCP e criação de servidores locais -->

---

## 💻 4. Bloco 2: Criação do Servidor FastMCP Multi-Tool (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o arquivo `dia_15/server_utils.py`.
  - Instanciar `mcp = FastMCP("ServidorUtilidades")`.
  - Implementar 3 ferramentas práticas:
    1. `calcular_hash_arquivo(caminho: str) -> str`: calcula SHA-256 de um arquivo local.
    2. `contar_linhas_codigo(diretorio: str, extensao: str = ".py") -> dict`: analisa arquivos em uma pasta.
    3. `converter_temperatura(valor: float, de: str, para: str) -> float`: cálculo determinístico com validação.
  - Executar o servidor via terminal e verificar que o processo inicializa ouvindo no canal `stdio`.
* <!-- CAMADA 2: Código do servidor FastMCP sem emojis em código -->

---

## 🔍 5. Bloco 3: Teste e Depuração Isolada do Servidor MCP (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação e Testes em Duplas.
* **Objetivo:** Criar o script `dia_15/02_test_mcp_server.py`.
  - Escrever um cliente de teste que inicia `server_utils.py` como subprocesso.
  - Testar chamadas diretas às 3 ferramentas com parâmetros válidos e com entradas inválidas (ex: diretório inexistente).
  - Validar como o FastMCP serializa erros em formato JSON-RPC com códigos de erro padronizados sem derrubar o processo.
* <!-- CAMADA 2: Código do cliente de testes automatizados de servidor MCP sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🤖 7. Bloco 4: Desafio Prático: Agente Gemini com FastMCP (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_15/03_full_mcp_agent.py`.
  - Unir a ponte criada no Dia 14 com o servidor FastMCP construído no Bloco 2.
  - Fazer o `gemini-3.8-flash` receber comandos como: *"Quantas linhas de código Python temos no projeto e qual o hash do arquivo server_utils.py?"*.
  - O agente deve inspecionar as ferramentas do servidor FastMCP, executá-las em sequência e emitir o relatório no terminal.
* <!-- CAMADA 2: Código da orquestração agêntica de ponta a ponta com FastMCP sem emojis em código -->

---

## 👥 8. Bloco 5: Formação dos 5 Novos Trios da Sprint 2 & Brainstorming (16:15 - 16:35)

* **Tempo Dedicado:** 20 minutos | **Formato:** Dinâmica Coletiva da Sala.
* **Atividades:**
  1. **Rotação Oficial das Squads:** Os 15 estudantes reorganizam-se oficialmente em **5 novos Trios** para enriquecer o trabalho colaborativo da Semana 2.
  2. **Definição de Papéis Iniciais:** Cada trio estabelece quem será o Piloto do Dia 16 (responsável pelo teclado) e os Copilotos.
  3. **Brainstorming de Domínio Analítico:** Discutir qual temática de dados cada trio deseja explorar no projeto *DataOps Agent*:
     - *Opção A:* E-commerce & Vendas (tabelas de clientes, pedidos, itens de pedido e produtos).
     - *Opção B:* Infraestrutura & DevOps (tabelas de servidores, métricas de CPU/memória, alertas e incidentes).
     - *Opção C:* Logística & Entregas (rotas, motoristas, fretes e ocorrências de atraso).
     - *Opção D:* Suporte & Chamados (tickets, usuários, categorias e tempo de resolução).

---

## 🧠 9. Bloco 6: Quiz Interativo da Semana 1 (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_15.html`](quizzes/quiz_dia_15.html)
* **Formato:** Revisão abrangente dos conceitos da Semana 1 (Structured Outputs, Pydantic, Function Calling, ReAct e FastMCP).

---

## 📝 10. Bloco 7: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 15](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão da Semana 1:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre desenvolvimento ágil com FastMCP concluída.
- [x] Servidor `server_utils.py` implementado expondo 3 ferramentas.
- [x] Testes de depuração aprovados em `02_test_mcp_server.py`.
- [x] Agente `03_full_mcp_agent.py` conectando Gemini ao servidor via `stdio`.
- [x] 5 Novos Trios da Semana 2 oficialmente formados e alinhados.
- [x] Domínio do banco de dados do trio escolhido para o kickoff de segunda-feira.
- [x] Quiz interativo da Semana 1 concluído no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo demonstrativo sobre criação de ferramentas de dados com FastMCP -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script de servidor FastMCP com suporte a decorators assíncronos (async def) para ferramentas I/O-bound -->
