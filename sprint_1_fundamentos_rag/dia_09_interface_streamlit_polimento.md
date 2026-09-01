# 📅 Dia 09 (24/09 - Quinta-feira)
# 🖥️ Interface com Streamlit, Explicabilidade & Preparação do Pitch

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Finalização do Projeto "AskData" em Trios & Ensaio Geral

---

## 🎯 1. Objetivos do Encontro
1. Construir uma interface web moderna, interativa e reativa para o projeto *AskData* utilizando **Streamlit**.
2. Implementar histórico conversacional fluido (`st.session_state`, `st.chat_message` e `st.chat_input`).
3. Criar uma barra lateral (*sidebar*) de **Explicabilidade**: permitir que o usuário inspecione os trechos exatos (chunks) recuperados do ChromaDB com a pontuação de similaridade e a página de origem.
4. Realizar o ensaio geral (*Dry Run*) do Pitch e da demonstração ao vivo para a apresentação de amanhã (Dia 10) diante da liderança da DataLakers.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Leitura Padronizada de Referência (Streamlit Chat)     │
│ 14:20 - 15:30   │ Codificação da Interface Web em `src/app.py`           │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:30   │ Testes Finais, Tratamento de Exceções & README do Trio │
│ 16:30 - 17:00   │ Ensaio Geral do Pitch (Simulação Cronometrada no Trio) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:20)

Realize a leitura do guia oficial de desenvolvimento de interfaces de chat:

1. 📄 [Streamlit Docs: Build a basic LLM chat app](https://docs.streamlit.io/develop/tutorials/llms/build-llm-apps) — *Entendendo o ciclo de re-execução do Streamlit e como manter mensagens vivas na tela com `st.session_state`.*

---

## 📦 4. Bloco 2: Setup & Instalação (14:20 - 14:25)

Com o `.venv` ativado:
```bash
pip install streamlit
```

---

## 💻 5. Bloco 3: Implementação da Interface Web (`src/app.py`) (14:25 - 15:30)

O trio integrará a classe `RAGEngine` na interface do Streamlit.

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

# Renderizar histórico de mensagens
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
    # 1. Adicionar mensagem do usuário na tela
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
                
                # Salvar no histórico da sessão
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": resposta_texto,
                    "fontes": fontes
                })
            except Exception as err:
                st.error(f"Erro ao processar a pergunta: {err}")
```

### Como Executar:
```bash
streamlit run src/app.py
```

---

## 📋 6. Bloco 4: Checklist do Repositório & README (15:45 - 16:30)

O repositório do trio no GitHub deve conter:
1. `README.md` completo:
   - Título do projeto e nomes dos integrantes.
   - O problema resolvido e o corpus de dados indexado.
   - Instruções passo a passo de como rodar (`python -m venv .venv`, `pip install -r requirements.txt`, `python src/ingestion.py`, `streamlit run src/app.py`).
2. `requirements.txt` atualizado:
   ```bash
   pip freeze > requirements.txt
   ```

---

## 🎤 7. Bloco 5: Ensaio Geral Autônomo do Pitch (16:30 - 17:00)

Cada trio cronometra e ensaia seu Pitch de **10 minutos**:
* **Minutos 0 a 2 (Problema & Domínio):** Qual dor o assistente resolve e quais documentos foram usados?
* **Minutos 2 a 5 (Arquitetura Técnica):** Explicação da ingestão, chunking, ChromaDB e prompt blindado com Gemini.
* **Minutos 5 a 9 (Live Demo):** Demonstração ao vivo no Streamlit (1 pergunta com resposta correta e citação de páginas + 1 pergunta fora de domínio mostrando a recusa anti-alucinação).
* **Minuto 9 a 10 (Aprendizados & Fechamento):** Desafios técnicos superados pelo trio.

### ✅ Checklist de Conclusão do Dia 09:
- [x] Leitura de componentes de chat do Streamlit concluída.
- [x] Aplicação web Streamlit executando localmente com chat e painel de explicabilidade.
- [x] Repositório documentado com `README.md` e `requirements.txt`.
- [x] Pitch ensaiado e cronometrado no trio.
