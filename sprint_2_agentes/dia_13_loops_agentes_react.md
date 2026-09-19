# 📅 Dia 13 (30/09 - Quarta-feira)
# 🔄 Loops de Agentes Autônomos: O Padrão ReAct & Multi-Turn Tool Calling

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o padrão fundamental **ReAct (Reason + Act)**: como agentes combinam passos de raciocínio intermediário com ações externas para resolver problemas que um único turno de LLM não consegue solucionar.
2. Implementar um **loop de agente artesanal** em Python puro (`while True`) sem frameworks "caixa-preta", acumulando histórico de mensagens e gerenciando o ciclo Pensamento -> Ação -> Observação -> Resposta Final.
3. Estabelecer guardas rígidas de execução com `max_iterations = 5` para mitigar o risco de loops infinitos e consumo descontrolado de tokens.
4. Resolver desafios práticos de **ações encadeadas em múltiplos passos**, onde a resposta da ferramenta A é necessária para gerar os argumentos da ferramenta B.
5. Construir um módulo de **telemetria e visualização de rastro agêntico** no terminal, medindo latência e tokens consumidos em cada iteração do ciclo.
6. Consolidar os conceitos no **Quiz Interativo** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Padrão ReAct & Loops     │
│ 14:20 - 14:55   │ Bloco 2: Construção do Loop ReAct Artesanal em Python  │
│ 14:55 - 15:30   │ Bloco 3: Resolução de Ações Encadeadas em Multi-Passos │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio: Escapando do Loop Infinito           │
│ 16:15 - 16:25   │ Bloco 5: Telemetria & Rastro de Execução no Terminal   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_13.html) │
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

* **Tempo Dedicado:** 15 minutos (leitura individual em silêncio).
* **Foco Teórico:** O paper original de ReAct (Yao et al., 2022), a diferença crucial entre chamadas isoladas de função (Dia 12) e orquestração agêntica autônoma em múltiplos turnos, e por que entender a mecânica do loop manual é superior ao uso cego de bibliotecas de terceiros.
* <!-- CAMADA 2: Inserir links de referência conceitual sobre ReAct e loops agênticos -->

---

## 💻 4. Bloco 2: Construção do Loop ReAct Artesanal em Python (14:20 - 14:55)

* **Tempo Dedicado:** 35 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_13/01_react_loop.py`.
  - Iniciar uma sessão de chat ou lista de mensagens mantendo histórico no SDK `google-genai` com `gemini-3.8-flash`.
  - Implementar o laço `while True` que verifica se `response.function_calls` existe:
    - Se existir: despacha a ferramenta, anexa a `FunctionResponse` ao histórico de mensagens e envia de volta ao modelo para o próximo passo.
    - Se não existir: encerra o laço e imprime a resposta final consolidada ao usuário.
  - Adicionar contador `turno += 1` e parada estrita em `max_iterations = 5`.
* <!-- CAMADA 2: Código completo do loop ReAct manual com max_iterations sem emojis em código -->

---

## ⛓️ 5. Bloco 3: Resolução de Ações Encadeadas em Multi-Passos (14:55 - 15:30)

* **Tempo Dedicado:** 35 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_13/02_chained_tools_agent.py`.
  - Fornecer 3 ferramentas interdependentes: `buscar_id_usuario(email: str) -> str`, `listar_pedidos_usuario(id_usuario: str) -> list[dict]` e `calcular_total_gasto(pedidos: list[dict]) -> float`.
  - Submeter a pergunta: *"Quanto a usuária maria@empresa.com gastou no total?"*.
  - Observar o agente executar autonomamente 3 turnos seguidos sem intervenção humana:
    1. Turno 1: Chama `buscar_id_usuario` com o e-mail.
    2. Turno 2: Recebe o ID e chama `listar_pedidos_usuario`.
    3. Turno 3: Recebe os pedidos e chama `calcular_total_gasto`.
    4. Turno 4: Sintetiza a resposta textual conclusiva.
* <!-- CAMADA 2: Código do desafio de passos encadeados e validação do histórico sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🛡️ 7. Bloco 4: Desafio: Escapando do Loop Infinito (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio Prático em Duplas.
* **Objetivo:** Criar o script `dia_13/03_agent_guard_loop.py`.
  - Simular um cenário onde o agente pede informações sobre um registro inexistente ou recebe mensagens repetitivas de erro de uma ferramenta.
  - Implementar um mecanismo de **detecção de chamadas repetidas** (se o agente tentar chamar a mesma função com os mesmos argumentos duas vezes seguidas, injetar um aviso no contexto para mudar de estratégia).
  - Validar que o loop encerra elegantemente avisando o usuário sobre a impossibilidade da ação, em vez de estourar a quota de chamadas.
* <!-- CAMADA 2: Código do guardião de loop infinito e casos de teste adversariais sem emojis em código -->

---

## 📊 8. Bloco 5: Telemetria & Rastro de Execução no Terminal (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Implementação de Utilitário em Duplas.
* **Objetivo:** Criar o script `dia_13/04_agent_telemetry.py`.
  - Adicionar formatação visual no terminal (cores ANSI e marcadores de tempo `time.perf_counter()`).
  - Imprimir o relatório de execução ao final de cada requisição do agente: número total de turnos, tempo gasto em cada tool call e tokens acumulados no contexto.
* <!-- CAMADA 2: Código do módulo de telemetria sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Validar a integridade de todos os 4 scripts da pasta `dia_13/` (`01_react_loop.py`, `02_chained_tools_agent.py`, `03_agent_guard_loop.py` e `04_agent_telemetry.py`) e realizar o Git Sync com commit e push.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_13.html`](quizzes/quiz_dia_13.html)
* **Formato:** Questões práticas sobre o ciclo ReAct, persistência de histórico de mensagens em múltiplos turnos, gerenciamento de limites de iteração e estratégias contra loops infinitos.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 13](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 13:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura de fundamentos do padrão ReAct concluída.
- [x] Loop ReAct artesanal implementado em `01_react_loop.py` com `max_iterations`.
- [x] Resolução autônoma de 3 ferramentas encadeadas em `02_chained_tools_agent.py`.
- [x] Desafio de mitigação de loops infinitos aprovado em `03_agent_guard_loop.py`.
- [x] Relatório de telemetria e latência funcionando em `04_agent_telemetry.py`.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 13 concluído no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de apresentação técnica sobre padrões modernos de orquestração de agentes autônomos -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script de agente com histórico de pensamento persistido em arquivo JSON local para auditoria posterior -->
