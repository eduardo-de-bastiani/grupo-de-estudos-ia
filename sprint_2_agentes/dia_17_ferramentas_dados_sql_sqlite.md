# 📅 Dia 17 (06/10 - Terça-feira)
# 🔍 Ferramentas de Dados: Inspeção de Schema, Profiling & Consultas SQL no SQLite

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Compreender as boas práticas de **Text-to-SQL em produção** e a técnica de **Schema Grounding**: como alimentar o modelo de linguagem com metadados estruturados dinâmicos para prevenir alucinações de tabelas ou nomes de colunas inexistentes.
2. Implementar o módulo de **Inspeção de Schemas e Metadados** (`src/tools/schema_tools.py`): funções determinísticas para listar tabelas, detalhar colunas, tipos e mapear chaves relacionais.
3. Desenvolver o módulo de **Profiling e Qualidade de Dados** (`src/tools/profiling_tools.py`): funções para contagem de registros nulos, cardinalidade de valores distintos, distribuições e amostragem de dados.
4. Construir o módulo de **Execução de Queries Analíticas** (`src/tools/query_tools.py`): execução de consultas SQL no SQLite com sanitização, paginação de segurança obrigatória (`LIMIT 50`) e conversão para estruturas JSON consumíveis.
5. Realizar o teste preliminar de integração com `gemini-3.8-flash` via **Function Calling** nativo (`src/agent/test_tools_llm.py`), validando a capacidade do modelo de responder perguntas de negócio invocando as ferramentas criadas.
6. Sincronizar o repositório colaborativo no GitHub e responder ao **Quiz do Dia**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Text-to-SQL & Grounding  │
│ 14:20 - 14:50   │ Bloco 2: Módulo de Ferramentas de Schema & Metadados   │
│ 14:50 - 15:30   │ Bloco 3: Módulo de Profiling Estatístico & Qualidade   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:10   │ Bloco 4: Ferramenta de Execução SQL com Paginação      │
│ 16:10 - 16:25   │ Bloco 5: Teste Preliminar de Function Calling com LLM  │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub do Trio (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_17.html) │
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
* **Foco Teórico:** Por que fornecer o banco inteiro no prompt é inviável em produção (consumo de contexto e alucinação) e como dividir a consulta Text-to-SQL em duas fases: (1) descoberta do schema relevante; (2) geração e execução controlada da query SQL.
* <!-- CAMADA 2: Inserir links de referência sobre Text-to-SQL robusto e engenharia de schema -->

---

## 📋 4. Bloco 2: Módulo de Ferramentas de Schema & Metadados (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Novo Piloto no teclado).
* **Objetivo:** Criar o arquivo `src/tools/schema_tools.py`.
  - Conectar ao banco `data/dataops.db`.
  - Implementar as funções com tipagem Pydantic e docstrings explicativas:
    1. `listar_tabelas() -> list[str]`: consulta a tabela `sqlite_master` retornando os nomes das tabelas de dados.
    2. `descrever_schema_tabela(nome_tabela: str) -> dict`: executa `PRAGMA table_info()` retornando colunas, tipos de dados e restrições.
    3. `obter_chaves_estrangeiras(nome_tabela: str) -> list[dict]`: executa `PRAGMA foreign_key_list()` para que a LLM entenda as relações entre tabelas antes de escrever `JOIN`s.
* <!-- CAMADA 2: Código completo do módulo schema_tools.py sem emojis em código -->

---

## 📊 5. Bloco 3: Módulo de Profiling Estatístico & Qualidade (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/tools/profiling_tools.py`.
  - Implementar ferramentas de auditoria analítica que respondem prontamente sobre a saúde dos dados:
    1. `contar_nulos_e_distintos(nome_tabela: str, nome_coluna: str) -> dict`: retorna total de linhas, contagem de nulos, percentual de preenchimento e valores únicos.
    2. `calcular_estatisticas_coluna(nome_tabela: str, nome_coluna: str) -> dict`: calcula `MIN`, `MAX`, `AVG` e `TOTAL` para colunas numéricas.
    3. `amostrar_linhas(nome_tabela: str, qtd: int = 5) -> list[dict]`: retorna uma amostra representativa de linhas para que o modelo entenda a formatação dos dados.
* <!-- CAMADA 2: Código completo do módulo profiling_tools.py sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## ⚡ 7. Bloco 4: Ferramenta de Execução SQL com Paginação (15:45 - 16:10)

* **Tempo Dedicado:** 25 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/tools/query_tools.py`.
  - Implementar `executar_query_analitica(query: str, limite_linhas: int = 50) -> dict`:
    - Inspecionar a query e assegurar a inclusão ou reforço de cláusula `LIMIT`.
    - Executar o cursor com `cursor.execute(query)`.
    - Recuperar os nomes das colunas via `cursor.description` e formatar as linhas em lista de dicionários (`[{"coluna": "valor"}]`).
    - Medir e retornar o tempo de execução em milissegundos.
* <!-- CAMADA 2: Código do executor analítico com paginação e medição de latência sem emojis em código -->

---

## 🤖 8. Bloco 5: Teste Preliminar de Function Calling com LLM (16:10 - 16:25)

* **Tempo Dedicado:** 15 minutos | **Formato:** Testes e Integração no Trio.
* **Objetivo:** Criar o script de verificação `src/agent/test_tools_llm.py`.
  - Declarar as funções dos 3 módulos criados como ferramentas para o `gemini-3.8-flash`.
  - Submeter uma pergunta de negócio real da base do trio (ex: *"Quantos registros nulos temos na tabela de clientes?"* ou *"Qual a média de vendas por produto?"*).
  - Validar que o Gemini escolhe autonomamente a ferramenta de schema ou profiling correta, executa e imprime a resposta final no terminal.
* <!-- CAMADA 2: Script de teste preliminar conectando as ferramentas ao Gemini sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub do Trio (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Executar testes locais dos módulos `schema_tools.py`, `profiling_tools.py` e `query_tools.py`, garantindo que não há falhas de importação, e sincronizar o repositório colaborativo via commit e push.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_17.html`](quizzes/quiz_dia_17.html)
* **Formato:** Questões práticas sobre comandos `PRAGMA` do SQLite, técnicas de schema grounding, agregação estatística com SQL e estratégias de limitação de volume de dados retornados para a LLM.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 17](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 17:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre Text-to-SQL e grounding de schemas concluída.
- [x] Módulo `schema_tools.py` implementado e inspecionando tabelas e chaves.
- [x] Módulo `profiling_tools.py` calculando métricas e detectando anomalias.
- [x] Módulo `query_tools.py` executando queries analíticas com limite de segurança.
- [x] Teste de integração `test_tools_llm.py` executando chamadas de função com `gemini-3.8-flash`.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 17 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo sobre engenharia de contexto para Text-to-SQL corporativo -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script de renderização tabular colorida para terminal via tabulate/rich -->
