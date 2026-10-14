# Dia 26 (21/10/2026 - Quarta-feira)
# Orquestracao de Ferramentas e Raciocinio Multimodal: O Cerebro em Acao

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial (Navi Hub / Tecnopuc)  
Presenca Especial: Gustavo (Mestrando no Centro de Inteligencia Artificial da PUCRS)  
Fase: Semana 2: Desenvolvimento Cumulativo do OmniAssistant em Trios  

Hoje alcancamos um dia de programacao especial e integracao maxima na nossa jornada! Das 14:00 as 15:00, recebemos o Gustavo, pesquisador de mestrado no Centro de IA da PUCRS, para uma palestra exclusiva sobre as fronteiras da inteligencia artificial generativa, raciocinio complexo e os desafios reais da pesquisa aplicada.

Logo em seguida, das 15:00 as 17:00, as squads entram em campo para conectar a percepcao multimodal ao raciocinio agentico com ferramentas reais. O OmniAssistant recebe o que ele VIU na imagem e o que ele OUVIU no audio e, se precisar de informacoes concretas, decide autonomamente consultar um banco de dados relacional local (SQLite) ou executar calculos matematicos com seguranca estrita. E o ciclo completo: **Percepcao -> Raciocinio -> Acao -> Resposta**!

Dinamica de Squad: Mantenham o rodizio no trio (Piloto, Copiloto e Arquiteto). Hoje finalizamos o motor agentico (`src/core/agent.py`) que deixara o produto pronto para receber a interface visual amanha.

---

## 1. Objetivos do Encontro

1. Assistir a palestra especial do Gustavo (Centro de IA da PUCRS), compreendendo o estado da arte de pesquisa em modelos de linguagem, multimodalidade e tool use.
2. Construir ferramentas deterministicas em Python conectadas a um banco local SQLite seguro (`src/tools/local.py`).
3. Configurar declaracoes de ferramentas via `google.genai.types.Tool` e `FunctionDeclaration` com schemas estritos em Pydantic.
4. Implementar o despachante seguro de ferramentas com protecao contra SQL Injection e operacoes de escrita nao autorizadas.
5. Construir o loop agentico artesanal em `src/core/agent.py` capaz de alimentar o Gemini com evidencias multimodais e responder as chamadas de funcao em multiplos turnos.
6. Executar o fluxo completo integrador (`tests/test_fluxo_completo.py`) e validar a resiliencia contra SQL Injection com testes automatizados.
7. Sincronizar o repositorio no GitHub (Git Sync v0.3), responder o Quiz e Atividade Interativa HTML e preencher o formulario diario de autoavaliacao.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 15:00 | 60 min | Bloco Especial | Palestra com Gustavo (Centro de IA da PUCRS) & Sessao de Q&A |
| 15:00 - 15:05 | 5 min | Abertura Pratica | Daily Standup da Squad: conexoes com a palestra e alinhamento do trio |
| 15:05 - 15:30 | 25 min | Bloco 1 | Laboratorio 1: Ferramentas Locais e Banco SQLite (`src/tools/local.py`) |
| 15:30 - 16:05 | 35 min | Bloco 2 | Laboratorio 2: O Orquestrador Multimodal e Loop de Function Calling (`src/core/agent.py`) |
| 16:05 - 16:15 | 10 min | Intervalo | Coffee Break e Networking |
| 16:15 - 16:35 | 20 min | Bloco 3 | Desafio Pratico de Ponta a Ponta & Guardrail SQL (`tests/test_fluxo_completo.py`) |
| 16:35 - 16:45 | 10 min | Bloco 4 | Sincronizacao no GitHub (Git Sync v0.3) e Quiz/Atividade HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 5 | Formulario Diario de Auto-Avaliacao e Feedback |

---

## 3. Palestra Especial: Pesquisa e Fronteiras em IA (14:00 - 15:00)

Tempo dedicado: 60 minutos (45 min de exposicao + 15 min de debate aberto e perguntas).  
Convidado: Gustavo (Mestrando no Centro de Inteligencia Artificial da PUCRS).

Temas abordados na apresentacao:
- Como funciona a pesquisa de pos-graduacao em IA no Centro de IA da PUCRS.
- Do laboratório ao mercado: como modelos de fronteira evoluiram de predição de texto para agentes com raciocinio e acao no mundo corporativo.
- Desafios tecnicos reais de avaliacao, latencia, alucinacao e seguranca em arquiteturas multimodais.
- Dicas de carreira e oportunidades de pesquisa/pos-graduacao para estudantes de Ciencias da Computacao e Engenharia de Software da PUCRS.

Sessao de Perguntas e Respostas (14:45 as 15:00):
Aproveitem os 15 minutos finais para dialogar diretamente com o Gustavo sobre duvidas tecnicas do projeto OmniAssistant e trajetoria academica/profissional.

---

## 4. Daily Standup de Abertura da Pratica (15:00 - 15:05)

Reuniao de 5 minutos em pe da squad de 3 integrantes:
1. O que mais gostei no encontro de ontem e quais aprendizados da palestra do Gustavo conectam com nosso OmniAssistant.
2. Minha maior dificuldade ou bug enfrentado na ingestao de dados.
3. Alinhamento rapido dos papeis (Piloto no teclado, Copiloto e Arquiteto) para a implementacao das ferramentas SQLite e do orquestrador de hoje.

---

## 5. Bloco 1: Laboratorio 1 - Ferramentas Locais e Banco SQLite (15:05 - 15:30)

Tempo dedicado: 25 minutos | Formato: Trios.

Por que agentes multimodais precisam de ferramentas deterministicas:
Modelos de linguagem sao pessimos em fazer contas complexas de cabeca e nao possuem acesso aos dados privados da empresa. Se um usuario envia a foto de um codigo de peca `A101` e pergunta pelo audio *"Quanto custam 15 unidades deste item?"*, a LLM nao deve tentar chutar o preco ou multiplicar de cabeca. O fluxo profissional de engenharia e:
1. A LLM extrai o codigo `A101` da foto e a quantidade `15` do audio.
2. O modelo emite uma solicitacao estruturada: *"chame `consultar_item(codigo='A101')`"*.
3. Nosso codigo Python roda a consulta parametrizada no SQLite local e devolve: `{"preco": 25.0}`.
4. O modelo entao solicita `calcular_total(quantidade=15, preco=25.0)` e nosso Python devolve `375.0`.
5. O modelo redige a resposta final fundamentada com explicabilidade total!

Sua Missao na Squad:
Criar `src/tools/local.py`. O modulo inicializa o banco SQLite local (`data/catalogo.sqlite`), popula registros sinteticos de demonstracao e expoe 3 funcoes matematicas e analiticas estritas, executadas em modo somente leitura (`PRAGMA query_only = ON`).

Scaffold de `src/tools/local.py`:

```python
import json
import math
import re
import sqlite3
from contextlib import closing
from pathlib import Path

DB_PATH = Path("data/catalogo.sqlite")

def inicializar_banco() -> None:
    """Cria a tabela e popula com registros sinteticos da demonstracao."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with closing(sqlite3.connect(DB_PATH)) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS itens (
                codigo TEXT PRIMARY KEY,
                nome TEXT NOT NULL,
                preco REAL NOT NULL,
                setor TEXT NOT NULL
            )
        """)
        # TODO: Adicione registros realistas adaptados ao caso da sua squad!
        dados = [
            ("A101", "Sensor Termico Industrial", 25.0, "Hardware"),
            ("B202", "Cabo de Rede Blindado Cat6", 10.0, "Redes"),
            ("C303", "Modulo Controlador PLC", 150.0, "Automacao"),
            ("D404", "Licenca Servidor Cloud Pro", 300.0, "Software")
        ]
        conn.executemany("INSERT OR IGNORE INTO itens VALUES (?, ?, ?, ?)", dados)
        conn.commit()

def validar_codigo(codigo: str) -> dict:
    """Valida se o codigo segue o padrao [Letra Maiuscula][3 digitos] (ex: A101)."""
    valido = bool(re.fullmatch(r"[A-Z][0-9]{3}", codigo.strip()))
    return {"codigo": codigo, "valido": valido}

def consultar_item(codigo: str) -> dict:
    """Consulta informacoes tecnicas e preco de um item no banco relacional local."""
    codigo_limpo = codigo.strip().upper()
    if not validar_codigo(codigo_limpo)["valido"]:
        return {"erro": "Formato de codigo invalido. Padrao esperado: 1 letra e 3 numeros (ex: A101)."}
        
    if not DB_PATH.is_file():
        inicializar_banco()
        
    with closing(sqlite3.connect(f"{DB_PATH.resolve().as_uri()}?mode=ro", uri=True)) as conn:
        conn.execute("PRAGMA query_only = ON")
        cursor = conn.execute("SELECT codigo, nome, preco, setor FROM itens WHERE codigo = ?", (codigo_limpo,))
        linha = cursor.fetchone()
        
    if not linha:
        return {"encontrado": False, "mensagem": f"Item {codigo_limpo} nao consta no catalogo."}
        
    return {
        "encontrado": True,
        "codigo": linha[0],
        "nome": linha[1],
        "preco": linha[2],
        "setor": linha[3]
    }

def calcular_total(quantidade: float, preco_unitario: float) -> dict:
    """Calcula o valor financeiro total de um lote com precisao monetaria."""
    if quantidade <= 0 or preco_unitario < 0:
        return {"erro": "Quantidade deve ser positiva e preco nao pode ser negativo."}
        
    total = round(quantidade * preco_unitario, 2)
    return {
        "quantidade": quantidade,
        "preco_unitario": preco_unitario,
        "total": total,
        "moeda": "BRL"
    }

if __name__ == "__main__":
    inicializar_banco()
    print("Banco inicializado:", DB_PATH)
    print("Teste consulta A101:", consultar_item("A101"))
    print("Teste calculo 4 x 25.0:", calcular_total(4, 25.0))
```

Como testar:
```bash
python -m src.tools.local
```

Criterio de Sucesso da Squad: O terminal imprime o banco inicializado em `data/catalogo.sqlite`, a consulta com sucesso do item A101 e o calculo do total de R$ 100,00.

---

## 6. Bloco 2: Laboratorio 2 - O Orquestrador Multimodal (`src/core/agent.py`) (15:30 - 16:05)

Tempo dedicado: 35 minutos | Formato: Trios (inverter quem digita!).

Sua Missao na Squad:
Criar `src/core/agent.py`. O modulo declara o schema formal das ferramentas usando Pydantic, injeta as ferramentas no Gemini 3.8 Flash e implementa o loop agêntico com multiplos turnos. A cada turno, se o modelo solicitar uma chamada de funcao (`FunctionCall`), nosso despachante intercepta, executa localmente e devolve a observacao (`FunctionResponse`) para o modelo concluir a resposta com total transparencia.

Scaffold de `src/core/agent.py`:

```python
import json
from time import perf_counter
from typing import Callable
from pydantic import BaseModel, ConfigDict, Field
from google.genai import types
from src.core.config import MODEL, criar_cliente_gemini
from src.core.contracts import EvidenciaMultimodal
from src.tools.local import consultar_item, calcular_total, validar_codigo

# Contratos estritos dos argumentos das ferramentas
class CodigoArgs(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    codigo: str = Field(description="Codigo do produto (ex: A101, B202)")

class TotalArgs(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    quantidade: float = Field(ge=0.1, le=1000.0, description="Quantidade de itens")
    preco_unitario: float = Field(ge=0.01, le=100000.0, description="Preco unitario em BRL")

REGISTRO_TOOLS: dict[str, tuple[Callable[..., dict], type[BaseModel], str]] = {
    "consultar_item": (consultar_item, CodigoArgs, "Consulta nome, preco e setor de um item por codigo no banco SQLite."),
    "calcular_total": (calcular_total, TotalArgs, "Calcula o valor total em BRL a partir de quantidade e preco."),
    "validar_codigo": (validar_codigo, CodigoArgs, "Valida o formato de um codigo de produto.")
}

FERRAMENTAS_GEMINI = types.Tool(function_declarations=[
    types.FunctionDeclaration(
        name=nome,
        description=desc,
        parameters_json_schema=schema.model_json_schema()
    )
    for nome, (_, schema, desc) in REGISTRO_TOOLS.items()
])

def despachar_tool(chamada: types.FunctionCall) -> dict:
    nome = chamada.name
    if nome not in REGISTRO_TOOLS:
        return {"erro": f"Ferramenta '{nome}' nao autorizada."}
        
    funcao, schema, _ = REGISTRO_TOOLS[nome]
    try:
        args = schema.model_validate(chamada.args or {}).model_dump()
        return funcao(**args)
    except Exception as e:
        return {"erro": f"Argumentos invalidos para {nome}: {type(e).__name__}"}

def executar_agente(pergunta: str, evidencias: list[EvidenciaMultimodal]) -> dict:
    """Executa o loop agentico multimodal em multiplos turnos com limite de passos."""
    inicio = perf_counter()
    trace_ferramentas = []
    
    contexto_evidencias = [e.model_dump() for e in evidencias]
    payload_usuario = json.dumps({
        "pergunta": pergunta,
        "evidencias_multimodais": contexto_evidencias
    }, ensure_ascii=False)
    
    historico = [types.Content(role="user", parts=[types.Part.from_text(text=payload_usuario)])]
    
    system_instruction = (
        "Voce e o orquestrador inteligente do OmniAssistant. "
        "Analise cuidadosamente as evidencias de visao e audio fornecidas. "
        "Quando precisar de precos ou dados cadastrais, acione consultar_item. "
        "Para contas matematicas, acione calcular_total. Nao chute valores! "
        "Na resposta final, cite explicitamente de onde veio cada informacao (ex: 'conforme observado na imagem')."
    )
    
    config = types.GenerateContentConfig(
        system_instruction=system_instruction,
        temperature=0.0,
        tools=[FERRAMENTAS_GEMINI],
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True)
    )
    
    resposta_final = "Limite de chamadas atingido."
    tokens_usados = 0
    cliente = criar_cliente_gemini()
    
    # Loop com trava de seguranca (max 4 turnos)
    for turno in range(4):
        resposta = cliente.models.generate_content(model=MODEL, contents=historico, config=config)
        if resposta.usage_metadata and resposta.usage_metadata.total_token_count:
            tokens_usados += resposta.usage_metadata.total_token_count
            
        candidato = resposta.candidates[0].content if resposta.candidates else None
        if not candidato:
            resposta_final = "Sem resposta do modelo."
            break
            
        historico.append(candidato)
        chamadas = [p.function_call for p in candidato.parts or [] if p.function_call is not None]
        
        # Se o modelo nao pediu mais ferramentas, ele concluiu a resposta!
        if not chamadas:
            resposta_final = resposta.text or "Resposta conclusiva emitida."
            break
            
        # Executa cada ferramenta solicitada e alimenta a observacao de volta
        partes_resposta = []
        for call in chamadas:
            t0 = perf_counter()
            resultado = despachar_tool(call)
            duracao_ms = round((perf_counter() - t0) * 1000, 1)
            
            trace_ferramentas.append({
                "ferramenta": call.name,
                "argumentos": call.args,
                "resultado": resultado,
                "duracao_ms": duracao_ms
            })
            partes_resposta.append(types.Part(
                function_response=types.FunctionResponse(name=call.name, response=resultado)
            ))
            
        historico.append(types.Content(role="tool", parts=partes_resposta))
        
    return {
        "resposta": resposta_final,
        "rastro_ferramentas": trace_ferramentas,
        "total_turnos": turno + 1,
        "tokens_estimados": tokens_usados,
        "tempo_total_ms": round((perf_counter() - inicio) * 1000, 1)
    }

if __name__ == "__main__":
    from src.core.contracts import EvidenciaMultimodal
    evidencia_teste = [
        EvidenciaMultimodal(origem="visao", resumo_informacao="Print de ordem de servico mostrando peca A101"),
        EvidenciaMultimodal(origem="audio", resumo_informacao="Cliente solicita a compra de 4 unidades deste item")
    ]
    resultado = executar_agente("Qual o custo total desta solicitacao?", evidencia_teste)
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
```

Como testar:
```bash
python -m src.core.agent
```

Criterio de Sucesso da Squad: O terminal imprime a resposta final informando que 4 unidades do Sensor A101 custam R$ 100,00, com o rastro demonstrando que `consultar_item` e `calcular_total` foram chamadas sequencialmente!

---

## 7. Coffee Break e Networking (16:05 - 16:15)

Pausa de 10 minutos! Cafe rapido para esticar as pernas e recarregar as energias apos implementar o cerebro agentico do assistente.

---

## 8. Bloco 3: Desafio Integrador e Guardrail SQL (16:15 - 16:35)

Tempo dedicado: 20 minutos | Formato: Trios.

Cenario de Negocio:
Vamos rodar o pipeline completo integrando os tres dias da Semana 2 em um unico script executavel:
`EntradaUsuario (Imagem + Audio)` -> `ingestion.py` -> `Evidencias` -> `agent.py` -> `Resposta e Trace`. Alem disso, devemos testar que qualquer tentativa de SQL Injection (`"A101'; DROP TABLE itens; --"`) seja bloqueada com seguranca.

Criar `tests/test_fluxo_completo.py`:

```python
import json
from pathlib import Path
from src.core.contracts import EntradaUsuario
from src.core.ingestion import despachar_ingestao
from src.core.agent import executar_agente
from src.tools.local import consultar_item

def testar_pipeline_completo():
    print("Executando teste integrado de percepcao -> acao...")
    
    # 1. Simula as entradas do usuario
    entrada_txt = EntradaUsuario(tipo="texto", texto_comando="Identifique os itens e calcule o total")
    evidencias = [despachar_ingestao(entrada_txt)]
    
    # Se houver imagem ou audio na pasta data/, adiciona ao lote
    if Path("data/amostra.png").is_file():
        evidencias.append(despachar_ingestao(EntradaUsuario(tipo="imagem", caminho_arquivo=Path("data/amostra.png"))))
    if Path("data/comando.wav").is_file():
        evidencias.append(despachar_ingestao(EntradaUsuario(tipo="audio", caminho_arquivo=Path("data/comando.wav"))))
        
    resultado = executar_agente(entrada_txt.texto_comando, evidencias)
    
    assert len(resultado["resposta"]) > 10, "A resposta do modelo veio vazia!"
    print("Resposta gerada:")
    print(resultado["resposta"])
    print("\nFerramentas disparadas:", len(resultado["rastro_ferramentas"]))
    print("Tempo de execucao:", resultado["tempo_total_ms"], "ms")

def testar_guardrail_sql():
    print("\nTestando resistencia contra SQL Injection...")
    codigo_malicioso = "A101'; DROP TABLE itens; --"
    resultado = consultar_item(codigo_malicioso)
    
    assert "erro" in resultado or resultado.get("encontrado") is False
    print("PASS: Tentativa de SQL Injection barrada com sucesso pelo guardrail de validacao.")

if __name__ == "__main__":
    testar_pipeline_completo()
    testar_guardrail_sql()
```

Como testar:
```bash
python -m tests.test_fluxo_completo
```

Criterio de Sucesso: O teste roda o fluxo completo, imprime a conclusao analitica e emite o `PASS` de protecao do SQLite.

---

## 9. Bloco 4: Sincronizacao no GitHub e Quizzes HTML (16:35 - 16:45)

Tempo dedicado: 10 minutos (5 min Git Sync + 5 min Quizzes).

1. Sincronizar o trabalho no Git:
```bash
git status
git add src/ tests/
git commit -m "feat(omni-v0.3): orquestracao agentica multimodal, ferramentas sqlite e guardrails de seguranca"
git push origin main
```
Todos os integrantes fazem `git pull` e conferem o fluxo funcionando localmente.

2. Abrir diretamente no navegador local:
- [Quiz do Dia 26](quizzes/quiz_dia_26.html): questoes sobre Function Calling, envelopes de resposta de ferramentas e guardrails.
- [Atividade Interativa do Dia 26](quizzes/atividade_dia_26.html): desafios de identificar bugs em loops de agentes e ordenar despachos de chamadas.

---

## 10. Bloco 5: Formulario Diario de Auto-Avaliacao e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link do formulario diario disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 26](https://docs.google.com/forms/d/{FORM_ID_DIA_26}/viewform)

Pautas de hoje:
- Feedback e reflexoes sobre a palestra com o Gustavo (Centro de IA da PUCRS).
- Como foi implementar o loop de agente com ferramentas no trio.
- Satisfacao ao ver o assistente cruzar a visao e a fala para disparar a consulta SQL.
- Planejamento da interface grafica no Streamlit para amanha.

---

## 11. Checklist de Conclusao do Dia 26

- [ ] Participacao na palestra com Gustavo (Centro de IA da PUCRS) e sessao de Q&A.
- [ ] Daily Standup realizada com a squad apos a palestra.
- [ ] Modulo `src/tools/local.py` inicializando banco SQLite seguro.
- [ ] Modulo `src/core/agent.py` orquestrando o loop multimodal de ferramentas.
- [ ] Teste integrador e guardrail SQL `test_fluxo_completo.py` executando com sucesso.
- [ ] Repositorio do trio sincronizado no GitHub por todos os integrantes.
- [ ] Quiz e Atividade Interativa do Dia 26 concluidos no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 12. Atividades Complementares (Para Aprofundamento)

1. Playground Web de SQL: [SQLime (Web SQLite)](https://sqlime.org/) - experimente queries analiticas direto no navegador.
2. Leitura Recomendada: [Simon Willison: AI Agents and Tool Calling Demystified](https://simonwillison.net/) - ensaio sobre seguranca em tool use e loops ReAct.
3. Documentacao Oficial: [Google AI: Function Calling com Gemini](https://ai.google.dev/gemini-api/docs/function-calling) - guia de referencia de definicoes de ferramentas.
4. Video Recomendado: [Tool Use & Function Calling Architecture (AI Engineer Summit, YouTube)](https://www.youtube.com/watch?v=y3nBwFp06rA).
5. Desafio Bonus: Adicione uma ferramenta simples `exportar_relatorio_markdown` que gera um resumo em arquivo `.md` do chamado com data/hora e salva na pasta `data/relatorios/`!

---
[Voltar ao README da Sprint 3](README.md)
