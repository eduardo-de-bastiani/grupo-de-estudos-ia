# 📅 Dia 12 (29/09 - Terça-feira)
# ⚙️ Function Calling: Chamada de Ferramentas Nativas & Resolução de Ações

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o protocolo nativo de **Function Calling** no ecossistema Gemini: como a LLM decide dinamicamente entre responder em texto ou solicitar a execução de uma ferramenta externa.
2. Declarar ferramentas em Python com tipagem estrita e docstrings semânticas claras, entendendo como o SDK `google-genai` constrói as declarações de ferramentas (`Tool` e `FunctionDeclaration`).
3. Construir o despachador de ferramentas (**Tool Dispatcher**): script que intercepta a chamada emitida pelo modelo, executa a função Python local com os argumentos gerados e devolve o resultado via `FunctionResponse`.
4. Desenvolver o desafio prático **Multi-Tool Router**: orquestrar 4 ferramentas analíticas distintas e validar a capacidade do modelo de escolher a ferramenta exata ou declinar o uso de ferramentas para perguntas conceituais.
5. Implementar um laboratório de **resiliência e tratamento de erros de execução**: como repassar falhas e parâmetros inválidos de volta à LLM sem interromper a aplicação.
6. Consolidar os conceitos no **Quiz Interativo** e na **Atividade Interativa** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: A Mecânica de Tool Calling│
│ 14:20 - 14:50   │ Bloco 2: Declaração de Ferramentas Nativas             │
│ 14:50 - 15:30   │ Bloco 3: Despacho e Resolução do Ciclo da Ferramenta   │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio Prático: O Multi-Tool Router          │
│ 16:15 - 16:25   │ Bloco 5: Laboratório de Resiliência & Erros de Execução │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz + Atividade Interativa (dia 12)          │
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
* **Foco Teórico:** A separação de responsabilidades no Function Calling: o modelo de linguagem NÃO executa código diretamente por motivos de segurança; ele emite a intenção de execução estruturada com os parâmetros calculados. O código hospedeiro (Python) executa e devolve o valor de observação.
**O modelo não executa nada.** A frase mais importante do dia: quando você habilita *function calling*, o Gemini nunca roda o seu código. Ele lê a lista de ferramentas que você declarou (nome, descrição, parâmetros), decide se alguma ajuda a responder e, em vez de texto, devolve uma **intenção estruturada**: "chame `calcular_faturamento` com `regiao="Sul"` e `ano=2025`". Quem executa é o seu programa, e quem fecha o ciclo também: você devolve o resultado e o modelo redige a resposta final.

**O ciclo em quatro passos.** (1) Você envia a pergunta junto com as declarações das ferramentas. (2) O modelo responde com um `function_call`. (3) O seu código localiza a função Python correspondente, executa com os argumentos recebidos e obtém um valor. (4) Você envia esse valor de volta como `function_response` e o modelo produz a resposta em linguagem natural. Na Sprint 1 o modelo só lia documentos; a partir de agora ele *pede ações*, e essa separação entre decidir e executar é o que permite colocar regras de segurança entre os dois (assunto do Dia 18).

**Docstring é prompt.** O SDK `google-genai` monta a declaração da ferramenta a partir do nome da função, dos type hints e da docstring. Isso significa que uma docstring vaga ("faz coisas com dados") produz escolhas ruins do modelo, e uma docstring precisa ("Retorna o faturamento anual em reais de uma regiao brasileira") produz roteamento confiável. Trate cada descrição como uma instrução de uso escrita para uma pessoa que nunca viu o seu código.

**Foco da leitura (15 minutos).** No guia oficial, leia as seções de como o function calling funciona, de declaração de funções e de modos de chamada (`AUTO`, `ANY`, `NONE`). Na segunda passada, procure como desligar a execução automática: hoje vamos fazer o despacho **manualmente** para entender cada passo, e só depois de dominar a mecânica é que faz sentido deixar o SDK fazer por você.

* [Gemini API: Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
* [Gemini API: Function calling, chamadas paralelas e composicionais](https://ai.google.dev/gemini-api/docs/function-calling#parallel_function_calling)
* [Google Codelabs: How to Interact with APIs Using Function Calling in Gemini](https://codelabs.developers.google.com/codelabs/gemini-function-calling)

---

## 💻 4. Bloco 2: Declaração de Ferramentas Nativas (14:20 - 14:50)

* **Tempo Dedicado:** 30 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_12/01_simple_tool.py`.
  - Declarar funções Python simples com type hints estritos (ex: `calcular_faturamento(regiao: str, ano: int) -> dict` e `consultar_cotacao(moeda: str) -> float`).
  - Passar as funções na configuração do modelo `gemini-3.8-flash`.
  - Inspecionar a estrutura do objeto `response.function_calls` retornado pela API quando o usuário faz uma pergunta que exige a ferramenta.
**Scaffold de `dia_12/01_simple_tool.py`:** aqui o objetivo é *só olhar* o que o modelo devolve, sem executar nada ainda. Copie o `.env` do Dia 11 e instale as dependências (`pip install google-genai python-dotenv`).

```python
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


def calcular_faturamento(regiao: str, ano: int) -> dict:
    """Retorna o faturamento anual, em reais, de uma regiao comercial brasileira.

    Args:
        regiao: nome da regiao, por exemplo "Sul" ou "Nordeste".
        ano: ano de referencia com 4 digitos, por exemplo 2025.
    """
    base = {"Sul": 1_250_000.0, "Sudeste": 3_400_000.0, "Nordeste": 980_000.0}
    return {"regiao": regiao, "ano": ano, "faturamento": base.get(regiao, 0.0)}


def consultar_cotacao(moeda: str) -> float:
    """Retorna a cotacao atual em reais de uma moeda estrangeira (USD, EUR ou GBP)."""
    # TODO: retorne valores fixos de teste: USD 5.20, EUR 5.65, GBP 6.60; levante ValueError se a moeda for desconhecida
    ...


config = types.GenerateContentConfig(
    tools=[calcular_faturamento, consultar_cotacao],
    # Desliga a execucao automatica: queremos ver a intencao do modelo
    automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
)

PERGUNTAS = [
    "Quanto a regiao Sul faturou em 2025?",
    "Quanto custa um dolar hoje em reais?",
    "O que e um JOIN em SQL?",
]

if __name__ == "__main__":
    for pergunta in PERGUNTAS:
        response = client.models.generate_content(model=MODEL, contents=pergunta, config=config)
        print("PERGUNTA:", pergunta)
        if response.function_calls:
            for chamada in response.function_calls:
                # TODO: imprima chamada.name e chamada.args
                pass
        else:
            print("  resposta em texto:", response.text)
```

**Critério de sucesso:** as duas primeiras perguntas imprimem o nome da ferramenta correta e seus argumentos (`{"regiao": "Sul", "ano": 2025}`); a terceira responde em **texto**, sem chamar ferramenta alguma. Anotem na dupla: *o que aconteceria se `regiao` não tivesse docstring?* Testem removendo a docstring de `calcular_faturamento` e reexecutando.

---

## ⚙️ 5. Bloco 3: Despacho e Resolução do Ciclo da Ferramenta (14:50 - 15:30)

* **Tempo Dedicado:** 40 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_12/02_tool_dispatcher.py`.
  - Construir um mecanismo de roteamento e despacho (`dispatcher`): mapear o nome da função recebida do Gemini para a função Python real.
  - Executar a função com os argumentos validados.
  - Montar a resposta com o tipo `types.Part.from_function_response` e reenviar ao modelo.
  - Obter e imprimir a resposta final em linguagem natural sintetizada pelo modelo com base no resultado da execução.
**Scaffold de `dia_12/02_tool_dispatcher.py`:** o ciclo completo (pergunta, intenção, execução, resposta final).

```python
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


def calcular_faturamento(regiao: str, ano: int) -> dict:
    """Retorna o faturamento anual, em reais, de uma regiao comercial brasileira."""
    base = {"Sul": 1_250_000.0, "Sudeste": 3_400_000.0, "Nordeste": 980_000.0}
    return {"regiao": regiao, "ano": ano, "faturamento": base.get(regiao, 0.0)}


def consultar_cotacao(moeda: str) -> dict:
    """Retorna a cotacao atual em reais de uma moeda estrangeira (USD, EUR ou GBP)."""
    tabela = {"USD": 5.20, "EUR": 5.65, "GBP": 6.60}
    return {"moeda": moeda, "cotacao_brl": tabela[moeda]}


# TODO: monte o dicionario FERRAMENTAS mapeando o nome (str) para a funcao Python correspondente
FERRAMENTAS = {}


def responder(pergunta: str) -> str:
    config = types.GenerateContentConfig(
        tools=list(FERRAMENTAS.values()),
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
    )
    contents = [types.Content(role="user", parts=[types.Part(text=pergunta)])]

    # Passo 1 e 2: o modelo decide se quer uma ferramenta
    response = client.models.generate_content(model=MODEL, contents=contents, config=config)
    if not response.function_calls:
        return response.text

    # O turno do modelo (com o function_call) precisa entrar no historico
    contents.append(response.candidates[0].content)

    # Passo 3: executar cada chamada pedida
    partes_resposta = []
    for chamada in response.function_calls:
        # TODO: busque a funcao em FERRAMENTAS pelo chamada.name e execute com **chamada.args
        resultado = None
        partes_resposta.append(
            types.Part.from_function_response(name=chamada.name, response={"result": resultado})
        )

    # Passo 4: devolver os resultados ao modelo para a resposta final
    contents.append(types.Content(role="user", parts=partes_resposta))
    # TODO: chame generate_content novamente com o historico atualizado e retorne response.text
    ...


if __name__ == "__main__":
    print(responder("Compare o faturamento de 2025 do Sul e do Sudeste."))
```

**Critério de sucesso:** o terminal imprime um texto em português que cita os dois valores (R$ 1.250.000,00 e R$ 3.400.000,00) e aponta o Sudeste como maior. Adicione um `print` dentro do laço para mostrar cada chamada executada; o modelo deve pedir **as duas** chamadas antes da resposta final. Pergunta para a dupla: *por que precisamos anexar `response.candidates[0].content` ao histórico antes da resposta da ferramenta?*

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de impressões entre as duplas.

---

## 🧪 7. Bloco 4: Desafio Prático: O Multi-Tool Router (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio em Duplas.
* **Objetivo:** Criar o script `dia_12/03_multi_tool_router.py`.
  - Configurar 4 ferramentas de utilidade: `obter_temperatura_servidor(datacenter: str)`, `verificar_status_banco(cluster: str)`, `calcular_desvio_padrao(valores: list[float])` e `validar_formato_documento(cnpj: str)`.
  - Submeter uma bateria de 6 prompts diferentes (perguntas que precisam de 1 ferramenta, perguntas que misturam conceitos e perguntas puramente conceituais).
  - O script deve rotear e responder com precisão todas as 6 entradas, demonstrando quando chamar e quando NÃO chamar tools.
**Scaffold de `dia_12/03_multi_tool_router.py`:** reaproveite o ciclo do `02_tool_dispatcher.py` (copie a função `responder` e o dicionário `FERRAMENTAS`) e complete as 4 ferramentas e o placar.

```python
import statistics

# ... importacoes, client e funcao responder(pergunta) copiadas do 02_tool_dispatcher.py ...


def obter_temperatura_servidor(datacenter: str) -> dict:
    """Retorna a temperatura atual em graus Celsius de um datacenter (sp-01, rs-02 ou rj-03)."""
    tabela = {"sp-01": 24.5, "rs-02": 21.0, "rj-03": 27.8}
    return {"datacenter": datacenter, "celsius": tabela[datacenter]}


def verificar_status_banco(cluster: str) -> dict:
    """Retorna o status operacional de um cluster de banco de dados (prod, homolog ou analytics)."""
    # TODO: retorne {"cluster": cluster, "status": ...} com prod="saudavel", homolog="degradado", analytics="offline"
    ...


def calcular_desvio_padrao(valores: list[float]) -> float:
    """Calcula o desvio padrao amostral de uma lista com pelo menos 2 numeros."""
    # TODO: use statistics.stdev e arredonde para 2 casas decimais
    ...


def validar_formato_documento(cnpj: str) -> dict:
    """Confere apenas o FORMATO de um CNPJ (14 digitos, com ou sem pontuacao); nao consulta a Receita."""
    # TODO: remova pontuacao, verifique se restam exatamente 14 digitos e retorne {"cnpj": cnpj, "formato_valido": bool}
    ...


# (prompt, ferramenta_esperada ou None quando NAO deve chamar ferramenta)
BATERIA = [
    ("Qual a temperatura do datacenter rs-02?", "obter_temperatura_servidor"),
    ("O cluster analytics esta funcionando?", "verificar_status_banco"),
    ("Qual o desvio padrao de 10, 12, 9, 15 e 11?", "calcular_desvio_padrao"),
    ("O CNPJ 12.345.678/0001-95 tem formato valido?", "validar_formato_documento"),
    ("Explique em duas frases o que e um cluster de banco de dados.", None),
    ("Para que serve o desvio padrao em monitoramento de servidores?", None),
]

if __name__ == "__main__":
    acertos = 0
    for pergunta, esperada in BATERIA:
        # TODO: descubra qual ferramenta o modelo chamou (ou None) e compare com "esperada".
        # Dica: adapte responder() para tambem retornar o nome da primeira chamada, se houver.
        pass
    print(f"Roteamento correto: {acertos}/{len(BATERIA)}")
```

**Critério de sucesso:** `Roteamento correto: 6/6`. As duas últimas perguntas mencionam palavras-chave das ferramentas ("cluster", "desvio padrão") mas são **conceituais**: o modelo não deve chamar nada. Se errar, o culpado quase sempre é a docstring; refinem a descrição (por exemplo, deixando explícito "use apenas para valores concretos") e reexecutem, documentando qual mudança resolveu.

---

## 🔬 8. Bloco 5: Laboratório de Resiliência & Erros de Execução (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Investigação Experimental em Duplas.
* **Objetivo:** Criar o script `dia_12/04_tool_error_handling.py`.
  - Forçar cenários onde a função local lança uma exceção (ex: divisão por zero, recurso temporariamente indisponível).
  - Em vez de derrubar o programa Python com crash, empacotar a mensagem de erro estruturada dentro do `FunctionResponse` (`{"error": "Divisao por zero nao permitida", "status": "falha"}`).
  - Validar como o `gemini-3.8-flash` recebe o erro e redige uma explicação amigável ao usuário sem quebrar a esteira.
**Scaffold de `dia_12/04_tool_error_handling.py`:** o ciclo é o mesmo do `02`, mas agora a ferramenta pode falhar e o programa **não pode cair**.

```python
# ... importacoes, client e config copiados do 02_tool_dispatcher.py ...


def dividir_metricas(numerador: float, denominador: float) -> dict:
    """Divide duas metricas e retorna a razao (por exemplo, erros por requisicao)."""
    return {"razao": numerador / denominador}


def consultar_servico_externo(servico: str) -> dict:
    """Consulta o status de um servico externo pelo nome."""
    raise ConnectionError(f"Servico '{servico}' temporariamente indisponivel")


FERRAMENTAS = {
    "dividir_metricas": dividir_metricas,
    "consultar_servico_externo": consultar_servico_externo,
}


def executar_com_seguranca(nome: str, args: dict) -> dict:
    """Executa a ferramenta e transforma qualquer excecao em um resultado estruturado."""
    try:
        # TODO: execute FERRAMENTAS[nome](**args) e retorne {"status": "sucesso", "resultado": ...}
        ...
    except KeyError:
        return {"status": "falha", "error": f"Ferramenta desconhecida: {nome}"}
    except Exception as erro:
        # TODO: retorne {"status": "falha", "error": <mensagem curta, sem traceback completo>}
        ...


PERGUNTAS = [
    "Qual a razao entre 50 erros e 0 requisicoes?",
    "O servico de pagamentos esta no ar?",
]

# TODO: para cada pergunta, rode o ciclo completo usando executar_com_seguranca no passo de execucao
# e imprima a resposta final do modelo
```

**Critério de sucesso:** o programa termina sem `Traceback`, e o modelo explica em português que a divisão por zero é impossível e que o serviço está indisponível, sem inventar números. Discussão: *por que devolver a mensagem de erro ao modelo é melhor do que interromper o programa?* (dica: ele pode corrigir os argumentos ou avisar o usuário).

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Garantir que todos os 4 scripts (`01_simple_tool.py`, `02_tool_dispatcher.py`, `03_multi_tool_router.py` e `04_tool_error_handling.py`) foram testados e sincronizados no repositório compartilhado via commit convencional e push.

---

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_12.html`](quizzes/quiz_dia_12.html)
* **Formato:** Questões práticas cobrindo a assinatura de ferramentas, JSON Schema embutido em docstrings, formato do payload `function_call`, empacotamento de `function_response` e arquitetura cliente de despacho.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_12.html`](quizzes/atividade_dia_12.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 12](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 12:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura sobre protocolo e semântica de Function Calling concluída.
- [x] Script `01_simple_tool.py` declarando ferramentas e gerando `function_call`.
- [x] Script `02_tool_dispatcher.py` executando funções e fechando o turno de resposta.
- [x] Desafio `03_multi_tool_router.py` aprovado na bateria de 6 prompts variados.
- [x] Laboratório `04_tool_error_handling.py` testado com recuperação amigável de erros.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 12 respondido no navegador.
- [x] Atividade interativa do Dia 12 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [Function calling with the Gemini API (Google Cloud Tech, YouTube)](https://www.youtube.com/watch?v=mVXrdvXplj0). Apresentação oficial do mecanismo que vocês construíram hoje; ao assistir, identifique em qual momento o vídeo mostra o "fechamento do turno" (o `function_response`) e compare com o seu `02_tool_dispatcher.py`.
2. 💻 **Código Bônus:** despacho de chamadas paralelas. Quando o modelo pede várias ferramentas independentes no mesmo turno (como no Bloco 3), executá-las em threads reduz a espera total. Salve como `dia_12/05_bonus_parallel_calls.py`.

```python
import time
from concurrent.futures import ThreadPoolExecutor


def consultar_cluster(nome: str) -> dict:
    """Simula uma consulta lenta (1 segundo) a um cluster."""
    time.sleep(1)
    return {"cluster": nome, "status": "saudavel"}


FERRAMENTAS = {"consultar_cluster": consultar_cluster}


def executar_chamada(chamada) -> dict:
    # TODO: execute FERRAMENTAS[chamada.name](**chamada.args) e retorne {"name": chamada.name, "result": ...}
    ...


def executar_em_paralelo(chamadas: list) -> list[dict]:
    # TODO: use ThreadPoolExecutor(max_workers=4) e executor.map para rodar executar_chamada em cada chamada
    ...


class ChamadaFalsa:
    """Imita o objeto function_call do SDK para testar sem a API."""

    def __init__(self, name: str, args: dict):
        self.name = name
        self.args = args


if __name__ == "__main__":
    chamadas = [ChamadaFalsa("consultar_cluster", {"nome": n}) for n in ("prod", "homolog", "analytics", "dev")]
    inicio = time.perf_counter()
    resultados = executar_em_paralelo(chamadas)
    print(resultados)
    print(f"Tempo total: {time.perf_counter() - inicio:.1f}s")
```

Resultado esperado: as 4 consultas terminam em cerca de **1 segundo** (e não 4). Depois, integre a função `executar_em_paralelo` ao passo 3 do seu `02_tool_dispatcher.py` e reenvie todos os `function_response` numa única mensagem.
