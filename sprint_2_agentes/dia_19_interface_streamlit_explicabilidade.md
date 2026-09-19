# 📅 Dia 19 (08/10 - Quinta-feira)
# 🖥️ Interface Web Streamlit, Rastreabilidade de Ferramentas & Ensaio do Pitch

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Construir uma interface web interativa em **Streamlit** (`app.py`), transformando o agente de terminal em um produto visual acabado e intuitivo para analistas de dados e gestores.
2. Implementar o painel visual de **Explicabilidade & Rastreabilidade de Ferramentas** (*Tool Execution Trace Drawer*): exibindo detalhadamente a cada turno quais ferramentas MCP foram chamadas, os argumentos passados, a validação de guardrails e o SQL executado.
3. Incorporar na barra lateral métricas de saúde da base SQLite local (total de tabelas ativas, contagem de registros, status de conexão).
4. Implementar a renderização dinâmica de dados analíticos: combinando a resposta sintetizada pelo `gemini-3.8-flash`, tabelas interativas (`st.dataframe`) e gráficos automáticos (`st.bar_chart` / `st.line_chart`).
5. Realizar o **Ensaio Geral Cronometrado do Pitch** de 5 minutos por trio, estruturando a divisão de falas e testando o fluxo da live demo para o Demo Day de amanhã.
6. Gerar a tag de entrega oficial `v1.0-demo-day` no repositório do trio e consolidar os aprendizados no **Quiz do Dia**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: UX & Explicabilidade     │
│ 14:20 - 14:50   │ Bloco 2: Construção da Interface Streamlit Básica      │
│ 14:50 - 15:30   │ Bloco 3: Painel de Rastreabilidade & Explicabilidade   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:05   │ Bloco 4: Métricas do Banco na Sidebar & Gráficos       │
│ 16:05 - 16:25   │ Bloco 5: Ensaio Geral Cronometrado do Pitch de 5 Min   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub (v1.0-demo-day)       │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_19.html) │
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
* **Foco Teórico:** O conceito de *Glass-Box AI* (IA Caixa de Vidro): por que em aplicações de dados e finanças os usuários não confiam apenas na resposta em texto, mas exigem auditar o SQL gerado, as ferramentas consultadas e a procedência dos dados para validar conclusões analíticas.
* <!-- CAMADA 2: Inserir links de referência sobre UI/UX para agentes de IA e explicabilidade -->

---

## 💻 4. Bloco 2: Construção da Interface Streamlit Básica (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Novo Piloto no teclado).
* **Objetivo:** Criar o arquivo `app.py`.
  - Configurar página Streamlit (`st.set_page_config`) com título do DataOps Agent e tema escuro/claro.
  - Inicializar histórico de conversação com `st.session_state.messages`.
  - Implementar o componente `st.chat_input` conectado à classe `DataOpsAgent`.
  - Renderizar mensagens anteriores e novas com `st.chat_message`.
* <!-- CAMADA 2: Código inicial do app.py em Streamlit sem emojis em código -->

---

## 🔍 5. Bloco 3: Painel de Rastreabilidade & Explicabilidade (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** No arquivo `app.py`, implementar a gaveta expansível de auditoria:
  - Abaixo de cada resposta do agente, adicionar `with st.expander("🛠️ Rastro de Execução das Ferramentas MCP", expanded=False):`.
  - Exibir para cada turno executado pelo loop ReAct:
    - Nome da ferramenta MCP chamada e argumentos recebidos.
    - Status de validação do Guardrail de SQL (`✅ Aprovado pelo Guardrail` ou `❌ Bloqueado`).
    - Bloco de código com a query SQL exata que foi executada no SQLite.
    - Tempo de execução da consulta em milissegundos.
  - Exibir a tabela com os dados brutos retornados pelo SQLite usando `st.dataframe`.
* <!-- CAMADA 2: Código da gaveta de explicabilidade e renderização de metadados sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## 📊 7. Bloco 4: Métricas do Banco na Sidebar & Gráficos (15:45 - 16:05)

* **Tempo Dedicado:** 20 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Finalizar o acabamento visual do produto:
  - **Sidebar:** Adicionar cards de métricas usando `st.sidebar.metric` (ex: número total de tabelas, total de registros auditados, status da base `dataops.db`).
  - **Gráficos Automáticos:** Quando o resultado da query contiver colunas categóricas e numéricas, renderizar um gráfico de barras com `st.bar_chart` logo após a tabela.
  - Testar o fluxo completo com uma pergunta de negócio real da base do trio.
* <!-- CAMADA 2: Código dos componentes de sidebar e gráficos sem emojis em código -->

---

## 🎤 8. Bloco 5: Ensaio Geral Cronometrado do Pitch de 5 Minutos (16:05 - 16:25)

* **Tempo Dedicado:** 20 minutos | **Formato:** Simulação e Ensaio no Trio.
* **Objetivo:** Cada trio realiza uma rodada completa de ensaio cronometrado de 5 minutos, com divisão clara de falas:
  1. **Minuto 1 (Problema & Domínio):** Apresentação do domínio de dados e das dores analíticas que o assistente resolve.
  2. **Minuto 2 a 3 (Live Demo):** Execução ao vivo de uma pergunta analítica complexa, exibindo a tabela e a conclusão em linguagem natural.
  3. **Minuto 4 (Explicabilidade & Segurança):** Abertura do rastro de ferramentas MCP na tela e demonstração ao vivo de um comando malicioso (`DROP TABLE`) sendo barrado na hora pelo guardrail.
  4. **Minuto 5 (Arquitetura & Conclusões):** Visão dos componentes técnicos (SQLite, FastMCP, ReAct, `gemini-3.8-flash`) e principais aprendizados do trio.
* <!-- CAMADA 2: Checklist do ensaio e rubrica de avaliação dos pitches sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub (Release v1.0-demo-day) (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:**
  - Atualizar o `README.md` do repositório do trio com: instruções de instalação, variáveis de ambiente necessárias e capturas de tela da aplicação Streamlit em funcionamento.
  - Criar e enviar a tag de versão final:
    ```bash
    git tag v1.0-demo-day
    git push origin v1.0-demo-day
    ```

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_19.html`](quizzes/quiz_dia_19.html)
* **Formato:** Questões práticas sobre componentes de UI em Streamlit, manipulação de estado (`st.session_state`), renderização de dados tabulares e padrões de explicabilidade em sistemas agênticos.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 19](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 19:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre UX e explicabilidade de agentes concluída.
- [x] Interface Streamlit implementada com chat conversacional e sidebar de métricas.
- [x] Painel de rastreabilidade de ferramentas MCP exibindo queries e guardrails.
- [x] Gráficos analíticos renderizados automaticamente para resultados tabulares.
- [x] Ensaio geral do pitch de 5 minutos realizado com sucesso pelo trio.
- [x] Repositório final documentado e sincronizado com tag `v1.0-demo-day`.
- [x] Quiz interativo do Dia 19 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo sobre design de interfaces e transparência algorítmica para sistemas inteligentes -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script utilitário para exportar o histórico de perguntas e queries SQL da sessão Streamlit em formato CSV/PDF -->
