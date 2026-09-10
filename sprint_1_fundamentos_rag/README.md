# 🚀 Sprint 1: Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local

**Período:** 14/09 a 25/09 (10 Encontros - 30 Horas)  
**Parceiros:** Navi Hub (Tecnopuc) & DataLakers  
**Público:** 15 alunos dos cursos de computação

---

## 🎯 1. Objetivo da Sprint
A Sprint 1 estabelece as fundações sólidas da Engenharia de IA Generativa. De forma 100% autônoma e colaborativa, os alunos sairão do nível zero de conhecimento prático em LLMs para a construção de um sistema completo de **RAG (Retrieval-Augmented Generation)** funcional em Python, explorando a fundo o **Google AI Studio**, banco vetorial local **ChromaDB** e interface interativa em **Streamlit**.

---

## 🗓️ 2. Calendário e Navegação Diária

| Dia | Data | Tipo | Título do Encontro | Links & Conteúdo |
| :---: | :---: | :--- | :--- | :--- |
| **01** | 14/09 (Seg) | Onboarding | [Kickoff Oficial & Boas-Vindas DataLakers](dia_01_onboarding_boas_vindas.md) | Abertura, Coffee de Boas-Vindas, Dinâmica Quebra-Gelo, Setup Inicial |
| **02** | 15/09 (Ter) | Plataforma | [Explorando o Google AI Studio: Playground, Tools & Comparação de Modelos](dia_02_explorando_google_ai_studio.md) | Imersão no Google AI Studio, chaves de API, parâmetros (Temp, Top-P, Top-K, Thinking), Tools nativas, Safety Settings e Compare Mode |
| **03** | 16/09 (Qua) | Código/Fundamentos | [Fundamentos de LLMs em Código, Tokenização & SDK Python](dia_03_fundamentos_llms_tokens_python.md) | Primeiras chamadas via SDK Python, tokens vs caracteres/palavras em PT/EN/código, validação de hiperparâmetros |
| **04** | 17/09 (Qui) | Prompt/Segurança | [Engenharia de Prompt Avançada & Segurança (Desafio Gandalf)](dia_04_prompt_engineering_gandalf.md) | Few-shot, CoT, delimitadores estruturais, desafio Lakera Gandalf (1 ao 8) e Mini-CTF em Python |
| **05** | 18/09 (Sex) | Prática/Vetores | [Embeddings & Bancos Vetoriais com ChromaDB](dia_05_embeddings_vector_search_chroma.md) | Estudo sobre Embeddings/VectorDB, ChromaDB local, buscador semântico, formação dos trios |
| **06** | 21/09 (Seg) | Projeto (Kickoff) | [Kickoff do AskData, Coleta de Documentos & Setup Git](dia_06_kickoff_projeto_arquitetura_rag.md) | Leitura RAG, escolha de domínio e coleta ativa de documentos reais (PDFs), setup do Git e dinâmica piloto/copiloto |
| **07** | 22/09 (Ter) | Palestra + Projeto | [Conversa com Ramon Lummertz & Ingestão com Chunking no ChromaDB](dia_07_ingestao_chunking_embeddings.md) | **14h-15h: Palestra Online com Ramon Lummertz**; 15h-17h: Ingestão de PDFs e Chunking com ChromaDB |
| **08** | 23/09 (Qua) | Projeto (Core) | [Retrieval & Geração Aumentada com Citação de Fontes](dia_08_retrieval_generation_pipeline.md) | Leitura Grounding/RAG, top-k retrieval, prompt blindado e testes de estresse |
| **09** | 24/09 (Qui) | Projeto (UI & Testes) | [Interface com Streamlit, Explicabilidade & Refinamento](dia_09_interface_streamlit_polimento.md) | Streamlit para prototipação, UI interativa de chat, painel de fontes/chunks, ensaio do pitch |
| **10** | 25/09 (Sex) | Demo Day | [Demo Day da Sprint 1 & Pitch para a DataLakers](dia_10_demo_day_pitch_sprint1.md) | Apresentação ao vivo para a liderança (10 min + 5 min Q&A), retrospectiva da Sprint 1 |

---

## 🛠️ 3. O Projeto da Sprint 1: "AskData"
**Desafio de Negócio:** Empresas lidam diariamente com volumes massivos de documentações técnicas, políticas internas, manuais e relatórios em PDF. Consultar essas informações manualmente consome tempo e gera erros operacionais.

**A Solução a ser construída pelos Trios:**
Um assistente inteligente local e interativo que:
1. Permite a leitura e ingestão de um corpus de documentos reais em PDF.
2. Processa, segmenta e vetoriza os documentos em um banco vetorial local (**ChromaDB**).
3. Recebe perguntas em linguagem natural, recupera os trechos mais relevantes por similaridade semântica e gera respostas precisas utilizando os modelos Gemini.
4. A resposta deve citar exatamente o arquivo e o trecho de origem utilizado (Grounding), recusando-se a responder se o assunto estiver fora do contexto (anti-alucinação).
