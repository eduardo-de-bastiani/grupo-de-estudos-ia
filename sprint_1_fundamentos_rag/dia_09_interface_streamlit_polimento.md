# 📅 Dia 09 (24/09 - Quinta-feira)
# 🖥️ Interface com Streamlit, Explicabilidade & Preparação do Pitch

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Semana 2:** Finalização do Projeto "AskData" em Trios & Ensaio Geral

---

## 🎯 1. Objetivos do Encontro
1. Construir uma interface web moderna e reativa para o projeto *AskData* utilizando **Streamlit**.
2. Implementar histórico conversacional fluido (`st.session_state`, `st.chat_message` e `st.chat_input`).
3. Criar uma barra lateral (*sidebar*) de **Explicabilidade**: permitir que o usuário veja os trechos exatos (chunks) recuperados do ChromaDB com a pontuação de similaridade e a página de origem.
4. Realizar o ensaio geral (*Dry Run*) do Pitch e demonstração ao vivo para a apresentação de amanhã (Dia 10) diante da liderança da DataLakers.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Daily Standup & Crash Course de Streamlit Chat         │
│ 14:20 - 15:30   │ Codificação da Interface em `src/app.py`               │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:30   │ Testes Finais, Tratamento de Exceções & README do Trio │
│ 16:30 - 17:00   │ Ensaio Geral do Pitch (3 min por trio + feedback)      │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📦 3. Bloco 1: Setup do Streamlit & Componentes (14:00 - 14:20)

Instalar o Streamlit no ambiente virtual:
```bash
pip install streamlit
```

### 📚 Documentação & Guia Rápido:
* [Streamlit: Build a basic LLM chat app](https://docs.streamlit.io/develop/tutorials/llms/build-llm-apps) — *Guia oficial de componentes conversacionais*.
* **Conceito Chave (`st.session_state`):** Como o Streamlit reexecuta o script do topo ao final a cada interação do usuário, o `st.session_state.messages` armazena a lista de mensagens para manter o histórico visível na tela.

---

## 💻 4. Bloco 2: Implementação do App Web (`src/app.py`) (14:20 - 15:30)

Cada trio integrará seu `RAGEngine` na interface do Streamlit.

### Código de Referência: `src/app.py`

```python
import streamlit as st
import os
from rag_engine import RAGEngine

# Configuração da página
st.set_page_config(
    page_title="AskData - Base de Conhecimento Inteligente",
    page_icon="🧠",
    layout="wide"
)

# Inicializar o motor RAG em cache para evitar recriação desnecessária
@st.cache_resource
def get_rag_engine():
    return RAGEngine()

try:
    engine = get_rag_engine()
except Exception as e:
    st.error(f"Erro ao inicializar o motor RAG: {e}. Verifique sua GEMINI_API_KEY no arquivo .env!")
    st.stop()

# --- BARRA LATERAL (SIDEBAR) ---
with st.sidebar:
    st.image("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60", use_container_width=True)
    st.title("⚙️ Painel de Controle")
    st.markdown("**AskData** | *DataLakers & Navi Hub*")
    st.markdown("---")
    
    top_k = st.slider("Quantidade de Chunks (Top-K):", min_value=1, max_value=5, value=3)
    
    st.markdown("### ℹ️ Sobre a Base Indexada")
    st.caption("Esta aplicação utiliza embeddings do Google (`text-embedding-004`), armazenamento vetorial persistente no **ChromaDB** e geração com **Gemini 2.0 Flash**.")
    
    if st.button("🧹 Limpar Histórico de Chat"):
        st.session_state.messages = []
        st.rerun()

# --- ÁREA PRINCIPAL ---
st.title("🧠 AskData: Assistente de Documentação Técnica")
st.caption("Faça perguntas sobre a base de conhecimento. Todas as respostas são fundamentadas com citação direta dos documentos.")

# Inicializar histórico na sessão
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Olá! Sou o AskData. Como posso ajudar com base nos documentos técnicos da empresa?", "fontes": []}
    ]

# Renderizar mensagens anteriores
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if msg.get("fontes"):
            with st.expander("🔍 Ver Fontes & Chunks Recuperados"):
                for idx, f in enumerate(msg["fontes"], 1):
                    st.markdown(f"**Fonte {idx}:** `{f['arquivo']}` (Pág. {f['pagina']}) — *Similaridade: {f['similaridade']:.2%}*")
                    st.info(f['texto'])

# Input do usuário
if prompt := st.chat_input("Digite sua pergunta técnica aqui..."):
    # 1. Adicionar mensagem do usuário
    st.session_state.messages.append({"role": "user", "content": prompt, "fontes": []})
    with st.chat_message("user"):
        st.markdown(prompt)

    # 2. Gerar resposta com o motor RAG
    with st.chat_message("assistant"):
        with st.spinner("Buscando no banco vetorial e formulando resposta..."):
            try:
                resultado = engine.responder_pergunta(prompt, top_k=top_k)
                resposta_texto = resultado["resposta"]
                fontes = resultado["fontes"]
                
                st.markdown(resposta_texto)
                
                if fontes:
                    with st.expander("🔍 Ver Fontes & Chunks Recuperados"):
                        for idx, f in enumerate(fontes, 1):
                            st.markdown(f"**Fonte {idx}:** `{f['arquivo']}` (Pág. {f['pagina']}) — *Similaridade: {f['similaridade']:.2%}*")
                            st.info(f['texto'])
                
                # Salvar no histórico
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": resposta_texto,
                    "fontes": fontes
                })
            except Exception as err:
                st.error(f"Erro ao processar a pergunta: {err}")
```

### Como Executar a Aplicação:
```bash
streamlit run src/app.py
```

---

## 📋 5. Bloco 3: Checklist do Repositório & README do Trio (15:45 - 16:30)

Antes da apresentação de amanhã, o repositório de cada trio deve conter:
1. `README.md` com:
   - Nome do projeto e integrantes do trio.
   - O problema de negócio abordado e o corpus de dados utilizado.
   - Instruções claras de instalação e execução (`python -m venv .venv`, `pip install -r requirements.txt`, `python src/ingestion.py`, `streamlit run src/app.py`).
   - Diagrama de arquitetura ou print da interface.
2. `requirements.txt` atualizado:
   ```bash
   pip freeze > requirements.txt
   ```

---

## 🎤 6. Bloco 4: Ensaio Geral do Pitch (16:30 - 17:00)

Cada trio fará uma simulação rápida de **3 minutos** diante do mentor:
* **Estrutura Recomendada do Pitch (10 minutos para amanhã):**
  1. **Problema & Proposta de Valor (2 min):** Qual dor do usuário o AskData do seu trio resolve?
  2. **Arquitetura Técnica (3 min):** Como funciona o pipeline de ingestão, chunking, ChromaDB e o prompt blindado com Gemini?
  3. **Live Demo (4 min):** Demonstração ao vivo no Streamlit (1 pergunta com resposta correta e fontes, e 1 pergunta fora de escopo mostrando o comportamento anti-alucinação).
  4. **Aprendizados & Próximos Passos (1 min):** O maior desafio técnico superado pelo time.

### ✅ Critério de Conclusão do Dia 09:
- [x] Interface Streamlit funcionando localmente com chat reativo e painel de fontes.
- [x] Repositório no GitHub documentado e com `requirements.txt` atualizado.
- [x] Roteiro do Pitch ensaiado e divisão de fala acertada entre os integrantes.
