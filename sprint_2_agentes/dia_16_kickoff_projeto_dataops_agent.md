# 📅 Dia 16 (05/10 - Segunda-feira)
# 🚀 Kickoff do Projeto DataOps Agent: Arquitetura, Base SQLite & Setup Git

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "DataOps Agent" em Trios  

---

## 🎯 1. Objetivos do Encontro
1. Realizar o **Kickoff Oficial do Projeto *DataOps Agent***, compreendendo a arquitetura modular completa (SQLite + MCP + ReAct + Guardrails + Streamlit) para o Demo Day 2 da Sprint 2.
2. Definir o domínio temático de dados de cada trio e documentar o dicionário de dados analíticos (entidades, tipos de colunas, chaves primárias e relacionamentos).
3. Modelar o banco relacional local em **SQLite** (`data/dataops.db`) e criar o script `src/database/init_db.py` com no mínimo 3 tabelas conectadas por chaves estrangeiras (`FOREIGN KEY`).
4. Desenvolver o script de carga `src/database/seed_data.py` com dados realistas, injetando deliberadamente anomalias (valores nulos em campos críticos, duplicatas e outliers) para o agente auditar nos próximos dias.
5. Configurar o repositório Git colaborativo do trio com estrutura modular de pastas, `.gitignore` seguro e definição da escala rotativa de Piloto/Copiloto.
6. Executar o **Smoke Test Cruzado** (`tests/smoke_test_db.py`): validar que todos os 3 integrantes conseguem clonar o repositório, inicializar a base e executar consultas de verificação.
7. Consolidar os conceitos no **Quiz Interativo** e na **Atividade Interativa** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Padrões de DataOps Agent │
│ 14:20 - 14:40   │ Bloco 2: Alinhamento no Trio & Dicionário de Dados     │
│ 14:40 - 15:00   │ Bloco 3: Modelagem Relacional & DDL do SQLite          │
│ 15:00 - 15:30   │ Bloco 4: Carga de Dados Realistas & Injeção Anomalias  │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:05   │ Bloco 5: Setup do Repositório Git Modular              │
│ 16:05 - 16:25   │ Bloco 6: Smoke Test Cruzado do Banco no Trio           │
│ 16:25 - 16:35   │ Bloco 7: Sincronização no GitHub do Trio (v0.1-setup)  │
│ 16:35 - 16:45   │ Bloco 8: Quiz + Atividade Interativa (dia 16)          │
│ 16:45 - 17:00   │ Bloco 9: Formulário Diário de Auto-Avaliação & Feedback│
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
* **Foco Teórico:** O papel do DataOps na indústria (auditoria contínua da integridade de dados, automação de consultas repetitivas e governança), e como arquiteturas agênticas locais com SQLite eliminam complexidade de infraestrutura.
**O que é DataOps e por que um agente combina com ele.** *DataOps* aplica ao mundo dos dados as práticas de DevOps: automação, testes contínuos, versionamento e monitoramento da qualidade. Em uma empresa como a DataLakers, uma parte enorme do dia de um analista é *repetição*: "essa coluna está preenchida?", "quantos registros duplicados temos?", "o pipeline de ontem carregou tudo?". São perguntas que seguem sempre o mesmo caminho: olhar o schema, rodar uma consulta, interpretar o resultado. Esse caminho é exatamente o que o loop de agente da Semana 1 sabe percorrer, e é por isso que o nosso projeto é um **assistente que audita bases de dados**.

**Por que SQLite.** O SQLite é um banco relacional completo (SQL padrão, chaves estrangeiras, índices, transações) que vive em **um único arquivo** e vem embutido no Python (`import sqlite3`). Não há servidor, senha, Docker ou instalação: o banco do trio é um arquivo `data/dataops.db` que qualquer notebook consegue recriar em segundos. É por isso que ele é usado em celulares, navegadores e prototipagem de produtos de dados. Como o arquivo é reconstruído por scripts, ele **não vai para o Git**; o que vai para o Git é o *código* que o gera, e essa é uma das ideias centrais do DataOps: tudo reprodutível.

**Modelar antes de programar.** Um banco bem desenhado é metade do trabalho do agente: nomes de coluna claros, tipos corretos, chaves primárias e estrangeiras explícitas e uma documentação (o *dicionário de dados*) que responde "o que significa cada coluna". Lembre que o modelo de linguagem vai enxergar esse schema para escrever SQL; nomes obscuros como `c1` ou `vl` geram consultas erradas, e nomes como `valor_total_brl` geram consultas certas. E, para que o agente tenha o que auditar, vamos **injetar anomalias de propósito** na carga de dados (nulos, duplicatas, valores absurdos), como um laboratório de testes.

**Foco da leitura (15 minutos, individual, depois 5 minutos de alinhamento no trio).** Leia "When To Use SQLite" (entenda onde o SQLite brilha), o trecho de tipos de dados (*datatype3*: o SQLite tem tipagem flexível, portanto validação vale a pena), o capítulo de chaves estrangeiras (e por que precisam ser ativadas por conexão) e o verbete de DataOps. Cada integrante traz uma pergunta para o alinhamento.

* [SQLite: Appropriate Uses For SQLite](https://www.sqlite.org/whentouse.html)
* [SQLite: Datatypes In SQLite](https://www.sqlite.org/datatype3.html)
* [SQLite: Foreign Key Support](https://www.sqlite.org/foreignkeys.html)
* [Python: módulo `sqlite3`](https://docs.python.org/3/library/sqlite3.html)
* [DataOps (visão geral)](https://en.wikipedia.org/wiki/DataOps)

---

## 🧭 4. Bloco 2: Alinhamento no Trio & Dicionário de Dados (14:20 - 14:40)

* **Tempo Dedicado:** 20 minutos | **Formato:** Dinâmica em Trio.
* **Objetivo:**
  - Bater o martelo no domínio de dados do trio (ex: *E-commerce de Varejo*, *Telemetria de Servidores Cloud*, *Faturamento de Saúde* ou *Gestão de Frotas*).
  - Preencher o documento `docs/dicionario_dados.md` descrevendo:
    - Nome de cada uma das 3 tabelas mínimas.
    - Colunas, tipos SQLite (`INTEGER`, `TEXT`, `REAL`, `DATETIME`) e restrições (`PRIMARY KEY`, `NOT NULL`, `FOREIGN KEY`).
    - Pelo menos 5 perguntas de negócio que o assistente precisará responder ao final do projeto.
Crie `docs/dicionario_dados.md` a partir do modelo abaixo (o exemplo usa o domínio *E-commerce de Varejo*; substituam pelo domínio de vocês, mantendo no mínimo 3 tabelas ligadas por chaves estrangeiras):

```markdown
# Dicionario de Dados: <nome do dominio do trio>

Trio: <nomes>  |  Banco: data/dataops.db (SQLite)

## Tabela: clientes
Descricao: uma linha por pessoa cadastrada na loja.

| Coluna | Tipo | Restricoes | Descricao |
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY | Identificador do cliente |
| nome | TEXT | NOT NULL | Nome completo |
| email | TEXT | (pode ser nulo; anomalia esperada) | E-mail de contato |
| cidade | TEXT | NOT NULL | Cidade de cadastro |
| criado_em | DATETIME | NOT NULL | Data do cadastro (AAAA-MM-DD) |

## Tabela: produtos
<preencha: id, nome, categoria, preco (REAL, deve ser > 0)>

## Tabela: pedidos
<preencha: id, cliente_id (FOREIGN KEY -> clientes.id), produto_id (FOREIGN KEY -> produtos.id), quantidade, valor_total, data_pedido>

## Relacionamentos
- clientes 1 --- N pedidos
- produtos 1 --- N pedidos

## Perguntas de negocio que o assistente precisara responder
1. Quantos clientes nao possuem e-mail cadastrado?
2. Qual categoria de produto gera o maior faturamento?
3. Existem pedidos com valor negativo? Quantos?
4. Quais e-mails aparecem duplicados na base de clientes?
5. Qual o ticket medio por cidade?

## Anomalias que planejamos injetar (para o agente encontrar)
- 6 clientes sem e-mail; 3 e-mails duplicados
- 4 produtos com preco zero
- 5 pedidos com valor negativo; 3 pedidos com data no futuro
```

**Critério de sucesso:** documento com 3 ou mais tabelas descritas coluna a coluna, relacionamentos explícitos, **5 perguntas de negócio** que só podem ser respondidas com dados dessas tabelas (evitem perguntas que exigiriam dados que não existem) e a lista de anomalias planejadas com quantidades exatas, porque o smoke test do Bloco 6 vai conferi-las.

---

## 🏛️ 5. Bloco 3: Modelagem Relacional & DDL do SQLite (14:40 - 15:00)

* **Tempo Dedicado:** 20 minutos | **Formato:** Codificação em Trio (Piloto no teclado).
* **Objetivo:** Criar o script `src/database/init_db.py`.
  - Conectar ao arquivo local `data/dataops.db` utilizando `sqlite3` nativo do Python (zero dependências externas).
  - Executar os comandos DDL (`CREATE TABLE IF NOT EXISTS`) garantindo ativação de chaves estrangeiras com `PRAGMA foreign_keys = ON;`.
  - Criar índices nas colunas mais consultadas para otimização analítica.
**Scaffold de `src/database/init_db.py`:** o exemplo cria `clientes` por completo; o trio implementa as demais tabelas conforme o próprio dicionário de dados. Nenhuma dependência externa: só a biblioteca padrão.

```python
import sqlite3
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
CAMINHO_DB = RAIZ / "data" / "dataops.db"


def conectar(caminho: Path = CAMINHO_DB) -> sqlite3.Connection:
    caminho.parent.mkdir(parents=True, exist_ok=True)
    conexao = sqlite3.connect(caminho)
    conexao.row_factory = sqlite3.Row
    # As chaves estrangeiras do SQLite vem DESLIGADAS por padrao: ligue em TODA conexao
    conexao.execute("PRAGMA foreign_keys = ON;")
    return conexao


DDL = """
CREATE TABLE IF NOT EXISTS clientes (
    id         INTEGER PRIMARY KEY,
    nome       TEXT NOT NULL,
    email      TEXT,
    cidade     TEXT NOT NULL,
    criado_em  DATETIME NOT NULL
);

-- TODO: crie a tabela produtos (id, nome, categoria, preco REAL NOT NULL)

-- TODO: crie a tabela pedidos com:
--   id INTEGER PRIMARY KEY, cliente_id INTEGER NOT NULL, produto_id INTEGER NOT NULL,
--   quantidade INTEGER NOT NULL, valor_total REAL NOT NULL, data_pedido DATETIME NOT NULL,
--   FOREIGN KEY (cliente_id) REFERENCES clientes(id),
--   FOREIGN KEY (produto_id) REFERENCES produtos(id)

-- TODO: crie 2 indices nas colunas mais consultadas, por exemplo:
--   CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
"""


def criar_tabelas(conexao: sqlite3.Connection) -> None:
    # TODO: execute o script DDL inteiro com conexao.executescript(DDL) e faca commit
    ...


def resetar_banco() -> None:
    """Apaga o arquivo do banco (se existir) para recomecar do zero."""
    if CAMINHO_DB.exists():
        CAMINHO_DB.unlink()


if __name__ == "__main__":
    resetar_banco()
    with conectar() as conexao:
        criar_tabelas(conexao)
        tabelas = conexao.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
        ).fetchall()
        print("Tabelas criadas:", [linha["name"] for linha in tabelas])
        print("Chaves estrangeiras ativas:", conexao.execute("PRAGMA foreign_keys").fetchone()[0])
```

Execute a partir da **raiz do repositório**: `python src/database/init_db.py`.

**Critério de sucesso:** o terminal mostra `Tabelas criadas: ['clientes', 'pedidos', 'produtos']` (ou as tabelas do domínio de vocês) e `Chaves estrangeiras ativas: 1`. Teste rápido de FK: no console do `sqlite3` (ou em um script) tente inserir um pedido com `cliente_id = 9999` e confirme que o SQLite **recusa** com `FOREIGN KEY constraint failed`. Comente na dupla: *o que aconteceria se esquecêssemos o `PRAGMA foreign_keys = ON`?*

---

## 🧪 6. Bloco 4: Carga de Dados Realistas & Injeção de Anomalias (15:00 - 15:30)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Trio.
* **Objetivo:** Criar o script `src/database/seed_data.py`.
  - Inserir um volume representativo de dados (mínimo de 50 a 100 linhas por tabela) para permitir agregações reais (`COUNT`, `SUM`, `AVG`, `GROUP BY`).
  - **Injeção Deliberada de Anomalias de Dados:** Inserir propositalmente casos de teste para o agente auditar nos próximos dias:
    - Registros com campos nulos onde deveriam existir valores (ex: e-mail nulo, preço zerado).
    - Registros inconsistentes ou outliers (ex: pedido com data no futuro ou valor negativo).
**Scaffold de `src/database/seed_data.py`:** a geração é **determinística** (`random.Random(42)`): os 3 integrantes obtêm exatamente o mesmo banco, o que torna o smoke test comparável. As anomalias ficam registradas em `ANOMALIAS_ESPERADAS` para que os testes conheçam os números certos.

```python
import random
from datetime import date, timedelta

from init_db import conectar, criar_tabelas, resetar_banco

rng = random.Random(42)

ANOMALIAS_ESPERADAS = {
    "clientes_sem_email": 6,
    "emails_duplicados": 3,
    "produtos_preco_zero": 4,
    "pedidos_valor_negativo": 5,
    "pedidos_data_futura": 3,
}

NOMES = ["Ana", "Bruno", "Carla", "Diego", "Elisa", "Fabio", "Gisele", "Hugo", "Iara", "Jonas"]
SOBRENOMES = ["Silva", "Souza", "Lima", "Costa", "Rocha", "Alves", "Pereira", "Martins"]
CIDADES = ["Porto Alegre", "Canoas", "Gramado", "Pelotas", "Caxias do Sul"]
CATEGORIAS = ["Eletronicos", "Livros", "Casa", "Esporte", "Moda"]


def gerar_clientes(qtd: int = 80) -> list[tuple]:
    linhas = []
    for i in range(1, qtd + 1):
        nome = f"{rng.choice(NOMES)} {rng.choice(SOBRENOMES)}"
        email = f"cliente{i}@exemplo.com"
        criado = date(2025, 1, 1) + timedelta(days=rng.randint(0, 600))
        linhas.append([i, nome, email, rng.choice(CIDADES), criado.isoformat()])
    # Anomalia 1: e-mails nulos nos 6 primeiros clientes
    for linha in linhas[: ANOMALIAS_ESPERADAS["clientes_sem_email"]]:
        linha[2] = None
    # TODO: Anomalia 2: faca os clientes de indice 10, 11 e 12 usarem o MESMO e-mail ("duplicado@exemplo.com")
    return [tuple(linha) for linha in linhas]


def gerar_produtos(qtd: int = 60) -> list[tuple]:
    # TODO: gere `qtd` produtos (id, nome, categoria, preco entre 10.0 e 900.0 com 2 casas)
    # TODO: Anomalia 3: zere o preco dos 4 primeiros produtos
    ...


def gerar_pedidos(qtd: int, clientes: list[tuple], produtos: list[tuple]) -> list[tuple]:
    # TODO: para cada pedido, sorteie um cliente e um produto EXISTENTES (respeite as FKs; sorteie apenas produtos com preco > 0,
    #       senao o valor_total negativo da anomalia 4 viraria zero),
    #       quantidade de 1 a 5, valor_total = preco * quantidade (2 casas) e data nos ultimos 300 dias
    # TODO: Anomalia 4: valor_total negativo (estorno mal lancado) em 5 pedidos
    # TODO: Anomalia 5: data_pedido no futuro (ano 2030) em 3 pedidos DIFERENTES dos anteriores
    ...


def popular() -> None:
    resetar_banco()
    with conectar() as conexao:
        criar_tabelas(conexao)
        clientes = gerar_clientes()
        produtos = gerar_produtos()
        pedidos = gerar_pedidos(150, clientes, produtos)
        conexao.executemany("INSERT INTO clientes VALUES (?, ?, ?, ?, ?)", clientes)
        # TODO: insira produtos e pedidos com executemany e placeholders "?" (nunca f-strings em SQL)
        conexao.commit()
        for tabela in ("clientes", "produtos", "pedidos"):
            total = conexao.execute(f"SELECT COUNT(*) FROM {tabela}").fetchone()[0]
            print(f"{tabela}: {total} linhas")


if __name__ == "__main__":
    popular()
```

Execute a partir da raiz: `python src/database/seed_data.py`.

**Critério de sucesso:** impressão de `clientes: 80`, `produtos: 60` e `pedidos: 150` (mínimo exigido: 50 linhas por tabela). Confira as anomalias direto no SQL, por exemplo `SELECT COUNT(*) FROM clientes WHERE email IS NULL;` deve retornar **6**; `SELECT email, COUNT(*) FROM clientes GROUP BY email HAVING COUNT(*) > 1;` deve mostrar o e-mail duplicado com contagem **3**. Regra de ouro do trio: **nenhum valor literal vai dentro de f-string em SQL**, somente placeholders `?` (o motivo será o assunto do Dia 18).

---

## ☕ 7. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre os trios.

---

## 📂 8. Bloco 5: Setup do Repositório Git Modular (15:45 - 16:05)

* **Tempo Dedicado:** 20 minutos | **Formato:** Trabalho Colaborativo em Trio.
* **Objetivo:**
  - Inicializar o repositório colaborativo no GitHub compartilhado entre os 3 membros.
  - Estruturar o projeto com pastas modulares:
    ```
    dataops-agent/
    ├── src/
    │   ├── database/     # Scripts DDL, seed e conexão SQLite
    │   ├── tools/        # Ferramentas analíticas e de schema
    │   ├── agent/        # Loop ReAct e guardrails de segurança
    │   └── mcp_server/   # Servidor FastMCP local
    ├── data/             # dataops.db (e .gitkeep)
    ├── tests/            # Scripts de teste automatizado e smoke tests
    ├── docs/             # Dicionário de dados e arquitetura
    ├── app.py            # Interface Streamlit
    ├── .gitignore        # Ignorando .env, __pycache__, etc.
    └── README.md         # Documentação e instruções de execução
    ```
  - Definir a escala de **Piloto Rotativo** no `README.md` para os Dias 16, 17, 18, 19 e 20.
Crie `.gitignore` na raiz do repositório do trio (o `.env` é obrigatório, sem exceção):

```gitignore
# Segredos: NUNCA versionar
.env

# Python
__pycache__/
*.pyc
.venv/

# Banco de dados gerado (recriado por init_db.py e seed_data.py)
data/*.db
!data/.gitkeep

# Ferramentas
.DS_Store
.streamlit/secrets.toml
```

Crie também o arquivo vazio `data/.gitkeep` (para o Git manter a pasta) e o `requirements.txt` com o mínimo do projeto:

```text
google-genai
python-dotenv
mcp<2
streamlit
pydantic
```

**Regras de trabalho colaborativo em trio** (copiem para o `README.md`, junto com a escala de pilotos):

```markdown
## Como trabalhamos
- Piloto (teclado): escreve o codigo. Copilotos: pesquisam, revisam e testam ao vivo.
- O piloto muda todo dia. Escala: Dia 16 = <nome>, Dia 17 = <nome>, Dia 18 = <nome>, Dia 19 = <nome>, Dia 20 = <nome> (pitch: todos).
- Commits pequenos, mensagem no padrao "feat: ...", "fix: ...", "docs: ...".
- Ninguem faz push direto quebrando a execucao de outro: rode "python tests/smoke_test_db.py" antes de cada push.
- Ao comecar o dia: git pull. Ao terminar: git push e tag do dia (v0.1-setup no Dia 16).
- Conflito no Git: resolver juntos, na mesma tela.

## Como rodar
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/database/init_db.py
python src/database/seed_data.py
```

**Critério de sucesso:** o repositório no GitHub contém as pastas modulares, `.gitignore`, `requirements.txt`, `README.md` com a escala de pilotos e **não contém** `.env` nem `dataops.db`. Verifiquem com `git ls-files`. Um integrante confere o `.gitignore` de outro **antes** do primeiro push.

---

## 🔍 9. Bloco 6: Smoke Test Cruzado do Banco no Trio (16:05 - 16:25)

* **Tempo Dedicado:** 20 minutos | **Formato:** Teste Cruzado nas Máquinas dos 3 Integrantes.
* **Objetivo:** Criar o script `tests/smoke_test_db.py`.
  - Cada membro do trio faz pull do código em seu próprio notebook e executa o script de teste.
  - O script verifica: integridade do arquivo `dataops.db`, contagem de registros em cada tabela, execução de uma query com `JOIN` e detecção dos registros anômalos injetados.
  - Os 3 membros devem obter 100% de sucesso na execução local.
**Scaffold de `tests/smoke_test_db.py`:** um teste de fumaça que qualquer integrante roda em sua máquina. Ele sai com código diferente de zero se algo estiver errado.

```python
import sqlite3
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RAIZ / "src" / "database"))

from init_db import CAMINHO_DB, conectar  # noqa: E402
from seed_data import ANOMALIAS_ESPERADAS  # noqa: E402

resultados = []


def checar(nome: str, condicao: bool, detalhe: str = "") -> None:
    resultados.append(condicao)
    print(f"[{'OK' if condicao else 'FALHA'}] {nome} {detalhe}")


def escalar(conexao: sqlite3.Connection, sql: str):
    return conexao.execute(sql).fetchone()[0]


def main() -> int:
    checar("arquivo dataops.db existe", CAMINHO_DB.exists())
    if not CAMINHO_DB.exists():
        print("Rode primeiro: python src/database/init_db.py && python src/database/seed_data.py")
        return 1

    with conectar() as conexao:
        checar("integridade do arquivo", escalar(conexao, "PRAGMA integrity_check") == "ok")

        for tabela in ("clientes", "produtos", "pedidos"):
            total = escalar(conexao, f"SELECT COUNT(*) FROM {tabela}")
            checar(f"{tabela} tem 50+ linhas", total >= 50, f"({total})")

        # TODO: execute uma query com JOIN (pedidos + clientes) que retorne ao menos 1 linha
        #       e confira com checar("JOIN pedidos-clientes funciona", ...)

        # TODO: confira CADA anomalia contra ANOMALIAS_ESPERADAS usando SQL:
        #   clientes_sem_email      -> SELECT COUNT(*) FROM clientes WHERE email IS NULL
        #   produtos_preco_zero     -> SELECT COUNT(*) FROM produtos WHERE preco = 0
        #   pedidos_valor_negativo  -> SELECT COUNT(*) FROM pedidos WHERE valor_total < 0
        #   pedidos_data_futura     -> SELECT COUNT(*) FROM pedidos WHERE data_pedido > date('now')
        #   emails_duplicados       -> linhas em clientes cujo email aparece mais de uma vez (nao nulo)

        # TODO: confira que uma insercao com cliente_id inexistente e recusada (sqlite3.IntegrityError)

    total_ok = sum(resultados)
    print(f"\n{total_ok}/{len(resultados)} verificacoes aprovadas")
    return 0 if all(resultados) else 1


if __name__ == "__main__":
    sys.exit(main())
```

**Critério de sucesso:** os **três** integrantes, cada um em sua máquina, executam `git pull`, recriam o banco (`init_db.py` + `seed_data.py`) e obtêm `N/N verificacoes aprovadas` com o mesmo `N`. Se alguém divergir, investiguem juntos: a causa costuma ser dependência de ordem de arquivos, um `.env` ausente ou uma versão diferente do Python (`python --version`).

---

## 🐙 10. Bloco 7: Sincronização no GitHub do Trio (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Realizar a primeira entrega oficial de código da Semana 2 no GitHub do trio com a tag `v0.1-setup`, garantindo que todo o trio possui exatamente a mesma base sincronizada.

---

## 🧠 11. Bloco 8: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_16.html`](quizzes/quiz_dia_16.html)
* **Formato:** Questões práticas sobre modelagem relacional em SQLite, integridade referencial com chaves estrangeiras, boas práticas de semente de dados e estrutura de repositórios modulares.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_16.html`](quizzes/atividade_dia_16.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 12. Bloco 9: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 16](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 16:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura de arquitetura DataOps concluída.
- [x] Domínio e dicionário de dados definidos em `docs/dicionario_dados.md`.
- [x] Tabelas relacionais criadas via `src/database/init_db.py`.
- [x] Base populada com dados realistas e anomalias via `src/database/seed_data.py`.
- [x] Repositório Git modular configurado com escala de pilotos.
- [x] Smoke test cruzado aprovado na máquina de todos os 3 integrantes.
- [x] Repositório sincronizado no GitHub com tag `v0.1-setup`.
- [x] Quiz interativo do Dia 16 respondido no navegador.
- [x] Atividade interativa do Dia 16 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [SQLite Databases With Python, curso completo (freeCodeCamp.org, YouTube)](https://www.youtube.com/watch?v=byHcYRpMgI4). Curso longo: assistam apenas os trechos sobre criação de tabelas, tipos e consultas com `WHERE`/`ORDER BY`, e comparem com o `init_db.py` do trio; anotem 2 coisas que o vídeo faz diferente de vocês (por exemplo, o uso de `cursor` versus `conexao.execute`).
2. 💻 **Código Bônus:** gerar automaticamente um diagrama ER (em sintaxe Mermaid) a partir do schema real do banco, para colar no `docs/` do projeto ou no GitHub. Salve como `src/database/gerar_er.py`.

```python
from init_db import conectar

TIPOS = {"INTEGER": "int", "TEXT": "string", "REAL": "float", "DATETIME": "datetime"}


def listar_tabelas(conexao) -> list[str]:
    linhas = conexao.execute(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    ).fetchall()
    return [linha["name"] for linha in linhas]


def gerar_mermaid() -> str:
    saida = ["erDiagram"]
    relacoes = []
    with conectar() as conexao:
        for tabela in listar_tabelas(conexao):
            saida.append(f"    {tabela} {{")
            # TODO: para cada linha de conexao.execute(f"PRAGMA table_info({tabela})"), escreva
            #       "        tipo nome" (converta o tipo com TIPOS.get(tipo.upper(), "string")) e acrescente PK quando pk == 1
            saida.append("    }")
            # TODO: para cada linha de conexao.execute(f"PRAGMA foreign_key_list({tabela})"), acrescente em relacoes:
            #       f"    {linha['table']} ||--o{{ {tabela} : \"{linha['from']}\""
    return "\n".join(saida + relacoes)


if __name__ == "__main__":
    print(gerar_mermaid())
```

Resultado esperado: um bloco começando em `erDiagram` com as 3 tabelas e 2 relações (`clientes ||--o{ pedidos` e `produtos ||--o{ pedidos`). Cole a saída em um bloco ` ```mermaid ` no `README.md` e veja o diagrama renderizado no GitHub.
