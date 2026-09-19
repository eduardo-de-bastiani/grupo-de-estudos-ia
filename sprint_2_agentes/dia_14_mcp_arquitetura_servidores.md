# 📅 Dia 14 (01/10 - Quinta-feira)
# 🔌 Model Context Protocol (MCP): Arquitetura, Transporte Stdio & Clientes

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o **Model Context Protocol (MCP)** como padrão aberto para interoperabilidade entre modelos de IA e fontes de dados/ferramentas externas.
2. Analisar o funcionamento do transporte padrão **`stdio`** (comunicação inter-processos via entrada e saída padrão) e o formato de mensagens **JSON-RPC 2.0**.
3. Implementar um cliente MCP em Python utilizando o SDK oficial `mcp`, estabelecendo handshake com servidores locais e descobrindo ferramentas dinamicamente via `tools/list`.
4. Desenvolver o desafio prático **Adaptador Universal MCP-Gemini Bridge**: converter o catálogo de esquemas do servidor MCP para as declarações nativas do `google-genai` e executar ações com o `gemini-3.8-flash`.
5. Compreender na prática a trindade do protocolo MCP: a distinção entre **Tools** (ações dinâmicas), **Resources** (leitura contextual de dados) e **Prompts** (templates reutilizáveis).
6. Consolidar os conceitos no **Quiz Interativo** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: A Arquitetura do MCP     │
│ 14:20 - 14:50   │ Bloco 2: Anatomia do JSON-RPC 2.0 & Transporte stdio   │
│ 14:50 - 15:30   │ Bloco 3: Construção do Cliente MCP em Python           │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio: Adaptador Universal MCP-Gemini Bridge│
│ 16:15 - 16:25   │ Bloco 5: Laboratório: A Trindade Tools vs Resources    │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_14.html) │
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
* **Foco Teórico:** O problema de integração N×M (cada LLM precisava de conectores próprios para cada banco ou API) e como o MCP introduz uma arquitetura unificada cliente-servidor (estilo LSP / Language Server Protocol da engenharia de software).
* <!-- CAMADA 2: Inserir links da documentação oficial do Model Context Protocol (modelcontextprotocol.io) -->

---

## 🔬 4. Bloco 2: Anatomia do JSON-RPC 2.0 & Transporte `stdio` (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_14/01_stdio_inspector.py`.
  - Simular o fluxo de mensagens de baixo nível que trafega entre cliente e servidor via `sys.stdin` e `sys.stdout`.
  - Montar manualmente os envelopes JSON-RPC (`jsonrpc: "2.0"`, `method: "initialize"`, `id: 1`).
  - Entender como o processo filho é inicializado sem portas de rede e sem risco de exposição pública de sockets.
* <!-- CAMADA 2: Código de inspeção de envelopes JSON-RPC sem emojis em código -->

---

## 🔌 5. Bloco 3: Construção do Cliente MCP em Python (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_14/02_mcp_client.py`.
  - Utilizar a biblioteca oficial `mcp` (`from mcp import ClientSession, StdioServerParameters`).
  - Lançar um servidor de teste local via subprocesso com transporte `stdio`.
  - Executar o handshake assíncrono, listar o catálogo de ferramentas com `session.list_tools()` e invocar uma ferramenta teste com `session.call_tool()`.
* <!-- CAMADA 2: Código do cliente oficial assíncrono em Python sem emojis em código -->

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🌉 7. Bloco 4: Desafio: Adaptador Universal MCP-Gemini Bridge (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio Prático em Duplas.
* **Objetivo:** Criar o script `dia_14/03_mcp_gemini_bridge.py`.
  - Construir a função adaptadora `converter_mcp_para_gemini_tools(mcp_tools) -> list`: traduzir as definições de parâmetros e descrições do padrão MCP para os tipos esperados pelo `google-genai`.
  - Conectar o modelo `gemini-3.8-flash`: quando o Gemini requisita uma chamada, o adaptador repassa para o servidor MCP via `session.call_tool`, recebe o resultado e devolve a resposta ao usuário.
* <!-- CAMADA 2: Código completo da ponte MCP-Gemini sem emojis em código -->

---

## 📚 8. Bloco 5: Laboratório: A Trindade Tools vs Resources (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Demonstração Prática em Duplas.
* **Objetivo:** Criar o script `dia_14/04_mcp_resources_demo.py`.
  - Demonstrar na prática a leitura de um *Resource* MCP (URI estático de arquivo como `file:///docs/regras.md`).
  - Entender a separação conceitual: *Resources* alimentam contexto estático de forma controlada; *Tools* executam lógica e afetam o estado do sistema.
* <!-- CAMADA 2: Demonstração prática do uso de Resources MCP sem emojis em código -->

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Testar todos os 4 scripts da pasta `dia_14/` e realizar commit convencional e push no repositório compartilhado da dupla.

---

## 🧠 10. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_14.html`](quizzes/quiz_dia_14.html)
* **Formato:** Questões conceituais sobre transporte `stdio`, JSON-RPC 2.0, papel de clients e hosts no MCP, e mapeamento de ferramentas para LLMs.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 14](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 14:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura conceitual da arquitetura MCP concluída.
- [x] Script `01_stdio_inspector.py` inspecionando envelopes JSON-RPC.
- [x] Cliente MCP assíncrono funcional em `02_mcp_client.py`.
- [x] Ponte de integração MCP-Gemini executando ações com `gemini-3.8-flash`.
- [x] Diferença prática entre Tools e Resources validada em laboratório.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 14 respondido no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** <!-- CAMADA 2: Inserir link de vídeo oficial da introdução ao Model Context Protocol pela comunidade -->
2. 💻 **Código Bônus:** <!-- CAMADA 2: Inserir script cliente MCP com suporte a múltiplos servidores conectados em paralelo (Multi-Server MCP Host) -->
