# 📅 Dia 18 (07/10 - Quarta-feira)
# 🛡️ Servidor MCP do Agente, Loop ReAct & Guardrails de Segurança SQL

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o princípio do menor privilégio (*Least Privilege Principle*) e os riscos críticos de segurança em sistemas agênticos com acesso a bancos relacionais (Text-to-SQL Injection, execução de scripts destrutivos e vazamento de esquemas).
2. Construir o módulo de **Guardrails Determinísticos de SQL** (`src/agent/guardrails.py`): validação semântica e sintática independente da LLM que bloqueia terminantemente qualquer operação de escrita ou manipulação estrutural (`DROP`, `DELETE`, `UPDATE`, `INSERT`, `ALTER`, `ATTACH`, `PRAGMA writable_schema`).
3. Empacotar as ferramentas construídas no Dia 17 em um **Servidor FastMCP Oficial do Projeto** (`src/mcp_server/dataops_mcp.py`), expondo-as de forma padronizada via transporte `stdio`.
4. Implementar o **Loop ReAct Autônomo** (`src/agent/dataops_agent.py`): orquestrador multi-turno conectando o `gemini-3.8-flash` ao servidor MCP com mecanismo de **auto-recuperação**: se uma query SQL falhar sintaticamente ou violar um guardrail, o agente recebe o traceback e refaz o raciocínio.
5. Executar a **Bateria de Testes Adversariais & Jailbreak do Banco** (`tests/test_guardrails_attacks.py`), submetendo 5 ataques intencionais para validar que os guardrails barram a execução com 100% de sucesso.
6. Sincronizar o repositório colaborativo no GitHub e responder ao **Quiz do Dia**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Segurança & Guardrails   │
│ 14:20 - 14:50   │ Bloco 2: Guardrails Determinísticos de SQL             │
│ 14:50 - 15:30   │ Bloco 3: Servidor FastMCP Oficial do DataOps Agent     │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:10   │ Bloco 4: Loop ReAct Autônomo com Auto-Correção de SQL  │
│ 16:10 - 16:25   │ Bloco 5: Bateria de Testes Adversariais de Injeção     │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub do Trio (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_18.html) │
│ 16:45 - 17:00   │ Bloco 8: Formulário Diário de Auto-Avaliação & Feedback│
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

* **Tempo Dedicado:** 15 minutos (leitura individual e alinhamento no trio).
* **Foco Teórico:** Por que "prompts de segurança" não funcionam sozinhos contra ataques de injeção e jailbreak em bancos de dados, e a necessidade arquitetural de barreiras de proteção determinísticas em código hospedeiro (guardrails em Python) que validam comandos antes da chamada ao banco.
* <!-- CAMADA 2: Inserir referências sobre segurança em Text-to-SQL e guardrails de agentes de IA -->

---

## 🛡️ 4. Bloco 2: Guardrails Determinísticos de SQL (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Novo Piloto no teclado).
* **Objetivo:** Criar o arquivo `src/agent/guardrails.py`.
  - Implementar a função `validar_query_segura(query: str) -> tuple[bool, str]`:
    - Normalizar o texto da query (remover comentários SQL `--` e `/* */`, espaços extras e converter para maiúsculas para inspeção de tokens).
    - Verificar que o primeiro comando inicia rigorosamente com `SELECT` ou `WITH`.
    - Bloquear palavras-chave de alteração e destruição: `DROP`, `DELETE`, `UPDATE`, `INSERT`, `ALTER`, `TRUNCATE`, `ATTACH`, `DETACH`, `CREATE`, `REPLACE`, `EXEC`, `VACUUM`.
    - Bloquear execução de múltiplos statements separados por ponto e vírgula (prevenção contra `; DROP TABLE`).
    - Retornar `(True, "Query aprovada")` ou `(False, "Motivo do bloqueio")`.
* <!-- CAMADA 2: Código completo do validador de guardrails sem emojis em código -->

---

## 🔌 5. Bloco 3: Servidor FastMCP Oficial do DataOps Agent (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/mcp_server/dataops_mcp.py`.
  - Instanciar o servidor `mcp = FastMCP("DataOpsAgentServer")`.
  - Expor as ferramentas desenvolvidas no Dia 17 através de `@mcp.tool`:
    1. `listar_tabelas() -> list[str]`
    2. `descrever_schema(nome_tabela: str) -> dict`
    3. `obter_relacionamentos(nome_tabela: str) -> list[dict]`
    4. `executar_query_analitica(query: str, limite: int = 50) -> dict` (integrando a validação de `validar_query_segura` antes de qualquer execução!)
    5. `calcular_estatisticas_coluna(nome_tabela: str, nome_coluna: str) -> dict`
  - Validar a inicialização do servidor via subprocesso `stdio`.
* <!-- CAMADA 2: Código do servidor FastMCP do DataOps Agent sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## 🔄 7. Bloco 4: Loop ReAct Autônomo com Auto-Correção de SQL (15:45 - 16:10)

* **Tempo Dedicado:** 25 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/agent/dataops_agent.py`.
  - Implementar a classe `DataOpsAgent` orquestrando o loop ReAct sobre o servidor FastMCP com `gemini-3.8-flash`.
  - Adicionar o fluxo de **auto-recuperação**:
    - Se a query gerar um erro sintático no SQLite (ex: erro de digitação de coluna), a mensagem de erro é capturada e reenviada ao Gemini como `FunctionResponse` de erro.
    - O Gemini lê o erro, ajusta o SQL e tenta novamente.
    - O loop encerra ao atingir a resposta conclusiva ou o limite de segurança de 5 turnos.
* <!-- CAMADA 2: Código da orquestração ReAct com auto-recuperação sem emojis em código -->

---

## 💥 8. Bloco 5: Bateria de Testes Adversariais de Injeção (16:10 - 16:25)

* **Tempo Dedicado:** 15 minutos | **Formato:** Teste de Estresse em Trio.
* **Objetivo:** Criar o script `tests/test_guardrails_attacks.py`.
  - Simular 5 tentativas de ataque e injeção:
    1. Tentativa direta de `DROP TABLE`.
    2. Injeção acoplada com ponto e vírgula: `SELECT * FROM clientes; DELETE FROM pedidos;`.
    3. Tentativa de alteração com `UPDATE pedidos SET valor = 0`.
    4. Ataque disfarçado por comentário SQL: `SELECT 1; -- DROP TABLE clientes`.
    5. Pergunta adversária de usuário pedindo para o agente "limpar o banco para recarregar dados".
  - O script deve passar 100% comprovando que o banco permaneceu íntegro e intocado.
* <!-- CAMADA 2: Script de testes adversariais automatizados sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub do Trio (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Executar a suíte de testes de guardrails e agente, garantindo que o servidor MCP e o loop ReAct funcionam perfeitamente integrados, e realizar o Git Sync no repositório do trio.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_18.html`](quizzes/quiz_dia_18.html)
* **Formato:** Questões práticas sobre injeção SQL em agentes de IA, mitigação determinística com AST/regex, empacotamento de ferramentas no FastMCP e ciclos ReAct com auto-correção de queries.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 18](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 18:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre segurança e guardrails em agentes concluída.
- [x] Módulo `guardrails.py` implementado bloqueando comandos de escrita e alteração.
- [x] Servidor FastMCP `dataops_mcp.py` expondo as ferramentas de dados via `stdio`.
- [x] Loop ReAct implementado com auto-correção de erros de query SQL.
- [x] Bateria de testes adversariais `test_guardrails_attacks.py` aprovada com 100% de sucesso.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 18 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de talk sobre ataques de prompt injection indireto e segurança em agentes autônomos -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir validador de queries SQL utilizando o parser de AST sqlglot em Python para análise semântica estrutural -->
