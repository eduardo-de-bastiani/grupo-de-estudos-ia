# 📅 Dia 03 (16/09 - Quarta-feira)
# 🐍 Fundamentos de LLMs em Código, Tokenização & SDK Python

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Construção dos Primeiros Scripts de Engenharia de IA  

---

## 🎯 1. Objetivos do Encontro
1. Configurar o ambiente de desenvolvimento local integrando a `GEMINI_API_KEY` (obtida no Google AI Studio no Dia 02) através de variáveis de ambiente com `python-dotenv`.
2. Executar a primeira chamada programática ao **Modelo Gemini** (`gemini-3.8-flash`) utilizando a biblioteca oficial `google-genai`.
3. Compreender a anatomia interna de uma LLM: o que é um **Token**, como funciona a tokenização BPE (Byte-Pair Encoding) e por que tokens não são caracteres nem palavras.
4. Vivenciar a dinâmica prática **"Tokenizador Humano"** para fatiar texto manualmente antes de contrastar com o algoritmo real.
5. Analisar experimentalmente a disparidade de consumo e custo de tokens em **Português**, **Inglês** e **Código-fonte**.
6. Reproduzir via script Python os controles de hiperparâmetros experimentados ontem no Google AI Studio: **Temperature**, **Top-P** e **Top-K**.
7. Competir no desafio prático **"Code Golf de Tokens"** em duplas, otimizando o tamanho do prompt para extração estruturada de dados em JSON.
8. Consolidar o aprendizado do dia através do **Quiz Interativo do Dia 03** antes do preenchimento do formulário diário.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:05   │ Daily Standup de Abertura                              │
│ 14:05 - 14:20   │ Bloco 1: Leitura de Referência (O que são LLMs?)       │
│ 14:20 - 14:40   │ Bloco 2: Setup do Ambiente (.env & SDK google-genai)   │
│ 14:40 - 15:20   │ Bloco 3: Hello Gemini, Tokenizador Humano & Tokens     │
│ 15:20 - 15:35   │ Coffee Break & Networking                              │
│ 15:35 - 16:10   │ Bloco 4: Laboratório de Hiperparâmetros (Temp & Top-P) │
│ 16:10 - 16:25   │ Bloco 5: Desafio Gamificado — Code Golf de Tokens      │
│ 16:25 - 16:35   │ Bloco 6: Análise Comparativa dos Resultados & Git Sync │
│ 16:35 - 16:45   │ Bloco 7: Quiz Interativo de Fixação (quiz_dia_03.html) │
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

Antes de programar, cada estudante deve ler os seguintes materiais de fundamentação conceitual:

1. 📄 [Cloudflare: O que é um modelo de linguagem grande (LLM)?](https://www.cloudflare.com/pt-br/learning/ai/what-is-large-language-model/) — *Como modelos estatísticos de predição do próximo token operam sob arquitetura Transformer.*
2. 📄 [McKinsey: O que é tokenização e incorporação em IA?](https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-tokenization) — *Como o texto cru é fatiado em IDs numéricos para processamento vetorial.*

---

## 🛠️ 4. Bloco 2: Setup do Ambiente Local (14:20 - 14:40)

### 1. Ativação do Ambiente Virtual e Instalação
No terminal, certifique-se de que seu ambiente `.venv` configurado no Dia 01 está ativo:

```bash
# No Linux/macOS:
source .venv/bin/activate

# No Windows (PowerShell):
.venv\Scripts\Activate.ps1
```

Instale a biblioteca oficial do Google GenAI e o gerenciador de variáveis de ambiente:
```bash
pip install google-genai python-dotenv
```

### 2. Configuração das Variáveis de Ambiente (`.env`)
Na raiz do seu diretório de estudos, crie ou edite o arquivo `.env`:
```ini
GEMINI_API_KEY=sua_chave_copiada_do_google_ai_studio_aqui
```

> 🔒 **Regra de Ouro:** O arquivo `.env` NUNCA deve ser commitado no Git. Verifique se o seu `.gitignore` contém a linha `.env`.

---

## 💻 5. Bloco 3: Laboratório de Código — Hello Gemini & Investigação de Tokens (14:40 - 15:20)

Trabalhando em duplas, criem uma pasta `dia_03/` na raiz do repositório para organizar os scripts desenvolvidos hoje.

### Script 1: `01_hello_gemini.py` (Primeira Requisição via SDK)

**Intuito do script:** Realizar a primeira requisição autenticada à API do Gemini em Python utilizando o SDK oficial, validando o carregamento da chave pelo `.env` e inspecionando os metadados de tokens de entrada e saída retornados na resposta.

```python
import os
from dotenv import load_dotenv
from google import genai

# Carregar credenciais do arquivo .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Erro: GEMINI_API_KEY nao encontrada no arquivo .env!")

# Inicializar o cliente oficial do Google GenAI
client = genai.Client(api_key=api_key)

# Definir o Modelo Gemini
MODELO_FLASH = "gemini-3.8-flash"

# Chamada ao Modelo Gemini
response = client.models.generate_content(
    model=MODELO_FLASH,
    contents="Explique em exatamente 2 frases por que entender tokens e importante para um desenvolvedor de software.",
)

print("\n--- Resposta do Gemini ---")
print(response.text)
print("\n--- Metadados de Uso (Tokens) ---")
print(f"Tokens de Entrada (Prompt): {response.usage_metadata.prompt_token_count}")
print(f"Tokens de Saida (Resposta): {response.usage_metadata.candidates_token_count}")
print(f"Total de Tokens: {response.usage_metadata.total_token_count}")
```

> 💡 Se algo não funcionar de primeira, leia atentamente a mensagem de erro (traceback) no terminal e verifique se o arquivo `.env` está salvo no diretório correto.

---

### 🧑‍🤝‍🧑 Dinâmica em Duplas: O Tokenizador Humano (15:00 - 15:10)

> 🛑 **Atenção:** NÃO execute o script `02_token_counter.py` antes de realizar esta dinâmica!

#### 🎯 Objetivo Pedagógico
Antes de delegar a contagem para a API do Google, exercite a sua intuição sobre o algoritmo de **Byte-Pair Encoding (BPE)**. Na prática de Engenharia de Software, assumir que *"1 palavra = 1 token"* é a principal armadilha que estoura janelas de contexto e inflaciona orçamentos de inferência em nuvem.

#### 📋 Passo a Passo da Dinâmica
1. **Preparem o Bloco de Anotações:** Em uma folha de papel ou arquivo de texto em branco, copiem as 3 amostras textuais que utilizaremos no script seguinte:
   - **Amostra 1 (Inglês):** `"Artificial Intelligence is transforming how we build software systems and interact with data."`
   - **Amostra 2 (Português):** `"A Inteligência Artificial está transformando a forma como construímos sistemas de software e interagimos com dados."`
   - **Amostra 3 (Código Python):**
     ```python
     def calcular_media(valores: list[float]) -> float:
         if not valores:
             return 0.0
         return sum(valores) / len(valores)
     ```
2. **Fatiamento Manual (Corte com Barras):** Sem rodar código e sem usar ferramentas online, insiram barras verticais `|` onde a dupla julga que o tokenizador fará cortes.
   - *Exemplo de teste:* `A |In|te|li|gên|cia |Ar|ti|fi|cial |es|tá...`
3. **Registro de Estimativas:** Preencham a tabela de palpites da dupla antes de rodar o código:

| Amostra | Caracteres Estimados | Palavras Estimadas | Palpite de Tokens da Dupla |
| :--- | :---: | :---: | :---: |
| **Inglês** | ~92 | 12 | `_____` |
| **Português** | ~113 | 15 | `_____` |
| **Código Python** | ~130 | 18 | `_____` |

4. **Perguntas para Reflexão na Dupla:**
   - **Acentos e Diacríticos:** Letras acentuadas como `ê`, `á` e `í` continuam grudadas na palavra ou são fatiadas em múltiplos bytes/tokens?
   - **Espaços e Pontuação:** O espaço antes de uma palavra conta como parte do token seguinte ou é um token isolado?
   - **Estruturas de Código:** Como a indentação de 4 espaços (`    `), os dois-pontos `:` e a anotação de tipo `->` são interpretados?
5. **A Conexão com o Código:** Guardem esses palpites! A seguir, vocês vão executar o `02_token_counter.py` e conferir a contagem real calculada pela API do Gemini.

---

### Script 2: `02_token_counter.py` (Investigação de Idiomas e Código)

**Intuito do script:** Investigar empiricamente como o tokenizador da LLM fatia textos em inglês, português e blocos de código Python, comparando a quantidade total de tokens gerada e a razão de tokens por palavra em cada linguagem.

```python
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

textos = {
    "Ingles": "Artificial Intelligence is transforming how we build software systems and interact with data.",
    "Portugues": "A Inteligencia Artificial esta transformando a forma como construimos sistemas de software e interagimos com dados.",
    "Codigo Python": """
def calcular_media(valores: list[float]) -> float:
    if not valores:
        return 0.0
    return sum(valores) / len(valores)
"""
}

print(f"{'Categoria':<15} | {'Caracteres':<12} | {'Palavras':<10} | {'Tokens':<8} | {'Razao Token/Palavra'}")
print("-" * 70)

for categoria, texto in textos.items():
    res = client.models.count_tokens(model=MODELO_FLASH, contents=texto)
    qtd_chars = len(texto)
    qtd_palavras = len(texto.split())
    qtd_tokens = res.total_tokens
    razao = qtd_tokens / max(qtd_palavras, 1)
    print(f"{categoria:<15} | {qtd_chars:<12} | {qtd_palavras:<10} | {qtd_tokens:<8} | {razao:.2f}")
```

#### 📊 Confronto: Palpite vs. Realidade
Ao executar o script, comparem a saída oficial do terminal com os palpites da dinâmica do **Tokenizador Humano**:
- Qual categoria teve o maior erro na estimativa da dupla?
- A razão de tokens por palavra no português foi significativamente superior à do inglês? Por que isso acontece em modelos treinados predominantemente em corpora da língua inglesa?

---

## ☕ Coffee Break & Networking (15:20 - 15:35)

Pausa de 15 minutos para recarregar as energias, tomar um café e trocar impressões com os colegas sobre a contagem real de tokens e as peculiaridades observadas no fatiamento de código e português.

---

## 🎛️ 6. Bloco 4: Laboratório Empírico de Hiperparâmetros (15:35 - 16:10)

Neste bloco, vamos avaliar como os hiperparâmetros de inferência alteram o comportamento estocástico do modelo.

### Script 3: `03_temperature_lab.py` (Experimento Empírico de Temperatura)

**Intuito do script:** Avaliar na prática como a variação do hiperparâmetro de temperatura (0.0, 0.7 e 1.5) altera as respostas geradas para um mesmo prompt, comparando a repetição determinística com níveis crescentes de criatividade e aleatoriedade.

```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

prompt = "Crie uma metafora curta e poetica para explicar o que e uma funcao recursiva na programacao."
temperaturas = [0.0, 0.7, 1.5]

print(f"Prompt Testado: '{prompt}'\n")

for temp in temperaturas:
    print(f"\n" + "=" * 50)
    print(f"EXPERIMENTO COM TEMPERATURA = {temp}")
    print("=" * 50)
    
    # Executar 2 vezes para verificar determinismo vs aleatoriedade
    for tentativa in range(1, 3):
        response = client.models.generate_content(
            model=MODELO_FLASH,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=temp,
                max_output_tokens=150
            )
        )
        print(f"\n[Tentativa {tentativa}]:")
        print(response.text.strip())
```

---

### Script 4: `04_top_p_top_k_lab.py` (Experimento com Top-P e Top-K)

**Intuito do script:** Compreender a amostragem probabilística testando como os parâmetros Top-P (corte por probabilidade cumulativa) e Top-K (corte por número fixo de candidatos) restringem o vocabulário elegível e controlam a previsibilidade das respostas.

```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

prompt = "Sugira um nome criativo para uma startup de IA que ajuda desenvolvedores a debugar codigo."

print(f"Prompt Testado: '{prompt}'\n")

# Experimento 1: variando TOP_P (temperature fixa em 1.0)
print("=" * 50)
print("EXPERIMENTO 1: Variando TOP_P (temperature=1.0)")
print("=" * 50)
for top_p in [0.1, 0.5, 1.0]:
    response = client.models.generate_content(
        model=MODELO_FLASH,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=1.0,
            top_p=top_p,
            max_output_tokens=50
        )
    )
    print(f"\n[top_p={top_p}]: {response.text.strip()}")

# Experimento 2: variando TOP_K (temperature fixa em 1.0)
print("\n" + "=" * 50)
print("EXPERIMENTO 2: Variando TOP_K (temperature=1.0)")
print("=" * 50)
for top_k in [1, 10, 40]:
    response = client.models.generate_content(
        model=MODELO_FLASH,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=1.0,
            top_k=top_k,
            max_output_tokens=50
        )
    )
    print(f"\n[top_k={top_k}]: {response.text.strip()}")
```

---

## ⛳ 7. Bloco 5: Desafio Gamificado em Duplas — "Code Golf de Tokens" (16:10 - 16:25)

> ⏱️ **Duração:** 15 minutos | **Formato:** Competição prática entre duplas

### 🎯 Conceito do Desafio
Na programação tradicional, "Code Golf" é a arte de resolver um algoritmo com o menor número de caracteres possível. Na **Engenharia de Prompt e Arquitetura de IA**, cada token enviado consome banda de rede, aumenta a latência de primeiro token (TTFT - *Time To First Token*) e gera custo financeiro cumulativo na fatura de nuvem.

O objetivo deste desafio é criar o **prompt mais curto possível** (menor contagem de tokens medida por `client.models.count_tokens`) que consiga extrair informações não estruturadas e convertê-las em um formato JSON estritamente válido.

### 📥 Entrada Não-Estruturada
Cada dupla deve testar seu prompt com o seguinte texto:
```text
"Oi, sou a Mariana, faço o quarto semestre de Engenharia de Software"
```

### 📤 Saída Estruturada Obrigatória
O Gemini (`gemini-3.8-flash`) deve retornar **exclusivamente** um JSON válido contendo exatamente as chaves `nome`, `curso` e `semestre`:
```json
{
  "nome": "Mariana",
  "curso": "Engenharia de Software",
  "semestre": 4
}
```
*(Nota: O valor de `semestre` pode ser numérico `4` ou textual `"quarto"`, desde que a estrutura seja um JSON 100% válido).*

### 📜 Regras da Competição
1. Crie um script `desafio_code_golf.py` para testar suas versões de prompt.
2. O prompt deve ser avaliado com o método oficial:
   ```python
   tokens_prompt = client.models.count_tokens(model=MODELO_FLASH, contents=prompt).total_tokens
   ```
3. A resposta gerada deve ser validada programaticamente com `json.loads(response.text)`. Se a resposta contiver texto conversacional extra (como *"Aqui está o JSON:"*) ou quebrar o parse, a tentativa é inválida.
4. **Dica Técnica:** Você pode instruir o formato pelo prompt ou aproveitar configurações do SDK como `response_mime_type="application/json"` na chamada.
5. Anotem no quadro da sala a quantidade de tokens do prompt da sua dupla e o status de validação.
6. **Vencedor:** Vence a dupla com o menor número de tokens de prompt cuja saída for um JSON íntegro com todos os campos solicitados!

#### 🛠️ Script Auxiliar de Teste da Dupla: `desafio_code_golf.py`
```python
import json
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODELO_FLASH = "gemini-3.8-flash"

entrada = "Oi, sou a Mariana, faco o quarto semestre de Engenharia de Software"

# Elabore o prompt mais enxuto possivel aqui:
prompt = f"Extraia JSON {{\"nome\",\"curso\",\"semestre\"}} de: {entrada}"

# 1. Medicao oficial de tokens
tokens = client.models.count_tokens(model=MODELO_FLASH, contents=prompt).total_tokens
print(f"Total de Tokens do Prompt: {tokens}")

# 2. Execucao com retorno estruturado
response = client.models.generate_content(
    model=MODELO_FLASH,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_mime_type="application/json",
        temperature=0.0
    )
)

print(f"\nResposta Bruta:\n{response.text.strip()}")

# 3. Validacao rigorosa do JSON
try:
    dados = json.loads(response.text)
    assert "nome" in dados and "curso" in dados and "semestre" in dados
    print(f"\nValidacao JSON: SUCESSO! Dados extraidos: {dados}")
except Exception as e:
    print(f"\nValidacao JSON: FALHA ({e})")
```

---

## 🔍 8. Bloco 6: Análise Comparativa dos Resultados & Git Sync (16:25 - 16:35)

Reservem estes 10 minutos para analisar os experimentos nos terminais e sincronizar o código:

1. **Determinismo e Reprodutibilidade:** Em `temperature = 0.0`, as tentativas 1 e 2 foram rigorosamente idênticas? Em que tipo de aplicação corporativa (ex: cálculos fiscais vs geração criativa de e-mails) a temperatura zero é mandatória?
2. **Custo de Tokenização em Português:** Por que a razão Token/Palavra no português foi superior à do inglês? Qual o impacto financeiro dessa discrepância em projetos reais com milhões de requisições?
3. **Aprendizados do Code Golf:** Qual foi o menor prompt que ainda garantiu integridade estrutural? O que causou falhas quando o prompt foi reduzido além do limite?
4. **Sincronização no Repositório Pessoal:**
   - Certifiquem-se de que a pasta `dia_03/` contém os scripts implementados: `01_hello_gemini.py`, `02_token_counter.py`, `03_temperature_lab.py`, `04_top_p_top_k_lab.py` e `desafio_code_golf.py`.
   - **Checagem de Segurança:** Execute `git status` e valide que o `.env` **NÃO** está listado para commit.
   - Sincronize com seu repositório pessoal:
     ```bash
     git add dia_03/
     git commit -m "feat(dia-03): scripts de chamada gemini, tokenizacao, hiperparametros e code golf"
     git push
     ```

---

## 🧠 9. Bloco 7: Quiz Interativo de Fixação (16:35 - 16:45)

> ⏱️ **Horário Oficial:** 16:35 às 16:45 (10 minutos) | **Formato:** Individual ou em duplas

### 📖 Instruções de Acesso
Abra o arquivo local do quiz diretamente em seu navegador de preferência:
- Pelo gerenciador de arquivos: dê um duplo clique no arquivo [`quizzes/quiz_dia_03.html`](quizzes/quiz_dia_03.html).
- Ou arraste o arquivo para uma aba aberta do navegador (Chrome, Firefox, Brave, etc.).
- Alternativamente, pelo terminal:
  ```bash
  python3 -m http.server 8000
  ```
  E acesse no navegador: `http://localhost:8000/quizzes/quiz_dia_03.html`

### 🎯 Estrutura e Mecânica
- **19 questões práticas e conceituais** desenhadas para cobrir integralmente o conteúdo estudado:
  - Carregamento de variáveis de ambiente (`load_dotenv`) e segurança contra vazamento de credenciais via `.gitignore`.
  - Utilização do SDK `google-genai` e parametrização com `genai.Client`.
  - Anatomia de tokens, algoritmo BPE e razão de tokens em diferentes línguas e código.
  - Comportamento de amostragem estocástica com `temperature`, `top_p` e `top_k`.
  - Leitura de métricas de uso com `prompt_token_count` e `candidates_token_count`.
- **Feedback Instantâneo:** Ao submeter cada pergunta (múltipla escolha, verdadeiro ou falso, preenchimento de lacunas e ordenação), o quiz exibe a explicação técnica do porquê cada alternativa é verdadeira ou falsa.
- **Meta:** Obter 100% de acertos para garantir que nenhum conceito fundamental permaneça com dúvidas antes da auto-avaliação final.

---

## 🎁 10. Atividades Complementares

Para estudantes que desejam aprofundar ainda mais os fundamentos técnicos explorados no encontro:

### 1. 🎥 Vídeo de Aprofundamento Visual (3Blue1Brown)
- **Link:** [3Blue1Brown — "But what is a GPT? Visual intro to Transformers"](https://www.youtube.com/watch?v=yMQPQuz5WpA) (27 min)
- **Por que assistir?** Grant Sanderson apresenta a melhor visualização matemática e geométrica da arquitetura Transformer já produzida. O vídeo ilustra intuitivamente como o texto é transformado em vetores no espaço multidimensional, como as matrizes de atenção calculam relações de contexto e como a camada final emite a distribuição de probabilidades de cada próximo token.
- *Observação:* Como requer áudio atento, recomendamos assistir individualmente com fones de ouvido no hub ou em casa.

### 2. 💻 Código Comparativo Avançado: `05_tiktoken_compare.py`
Na indústria de IA, diferentes provedores e famílias de modelos utilizam tokenizadores próprios com vocabulários distintos. Enquanto o Gemini utiliza um tokenizador próprio baseado em SentencePiece, os modelos da OpenAI utilizam a biblioteca `tiktoken` com encodings como o `cl100k_base` (GPT-4) e `o200k_base` (GPT-4o).

Instale a biblioteca `tiktoken` no seu ambiente virtual:
```bash
pip install tiktoken
```

Crie e execute o script `dia_03/05_tiktoken_compare.py`:
```python
import os
import tiktoken
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODELO_FLASH = "gemini-3.8-flash"

# Inicializar o tokenizador oficial da familia OpenAI (usado no GPT-4)
enc = tiktoken.get_encoding("cl100k_base")

textos = {
    "Ingles": "Artificial Intelligence is transforming how we build software systems and interact with data.",
    "Portugues": "A Inteligencia Artificial esta transformando a forma como construimos sistemas de software e interagimos com dados.",
    "Codigo Python": """def calcular_media(valores: list[float]) -> float:
    if not valores:
        return 0.0
    return sum(valores) / len(valores)"""
}

print(f"{'Categoria':<15} | {'Tokens Gemini':<15} | {'Tokens Tiktoken':<15} | {'Diferenca'}")
print("-" * 65)

for categoria, texto in textos.items():
    # Contagem no Gemini
    res_gemini = client.models.count_tokens(model=MODELO_FLASH, contents=texto)
    tokens_gemini = res_gemini.total_tokens
    
    # Contagem no Tiktoken (OpenAI)
    tokens_tiktoken = len(enc.encode(texto))
    
    diferenca = tokens_gemini - tokens_tiktoken
    print(f"{categoria:<15} | {tokens_gemini:<15} | {tokens_tiktoken:<15} | {diferenca:+d}")

# Inspecao detalhada dos bytes de cada token no tiktoken
exemplo_pt = "inteligencia artificial"
tokens_ids = enc.encode(exemplo_pt)
tokens_bytes = [enc.decode_single_token_bytes(tid) for tid in tokens_ids]

print("\nFatiamento detalhado no tiktoken para 'inteligencia artificial':")
for tid, tbytes in zip(tokens_ids, tokens_bytes):
    print(f"ID {tid:<6}: {tbytes}")
```

#### 💡 Reflexão Técnica
Observe como os números totais de tokens não batem perfeitamente entre o Gemini e o Tiktoken. Por que isso acontece? Cada família de modelo treina seu vocabulário BPE a partir de um corpus específico e define um tamanho máximo de vocabulário distinto (por exemplo, ~100k tokens no `cl100k_base` vs ~256k tokens no Gemini), impactando diretamente na granularidade com que palavras raras, acentos e sintaxes de programação são particionadas.

---

## 📝 11. Bloco 8: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 03](https://docs.google.com/forms/d/e/1FAIpQLSfwAa5BJ5wnaXSQ8hABOF5eX5sZCy7yjsPjy_cso6XwPcAigQ/viewform)

> 🎧 **Lembrete para o Dia 04:** Tragam fones de ouvido para o próximo encontro! O material de leitura de Engenharia de Prompt contém vídeos explicativos.

### ✅ Checklist de Conclusão do Dia 03:
- [x] Leituras conceituais sobre LLMs e Tokenização concluídas.
- [x] Variáveis de ambiente configuradas no `.env` e testadas via `python-dotenv`.
- [x] Script `01_hello_gemini.py` executado com inspeção dos metadados de tokens.
- [x] Dinâmica em duplas "Tokenizador Humano" realizada antes do script de contagem.
- [x] Script `02_token_counter.py` executado comparando Inglês, Português e Python.
- [x] Scripts `03_temperature_lab.py` e `04_top_p_top_k_lab.py` executados avaliando determinismo e variabilidade.
- [x] Desafio gamificado "Code Golf de Tokens" concluído com prompt otimizado e validação JSON.
- [x] Análise comparativa realizada e scripts sincronizados no repositório pessoal do GitHub (`git push`).
- [x] Quiz interativo do Dia 03 (`quizzes/quiz_dia_03.html`) respondido com 100% de aproveitamento.
- [x] Formulário diário de auto-avaliação e feedback preenchido no Google Forms.
- [ ] (Complementares) Vídeo do 3Blue1Brown assistido e/ou script comparativo `05_tiktoken_compare.py` implementado.
