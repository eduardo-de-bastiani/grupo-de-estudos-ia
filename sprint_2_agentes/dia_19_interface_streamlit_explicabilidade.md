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
6. Gerar a tag de entrega oficial `v1.0-demo-day` no repositório do trio e consolidar os aprendizados no **Quiz do Dia** e na **Atividade Interativa**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: UX & Explicabilidade     │
│ 14:20 - 14:50   │ Bloco 2: Construção da Interface Streamlit Básica      │
│ 14:50 - 15:30   │ Bloco 3: Painel de Rastreabilidade & Explicabilidade   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:00   │ Bloco 4: Métricas do Banco na Sidebar & Gráficos       │
│ 16:00 - 16:25   │ Bloco 5: Ensaio Geral Cronometrado do Pitch de 5 Min   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub (v1.0-demo-day)       │
│ 16:35 - 16:45   │ Bloco 7: Quiz + Atividade Interativa (dia 19)          │
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
**IA caixa de vidro.** Se o seu agente responde "há 6 clientes sem e-mail", um analista cuidadoso vai perguntar: *como você chegou nesse número?* Em dados e finanças, uma resposta correta **que ninguém consegue auditar** vale pouco, porque a confiança precisa ser conquistada com evidências. A abordagem de **Glass-Box AI** (IA caixa de vidro) devolve ao usuário o poder de verificar: qual ferramenta foi chamada, com quais argumentos, qual SQL exato foi executado, o que o guardrail decidiu e quanto tempo levou. É o que você já produz no `trace` do Dia 18; hoje ele vira interface.

**O que a pesquisa de UX diz sobre confiança em IA.** O guia *People + AI* do Google (PAIR) sintetiza décadas de pesquisa: usuários tendem a confiar demais em sistemas que parecem confiantes, e a desconfiar demais quando a IA erra uma vez. A saída é **calibrar** a confiança, mostrando o que o sistema sabe, como sabe e quando pode estar errado. Padrões práticos: revelar as fontes, exibir as etapas em uma área recolhível (*progressive disclosure*: quem quer detalhe abre, quem não quer não é poluído), tornar o erro visível e explicável, e nunca esconder que uma ação foi bloqueada.

**Streamlit em uma página.** O Streamlit reexecuta o seu script inteiro a cada interação do usuário. Por isso, o que precisa sobreviver entre interações (histórico da conversa, por exemplo) fica em `st.session_state`. Os componentes de chat (`st.chat_message`, `st.chat_input`) foram feitos para conversas com LLMs; `st.expander` cria a gaveta recolhível do rastro; `st.dataframe` mostra tabelas interativas; `st.bar_chart` desenha gráficos com uma linha de código. Um detalhe importante: como o script roda de novo a cada mensagem, **as mensagens antigas precisam ser redesenhadas** a partir do `session_state` (é o laço `for` que você verá no scaffold).

* [Streamlit: Build a basic LLM chat app](https://docs.streamlit.io/develop/tutorials/chat-and-llm-apps/build-conversational-apps)
* [Streamlit: Session State](https://docs.streamlit.io/develop/concepts/architecture/session-state)

---

## 💻 4. Bloco 2: Construção da Interface Streamlit Básica (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Novo Piloto no teclado).
* **Objetivo:** Criar o arquivo `app.py`.
  - Configurar página Streamlit (`st.set_page_config`) com título do DataOps Agent e tema escuro/claro.
  - Inicializar histórico de conversação com `st.session_state.messages`.
  - Implementar o componente `st.chat_input` conectado à classe `DataOpsAgent`.
  - Renderizar mensagens anteriores e novas com `st.chat_message`.
**Scaffold de `app.py` (na raiz do repositório):** o esqueleto já conversa com o agente do Dia 18. As funções `renderizar_trace` e `renderizar_dados` ficam como *stubs* agora e são implementadas no Bloco 3. Instale se necessário: `pip install streamlit`.

```python
import asyncio

import streamlit as st

from src.agent.dataops_agent import DataOpsAgent

st.set_page_config(page_title="DataOps Agent", layout="wide")


def inicializar_estado() -> None:
    if "messages" not in st.session_state:
        st.session_state.messages = []      # o que aparece na tela: {"role", "content", "trace"}
    if "historico_llm" not in st.session_state:
        st.session_state.historico_llm = []  # a memoria do modelo (types.Content)


async def _consultar(pergunta: str, historico_llm: list) -> dict:
    async with DataOpsAgent(historico=historico_llm) as agente:
        return await agente.perguntar(pergunta)


def perguntar_ao_agente(pergunta: str) -> dict:
    """O Streamlit e sincrono: abrimos o agente (e o servidor MCP) a cada pergunta e fechamos ao final."""
    return asyncio.run(_consultar(pergunta, st.session_state.historico_llm))


def renderizar_trace(trace: list[dict]) -> None:
    pass  # implementado no Bloco 3


def renderizar_dados(trace: list[dict]) -> None:
    pass  # implementado no Bloco 3


def renderizar_mensagem(mensagem: dict) -> None:
    with st.chat_message(mensagem["role"]):
        st.markdown(mensagem["content"])
        if mensagem.get("trace"):
            renderizar_dados(mensagem["trace"])
            renderizar_trace(mensagem["trace"])


def main() -> None:
    st.title("DataOps Agent")
    st.caption("Assistente de auditoria de dados: somente leitura, com rastreabilidade de cada ferramenta.")
    inicializar_estado()

    # TODO: redesenhe o historico: percorra st.session_state.messages e chame renderizar_mensagem em cada uma

    pergunta = st.chat_input("Pergunte algo sobre os dados...")
    if pergunta:
        # TODO: acrescente {"role": "user", "content": pergunta} ao estado e renderize a mensagem do usuario
        with st.spinner("Consultando o agente..."):
            try:
                saida = perguntar_ao_agente(pergunta)
                resposta = {"role": "assistant", "content": saida["resposta"], "trace": saida["trace"]}
            except Exception as erro:
                resposta = {"role": "assistant", "content": f"Nao consegui concluir: {erro}", "trace": []}
        # TODO: acrescente "resposta" ao estado e renderize a mensagem do assistente


main()
```

Execute com `streamlit run app.py` (o navegador abre em `localhost:8501`).

**Critério de sucesso:** a página abre, você pergunta *"Quantas tabelas existem no banco?"*, a resposta aparece em um balão de chat e **permanece na tela** depois da pergunta seguinte (prova de que o histórico é redesenhado a partir do `session_state`). Se a resposta sumir ao perguntar de novo, revisem o TODO do redesenho. Se aparecer `KeyError: 'GEMINI_API_KEY'`, o `.env` não está sendo lido: confirmem que ele está na raiz e que `load_dotenv()` roda no módulo do agente.

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
**Implemente `renderizar_trace` e `renderizar_dados` em `app.py`** (substituindo os stubs). O rastro é a *gaveta de vidro* do produto: recolhida por padrão, completa quando aberta. Repare que o SQL exibido é o que **realmente** foi executado, extraído do trace (não o que o modelo "disse" que executou).

```python
import pandas as pd


def renderizar_trace(trace: list[dict]) -> None:
    with st.expander(f"Rastro de ferramentas ({len(trace)} chamadas)", expanded=False):
        for passo in trace:
            st.markdown(f"**Turno {passo['turno']}: `{passo['ferramenta']}`** ({passo['tempo_ms']} ms)")
            # TODO: mostre os argumentos com st.json(passo["argumentos"])

            guardrail = passo.get("guardrail")
            if guardrail is not None:
                # TODO: se guardrail["aprovada"], use st.success("Aprovado pelo guardrail");
                #       senao st.error(f"Bloqueado pelo guardrail: {guardrail['motivo']}")
                pass

            if passo.get("query_sql"):
                # TODO: mostre o SQL com st.code(passo["query_sql"], language="sql")
                pass

            if not passo["sucesso"]:
                erro = passo["resultado"].get("erro") if isinstance(passo["resultado"], dict) else passo["resultado"]
                st.warning(f"A ferramenta retornou erro: {erro}")
            st.divider()


def renderizar_dados(trace: list[dict]) -> None:
    """Mostra a tabela da ULTIMA consulta analitica bem-sucedida do turno."""
    consultas = [
        p for p in trace
        if p["ferramenta"] == "executar_query_analitica" and p["sucesso"] and isinstance(p["resultado"], dict)
    ]
    if not consultas:
        return
    resultado = consultas[-1]["resultado"]
    # TODO: monte um DataFrame com pd.DataFrame(resultado["linhas"]) e exiba com st.dataframe(..., width="stretch")
```

**Critério de sucesso:** após perguntar *"Quantos clientes não têm e-mail?"*, abrir a gaveta mostra, na ordem, `listar_tabelas`, `descrever_schema` e `executar_query_analitica`, com o SQL exato em um bloco destacado, o selo verde do guardrail e o tempo em ms; e a tabela de dados aparece abaixo da resposta. **Teste de transparência:** peçam *"apague todos os pedidos"*. O usuário deve ver, na gaveta, o selo vermelho **ou** a recusa do modelo, e o banco deve continuar intacto. Um bom produto explica *por que* não fez algo.

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## 📊 7. Bloco 4: Métricas do Banco na Sidebar & Gráficos (15:45 - 16:00)

* **Tempo Dedicado:** 15 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Finalizar o acabamento visual do produto:
  - **Sidebar:** Adicionar cards de métricas usando `st.sidebar.metric` (ex: número total de tabelas, total de registros auditados, status da base `dataops.db`).
  - **Gráficos Automáticos:** Quando o resultado da query contiver colunas categóricas e numéricas, renderizar um gráfico de barras com `st.bar_chart` logo após a tabela.
  - Testar o fluxo completo com uma pergunta de negócio real da base do trio.
**Acrescente ao `app.py`:** métricas de saúde na barra lateral (lendo o banco em modo somente leitura) e gráfico automático quando o resultado tiver uma coluna de texto e uma numérica.

```python
import sqlite3

from src.database.init_db import CAMINHO_DB


def metricas_do_banco() -> dict:
    """Le metadados do banco sem alterar nada (modo read-only)."""
    if not CAMINHO_DB.exists():
        return {"status": "arquivo ausente", "tabelas": 0, "registros": 0}
    with sqlite3.connect(f"file:{CAMINHO_DB}?mode=ro", uri=True) as conexao:
        tabelas = [
            linha[0]
            for linha in conexao.execute("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
        ]
        # TODO: some o COUNT(*) de cada tabela para obter o total de registros
        registros = 0
    return {"status": "conectado", "tabelas": len(tabelas), "registros": registros}


def renderizar_sidebar() -> None:
    metricas = metricas_do_banco()
    st.sidebar.header("Saude da base")
    # TODO: use st.sidebar.metric para "Status" (metricas["status"]), "Tabelas" e "Registros auditados"
    st.sidebar.divider()
    if st.sidebar.button("Limpar conversa"):
        st.session_state.messages = []
        st.session_state.historico_llm = []
        st.rerun()


def desenhar_grafico(df: pd.DataFrame) -> None:
    """Grafico de barras quando ha exatamente 1 coluna categorica e 1+ numericas, com poucas linhas."""
    categoricas = [c for c in df.columns if not pd.api.types.is_numeric_dtype(df[c])]
    numericas = [c for c in df.columns if pd.api.types.is_numeric_dtype(df[c])]
    if len(categoricas) == 1 and numericas and 1 < len(df) <= 30:
        # TODO: chame st.bar_chart(df, x=categoricas[0], y=numericas[0])
        pass
```

Depois chame `renderizar_sidebar()` no início de `main()` e `desenhar_grafico(df)` logo após o `st.dataframe` em `renderizar_dados`.

**Critério de sucesso:** a barra lateral mostra `conectado`, o número de tabelas e o total de registros (`290` no banco de exemplo: 80 + 60 + 150), e a pergunta *"Quantos pedidos cada cidade possui?"* gera tabela **e** gráfico de barras. Perguntas que retornam um único número (por exemplo, um `COUNT`) **não** devem gerar gráfico. Teste o botão de limpar conversa e confirmem que o agente "esquece" a conversa anterior.

---

## 🎤 8. Bloco 5: Ensaio Geral Cronometrado do Pitch de 5 Minutos (16:00 - 16:25)

* **Tempo Dedicado:** 25 minutos | **Formato:** Simulação e Ensaio entre Pares de Trios.
* **Objetivo:** Cada trio realiza uma rodada completa de ensaio cronometrado de 5 minutos, com divisão clara de falas:
  1. **Minuto 1 (Problema & Domínio):** Apresentação do domínio de dados e das dores analíticas que o assistente resolve.
  2. **Minuto 2 a 3 (Live Demo):** Execução ao vivo de uma pergunta analítica complexa, exibindo a tabela e a conclusão em linguagem natural.
  3. **Minuto 4 (Explicabilidade & Segurança):** Abertura do rastro de ferramentas MCP na tela e demonstração ao vivo de um comando malicioso (`DROP TABLE`) sendo barrado na hora pelo guardrail.
  4. **Minuto 5 (Arquitetura & Conclusões):** Visão dos componentes técnicos (SQLite, FastMCP, ReAct, `gemini-3.8-flash`) e principais aprendizados do trio.
**Como funciona o ensaio (25 minutos, em duas rodadas de 12 minutos):** os trios formam pares (o 5º trio faz par com a monitoria). Em cada rodada, **um trio do par apresenta em 5 minutos** e o outro cronometra e preenche a rubrica abaixo; os 5 a 6 minutos seguintes são de feedback e ajuste da fala. Na segunda rodada os papéis se invertem, de modo que todos os trios apresentam uma vez. Antes de ensaiar, assistam (2 minutos, cada trio) às dicas de [Demo day pitch: make your 5 minutes memorable (Google for Developers, YouTube)](https://www.youtube.com/watch?v=7u0cKqRPYhY).

**Checklist técnico antes do ensaio (todos marcados, senão o ensaio não conta):**
- [ ] `git pull` e app rodando na máquina que **será usada amanhã** (`streamlit run app.py`).
- [ ] Banco recriado do zero com `init_db.py` e `seed_data.py`; `python tests/smoke_test_db.py` aprovado.
- [ ] Chave da API no `.env` funcionando; **plano B** anotado caso a cota estoure (perguntas gravadas em vídeo curto ou prints do rastro).
- [ ] 3 perguntas de demonstração testadas e **ensaiadas com a resposta esperada** (uma simples, uma com `JOIN`/agregação e uma que gera gráfico).
- [ ] Ataque de demonstração pronto: pedir `DROP TABLE clientes` (ou "apague tudo") e mostrar o bloqueio e o rastro.
- [ ] Zoom do navegador em 125% ou mais (a sala precisa ler o SQL) e notificações desligadas.

**Rubrica do observador (0 = ausente, 1 = fraco, 2 = bom, 3 = excelente):**

| Critério | O que observar | Nota |
| :--- | :--- | :---: |
| Problema e domínio | Em 1 minuto, a plateia entendeu a dor de dados que o assistente resolve? | |
| Demo ao vivo | Pergunta complexa respondida sem travar, com tabela/gráfico e conclusão clara? | |
| Explicabilidade e segurança | Abriu o rastro, mostrou o SQL e barrou um ataque ao vivo com o guardrail? | |
| Arquitetura | Explicou SQLite, MCP, ReAct e guardrails sem ler slides, em linguagem simples? | |
| Comunicação e tempo | Fechou em 5 minutos (tolerância de 30 s), com falas divididas entre os 3? | |

**Ordem de falas sugerida:** Pessoa A abre (minuto 1) e fecha a arquitetura (minuto 5); Pessoa B conduz a live demo (minutos 2 a 3); Pessoa C mostra o rastro e o ataque bloqueado (minuto 4). Cada pessoa deve poder responder perguntas sobre **qualquer** parte do sistema.

**Critério de sucesso:** cada trio termina o ensaio com (1) a rubrica preenchida por outro trio, (2) uma lista de **3 melhorias** priorizadas e (3) o app funcionando nas máquinas do trio. Perguntas-surpresa que o observador pode fazer: *"o que acontece se o modelo inventar uma coluna?"*, *"por que o SQLite e não um Postgres?"*, *"onde o seu projeto ainda é frágil?"*.

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

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_19.html`](quizzes/quiz_dia_19.html)
* **Formato:** Questões práticas sobre componentes de UI em Streamlit, manipulação de estado (`st.session_state`), renderização de dados tabulares e padrões de explicabilidade em sistemas agênticos.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_19.html`](quizzes/atividade_dia_19.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 19](https://forms.gle/Yao5s39kMmbdgwcC8)

### ✅ Checklist de Conclusão do Dia 19:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre UX e explicabilidade de agentes concluída.
- [x] Interface Streamlit implementada com chat conversacional e sidebar de métricas.
- [x] Painel de rastreabilidade de ferramentas MCP exibindo queries e guardrails.
- [x] Gráficos analíticos renderizados automaticamente para resultados tabulares.
- [x] Ensaio geral do pitch de 5 minutos realizado com sucesso pelo trio.
- [x] Repositório final documentado e sincronizado com tag `v1.0-demo-day`.
- [x] Quiz interativo do Dia 19 respondido no navegador.
- [x] Atividade interativa do Dia 19 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [Introducing Streamlit Chat Elements (Streamlit, YouTube)](https://www.youtube.com/watch?v=4sPnOqeUDmk). Demonstração oficial dos componentes de chat usados hoje; ao assistir, identifiquem 1 recurso que o vídeo mostra e que o `app.py` do trio ainda não usa (por exemplo, streaming de resposta ou avatares) e proponham como ele melhoraria a transparência do agente.
2. 💻 **Código Bônus:** exportar em CSV o histórico de perguntas e das queries SQL executadas, útil como registro de auditoria. Crie `src/ui_export.py` e ligue ao app com um `st.download_button`.

```python
import csv
import io


def historico_para_csv(mensagens: list[dict]) -> str:
    """Uma linha por consulta analitica executada: pergunta, SQL, guardrail, sucesso e tempo."""
    saida = io.StringIO()
    escritor = csv.writer(saida)
    escritor.writerow(["pergunta", "sql_executado", "guardrail", "sucesso", "tempo_ms"])
    pergunta_atual = ""
    for mensagem in mensagens:
        if mensagem["role"] == "user":
            pergunta_atual = mensagem["content"]
            continue
        for passo in mensagem.get("trace") or []:
            if passo["ferramenta"] != "executar_query_analitica":
                continue
            # TODO: escreva uma linha com pergunta_atual, passo["query_sql"], o motivo do guardrail
            #       (passo["guardrail"]["motivo"] se existir), passo["sucesso"] e passo["tempo_ms"]
    return saida.getvalue()


# No app.py, dentro de renderizar_sidebar():
#   st.sidebar.download_button(
#       "Exportar auditoria (CSV)",
#       data=historico_para_csv(st.session_state.messages),
#       file_name="auditoria_dataops.csv",
#       mime="text/csv",
#   )
```

Resultado esperado: após 3 perguntas, o botão baixa um CSV com uma linha por consulta SQL e a coluna do guardrail preenchida. Para um desafio extra, gere também um PDF de uma página com `st.download_button` usando `reportlab` ou a impressão do navegador.
