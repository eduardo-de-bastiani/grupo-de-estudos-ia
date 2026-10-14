# Dia 26 (21/10/2026 - Quarta-feira)
# Orquestracao de Ferramentas e Raciocinio Multimodal: O Cerebro em Acao

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 2: Desenvolvimento Cumulativo do OmniAssistant em Trios  

Hoje alcancamos o ponto alto de integracao da nossa jornada: conectar a percepcao multimodal ao raciocinio agêntico com ferramentas reais. Na Sprint 2, aprendemos a fazer o modelo decidir chamadas de funcao. Hoje, o OmniAssistant recebe o que ele VIU na imagem e o que ele OUVIU no audio e, se precisar de informacoes concretas, decide autonomamente consultar um banco de dados relacional local (SQLite) ou executar calculos matematicos com seguranca estrita. E o ciclo completo: **Percepcao -> Raciocinio -> Acao -> Resposta**!

Dinamica de Squad: Mantenham o rodizio no trio (Piloto, Copiloto e Arquiteto). Hoje finalizamos o motor agêntico (`src/core/agent.py`) que deixara o produto pronto para receber a interface visual amanha.

---

## 1. Objetivos do Encontro

1. Construir ferramentas determinísticas em Python conectadas a um banco local SQLite seguro (`src/tools/local.py`).
2. Configurar declaracoes de ferramentas via `google.genai.types.Tool` e `FunctionDeclaration` com schemas estritos em Pydantic.
3. Implementar o despachante seguro de ferramentas com protecao contra SQL Injection e operacoes de escrita nao autorizadas.
4. Construir o loop agêntico artesanal em `src/core/agent.py` capaz de alimentar o Gemini com evidencias multimodais e responder as chamadas de funcao em multiplos turnos.
5. Capturar telemetria completa de execucao (rastro agêntico com nomes de tools chamadas, argumentos, latencia e contagem de tokens).
6. Executar testes de estresse comprovando que instrucoes maliciosas injetadas nas imagens ou audios nao conseguem corromper o banco.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario diario.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup da Squad: alinhamento das ferramentas necessarias |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura Padronizada e Playgrounds Web de Ferramentas |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio 1: Ferramentas Locais e Banco SQLite (`src/tools/local.py`) |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio 2: O Orquestrador Multimodal (`src/core/agent.py`) |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: Percepcao para Acao de Ponta a Ponta |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Guardrail SQL e Bloqueio de Injections |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Squad (Git Sync v0.3) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario Diario de Auto-Avaliacao e Feedback |

---

## 3. Daily Standup de Abertura (14:00 - 14:05)

Reuniao de 5 minutos em pe da squad:
1. O que mais gostei no pipeline unificado de imagem e audio de ontem.
2. Minha maior dificuldade ou bug enfrentado na ingestao multimodal.
3. Alinhem quais ferramentas analiticas SQLite serao prioritarias hoje.
Iniciem a leitura pontualmente as 14:05.

---

## 4. Bloco 1: Leitura Padronizada de Referencia e Sandboxes de Ferramentas (14:05 - 14:20)

Tempo dedicado: 15 minutos (leitura individual e experimentacao na squad).

Por que agentes multimodais precisam de ferramentas determinísticas:
Modelos de linguagem sao pessimos em fazer contas complexas de cabeca e nao possuem acesso aos dados privados da empresa. Se um usuario envia a foto de um codigo de peca `A101` e pergunta pelo audio *"Quanto custam 15 unidades deste item?"*, a LLM nao deve tentar chutar o preco ou multiplicar de cabeca. O fluxo profissional de engenharia e:
1. A LLM extrai o codigo `A101` da foto e a quantidade `15` do audio.
2. O modelo emite uma solicitacao estruturada: *"chame `consultar_preco(codigo='A101')`"*.
3. Nosso codigo Python roda a consulta parametrizada no SQLite local e devolve: `{"preco": 25.0}`.
4. O modelo entao solicita `calcular_total(quantidade=15, preco=25.0)` e nosso Python devolve `375.0`.
5. O modelo redige a resposta final fundamentada com explicabilidade total!

O que voce vai encontrar nos links recomendados:
- Na Documentacao de Function Calling: veja como declarar ferramentas usando schemas JSON e como desabilitar o auto-calling para manter controle artesanal da execucao.
- No Artigo do Simon Willison: licoes de seguranca sobre como criar ferramentas read-only e blindar bancos contra escrita indevida.

Links Educacionais Recomendados:
- [Google AI: Function Calling com Gemini](https://ai.google.dev/gemini-api/docs/function-calling): guia oficial completo sobre chamada nativa de ferramentas.
- [Simon Willison: AI Agents and Tool Calling Demystified](https://simonwillison.net/): explicacao brilhante sobre loops agênticos e limites de seguranca.
- [Python 3.11 SQLite Oficial](https://docs.python.org/3.11/library/sqlite3.html): como usar consultas parametrizadas com placeholders para impedir SQL injection.

Jogos Web e Playgrounds Interativos para Testar Agora (2 a 3 min):
- [SQLime - SQLite Web Playground](https://sqlime.org/): teste queries SQL analiticas diretamente no navegador com SQLite compilado em WebAssembly.
- [Google AI Studio Tool Calling](https://aistudio.google.com/): declare uma ferramenta rapida no AI Studio e veja como o Gemini decide quando emitir a chamada de funcao.

---

## 5. Bloco 2: Laboratorio 1 - Ferramentas Locais e Banco SQLite (`src/tools/local.py`) (14:20 - 14:50)

Tempo dedicado: 30 minutos | Formato: Trios.

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
        return {"encontrado": False, "mensagem": f"Item {codigo_limpo} nao consta na base de dados."}
        
    return {
        "encontrado": True,
        "codigo": linha[0],
        "nome": linha[1],
        "preco_unitario_brl": linha[2],
        "setor": linha[3]
    }

def calcular_total(quantidade: float, preco_unitario: float) -> dict:
    """Multiplica quantidade por preco e formata em BRL com precisao garantida."""
    if quantidade <= 0 or preco_unitario <= 0:
        return {"erro": "Valores devem ser estritamente positivos."}
    if not math.isfinite(quantidade) or not math.isfinite(preco_unitario):
        return {"erro": "Valores infinitos ou invalidos detectados."}
        
    total = round(quantidade * preco_unitario, 2)
    return {"total_brl": total, "quantidade": quantidade, "preco_unitario": preco_unitario}

if __name__ == "__main__":
    inicializar_banco()
    print("Banco inicializado com sucesso!")
    print("Consulta A101:", consultar_item("A101"))
    print("Calculo total:", calcular_total(3, 25.0))
```

Como testar:
```bash
python -m src.tools.local
```

Criterio de Sucesso da Squad: O banco e criado em `data/catalogo.sqlite`, a consulta retorna os dados do sensor `A101` e o calculo retorna `75.0 BRL`.

---

## 6. Bloco 3: Laboratorio 2 - O Orquestrador Multimodal (`src/core/agent.py`) (14:50 - 15:30)

Tempo dedicado: 40 minutos | Formato: Trios (inverter quem digita!).

Sua Missao na Squad:
Criar `src/core/agent.py`. Aqui mora a orquestracao central do OmniAssistant! Ele recebe a pergunta do usuario e a lista de `EvidenciaMultimodal` (visao e audio gerados ontem). O modelo recebe as declaracoes das ferramentas, inspeciona as evidencias e dispara chamadas de funcao em loop ate formular a resposta final.

Scaffold de `src/core/agent.py`:

```python
import json
from collections.abc import Callable
from time import perf_counter
from google.genai import types
from pydantic import BaseModel, ConfigDict, Field
from src.core.config import MODEL, criar_cliente_gemini
from src.core.contracts import EvidenciaMultimodal
from src.tools.local import consultar_item, calcular_total, validar_codigo

class CodigoArgs(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    codigo: str = Field(description="Codigo do produto (ex: A101)")

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
    """Executa o loop agêntico multimodal em multiplos turnos com limite de passos."""
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

Criterio de Sucesso da Squad: O terminal imprime a resposta final dizendo que 4 unidades do Sensor A101 custam R$ 100,00, com o rastro demonstrando que `consultar_item` e `calcular_total` foram chamadas sequencialmente!

---

## 7. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Cafe e celebracao: o core do OmniAssistant esta vivo e funcionando de ponta a ponta!

---

## 8. Bloco 4: Desafio Pratico - Percepcao para Acao de Ponta a Ponta (15:45 - 16:15)

Tempo dedicado: 30 minutos | Formato: Trios.

Cenario de Negocio:
Vamos rodar o pipeline completo integrando os tres dias da Semana 2 em um unico script executavel:
`EntradaUsuario (Imagem + Audio)` -> `ingestion.py` -> `Evidencias` -> `agent.py` -> `Resposta e Trace`.

Criar `tests/test_fluxo_completo.py`:

```python
import json
from pathlib import Path
from src.core.contracts import EntradaUsuario
from src.core.ingestion import despachar_ingestao
from src.core.agent import executar_agente

def testar_pipeline_completo():
    print("Executando teste integrado de percepcao -> acao...")
    
    # Simula as duas entradas reais da squad
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

if __name__ == "__main__":
    testar_pipeline_completo()
```

Como testar:
```bash
python -m tests.test_fluxo_completo
```

Criterio de Sucesso: O teste roda o fluxo completo e imprime a conclusao analitica no terminal.

---

## 9. Bloco 5: Testes de Resiliencia - O Guardrail SQL e Bloqueio de Injections (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Trios.

E se o print ou o audio contiver uma tentativa de SQL Injection como:
`"A101'; DROP TABLE itens; --"`?
Vamos provar que nosso banco esta blindado com consultas parametrizadas e PRAGMA query_only.

Crie `tests/test_seguranca_tools.py`:

```python
from src.tools.local import consultar_item

def testar_sql_injection():
    codigo_malicioso = "A101'; DROP TABLE itens; --"
    resultado = consultar_item(codigo_malicioso)
    
    assert "erro" in resultado or resultado.get("encontrado") is False
    print("PASS: Tentativa de SQL Injection barrada com sucesso pelo guardrail de validacao.")

if __name__ == "__main__":
    testar_sql_injection()
```

Como testar:
```bash
python -m tests.test_seguranca_tools
```

Criterio de Sucesso: O terminal exibe `PASS`, comprovando protecao de dados no SQLite local.

---

## 10. Bloco 6: Sincronizacao no GitHub da Squad (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Salvar os modulos de ferramentas e agente no Git:
- `src/tools/local.py`
- `src/core/agent.py`
- `tests/test_fluxo_completo.py`
- `tests/test_seguranca_tools.py`

Comandos:
```bash
git status
git add src/ tests/
git commit -m "feat(omni-v0.3): orquestracao agêntica multimodal, ferramentas sqlite e guardrails de seguranca"
git push origin main
```
Todos os integrantes fazem `git pull` e conferem o fluxo funcionando localmente.

---

## 11. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no navegador: [Quiz do Dia 26](quizzes/quiz_dia_26.html)
   - Responda questoes sobre Function Calling, envelopes de resposta de ferramentas e guardrails de seguranca.
2. Abra a atividade gamificada: [Atividade Interativa do Dia 26](quizzes/atividade_dia_26.html)
   - Resolva desafios de identificar bugs em loops de agentes e ordenar despachos de chamadas.

---

## 12. Bloco 8: Formulario Diario de Auto-Avaliacao e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link do formulario diario disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 26](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform)

Pautas de hoje:
- Como foi implementar o loop de agente com ferramentas no trio.
- Satisfacao ao ver o assistente cruzar a visao e a fala para disparar a consulta SQL.
- Planejamento da interface grafica no Streamlit para amanha.

---

## 13. Checklist de Conclusao do Dia 26

- [ ] Daily Standup de abertura realizada com a squad.
- [ ] Leitura e experimentos no SQLime concluidos.
- [ ] Modulo `src/tools/local.py` inicializando banco SQLite seguro.
- [ ] Modulo `src/core/agent.py` orquestrando o loop multimodal de ferramentas.
- [ ] Teste integrador `test_fluxo_completo.py` executando ponta a ponta.
- [ ] Teste de seguranca `test_seguranca_tools.py` aprovado com `PASS`.
- [ ] Repositorio do trio sincronizado no GitHub por todos os integrantes.
- [ ] Quiz e Atividade Interativa do Dia 26 concluidos no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 14. Atividades Complementares (Para Aprofundamento)

1. Video Recomendado: [Tool Use & Function Calling Architecture (AI Engineer Summit, YouTube)](https://www.youtube.com/watch?v=y3nBwFp06rA). Veja como as maiores empresas de tecnologia estruturam guardrails e observabilidade para agentes com centenas de ferramentas.
2. Desafio Bonus: Adicione uma ferramenta simples `exportar_relatorio_markdown` que gera um resumo em arquivo `.md` do chamado com data/hora e salva na pasta `data/relatorios/`!

---
[Voltar ao README da Sprint 3](README.md)
