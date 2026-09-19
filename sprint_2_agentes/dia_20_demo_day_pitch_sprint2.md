# 📅 Dia 20 (09/10 - Sexta-feira)
# 🏆 Demo Day da Sprint 2 & Pitch para a DataLakers

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Presença Especial:** Liderança Técnica e Gestores da DataLakers & Coordenação do Navi Hub  

---

## 🎯 1. Objetivos do Encontro
1. Realizar o **Demo Day Oficial da Sprint 2**, com os 5 trios apresentando seus produtos *DataOps Agent* funcionando ao vivo para colegas, coordenação do Navi Hub e liderança técnica da DataLakers.
2. Demonstrar o domínio prático autônomo dos conceitos de **Structured Outputs**, **Function Calling**, **Loops de Agentes (ReAct)**, **Model Context Protocol (MCP)** e **Guardrails de Segurança SQL**.
3. Exibir a rastreabilidade completa das chamadas de ferramentas e a execução de consultas em banco relacional local SQLite via interface web Streamlit.
4. Promover a celebração e reconhecimento mútuo entre pares através da **Votação Popular ("Destaques da Sprint 2")**.
5. Consolidar o domínio integral dos temas da Sprint 2 no **Quiz Final de Fixação** (`quizzes/quiz_dia_20.html`).
6. Conduzir a **Retrospectiva Ágil** coletiva via **Learning Matrix no Quadro** (35 minutos), mapeando aprendizados técnicos e comportamentais da Sprint 2.
7. Conhecer a visão geral da **Sprint 3 (Multimodalidade & GenAI Aplicada)** no teaser de encerramento e preencher a avaliação final da Sprint.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:15   │ Abertura do Demo Day 2 & Boas-Vindas aos Convidados    │
│ 14:15 - 15:30   │ Apresentações dos 5 Trios (15 min por trio)            │
│ 15:30 - 15:45   │ Coffee Break & Descompressão                           │
│ 15:45 - 16:00   │ Votação Popular & Destaques da Sprint 2                │
│ 16:00 - 16:10   │ Quiz Final de Fixação da Sprint 2 (quiz_dia_20.html)   │
│ 16:10 - 16:45   │ Retrospectiva Ágil: Learning Matrix no Quadro (35 min) │
│ 16:45 - 16:50   │ Teaser da Sprint 3: Apresentação da Visão Geral        │
│ 16:50 - 17:00   │ Formulário Final de Avaliação da Sprint 2 (Forms)      │
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

## 🎤 3. Bloco 1: As Apresentações do Demo Day (14:15 - 15:30)

Cada um dos 5 trios terá **15 minutos rigorosamente cronometrados**:
* **10 minutos de Apresentação & Live Demo:**
  * Contexto do problema analítico e domínio da base SQLite escolhida.
  * Arquitetura técnica: servidor FastMCP local, transporte `stdio`, orquestração do loop ReAct e guardrails determinísticos de SQL.
  * Demonstração ao vivo na interface Streamlit:
    - Pergunta em linguagem natural respondida com dados e insights.
    - Exibição do painel de explicabilidade (ferramentas chamadas, SQL gerado e tempo de resposta).
    - Demonstração do teste de segurança: tentativa de query maliciosa/destrutiva barrada pelo guardrail ao vivo.
  * Desafios técnicos enfrentados e decisões de engenharia.
* **5 minutos de Perguntas & Respostas (Q&A):**
  * Perguntas dos colegas, da coordenação e dos convidados da DataLakers sobre a solução construída.

---

## ☕ 4. Coffee Break & Descompressão (15:30 - 15:45)

Momento de descontração, comemoração e conversas informais entre os estudantes, instrutores e convidados da DataLakers e Navi Hub após a conclusão de todas as apresentações.

---

## 🏆 5. Bloco 2: Votação Popular & Destaques da Sprint 2 (15:45 - 16:00)

Votação rápida e descontraída entre pares para celebrar o esforço e a evolução dos trios nas seguintes categorias:

### Categorias de Destaque:
1. 🛡️ **Guardião do Banco:** O sistema com os guardrails de SQL e tolerância a erros mais elegantes e impenetráveis.
2. 🔌 **Mestre do MCP:** A implementação de servidor MCP mais modular, limpa e bem documentada.
3. 🎨 **Melhor Rastreabilidade & UX:** A interface Streamlit com o painel de explicabilidade de ferramentas mais claro e intuitivo.
4. 🎤 **Melhor Storytelling Técnico:** O trio com a apresentação mais articulada, clara e com perfeita sintonia de equipe.

---

## 🧠 6. Bloco 3: Quiz Final de Fixação da Sprint 2 (16:00 - 16:10)

Antes de iniciar a retrospectiva, cada estudante abre no navegador o arquivo:
[`quizzes/quiz_dia_20.html`](quizzes/quiz_dia_20.html)

* **15 Perguntas Abrangentes:** O quiz revisa os tópicos fundamentais da Sprint 2 (Structured Outputs, Pydantic, Function Calling nativo no Gemini, Loops ReAct autônomos, Arquitetura MCP, FastMCP, SQLite e Guardrails de Segurança).
* **Feedback Instantâneo:** Cada resposta traz a justificativa conceitual e técnica.

---

## 🔄 7. Bloco 4: Retrospectiva Ágil — Learning Matrix no Quadro (16:10 - 16:45)

Dinâmica coletiva de **35 minutos cronometrados** conduzida no quadro branco da sala para consolidar aprendizados e maturidade do grupo.

### 🖼️ Estrutura da Learning Matrix no Quadro:

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│  💻 APRENDIZADOS TÉCNICOS            │  🤝 APRENDIZADOS NÃO-TÉCNICOS        │
│     (Agentes, MCP, SQL, Guardrails)  │     (Trabalho em Trio, Resiliência)  │
├──────────────────────────────────────┼──────────────────────────────────────┤
│  🚧 PEDRAS NO SAPATO                 │  🚀 MUDANÇAS PARA A SPRINT 3         │
│     (Bugs, Desafios & Obstáculos)    │     (O que faremos diferente)        │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

1. **Minuto 0 a 5:** Reflexão individual e escrita de post-its (Hard Skills e Soft Skills).
2. **Minuto 5 a 15:** Alinhamento rápido e discussão dentro de cada trio.
3. **Minuto 15 a 35:** Fixação no quadro com apoio de um facilitador voluntário, agrupamento temático e debate aberto sobre o que funcionou e o que melhorar.

---

## 🔮 8. Bloco 5: Teaser da Sprint 3 — Visão Geral (16:45 - 16:50)

* **O Próximo Salto:** Na Sprint 1 dominamos a *leitura com RAG*; na Sprint 2 capacitamos os modelos para a *ação autônoma com ferramentas e MCP*. Na **Sprint 3**, entraremos no universo da **Multimodalidade & IA Generativa Aplicada** (visão computacional com imagens e diagramas técnicos, processamento de áudio/speech-to-text e soluções ponta a ponta integradas).
* **Continuidade da Jornada:** Apresentação dos tópicos principais e calendário da próxima sprint.

---

## 📝 9. Bloco 6: Formulário Final de Avaliação da Sprint 2 & Feedback (16:50 - 17:00)

> 📋 **Link do Formulário de Avaliação Final da Sprint 2:**  
> [Preencher Formulário do Google Forms - Fechamento Sprint 2](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão da Sprint 2:
- [x] Apresentações dos projetos *DataOps Agent* concluídas com sucesso no Demo Day 2.
- [x] Repositórios finais sincronizados com documentação completa no GitHub.
- [x] Votação popular e premiação simbólica de destaques realizada.
- [x] Quiz final de consolidação da Sprint 2 (`quizzes/quiz_dia_20.html`) concluído.
- [x] Retrospectiva ágil da Sprint 2 realizada via Learning Matrix no quadro (35 min).
- [x] Teaser e introdução da Sprint 3 acompanhados.
- [x] Formulário final de avaliação da Sprint 2 preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de talk internacional sobre o ecossistema e futuro de Agentes Autônomos com MCP -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script utilitário de benchmarking de latência e consumo de tokens para loops agênticos -->
