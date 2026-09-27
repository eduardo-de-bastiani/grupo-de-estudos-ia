# 🚀 Sprint 2: Agentes Autônomos, Function Calling & Model Context Protocol (MCP)

**Período:** 28/09 a 09/10 (10 Encontros - 30 Horas)  
**Parceiros:** Navi Hub (Tecnopuc) & DataLakers  
**Público:** 15 alunos dos cursos de Computação (PUCRS)  
**Formato:** Presencial Autônomo e Colaborativo (Guias Diários Autodirigidos)

---

## 🎯 1. Objetivo da Sprint

Na Sprint 1, a LLM aprendeu a *ler e fundamentar respostas em documentos* por meio de RAG.  
Na **Sprint 2**, os modelos de linguagem dão o salto para a **ação autônoma no mundo real**:
1. **Saídas Estruturadas & Schemas:** Garantir que o modelo responda estritamente sob contratos JSON validados por Pydantic.
2. **Function Calling & Tool Use:** Capacitar o modelo **`gemini-3.8-flash`** a decidir autonomamente quando e quais funções Python invocar.
3. **Loops de Agentes (ReAct):** Construir ciclos de raciocínio, ação e observação em múltiplos turnos sem bibliotecas "caixa-preta".
4. **Model Context Protocol (MCP):** Dominar o padrão aberto da indústria para conectar IAs a servidores de ferramentas e recursos locais via transporte padrão `stdio`.
5. **Projeto Cumulativo *DataOps Agent*:** Construir em trios um agente inteligente local capaz de auditar esquemas, inspecionar bancos SQLite locais e diagnosticar anomalias de dados com interface gráfica e rastreabilidade total.

---

## 🗓️ 2. Calendário e Navegação Diária

| Dia | Data | Fase | Título do Encontro | Foco Principal |
| :---: | :---: | :---: | :--- | :--- |
| **11** | 28/09 (Seg) | Fundamentos | [Structured Outputs & Validação com Pydantic](dia_11_structured_outputs_pydantic.md) | Contratos estritos de saída JSON, schemas Pydantic e extração determinística |
| **12** | 29/09 (Ter) | Fundamentos | [Function Calling & Chamada de Ferramentas Nativas](dia_12_function_calling_tools.md) | Declaração de Tools, geração de argumentos e resolução de chamadas de função |
| **13** | 30/09 (Qua) | Fundamentos | [Loops de Agentes Autônomos (Padrão ReAct)](dia_13_loops_agentes_react.md) | Ciclo Raciocínio-Ação-Observação em múltiplos passos com resolução autônoma |
| **14** | 01/10 (Qui) | Protocolo MCP | [Model Context Protocol: Arquitetura, Clientes e Servidores](dia_14_mcp_arquitetura_servidores.md) | O protocolo MCP aberto, arquitetura cliente-servidor local e transporte stdio |
| **15** | 02/10 (Sex) | Protocolo MCP | [Servidores MCP Locais em Python & Formação dos Novos Trios](dia_15_servidores_mcp_locais_formacao_trios.md) | Criação de servidores FastMCP locais e formação das novas squads para o projeto |
| **16** | 05/10 (Seg) | Projeto | [Kickoff do DataOps Agent, Modelagem de Dados & Setup Git](dia_16_kickoff_projeto_dataops_agent.md) | Definição da base analítica SQLite, arquitetura do agente e setup colaborativo |
| **17** | 06/10 (Ter) | Projeto | [Ferramentas de Dados: Inspeção e Consultas SQL no SQLite](dia_17_ferramentas_dados_sql_sqlite.md) | Construção das tools de schema, execução de queries analíticas e profiling de dados |
| **18** | 07/10 (Qua) | Projeto | [Servidor MCP do Agente & Guardrails de Segurança](dia_18_mcp_server_agente_guardrails.md) | Empacotamento MCP local, orquestração autônoma e bloqueio de queries destrutivas |
| **19** | 08/10 (Qui) | Projeto | [Interface Streamlit, Logs de Ferramentas & Ensaio do Pitch](dia_19_interface_streamlit_explicabilidade.md) | UI interativa no Streamlit com rastreabilidade de chamadas e simulação de pitch |
| **20** | 09/10 (Sex) | Demo Day 2 | [Demo Day da Sprint 2 & Pitch para a DataLakers](dia_20_demo_day_pitch_sprint2.md) | Demonstração ao vivo para liderança técnica, votação e retrospectiva ágil |

---

## 🛠️ 3. O Projeto da Sprint 2: "DataOps Agent"

### O Problema de Negócio:
Em empresas orientadas a dados (como a DataLakers), analistas e engenheiros gastam horas diárias escrevendo queries repetitivas para auditar esquemas, checar valores nulos ou anômalos em tabelas e consultar documentações técnicas dispersas.

### A Solução a ser construída pelos Trios:
Um assistente inteligente local e autônomo que:
1. Conecta-se a uma base de dados relacional local **SQLite** (plug-and-play, sem instalação de servidores ou custos).
2. Expõe ferramentas analíticas padronizadas via servidor local **Model Context Protocol (MCP)**.
3. Raciocina sobre perguntas em linguagem natural, inspeciona o schema das tabelas, gera e executa queries SQL analíticas de leitura.
4. Aplica **guardrails rígidos de segurança** (bloqueio determinístico de comandos de escrita/destruição como `DROP`, `DELETE` ou `UPDATE`).
5. Apresenta os dados tabulares e o raciocínio detalhado em uma interface web interativa feita com **Streamlit**, mostrando visualmente quais ferramentas foram chamadas a cada turno.

---

## 💻 4. Premissas Técnicas e Custo Zero

* **Modelo:** `gemini-3.8-flash` via Google AI Studio (gratuito, sem cartão de crédito).
* **SDK:** `google-genai` oficial em Python.
* **Banco de Dados:** SQLite nativo do Python (`import sqlite3`, zero configuração).
* **Protocolo:** SDK oficial `mcp` (série 1.x, `mcp<2`) em Python com `FastMCP` via transporte local `stdio`.
* **Frontend:** Streamlit local (`localhost:8501`).

---

## 🧩 5. Materiais de Apoio

| Recurso | Onde está | Para que serve |
| :--- | :--- | :--- |
| **Quizzes interativos** | [`quizzes/quiz_dia_11.html`](quizzes/quiz_dia_11.html) a [`quiz_dia_20.html`](quizzes/quiz_dia_20.html) | Fixação do conteúdo do dia (12 a 15 questões com gabarito comentado). Abrem direto no navegador. |
| **Atividades interativas** | [`quizzes/atividade_dia_11.html`](quizzes/atividade_dia_11.html) a [`atividade_dia_20.html`](quizzes/atividade_dia_20.html) | Desafios de "encontrar o erro no código", ordenar etapas, classificar conceitos e testar você mesmo (guardrail SQL, envelopes JSON-RPC, contratos Pydantic). |
| **Formulários** | [`formularios/README.md`](formularios/README.md) e [`formularios/criar_formularios_sprint2.gs`](formularios/criar_formularios_sprint2.gs) | Especificação dos 3 formulários da Sprint 2 e script Google Apps Script que os gera. |

> Os quizzes e as atividades funcionam offline: basta dar dois cliques no arquivo `.html` (ou usar a extensão Live Server do VS Code). O melhor resultado de cada um fica salvo no navegador.

### ⚙️ Instalação de referência (Semana 1)
```
pip install google-genai pydantic python-dotenv "mcp<2"
```
O pacote `mcp` é fixado na série 1.x porque a série 2.x renomeou o `FastMCP` usado nos roteiros.
