# 📅 Dia 16 (05/10 - Segunda-feira)
# 🚀 Kickoff do Projeto DataOps Agent: Arquitetura, Base SQLite & Setup Git

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Realizar o **Kickoff Oficial do Projeto *DataOps Agent***, compreendendo a arquitetura modular completa (SQLite + MCP + ReAct + Guardrails + Streamlit) para o Demo Day 2 da Sprint 2.
2. Definir o domínio temático de dados de cada trio e documentar o dicionário de dados analíticos (entidades, tipos de colunas, chaves primárias e relacionamentos).
3. Modelar o banco relacional local em **SQLite** (`data/dataops.db`) e criar o script `src/database/init_db.py` com no mínimo 3 tabelas conectadas por chaves estrangeiras (`FOREIGN KEY`).
4. Desenvolver o script de carga `src/database/seed_data.py` com dados realistas, injetando deliberadamente anomalias (valores nulos em campos críticos, duplicatas e outliers) para o agente auditar nos próximos dias.
5. Configurar o repositório Git colaborativo do trio com estrutura modular de pastas, `.gitignore` seguro e definição da escala rotativa de Piloto/Copiloto.
6. Executar o **Smoke Test Cruzado** (`tests/smoke_test_db.py`): validar que todos os 3 integrantes conseguem clonar o repositório, inicializar a base e executar consultas de verificação.
7. Consolidar os conceitos no **Quiz Interativo** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Padrões de DataOps Agent │
│ 14:20 - 14:40   │ Bloco 2: Alinhamento no Trio & Dicionário de Dados     │
│ 14:40 - 15:10   │ Bloco 3: Modelagem Relacional & DDL do SQLite          │
│ 15:10 - 15:30   │ Bloco 4: Carga de Dados Realistas & Injeção Anomalias  │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:05   │ Bloco 5: Setup do Repositório Git Modular              │
│ 16:05 - 16:25   │ Bloco 6: Smoke Test Cruzado do Banco no Trio           │
│ 16:25 - 16:35   │ Bloco 7: Sincronização no GitHub do Trio (v0.1-setup)  │
│ 16:35 - 16:45   │ Bloco 8: Quiz Interativo de Fixação (quiz_dia_16.html) │
│ 16:45 - 17:00   │ Bloco 9: Formulário Diário de Auto-Avaliação & Feedback│
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
* **Foco Teórico:** O papel do DataOps na indústria (auditoria contínua da integridade de dados, automação de consultas repetitivas e governança), e como arquiteturas agênticas locais com SQLite eliminam complexidade de infraestrutura.
* <!-- CAMADA 2: Inserir links de referência técnica sobre DataOps e bancos analíticos locais -->

---

## 🧭 4. Bloco 2: Alinhamento no Trio & Dicionário de Dados (14:20 - 14:40)

* **Tempo Dedicado:** 20 minutos | **Formato:** Dinâmica em Trio.
* **Objetivo:**
  - Bater o martelo no domínio de dados do trio (ex: *E-commerce de Varejo*, *Telemetria de Servidores Cloud*, *Faturamento de Saúde* ou *Gestão de Frotas*).
  - Preencher o documento `docs/dicionario_dados.md` descrevendo:
    - Nome de cada uma das 3 tabelas mínimas.
    - Colunas, tipos SQLite (`INTEGER`, `TEXT`, `REAL`, `DATETIME`) e restrições (`PRIMARY KEY`, `NOT NULL`, `FOREIGN KEY`).
    - Pelo menos 5 perguntas de negócio que o assistente precisará responder ao final do projeto.
* <!-- CAMADA 2: Modelo de markdown para o dicionário de dados sem emojis em código -->

---

## 🏛️ 5. Bloco 3: Modelagem Relacional & DDL do SQLite (14:40 - 15:10)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Piloto no teclado).
* **Objetivo:** Criar o script `src/database/init_db.py`.
  - Conectar ao arquivo local `data/dataops.db` utilizando `sqlite3` nativo do Python (zero dependências externas).
  - Executar os comandos DDL (`CREATE TABLE IF NOT EXISTS`) garantindo ativação de chaves estrangeiras com `PRAGMA foreign_keys = ON;`.
  - Criar índices nas colunas mais consultadas para otimização analítica.
* <!-- CAMADA 2: Código do script de inicialização do banco SQLite sem emojis em código -->

---

## 🧪 6. Bloco 4: Carga de Dados Realistas & Injeção de Anomalias (15:10 - 15:30)

* **Tempo Dedicado:** 20 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o script `src/database/seed_data.py`.
  - Inserir um volume representativo de dados (mínimo de 50 a 100 linhas por tabela) para permitir agregações reais (`COUNT`, `SUM`, `AVG`, `GROUP BY`).
  - **Injeção Deliberada de Anomalias de Dados:** Inserir propositalmente casos de teste para o agente auditar nos próximos dias:
    - Registros com campos nulos onde deveriam existir valores (ex: e-mail nulo, preço zerado).
    - Registros inconsistentes ou outliers (ex: pedido com data no futuro ou valor negativo).
* <!-- CAMADA 2: Script gerador de dados sintéticos e injeção de casos anômalos sem emojis em código -->

---

## ☕ 7. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## 📂 8. Bloco 5: Setup do Repositório Git Modular (15:45 - 16:05)

* **Tempo Dedicado:** 20 minutos | **Formato:** Trabalho Colaborativo em Trio.
* **Objetivo:**
  - Inicializar o repositório colaborativo no GitHub compartilhado entre os 3 membros.
  - Estruturar o projeto com pastas modulares:
    ```
    dataops-agent/
    ├── src/
    │   ├── database/     # Scripts DDL, seed e conexão SQLite
    │   ├── tools/        # Ferramentas analíticas e de schema
    │   ├── agent/        # Loop ReAct e guardrails de segurança
    │   └── mcp_server/   # Servidor FastMCP local
    ├── data/             # dataops.db (e .gitkeep)
    ├── tests/            # Scripts de teste automatizado e smoke tests
    ├── docs/             # Dicionário de dados e arquitetura
    ├── app.py            # Interface Streamlit
    ├── .gitignore        # Ignorando .env, __pycache__, etc.
    └── README.md         # Documentação e instruções de execução
    ```
  - Definir a escala de **Piloto Rotativo** no `README.md` para os Dias 16, 17, 18, 19 e 20.
* <!-- CAMADA 2: Template de .gitignore e regras de trabalho colaborativo em trio -->

---

## 🔍 9. Bloco 6: Smoke Test Cruzado do Banco no Trio (16:05 - 16:25)

* **Tempo Dedicado:** 20 minutos | **Formato:** Teste Cruzado nas Máquinas dos 3 Integrantes.
* **Objetivo:** Criar o script `tests/smoke_test_db.py`.
  - Cada membro do trio faz pull do código em seu próprio notebook e executa o script de teste.
  - O script verifica: integridade do arquivo `dataops.db`, contagem de registros em cada tabela, execução de uma query com `JOIN` e detecção dos registros anômalos injetados.
  - Os 3 membros devem obter 100% de sucesso na execução local.
* <!-- CAMADA 2: Código do smoke test automatizado sem emojis em código -->

---

## 🐙 10. Bloco 7: Sincronização no GitHub do Trio (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Realizar a primeira entrega oficial de código da Semana 2 no GitHub do trio com a tag `v0.1-setup`, garantindo que todo o trio possui exatamente a mesma base sincronizada.

---

## 🧠 11. Bloco 8: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_16.html`](quizzes/quiz_dia_16.html)
* **Formato:** Questões práticas sobre modelagem relacional em SQLite, integridade referencial com chaves estrangeiras, boas práticas de semente de dados e estrutura de repositórios modulares.

---

## 📝 12. Bloco 9: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 16](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 16:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura de arquitetura DataOps concluída.
- [x] Domínio e dicionário de dados definidos em `docs/dicionario_dados.md`.
- [x] Tabelas relacionais criadas via `src/database/init_db.py`.
- [x] Base populada com dados realistas e anomalias via `src/database/seed_data.py`.
- [x] Repositório Git modular configurado com escala de pilotos.
- [x] Smoke test cruzado aprovado na máquina de todos os 3 integrantes.
- [x] Repositório sincronizado no GitHub com tag `v0.1-setup`.
- [x] Quiz interativo do Dia 16 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo técnico sobre boas práticas de modelagem relacional em SQLite -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script utilitário de geração de diagrama ER textual automático a partir do schema SQLite -->
