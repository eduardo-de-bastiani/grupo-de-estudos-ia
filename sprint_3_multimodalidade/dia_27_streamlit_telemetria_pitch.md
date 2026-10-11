# Dia 27 (22/10/2026 - Quinta-feira)
# Interface Streamlit, Telemetria em Tempo Real e Ensaio Geral do Pitch

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 2: Desenvolvimento Cumulativo do OmniAssistant em Trios  

Vespera do grande dia! Amanha a lideranca tecnica e gestores da DataLakers estarao presentes no Navi Hub para avaliar as entregas da Sprint 3. Hoje e o dia de colocar o "rosto" no OmniAssistant: construir uma aplicacao web visual elegante e interativa com Streamlit (`app.py`). O usuario podera arrastar uma foto ou print, reproduzir um audio gravado com player nativo, ver a transcricao na tela, conversar por chat e acompanhar um painel lateral de explicabilidade (XAI) exibindo exatamente quais ferramentas foram acionadas. Alem disso, os ultimos 10 minutos do desafio serao dedicados ao ensaio cronometrado do pitch da sua squad!

Dinamica de Squad: Hoje os 3 integrantes trabalham juntos na lapidacao da UI, no polimento visual e na sincronizacao da apresentacao para garantir que a demonstracao ao vivo de amanha seja impecavel.

---

## 1. Objetivos do Encontro

1. Construir a interface grafica do OmniAssistant em `app.py` utilizando Streamlit (`st.file_uploader`, `st.image`, `st.audio` e `st.chat_message`).
2. Gerenciar o estado da aplicacao com `st.session_state`, preservando o historico da conversa e evitando reexecucoes desnecessarias de Whisper ou Gemini ao interagir na tela.
3. Conectar a interface diretamente ao pipeline de ingestao (`ingestion.py`) e ao orquestrador de ferramentas (`agent.py`).
4. Criar um painel de explicabilidade e telemetria: exibir as ferramentas disparadas, o tempo de resposta em milissegundos e o consumo de tokens.
5. Implementar tratamento de erros visual amigavel (st.warning / st.error) com botoes de limpeza e retry.
6. Realizar o ensaio geral cronometrado do pitch de 10 minutos dentro do trio, preparando a squad para o Demo Day.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario diario.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup da Squad: alinhamento das metas da UI e do pitch |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura Padronizada e Galeria de Componentes Streamlit |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio 1: Construcao da Interface Multimodal (`app.py`) |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio 2: Painel de Telemetria e Explicabilidade de Tools |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: Integracao Final e Ensaio Cronometrado do Pitch |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Fallback de Interface e Replay |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Squad (Release Candidate v1.0) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario Diario de Auto-Avaliacao e Preparacao do Demo Day |

---

## 3. Daily Standup de Abertura (14:00 - 14:05)

Reuniao de 5 minutos da squad em pe:
1. O que mais gostei na integracao agêntica e Function Calling com SQLite de ontem.
2. Minha maior dificuldade ou bug enfrentado na orquestracao.
3. Alinhem as metas de UI para o Streamlit e a divisao dos 10 minutos de ensaio do pitch.
Iniciem a exploracao de UI pontualmente as 14:05.

---

## 4. Bloco 1: Leitura Padronizada de Referencia e Galeria Streamlit (14:05 - 14:20)

Tempo dedicado: 15 minutos (leitura individual e experimentacao na squad).

Por que Explicabilidade de IA (XAI) e Design de Confianca vendem projetos:
Na lideranca tecnica e na diretoria de empresas como a DataLakers, ninguem confia em caixas-pretas que simplesmente cospem respostas sem dizer de onde vieram os dados. Uma interface de IA de alto nivel precisa ser transparente: quando o usuario faz uma pergunta baseada em uma foto de servidor e um audio, a tela deve mostrar com clareza:
1. A imagem enviada (preview nitido).
2. O audio com player nativo e o texto transcrito pelo Whisper.
3. A resposta conclusiva em linguagem natural.
4. Um painel expansivel de auditoria revelando: *"A ferramenta consultar_item('A101') foi chamada em 140ms e retornou R$ 25,00"*.
Isso transforma uma resposta comum em uma decisao confiavel e auditavel!

O que voce vai encontrar nos links recomendados:
- Na Documentacao de Chat do Streamlit: aprenda a usar `st.chat_message` e como manter mensagens vivas na tela com `st.session_state`.
- No Guia do Y Combinator: tecnicas de ouro para apresentacoes tecnicas curtas que encantam e mostram produto funcional ao vivo sem rodeios.

Links Educacionais Recomendados:
- [Streamlit: Chat Elements & Conversational Apps](https://docs.streamlit.io/develop/tutorials/chat-and-llm-apps/build-conversational-apps): guia essencial para interfaces reativas em Python.
- [Y Combinator: How to Demo Software in a Technical Pitch](https://www.ycombinator.com/library): manual de como fazer demos ao vivo impecaveis em menos de 10 minutos.

Jogos Web e Sandboxes Interativos para Testar Agora (2 a 3 min):
- [Streamlit Components Hub](https://components.streamlit.app/): explore exemplos interativos de cards, badges e visualizadores de metricas.
- [Exemplo Interativo Oficial de Chat Input](https://doc-chat-input.streamlit.app/): veja o comportamento reativo de inputs de chat no navegador.

---

## 5. Bloco 2: Laboratorio 1 - Construcao da Interface Multimodal (`app.py`) (14:20 - 14:50)

Tempo dedicado: 30 minutos | Formato: Trios.

Sua Missao na Squad:
Criar `app.py` na raiz do repositorio. A aplicacao deve oferecer upload de imagens e audios, renderizar previews visuais e de som, e conectar o input de chat ao despachante de ingestao e ao agente.

Scaffold de `app.py` (Parte 1 - Estrutura Principal):

```python
import os
from pathlib import Path
from tempfile import TemporaryDirectory
import streamlit as st
from src.core.contracts import EntradaUsuario, EvidenciaMultimodal
from src.core.ingestion import despachar_ingestao
from src.core.agent import executar_agente
from src.tools.local import inicializar_banco

# Configuracao da Pagina
st.set_page_config(page_title="OmniAssistant", layout="wide", initial_sidebar_state="expanded")

# Inicializa o banco SQLite local
inicializar_banco()

# Inicializacao do Estado da Sessao (Session State)
if "historico_mensagens" not in st.session_state:
    st.session_state["historico_mensagens"] = []
if "evidencias_ativas" not in st.session_state:
    st.session_state["evidencias_ativas"] = []

st.title("OmniAssistant: Assistente Multimodal Inteligente")
st.caption("Solucao desenvolvida pela Squad para analise integrada de imagens, audios de comando e consultas corporativas.")

# Barra Lateral: Uploads e Configuracoes
with st.sidebar:
    st.header("Entradas Multimodais")
    upload_img = st.file_uploader("Upload de Imagem (Print / Diagrama)", type=["png", "jpg", "jpeg"])
    upload_audio = st.file_uploader("Upload de Audio de Comando", type=["wav", "mp3", "ogg"])
    
    if st.button("Limpar Sessao e Cache"):
        st.session_state["historico_mensagens"].clear()
        st.session_state["evidencias_ativas"].clear()
        st.rerun()

# Processamento de Uploads com Cache
novas_evidencias = []
col_preview1, col_preview2 = st.columns(2)

if upload_img:
    with col_preview1:
        st.subheader("Preview da Imagem")
        st.image(upload_img, use_container_width=True)
        # Salva em arquivo temporario para ingestao
        with TemporaryDirectory() as tmp_dir:
            caminho_tmp = Path(tmp_dir) / upload_img.name
            caminho_tmp.write_bytes(upload_img.getvalue())
            try:
                ev_img = despachar_ingestao(EntradaUsuario(tipo="imagem", caminho_arquivo=caminho_tmp))
                novas_evidencias.append(ev_img)
            except Exception as e:
                st.error(f"Erro ao processar imagem: {e}")

if upload_audio:
    with col_preview2:
        st.subheader("Preview do Audio")
        st.audio(upload_audio)
        with TemporaryDirectory() as tmp_dir:
            caminho_tmp = Path(tmp_dir) / upload_audio.name
            caminho_tmp.write_bytes(upload_audio.getvalue())
            try:
                ev_audio = despachar_ingestao(EntradaUsuario(tipo="audio", caminho_arquivo=caminho_tmp))
                novas_evidencias.append(ev_audio)
                with st.expander("Transcricao Whisper"):
                    st.write(ev_audio.resumo_informacao)
            except Exception as e:
                st.error(f"Erro ao processar audio: {e}")

st.session_state["evidencias_ativas"] = novas_evidencias

# Exibicao do Historico de Chat
for msg in st.session_state["historico_mensagens"]:
    with st.chat_message(msg["papel"]):
        st.write(msg["conteudo"])

# Campo de Entrada de Mensagem
comando_chat = st.chat_input("Digite sua pergunta sobre as evidencias ou peca uma acao...")
if comando_chat:
    st.session_state["historico_mensagens"].append({"papel": "user", "conteudo": comando_chat})
    
    with st.spinner("OmniAssistant raciocinando e consultando ferramentas..."):
        try:
            resultado = executar_agente(comando_chat, st.session_state["evidencias_ativas"])
            st.session_state["historico_mensagens"].append({
                "papel": "assistant",
                "conteudo": resultado["resposta"],
                "telemetria": resultado
            })
        except Exception as e:
            st.session_state["historico_mensagens"].append({
                "papel": "assistant",
                "conteudo": f"Falha na execucao: {type(e).__name__} - {e}"
            })
    st.rerun()
```

Como testar:
```bash
streamlit run app.py
```

Criterio de Sucesso da Squad: A aplicacao abre no navegador em `localhost:8501`, permite subir imagens e audios com preview e responde perguntas no chat preservando o historico.

---

## 6. Bloco 3: Laboratorio 2 - Painel de Telemetria e Explicabilidade (14:50 - 15:30)

Tempo dedicado: 40 minutos | Formato: Trios (inverter o teclado!).

Sua Missao na Squad:
Enriquecer a interface adicionando cards expansíveis abaixo de cada resposta do assistente, revelando a telemetria completa:
- Tempo de resposta total em milissegundos;
- Contagem aproximada de tokens;
- Lista de chamadas de ferramentas disparadas com seus argumentos e resultados.

Atualizacao no trecho de exibicao do chat em `app.py`:
Substitua o loop de mensagens por:

```python
# Renderizacao Enriquecida com Painel XAI
for msg in st.session_state["historico_mensagens"]:
    with st.chat_message(msg["papel"]):
        st.write(msg["conteudo"])
        
        # Se for mensagem do assistente e contiver telemetria, exibe os detalhes
        telemetria = msg.get("telemetria")
        if telemetria:
            tempo_ms = telemetria.get("tempo_total_ms", 0)
            tokens = telemetria.get("tokens_estimados", "N/A")
            turnos = telemetria.get("total_turnos", 1)
            
            st.caption(f"Tempo de Execucao: {tempo_ms}ms | Turnos Agênticos: {turnos} | Tokens: {tokens}")
            
            rastro = telemetria.get("rastro_ferramentas", [])
            if rastro:
                with st.expander(f"Auditoria de Ferramentas ({len(rastro)} acoes executadas)"):
                    for idx, tool in enumerate(rastro, start=1):
                        st.markdown(f"**{idx}. Ferramenta:** `{tool['ferramenta']}` ({tool.get('duracao_ms', 0)}ms)")
                        st.json({"argumentos": tool["argumentos"], "resultado_banco": tool["resultado"]})
```

Como testar:
Rode `streamlit run app.py`, envie uma pergunta que exija ferramentas (ex: *"Qual o total de 5 unidades do item A101 visivel no print?"*) e abra o expander de auditoria.

Criterio de Sucesso: O expander abre e mostra o JSON com os argumentos `{"codigo": "A101"}` e o retorno do SQLite em tempo real.

---

## 7. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Cafe, hidratacao e descanso para a mente. Na volta, faremos a rodada de ensaio cronometrado do pitch!

---

## 8. Bloco 4: Integracao Final (15:45 - 16:05) e Ensaio do Pitch (16:05 - 16:15)

Tempo dedicado total: 30 minutos.

### Parte A: Lapidacao Visual e Teste de Demonstracao (20 min)
Testem a aplicacao com 2 conjuntos de teste bem definidos:
1. **Caso Perfeito (Happy Path):** Uma imagem nitida com o print do problema + um audio com instrucao clara. Validem que a resposta esta redonda.
2. **Caso de Resiliencia (Edge Case):** Uma foto com rotulo cortado ou um audio com ruido. Demonstrem como a interface avisa educadamente o usuario sem travar a tela.

### Parte B: Ensaio Cronometrado do Pitch (16:05 - 16:15 - 10 min cravados!)
Coloquem o cronometro do celular na mesa e ensaiem a apresentacao de amanha:
- **Minutos 0 a 2 (Problema e Dominio):** Integrante 1 contextualiza a dor da industria e por que o OmniAssistant foi criado para a squad.
- **Minutos 2 a 7 (Live Demo na Interface):** Integrante 2 compartilha a tela no Streamlit, faz upload da imagem e do audio, clica em processar, mostra a resposta ao vivo e abre o painel de explicabilidade de ferramentas.
- **Minutos 7 a 10 (Arquitetura, Licoes e Q&A):** Integrante 3 explica a modularidade do codigo em Python, o uso do Whisper local com custo zero e responde a potenciais duvidas da banca.

---

## 9. Bloco 5: Testes de Resiliencia - Fallback contra Falhas ao Vivo (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Trios.

E se a internet oscilar ou o usuario enviar um arquivo vazio no meio da demonstracao ao vivo? A interface deve capturar a excecao e mostrar um `st.warning` claro sem reiniciar o processo Python.

Crie `tests/test_resiliencia_ui.py`:

```python
from src.core.contracts import EntradaUsuario
from src.core.ingestion import despachar_ingestao

def testar_captura_de_erros_na_ui():
    # Valida que entradas inconsistentes disparam ValueError tratavel
    try:
        despachar_ingestao(EntradaUsuario(tipo="texto", texto_comando="   "))
        print("FALHA: Entrada vazia nao levantou erro!")
    except ValueError as e:
        print("PASS: Erro capturado perfeitamente na borda:", str(e))

if __name__ == "__main__":
    testar_captura_de_erros_na_ui()
```

Criterio de Sucesso: O teste exibe `PASS`, garantindo que a squad tenha seguranca de codigo para o Demo Day.

---

## 10. Bloco 6: Sincronizacao no GitHub da Squad (Release Candidate v1.0) (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Salvar a versao homologada do OmniAssistant:
```bash
git status
git add app.py src/ tests/ README.md
git commit -m "feat(omni-v1.0): interface web streamlit, explicabilidade xai, telemetria e ensaio de pitch concluido"
git push origin main
```
Confirmem que o README do trio esta atualizado com instrucoes claras de como rodar o app:
`streamlit run app.py`.

---

## 11. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no navegador: [Quiz do Dia 27](quizzes/quiz_dia_27.html)
   - Responda questoes sobre Streamlit session state, tecnicas de demonstracao ao vivo e explicabilidade (XAI).
2. Abra a atividade gamificada: [Atividade Interativa do Dia 27](quizzes/atividade_dia_27.html)
   - Resolva desafios interativos de fluxo de UI, tratamento de estado em reexecucoes e telemetria.

---

## 12. Bloco 8: Formulario Diario de Auto-Avaliacao e Preparacao (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 27](https://docs.google.com/forms/d/{FORM_ID_DIA_27}/viewform)

Pautas de hoje:
- Nivel de confianca da squad para a apresentacao de amanha no Demo Day.
- O que mais surpreendeu voce ao ver o OmniAssistant funcionando completo no Streamlit.
- Autoavaliacao da cooperacao e sintonia entre os integrantes do trio.

---

## 13. Checklist de Conclusao do Dia 27

- [ ] Daily Standup da squad realizada com definicao do ensaio.
- [ ] Leitura e exploracao na Galeria Streamlit concluidas.
- [ ] Interface visual `app.py` funcionando com upload de imagem e audio.
- [ ] Chat interativo preservando historico com `st.session_state`.
- [ ] Painel de telemetria e explicabilidade de ferramentas implementado.
- [ ] Ensaio geral de 10 minutos cronometrado realizado com sucesso no trio.
- [ ] Teste de resiliencia `test_resiliencia_ui.py` validado com `PASS`.
- [ ] Repositorio do trio com tag e commit de entrega v1.0 no GitHub.
- [ ] Quiz e Atividade Interativa do Dia 27 concluidos no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 14. Atividades Complementares (Para a Noite Anterior ao Demo Day)

1. Checklist de Vespera: Garanta que a bateria do notebook da apresentacao esteja carregada, que os arquivos de demonstracao estejam salvos na pasta `data/` e que a chave de API esteja configurada no `.env` local.
2. Descanso: Descansem a mente hoje a noite! O trabalho duro de engenharia ja foi feito. Amanha e o momento de celebrar e brilhar diante da banca da DataLakers e do Tecnopuc.

---
[Voltar ao README da Sprint 3](README.md)
