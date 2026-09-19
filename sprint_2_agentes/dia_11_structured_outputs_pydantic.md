# 📅 Dia 11 (28/09 - Segunda-feira)
# 🧩 Structured Outputs: Contratos de Dados, JSON Schemas & Pydantic

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender a importância de **Structured Outputs** (saídas estruturadas) na transição de chatbots conversacionais para sistemas analíticos e agentes automatizados.
2. Dominar a especificação de contratos de dados em Python moderno utilizando **Pydantic** e sua conversão automática em JSON Schemas no SDK `google-genai`.
3. Forçar o modelo `gemini-3.8-flash` a responder estritamente sob esquemas tipados via parâmetro `response_schema`, eliminando falhas de parsing (`json.loads`).
4. Implementar modelos complexos com **campos aninhados, Enums e validadores customizados** (`@field_validator`).
5. Realizar o desafio prático de **extração estruturada contra logs e textos caóticos de suporte**, validando a integridade dos dados extraídos.
6. Comparar experimentalmente a taxa de sucesso de **Structured Outputs vs prompts comuns pedindo JSON** através de um script de benchmark.
7. Consolidar os conceitos no **Quiz Interativo** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Por que Structured Output?│
│ 14:20 - 14:50   │ Bloco 2: Laboratório Pydantic Básico (response_schema) │
│ 14:50 - 15:30   │ Bloco 3: Modelagem Avançada (Schemas Aninhados & Enums)│
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: Stress Test de Extração Logs │
│ 16:15 - 16:25   │ Bloco 5: Benchmark: Structured Outputs vs JSON Livre   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_11.html) │
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
* **Foco Teórico:** Como os decodificadores de LLM utilizam gramáticas formais (CFG / Context-Free Grammars) para restringir o espaço amostral de tokens, garantindo conformidade matemática com um JSON Schema sem depender de "pedir por favor" no prompt.
* <!-- CAMADA 2: Inserir links da documentação do Google GenAI SDK (Structured Outputs) e Pydantic v2 -->

---

## 💻 4. Bloco 2: Laboratório Pydantic Básico com `response_schema` (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_11/01_pydantic_schema.py`. Modelar uma classe `PerfilUsuario` (nome, idade, habilidades, status) usando Pydantic, configurar o `response_schema` no cliente `google-genai` com `gemini-3.8-flash` e validar a recepção direta do objeto tipado.
* <!-- CAMADA 2: Código completo de 01_pydantic_schema.py sem emojis em código -->

---

## 🧩 5. Bloco 3: Modelagem Avançada: Schemas Aninhados, Enums & Validadores (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_11/02_nested_schema_validator.py`. Modelar uma estrutura de dados de auditoria analítica contendo:
  - `Severidade` como `Enum` (`BAIXA`, `MEDIA`, `ALTA`, `CRITICA`).
  - Lista de objetos aninhados `ItemAuditoria` (tabela, coluna, anomalia_detectada, registros_afetados).
  - Validador customizado `@field_validator` garantindo integridade numérica e campos preenchidos.
  - Submeter textos analíticos complexos ao `gemini-3.8-flash` e instanciar os modelos sem nenhuma perda de tipagem.
* <!-- CAMADA 2: Código completo de 02_nested_schema_validator.py e dados de teste sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de impressões entre as duplas.

---

## 🧪 7. Bloco 4: Desafio Prático: Stress Test de Extração de Logs (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_11/03_extractor_stress_test.py`.
  - Processar um lote de 5 mensagens de erro e transcrições desestruturadas reais (stack traces corrompidos, logs com caracteres especiais e formatos mistos).
  - Extrair obrigatoriamente para um schema `RelatorioIncidente` com campos: `timestamp`, `servico_origem`, `tipo_erro`, `stack_resumido` e `acoes_recomendadas` (lista).
  - O script deve iterar sobre cada log, validar a resposta e assinalar 100% de sucesso na validação Pydantic.
* <!-- CAMADA 2: Casos de teste de logs ruidosos e script do desafio sem emojis em código -->

---

## 📊 8. Bloco 5: Comparação de Eficiência: Structured Outputs vs JSON Livre (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Investigação Experimental em Duplas.
* **Objetivo:** Criar o script `dia_11/04_benchmark_parsing.py`. Comparar a abordagem clássica (prompt dizendo *"retorne apenas JSON"* sem schema formal) contra `response_schema` com Pydantic sobre 10 repetições.
  - Medir taxa de erro de parsing (`json.JSONDecodeError`), formatação com markdown triplo (` ```json `) indesejado e tempo de resposta.
* <!-- CAMADA 2: Script de benchmark comparativo sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Conferir que a pasta `dia_11/` contém todos os 4 scripts funcionais (`01_pydantic_schema.py`, `02_nested_schema_validator.py`, `03_extractor_stress_test.py` e `04_benchmark_parsing.py`), testar localmente e realizar commit convencional e push no repositório compartilhado.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_11.html`](quizzes/quiz_dia_11.html)
* **Formato:** Questões práticas sobre gramáticas CFG, Pydantic v2, validação de tipos em tempo de execução, diferença entre prompt livre e `response_schema`, e tratamento de dados aninhados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 11](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 11:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura conceitual sobre saídas estruturadas concluída.
- [x] Script `01_pydantic_schema.py` implementado com Pydantic e `response_schema`.
- [x] Script `02_nested_schema_validator.py` com enums e validação customizada funcionando.
- [x] Desafio `03_extractor_stress_test.py` aprovado contra logs desestruturados.
- [x] Benchmark `04_benchmark_parsing.py` executado evidenciando o valor de contratos formais.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 11 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo técnico sobre Structured Outputs e gramáticas CFG em LLMs modernas -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script de conversão bidirecional entre Pydantic e JSON Schema com geração dinâmica de documentação -->
