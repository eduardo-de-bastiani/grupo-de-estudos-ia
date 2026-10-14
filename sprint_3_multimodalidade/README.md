# Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant

**Periodo:** 14/10 a 23/10/2026 | **Horario:** 14:00 as 17:00  
**Carga horaria da sprint:** 8 encontros de 180 minutos, totalizando 24 horas presenciais  
**Parceiros:** Navi Hub (Tecnopuc) e DataLakers  
**Publico:** 15 alunos de graduacao em Ciencias da Computacao e Engenharia de Software (PUCRS)  
**Formato:** Presencial autonomo e colaborativo, com roteiros diarios autodirigidos e mentoria tecnica  

Boas-vindas a Sprint 3 do Grupo de Estudos em Inteligencia Artificial Generativa! Esta e a sprint culminante da nossa jornada de 90 horas. Na Sprint 1, ensinamos o modelo a ler e pesquisar documentos textuais com RAG. Na Sprint 2, capacitamos o modelo a raciocinar e agir no mundo fisico e corporativo com ferramentas e servidores MCP. Agora, na Sprint 3, expandimos radicalmente os sentidos da IA: vamos dar olhos (Visao Computacional com Gemini 3.8 Flash) e ouvidos (Speech-to-Text local com Whisper) ao nosso assistente, integrando tudo em um produto completo de ponta a ponta: o **OmniAssistant**.

O calendario oficial desta sprint contempla 8 encontros intensivos de 180 minutos cada, iniciando na quarta-feira (14/10) apos o feriado de 12/10 e a preparacao do ambiente em 13/10.

---

## 1. Objetivos da Sprint

Ao longo destes 8 dias, os desenvolvedores dominam as competencias mais exigidas e sofisticadas da engenharia de IA moderna:

1. **Visao Computacional de Fronteira:** Ingerir imagens via bytes (`types.Part.from_bytes`) e em memoria via Pillow (PIL), decodificar diagramas de arquitetura, extrair tabelas e coordenadas espaciais de Bounding Boxes (`[ymin, xmin, ymax, xmax]`), aplicando tecnicas rigorosas de Grounding Visual para erradicar alucinacoes.
2. **Reconhecimento de Fala Local (Speech-to-Text):** Executar o modelo Whisper (`tiny`) 100% gratuito e local na CPU do proprio notebook, extraindo transcricoes com marcas de tempo (timestamps) milimetricas e medindo a latencia de processamento (Real-Time Factor).
3. **Avaliacao Sistematica de Modelos (LLM Evals):** Compreender por que testes unitarios classicos falham com linguagem natural, dominar o paradigma LLM-as-a-Judge com contratos tipados em Pydantic e distinguir com precisao cirurgica Groundedness (fundamentacao na evidencia) de Precisao Factual.
4. **Arquitetura Modular de Produto:** Projetar e organizar um repositorio limpo de engenharia de software (`src/core/`, `src/vision/`, `src/audio/`, `src/tools/`), estabelecendo contratos Pydantic rigidos de entrada e saida.
5. **Orquestracao Agêntica Multimodal:** Construir o loop de raciocinio em que a IA recebe o que viu na foto e o que ouviu no audio para disparar chamadas de funcoes (Function Calling) contra bancos de dados relacionais locais (SQLite), com guardrails de seguranca contra SQL Injection.
6. **Interface de Usuario e Observabilidade:** Desenvolver uma aplicacao web visual elegante e fluida com Streamlit (`app.py`), incorporando upload de arquivos, players de audio, historico de chat transparente e painel de explicabilidade (XAI) com latencia e consumo de tokens.
7. **Demonstracao de Alto Impacto (Demo Day):** Conduzir uma apresentacao profissional de 15 minutos com live demo para os lideres da DataLakers e realizar uma grande retrospectiva geral das 90 horas de formacao.

### Dinamica de Trabalho e Formacao das Squads

- **Semana 1 (Dias 21 a 23) - Fundamentacao Tecnica em Duplas:**  
  Foco no dominio individual e em pares das ferramentas basicas. Os alunos trabalham em duplas colaborativas (alternando piloto e copiloto no teclado a cada bloco), gerando scripts de experimentacao nas pastas `dia_21/`, `dia_22/` e `dia_23/`. No final do Dia 23, ocorre a formacao oficial das **5 squads multidisciplinares (trios fixos)**.
- **Semana 2 (Dias 24 a 28) - Desenvolvimento de Produto em Squads:**  
  Os trios assumem a responsabilidade integral pelo repositorio do **OmniAssistant**. A construcao e cumulativa: arquitetura no Dia 24, ingestao no Dia 25, orquestracao no Dia 26, interface e ensaio no Dia 27 e apresentacao oficial no Dia 28.

---

## 2. Calendario e Navegacao Diaria

| Dia | Data | Fase | Titulo do Encontro | Foco Principal |
| :---: | :---: | :--- | :--- | :--- |
| 21 | 14/10/2026 (Qua) | Semana 1: fundamentos em duplas | [Fundamentos de Visao Multimodal com Gemini](dia_21_visao_multimodal_gemini.md) | Imagens em bytes e PIL, diagramas tecnicos, OCR estruturado e grounding visual. Abertura da sprint com inicio direto as 14:00 (sem Daily Standup). |
| 22 | 15/10/2026 (Qui) | Semana 1: fundamentos em duplas | [Audio e Speech-to-Text Local com Whisper](dia_22_audio_whisper_local.md) | Transcricao local na CPU, timestamps de frases, latencia RTF e pipeline de audio para acao. |
| 23 | 16/10/2026 (Sex) | Semana 1: fundamentos em duplas | [Avaliacao de LLMs e Formacao dos Novos Trios](dia_23_avaliacao_llms_formacao_trios.md) | Paradigma LLM-as-a-Judge, Groundedness vs Precisao Factual, seguranca e formacao oficial dos 5 trios. |
| 24 | 19/10/2026 (Seg) | Semana 2: projeto em trios | [Kickoff do OmniAssistant, Arquitetura e Setup Git](dia_24_kickoff_omniassistant_arquitetura.md) | Escopo de negocio da squad, setup modular do repositorio, contratos Pydantic e smoke test integrador. |
| 25 | 20/10/2026 (Ter) | Semana 2: projeto em trios | [Pipeline Unificado de Ingestao Multimodal](dia_25_ingestao_multimodal.md) | Modulos de visao e audio com lazy loading, contratos unificados e deteccao de conflitos entre midias. |
| 26 | 21/10/2026 (Qua) | Semana 2: projeto em trios | [Orquestracao de Ferramentas e Raciocinio Multimodal](dia_26_orquestracao_ferramentas_multimodais.md) | Function Calling agêntico disparado por fotos e audio, consultas SQLite e guardrails de seguranca SQL. |
| 27 | 22/10/2026 (Qui) | Semana 2: projeto em trios | [Interface Streamlit, Telemetria e Ensaio do Pitch](dia_27_streamlit_telemetria_pitch.md) | Uploads drag-and-drop, player de audio, chat, painel XAI de auditoria e ensaio cronometrado de 10 min. |
| 28 | 23/10/2026 (Sex) | Final Demo Day em trios | [Final Demo Day e Retrospectiva Geral do Programa](dia_28_demo_day_retrospectiva_geral.md) | 5 pitches de 15 min diante da banca DataLakers, votacao popular, quiz final e retrospectiva das 90h. |

---

## 3. O Projeto da Sprint: OmniAssistant

### O Cenario de Negocio do Mundo Real

Na rotina de empresas e consultorias analiticas (como a DataLakers), dados operacionais chegam de forma caotica: o usuario envia um print de tela com erro ou grafico, manda um audio de 15 segundos no WhatsApp explicando o problema e o sistema precisa cruzar essas evidencias com informacoes armazenadas em um banco relacional corporativo. Fazer isso manualmente gera lentidao, retrabalho e erros graves.

O **OmniAssistant** nasce para resolver exatamente essa dor: ele recebe entradas heterogeneas (imagem + audio + texto), normaliza os dados com contratos tipados, aciona ferramentas computacionais de forma autonoma e gera uma resposta explicavel, indicando exatamente onde cada afirmacao foi comprovada.

### Arquitetura Modular de Referencia

Cada squad desenvolve seu produto seguindo esta estrutura desacoplada em `src/`:

| Camada | Modulo no Repositorio do Trio | Responsabilidade Tecnica |
| :--- | :--- | :--- |
| Configuracao e Contratos | `src/core/config.py` e `src/core/contracts.py` | Variaveis de ambiente (`.env`) e contratos Pydantic compartilhados (`Entrada`, `Segmento`, `Evidencia`). |
| Ingestao de Dados | `src/core/ingestion.py` | Despachante unificado de midia com carregamento sob demanda (lazy loading) e deteccao de divergencias. |
| Percepcao Visual | `src/vision/processor.py` | Validacao de imagens via Pillow e extracao semantica com `gemini-3.8-flash`. |
| Percepcao Acustica | `src/audio/processor.py` | Transcricao de voz com Whisper local na CPU, cache de modelo e preservacao de timestamps. |
| Ferramentas e Dados | `src/tools/local.py` | Queries SQLite parametrizadas, funcoes analiticas e protecao rigorosa contra SQL Injection. |
| Orquestracao Agêntica | `src/core/agent.py` | Loop de Function Calling nativo com limites de turnos, memoria e auditoria de ferramentas. |
| Interface e Visualizacao | `app.py` | Aplicacao Streamlit interativa com previews de imagem, player de audio, chat e telemetria XAI. |
| Armazenamento Local | `data/` | Banco de dados SQLite de demonstracao e amostras de midia sem segredos versionados. |

A integracao e progressiva e sustentavel: a arquitetura e validada no Dia 24 com um Smoke Test, os modulos de percepcao sao acoplados no Dia 25, o cerebro agêntico assume o comando no Dia 26 e a interface Streamlit da vida ao produto no Dia 27.

---

## 4. Premissas Tecnicas, Gratuidade e Preparacao de Ambiente

Garantir 100% de gratuidade e execucao local estavel e um compromisso fundamental desta sprint:

| Recurso / Ferramenta | Papel na Arquitetura | Condicoes de Execucao |
| :--- | :--- | :--- |
| Python 3.11+ | Runtime principal da aplicacao | Ambiente virtual isolado `.venv` na maquina do estudante. |
| `google-genai` | SDK Python oficial do Google | `from google import genai` consumindo a API gratuita do Gemini. |
| `gemini-3.8-flash` | Modelo de fronteira multimodal | Utilizado via API remota sob a faixa gratuita oficial do Google AI Studio. |
| `openai-whisper` | Speech-to-Text de pesos abertos | Execucao 100% local na CPU (`device="cpu"`, `fp16=False`), sem chamadas pagas de nuvem. |
| `sqlite3` | Banco de dados relacional local | Biblioteca padrao nativa do Python, sem necessidade de servidores externos. |
| Pydantic v2 | Validacao de dados e contratos | Validacao estrita em tempo de execucao e geracao de schemas tipados. |
| Streamlit | Frontend e interface grafica | Servidor web local acessivel via navegador em `localhost:8501`. |
| FFmpeg | Decodificador de audio para Whisper | Utilitario de sistema gratuito para processamento de arquivos de som. |

### Checklist de Preparacao (Antes das 14:00 do Primeiro Dia)

A preparacao do ambiente deve estar concluida com antecedencia para preservar integralmente os 180 minutos de cada encontro presencial:

1. Criar e ativar um ambiente virtual isolado `.venv` com Python 3.11+ no seu terminal.
2. Instalar as dependencias oficiais da sprint:
   ```bash
   python -m pip install google-genai pydantic python-dotenv pillow openai-whisper streamlit
   ```
3. Instalar o executavel `ffmpeg` no sistema operacional (obrigatorio para decodificacao de audio no Whisper):
   - Linux (Ubuntu/Debian): `sudo apt update && sudo apt install -y ffmpeg`
   - macOS (Homebrew): `brew install ffmpeg`
   - Windows (PowerShell): `winget install Gyan.FFmpeg`
4. O modelo Whisper `tiny` baixa seus pesos (~75 MB) automaticamente na primeira execucao dentro do ambiente presencial do Navi Hub (que conta com conexao de alta velocidade).
5. Geracao de midia autonoma: todas as fotos, prints e gravacoes de audio de teste sao gerados pelos proprios estudantes durante os laboratorios, garantindo autonomia e dados reais.
6. Configurar sua chave de API gratuita `GEMINI_API_KEY` em um arquivo `.env` na raiz, garantindo que o `.env` esteja listado no `.gitignore`.
7. Confirmar que a pasta `quizzes/` com os arquivos `quiz.css` e `quiz.js` esta disponivel localmente para abrir os quizzes e atividades no navegador mesmo sem internet.

---

## 5. Dinamica Pedagogica e Ritmo dos Encontros

Cada encontro presencial possui uma carga horaria exata e contínua de 180 minutos (3 horas), cuidadosamente balanceada entre teoria pragmatica, experimentacao em sandboxes interativos e codificacao real.

### Ritmo Regular dos Encontros (Dias 22 a 27)

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup por dupla ou trio: reflexao sobre "O que mais gostei" e "Minha maior dificuldade". |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura padronizada de referencia, tutoriais ilustrados e jogos web/playgrounds interativos. |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio Pratico 1: Implementacao guiada com scaffolds e contratos Pydantic. |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio Pratico 2: Expansao tecnica, integracao de componentes e testes unitarios. |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e networking entre as squads. |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico Colaborativo: Resolucao de casos reais de negocio e dinamicas de squad. |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia, benchmarks de performance ou guardrails de seguranca. |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub (Git Sync) com mensagens convencionais de commit. |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa offline em HTML direto no navegador. |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario diario de autoavaliacao, feedback e reflexao metodologica. |

**Soma Exata:** 5 + 15 + 30 + 40 + 15 + 30 + 10 + 10 + 10 + 15 = 180 minutos.

### Excecoes Estruturadas do Cronograma

- **Dia 21 (Abertura da Sprint):** Nao ha Daily Standup. O encontro comeca pontualmente as 14:00 com 20 minutos dedicados a abertura da sprint e a leitura padronizada de visao. Os Laboratorios 1 e 2 tem 35 minutos cada (14:20 - 14:55 e 14:55 - 15:30). O restante da tarde segue o cronograma padrao. Total: 180 minutos.
- **Dia 28 (Final Demo Day e Retrospectiva Geral):** Cronograma exclusivo de encerramento: Abertura (5 min), Boas-vindas a lideranca (10 min), 5 Pitches de 15 minutos cronometrados no telao (75 min), Coffee Break comemorativo (15 min), Votacao popular e destaques (15 min), Quiz final (10 min), Retrospectiva Geral do Programa no quadro branco (35 min), Encerramento oficial (5 min) e Formulario final (10 min). Total: 180 minutos.

A retrospectiva do Dia 28 revisita a trajetoria completa das 90 horas nominalmente declaradas no programa, registrando que os encontros presenciais documentados somam 84 horas (`30h na Sprint 1 + 30h na Sprint 2 + 24h na Sprint 3`), mantendo a precisao e transparencia pedagogica.

---

## 6. Materiais Interativos de Apoio e Autoavaliacao

Para garantir aprendizagem ativa e retencao duradoura, cada dia conta com um Quiz de multipla escolha e uma Atividade Interativa com desafios de depuracao de bugs, sandboxes de validacao, ordenacao de etapas e classificacao conceitual. Todos funcionam 100% offline via navegador:

| Dia | Quiz Interativo Offline | Atividade Interativa Offline | Formulario Externo Reservado |
| :---: | :--- | :--- | :--- |
| 21 | [Quiz do Dia 21](quizzes/quiz_dia_21.html) | [Atividade do Dia 21](quizzes/atividade_dia_21.html) | [Abertura da sprint e feedback](https://docs.google.com/forms/d/e/1FAIpQLSdiQyM-EcgO1MBsaaNpxcOS0BNjvIdiT1BZGmVnYeHCh3k50g/viewform) |
| 22 | [Quiz do Dia 22](quizzes/quiz_dia_22.html) | [Atividade do Dia 22](quizzes/atividade_dia_22.html) | [Autoavaliacao diaria](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 23 | [Quiz do Dia 23](quizzes/quiz_dia_23.html) | [Atividade do Dia 23](quizzes/atividade_dia_23.html) | [Autoavaliacao e fechamento da Semana 1](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 24 | [Quiz do Dia 24](quizzes/quiz_dia_24.html) | [Atividade do Dia 24](quizzes/atividade_dia_24.html) | [Autoavaliacao diaria](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 25 | [Quiz do Dia 25](quizzes/quiz_dia_25.html) | [Atividade do Dia 25](quizzes/atividade_dia_25.html) | [Autoavaliacao diaria](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 26 | [Quiz do Dia 26](quizzes/quiz_dia_26.html) | [Atividade do Dia 26](quizzes/atividade_dia_26.html) | [Autoavaliacao diaria](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 27 | [Quiz do Dia 27](quizzes/quiz_dia_27.html) | [Atividade do Dia 27](quizzes/atividade_dia_27.html) | [Autoavaliacao diaria e preparo do pitch](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform) |
| 28 | [Quiz Final do Dia 28](quizzes/quiz_dia_28.html) | [Atividade Final do Dia 28](quizzes/atividade_dia_28.html) | [Avaliacao final do programa completo](https://docs.google.com/forms/d/e/1FAIpQLSd5I5kPuuOmufuUmhSgY1khnjESNLWRdYCihhrTkFe7efuBMw/viewform) |

> A especificacao completa das perguntas, escalas e instrucoes para geracao dos formularios no Google Forms estao disponiveis em [formularios/README.md](formularios/README.md).

---

## 7. Criterios de Entrega do Produto Final

Para ser aprovado com distincao no Final Demo Day da DataLakers, o repositorio do OmniAssistant de cada squad deve cumprir os seguintes criterios de qualidade:

1. **Execucao Funcional e Reprodutivel:** Instrucoes claras no README do trio para subir a aplicacao em um comando (`streamlit run app.py`).
2. **Entrada Multimodal Integrada:** Capacidade de aceitar pelo menos uma imagem (print ou foto) e um audio gravado em conjunto com a solicitacao do usuario.
3. **Uso Efetivo de Ferramentas:** Demonstracao de Function Calling nativo consultando o banco SQLite local com filtros seguros.
4. **Transparencia e XAI:** Exibicao na tela dos passos tomados pela IA (quais ferramentas foram acionadas, argumentos enviados e latencia medida).
5. **Resiliencia Comprovada:** Demonstracao controlada de como a aplicacao reage com elegancia diante de uma entrada corrompida ou audio sem fala.
6. **Participacao Equilibrada:** Apresentacao articulada de 15 minutos com participacao ativa dos tres integrantes da squad diante da banca avaliadora.

---

## 8. Navegacao do Programa Completo

- [Visao Geral do Programa de 90 Horas](../README.md)
- [Sprint 1: Fundamentos de GenAI e RAG Local](../sprint_1_fundamentos_rag/README.md)
- [Sprint 2: Agentes Autonomos, Function Calling e MCP](../sprint_2_agentes/README.md)
- [Sprint 3: Multimodalidade e OmniAssistant](README.md)
