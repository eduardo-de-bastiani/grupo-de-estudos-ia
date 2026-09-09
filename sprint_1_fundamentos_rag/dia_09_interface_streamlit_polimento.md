# 📅 Dia 09 (24/09 - Quinta-feira)
# 🖥️ Interface com Streamlit, Explicabilidade & Preparação do Pitch

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Finalização do Projeto "AskData" em Trios & Ensaio Geral  

---

## 🎯 1. Objetivos do Encontro
1. Construir uma interface web moderna, interativa e reativa para o projeto *AskData* utilizando **Streamlit**.
2. Implementar histórico conversacional fluido (`st.session_state`, `st.chat_message` e `st.chat_input`).
3. Criar uma barra lateral (*sidebar*) de **Explicabilidade**: permitir que o usuário inspecione os trechos exatos (chunks) recuperados do ChromaDB com a pontuação de similaridade e a página de origem.
4. Consolidar a documentação do repositório no GitHub (`README.md` e `requirements.txt`).
5. Realizar o ensaio geral (*Dry Run*) do Pitch e da demonstração ao vivo para a apresentação de amanhã (Dia 10) diante da banca da DataLakers.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Leitura Padronizada de Referência (Streamlit para IA)  │
│ 14:20 - 15:30   │ Codificação da Interface Web em `src/app.py`           │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:30   │ Testes Finais, README do Trio & Sincronização no Git   │
│ 16:30 - 17:00   │ Ensaio Geral do Pitch (Simulação Cronometrada no Trio) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:20)

Realize a leitura dos artigos de referência sobre prototipação ágil de interfaces de IA com Streamlit:

1. 📄 [Dev.to: Streamlit — The Fastest Way to Build AI-Ready Web Apps Using Pure Python](https://dev.to/manikandan/streamlit-the-fastest-way-to-build-ai-ready-web-apps-using-pure-python-40d2) — *Como o Streamlit permite prototipar interfaces de chat reativas para IA diretamente em Python puro sem necessidade de frameworks complexos de frontend.*
2. 📄 [Medium: How Streamlit is Helpful in Rapid Prototyping and Checking the Model's Response](https://medium.com/@adilmaqsood501/how-streamlit-is-helpful-in-rapid-prototyping-and-checking-the-models-response-6cf39d3c93c9) — *Boas práticas para inspeção de saídas de modelos, avaliação de contexto e testes visuais em aplicações generativas.*

---

## 💻 4. Bloco 2: Implementação da Interface Web (`src/app.py`) (14:20 - 15:30)

O trio integrará a classe `RAGEngine` desenvolvida no Dia 08 à interface visual do Streamlit.

Instale o Streamlit no ambiente virtual:
```bash
pip install streamlit
```

### Código de Referência: `src/app.py`

```python
import streamlit as st
import os
from rag_engine import RAGEngine

# Configuracao da pagina
st.set_page_config(
    page_title="AskData - Base de Conhecimento Inteligente",
    page_icon="🧠",
    layout="wide"
)

# Inicializar o motor RAG em cache para evitar recriacao desnecessaria
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
    st.caption("Esta aplicação utiliza embeddings do Google (`gemini-embedding-001`), armazenamento vetorial persistente no **ChromaDB** e geração com o **Modelo Gemini**.")
    
    if st.button("🧹 Limpar Histórico de Chat"):
        st.session_state.messages = []
        st.rerun()

# --- AREA PRINCIPAL ---
st.title("🧠 AskData: Assistente de Documentação Técnica")
st.caption("Faça perguntas sobre a base de conhecimento. Todas as respostas são fundamentadas com citação direta dos documentos.")

# Inicializar historico na sessao
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Olá! Sou o AskData. Como posso ajudar com base nos documentos técnicos da empresa?", "fontes": []}
    ]

# Renderizar historico de mensagens
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if msg.get("fontes"):
            with st.expander("🔍 Ver Fontes & Chunks Recuperados"):
                for idx, f in enumerate(msg["fontes"], 1):
                    st.markdown(f"**Fonte {idx}:** `{f['arquivo']}` (Pág. {f['pagina']}) — *Similaridade: {f['similaridade']:.2%}*")
                    st.info(f['texto'])

# Input do usuario
if prompt := st.chat_input("Digite sua pergunta técnica aqui..."):
    # 1. Adicionar mensagem do usuario na tela
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
                
                # Salvar no historico da sessao
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": resposta_texto,
                    "fontes": fontes
                })
            except Exception as err:
                st.error(f"Erro ao processar a pergunta: {err}")

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

### Como Executar a Aplicação:
```bash
streamlit run src/app.py
```

> 💡 Se a aplicação do Streamlit não atualizar ao salvar o arquivo ou acusar erro de `st.session_state`, recarregue a página (`Ctrl+R` / `F5`) ou pare o servidor com `Ctrl+C` e rode novamente.

---

## 📋 5. Bloco 3: Testes Finais, README & Sincronização no GitHub (15:45 - 16:30)

Neste bloco, o trio consolida a entrega técnica para o Demo Day:

1. **Documentação no `README.md`:**
   - Nome do projeto, integrantes do trio e domínio de dados indexado.
   - Guia rápido de execução: criação de `.venv`, instalação das dependências via `requirements.txt`, script de ingestão e comando do Streamlit.
2. **Atualização do `requirements.txt`:**
   ```bash
   pip freeze > requirements.txt
   ```
3. **Sincronização no Repositório Remoto:**
   - Dediquem os minutos finais para que todos os 3 integrantes sincronizem os códigos e a documentação no repositório do GitHub.
   - Validem que nenhum arquivo sensível (`.env`, `.venv`, `chroma_db/`) foi enviado ao repositório.

---

## 🎤 6. Bloco 4: Ensaio Geral Autônomo do Pitch (16:30 - 17:00)

Cada trio cronometra e ensaia seu Pitch de **10 minutos** com divisão de fala entre todos os membros:
* **Minutos 0 a 2 (Problema & Domínio):** Qual dor o assistente resolve e quais documentos foram utilizados?
* **Minutos 2 a 5 (Arquitetura Técnica):** Explicação sucinta da ingestão, chunking, ChromaDB e prompt blindado anti-alucinação no Modelo Gemini.
* **Minutos 5 a 9 (Live Demo):** Demonstração ao vivo no Streamlit (1 pergunta com resposta correta e citação de páginas + 1 pergunta fora de domínio demonstrando a recusa anti-alucinação).
* **Minuto 9 a 10 (Aprendizados & Fechamento):** Desafios técnicos superados pelo time.

### ✅ Checklist de Conclusão do Dia 09:
- [x] Leituras conceituais de interfaces com Streamlit concluídas.
- [x] Aplicação web Streamlit executando localmente com chat e painel de explicabilidade.
- [x] Repositório documentado com `README.md` e `requirements.txt` atualizados.
- [x] Sincronização final realizada no GitHub do trio.
- [x] Pitch ensaiado e cronometrado com fala distribuída entre os 3 membros.
