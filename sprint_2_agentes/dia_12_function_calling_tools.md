# 📅 Dia 12 (29/09 - Terça-feira)
# ⚙️ Function Calling: Chamada de Ferramentas Nativas & Resolução de Ações

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o protocolo nativo de **Function Calling** no ecossistema Gemini: como a LLM decide dinamicamente entre responder em texto ou solicitar a execução de uma ferramenta externa.
2. Declarar ferramentas em Python com tipagem estrita e docstrings semânticas claras, entendendo como o SDK `google-genai` constrói as declarações de ferramentas (`Tool` e `FunctionDeclaration`).
3. Construir o despachador de ferramentas (**Tool Dispatcher**): script que intercepta a chamada emitida pelo modelo, executa a função Python local com os argumentos gerados e devolve o resultado via `FunctionResponse`.
4. Desenvolver o desafio prático **Multi-Tool Router**: orquestrar 4 ferramentas analíticas distintas e validar a capacidade do modelo de escolher a ferramenta exata ou declinar o uso de ferramentas para perguntas conceituais.
5. Implementar um laboratório de **resiliência e tratamento de erros de execução**: como repassar falhas e parâmetros inválidos de volta à LLM sem interromper a aplicação.
6. Consolidar os conceitos no **Quiz Interativo** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: A Mecânica de Tool Calling│
│ 14:20 - 14:50   │ Bloco 2: Declaração de Ferramentas Nativas             │
│ 14:50 - 15:30   │ Bloco 3: Despacho e Resolução do Ciclo da Ferramenta   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: O Multi-Tool Router          │
│ 16:15 - 16:25   │ Bloco 5: Laboratório de Resiliência & Erros de Execução │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_12.html) │
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
* **Foco Teórico:** A separação de responsabilidades no Function Calling: o modelo de linguagem NÃO executa código diretamente por motivos de segurança; ele emite a intenção de execução estruturada com os parâmetros calculados. O código hospedeiro (Python) executa e devolve o valor de observação.
* <!-- CAMADA 2: Inserir links da documentação oficial do Google GenAI sobre Function Calling -->

---

## 💻 4. Bloco 2: Declaração de Ferramentas Nativas (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_12/01_simple_tool.py`.
  - Declarar funções Python simples com type hints estritos (ex: `calcular_faturamento(regiao: str, ano: int) -> dict` e `consultar_cotacao(moeda: str) -> float`).
  - Passar as funções na configuração do modelo `gemini-3.8-flash`.
  - Inspecionar a estrutura do objeto `response.function_calls` retornado pela API quando o usuário faz uma pergunta que exige a ferramenta.
* <!-- CAMADA 2: Código completo de 01_simple_tool.py sem emojis em código -->

---

## ⚙️ 5. Bloco 3: Despacho e Resolução do Ciclo da Ferramenta (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_12/02_tool_dispatcher.py`.
  - Construir um mecanismo de roteamento e despacho (`dispatcher`): mapear o nome da função recebida do Gemini para a função Python real.
  - Executar a função com os argumentos validados.
  - Montar a resposta com o tipo `types.Part.from_function_response` e reenviar ao modelo.
  - Obter e imprimir a resposta final em linguagem natural sintetizada pelo modelo com base no resultado da execução.
* <!-- CAMADA 2: Código completo do ciclo de despacho e fechamento de turno sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de impressões entre as duplas.

---

## 🧪 7. Bloco 4: Desafio Prático: O Multi-Tool Router (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_12/03_multi_tool_router.py`.
  - Configurar 4 ferramentas de utilidade: `obter_temperatura_servidor(datacenter: str)`, `verificar_status_banco(cluster: str)`, `calcular_desvio_padrao(valores: list[float])` e `validar_formato_documento(cnpj: str)`.
  - Submeter uma bateria de 6 prompts diferentes (perguntas que precisam de 1 ferramenta, perguntas que misturam conceitos e perguntas puramente conceituais).
  - O script deve rotear e responder com precisão todas as 6 entradas, demonstrando quando chamar e quando NÃO chamar tools.
* <!-- CAMADA 2: Código do desafio multi-tool e bateria de prompts de teste sem emojis em código -->

---

## 🔬 8. Bloco 5: Laboratório de Resiliência & Erros de Execução (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Investigação Experimental em Duplas.
* **Objetivo:** Criar o script `dia_12/04_tool_error_handling.py`.
  - Forçar cenários onde a função local lança uma exceção (ex: divisão por zero, recurso temporariamente indisponível).
  - Em vez de derrubar o programa Python com crash, empacotar a mensagem de erro estruturada dentro do `FunctionResponse` (`{"error": "Divisao por zero nao permitida", "status": "falha"}`).
  - Validar como o `gemini-3.8-flash` recebe o erro e redige uma explicação amigável ao usuário sem quebrar a esteira.
* <!-- CAMADA 2: Código de tratamento defensivo de erros em chamadas de função sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Garantir que todos os 4 scripts (`01_simple_tool.py`, `02_tool_dispatcher.py`, `03_multi_tool_router.py` e `04_tool_error_handling.py`) foram testados e sincronizados no repositório compartilhado via commit convencional e push.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_12.html`](quizzes/quiz_dia_12.html)
* **Formato:** Questões práticas cobrindo a assinatura de ferramentas, JSON Schema embutido em docstrings, formato do payload `function_call`, empacotamento de `function_response` e arquitetura cliente de despacho.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 12](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 12:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre protocolo e semântica de Function Calling concluída.
- [x] Script `01_simple_tool.py` declarando ferramentas e gerando `function_call`.
- [x] Script `02_tool_dispatcher.py` executando funções e fechando o turno de resposta.
- [x] Desafio `03_multi_tool_router.py` aprovado na bateria de 6 prompts variados.
- [x] Laboratório `04_tool_error_handling.py` testado com recuperação amigável de erros.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 12 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo técnico sobre Function Calling avançado e boas práticas de tool design -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script com suporte a chamadas de função paralelas (Parallel Function Calling) nativas do Gemini -->
