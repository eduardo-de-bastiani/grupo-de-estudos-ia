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
4. Analisar experimentalmente a disparidade de consumo e custo de tokens em **Português**, **Inglês** e **Código-fonte**.
5. Reproduzir via script Python os controles de hiperparâmetros experimentados ontem no Google AI Studio: **Temperature**, **Top-P** e **Top-K**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Leitura Padronizada de Referência (O que são LLMs?)    │
│ 14:20 - 14:40   │ Setup do Ambiente Local (.env & Instalação google-genai│
│ 14:40 - 15:30   │ Laboratório de Código: Hello Gemini & Contador de Tokens│
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:30   │ Laboratório Empírico de Hiperparâmetros (Temp & Top-P) │
│ 16:30 - 16:45   │ Análise Comparativa em Duplas & Git Sync               │
│ 16:45 - 17:00   │ Formulário de Auto-Avaliação & Feedback (Google Forms) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Leitura Padronizada de Referência (14:00 - 14:20)

Antes de programar, cada estudante deve ler os seguintes materiais de fundamentação conceitual:

1. 📄 [Cloudflare: O que é um modelo de linguagem grande (LLM)?](https://www.cloudflare.com/pt-br/learning/ai/what-is-large-language-model/) — *Como modelos estatísticos de predição do próximo token operam sob arquitetura Transformer.*
2. 📄 [McKinsey: O que é tokenização e incorporação em IA?](https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-tokenization) — *Como o texto cru é fatiado em IDs numéricos para processamento vetorial.*

---

## 🛠️ 4. Setup do Ambiente Local (14:20 - 14:40)

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

## 💻 5. Laboratório de Código em Duplas (14:40 - 16:30)

Trabalhando em duplas, criem uma pasta `dia_03/` para organizar os scripts do dia.

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
> Se algo nao funcionar de primeira, leia o traceback e debugue. Isso faz parte do projeto! 😉
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

---

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

## 🔍 6. Análise Comparativa & Git Sync (16:30 - 16:45)

Analise com sua dupla os resultados obtidos nos terminais:
1. **Determinismo:** Em `temperature = 0.0`, as tentativas 1 e 2 foram idênticas?
2. **Custo de Tokenização em Português:** Por que a razão Token/Palavra no português foi maior que no inglês?
3. **Conexão com o Google AI Studio:** Como a experiência de codar esses scripts se compara com o que vocês experimentaram no Playground ontem?
4. **Sincronização no Repositório Pessoal:** Suba os scripts de hoje para o seu repositório pessoal no GitHub (garantindo que o arquivo `.env` não seja commitado).

---

## 📝 7. Bloco 5: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 03](#) *(Link disponibilizado pelo instrutor em sala)*

> 🎧 **Lembrete para o Dia 04:** Tragam fones de ouvido para o próximo encontro! O material de leitura de Engenharia de Prompt contém vídeos explicativos.

### ✅ Checklist de Conclusão do Dia 03:
- [x] Leituras da Cloudflare sobre LLMs e Tokenização concluídas.
- [x] Variáveis de ambiente configuradas no `.env` e testadas.
- [x] Scripts `01_hello_gemini.py`, `02_token_counter.py`, `03_temperature_lab.py` e `04_top_p_top_k_lab.py` executados com sucesso.
- [x] Scripts sincronizados no repositório pessoal do GitHub.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.
