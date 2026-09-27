# 📝 Formulários de Auto-Avaliação & Feedback — Sprint 2

Os **15 minutos finais** de cada encontro são reservados para o formulário. São 3 formulários:

| Formulário | Quando | Foco |
| :--- | :--- | :--- |
| **1. Dia 11 — Expectativas & Auto-Avaliação Inicial** | Dia 11 | Ponto de partida, expectativas para a Sprint 2 e balanço da Sprint 1 |
| **2. Dias 12 a 19 — Auto-Avaliação & Feedback Diário** | Dias 12 a 19 (mesmo link, o aluno seleciona o dia) | Aprendizado do dia, auto-avaliação e avaliação do encontro |
| **3. Dia 20 — Avaliação Final da Sprint** | Dia 20 (Demo Day) | Evolução na Sprint, projeto DataOps Agent, trabalho em trio e avaliação geral |

**Acompanhamento:** todas as respostas caem em uma única planilha (uma aba por formulário). O **e-mail PUCRS** identifica o aluno em todos os formulários, e a grade de conhecimento é **idêntica no Dia 11 e no Dia 20**, permitindo comparar o antes e o depois.

---

## ⚙️ Como gerar os formulários no Google Forms

O script [`criar_formularios_sprint2.gs`](criar_formularios_sprint2.gs) cria os 3 formulários e a planilha de respostas automaticamente:

1. Acesse [script.google.com](https://script.google.com) e clique em **Novo projeto**.
2. Cole o conteúdo de `criar_formularios_sprint2.gs` no editor e salve.
3. Selecione a função `criarFormulariosSprint2` e clique em **Executar** (autorize o acesso ao Forms e Planilhas).
4. Copie os links de resposta exibidos no **Registro de execução** para a seção de formulário de cada `dia_XX_*.md` (nos arquivos, o link hoje é um marcador `(#)` aguardando esta etapa).

> Ao alterar perguntas, atualize o script **e** este README.

---

**Legenda:** `*` obrigatória · **Grade 1–5:** 1 = muito ruim, 5 = excelente · **Grade de conhecimento:** Nunca vi · Já ouvi falar · Uso com ajuda · Uso sozinho(a) · Consigo ensinar

**Temas da grade de conhecimento:** Python · Git e GitHub (trabalho em trio) · Chamadas a LLMs via SDK (`google-genai`) · Saídas estruturadas e Pydantic · Function Calling e ferramentas · Loops de agentes (ReAct) · Model Context Protocol (MCP) · Servidores FastMCP · SQLite e SQL com Python · Text-to-SQL e schema grounding · Guardrails e segurança de agentes · Streamlit e interfaces com rastreabilidade

Todos os formulários começam com **Nome completo\*** e **E-mail PUCRS\*** (validado para `@edu.pucrs.br` ou `@pucrs.br`).

---

## 1️⃣ Dia 11 — Expectativas & Auto-Avaliação Inicial

**Identificação**
- Curso\* — múltipla escolha: Ciência da Computação, Engenharia de Software, Engenharia de Computação, Sistemas de Informação, Outro
- Semestre atual\* — lista: 1º ao 10º ou mais

**Ponto de partida**
- Como você avalia seu conhecimento HOJE em cada tema?\* — grade de conhecimento
- O que você levou da Sprint 1 e quer aplicar agora? (RAG, prompts, Streamlit, Git...)\* — parágrafo

**Expectativas para a Sprint 2**
- O que você espera ser capaz de fazer ao final da Sprint 2 (Demo Day em 09/10)?\* — parágrafo
- Quais são seus principais objetivos nesta sprint?\* — caixas de seleção: Entender como agentes decidem e agem, Dominar MCP e ferramentas, Construir um projeto forte para o portfólio, Aprender segurança de agentes e guardrails, Melhorar meu trabalho em equipe, Oportunidade de estágio na DataLakers
- Quão confiante você está de acompanhar o ritmo da Sprint 2?\* — escala 1–5
- Você tem alguma preocupação ou receio em relação à Sprint 2? — parágrafo

**Avaliação do Dia 11**
- Quais etapas você concluiu hoje?\* — caixas de seleção: Ambiente com `.venv` e dependências instalados, Chave da API no `.env` (fora do Git), `01_pydantic_schema.py`, `02_nested_schema_validator.py`, `03_extractor_stress_test.py`, `04_benchmark_parsing.py`, Não consegui concluir nenhuma etapa
- Nota geral do encontro de hoje\* — escala 1–5
- Avalie as partes do encontro\* — grade 1–5: Daily Standup e leitura inicial · Laboratórios em dupla (schemas e Pydantic) · Desafio de extração e benchmark · Quiz e atividade interativa · Roteiro do dia (clareza, links e exemplos)
- O que você achou mais legal hoje?\* — parágrafo
- Algo ficou confuso ou te travou? — parágrafo
- Sugestões para os próximos encontros — parágrafo

---

## 2️⃣ Dias 12 a 19 — Auto-Avaliação & Feedback Diário

**Identificação**
- Qual é o dia da Sprint?\* — lista com dia, data e tema (ex.: *Dia 18 — 07/10 (Qua) — Servidor MCP e Guardrails*)
- Nome do seu trio / projeto DataOps Agent — texto curto (a partir do Dia 15)

**Aprendizado do dia**
- O que você aprendeu hoje?\* — parágrafo
- O que você achou mais legal ou interessante hoje?\* — parágrafo
- O que ficou confuso ou você ainda não entendeu bem? — parágrafo
- Quão seguro(a) você se sente para aplicar sozinho(a) o conteúdo de hoje?\* — escala 1–5

**Auto-avaliação**
- Quanto das atividades práticas do dia você concluiu?\* — múltipla escolha: Tudo, A maior parte, Uma parte, Não consegui avançar
- Como você avalia sua atuação hoje?\* — grade 1–5: Foco e engajamento · Colaboração com a dupla/trio · Autonomia para resolver problemas · Organização do código e commits
- Você fez commit/push do trabalho de hoje no GitHub?\* — Sim, Parcialmente, Não
- Algo te travou hoje? Como você tentou resolver? — parágrafo

**Avaliação do encontro**
- Nota geral do encontro de hoje\* — escala 1–5
- Avalie as partes do encontro\* — grade 1–5: Daily Standup e leitura inicial · Prática guiada / codificação · Desafio em dupla ou trio / integração e testes · Quiz e atividade interativa · Roteiro do dia (clareza, links e exemplos)
- Ritmo do encontro\* — escala 1–5: Muito lento → Muito rápido
- Nível de dificuldade\* — escala 1–5: Muito fácil → Muito difícil
- Sugestões para melhorar o encontro — parágrafo

---

## 3️⃣ Dia 20 — Avaliação Final da Sprint 2

**Identificação**
- Nome do seu trio / projeto DataOps Agent\* — texto curto

**Sua evolução na Sprint**
- Como você avalia seu conhecimento HOJE em cada tema?\* — grade de conhecimento (mesma do Dia 11)
- Suas expectativas para a Sprint 2 foram atendidas?\* — escala 1–5
- O que você esperava alcançar e conseguiu? O que ficou faltando?\* — parágrafo
- Qual foi seu maior aprendizado técnico na Sprint?\* — parágrafo
- Qual foi seu maior aprendizado não técnico (equipe, comunicação, apresentação)?\* — parágrafo

**Projeto DataOps Agent & trabalho em trio**
- Qual foi sua principal contribuição no projeto?\* — parágrafo
- Como você avalia sua contribuição para o projeto?\* — escala 1–5
- Como foi o trabalho em trio?\* — grade 1–5: Comunicação · Divisão de tarefas e rodízio de piloto · Participação de todos · Resolução de bloqueios e divergências
- Qual foi a maior dificuldade do projeto e como vocês a superaram?\* — parágrafo
- Como você avalia o resultado apresentado no Demo Day?\* — escala 1–5

**Avaliação da Sprint 2**
- Nota geral da Sprint 2\* — escala 1–5
- Avalie os aspectos da Sprint\* — grade 1–5: Roteiros e materiais diários · Equilíbrio entre teoria e prática · Formato autônomo · Carga de trabalho · Quizzes e atividades interativas · Suporte da monitoria · Organização do Demo Day e da retrospectiva
- Quais encontros foram mais valiosos para você?\* — caixas de seleção (Dias 11 a 20)
- Quais encontros precisam de mais ajustes? — caixas de seleção (Dias 11 a 20)
- De 0 a 10, o quanto você recomendaria o grupo de estudos a um colega?\* — escala 0–10
- O que devemos manter na Sprint 3?\* — parágrafo
- O que devemos mudar na Sprint 3?\* — parágrafo
- O que você espera da Sprint 3 (Multimodalidade & GenAI aplicada)? — parágrafo
- Comentários finais — parágrafo
