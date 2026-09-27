# 📅 Dia 11 (28/09 - Segunda-feira)
# 🧩 Structured Outputs: Contratos de Dados, JSON Schemas & Pydantic

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender a importância de **Structured Outputs** (saídas estruturadas) na transição de chatbots conversacionais para sistemas analíticos e agentes automatizados.
2. Dominar a especificação de contratos de dados em Python moderno utilizando **Pydantic** e sua conversão automática em JSON Schemas no SDK `google-genai`.
3. Forçar o modelo `gemini-3.8-flash` a responder estritamente sob esquemas tipados via parâmetro `response_schema`, eliminando falhas de parsing (`json.loads`).
4. Implementar modelos complexos com **campos aninhados, Enums e validadores customizados** (`@field_validator`).
5. Realizar o desafio prático de **extração estruturada contra logs e textos caóticos de suporte**, validando a integridade dos dados extraídos.
6. Comparar experimentalmente a taxa de sucesso de **Structured Outputs vs prompts comuns pedindo JSON** através de um script de benchmark.
7. Consolidar os conceitos no **Quiz Interativo** e na **Atividade Interativa** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Por que Structured Output?│
│ 14:20 - 14:50   │ Bloco 2: Laboratório Pydantic Básico (response_schema) │
│ 14:50 - 15:30   │ Bloco 3: Modelagem Avançada (Schemas Aninhados & Enums)│
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: Stress Test de Extração Logs │
│ 16:15 - 16:25   │ Bloco 5: Benchmark: Structured Outputs vs JSON Livre   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 17:00   │ Bloco 7: Quiz + Atividade Interativa (dia 11)          │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:05 - 14:20)

* **Tempo Dedicado:** 15 minutos (leitura individual em silêncio).
* **Foco Teórico:** Como os decodificadores de LLM utilizam gramáticas formais (CFG / Context-Free Grammars) para restringir o espaço amostral de tokens, garantindo conformidade matemática com um JSON Schema sem depender de "pedir por favor" no prompt.
**Por que contratos de saída importam.** Um chatbot devolve texto para uma pessoa ler. Um agente devolve dados para *outro programa* consumir, e programas não perdoam: uma vírgula fora do lugar, um comentário antes do JSON ou um campo com nome diferente e o `json.loads` explode em produção. Nas duas próximas semanas o modelo vai escolher ferramentas, montar argumentos e alimentar um banco de dados, então tudo o que ele emitir precisa seguir um **contrato** que o seu código consiga validar.

**O que é um contrato.** Um *JSON Schema* descreve a forma de um documento: quais campos existem, de que tipo são, quais são obrigatórios e quais valores são permitidos. Escrever esse schema à mão é tedioso, e é aí que entra o **Pydantic**: você declara uma classe Python com type hints e ele gera o schema, valida os dados recebidos e converte tipos com mensagens de erro claras. O SDK `google-genai` aceita a classe Pydantic diretamente no parâmetro `response_schema` e devolve a resposta já instanciada em `response.parsed`.

**Por que isso é mais forte do que "peça JSON no prompt".** Quando você pede JSON no prompt, o modelo *tenta* obedecer; quando você usa `response_schema`, a geração é restringida ao schema (*constrained decoding*): a cada token, apenas os que mantêm o documento válido segundo a gramática são candidatos. É a diferença entre pedir educadamente e trancar a porta. Isso não garante que o **conteúdo** esteja certo (o modelo ainda pode errar um valor), apenas que a **forma** está correta, e por isso combinamos o schema com validadores Pydantic para regras de negócio.

* [Gemini API: Structured Output (google-genai)](https://ai.google.dev/gemini-api/docs/structured-output)
---

## 💻 4. Bloco 2: Laboratório Pydantic Básico com `response_schema` (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_11/01_pydantic_schema.py`. Modelar uma classe `PerfilUsuario` (nome, idade, habilidades, status) usando Pydantic, configurar o `response_schema` no cliente `google-genai` com `gemini-3.8-flash` e validar a recepção direta do objeto tipado.
**Preparação do ambiente (5 minutos, uma vez por dupla):**

```bash
mkdir dia_11 && cd dia_11
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install google-genai pydantic python-dotenv
echo "GEMINI_API_KEY=cole_sua_chave_aqui" > .env
echo ".env" >> .gitignore
```

**Scaffold de `dia_11/01_pydantic_schema.py`:** complete os trechos marcados com `# TODO`.

```python
import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


class PerfilUsuario(BaseModel):
    # TODO: declare os campos do perfil com type hints e Field(description=...):
    #   nome (str), idade (int, entre 0 e 120: dica, Field(ge=0, le=120)), habilidades (list[str]),
    #   status (Literal["ativo", "inativo", "pendente"])
    ...


TEXTO = (
    "Oi, sou a Marina Souza, tenho 29 anos e trabalho com Python, SQL e Power BI. "
    "Minha conta ainda esta aguardando aprovacao do time."
)


def extrair_perfil(texto: str) -> PerfilUsuario:
    response = client.models.generate_content(
        model=MODEL,
        contents=f"Extraia o perfil do usuario do texto abaixo.\n\n{texto}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            # TODO: passe a classe PerfilUsuario em response_schema
        ),
    )
    # response.parsed ja vem como instancia de PerfilUsuario
    return response.parsed


if __name__ == "__main__":
    perfil = extrair_perfil(TEXTO)
    print(type(perfil).__name__)
    print(perfil.model_dump_json(indent=2))
    # TODO: imprima o JSON Schema gerado pelo Pydantic com PerfilUsuario.model_json_schema()
```

**Critério de sucesso:** o terminal imprime `PerfilUsuario` e um JSON com `nome: "Marina Souza"`, `idade: 29`, `habilidades` contendo Python, SQL e Power BI e `status: "pendente"`. Depois, troque o texto por um em que a idade é `"trinta"` e observe o que acontece; anote na dupla se o erro veio do modelo ou do Pydantic.

---

## 🧩 5. Bloco 3: Modelagem Avançada: Schemas Aninhados, Enums & Validadores (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_11/02_nested_schema_validator.py`. Modelar uma estrutura de dados de auditoria analítica contendo:
  - `Severidade` como `Enum` (`BAIXA`, `MEDIA`, `ALTA`, `CRITICA`).
  - Lista de objetos aninhados `ItemAuditoria` (tabela, coluna, anomalia_detectada, registros_afetados).
  - Validador customizado `@field_validator` garantindo integridade numérica e campos preenchidos.
  - Submeter textos analíticos complexos ao `gemini-3.8-flash` e instanciar os modelos sem nenhuma perda de tipagem.
**Scaffold de `dia_11/02_nested_schema_validator.py`:** o esqueleto já roda; você implementa o modelo e o validador.

```python
import os
from enum import Enum

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field, field_validator

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


class Severidade(str, Enum):
    BAIXA = "BAIXA"
    MEDIA = "MEDIA"
    ALTA = "ALTA"
    CRITICA = "CRITICA"


class ItemAuditoria(BaseModel):
    tabela: str
    coluna: str
    anomalia_detectada: str
    registros_afetados: int
    severidade: Severidade

    @field_validator("registros_afetados")
    @classmethod
    def nao_negativo(cls, valor: int) -> int:
        # TODO: levante ValueError se valor < 0; caso contrario retorne o valor
        ...

    @field_validator("tabela", "coluna", "anomalia_detectada")
    @classmethod
    def nao_vazio(cls, valor: str) -> str:
        # TODO: levante ValueError se o texto (sem espacos nas pontas) estiver vazio
        ...


class RelatorioAuditoria(BaseModel):
    base_analisada: str
    itens: list[ItemAuditoria]
    resumo: str = Field(description="Resumo executivo em ate 2 frases")
    # TODO: adicione o campo requer_acao_imediata (bool)


RELATORIO_TEXTO = """
Auditoria da base de vendas (vendas.db). Na tabela clientes, a coluna email esta nula
em 37 registros, o que impede o envio de notas fiscais. Na tabela pedidos, a coluna
valor_total tem 4 pedidos com valores negativos, provavel erro de estorno. Na tabela
produtos, a coluna descricao tem 120 registros com texto duplicado, sem impacto operacional.
"""

if __name__ == "__main__":
    response = client.models.generate_content(
        model=MODEL,
        contents=f"Estruture o relatorio de auditoria abaixo.\n{RELATORIO_TEXTO}",
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=RelatorioAuditoria,
        ),
    )
    relatorio: RelatorioAuditoria = response.parsed
    for item in relatorio.itens:
        print(f"[{item.severidade.value}] {item.tabela}.{item.coluna}: {item.registros_afetados}")
    print(relatorio.resumo)

    # TODO: valide o validador sem chamar a LLM: tente instanciar ItemAuditoria com
    # registros_afetados=-5 dentro de try/except ValueError e imprima a mensagem de erro
```

**Critério de sucesso:** 3 itens listados com severidades coerentes (o e-mail nulo e os valores negativos devem ser mais graves que a descrição duplicada) e uma mensagem de `ValidationError` clara para o valor `-5`. Discussão obrigatória na dupla: *o que o Enum impede que aconteça se o modelo inventar a severidade "MUITO ALTA"?*

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de impressões entre as duplas.

---

## 🧪 7. Bloco 4: Desafio Prático: Stress Test de Extração de Logs (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_11/03_extractor_stress_test.py`.
  - Processar um lote de 5 mensagens de erro e transcrições desestruturadas reais (stack traces corrompidos, logs com caracteres especiais e formatos mistos).
  - Extrair obrigatoriamente para um schema `RelatorioIncidente` com campos: `timestamp`, `servico_origem`, `tipo_erro`, `stack_resumido` e `acoes_recomendadas` (lista).
  - O script deve iterar sobre cada log, validar a resposta e assinalar 100% de sucesso na validação Pydantic.
**Scaffold de `dia_11/03_extractor_stress_test.py`:** os 5 logs de teste já estão prontos; o desafio é fechar o contrato e a métrica.

```python
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, ValidationError

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


class RelatorioIncidente(BaseModel):
    # TODO: campos obrigatorios: timestamp (str), servico_origem (str), tipo_erro (str),
    # stack_resumido (str), acoes_recomendadas (list[str])
    ...


LOGS = [
    "2026-09-28T03:14:07Z payment-svc ERROR java.lang.NullPointerException at "
    "com.loja.pay.Checkout.finalizar(Checkout.java:212) caused by: cartao_id=null",
    "[28/Sep/2026:03:15:44] auth-gateway  !!  ConnectionResetError: [Errno 104] "
    "Connection reset by peer  (retry 3/3 esgotado)  ###",
    "ts=1790565300 svc=report-worker lvl=fatal msg=\"OOMKilled: container excedeu 512Mi\" "
    "restarts=7",
    "ERRO?? o job de exportacao travou de novo. Ninguem sabe a hora. Vem do "
    "servico exporter, tipo TimeoutError ao chamar o S3 apos 30s. Log truncado ...\u00e7\u00e3o",
    "Traceback (most recent call last):\n  File \"etl.py\", line 88, in carregar\n"
    "    cur.execute(sql)\nsqlite3.OperationalError: database is locked\n"
    "2026-09-28 04:02:11 etl-nightly",
]


def extrair(log: str) -> RelatorioIncidente:
    # TODO: chame client.models.generate_content com response_schema=RelatorioIncidente
    # e instrua o modelo a usar "desconhecido" em campos ausentes no log
    ...


if __name__ == "__main__":
    sucessos = 0
    for i, log in enumerate(LOGS, start=1):
        try:
            relatorio = extrair(log)
            # TODO: se relatorio for valido, incremente sucessos e imprima servico_origem e tipo_erro
        except (ValidationError, ValueError, AttributeError) as erro:
            print(f"Log {i}: FALHOU -> {erro}")
    print(f"Taxa de sucesso: {sucessos}/{len(LOGS)}")
```

**Critério de sucesso:** `Taxa de sucesso: 5/5`. O log 4 não traz horário: o `timestamp` deve sair como `"desconhecido"` (e não inventado). Se algum log falhar, ajuste a instrução do prompt (não o schema) e rode de novo, registrando na dupla o que mudou.

---

## 📊 8. Bloco 5: Comparação de Eficiência: Structured Outputs vs JSON Livre (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Investigação Experimental em Duplas.
* **Objetivo:** Criar o script `dia_11/04_benchmark_parsing.py`. Comparar a abordagem clássica (prompt dizendo *"retorne apenas JSON"* sem schema formal) contra `response_schema` com Pydantic sobre 10 repetições.
  - Medir taxa de erro de parsing (`json.JSONDecodeError`), formatação com markdown triplo (` ```json `) indesejado e tempo de resposta.
**Scaffold de `dia_11/04_benchmark_parsing.py`:** compara as duas abordagens em 10 repetições.

```python
import json
import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
REPETICOES = 10
TEXTO = "Pedido 8841 do cliente Joao Lima, total R$ 259,90, pago via PIX em 27/09/2026."


class Pedido(BaseModel):
    numero: int
    cliente: str
    total: float
    forma_pagamento: str


def abordagem_livre() -> dict:
    """Pede JSON no prompt, sem schema formal."""
    inicio = time.perf_counter()
    response = client.models.generate_content(
        model=MODEL,
        contents=f"Retorne apenas JSON com numero, cliente, total e forma_pagamento: {TEXTO}",
    )
    texto = response.text
    tem_markdown = texto.strip().startswith("`" * 3)  # cerca de markdown: tres crases seguidas
    # TODO: tente json.loads(texto) e marque erro_parse=True se levantar json.JSONDecodeError
    # Retorne: {"erro_parse": bool, "tem_markdown": bool, "segundos": float}
    ...


def abordagem_schema() -> dict:
    inicio = time.perf_counter()
    # TODO: chame o modelo com response_schema=Pedido e retorne o mesmo formato de dicionario
    ...


def resumir(nome: str, resultados: list[dict]) -> None:
    erros = sum(r["erro_parse"] for r in resultados)
    markdown = sum(r["tem_markdown"] for r in resultados)
    tempo_medio = sum(r["segundos"] for r in resultados) / len(resultados)
    print(f"{nome}: erros de parse={erros}/{len(resultados)} | com markdown={markdown} | media={tempo_medio:.2f}s")


if __name__ == "__main__":
    livre = [abordagem_livre() for _ in range(REPETICOES)]
    estruturada = [abordagem_schema() for _ in range(REPETICOES)]
    resumir("JSON livre ", livre)
    resumir("response_schema", estruturada)
```

**Critério de sucesso:** duas linhas de resumo no terminal. Espera-se `erros de parse=0` e `com markdown=0` para o `response_schema`; a abordagem livre costuma apresentar cercas de markdown (` ```json `) em parte das repetições. Se nas suas 10 execuções a abordagem livre também foi perfeita, registre isso: é um dado válido e mostra que a falha é **probabilística**, exatamente o problema que o contrato elimina.

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Conferir que a pasta `dia_11/` contém todos os 4 scripts funcionais (`01_pydantic_schema.py`, `02_nested_schema_validator.py`, `03_extractor_stress_test.py` e `04_benchmark_parsing.py`), testar localmente e realizar commit convencional e push no repositório compartilhado.

---

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 17:00)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_11.html`](quizzes/quiz_dia_11.html)
* **Formato:** Questões práticas sobre gramáticas CFG, Pydantic v2, validação de tipos em tempo de execução, diferença entre prompt livre e `response_schema`, e tratamento de dados aninhados.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_11.html`](quizzes/atividade_dia_11.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

### ✅ Checklist de Conclusão do Dia 11:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura conceitual sobre saídas estruturadas concluída.
- [x] Script `01_pydantic_schema.py` implementado com Pydantic e `response_schema`.
- [x] Script `02_nested_schema_validator.py` com enums e validação customizada funcionando.
- [x] Desafio `03_extractor_stress_test.py` aprovado contra logs desestruturados.
- [x] Benchmark `04_benchmark_parsing.py` executado evidenciando o valor de contratos formais.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 11 respondido no navegador.
- [x] Atividade interativa do Dia 11 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [Instructor and Pydantic: Structured LLM outputs for easy data extraction (BugBytes, YouTube)](https://www.youtube.com/watch?v=3xUW1Do9zOs). Mostra o mesmo raciocínio de contrato + validação com outra biblioteca; ao assistir, compare com o `response_schema` que vocês usaram hoje e anote 1 vantagem e 1 limitação de cada abordagem.
2. 💻 **Código Bônus:** conversão nos dois sentidos entre Pydantic e JSON Schema, com documentação gerada automaticamente. Salve como `dia_11/05_bonus_schema_docs.py`.

```python
import json

from pydantic import BaseModel, Field, create_model

TIPOS = {"string": str, "integer": int, "number": float, "boolean": bool}


class Produto(BaseModel):
    sku: str = Field(description="Codigo unico do produto")
    preco: float = Field(description="Preco em reais")
    ativo: bool = True


def modelo_para_schema(modelo: type[BaseModel]) -> dict:
    return modelo.model_json_schema()


def schema_para_modelo(nome: str, schema: dict) -> type[BaseModel]:
    """Reconstroi uma classe Pydantic simples (campos escalares) a partir de um JSON Schema."""
    campos = {}
    obrigatorios = set(schema.get("required", []))
    for campo, definicao in schema["properties"].items():
        tipo = TIPOS[definicao["type"]]
        # TODO: se o campo for obrigatorio use (tipo, ...); senao use (tipo, definicao.get("default"))
        campos[campo] = ...
    return create_model(nome, **campos)


def gerar_documentacao(schema: dict) -> str:
    linhas = [f"# {schema['title']}", "", "| Campo | Tipo | Obrigatorio | Descricao |", "| --- | --- | --- | --- |"]
    obrigatorios = set(schema.get("required", []))
    for campo, definicao in schema["properties"].items():
        # TODO: monte uma linha da tabela com campo, tipo, "sim"/"nao" e a descricao (se existir)
        pass
    return "\n".join(linhas)


if __name__ == "__main__":
    schema = modelo_para_schema(Produto)
    print(json.dumps(schema, indent=2, ensure_ascii=False))
    Reconstruido = schema_para_modelo("ProdutoReconstruido", schema)
    print(Reconstruido(sku="A-1", preco=10.5))
    print(gerar_documentacao(schema))
```

Resultado esperado: o JSON Schema de `Produto`, uma instância da classe reconstruída e uma tabela Markdown com 3 linhas de campos.
