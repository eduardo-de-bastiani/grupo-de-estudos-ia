# Formularios de Auto-Avaliacao & Feedback — Sprint 3

Os **15 minutos finais** de cada encontro presencial (e os 10 minutos finais do Dia 28) sao reservados para o preenchimento do formulario individual no Google Forms.

Assim como nas sprints anteriores, a gestao de respostas pode ser unificada em **3 formularios centrais**:

| Formulario | Quando Aplicar | Foco Principal |
| :--- | :--- | :--- |
| **1. Dia 21 — Expectativas & Auto-Avaliacao Inicial da Sprint 3** | Dia 21 (14/10) | Ponto de partida, expectativas para Multimodalidade (Visao + Audio) e balanco da Sprint 2 |
| **2. Dias 22 a 27 — Auto-Avaliacao & Feedback Diario** | Dias 22 a 27 (mesmo link, com seletor do dia) | Aprendizado do dia, atuacao na dupla/trio, clareza dos roteiros e playgrounds |
| **3. Dia 28 — Avaliacao Final da Sprint 3 e Encerramento Geral (90h)** | Dia 28 (23/10) | Projeto OmniAssistant, avaliacao do Demo Day, retrospectiva global das 3 sprints e mentoria |

**Acompanhamento Centralizado:**  
Todas as respostas caem em uma unica planilha do Google Sheets (uma aba por formulario). O **e-mail PUCRS** identifica o aluno em todos os envios. A grade de conhecimento tecnico e **identica no Dia 21 e no Dia 28**, permitindo medir a evolucao concreta das competencias tecnicas antes e depois da sprint.

---

## Como os Colegas Devem Gerar os Formularios no Google Forms

> **Atalho:** o script [`criar_formularios_sprint3.gs`](criar_formularios_sprint3.gs) cria os 3 formularios e a planilha de respostas automaticamente. Em [script.google.com](https://script.google.com), crie um **Novo projeto**, cole o conteudo do arquivo, execute a funcao `criarFormulariosSprint3` e copie os IDs exibidos no **Registro de execucao**. Ao alterar perguntas, atualize o script **e** este README.

1. Acesse o [Google Forms](https://forms.google.com) ou utilize o Google Apps Script para criar os 3 formularios descritos abaixo.
2. Crie uma planilha no Google Sheets para receber as respostas vinculadas.
3. Obtenha os links publicos de resposta de cada formulario (formato `https://docs.google.com/forms/d/SEU_ID_AQUI/viewform`).
4. Substitua os placeholders `{FORM_ID_DIA_XX}` nos arquivos da Sprint 3:
   - Em `dia_21_visao_multimodal_gemini.md`: inserir o ID do Formulario 1.
   - Em `dia_22` a `dia_27`: inserir o ID do Formulario 2 (ou IDs individuais se optarem por formulários separados).
   - Em `dia_28_demo_day_retrospectiva_geral.md`: inserir o ID do Formulario 3.
   - Atualizar a tabela na secao 6 do [README.md](../README.md).

---

## 1. Dia 21 — Expectativas & Auto-Avaliacao Inicial

**Identificacao**
- Nome completo\* — texto curto
- E-mail PUCRS\* — validado para `@edu.pucrs.br` ou `@pucrs.br`
- Curso\* — multipla escolha: Ciencia da Computacao, Engenharia de Software, Engenharia de Computacao, Sistemas de Informacao, Outro
- Semestre atual\* — lista: 1º ao 10º ou mais

**Ponto de Partida e Grade de Conhecimento Multimodal**
- Como voce avalia seu conhecimento HOJE em cada tema?\* — grade de 5 opcoes:
  *Opcoes:* Nunca vi · Ja ouvi falar · Uso com ajuda · Uso sozinho(a) · Consigo ensinar
  *Temas:*
  1. Visao computacional com LLMs (envio via bytes e Pillow)
  2. Grounding visual e extracao de Bounding Boxes
  3. Reconhecimento de fala local com OpenAI Whisper (Speech-to-Text)
  4. Espectrogramas Mel e alinhamento temporal de audio
  5. Avaliacao sistematica de LLMs (LLM-as-a-Judge)
  6. Metricas de Groundedness vs Precisao Factual
  7. Orquestracao agentica multimodal (Percepcao -> Tools -> Resposta)
  8. Streamlit com midia (upload de prints, player de audio e explicabilidade XAI)
  9. Colaboracao Git em squad (branches de features, code review e resolucao de conflitos)

**Expectativas para a Sprint 3 e OmniAssistant**
- O que voce mais quer aprender ou ser capaz de construir ao final desta Sprint 3?\* — paragrafo
- Quao confiante voce esta em acompanhar o ritmo e a integracao de visao e audio?\* — escala 1 a 5
- Quais licoes aprendidas da Sprint 2 voce quer aplicar no seu trio da Sprint 3?\* — paragrafo
- Voce tem algum receio ou preocupacao em relacao a esta sprint? — paragrafo

**Avaliacao do Dia 21 (Abertura e Visao)**
- Quais etapas voce concluiu hoje no encontro?\* — caixas de selecao:
  * Ambiente e chaves configurados
  * Laboratorio 1: Ingestao via bytes e PIL
  * Laboratorio 2: Bounding Boxes e OCR estruturado
  * Desafio do Detetive de Diagramas
  * Quiz e atividade interativa offline
  * Nao consegui concluir nenhuma etapa
- Nota geral do encontro de hoje\* — escala 1 a 5
- O que voce achou mais interessante no dia de hoje?\* — paragrafo
- Algo ficou confuso ou te travou tecnicamente? — paragrafo

---

## 2. Dias 22 a 27 — Auto-Avaliacao & Feedback Diario

**Identificacao**
- Nome completo\* — texto curto
- E-mail PUCRS\* — validado para `@edu.pucrs.br` ou `@pucrs.br`
- Qual e o dia da Sprint?\* — lista suspensa:
  * Dia 22 — 15/10 (Qui) — Audio e Speech-to-Text Local com Whisper
  * Dia 23 — 16/10 (Sex) — Avaliacao de LLMs e Formacao Oficial dos Trios
  * Dia 24 — 19/10 (Seg) — Kickoff do OmniAssistant, Arquitetura e Setup Git
  * Dia 25 — 20/10 (Ter) — Pipeline Unificado de Ingestao Multimodal
  * Dia 26 — 21/10 (Qua) — Orquestracao de Ferramentas e Raciocinio Multimodal
  * Dia 27 — 22/10 (Qui) — Interface Streamlit, Telemetria e Ensaio do Pitch
- Nome da sua Squad / Dominio do OmniAssistant — texto curto (a partir do Dia 23)

**Aprendizado do Dia**
- O que voce aprendeu de mais relevante no encontro de hoje?\* — paragrafo
- O que achou mais estimulante (playgrounds, labs ou desafios)?\* — paragrafo
- O que ainda ficou nebuloso ou precisa de reforco? — paragrafo
- Quao seguro(a) voce se sente para aplicar o conhecimento de hoje de forma autonoma?\* — escala 1 a 5

**Auto-Avaliacao e Atuacao na Squad**
- Quanto das metas praticas do dia voce concluiu?\* — multipla escolha: Tudo, A maior parte, Uma parte, Nao consegui avancar
- Como voce avalia sua atuacao no encontro de hoje?\* — grade 1 a 5:
  * Foco e engajamento individual
  * Colaboracao na dupla ou trio (rotacao de piloto/copiloto)
  * Autonomia para investigar erros e debugar
  * Sincronizacao de codigo e commits no GitHub
- O Git Sync da squad foi concluido hoje com sucesso?\* — Sim, Parcialmente, Nao

**Avaliacao do Encontro**
- Nota geral do encontro de hoje\* — escala 1 a 5
- Avalie as etapas do dia\* — grade 1 a 5:
  * Daily Standup e Leitura de Referencia / Playgrounds Web
  * Laboratorios praticos guiados (scaffolds Python)
  * Desafio colaborativo da squad
  * Testes de resiliencia e Git Sync
  * Quiz e atividade interativa no navegador
- Nivel de ritmo e tempo\* — escala 1 a 5: 1 = Muito arrastado, 3 = Ideal, 5 = Muito corrido
- Sugestoes para os proximos encontros — paragrafo

---

## 3. Dia 28 — Avaliacao Final da Sprint 3 e Encerramento Geral (90h)

**Identificacao**
- Nome completo\* — texto curto
- E-mail PUCRS\* — validado para `@edu.pucrs.br` ou `@pucrs.br`
- Nome da sua Squad / Projeto OmniAssistant\* — texto curto

**Sua Evolucao Tecnica (Grade Comparativa)**
- Como voce avalia seu conhecimento HOJE em cada tema?\* — grade de 5 opcoes (mesma grade do Dia 21 para medicao de delta)
- Suas expectativas para a Sprint 3 e para o OmniAssistant foram atendidas?\* — escala 1 a 5
- Qual foi o maior salto de maturidade tecnica que voce deu nesta sprint?\* — paragrafo
- Qual foi o seu maior aprendizado comportamental / trabalho em squad?\* — paragrafo

**O Projeto OmniAssistant e a Apresentacao no Demo Day**
- Como voce avalia o resultado do produto apresentado pela sua squad?\* — escala 1 a 5
- Como foi o trabalho interno do trio durante a Semana 2?\* — grade 1 a 5:
  * Comunicacao e alinhamento de escopo
  * Divisao justa de tarefas e cooperacao
  * Resolucao de conflitos tecnicos e bugs de integracao
  * Ensaio e desempenho no pitch ao vivo
- Qual foi o momento mais desafiador da construcao do OmniAssistant e como superaram?\* — paragrafo

**Avaliacao Global do Programa de Formacao (90 Horas / 3 Sprints)**
- Nota geral para o programa completo (Sprints 1, 2 e 3)\* — escala 1 a 5
- Avalie os pilares metodologicos do programa\* — grade 1 a 5:
  * Metodologia autonoma (sem aulas expositivas passivas)
  * Qualidade e clareza dos roteiros autodirigidos
  * Desafios praticos e projetos cumulativos (AskData, DataOps Agent, OmniAssistant)
  * Quizzes e atividades interativas de fixacao
  * Suporte e mentoria tecnica
  * Espaco fisico e infraestrutura no Tecnopuc (Navi Hub)
- De 0 a 10, o quanto voce recomendaria este Grupo de Estudos a outros alunos da PUCRS?\* — escala NPS (0 a 10)
- Mensagem final, agradecimentos ou conselhos para futuras turmas — paragrafo
