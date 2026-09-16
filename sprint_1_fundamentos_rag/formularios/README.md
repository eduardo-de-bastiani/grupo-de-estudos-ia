# 📝 Formulários de Auto-Avaliação & Feedback — Sprint 1

Os **15 minutos finais** de cada encontro são reservados para o formulário. São 3 formulários:

| Formulário | Quando | Foco |
| :--- | :--- | :--- |
| **1. Dia 01 — Expectativas & Auto-Avaliação Inicial** | Dia 01 | Ponto de partida, expectativas para o grupo de estudos e para a Sprint 1 |
| **2. Dias 02 a 09 — Auto-Avaliação & Feedback Diário** | Dias 02 a 09 (mesmo link, o aluno seleciona o dia) | Aprendizado do dia, auto-avaliação e avaliação do encontro |
| **3. Dia 10 — Avaliação Final da Sprint** | Dia 10 (Demo Day) | Evolução na Sprint, projeto AskData e avaliação geral |

**Acompanhamento:** todas as respostas caem em uma única planilha (uma aba por formulário). O **e-mail PUCRS** identifica o aluno em todos os formulários, e a grade de conhecimento é **idêntica no Dia 01 e no Dia 10**, permitindo comparar o antes e o depois.

---

## ⚙️ Como gerar os formulários no Google Forms

O script [`criar_formularios.gs`](criar_formularios.gs) cria os 3 formulários e a planilha de respostas automaticamente:

1. Acesse [script.google.com](https://script.google.com) e clique em **Novo projeto**.
2. Cole o conteúdo de `criar_formularios.gs` no editor e salve.
3. Selecione a função `criarFormulariosSprint1` e clique em **Executar** (autorize o acesso ao Forms e Planilhas).
4. Copie os links de resposta exibidos no **Registro de execução** para a seção de formulário de cada `dia_XX_*.md`.

> Ao alterar perguntas, atualize o script **e** este README.

---

**Legenda:** `*` obrigatória · **Grade 1–5:** 1 = muito ruim, 5 = excelente · **Grade de conhecimento:** Nunca vi · Já ouvi falar · Uso com ajuda · Uso sozinho(a) · Consigo ensinar

**Temas da grade de conhecimento:** Python · Git e GitHub · Ferramentas de IA generativa (ChatGPT, Gemini, Copilot) · Chamadas a LLMs via API/SDK em Python · Tokens e hiperparâmetros (temperatura, top-p, top-k) · Engenharia de prompt (few-shot, CoT, delimitadores) · Segurança em LLMs (prompt injection) · Embeddings e busca vetorial (ChromaDB) · RAG · Streamlit

Todos os formulários começam com **Nome completo\*** e **E-mail PUCRS\*** (validado para `@edu.pucrs.br` ou `@pucrs.br`).

---

## 1️⃣ Dia 01 — Expectativas & Auto-Avaliação Inicial

**Identificação**
- Curso\* — múltipla escolha: Ciência da Computação, Engenharia de Software, Engenharia de Computação, Sistemas de Informação, Outro
- Semestre atual\* — lista: 1º ao 10º ou mais

**Ponto de partida**
- Como você avalia seu conhecimento HOJE em cada tema?\* — grade de conhecimento
- Você já desenvolveu algum projeto com IA generativa? Conte brevemente. — parágrafo

**Expectativas**
- O que você espera aprender e ser capaz de fazer até o final do grupo de estudos (23/10)?\* — parágrafo
- O que você espera alcançar até o final da Sprint 1 (Demo Day em 25/09)?\* — parágrafo
- Quais são seus principais objetivos ao participar?\* — caixas de seleção: Aprender IA generativa na prática, Construir projetos para o portfólio, Oportunidade de estágio na DataLakers, Networking com colegas e empresas, Aplicar em TCC/pesquisa/trabalho atual, Outro
- Quão confiante você está de que vai conseguir acompanhar o ritmo do grupo?\* — escala 1–5
- Você tem alguma preocupação ou receio em relação ao grupo de estudos? — parágrafo

**Avaliação do Dia 01**
- Quais etapas do setup você concluiu hoje?\* — caixas de seleção: Repositório no GitHub, Python 3.11+ e `.venv`, VS Code com extensões, `smoke_test.py` executado, Copilot estudantil solicitado/ativado, Não consegui concluir nenhuma etapa
- Nota geral do encontro de hoje\* — escala 1–5
- Avalie as partes do encontro\* — grade 1–5: Apresentação do grupo, Navi Hub e DataLakers · Dinâmica em duplas · Setup do ambiente, GitHub e Copilot
- O que você achou mais legal hoje?\* — parágrafo
- Teve algum problema no setup ou algo que ficou confuso? — parágrafo
- Sugestões para os próximos encontros — parágrafo

---

## 2️⃣ Dias 02 a 09 — Auto-Avaliação & Feedback Diário

**Identificação**
- Qual é o dia da Sprint?\* — lista com dia, data e tema (ex.: *Dia 04 — 17/09 (Qui) — Engenharia de Prompt & Segurança*)
- Nome do seu trio / projeto AskData — texto curto (a partir do Dia 06)

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
- Avalie as partes do encontro\* — grade 1–5: Leitura inicial / Daily Standup · Prática guiada / codificação do projeto · Desafio em dupla ou trio / integração e testes · Roteiro do dia (clareza, links e exemplos)
- Ritmo do encontro\* — Muito lento → Muito rápido
- Nível de dificuldade\* — Muito fácil → Muito difícil
- Sugestões para melhorar o encontro — parágrafo

---

## 3️⃣ Dia 10 — Avaliação Final da Sprint 1

**Identificação**
- Nome do seu trio / projeto AskData\* — texto curto

**Sua evolução na Sprint**
- Como você avalia seu conhecimento HOJE em cada tema?\* — grade de conhecimento (mesma do Dia 01)
- Suas expectativas para a Sprint 1 foram atendidas?\* — escala 1–5
- O que você esperava alcançar na Sprint 1 e conseguiu? O que ficou faltando?\* — parágrafo
- Qual foi seu maior aprendizado técnico na Sprint?\* — parágrafo
- Qual foi seu maior aprendizado não técnico (equipe, comunicação, apresentação)?\* — parágrafo

**Projeto AskData & trabalho em trio**
- Qual foi sua principal contribuição no projeto?\* — parágrafo
- Como você avalia sua contribuição para o projeto?\* — escala 1–5
- Como foi o trabalho em trio?\* — grade 1–5: Comunicação · Divisão de tarefas · Participação de todos · Resolução de bloqueios e divergências
- Qual foi a maior dificuldade do projeto e como vocês a superaram?\* — parágrafo
- Como você avalia o resultado apresentado no Demo Day?\* — escala 1–5

**Avaliação da Sprint 1**
- Nota geral da Sprint 1\* — escala 1–5
- Avalie os aspectos da Sprint\* — grade 1–5: Roteiros e materiais diários · Equilíbrio entre teoria e prática · Formato autônomo · Carga de trabalho · Suporte da monitoria · Palestra com convidado (Dia 07) · Organização do Demo Day
- Quais encontros foram mais valiosos para você?\* — caixas de seleção (Dias 01 a 10)
- Quais encontros precisam de mais ajustes? — caixas de seleção (Dias 01 a 10)
- De 0 a 10, o quanto você recomendaria o grupo de estudos a um colega?\* — escala 0–10
- O que devemos manter na Sprint 2?\* — parágrafo
- O que devemos mudar na Sprint 2?\* — parágrafo
- O que você espera da Sprint 2 (Agentes, Function Calling & MCP)? — parágrafo
- Comentários finais — parágrafo
