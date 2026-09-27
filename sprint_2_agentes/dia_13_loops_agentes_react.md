# 📅 Dia 13 (30/09 - Quarta-feira)
# 🔄 Loops de Agentes Autônomos: O Padrão ReAct & Multi-Turn Tool Calling

**Sprint 2:** Agentes Autônomos, Function Calling & Model Context Protocol (MCP)  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Fundamentos de Agentes, Schemas, Tools & Protocolo MCP  

---

## 🎯 1. Objetivos do Encontro
1. Compreender o padrão fundamental **ReAct (Reason + Act)**: como agentes combinam passos de raciocínio intermediário com ações externas para resolver problemas que um único turno de LLM não consegue solucionar.
2. Implementar um **loop de agente artesanal** em Python puro (`while True`) sem frameworks "caixa-preta", acumulando histórico de mensagens e gerenciando o ciclo Pensamento -> Ação -> Observação -> Resposta Final.
3. Estabelecer guardas rígidas de execução com `max_iterations = 5` para mitigar o risco de loops infinitos e consumo descontrolado de tokens.
4. Resolver desafios práticos de **ações encadeadas em múltiplos passos**, onde a resposta da ferramenta A é necessária para gerar os argumentos da ferramenta B.
5. Construir um módulo de **telemetria e visualização de rastro agêntico** no terminal, medindo latência e tokens consumidos em cada iteração do ciclo.
6. Consolidar os conceitos no **Quiz Interativo** e na **Atividade Interativa** antes do formulário diário de auto-avaliação.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura Padronizada: Padrão ReAct & Loops     │
│ 14:20 - 14:55   │ Bloco 2: Construção do Loop ReAct Artesanal em Python  │
│ 14:55 - 15:30   │ Bloco 3: Resolução de Ações Encadeadas em Multi-Passos │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:15   │ Bloco 4: Desafio: Escapando do Loop Infinito           │
│ 16:15 - 16:25   │ Bloco 5: Telemetria & Rastro de Execução no Terminal   │
│ 16:25 - 16:35   │ Bloco 6: Sincronização no GitHub da Dupla (Git Sync)   │
│ 16:35 - 16:45   │ Bloco 7: Quiz + Atividade Interativa (dia 13)          │
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
* **Foco Teórico:** O paper original de ReAct (Yao et al., 2022), a diferença crucial entre chamadas isoladas de função (Dia 12) e orquestração agêntica autônoma em múltiplos turnos, e por que entender a mecânica do loop manual é superior ao uso cego de bibliotecas de terceiros.
**De uma chamada para um raciocínio.** No Dia 12 a ferramenta era chamada uma vez e o ciclo acabava. Problemas reais raramente cabem em uma chamada: "quanto a Maria gastou no total?" exige achar o ID dela, listar os pedidos e só então somar. O padrão **ReAct** (*Reason + Act*, Yao et al., 2022) resolve isso alternando **raciocínio** ("preciso do ID primeiro") e **ação** (chamar a ferramenta), com a **observação** do resultado alimentando o próximo raciocínio, até que o modelo decida que já pode responder.

**O loop é código seu, não mágica.** Por baixo de qualquer "agente" existe um `while` que faz três coisas: pergunta ao modelo o que fazer, executa as ferramentas pedidas e devolve os resultados ao modelo. O modelo decide *quando parar*: se a resposta vier sem `function_call`, o trabalho acabou. Frameworks como LangChain ou CrewAI escondem esse laço atrás de abstrações, e quando algo dá errado (e vai dar) quem entende o loop depura em minutos, enquanto quem só conhece a biblioteca fica olhando uma caixa-preta. Por isso construímos o nosso em Python puro.

**Todo loop precisa de freio.** Um agente que decide quando parar também pode *nunca* decidir parar: repetir a mesma chamada, insistir em um registro inexistente, gastar toda a sua cota em minutos. As defesas são simples e obrigatórias: um teto de iterações (`max_iterations`), detecção de chamadas repetidas e mensagens de erro úteis devolvidas ao modelo. Hoje você implementa as três, e o Dia 18 vai reaproveitá-las no projeto.

* [Prompting Guide: ReAct](https://www.promptingguide.ai/techniques/react)
* [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)

---

## 💻 4. Bloco 2: Construção do Loop ReAct Artesanal em Python (14:20 - 14:55)

* **Tempo Dedicado:** 35 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_13/01_react_loop.py`.
  - Iniciar uma sessão de chat ou lista de mensagens mantendo histórico no SDK `google-genai` com `gemini-3.8-flash`.
  - Implementar o laço `while True` que verifica se `response.function_calls` existe:
    - Se existir: despacha a ferramenta, anexa a `FunctionResponse` ao histórico de mensagens e envia de volta ao modelo para o próximo passo.
    - Se não existir: encerra o laço e imprime a resposta final consolidada ao usuário.
  - Adicionar contador `turno += 1` e parada estrita em `max_iterations = 5`.
**Scaffold de `dia_13/01_react_loop.py`:** este arquivo é o **núcleo** que os scripts 02, 03 e 04 vão reaproveitar. Cuidado com o nome da função `rodar_agente` e com os parâmetros `antes_de_executar` e `ao_fim_do_turno` (que começam vazios): eles são os "ganchos" usados nos próximos blocos.

```python
import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
MODEL = "gemini-3.8-flash"
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

INSTRUCAO = (
    "Voce e um agente de dados. Use as ferramentas disponiveis, uma etapa por vez, "
    "e so responda ao usuario quando tiver todas as informacoes necessarias."
)


def rodar_agente(pergunta, ferramentas, max_iterations=5, antes_de_executar=None, ao_fim_do_turno=None):
    """Executa o loop ReAct e retorna (resposta_final, historico).

    ferramentas: dicionario {nome: funcao_python}
    antes_de_executar(nome, args): retorna None (seguir) ou um texto de aviso (nao executar)
    ao_fim_do_turno(turno, response, segundos): gancho de telemetria
    """
    config = types.GenerateContentConfig(
        system_instruction=INSTRUCAO,
        tools=list(ferramentas.values()),
        automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
    )
    historico = [types.Content(role="user", parts=[types.Part(text=pergunta)])]

    turno = 0
    while True:
        turno += 1
        # TODO: se turno > max_iterations, retorne ("Limite de iteracoes atingido sem resposta final.", historico)

        inicio = time.perf_counter()
        response = client.models.generate_content(model=MODEL, contents=historico, config=config)
        historico.append(response.candidates[0].content)

        # TODO: se NAO houver response.function_calls, chame ao_fim_do_turno (se existir) e retorne (response.text, historico)

        partes = []
        for chamada in response.function_calls:
            args = dict(chamada.args)
            aviso = antes_de_executar(chamada.name, args) if antes_de_executar else None
            if aviso:
                resultado = {"erro": aviso}
            else:
                try:
                    # TODO: execute ferramentas[chamada.name](**args) e guarde em resultado
                    resultado = None
                except Exception as erro:
                    resultado = {"erro": f"{type(erro).__name__}: {erro}"}
            partes.append(types.Part.from_function_response(name=chamada.name, response={"result": resultado}))

        historico.append(types.Content(role="user", parts=partes))
        if ao_fim_do_turno:
            ao_fim_do_turno(turno, response, time.perf_counter() - inicio)


def clima_servidor(datacenter: str) -> dict:
    """Retorna a temperatura em graus Celsius de um datacenter (sp-01 ou rs-02)."""
    return {"sp-01": {"celsius": 24.5}, "rs-02": {"celsius": 21.0}}[datacenter]


if __name__ == "__main__":
    texto, historico = rodar_agente(
        "Qual datacenter esta mais quente, sp-01 ou rs-02?",
        {"clima_servidor": clima_servidor},
    )
    print(texto)
    print("Mensagens no historico:", len(historico))
```

**Critério de sucesso:** o agente consulta os dois datacenters (na mesma chamada ou em duas) e responde que o `sp-01` está mais quente. Com o historico, confirme que ele tem no mínimo 4 mensagens (pergunta, chamadas, resultados, resposta). Teste o freio: chame `rodar_agente(..., max_iterations=1)` e verifique que a mensagem de limite aparece em vez de uma resposta final.

**Como reutilizar em outros arquivos:** nomes começando com número não funcionam em `import` comum. Nos próximos scripts use `import importlib` e `nucleo = importlib.import_module("01_react_loop")`, depois `nucleo.rodar_agente(...)`.

---

## ⛓️ 5. Bloco 3: Resolução de Ações Encadeadas em Multi-Passos (14:55 - 15:30)

* **Tempo Dedicado:** 35 minutos | **Formato:** Codificação em Duplas.
* **Objetivo:** Criar o script `dia_13/02_chained_tools_agent.py`.
  - Fornecer 3 ferramentas interdependentes: `buscar_id_usuario(email: str) -> str`, `listar_pedidos_usuario(id_usuario: str) -> list[dict]` e `calcular_total_gasto(valores: list[float]) -> float`.
  - Submeter a pergunta: *"Quanto a usuária maria@empresa.com gastou no total?"*.
  - Observar o agente executar autonomamente 3 turnos seguidos sem intervenção humana:
    1. Turno 1: Chama `buscar_id_usuario` com o e-mail.
    2. Turno 2: Recebe o ID e chama `listar_pedidos_usuario`.
    3. Turno 3: Recebe os pedidos, extrai os valores e chama `calcular_total_gasto`.
    4. Turno 4: Sintetiza a resposta textual conclusiva.
**Scaffold de `dia_13/02_chained_tools_agent.py`:** as três ferramentas dependem umas das outras. O modelo só consegue chamar a segunda depois de conhecer a saída da primeira.

```python
import importlib

nucleo = importlib.import_module("01_react_loop")

USUARIOS = {"maria@empresa.com": "U-104", "joao@empresa.com": "U-221"}
PEDIDOS = {
    "U-104": [{"pedido": "P-1", "valor": 120.0}, {"pedido": "P-2", "valor": 89.9}, {"pedido": "P-3", "valor": 310.1}],
    "U-221": [{"pedido": "P-9", "valor": 45.0}],
}


def buscar_id_usuario(email: str) -> str:
    """Retorna o ID interno de um usuario a partir do e-mail cadastrado."""
    # TODO: retorne USUARIOS[email]; se nao existir, levante ValueError("Usuario nao encontrado")
    ...


def listar_pedidos_usuario(id_usuario: str) -> list[dict]:
    """Lista os pedidos de um usuario a partir do ID interno (formato U-123)."""
    return PEDIDOS.get(id_usuario, [])


def calcular_total_gasto(valores: list[float]) -> float:
    """Soma uma lista de valores em reais e retorna o total arredondado a 2 casas."""
    # TODO: retorne a soma arredondada
    ...


FERRAMENTAS = {
    "buscar_id_usuario": buscar_id_usuario,
    "listar_pedidos_usuario": listar_pedidos_usuario,
    "calcular_total_gasto": calcular_total_gasto,
}


def nomes_das_ferramentas_chamadas(historico) -> list[str]:
    """Percorre o historico e retorna, em ordem, o nome de cada function_call feita pelo modelo."""
    nomes = []
    for mensagem in historico:
        for parte in mensagem.parts:
            # TODO: se parte.function_call existir, acrescente parte.function_call.name em nomes
            pass
    return nomes


if __name__ == "__main__":
    texto, historico = nucleo.rodar_agente("Quanto a usuaria maria@empresa.com gastou no total?", FERRAMENTAS)
    print(texto)
    sequencia = nomes_das_ferramentas_chamadas(historico)
    print("Sequencia de ferramentas:", " -> ".join(sequencia))
    # TODO: verifique com assert que "buscar_id_usuario" veio ANTES de "listar_pedidos_usuario"
    # e que esta veio ANTES de "calcular_total_gasto"
```

**Critério de sucesso:** a sequência impressa é `buscar_id_usuario -> listar_pedidos_usuario -> calcular_total_gasto` e a resposta cita **R$ 520,00**. Desafio extra de depuração: troque o e-mail por `ana@empresa.com` (inexistente) e observe como o erro devolvido pela ferramenta muda o comportamento do agente. Ele desiste, inventa ou pede outro dado?

---

## ☕ 6. Coffee Break & Networking (15:30 - 15:45)

Pausa de 15 minutos para descanso visual, café e troca de experiências entre as duplas.

---

## 🛡️ 7. Bloco 4: Desafio: Escapando do Loop Infinito (15:45 - 16:15)

* **Tempo Dedicado:** 30 minutos | **Formato:** Desafio Prático em Duplas.
* **Objetivo:** Criar o script `dia_13/03_agent_guard_loop.py`.
  - Simular um cenário onde o agente pede informações sobre um registro inexistente ou recebe mensagens repetitivas de erro de uma ferramenta.
  - Implementar um mecanismo de **detecção de chamadas repetidas** (se o agente tentar chamar a mesma função com os mesmos argumentos duas vezes seguidas, injetar um aviso no contexto para mudar de estratégia).
  - Validar que o loop encerra elegantemente avisando o usuário sobre a impossibilidade da ação, em vez de estourar a quota de chamadas.
**Scaffold de `dia_13/03_agent_guard_loop.py`:** simula uma ferramenta que sempre falha e usa o gancho `antes_de_executar` para quebrar o ciclo de repetição.

```python
import importlib

nucleo = importlib.import_module("01_react_loop")


def buscar_registro(id_registro: str) -> dict:
    """Busca um registro de cliente pelo ID no sistema legado."""
    raise LookupError(f"Registro {id_registro} nao encontrado")


FERRAMENTAS = {"buscar_registro": buscar_registro}


class GuardaDeRepeticao:
    """Detecta quando o agente insiste na mesma chamada com os mesmos argumentos."""

    def __init__(self, limite: int = 2):
        self.limite = limite
        self.ultima = None
        self.repeticoes = 0

    def __call__(self, nome: str, args: dict):
        assinatura = (nome, tuple(sorted(args.items())))
        # TODO: se assinatura for igual a self.ultima, incremente self.repeticoes; senao zere e atualize self.ultima
        # TODO: se self.repeticoes >= self.limite, retorne um aviso pedindo que o modelo MUDE DE ESTRATEGIA
        #       ou encerre informando ao usuario que a acao e impossivel
        return None


CASOS = [
    "Busque o registro R-999 e me diga o nome do cliente.",
    "Tente de novo o registro R-999 ate conseguir. Nao desista.",
]

if __name__ == "__main__":
    for pergunta in CASOS:
        guarda = GuardaDeRepeticao()
        texto, historico = nucleo.rodar_agente(
            pergunta, FERRAMENTAS, max_iterations=5, antes_de_executar=guarda
        )
        print("PERGUNTA:", pergunta)
        print("RESPOSTA:", texto)
        print("Mensagens no historico:", len(historico))
        print("-" * 60)
```

**Critério de sucesso:** para os dois casos o script **termina** e a resposta final explica ao usuário que o registro não existe (sem inventar um nome). O segundo caso é adversarial: o usuário manda insistir. Verifique quantas vezes a ferramenta foi realmente executada (adicione um contador) e explique na dupla qual proteção encerrou o loop: o aviso da guarda ou o teto de `max_iterations`.

---

## 📊 8. Bloco 5: Telemetria & Rastro de Execução no Terminal (16:15 - 16:25)

* **Tempo Dedicado:** 10 minutos | **Formato:** Implementação de Utilitário em Duplas.
* **Objetivo:** Criar o script `dia_13/04_agent_telemetry.py`.
  - Adicionar formatação visual no terminal (cores ANSI e marcadores de tempo `time.perf_counter()`).
  - Imprimir o relatório de execução ao final de cada requisição do agente: número total de turnos, tempo gasto em cada tool call e tokens acumulados no contexto.
**Scaffold de `dia_13/04_agent_telemetry.py`:** um relatório de execução usando o gancho `ao_fim_do_turno`.

```python
import importlib
import time

nucleo = importlib.import_module("01_react_loop")
chained = importlib.import_module("02_chained_tools_agent")

VERDE, AMARELO, CINZA, RESET = "\033[92m", "\033[93m", "\033[90m", "\033[0m"


class Telemetria:
    def __init__(self):
        self.turnos = []

    def __call__(self, turno: int, response, segundos: float):
        uso = response.usage_metadata
        # TODO: guarde em self.turnos um dicionario com: turno, segundos, tokens_prompt (uso.prompt_token_count),
        #       tokens_total (uso.total_token_count) e ferramentas (lista de nomes em response.function_calls, ou [])
        # TODO: imprima uma linha colorida por turno: numero, tempo em segundos e ferramentas chamadas

    def relatorio(self):
        print(f"{VERDE}=== Relatorio do agente ==={RESET}")
        # TODO: imprima o total de turnos, o tempo total, o total de tokens do ultimo turno
        #       (o contexto acumulado) e o turno mais lento


if __name__ == "__main__":
    telemetria = Telemetria()
    inicio = time.perf_counter()
    texto, _ = nucleo.rodar_agente(
        "Quanto a usuaria maria@empresa.com gastou no total?",
        chained.FERRAMENTAS,
        ao_fim_do_turno=telemetria,
    )
    print(texto)
    telemetria.relatorio()
    print(f"{CINZA}Tempo de parede: {time.perf_counter() - inicio:.2f}s{RESET}")
```

**Critério de sucesso:** uma linha por turno (4 no total), um relatório final e a constatação de que os **tokens do prompt crescem a cada turno**, porque o histórico acumulado é reenviado inteiro. Perguntas para a dupla: *quanto o contexto cresceu do turno 1 ao turno 4? o que aconteceria em um agente de 30 turnos?*

---

## 🐙 9. Bloco 6: Sincronização no GitHub da Dupla (16:25 - 16:35)

* **Tempo Dedicado:** 10 minutos.
* **Objetivo:** Validar a integridade de todos os 4 scripts da pasta `dia_13/` (`01_react_loop.py`, `02_chained_tools_agent.py`, `03_agent_guard_loop.py` e `04_agent_telemetry.py`) e realizar o Git Sync com commit e push.

---

## 🧠 10. Bloco 7: Quiz Interativo & Atividade Interativa (16:35 - 16:45)

* Cada estudante abre o arquivo local no navegador: [`quizzes/quiz_dia_13.html`](quizzes/quiz_dia_13.html)
* **Formato:** Questões práticas sobre o ciclo ReAct, persistência de histórico de mensagens em múltiplos turnos, gerenciamento de limites de iteração e estratégias contra loops infinitos.
* **Atividade interativa (complementa o quiz):** abram [`quizzes/atividade_dia_13.html`](quizzes/atividade_dia_13.html) e resolvam os 5 desafios (encontrar o erro no código, ordenar etapas, classificar conceitos e testar você mesmo). **Divisão sugerida dos 10 minutos:** cerca de 6 minutos no quiz e 4 na atividade; quem terminar antes refaz os itens errados.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 13](https://forms.gle/Yao5s39kMmbdgwcC8)

### ✅ Checklist de Conclusão do Dia 13:
- [x] Daily Standup de abertura realizada no horário.
- [x] Leitura de fundamentos do padrão ReAct concluída.
- [x] Loop ReAct artesanal implementado em `01_react_loop.py` com `max_iterations`.
- [x] Resolução autônoma de 3 ferramentas encadeadas em `02_chained_tools_agent.py`.
- [x] Desafio de mitigação de loops infinitos aprovado em `03_agent_guard_loop.py`.
- [x] Relatório de telemetria e latência funcionando em `04_agent_telemetry.py`.
- [x] Repositório sincronizado no GitHub via Git Sync.
- [x] Quiz interativo do Dia 13 concluído no navegador.
- [x] Atividade interativa do Dia 13 concluída no navegador.
- [x] Formulário diário de auto-avaliação preenchido.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo:** [How We Build Effective Agents (Barry Zhang, Anthropic, AI Engineer, YouTube)](https://www.youtube.com/watch?v=D7_ipDqhtwk). Palestra curta sobre quando usar agentes, como mantê-los simples e por que o loop com ferramentas é o coração deles; anote 2 decisões de design que apareceram no vídeo e que vocês tomaram (ou deveriam ter tomado) no `01_react_loop.py`.
2. 💻 **Código Bônus:** persistir o histórico da execução em JSON para auditoria posterior. Salve como `dia_13/05_bonus_audit_log.py` e chame `salvar_auditoria` ao final de `rodar_agente`.

```python
import json
from datetime import datetime, timezone
from pathlib import Path

PASTA = Path("auditoria")


def serializar_mensagem(mensagem) -> dict:
    """Converte uma mensagem do historico (types.Content) em um dicionario simples."""
    partes = []
    for parte in mensagem.parts:
        if parte.text:
            partes.append({"tipo": "texto", "conteudo": parte.text})
        elif parte.function_call:
            # TODO: acrescente {"tipo": "chamada", "ferramenta": ..., "args": ...} usando parte.function_call
            pass
        elif parte.function_response:
            # TODO: acrescente {"tipo": "observacao", "ferramenta": ..., "resultado": ...} usando parte.function_response
            pass
    return {"papel": mensagem.role, "partes": partes}


def salvar_auditoria(pergunta: str, resposta: str, historico: list) -> Path:
    PASTA.mkdir(exist_ok=True)
    agora = datetime.now(timezone.utc)
    registro = {
        "quando": agora.isoformat(),
        "pergunta": pergunta,
        "resposta_final": resposta,
        "mensagens": [serializar_mensagem(m) for m in historico],
    }
    caminho = PASTA / f"execucao_{agora.strftime('%Y%m%d_%H%M%S')}.json"
    # TODO: grave registro em caminho com json.dumps(..., indent=2, ensure_ascii=False, default=str)
    return caminho
```

Resultado esperado: um arquivo `auditoria/execucao_AAAAMMDD_HHMMSS.json` legível, no qual dá para reconstruir o raciocínio turno a turno. Adicione `auditoria/` ao `.gitignore` se o log conter dados sensíveis.
