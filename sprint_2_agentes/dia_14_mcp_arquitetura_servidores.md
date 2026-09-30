# 📅 Dia 14 (01/10 - Quinta-feira)
# 🔌 Model Context Protocol (MCP): Arquitetura, Transporte Stdio & Clientes

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o **Model Context Protocol (MCP)** como padrão aberto para interoperabilidade entre modelos de IA e fontes de dados/ferramentas externas.
2. Analisar o funcionamento do transporte padrão **`stdio`** (comunicação inter-processos via entrada e saída padrão) e o formato de mensagens **JSON-RPC 2.0**.
3. Implementar um cliente MCP em Python utilizando o SDK oficial `mcp`, estabelecendo handshake com servidores locais e descobrindo ferramentas dinamicamente via `tools/list`.
4. Desenvolver o desafio prático **Adaptador Universal MCP-Gemini Bridge**: converter o catálogo de esquemas do servidor MCP para as declarações nativas do `google-genai` e executar ações com o `gemini-3.8-flash`.
5. Compreender na prática a trindade do protocolo MCP: a distinção entre **Tools** (ações dinâmicas), **Resources** (leitura contextual de dados) e **Prompts** (templates reutilizáveis).
6. Consolidar os conceitos no **Quiz Interativo** e na **Atividade Interativa** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: A Arquitetura do MCP     │
│ 14:20 - 14:50   │ Bloco 2: Anatomia do JSON-RPC 2.0 & Transporte stdio   │
│ 14:50 - 15:30   │ Bloco 3: Construção do Cliente MCP em Python           │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio: Adaptador Universal MCP-Gemini Bridge│
│ 16:15 - 16:25   │ Bloco 5: Laboratório: A Trindade Tools vs Resources    │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz + Atividade Interativa (dia 14)          │
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

* **Tempo Dedicado:** 15 minutos (leitura individual em silêncio).
* **Foco Teórico:** O problema de integração N×M (cada LLM precisava de conectores próprios para cada banco ou API) e como o MCP introduz uma arquitetura unificada cliente-servidor (estilo LSP / Language Server Protocol da engenharia de software).
**O problema N×M.** Imagine 5 aplicações de IA (um chat, uma IDE, um agente de suporte...) e 8 fontes de dados e ferramentas (banco de dados, GitHub, calendário, planilhas...). Sem um padrão, cada par exige um conector escrito sob medida: 5 × 8 = 40 integrações, cada uma com seu formato, sua autenticação e seus bugs. Foi exatamente esse cenário que o **Model Context Protocol (MCP)**, proposto pela Anthropic em 2024 e hoje um padrão aberto, veio resolver: cada aplicação implementa o protocolo **uma vez** como cliente, cada fonte o implementa **uma vez** como servidor, e tudo conversa com tudo (5 + 8 = 13 peças).

**Quem é quem.** O **host** é a aplicação de IA que o usuário enxerga (para nós, o nosso script com o Gemini). Dentro dele vive um **cliente MCP**, que mantém uma conexão com um **servidor MCP**, um programa pequeno que expõe capacidades. O servidor oferece três tipos de coisa: **Tools** (funções que o modelo pode pedir para executar, com efeitos), **Resources** (dados de leitura, como arquivos ou linhas de uma tabela, que alimentam o contexto) e **Prompts** (modelos de instrução reutilizáveis). É a ideia do LSP (*Language Server Protocol*) aplicada à IA: um editor conversa com qualquer linguagem porque todos falam o mesmo protocolo.

**Como as mensagens viajam.** Cliente e servidor trocam mensagens **JSON-RPC 2.0** (`{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}`). No transporte **`stdio`**, o cliente inicia o servidor como *processo filho* e as mensagens trafegam pela entrada e saída padrão do processo, uma por linha. Sem porta de rede, sem URL, sem exposição pública: por isso é o transporte adotado no nosso projeto. Uma regra de ouro decorre disso: **um servidor stdio nunca pode usar `print()` para depurar**, porque o `stdout` é o canal do protocolo e qualquer texto solto corrompe a conversa (use `sys.stderr`).

**Foco da leitura (15 minutos).** Leia a introdução do MCP para entender o "porquê", depois a página de arquitetura (procure o ciclo de vida: `initialize`, a notificação `initialized` e as chamadas `tools/list` e `tools/call`) e, por fim, a seção de transportes da especificação. Ao terminar, cada estudante deve conseguir explicar em uma frase a diferença entre Tool e Resource.

* [MCP: Introdução](https://modelcontextprotocol.io/docs/getting-started/intro)
* [MCP: Arquitetura (host, cliente, servidor)](https://modelcontextprotocol.io/docs/learn/architecture)
* [MCP Specification: Transports (stdio)](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)
* [MCP Python SDK (repositório oficial)](https://github.com/modelcontextprotocol/python-sdk)

### 🌐 Playgrounds, Sandboxes & Links Externos para Codar
* [MCP Interactive Inspector Guide](https://modelcontextprotocol.io/docs/tools/inspector) - Ferramenta visual oficial executável via terminal (`npx @modelcontextprotocol/inspector`) para inspecionar e testar servidores locais pelo navegador.
* [GitHub: Model Context Protocol Reference Servers](https://github.com/modelcontextprotocol/servers) - Código-fonte dos servidores oficiais da comunidade (SQLite, Git, Postgres, Memory e Filesystem).
* [Glama MCP Registry & Directory](https://glama.ai/mcp/servers) - Diretório público e catalogação de servidores MCP prontos para inspirar ferramentas analíticas.
* [JSON-RPC 2.0 Specification & Interactive Guide](https://www.jsonrpc.org/specification) - Referência canônica do protocolo de envelopes que trafega pela stdin/stdout.

---

## 🔬 4. Bloco 2: Anatomia do JSON-RPC 2.0 & Transporte `stdio` (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_14/01_stdio_inspector.py`.
  - Simular o fluxo de mensagens de baixo nível que trafega entre cliente e servidor via `sys.stdin` e `sys.stdout`.
  - Montar manualmente os envelopes JSON-RPC (`jsonrpc: "2.0"`, `method: "initialize"`, `id: 1`).
  - Entender como o processo filho é inicializado sem portas de rede e sem risco de exposição pública de sockets.
**Preparação:** instale as dependências fixando a versão do SDK (a série 2.x renomeou o `FastMCP`, e este material usa a série 1.x): `pip install "mcp<2" google-genai python-dotenv`.

**Passo 1: o servidor de teste `dia_14/server_demo.py` (pronto, apenas leia e execute).**

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("demo-dia14")


@mcp.tool()
def somar(a: int, b: int) -> int:
    """Soma dois numeros inteiros e retorna o resultado."""
    return a + b


@mcp.tool()
def status_servico(servico: str) -> str:
    """Retorna o status de um servico interno (api, banco ou fila)."""
    tabela = {"api": "operacional", "banco": "operacional", "fila": "degradada"}
    if servico not in tabela:
        raise ValueError(f"Servico desconhecido: {servico}")
    return tabela[servico]


@mcp.resource("file:///docs/regras.md")
def regras() -> str:
    """Regras internas da equipe de dados."""
    return "1. Nunca altere dados em producao.\n2. Toda consulta deve ter LIMIT.\n3. Registre incidentes no canal #dados."


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

**Passo 2: scaffold de `dia_14/01_stdio_inspector.py`.** Aqui você faz o papel do cliente **sem biblioteca alguma**, escrevendo os envelopes JSON-RPC na mão.

```python
import json
import subprocess
import sys

proc = subprocess.Popen(
    [sys.executable, "server_demo.py"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.DEVNULL,
    text=True,
    bufsize=1,
)


def enviar(mensagem: dict) -> None:
    # TODO: escreva json.dumps(mensagem) + "\n" em proc.stdin e faca flush()
    ...


def receber() -> dict:
    # TODO: leia UMA linha de proc.stdout e converta com json.loads
    ...


# 1) Handshake: o cliente se apresenta
enviar({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
        "protocolVersion": "2025-06-18",
        "capabilities": {},
        "clientInfo": {"name": "inspetor-manual", "version": "0.1"},
    },
})
resposta = receber()
print("SERVIDOR SE APRESENTOU COMO:", resposta["result"]["serverInfo"])

# 2) Notificacao (nao tem "id" e nao recebe resposta)
enviar({"jsonrpc": "2.0", "method": "notifications/initialized"})

# 3) Descoberta de ferramentas
# TODO: envie um envelope com id=2 e method "tools/list"; imprima os nomes das ferramentas em result["tools"]

# 4) Execucao de uma ferramenta
# TODO: envie id=3, method "tools/call", params {"name": "somar", "arguments": {"a": 2, "b": 3}}
#       e imprima o texto em result["content"][0]["text"]

proc.terminate()
```

**Critério de sucesso:** o terminal mostra o nome `demo-dia14`, a lista com `somar` e `status_servico` e o resultado `5`. Perguntas para a dupla: *por que a mensagem `notifications/initialized` não tem `id`? o que aconteceria se o servidor imprimisse um `print("oi")` no meio da conversa?* (experimente adicionar esse `print` ao `server_demo.py` e veja o `json.loads` falhar).

---

## 🔌 5. Bloco 3: Construção do Cliente MCP em Python (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_14/02_mcp_client.py`.
  - Utilizar a biblioteca oficial `mcp` (`from mcp import ClientSession, StdioServerParameters`).
  - Lançar um servidor de teste local via subprocesso com transporte `stdio`.
  - Executar o handshake assíncrono, listar o catálogo de ferramentas com `session.list_tools()` e invocar uma ferramenta teste com `session.call_tool()`.
**Scaffold de `dia_14/02_mcp_client.py`:** agora com o SDK oficial fazendo o trabalho de baixo nível. O servidor é o mesmo `server_demo.py` do Bloco 2.

```python
import asyncio
import sys

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

PARAMS = StdioServerParameters(command=sys.executable, args=["server_demo.py"])


async def main() -> None:
    async with stdio_client(PARAMS) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()

            catalogo = await sessao.list_tools()
            for ferramenta in catalogo.tools:
                print(f"- {ferramenta.name}: {ferramenta.description}")
                # TODO: imprima tambem ferramenta.inputSchema (o JSON Schema gerado a partir dos type hints)

            resultado = await sessao.call_tool("somar", {"a": 40, "b": 2})
            print("somar(40, 2) ->", resultado.content[0].text)

            # TODO: chame "status_servico" com {"servico": "fila"} e imprima o texto
            # TODO: chame "status_servico" com {"servico": "impressora"} (invalido) e imprima
            #       resultado.isError e o texto da mensagem de erro; o processo NAO deve cair


if __name__ == "__main__":
    asyncio.run(main())
```

**Critério de sucesso:** duas ferramentas listadas com seus schemas, `somar(40, 2) -> 42`, `degradada` para a fila e, para a impressora, `isError=True` com a mensagem `Servico desconhecido`. Registre na dupla: *em que ponto do código o handshake `initialize` acontece? qual método corresponde ao `tools/list` que vocês escreveram à mão no Bloco 2?*

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🌉 7. Bloco 4: Desafio: Adaptador Universal MCP-Gemini Bridge (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio Prático em Duplas.
* **Objetivo:** Criar o script `dia_14/03_mcp_gemini_bridge.py`.
  - Construir a função adaptadora `converter_mcp_para_gemini_tools(mcp_tools) -> list`: traduzir as definições de parâmetros e descrições do padrão MCP para os tipos esperados pelo `google-genai`.
  - Conectar o modelo `gemini-3.8-flash`: quando o Gemini requisita uma chamada, o adaptador repassa para o servidor MCP via `session.call_tool`, recebe o resultado e devolve a resposta ao usuário.
**Scaffold de `dia_14/03_mcp_gemini_bridge.py`:** a ponte que transforma qualquer servidor MCP em um conjunto de ferramentas para o Gemini.

```python
import asyncio
import os
import sys

from dotenv import load_dotenv
from google import genai
from google.genai import types
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
PARAMS = StdioServerParameters(command=sys.executable, args=["server_demo.py"])


def converter_mcp_para_gemini_tools(mcp_tools) -> list[types.Tool]:
    """Converte o catalogo MCP (tools/list) em declaracoes de funcao do Gemini."""
    declaracoes = []
    for ferramenta in mcp_tools:
        # TODO: crie types.FunctionDeclaration(name=..., description=..., parameters_json_schema=ferramenta.inputSchema)
        #       e acrescente em declaracoes
        pass
    return [types.Tool(function_declarations=declaracoes)]


async def perguntar(sessao: ClientSession, pergunta: str, max_turnos: int = 5) -> str:
    catalogo = await sessao.list_tools()
    config = types.GenerateContentConfig(tools=converter_mcp_para_gemini_tools(catalogo.tools))
    historico = [types.Content(role="user", parts=[types.Part(text=pergunta)])]

    for _ in range(max_turnos):
        response = await client.aio.models.generate_content(model=MODEL, contents=historico, config=config)
        historico.append(response.candidates[0].content)
        if not response.function_calls:
            return response.text

        partes = []
        for chamada in response.function_calls:
            # TODO: execute a ferramenta NO SERVIDOR MCP com sessao.call_tool(chamada.name, dict(chamada.args))
            resultado_mcp = None
            texto = resultado_mcp.content[0].text if resultado_mcp else "sem resultado"
            partes.append(types.Part.from_function_response(name=chamada.name, response={"result": texto}))
        historico.append(types.Content(role="user", parts=partes))
    return "Limite de turnos atingido."


async def main() -> None:
    async with stdio_client(PARAMS) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()
            print(await perguntar(sessao, "Quanto e 1234 mais 4321, e como esta a fila?"))


if __name__ == "__main__":
    asyncio.run(main())
```

**Critério de sucesso:** a resposta cita `5555` e informa que a fila está `degradada`, e vocês conseguem apontar no código que **nenhuma ferramenta foi declarada manualmente**: elas vieram do servidor. Teste de generalidade: acrescente uma terceira `@mcp.tool()` ao `server_demo.py` **sem tocar na ponte** e pergunte algo que a use; ela deve funcionar de imediato. Essa é a promessa do MCP em ação.

---

## 📚 8. Bloco 5: Laboratório: A Trindade Tools vs Resources (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Demonstração Prática em Duplas.
* **Objetivo:** Criar o script `dia_14/04_mcp_resources_demo.py`.
  - Demonstrar na prática a leitura de um *Resource* MCP (URI estático de arquivo como `file:///docs/regras.md`).
  - Entender a separação conceitual: *Resources* alimentam contexto estático de forma controlada; *Tools* executam lógica e afetam o estado do sistema.
**Scaffold de `dia_14/04_mcp_resources_demo.py`:** o servidor do Bloco 2 já expõe o resource `file:///docs/regras.md`.

```python
import asyncio
import sys

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

PARAMS = StdioServerParameters(command=sys.executable, args=["server_demo.py"])


async def main() -> None:
    async with stdio_client(PARAMS) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()

            # TODO: liste os resources com sessao.list_resources() e imprima o uri e o nome de cada um

            conteudo = await sessao.read_resource("file:///docs/regras.md")
            regras = conteudo.contents[0].text
            print(regras)

            # TODO: monte um prompt do tipo "Com base nas regras abaixo, responda: posso rodar um DELETE em producao?"
            #       inserindo o texto de "regras" como contexto e envie ao Gemini (reaproveite o client da ponte)


if __name__ == "__main__":
    asyncio.run(main())
```

**Critério de sucesso:** as 3 regras aparecem no terminal e o Gemini responde que **não** pode, citando a regra 1. Discussão final da dupla (registre em 3 linhas): *por que "regras da equipe" é melhor como Resource do que como Tool? e por que "apagar um registro" nunca deveria ser um Resource?*

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Testar todos os 4 scripts da pasta `dia_14/` e realizar commit convencional e push no repositório compartilhado da dupla.

---

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_14.html`](quizzes/quiz_dia_14.html)
* **Formato:** Questões conceituais sobre transporte `stdio`, JSON-RPC 2.0, papel de clients e hosts no MCP, e mapeamento de ferramentas para LLMs.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_14.html`](quizzes/atividade_dia_14.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 14](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 14:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura conceitual da arquitetura MCP concluída.
- [x] Script `01_stdio_inspector.py` inspecionando envelopes JSON-RPC.
- [x] Cliente MCP assíncrono funcional em `02_mcp_client.py`.
- [x] Ponte de integração MCP-Gemini executando ações com `gemini-3.8-flash`.
- [x] Diferença prática entre Tools e Resources validada em laboratório.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 14 respondido no navegador.
- [x] Atividade interativa do Dia 14 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

### 🎥 Vídeos Recomendados

1. 🎥 **Workshop Completo:** [Building Agents with Model Context Protocol (Mahesh Murag, Anthropic, AI Engineer, YouTube)](https://www.youtube.com/watch?v=kQmXtrmQ5Zg). Workshop aprofundado com demonstrações do protocolo. Assistam aos primeiros 20 minutos focando nos conceitos de arquitetura e transporte.
2. 🎥 **Visão Oficial:** [Model Context Protocol: What, Why, and How (Alex Albert & David Soria Parra, Anthropic Dev Day, YouTube)](https://www.youtube.com/watch?v=Fcx9f5hGf9A). Os líderes do projeto MCP na Anthropic explicam a transição do ecossistema fragmentado para um padrão aberto e os planos para servidores locais e remotos.
3. 🎥 **Anatomia do Protocolo:** [Inside the Model Context Protocol (Matt Pocock, YouTube)](https://www.youtube.com/watch?v=5rT46q3P4qM). Demonstração clara e objetiva de como mensagens JSON-RPC trafegam via pipes de processos sem expor portas HTTP na máquina.

---

### 💻 Códigos & Exercícios Práticos Bônus

#### Exercício Bônus 1: Host Conectado a Múltiplos Servidores Simultâneos
Um *host* conectado a vários servidores ao mesmo tempo. Salve como `dia_14/05_bonus_multi_server.py` (crie também um `server_math.py` simples com uma ferramenta `quadrado(n: int)`).

```python
import asyncio
import sys
from contextlib import AsyncExitStack

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

SERVIDORES = {
    "demo": StdioServerParameters(command=sys.executable, args=["server_demo.py"]),
    "math": StdioServerParameters(command=sys.executable, args=["server_math.py"]),
}


async def conectar_todos(pilha: AsyncExitStack) -> dict[str, ClientSession]:
    sessoes = {}
    for nome, params in SERVIDORES.items():
        leitura, escrita = await pilha.enter_async_context(stdio_client(params))
        sessao = await pilha.enter_async_context(ClientSession(leitura, escrita))
        await sessao.initialize()
        sessoes[nome] = sessao
    return sessoes


async def montar_catalogo(sessoes: dict[str, ClientSession]) -> dict[str, tuple[str, str]]:
    """Retorna {nome_qualificado: (servidor, nome_original)} para evitar colisao de nomes."""
    catalogo = {}
    for servidor, sessao in sessoes.items():
        for ferramenta in (await sessao.list_tools()).tools:
            # TODO: use a chave f"{servidor}__{ferramenta.name}" e guarde (servidor, ferramenta.name)
            pass
    return catalogo


async def main() -> None:
    async with AsyncExitStack() as pilha:
        sessoes = await conectar_todos(pilha)
        catalogo = await montar_catalogo(sessoes)
        print("Catalogo unificado:", list(catalogo))
        # TODO: escolha "math__quadrado", encontre a sessao pelo catalogo e chame call_tool com {"n": 7}


if __name__ == "__main__":
    asyncio.run(main())
```

**Resultado esperado:** um catálogo com as ferramentas dos dois servidores (nomes prefixados) e `49` como resultado do quadrado.

#### Exercício Bônus 2: Consumindo Resources MCP (`resources/list` e `resources/read`)
Além de Tools (ações executáveis), servidores MCP expõem **Resources** (dados estáticos ou dinâmicos somente leitura, como logs, esquemas ou documentações). Construa um cliente que lista os recursos disponíveis e lê seu conteúdo via URI padronizada. Salve como `dia_14/06_bonus_mcp_resources_reader.py`.

```python
import asyncio
import sys

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def inspecionar_recursos(servidor_script: str) -> None:
    parametros = StdioServerParameters(command=sys.executable, args=[servidor_script])
    async with stdio_client(parametros) as (leitura, escrita):
        async with ClientSession(leitura, escrita) as sessao:
            await sessao.initialize()

            # Lista os recursos expostos pelo servidor
            resposta_recursos = await sessao.list_resources()
            print(f"Recursos encontrados: {len(resposta_recursos.resources)}")
            for recurso in resposta_recursos.resources:
                print(f" - URI: {recurso.uri} | Nome: {recurso.name} | MIME: {recurso.mimeType}")

                # TODO: use await sessao.read_resource(recurso.uri) para obter o conteudo
                # e exiba as primeiras 2 linhas do texto lido


if __name__ == "__main__":
    # Teste apontando para o seu server_demo.py (ou servidor com resources)
    asyncio.run(inspecionar_recursos("server_demo.py"))
```

**Critério de sucesso:** o cliente conecta via `stdio`, enumera as URIs registradas e lê o payload de texto associado sem invocar chamadas de ferramentas.

#### Exercício Bônus 3: Timeout e Resiliência em Conexões Stdio
Em produção, um servidor MCP pode travar em um loop infinito ou bloquear na leitura de disco. Se o cliente não definir limites de tempo, o agente inteiro congela. Implemente uma chamada segura com `asyncio.wait_for` e captura de exceção. Salve como `dia_14/07_bonus_mcp_client_resilience.py`.

```python
import asyncio
import sys

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def chamar_ferramenta_com_timeout(
    sessao: ClientSession, nome_ferramenta: str, argumentos: dict, timeout_segundos: float = 3.0
) -> dict:
    """Executa a ferramenta MCP garantindo que o servidor nao prenda o processo indefinidamente."""
    try:
        # TODO: envolva await sessao.call_tool(nome_ferramenta, argumentos) em asyncio.wait_for com timeout_segundos
        resposta = await asyncio.wait_for(
            sessao.call_tool(nome_ferramenta, argumentos),
            timeout=timeout_segundos,
        )
        return {"sucesso": True, "resultado": resposta.content[0].text}
    except asyncio.TimeoutError:
        return {"sucesso": False, "erro": f"Servidor MCP excedeu o timeout de {timeout_segundos}s"}
    except Exception as e:
        return {"sucesso": False, "erro": f"Erro de comunicacao com o servidor: {str(e)}"}


if __name__ == "__main__":
    # Teste rapido da funcao resiliente
    print("Funcao de resiliencia pronta para integracao!")
```

**Critério de sucesso:** chamadas que demoram mais que o teto estabelecido retornam erro controlado em formato de dicionário sem quebrar o laço de execução do agente.

