# 📅 Dia 17 (06/10 - Terça-feira)
# 🔍 Ferramentas de Dados: Inspeção de Schema, Profiling & Consultas SQL no SQLite

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Compreender as boas práticas de **Text-to-SQL em produção** e a técnica de **Schema Grounding**: como alimentar o modelo de linguagem com metadados estruturados dinâmicos para prevenir alucinações de tabelas ou nomes de colunas inexistentes.
2. Implementar o módulo de **Inspeção de Schemas e Metadados** (`src/tools/schema_tools.py`): funções determinísticas para listar tabelas, detalhar colunas, tipos e mapear chaves relacionais.
3. Desenvolver o módulo de **Profiling e Qualidade de Dados** (`src/tools/profiling_tools.py`): funções para contagem de registros nulos, cardinalidade de valores distintos, distribuições e amostragem de dados.
4. Construir o módulo de **Execução de Queries Analíticas** (`src/tools/query_tools.py`): execução de consultas SQL no SQLite com sanitização, paginação de segurança obrigatória (`LIMIT 50`) e conversão para estruturas JSON consumíveis.
5. Realizar o teste preliminar de integração com `gemini-3.8-flash` via **Function Calling** nativo (`src/agent/test_tools_llm.py`), validando a capacidade do modelo de responder perguntas de negócio invocando as ferramentas criadas.
6. Sincronizar o repositório colaborativo no GitHub e responder ao **Quiz do Dia** e à **Atividade Interativa**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Text-to-SQL & Grounding  │
│ 14:20 - 14:50   │ Bloco 2: Módulo de Ferramentas de Schema & Metadados   │
│ 14:50 - 15:30   │ Bloco 3: Módulo de Profiling Estatístico & Qualidade   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:10   │ Bloco 4: Ferramenta de Execução SQL com Paginação      │
│ 16:10 - 16:25   │ Bloco 5: Teste Preliminar de Function Calling com LLM  │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub do Trio (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz + Atividade Interativa (dia 17)          │
│ 16:45 - 17:00   │ Bloco 8: Formulário Diário de Auto-Avaliação & Feedback│
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

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:05 - 14:20)

* **Tempo Dedicado:** 15 minutos (leitura individual e alinhamento no trio).
* **Foco Teórico:** Por que fornecer o banco inteiro no prompt é inviável em produção (consumo de contexto e alucinação) e como dividir a consulta Text-to-SQL em duas fases: (1) descoberta do schema relevante; (2) geração e execução controlada da query SQL.
**Por que não colar o banco inteiro no prompt.** A tentação de todo iniciante em *Text-to-SQL* é enviar ao modelo o dump completo do banco e pedir "escreva a query". Isso quebra rápido: bases reais têm centenas de tabelas e milhões de linhas, o contexto estoura, o custo sobe e, pior, o modelo **alucina**: inventa a coluna `receita_total` que não existe e escreve um SQL que parece perfeito e falha na execução (ou pior, retorna algo errado sem avisar).

**A receita robusta: duas fases.** A abordagem que vamos usar é a que times de dados adotam na prática. **Fase 1, descoberta:** o agente chama ferramentas de *metadados* (`listar_tabelas`, `descrever_schema_tabela`, `obter_chaves_estrangeiras`) para entender **só o que precisa** do schema. É o *schema grounding*: ancorar o raciocínio do modelo em fatos consultados, e não em memória. **Fase 2, execução controlada:** com o schema em mãos, ele escreve a query e a executa por uma ferramenta que impõe regras (limite de linhas, somente leitura, medição de tempo). Note que o modelo *nunca* toca no banco diretamente: tudo passa por funções suas, e é nelas que moram as barreiras de segurança.

**Ferramentas boas têm cara de API, não de terminal.** Retornem dados estruturados (dicionários e listas, prontos para JSON), com nomes verbais claros, docstrings que dizem **quando** usar cada uma e mensagens de erro instrutivas ("Tabela 'cliente' nao existe. Tabelas validas: clientes, pedidos, produtos"): o modelo lê o erro e se corrige sozinho. Nomes de tabela e coluna **não podem ser parametrizados** com `?` em SQL, então precisam ser validados contra a lista real do banco antes de entrarem em qualquer string: esse é o padrão que você vai implementar hoje.

**Foco da leitura (15 minutos).** Leia no manual do SQLite a tabela `sqlite_schema` (de onde vêm os metadados) e os *pragmas* `table_info` e `foreign_key_list`; depois a seção sobre `LIMIT` do `SELECT`; por último, a parte do guia do Gemini sobre boas práticas de declaração de funções (nomes, descrições e parâmetros). Em trio, respondam: *que informação de schema o modelo precisa para escrever um JOIN correto?*

* [SQLite: The schema table (sqlite_schema)](https://www.sqlite.org/schematab.html)
* [SQLite: PRAGMA statements (table_info, foreign_key_list)](https://www.sqlite.org/pragma.html)
* [SQLite: SELECT (cláusula LIMIT)](https://www.sqlite.org/lang_select.html)
* [Gemini API: Function calling (boas práticas de declaração)](https://ai.google.dev/gemini-api/docs/function-calling)

---

## 📋 4. Bloco 2: Módulo de Ferramentas de Schema & Metadados (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio (Novo Piloto no teclado).
* **Objetivo:** Criar o arquivo `src/tools/schema_tools.py`.
  - Conectar ao banco `data/dataops.db`.
  - Implementar as funções com tipagem Pydantic e docstrings explicativas:
    1. `listar_tabelas() -> list[str]`: consulta a tabela `sqlite_master` retornando os nomes das tabelas de dados.
    2. `descrever_schema_tabela(nome_tabela: str) -> dict`: executa `PRAGMA table_info()` retornando colunas, tipos de dados e restrições.
    3. `obter_chaves_estrangeiras(nome_tabela: str) -> list[dict]`: executa `PRAGMA foreign_key_list()` para que a LLM entenda as relações entre tabelas antes de escrever `JOIN`s.
**Antes de começar:** a partir de hoje os módulos importam uns aos outros pelo pacote `src`, então rode tudo **da raiz do repositório** com `python -m ...` (por exemplo `python -m src.tools.schema_tools`). Crie arquivos `__init__.py` vazios em `src/`, `src/database/`, `src/tools/`, `src/agent/` e `src/mcp_server/`.

**Scaffold de `src/tools/schema_tools.py`:** perceba que o validador de identificadores é o que impede que um nome de tabela malicioso vire SQL.

```python
from src.database.init_db import conectar


def _tabelas_existentes(conexao) -> list[str]:
    linhas = conexao.execute(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    ).fetchall()
    return [linha["name"] for linha in linhas]


def validar_tabela(conexao, nome_tabela: str) -> str:
    """Garante que o nome recebido e uma tabela real; caso contrario, explica quais existem."""
    tabelas = _tabelas_existentes(conexao)
    if nome_tabela not in tabelas:
        raise ValueError(f"Tabela '{nome_tabela}' nao existe. Tabelas validas: {', '.join(tabelas)}")
    return nome_tabela


def listar_tabelas() -> list[str]:
    """Lista os nomes de todas as tabelas de dados do banco. Use SEMPRE como primeiro passo."""
    with conectar() as conexao:
        # TODO: retorne _tabelas_existentes(conexao)
        ...


def descrever_schema_tabela(nome_tabela: str) -> dict:
    """Descreve as colunas de uma tabela: nome, tipo, se e obrigatoria e se e chave primaria."""
    with conectar() as conexao:
        validar_tabela(conexao, nome_tabela)
        colunas = []
        # TODO: percorra conexao.execute(f"PRAGMA table_info({nome_tabela})") e acrescente, para cada linha,
        #       {"nome": ..., "tipo": ..., "obrigatoria": bool(notnull), "chave_primaria": bool(pk)}
        return {"tabela": nome_tabela, "colunas": colunas}


def obter_chaves_estrangeiras(nome_tabela: str) -> list[dict]:
    """Lista as chaves estrangeiras de uma tabela. Use antes de escrever qualquer JOIN."""
    with conectar() as conexao:
        validar_tabela(conexao, nome_tabela)
        # TODO: percorra PRAGMA foreign_key_list e retorne
        #       [{"coluna_local": from, "tabela_referenciada": table, "coluna_referenciada": to}]
        ...


if __name__ == "__main__":
    print(listar_tabelas())
    print(descrever_schema_tabela("pedidos"))
    print(obter_chaves_estrangeiras("pedidos"))
    try:
        descrever_schema_tabela("pedidos; DROP TABLE clientes")
    except ValueError as erro:
        print("Bloqueado:", erro)
```

**Critério de sucesso:** as três funções retornam dados corretos para o domínio de vocês e a última chamada imprime `Bloqueado: Tabela '...' nao existe. Tabelas validas: ...`. Observem que o ataque de injeção foi barrado **sem** nenhum filtro de palavras: ele simplesmente não é uma tabela existente (o princípio de *lista de permissões*, superior a listas de proibições).

---

## 📊 5. Bloco 3: Módulo de Profiling Estatístico & Qualidade (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/tools/profiling_tools.py`.
  - Implementar ferramentas de auditoria analítica que respondem prontamente sobre a saúde dos dados:
    1. `contar_nulos_e_distintos(nome_tabela: str, nome_coluna: str) -> dict`: retorna total de linhas, contagem de nulos, percentual de preenchimento e valores únicos.
    2. `calcular_estatisticas_coluna(nome_tabela: str, nome_coluna: str) -> dict`: calcula `MIN`, `MAX`, `AVG` e `TOTAL` para colunas numéricas.
    3. `amostrar_linhas(nome_tabela: str, qtd: int = 5) -> list[dict]`: retorna uma amostra representativa de linhas para que o modelo entenda a formatação dos dados.
**Scaffold de `src/tools/profiling_tools.py`:** ferramentas para responder "qual a saúde desta coluna?".

```python
from src.database.init_db import conectar
from src.tools.schema_tools import validar_tabela


def _validar_coluna(conexao, nome_tabela: str, nome_coluna: str) -> str:
    colunas = [linha["name"] for linha in conexao.execute(f"PRAGMA table_info({nome_tabela})")]
    if nome_coluna not in colunas:
        raise ValueError(f"Coluna '{nome_coluna}' nao existe em '{nome_tabela}'. Colunas validas: {', '.join(colunas)}")
    return nome_coluna


def contar_nulos_e_distintos(nome_tabela: str, nome_coluna: str) -> dict:
    """Mede a qualidade de uma coluna: total de linhas, nulos, percentual preenchido e valores distintos."""
    with conectar() as conexao:
        validar_tabela(conexao, nome_tabela)
        _validar_coluna(conexao, nome_tabela, nome_coluna)
        # Identificadores ja validados acima: e seguro interpola-los no SQL
        linha = conexao.execute(
            f"SELECT COUNT(*) AS total, "
            f"SUM(CASE WHEN {nome_coluna} IS NULL THEN 1 ELSE 0 END) AS nulos, "
            f"COUNT(DISTINCT {nome_coluna}) AS distintos FROM {nome_tabela}"
        ).fetchone()
        total = linha["total"]
        nulos = linha["nulos"] or 0
        # TODO: calcule percentual_preenchido = (total - nulos) / total * 100 (0.0 se total == 0), arredondado a 2 casas
        percentual_preenchido = 0.0
        return {
            "tabela": nome_tabela,
            "coluna": nome_coluna,
            "total_linhas": total,
            "nulos": nulos,
            "distintos": linha["distintos"],
            "percentual_preenchido": percentual_preenchido,
        }


def calcular_estatisticas_coluna(nome_tabela: str, nome_coluna: str) -> dict:
    """Calcula minimo, maximo, media e soma de uma coluna NUMERICA (ex: preco, valor_total)."""
    with conectar() as conexao:
        validar_tabela(conexao, nome_tabela)
        _validar_coluna(conexao, nome_tabela, nome_coluna)
        # TODO: execute SELECT MIN, MAX, AVG e SUM da coluna e retorne um dicionario com as 4 estatisticas
        #       (arredonde a media e a soma a 2 casas; se a coluna for toda nula, os valores serao None)
        ...


def amostrar_linhas(nome_tabela: str, qtd: int = 5) -> list[dict]:
    """Retorna ate 20 linhas de exemplo de uma tabela, para o modelo entender o formato dos dados."""
    qtd = max(1, min(qtd, 20))
    with conectar() as conexao:
        validar_tabela(conexao, nome_tabela)
        # TODO: SELECT * com LIMIT ? (placeholder!) e converta cada sqlite3.Row em dict com dict(linha)
        ...


if __name__ == "__main__":
    print(contar_nulos_e_distintos("clientes", "email"))
    print(calcular_estatisticas_coluna("pedidos", "valor_total"))
    print(amostrar_linhas("produtos", 3))
```

**Critério de sucesso:** para os dados do exemplo, `contar_nulos_e_distintos("clientes", "email")` informa **6 nulos** e `percentual_preenchido` de **92.5**; as estatísticas de `valor_total` mostram um **mínimo negativo** (a anomalia injetada) e a amostra retorna 3 dicionários. Se o `SELECT` que usa `LIMIT ?` falhar, lembrem que placeholders valem para **valores**, nunca para nomes de tabela ou coluna.

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## ⚡ 7. Bloco 4: Ferramenta de Execução SQL com Paginação (15:45 - 16:10)

* **Tempo Dedicado:** 25 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o arquivo `src/tools/query_tools.py`.
  - Implementar `executar_query_analitica(query: str, limite_linhas: int = 50) -> dict`:
    - Inspecionar a query e assegurar a inclusão ou reforço de cláusula `LIMIT`.
    - Executar o cursor com `cursor.execute(query)`.
    - Recuperar os nomes das colunas via `cursor.description` e formatar as linhas em lista de dicionários (`[{"coluna": "valor"}]`).
    - Medir e retornar o tempo de execução em milissegundos.
**Scaffold de `src/tools/query_tools.py`:** o executor de consultas, com três camadas de proteção que já existem hoje: conexão **somente leitura** no nível do SQLite, `LIMIT` obrigatório e mensagens de erro úteis. (O guardrail completo entra no Dia 18.)

```python
import re
import sqlite3
import time

from src.database.init_db import CAMINHO_DB

LIMITE_MAXIMO = 50


def conectar_somente_leitura() -> sqlite3.Connection:
    """Abre o banco em modo read-only: mesmo que uma query maliciosa passe, o SQLite recusa a escrita."""
    conexao = sqlite3.connect(f"file:{CAMINHO_DB}?mode=ro", uri=True)
    conexao.row_factory = sqlite3.Row
    return conexao


def garantir_limit(query: str, limite: int) -> str:
    """Remove o ';' final e assegura uma cláusula LIMIT que nunca exceda `limite`."""
    query = query.strip().rstrip(";").strip()
    correspondencia = re.search(r"\blimit\s+(\d+)\s*$", query, flags=re.IGNORECASE)
    if correspondencia is None:
        # TODO: retorne a query com " LIMIT {limite}" acrescentado ao final
        ...
    if int(correspondencia.group(1)) > limite:
        # TODO: substitua o valor do LIMIT existente por `limite` e retorne a query
        ...
    return query


def executar_query_analitica(query: str, limite_linhas: int = 50) -> dict:
    """Executa uma consulta SQL de LEITURA (SELECT) e retorna colunas, linhas e o tempo gasto.

    Use somente depois de consultar o schema. O resultado e limitado a no maximo 50 linhas.
    """
    limite = max(1, min(limite_linhas, LIMITE_MAXIMO))
    query_final = garantir_limit(query, limite)
    inicio = time.perf_counter()
    try:
        with conectar_somente_leitura() as conexao:
            cursor = conexao.execute(query_final)
            # TODO: leia os nomes das colunas de cursor.description (primeiro item de cada tupla)
            colunas = []
            # TODO: converta cada linha de cursor.fetchall() em dict {coluna: valor}
            linhas = []
    except sqlite3.Error as erro:
        return {"sucesso": False, "erro": f"{type(erro).__name__}: {erro}", "query_executada": query_final}
    tempo_ms = round((time.perf_counter() - inicio) * 1000, 2)
    return {
        "sucesso": True,
        "query_executada": query_final,
        "colunas": colunas,
        "linhas": linhas,
        "total_linhas": len(linhas),
        "tempo_ms": tempo_ms,
    }


if __name__ == "__main__":
    print(executar_query_analitica("SELECT cidade, COUNT(*) AS total FROM clientes GROUP BY cidade"))
    print(executar_query_analitica("SELECT * FROM pedidos LIMIT 500")["total_linhas"])
    print(executar_query_analitica("SELECT coluna_inexistente FROM clientes"))
    # Prova da conexao somente leitura: tentamos escrever direto, sem passar pelo executor
    try:
        conectar_somente_leitura().execute("DELETE FROM clientes")
    except sqlite3.OperationalError as erro:
        print("Escrita recusada:", erro)
```

**Critério de sucesso:** a primeira chamada retorna as cidades com contagem e um `tempo_ms`; a segunda retorna **50** (LIMIT reduzido de 500); a terceira devolve `sucesso: False` com o nome da coluna problemática (esse erro alimenta a auto-recuperação do Dia 18); e a última tentativa imprime **`Escrita recusada: attempt to write a readonly database`**, prova de que a conexão somente leitura protege o banco mesmo sem guardrail. Anotem: *por que ainda precisaremos do guardrail no Dia 18 se o banco já recusa escritas?* (dica: vazamento de dados sensíveis, `ATTACH` de outros arquivos, consultas caras).

---

## 🤖 8. Bloco 5: Teste Preliminar de Function Calling com LLM (16:10 - 16:25)

* **Tempo Dedicado:** 15 minutos | **Formato:** Testes e Integração no Trio.
* **Objetivo:** Criar o script de verificação `src/agent/test_tools_llm.py`.
  - Declarar as funções dos 3 módulos criados como ferramentas para o `gemini-3.8-flash`.
  - Submeter uma pergunta de negócio real da base do trio (ex: *"Quantos registros nulos temos na tabela de clientes?"* ou *"Qual a média de vendas por produto?"*).
  - Validar que o Gemini escolhe autonomamente a ferramenta de schema ou profiling correta, executa e imprime a resposta final no terminal.
**Scaffold de `src/agent/test_tools_llm.py`:** aqui deixamos o SDK executar as ferramentas automaticamente (comportamento padrão do `google-genai` quando você passa funções Python em `tools`), já que a mecânica manual foi dominada nos Dias 12 e 13.

```python
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from src.tools.profiling_tools import amostrar_linhas, calcular_estatisticas_coluna, contar_nulos_e_distintos
from src.tools.query_tools import executar_query_analitica
from src.tools.schema_tools import descrever_schema_tabela, listar_tabelas, obter_chaves_estrangeiras

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

INSTRUCAO = (
    "Voce e um assistente de DataOps. Antes de escrever qualquer SQL, consulte o schema com as ferramentas. "
    "Nunca invente tabelas ou colunas. Responda em portugues, citando os numeros encontrados."
)

FERRAMENTAS = [
    # TODO: liste as 7 funcoes importadas acima (passe as funcoes Python, sem chama-las)
]

PERGUNTAS = [
    "Quantos registros nulos temos na coluna email da tabela de clientes?",
    "Qual a media de valor_total dos pedidos e existe algum valor suspeito?",
    "Quantos pedidos cada cidade de cliente possui? Mostre as 3 maiores.",
]

if __name__ == "__main__":
    config = types.GenerateContentConfig(system_instruction=INSTRUCAO, tools=FERRAMENTAS)
    for pergunta in PERGUNTAS:
        print("PERGUNTA:", pergunta)
        response = client.models.generate_content(model=MODEL, contents=pergunta, config=config)
        print("RESPOSTA:", response.text)
        # TODO: imprima o historico de chamadas automaticas: percorra response.automatic_function_calling_history
        #       e mostre o nome de cada function_call feita pelo modelo
        print("-" * 60)
```

Rode com `python -m src.agent.test_tools_llm`.

**Critério de sucesso:** as 3 respostas trazem números que batem com o banco (confira no `sqlite3`); na terceira, o histórico mostra que o modelo chamou primeiro ferramentas de **schema** (para descobrir como ligar `pedidos` a `clientes`) e só depois a query analítica. Se ele tentar escrever SQL sem olhar o schema, reforcem a instrução de sistema e testem de novo, registrando a diferença. Toda dupla deve conseguir dizer, ao final, qual das 7 ferramentas o modelo **nunca** usou e por quê.

---

## 🐙 9. Bloco 6: Sincronização no GitHub do Trio (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Executar testes locais dos módulos `schema_tools.py`, `profiling_tools.py` e `query_tools.py`, garantindo que não há falhas de importação, e sincronizar o repositório colaborativo via commit e push.

---

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_17.html`](quizzes/quiz_dia_17.html)
* **Formato:** Questões práticas sobre comandos `PRAGMA` do SQLite, técnicas de schema grounding, agregação estatística com SQL e estratégias de limitação de volume de dados retornados para a LLM.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_17.html`](quizzes/atividade_dia_17.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 17](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 17:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre Text-to-SQL e grounding de schemas concluída.
- [x] Módulo `schema_tools.py` implementado e inspecionando tabelas e chaves.
- [x] Módulo `profiling_tools.py` calculando métricas e detectando anomalias.
- [x] Módulo `query_tools.py` executando queries analíticas com limite de segurança.
- [x] Teste de integração `test_tools_llm.py` executando chamadas de função com `gemini-3.8-flash`.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 17 respondido no navegador.
- [x] Atividade interativa do Dia 17 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [Building more effective AI agents (Anthropic, YouTube)](https://www.youtube.com/watch?v=uhJJgc-0iTQ). Conversa curta sobre como projetar as ferramentas e o contexto que um agente recebe; associem o que ouvirem às escolhas de hoje (schema em fases, erros instrutivos, limite de linhas) e anotem 2 decisões que o trio tomou parecidas com as do vídeo.
2. 💻 **Código Bônus:** renderizar em tabela colorida no terminal o retorno de `executar_query_analitica`, destacando valores suspeitos. Instale com `pip install rich`. Salve como `src/tools/render_terminal.py`.

```python
from rich.console import Console
from rich.table import Table

from src.tools.query_tools import executar_query_analitica

console = Console()


def eh_suspeito(valor) -> bool:
    """Valores nulos ou numericos negativos merecem destaque."""
    # TODO: retorne True se valor for None ou (for int/float e menor que zero)
    ...


def imprimir_resultado(resultado: dict) -> None:
    if not resultado["sucesso"]:
        console.print(f"[bold red]Erro:[/bold red] {resultado['erro']}")
        return
    tabela = Table(title=f"{resultado['total_linhas']} linhas em {resultado['tempo_ms']} ms", header_style="bold cyan")
    for coluna in resultado["colunas"]:
        tabela.add_column(coluna)
    for linha in resultado["linhas"]:
        celulas = []
        for coluna in resultado["colunas"]:
            valor = linha[coluna]
            # TODO: se eh_suspeito(valor), use f"[bold red]{valor}[/bold red]"; senao str(valor)
            celulas.append(str(valor))
        tabela.add_row(*celulas)
    console.print(tabela)
    console.print(f"[dim]{resultado['query_executada']}[/dim]")


if __name__ == "__main__":
    imprimir_resultado(executar_query_analitica("SELECT id, valor_total FROM pedidos WHERE valor_total < 0"))
    imprimir_resultado(executar_query_analitica("SELECT id, email FROM clientes WHERE email IS NULL"))
```

Resultado esperado: duas tabelas coloridas com os pedidos negativos e os clientes sem e-mail destacados em vermelho, com a query executada exibida em cinza abaixo de cada uma.
