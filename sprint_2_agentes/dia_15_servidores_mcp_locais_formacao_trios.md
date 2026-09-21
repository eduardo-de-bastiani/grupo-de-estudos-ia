# 📅 Dia 15 (02/10 - Sexta-feira)
# 🛠️ Criando Servidores MCP Locais em Python & Formação dos Trios da Sprint 2

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Construir **Servidores MCP Locais** em Python utilizando a biblioteca de alto nível **FastMCP**, simplificando a criação de endpoints de ferramentas através de decoradores `@mcp.tool`.
2. Implementar ferramentas customizadas com tipagem estrita via Pydantic, parâmetros com valores padrão (default) e docstrings ricas que servem de instrução para a LLM.
3. Executar testes de depuração local e validação de contratos utilizando um cliente de teste antes de conectar modelos de linguagem.
4. Conectar o modelo `gemini-3.8-flash` de ponta a ponta ao servidor FastMCP local, realizando uma sessão completa de assistência agêntica via `stdio`.
5. Realizar a **formação oficial dos 5 novos trios** para o desenvolvimento do projeto *DataOps Agent* na Semana 2, alinhando o domínio de dados de cada equipe.
6. Consolidar os conceitos da Semana 1 no **Quiz Interativo** e na **Atividade Interativa** antes do formulário semanal de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: FastMCP em Python        │
│ 14:20 - 14:50   │ Bloco 2: Criação do Servidor FastMCP Multi-Tool        │
│ 14:50 - 15:30   │ Bloco 3: Teste e Depuração Isolada do Servidor MCP     │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: Agente Gemini com FastMCP    │
│ 16:15 - 16:35   │ Bloco 5: Formação dos 5 Novos Trios & Brainstorming    │
│ 16:35 - 16:45   │ Bloco 6: Quiz + Atividade Interativa (dia 15)          │
│ 16:45 - 17:00   │ Bloco 7: Formulário Diário de Auto-Avaliação & Feedback│
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

* **Tempo Dedicado:** 15 minutos (leitura individual em silêncio).
* **Foco Teórico:** A abstração FastMCP: como ela utiliza type hints e docstrings do Python para inferir os esquemas JSON-RPC do MCP automaticamente, reduzindo centenas de linhas de boilerplate em poucas linhas declarativas.
**Do protocolo ao servidor em 20 linhas.** Ontem você viu o protocolo por dentro: envelopes JSON-RPC, handshake, `tools/list`. Escrever um servidor MCP nesse nível seria repetitivo e propenso a erros, e é por isso que o SDK oficial traz o **FastMCP**, uma camada de alto nível em que você só escreve funções Python e o resto é inferido. Você decora a função com `@mcp.tool()` e o FastMCP lê o **nome**, os **type hints** e a **docstring** para gerar sozinho o JSON Schema que o cliente receberá em `tools/list`. Trocando em miúdos: o que no Dia 12 era a declaração de ferramentas do Gemini agora é uma descrição *portável*, que qualquer cliente MCP entende.

**O que o FastMCP faz por você.** Registra ferramentas, resources e prompts; responde ao handshake; valida os argumentos recebidos contra os type hints (se o cliente mandar uma string onde a função espera `int`, o erro é devolvido sem sequer executar a função); e converte exceções em respostas de erro padronizadas (`isError=True`), de modo que uma falha na ferramenta **não derruba o servidor**. Para o modelo, essa mensagem de erro é uma observação como outra qualquer e ele pode se corrigir, exatamente como fizemos no Dia 12.

**Boas práticas que valem nota.** Docstrings claras (elas são o manual de instruções para o modelo), nomes de ferramentas verbais e específicos, argumentos simples e tipados, validação **dentro** da ferramenta (nunca confie que o modelo enviou um caminho ou uma unidade válidos) e **nada de `print()`**: no transporte `stdio` o `stdout` pertence ao protocolo, então logs vão para `sys.stderr`. Lembre-se também de que uma ferramenta é código que roda na sua máquina a pedido de um modelo; por isso, limite o que ela pode tocar (hoje: só leitura de arquivos, nada de escrita).

**Foco da leitura (15 minutos).** Comece pelo tutorial oficial "Build an MCP server" (siga o exemplo até entender o padrão decorador + `mcp.run`), depois leia a seção de *Tools* e *Resources* do README do SDK Python e, por fim, dê uma olhada no MCP Inspector, ferramenta visual que permite testar um servidor sem escrever cliente algum.

* [MCP: Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server)
* [MCP Python SDK: README (FastMCP, tools, resources)](https://github.com/modelcontextprotocol/python-sdk)
* [MCP Inspector: depuração visual de servidores](https://modelcontextprotocol.io/docs/tools/inspector)

---

## 💻 4. Bloco 2: Criação do Servidor FastMCP Multi-Tool (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o arquivo `dia_15/server_utils.py`.
  - Instanciar `mcp = FastMCP("ServidorUtilidades")`.
  - Implementar 3 ferramentas práticas:
    1. `calcular_hash_arquivo(caminho: str) -> str`: calcula SHA-256 de um arquivo local.
    2. `contar_linhas_codigo(diretorio: str, extensao: str = ".py") -> dict`: analisa arquivos em uma pasta.
    3. `converter_temperatura(valor: float, de: str, para: str) -> float`: cálculo determinístico com validação.
  - Executar o servidor via terminal e verificar que o processo inicializa ouvindo no canal `stdio`.
**Scaffold de `dia_15/server_utils.py`:** um servidor utilitário de arquivos, somente leitura. Instale (se ainda não fez): `pip install "mcp<2"`.

```python
import hashlib
import sys
from pathlib import Path
from typing import Annotated

from mcp.server.fastmcp import FastMCP
from pydantic import Field

mcp = FastMCP("server-utils")


@mcp.tool()
def calcular_hash_arquivo(
    caminho: Annotated[str, Field(description="Caminho do arquivo local, relativo ou absoluto")],
) -> str:
    """Calcula o hash SHA-256 (em hexadecimal) do conteudo de um arquivo local."""
    arquivo = Path(caminho)
    if not arquivo.is_file():
        raise ValueError(f"Arquivo nao encontrado: {caminho}")
    # TODO: leia os bytes do arquivo (arquivo.read_bytes()) e retorne hashlib.sha256(...).hexdigest()
    ...


@mcp.tool()
def contar_linhas_codigo(
    diretorio: Annotated[str, Field(description="Pasta a ser analisada")],
    extensao: Annotated[str, Field(description="Extensao dos arquivos, com ponto")] = ".py",
) -> dict:
    """Conta arquivos e linhas de codigo de uma pasta (recursivo) para uma extensao."""
    pasta = Path(diretorio)
    if not pasta.is_dir():
        raise ValueError(f"Diretorio nao encontrado: {diretorio}")
    total_arquivos = 0
    total_linhas = 0
    # TODO: percorra pasta.rglob(f"*{extensao}"); para cada arquivo some 1 em total_arquivos
    #       e o numero de linhas do texto (use read_text(errors="ignore").splitlines())
    return {"extensao": extensao, "arquivos": total_arquivos, "linhas": total_linhas}


@mcp.tool()
def converter_temperatura(valor: float, de: str, para: str) -> float:
    """Converte temperatura entre C (Celsius), F (Fahrenheit) e K (Kelvin)."""
    unidades = {"C", "F", "K"}
    de, para = de.upper(), para.upper()
    if de not in unidades or para not in unidades:
        raise ValueError("Unidades validas: C, F, K")
    # TODO: converta primeiro para Celsius e depois para a unidade de destino; retorne arredondado a 2 casas
    ...


if __name__ == "__main__":
    print("server-utils iniciado (stdio)", file=sys.stderr)  # logs SEMPRE em stderr
    mcp.run(transport="stdio")
```

**Critério de sucesso (teste visual, sem cliente):** rode `npx @modelcontextprotocol/inspector python server_utils.py` (requer Node.js; se não tiver, pule para o Bloco 3, onde o cliente de testes cumpre o mesmo papel) e chame as 3 ferramentas pela interface. Sem o Inspector, rode `python server_utils.py`: o processo deve ficar **parado esperando entrada** e imprimir apenas a mensagem de `stderr`. Isso é o comportamento correto de um servidor `stdio`.

---

## 🔍 5. Bloco 3: Teste e Depuração Isolada do Servidor MCP (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação e Testes em Duplas.
* **Objetivo:** Criar o script `dia_15/02_test_mcp_server.py`.
  - Escrever um cliente de teste que inicia `server_utils.py` como subprocesso.
  - Testar chamadas diretas às 3 ferramentas com parâmetros válidos e com entradas inválidas (ex: diretório inexistente).
  - Validar como o FastMCP serializa erros em formato JSON-RPC com códigos de erro padronizados sem derrubar o processo.
**Scaffold de `dia_15/02_test_mcp_server.py`:** um mini-*test runner* que exercita o servidor por dentro do protocolo.

```python
import asyncio
import hashlib
import sys
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

PARAMS = StdioServerParameters(command=sys.executable, args=["server_utils.py"])
aprovados = 0
falhas = 0


def checar(nome: str, condicao: bool, detalhe: str = "") -> None:
    global aprovados, falhas
    if condicao:
        aprovados += 1
        print(f"  [OK]   {nome}")
    else:
        falhas += 1
        print(f"  [FALHA] {nome} {detalhe}")


async def main() -> None:
    async with stdio_client(PARAMS) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()

            nomes = {t.name for t in (await sessao.list_tools()).tools}
            checar("expoe as 3 ferramentas", nomes == {"calcular_hash_arquivo", "contar_linhas_codigo", "converter_temperatura"})

            r = await sessao.call_tool("converter_temperatura", {"valor": 100, "de": "C", "para": "F"})
            checar("100 C = 212 F", r.content[0].text.startswith("212"), r.content[0].text)

            # TODO: teste calcular_hash_arquivo com um arquivo real (por exemplo, este proprio script):
            #       compare com hashlib.sha256(Path(__file__).read_bytes()).hexdigest()

            # TODO: teste erro: diretorio inexistente em contar_linhas_codigo; espere r.isError == True

            # TODO: teste erro de tipo: converter_temperatura com "valor": "abc"; espere r.isError == True

            # TODO: teste erro de dominio: unidade "X"; espere isError e a mensagem conter "Unidades validas"

            # Prova de vida: o servidor continua respondendo depois de tantos erros
            r = await sessao.call_tool("converter_temperatura", {"valor": 0, "de": "K", "para": "C"})
            checar("servidor vivo apos os erros", not r.isError, r.content[0].text)

    print(f"\nResumo: {aprovados} aprovados, {falhas} falhas")
    sys.exit(1 if falhas else 0)


if __name__ == "__main__":
    asyncio.run(main())
```

**Critério de sucesso:** `Resumo: 7 aprovados, 0 falhas` (2 testes já prontos, os 4 que vocês escrevem e a prova de vida). Investigação para a dupla: *qual é a diferença de mensagem entre o erro de tipo (`"abc"` no lugar de número) e o erro de domínio (unidade `X`)? quem barrou cada um, o FastMCP ou a sua função?*

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🤖 7. Bloco 4: Desafio Prático: Agente Gemini com FastMCP (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_15/03_full_mcp_agent.py`.
  - Unir a ponte criada no Dia 14 com o servidor FastMCP construído no Bloco 2.
  - Fazer o `gemini-3.8-flash` receber comandos como: *"Quantas linhas de código Python temos no projeto e qual o hash do arquivo server_utils.py?"*.
  - O agente deve inspecionar as ferramentas do servidor FastMCP, executá-las em sequência e emitir o relatório no terminal.
**Scaffold de `dia_15/03_full_mcp_agent.py`:** reaproveita a ponte do Dia 14. Antes de começar, copie `dia_14/03_mcp_gemini_bridge.py` para a pasta `dia_15/`.

```python
import asyncio
import importlib
import sys

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

ponte = importlib.import_module("03_mcp_gemini_bridge")

PARAMS = StdioServerParameters(command=sys.executable, args=["server_utils.py"])

PERGUNTAS = [
    "Quantas linhas de codigo Python temos neste projeto e qual o hash do arquivo server_utils.py?",
    "Quanto sao 98.6 graus Fahrenheit em Celsius?",
]


async def main() -> None:
    async with stdio_client(PARAMS) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()
            for pergunta in PERGUNTAS:
                print("PERGUNTA:", pergunta)
                # TODO: chame ponte.perguntar(sessao, pergunta) e imprima a resposta
                print("-" * 60)


if __name__ == "__main__":
    asyncio.run(main())
```

Depois de rodar, **abra o arquivo `03_mcp_gemini_bridge.py` copiado e adicione um `print` dentro do laço de chamadas** para exibir cada ferramenta chamada e seus argumentos. Esse é o seu primeiro *trace* de agente sobre MCP.

**Critério de sucesso:** a primeira resposta cita um número de linhas coerente (confira com `wc -l *.py`) e um hash de 64 caracteres hexadecimais idêntico ao de `shasum -a 256 server_utils.py`; a segunda responde **37 °C** (arredondado). O trace mostra que, na primeira pergunta, o modelo usou **duas ferramentas diferentes** de forma autônoma. Se ele errar o argumento `diretorio`, discutam: *a docstring/descrição do parâmetro deixou claro que "." significa a pasta atual?*

---

## 👥 8. Bloco 5: Formação dos 5 Novos Trios da Sprint 2 & Brainstorming (16:15 - 16:35)

* **Tempo Dedicado:** 20 minutos | **Formato:** Dinâmica Coletiva da Sala.
* **Atividades:**
  1. **Rotação Oficial das Squads:** Os 15 estudantes reorganizam-se oficialmente em **5 novos Trios** para enriquecer o trabalho colaborativo da Semana 2.
  2. **Definição de Papéis Iniciais:** Cada trio estabelece quem será o Piloto do Dia 16 (responsável pelo teclado) e os Copilotos.
  3. **Brainstorming de Domínio Analítico:** Discutir qual temática de dados cada trio deseja explorar no projeto *DataOps Agent*:
     - *Opção A:* E-commerce & Vendas (tabelas de clientes, pedidos, itens de pedido e produtos).
     - *Opção B:* Infraestrutura & DevOps (tabelas de servidores, métricas de CPU/memória, alertas e incidentes).
     - *Opção C:* Logística & Entregas (rotas, motoristas, fretes e ocorrências de atraso).
     - *Opção D:* Suporte & Chamados (tickets, usuários, categorias e tempo de resolução).

---

## 🧠 9. Bloco 6: Quiz Interativo da Semana 1 & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_15.html`](quizzes/quiz_dia_15.html)
* **Formato:** Revisão abrangente dos conceitos da Semana 1 (Structured Outputs, Pydantic, Function Calling, ReAct e FastMCP).
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_15.html`](quizzes/atividade_dia_15.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 10. Bloco 7: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 15](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão da Semana 1:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre desenvolvimento ágil com FastMCP concluída.
- [x] Servidor `server_utils.py` implementado expondo 3 ferramentas.
- [x] Testes de depuração aprovados em `02_test_mcp_server.py`.
- [x] Agente `03_full_mcp_agent.py` conectando Gemini ao servidor via `stdio`.
- [x] 5 Novos Trios da Semana 2 oficialmente formados e alinhados.
- [x] Domínio do banco de dados do trio escolhido para o kickoff de segunda-feira.
- [x] Quiz interativo da Semana 1 concluído no navegador.
- [x] Atividade interativa do Dia 15 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [Python + MCP: Building MCP servers with FastMCP (Microsoft Reactor, YouTube)](https://www.youtube.com/watch?v=_mUuhOwv9PY). Sessão prática de construção de servidores em Python; ao assistir, compare o uso de `@mcp.tool()` do vídeo com o seu `server_utils.py` e anote 1 recurso do FastMCP que vocês ainda não usaram.
2. 💻 **Código Bônus:** ferramentas assíncronas para trabalho *I/O-bound* (rede, disco lento), que não bloqueiam o servidor enquanto esperam. Salve como `dia_15/server_async.py`.

```python
import asyncio
import sys
import time

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("server-async")


@mcp.tool()
async def consultar_servico_lento(nome: str, atraso_segundos: float = 1.0) -> dict:
    """Simula uma consulta de rede lenta a um servico interno e retorna a latencia observada."""
    inicio = time.perf_counter()
    # TODO: aguarde com await asyncio.sleep(atraso_segundos) (NUNCA time.sleep, que bloqueia todo o servidor)
    return {"servico": nome, "latencia_s": round(time.perf_counter() - inicio, 2)}


@mcp.tool()
async def consultar_varios(nomes: list[str]) -> list[dict]:
    """Consulta varios servicos em paralelo e retorna a lista de latencias."""
    # TODO: use asyncio.gather para chamar consultar_servico_lento(nome) para todos os nomes ao mesmo tempo
    ...


if __name__ == "__main__":
    print("server-async iniciado", file=sys.stderr)
    mcp.run(transport="stdio")
```

Resultado esperado: chamar `consultar_varios` com 4 nomes retorna em cerca de **1 segundo** (e não 4), demonstrando concorrência. Adapte o `02_test_mcp_server.py` para cronometrar essa chamada.
