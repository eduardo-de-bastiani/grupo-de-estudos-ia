# 📅 Dia 20 (09/10 - Sexta-feira)
# 🏆 Demo Day da Sprint 2 & Pitch para a DataLakers

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Presença Especial:** Liderança Técnica e Gestores da DataLakers & Coordenação do Navi Hub  

---

## 🎯 1. Objetivos do Encontro
1. Realizar o **Demo Day Oficial da Sprint 2**, com os 5 trios apresentando seus produtos *DataOps Agent* funcionando ao vivo para colegas, coordenação do Navi Hub e liderança técnica da DataLakers.
2. Demonstrar o domínio prático autônomo dos conceitos de **Structured Outputs**, **Function Calling**, **Loops de Agentes (ReAct)**, **Model Context Protocol (MCP)** e **Guardrails de Segurança SQL**.
3. Exibir a rastreabilidade completa das chamadas de ferramentas e a execução de consultas em banco relacional local SQLite via interface web Streamlit.
4. Promover a celebração e reconhecimento mútuo entre pares através da **Votação Popular ("Destaques da Sprint 2")**.
5. Consolidar o domínio integral dos temas da Sprint 2 no **Quiz Final de Fixação** (`quizzes/quiz_dia_20.html`) e na **Atividade Interativa** de revisão (`quizzes/atividade_dia_20.html`).
6. Conduzir a **Retrospectiva Ágil** coletiva via **Learning Matrix no Quadro** (35 minutos), mapeando aprendizados técnicos e comportamentais da Sprint 2.
7. Conhecer a visão geral da **Sprint 3 (Multimodalidade & GenAI Aplicada)** no teaser de encerramento e preencher a avaliação final da Sprint.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:15   │ Abertura do Demo Day 2 & Boas-Vindas aos Convidados    │
│ 14:15 - 15:30   │ Apresentações dos 5 Trios (15 min por trio)            │
│ 15:30 - 15:45   │ Coffee Break & Descompressão                           │
│ 15:45 - 16:00   │ Votação Popular & Destaques da Sprint 2                │
│ 16:00 - 16:10   │ Quiz Final + Atividade Interativa (dia 20)             │
│ 16:10 - 16:45   │ Retrospectiva Ágil: Learning Matrix no Quadro (35 min) │
│ 16:45 - 16:50   │ Teaser da Sprint 3: Apresentação da Visão Geral        │
│ 16:50 - 17:00   │ Formulário Final de Avaliação da Sprint 2 (Forms)      │
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

## 🎤 3. Bloco 1: As Apresentações do Demo Day (14:15 - 15:30)

Cada um dos 5 trios terá **15 minutos rigorosamente cronometrados**:
* **10 minutos de Apresentação & Live Demo:**
  * Contexto do problema analítico e domínio da base SQLite escolhida.
  * Arquitetura técnica: servidor FastMCP local, transporte `stdio`, orquestração do loop ReAct e guardrails determinísticos de SQL.
  * Demonstração ao vivo na interface Streamlit:
    - Pergunta em linguagem natural respondida com dados e insights.
    - Exibição do painel de explicabilidade (ferramentas chamadas, SQL gerado e tempo de resposta).
    - Demonstração do teste de segurança: tentativa de query maliciosa/destrutiva barrada pelo guardrail ao vivo.
  * Desafios técnicos enfrentados e decisões de engenharia.
* **5 minutos de Perguntas & Respostas (Q&A):**
  * Perguntas dos colegas, da coordenação e dos convidados da DataLakers sobre a solução construída.

---

## ☕ 4. Coffee Break & Descompressão (15:30 - 15:45)

Momento de descontração, comemoração e conversas informais entre os estudantes, instrutores e convidados da DataLakers e Navi Hub após a conclusão de todas as apresentações.

---

## 🏆 5. Bloco 2: Votação Popular & Destaques da Sprint 2 (15:45 - 16:00)

Votação rápida e descontraída entre pares para celebrar o esforço e a evolução dos trios nas seguintes categorias:

### Categorias de Destaque:
1. 🛡️ **Guardião do Banco:** O sistema com os guardrails de SQL e tolerância a erros mais elegantes e impenetráveis.
2. 🔌 **Mestre do MCP:** A implementação de servidor MCP mais modular, limpa e bem documentada.
3. 🎨 **Melhor Rastreabilidade & UX:** A interface Streamlit com o painel de explicabilidade de ferramentas mais claro e intuitivo.
4. 🎤 **Melhor Storytelling Técnico:** O trio com a apresentação mais articulada, clara e com perfeita sintonia de equipe.

---

## 🧠 6. Bloco 3: Quiz Final & Atividade Interativa da Sprint 2 (16:00 - 16:10)

Antes de iniciar a retrospectiva, cada estudante abre no navegador o arquivo:
[`quizzes/quiz_dia_20.html`](quizzes/quiz_dia_20.html)

* **15 Perguntas Abrangentes:** O quiz revisa os tópicos fundamentais da Sprint 2 (Structured Outputs, Pydantic, Function Calling nativo no Gemini, Loops ReAct autônomos, Arquitetura MCP, FastMCP, SQLite e Guardrails de Segurança).
* **Feedback Instantâneo:** Cada resposta traz a justificativa conceitual e técnica.
* **Atividade Interativa de revisão:** em seguida, abram [`quizzes/atividade_dia_20.html`](quizzes/atividade_dia_20.html) e resolvam os 5 desafios (ligar conceitos, reconstruir a arquitetura, classificar o que é da Sprint 1 e da Sprint 2 e testar os limites do guardrail). **Divisão sugerida dos 10 minutos:** cerca de 7 minutos no quiz e 3 na atividade; quem terminar antes refaz os itens errados.

---

## 🔄 7. Bloco 4: Retrospectiva Ágil — Learning Matrix no Quadro (16:10 - 16:45)

Dinâmica coletiva de **35 minutos cronometrados** conduzida no quadro branco da sala para consolidar aprendizados e maturidade do grupo.

### 🖼️ Estrutura da Learning Matrix no Quadro:

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│  💻 APRENDIZADOS TÉCNICOS            │  🤝 APRENDIZADOS NÃO-TÉCNICOS        │
│     (Agentes, MCP, SQL, Guardrails)  │     (Trabalho em Trio, Resiliência)  │
├──────────────────────────────────────┼──────────────────────────────────────┤
│  🚧 PEDRAS NO SAPATO                 │  🚀 MUDANÇAS PARA A SPRINT 3         │
│     (Bugs, Desafios & Obstáculos)    │     (O que faremos diferente)        │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

1. **Minuto 0 a 5:** Reflexão individual e escrita de post-its (Hard Skills e Soft Skills).
2. **Minuto 5 a 15:** Alinhamento rápido e discussão dentro de cada trio.
3. **Minuto 15 a 35:** Fixação no quadro com apoio de um facilitador voluntário, agrupamento temático e debate aberto sobre o que funcionou e o que melhorar.

---

## 🔮 8. Bloco 5: Teaser da Sprint 3 — Visão Geral (16:45 - 16:50)

* **O Próximo Salto:** Na Sprint 1 dominamos a *leitura com RAG*; na Sprint 2 capacitamos os modelos para a *ação autônoma com ferramentas e MCP*. Na **Sprint 3**, entraremos no universo da **Multimodalidade & IA Generativa Aplicada** (visão computacional com imagens e diagramas técnicos, processamento de áudio/speech-to-text e soluções ponta a ponta integradas).
* **Continuidade da Jornada:** Apresentação dos tópicos principais e calendário da próxima sprint.

### 🌐 Recursos de Continuidade, Portfólio & Links para Explorar
* [Awesome Model Context Protocol (GitHub)](https://github.com/punkpeye/awesome-mcp-servers) - Diretório aberto com centenas de servidores MCP, extensões de clientes e implementações comunitárias.
* [Google AI Studio: Multimodal Quickstart & Vision](https://ai.google.dev/gemini-api/docs/multimodal-concepts) - Documentação oficial de preparação para a Sprint 3 (processamento conjunto de texto, imagens e áudio).
* [Simon Willison's Weblog: What's next for LLM Tool Use and MCP](https://simonwillison.net/tags/mcp/) - Ensaios críticos e tutoriais práticos sobre a evolução de agentes autônomos na engenharia de software.
* [LangGraph & Multi-Agent Workflows](https://langchain-ai.github.io/langgraph/) - Referência conceitual de como loops ReAct artesanais escalam para múltiplos agentes cooperativos em grafos cíclicos.

---

## 📝 9. Bloco 6: Formulário Final de Avaliação da Sprint 2 & Feedback (16:50 - 17:00)

> 📋 **Link do Formulário de Avaliação Final da Sprint 2:**  
> [Preencher Formulário do Google Forms - Fechamento Sprint 2](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão da Sprint 2:
- [x] Apresentações dos projetos *DataOps Agent* concluídas com sucesso no Demo Day 2.
- [x] Repositórios finais sincronizados com documentação completa no GitHub.
- [x] Votação popular e premiação simbólica de destaques realizada.
- [x] Quiz final de consolidação da Sprint 2 (`quizzes/quiz_dia_20.html`) concluído.
- [x] Atividade interativa de revisão (`quizzes/atividade_dia_20.html`) concluída.
- [x] Retrospectiva ágil da Sprint 2 realizada via Learning Matrix no quadro (35 min).
- [x] Teaser e introdução da Sprint 3 acompanhados.
- [x] Formulário final de avaliação da Sprint 2 preenchido.

---

## 🎁 Atividades Complementares

### 🎥 Vídeos Recomendados

1. 🎥 **Vídeo Principal:** [The Future of MCP (David Soria Parra, Anthropic, AI Engineer, YouTube)](https://www.youtube.com/watch?v=v3Fr2JR47KA). Palestra de um dos criadores do protocolo sobre a evolução do ecossistema; anotem 3 pontos que se conectam ao projeto de vocês e 1 tendência futura.
2. 🎥 **Visão de Engenharia de Software:** [The Future of AI Agents & Software Engineering (Andrej Karpathy, YouTube)](https://www.youtube.com/watch?v=zjkBMFhNj_g). Karpathy analisa como os modelos evoluem de "autocompletes" estáticos para agentes autônomos com loops de execução, memória e interação com ferramentas.
3. 🎥 **Evolução Arquitetural:** [From Prompt Engineering to Agent Architecture (Harrison Chase, Sequoia, YouTube)](https://www.youtube.com/watch?v=y3nBwFp06rA). O panorama completo de transição: de meros prompts zero-shot para arquiteturas completas com feedback e guardrails.

---

### 💻 Códigos & Exercícios Práticos Bônus

#### Exercício Bônus 1: Benchmark de Latência e Eficiência de Tokens
Medir a latência total, número de turnos e consumo de tokens por pergunta no *DataOps Agent*. Um agente de alta qualidade precisa ser rápido e econômico. Salve como `tests/benchmark_agente.py`.

```python
import asyncio
import statistics
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from src.agent.dataops_agent import DataOpsAgent  # noqa: E402

PERGUNTAS = [
    "Quantas tabelas existem no banco?",
    "Quantos clientes nao tem e-mail cadastrado?",
    "Qual a media de valor_total dos pedidos?",
    "Quantos pedidos cada cidade possui? Mostre as 3 maiores.",
]


class ContadorDeTokens:
    """Envolve client.aio.models para somar os tokens de cada chamada ao modelo."""

    def __init__(self, models):
        self._models = models
        self.tokens = 0
        self.chamadas = 0

    async def generate_content(self, **kwargs):
        response = await self._models.generate_content(**kwargs)
        self.chamadas += 1
        # TODO: some response.usage_metadata.total_token_count (se existir) em self.tokens
        return response


async def medir(pergunta: str) -> dict:
    async with DataOpsAgent() as agente:
        contador = ContadorDeTokens(agente.client.aio.models)
        agente.client.aio.models = contador
        inicio = time.perf_counter()
        saida = await agente.perguntar(pergunta)
        segundos = time.perf_counter() - inicio
        # TODO: retorne {"pergunta", "segundos", "chamadas_modelo", "ferramentas" (len do trace), "tokens", "sucesso"}
        #       onde "sucesso" e False se a resposta comecar com "Limite de turnos"
        ...


async def main() -> None:
    resultados = []
    for pergunta in PERGUNTAS:
        r = await medir(pergunta)
        resultados.append(r)
        print(f"{r['segundos']:6.2f}s | {r['chamadas_modelo']} turnos | {r['ferramentas']} tools | {r['tokens']:6} tokens | {r['pergunta']}")
    # TODO: imprima a media e o maximo de "segundos" e o total de tokens usando statistics.mean e max
    # TODO: sinalize com "ATENCAO" qualquer pergunta que passou de 15 s ou de 20000 tokens


if __name__ == "__main__":
    asyncio.run(main())
```

**Resultado esperado:** uma linha por pergunta, um resumo com média e pior caso e a identificação da pergunta mais cara para otimizações futuras.

#### Exercício Bônus 2: Publicação de Case Study de Portfólio (`docs/portfolio_case_study.md`)
Transforme o repositório do seu trio em um projeto de portfólio profissional para GitHub e LinkedIn. Crie `docs/portfolio_case_study.md` preenchendo a seguinte estrutura executiva:

```markdown
# Case Study: DataOps Agent — Auditor Autônomo de Bancos de Dados com MCP

## 📌 Contexto & Problema de Negócio
- Qual a dor resolvida? (Auditoria manual repetitiva de esquemas e anomalias de dados).
- Tecnologias: Python 3.11+, Google Gemini Flash, Model Context Protocol (MCP), SQLite, Streamlit.

## 🏗️ Arquitetura Técnica
(Insira o diagrama Mermaid gerado no Dia 16 demonstrando o fluxo Host -> FastMCP -> SQLite).

## 🛡️ Engenharia de Segurança & Guardrails
- Menor privilégio: conexão readonly e bloqueio determinístico de comandos `DROP`, `DELETE`, `UPDATE`.
- Tratamento de jailbreaks e tolerância a erros com auto-recuperação no loop ReAct.

## 📊 Métricas & Benchmarks
- Tempo médio de resposta por consulta (em segundos).
- Taxa de sucesso contra ataques adversariais (100% barrados).
```

**Critério de sucesso:** documento estruturado e pronto para compor o `README.md` principal do repositório individual de cada integrante do trio.

#### Exercício Bônus 3: Aquecimento para a Sprint 3 — Agente Multimodal (`src/agent/warmup_sprint3_multimodal.py`)
Na Sprint 3 entraremos no universo multimodal. Experimente enviar uma imagem (por exemplo, um print do gráfico do Streamlit salvo em disco) junto com uma instrução analítica para o `gemini-3.8-flash`. Salve como `src/agent/warmup_sprint3_multimodal.py`.

```python
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


def auditar_grafico_multimodal(caminho_imagem: str, pergunta: str) -> str:
    """Envia uma imagem de gráfico ou dashboard para o modelo analisar tendências visuais."""
    img_path = Path(caminho_imagem)
    if not img_path.exists():
        return f"Arquivo de imagem não encontrado: {caminho_imagem}"

    with open(img_path, "rb") as f:
        bytes_imagem = f.read()

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=[
            types.Part.from_bytes(data=bytes_imagem, mime_type="image/png"),
            f"Você é um analista visual de dados. {pergunta}",
        ],
    )
    return response.text


if __name__ == "__main__":
    print("Módulo de aquecimento para Sprint 3 pronto para execução!")
```

**Critério de sucesso:** o script conecta ao SDK `google-genai` e demonstra a capacidade nativa do modelo de receber imagens e texto no mesmo turno de inferência.

