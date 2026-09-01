# 🚀 Sprint 1: Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local

**Período:** 14/09 a 25/09 (10 Encontros - 30 Horas)  
**Parceiros:** Navi Hub (Tecnopuc) & DataLakers  
**Público:** 15 alunos de Engenharia de Software / Sistemas de Informação (PUCRS)

---

## 🎯 1. Objetivo da Sprint
A Sprint 1 estabelece as fundações sólidas da Engenharia de IA Generativa. De forma 100% autônoma e colaborativa, os alunos sairão do nível zero de conhecimento prático em LLMs para a construção de um sistema completo de **RAG (Retrieval-Augmented Generation)** funcional em Python, sem dependência de frameworks opacos, com validação de dados estruturados via **Pydantic**, banco vetorial **ChromaDB** e interface interativa em **Streamlit**.

---

## 🗓️ 2. Calendário e Navegação Diária

| Dia | Data | Tipo | Título do Encontro | Links & Conteúdo |
| :---: | :---: | :--- | :--- | :--- |
| **01** | 14/09 (Seg) | Onboarding | [Kickoff Oficial & Boas-Vindas DataLakers](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_01_onboarding_boas_vindas.md) | Abertura, Coffee Break de Boas-Vindas, Dinâmica Quebra-Gelo, Setup Inicial |
| **02** | 15/09 (Ter) | Fundamentos | [O que são LLMs? Tokens, Parâmetros & Google AI Studio](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_02_fundamentos_llms_tokens_setup.md) | Leitura Cloudflare Learning, Setup Gemini API gratuita, Tokenizers, Temperatura e Top-P |
| **03** | 16/09 (Qua) | Prática/Game | [Engenharia de Prompt & Segurança (Desafio Gandalf)](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_03_prompt_engineering_gandalf.md) | Leitura PromptingGuide, CoT, Few-shot, Delimitadores, Lakera Gandalf CTF |
| **04** | 17/09 (Qui) | Prática/Código | [Structured Outputs com Pydantic & Gemini](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_04_structured_outputs_validacao.md) | Leitura Google AI Docs / Pydantic, JSON schemas estritos, parser de incidentes |
| **05** | 18/09 (Sex) | Prática/Vetores | [Embeddings & Bancos Vetoriais com ChromaDB](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_05_embeddings_vector_search_chroma.md) | Leitura Cloudflare Embeddings/VectorDB, ChromaDB local, buscador semântico, formação dos trios |
| **06** | 21/09 (Seg) | Projeto (Kickoff) | [Kickoff do Projeto "AskData" & Arquitetura RAG](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_06_kickoff_projeto_arquitetura_rag.md) | Leitura Cloudflare/AWS RAG, setup do GitHub do trio, definição de domínio e arquitetura |
| **07** | 22/09 (Ter) | Palestra + Projeto | [Conversa com Ramon Lummertz + Ingestão & Chunking](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_07_ingestao_chunking_embeddings.md) | **14h-15h: Palestra Online com Ramon Lummertz**; 15h-17h: Ingestão de PDFs e Chunking com ChromaDB |
| **08** | 23/09 (Qua) | Projeto (Core) | [Retrieval & Geração Aumentada com Citação de Fontes](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_08_retrieval_generation_pipeline.md) | Leitura Grounding/RAG, top-k retrieval, prompt blindado e testes de estresse |
| **09** | 24/09 (Qui) | Projeto (UI & Testes) | [Interface com Streamlit, Explicabilidade & Refinamento](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_09_interface_streamlit_polimento.md) | Leitura Streamlit LLMs, UI interativa de chat, painel de fontes/chunks, ensaio do pitch |
| **10** | 25/09 (Sex) | Demo Day | [Demo Day da Sprint 1 & Pitch para a DataLakers](file:///home/eduardo/facul/8_semestre/grupo_estudos_ia/sprint_1_fundamentos_rag/dia_10_demo_day_pitch_sprint1.md) | Apresentação ao vivo para a liderança (10 min + 5 min Q&A), retrospectiva da Sprint 1 |

---

## 🛠️ 3. O Projeto da Sprint 1: "AskData"
**Desafio de Negócio:** Empresas lidam diariamente com volumes massivos de documentações técnicas, políticas internas, manuais e relatórios em PDF. Consultar essas informações manualmente consome tempo e gera erros operacionais.

**A Solução a ser construída pelos Trios:**
Um assistente inteligente local e interativo em Streamlit que:
1. Permite a leitura e ingestão de um corpus de documentos reais em PDF e/ou Markdown.
2. Processa, segmenta (chunking com overlap) e vetoriza os documentos em um banco vetorial local (**ChromaDB**).
3. Recebe perguntas em linguagem natural, recupera os trechos mais relevantes por similaridade semântica e gera respostas precisas utilizando o **Gemini 2.0 Flash**.
4. **Exige rastreabilidade:** A resposta deve citar exatamente o arquivo e o trecho de origem utilizado (Grounding), recusando-se a responder se o assunto estiver fora do contexto (anti-alucinação).

---

## 📊 4. Rubrica de Avaliação (Demo Day - Dia 10)

| Critério | Peso | Descrição |
| :--- | :---: | :--- |
| **1. Funcionamento Técnico do RAG** | 30% | Ingestão correta, recuperação semântica precisa no ChromaDB e geração de resposta fundamentada. |
| **2. Qualidade do Grounding & Anti-Alucinação** | 25% | Exibição das fontes/trechos recuperados na UI e capacidade do modelo dizer "Não encontrei essa informação no documento" quando fora do contexto. |
| **3. Interface & Usabilidade (Streamlit)** | 20% | Chat limpo, tempo de resposta adequado, facilidade de uso para usuários não técnicos. |
| **4. Código, Arquitetura & Git** | 15% | Código modular em Python, uso de boas práticas, README explicativo no repositório do trio. |
| **5. Pitch & Comunicação** | 10% | Demonstração ao vivo fluida (sem quebrar), clareza na explicação da arquitetura e divisão equilibrada de fala no trio. |
