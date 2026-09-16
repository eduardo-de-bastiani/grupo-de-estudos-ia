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
4. Executar a **Sprint de Features de 15 Minutos** para polimento colaborativo do frontend em trio.
5. Consolidar a documentação do repositório no GitHub (`README.md` e `requirements.txt`).
6. Conduzir o **Teste de Usabilidade Cego** cruzado entre trios para validação de experiência do usuário.
7. Realizar o ensaio geral (*Dry Run*) do Pitch e da demonstração ao vivo para a apresentação do Demo Day (Dia 10).
8. Consolidar os conhecimentos do dia através do **Quiz Interativo de Fixação**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Leitura Padronizada de Referência (Streamlit para IA)  │
│ 14:20 - 15:30   │ Codificação da Interface Web & Sprint de Features      │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:05   │ Testes Finais, README do Trio & Sincronização no Git   │
│ 16:05 - 16:15   │ Teste de Usabilidade Cego entre Trios                  │
│ 16:15 - 16:35   │ Ensaio Geral do Pitch (Simulação Cronometrada no Trio) │
│ 16:35 - 16:45   │ Quiz Interativo do Dia (quizzes/quiz_dia_09.html)      │
│ 16:45 - 17:00   │ Formulário Diário de Auto-Avaliação & Feedback (Forms) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:20)

Realize a leitura dos artigos de referência sobre prototipação ágil de interfaces de IA com Streamlit:

1. 📄 [Dev.to: Streamlit — The Fastest Way to Build AI-Ready Web Apps Using Pure Python](https://dev.to/manikandan/streamlit-the-fastest-way-to-build-ai-ready-web-apps-using-pure-python-40d2) — *Como o Streamlit permite prototipar interfaces de chat reativas para IA diretamente em Python puro sem necessidade de frameworks complexos de frontend.*
2. 📄 [Medium: How Streamlit is Helpful in Rapid Prototyping and Checking the Model's Response](https://medium.com/@adilmaqsood501/how-streamlit-is-helpful-in-rapid-prototyping-and-checking-the-models-response-6cf39d3c93c9) — *Boas práticas para inspeção de saídas de modelos, avaliação de contexto e testes visuais em aplicações generativas.*

---

## 💻 4. Bloco 2: Implementação da Interface Web & Sprint de Features (14:20 - 15:30)

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
    st.title("Painel de Controle")
    st.markdown("**AskData** | *DataLakers & Navi Hub*")
    st.markdown("---")
    
    top_k = st.slider("Quantidade de Chunks (Top-K):", min_value=1, max_value=5, value=3)
    
    st.markdown("### Sobre a Base Indexada")
    st.caption("Esta aplicação utiliza embeddings do Google (`gemini-embedding-001`), armazenamento vetorial persistente no **ChromaDB** e geração com o **Modelo Gemini**.")
    
    if st.button("Limpar Historico de Chat"):
        st.session_state.messages = []
        st.rerun()

# --- AREA PRINCIPAL ---
st.title("AskData: Assistente de Documentacao Tecnica")
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
            with st.expander("Ver Fontes e Chunks Recuperados"):
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
                    with st.expander("Ver Fontes e Chunks Recuperados"):
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

### ⏱️ Dinâmica em Trio: Sprint de Features de 15 Minutos (15:15 - 15:30)

Assim que a versão básica de `src/app.py` estiver de pé e respondendo perguntas, o trio entra em um timebox focado de 15 minutos para enriquecer a aplicação. Cada membro assume a responsabilidade de implementar **1 feature de polimento** em paralelo:

1. **Integrante A — Métrica de Tempo de Resposta:**
   Meça a latência do motor RAG com `time.perf_counter()` e exiba o tempo de processamento logo abaixo da resposta:
   ```python
   import time

   inicio = time.perf_counter()
   resultado = engine.responder_pergunta(prompt, top_k=top_k)
   latencia = time.perf_counter() - inicio
   st.caption(f"Tempo de resposta: {latencia:.2f}s")
   ```

2. **Integrante B — Exportação do Histórico de Conversa:**
   Adicione um botão na sidebar para o usuário baixar a sessão de perguntas e respostas em formato JSON:
   ```python
   import json

   historico_json = json.dumps(st.session_state.messages, indent=2, ensure_ascii=False)
   st.sidebar.download_button(
       label="Exportar Historico (JSON)",
       data=historico_json,
       file_name="historico_chat.json",
       mime="application/json"
   )
   ```

3. **Integrante C — Botões de Perguntas Sugeridas:**
   Crie botões rápidos na sidebar ou na área principal com dúvidas frequentes sobre os documentos indexados para agilizar a demonstração ao vivo:
   ```python
   st.sidebar.markdown("### Perguntas Frequentes")
   perguntas_exemplo = [
       "Quais sao as diretrizes principais do documento?",
       "Como funciona o fluxo de aprovacao?",
       "Qual e o prazo estabelecido na politica?"
   ]
   for p in perguntas_exemplo:
       if st.sidebar.button(p, key=f"btn_{p}"):
           st.session_state.messages.append({"role": "user", "content": p, "fontes": []})
           st.rerun()
   ```

Ao final dos 15 minutos, juntem as adições no arquivo principal `src/app.py` e verifiquem se tudo continua rodando antes do coffee break.

---

## 📋 5. Bloco 3: Testes Finais, README & Sincronização no GitHub (15:45 - 16:05)

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

## 🧑‍🤝‍🧑 6. Bloco 4: Teste de Usabilidade Cego entre Trios (16:05 - 16:15)

Antes de ensaiar a fala do pitch, conduza um teste de experiência real de uso cruzado entre grupos:

1. **Troca Rápida de Usuários:** Convide 1 ou 2 colegas de outro trio para sentar na frente do computador com o Streamlit aberto.
2. **Uso Cego (3 minutos):** Os convidados devem usar o `app.py` livremente por 3 minutos (fazendo perguntas, abrindo o expander de fontes, alterando o Top-K na sidebar) **sem receber nenhuma explicação ou tutorial verbal** do trio dono do projeto.
3. **Observação Ativa:** O trio anfitrião apenas assiste e anota silenciosamente:
   - Em quais momentos o usuário ficou hesitante ou confuso?
   - As citações de fontes e pontuações de similaridade foram fáceis de entender?
   - Os estados de carregamento (`st.spinner`) deixaram claro o que estava acontecendo?
4. **Feedback Imediato:** Nos 2 minutos finais, o usuário visitante compartilha os pontos que achou intuitivos e onde sentiu fricção. O trio anota os pontos de atenção para conduzir a demonstração de amanhã com mais clareza.

---

## 🎤 7. Bloco 5: Ensaio Geral Autônomo do Pitch (16:15 - 16:35)

Cada trio cronometra e ensaia seu Pitch de **10 minutos** com divisão de fala entre todos os membros:
* **Minutos 0 a 2 (Problema & Domínio):** Qual dor o assistente resolve e quais documentos foram utilizados?
* **Minutos 2 a 5 (Arquitetura Técnica):** Explicação sucinta da ingestão, chunking, ChromaDB e prompt blindado anti-alucinação no Modelo Gemini.
* **Minutos 5 a 9 (Live Demo):** Demonstração ao vivo no Streamlit (1 pergunta com resposta correta e citação de páginas + 1 pergunta fora de domínio demonstrando a recusa anti-alucinação).
* **Minuto 9 a 10 (Aprendizados & Fechamento):** Desafios técnicos superados pelo time.

Utilizem os minutos restantes para trocar feedbacks internos, ajustar a postura, calibrar o ritmo de fala e garantir que a transição entre os membros do trio seja natural.

---

## 🧠 8. Bloco 6: Quiz Interativo de Fixação (16:35 - 16:45)

Abra o arquivo [`quizzes/quiz_dia_09.html`](quizzes/quiz_dia_09.html) diretamente no seu navegador de internet e responda individualmente ou em trio às 16 questões interativas:

* **Tópicos Abordados:** Ciclo de execução e reatividade do Streamlit, persistência com `st.session_state`, componentes de chat (`st.chat_message` e `st.chat_input`), apresentação de chunks/similaridade do ChromaDB na interface e cuidados essenciais na preparação do Pitch.
* **Formatos de Questões:** Verdadeiro ou falso, múltipla escolha, preenchimento de termos, ordenação lógica de pipeline e associação de conceitos.
* **Feedback Imediato:** Cada questão exibe na hora a explicação detalhada da resposta correta, reforçando a base teórica antes do formulário final do dia.

---

## 📝 9. Bloco 7: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 09](https://docs.google.com/forms/d/e/1FAIpQLSfwAa5BJ5wnaXSQ8hABOF5eX5sZCy7yjsPjy_cso6XwPcAigQ/viewform)

### ✅ Checklist de Conclusão do Dia 09:
- [x] Leituras conceituais de interfaces com Streamlit concluídas.
- [x] Aplicação web Streamlit executando localmente com chat e painel de explicabilidade.
- [x] Sprint de Features de 15 Minutos executada em trio com polimentos integrados em `src/app.py`.
- [x] Documentação consolidada no `README.md` e dependências salvas no `requirements.txt`.
- [x] Sincronização final realizada no repositório GitHub do trio.
- [x] Teste de Usabilidade Cego conduzido com integrantes de outro trio.
- [x] Pitch ensaiado e cronometrado (10 min) com divisão de fala entre todos os membros.
- [x] Quiz interativo do Dia 09 respondido em `quizzes/quiz_dia_09.html`.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo de Aprofundamento:** [Streamlit Crash Course [2024]](https://www.youtube.com/watch?v=20V_ZB7taCM) — *Tutorial focado cobrindo arquitetura do Streamlit, fluxo de execução, gerenciamento de estado e estruturação de interfaces complexas.*
2. 💻 **Código Bônus (Badge Visual de Confiança na Sidebar):**
   Adicione um indicador visual na sidebar para exibir a confiabilidade média da resposta com base nas pontuações de similaridade dos chunks recuperados em `resultado["fontes"]`:
   ```python
   # Exemplo de calculo de confianca media das fontes recuperadas
   if "messages" in st.session_state and st.session_state.messages:
       ultima_msg = st.session_state.messages[-1]
       fontes = ultima_msg.get("fontes", [])
       if fontes:
           similaridades = [f["similaridade"] for f in fontes]
           media_sim = sum(similaridades) / len(similaridades)
           
           if media_sim >= 0.75:
               status = "Alta"
               cor = "green"
           elif media_sim >= 0.50:
               status = "Media"
               cor = "orange"
           else:
               status = "Baixa"
               cor = "red"
           
           with st.sidebar:
               st.markdown(f"**Confianca da Ultima Resposta:** :{cor}[{status} ({media_sim:.1%})]")
   ```
