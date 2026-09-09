# 📅 Dia 02 (15/09 - Terça-feira)
# 🧠 O que são LLMs? Tokens, Parâmetros & Google AI Studio

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Modalidade:** Leitura Padronizada de Referência + Laboratório Prático em Duplas

---

## 🎯 1. Objetivos do Encontro
1. Compreender a intuição fundamental por trás de Modelos de Linguagem de Grande Porte (LLMs): como funcionam como preditores probabilísticos do próximo token.
2. Diferenciar Machine Learning tradicional (classificação/regressão supervisionada) de IA Generativa.
3. Obter e configurar uma chave de API **100% gratuita** no **Google AI Studio** (sem necessidade de cartão de crédito).
4. Escrever o primeiro script Python utilizando o SDK oficial `google-genai` com o **Modelo Flash Gemini** e manipular hiperparâmetros fundamentais: `temperature`, `top_p`, `top_k` e contagem de tokens.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:25   │ Leitura Padronizada de Referência (Cloudflare Hub)     │
│ 14:25 - 15:30   │ Setup do Google AI Studio + Primeiro Script Python     │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:45   │ Lab em Duplas: Tokens, Temperatura, Top-P & Top-K      │
│ 16:45 - 17:00   │ Auto-Avaliação & Conclusões dos Experimentos           │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:25)

Antes de programar, cada aluno deve realizar a leitura introdutória nos artigos de referência da **Cloudflare Learning** (10-15 min total, em português, sem paywall):

1. 📄 [Cloudflare: O que é um Large Language Model (LLM)?](https://www.cloudflare.com/pt-br/learning/ai/what-is-large-language-model/) — *Conceito de redes neurais profundas, corpus de treinamento e predição probabilística.*
2. 📄 [Cloudflare: O que é um modelo Transformer?](https://www.cloudflare.com/pt-br/learning/ai/what-is-a-transformer-model/) — *Mecanismo de atenção (Self-Attention) e por que ele revolucionou o processamento de texto.*
3. 🛠️ *(Opcional / Interativo)* [TikTokenizer Web Tool](https://tiktokenizer.vercel.app/) — *Experimente digitar frases em português e inglês para ver como o texto é dividido em IDs numéricos de tokens.*

---

## 🔑 4. Bloco 2: Setup do Google AI Studio & Primeiro Script (14:25 - 15:30)

### Passo 1: Obter a API Key Gratuita (Sem Cartão de Crédito)
1. Acesse o portal: [Google AI Studio](https://aistudio.google.com/)
2. Faça login com sua conta Google.
3. No menu lateral, clique em **"Get API key"** -> **"Create API key in new project"**.
4. Copie a chave gerada.

### Passo 2: Instalação das Bibliotecas no Terminal
Com o `.venv` ativado:
```bash
pip install google-genai python-dotenv
```

### Passo 3: Configurar o Arquivo de Credenciais
Na raiz do seu projeto, crie o arquivo `.env`:
```env
GEMINI_API_KEY=sua_chave_aqui_sem_aspas
```

Garanta que o `.gitignore` contenha o `.env`:
```gitignore
.env
.venv/
__pycache__/
```

### Passo 4: Primeira Chamada Oficial — `01_hello_gemini.py`
Para verificar que o setup funcionou, criem e executem o primeiro script:
```python
import os
from dotenv import load_dotenv
from google import genai

# Carregar variáveis de ambiente do .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("❌ Erro: GEMINI_API_KEY não encontrada no arquivo .env!")

# Inicializar o cliente oficial do Google GenAI
client = genai.Client(api_key=api_key)

# Definir o Modelo Flash Gemini
MODELO_FLASH = "gemini-3.8-flash"

# Chamada ao Modelo Flash Gemini
response = client.models.generate_content(
    model=MODELO_FLASH,
    contents="Explique em exatamente 2 frases por que entender tokens é importante para um desenvolvedor de software.",
)

print("\n🤖 Resposta do Gemini:")
print(response.text)
print("\n📊 Metadados de Uso (Tokens):")
print(f"Tokens de Entrada (Prompt): {response.usage_metadata.prompt_token_count}")
print(f"Tokens de Saída (Resposta): {response.usage_metadata.candidates_token_count}")
print(f"Total de Tokens: {response.usage_metadata.total_token_count}")
```

> 💡 **Dica de Engenharia:** Se algo der erro de autenticação ou modelo, confira a sua `GEMINI_API_KEY` no `.env` e certifique-se de que o ambiente virtual está ativo. Ler os logs de erro e debugar faz parte do dia a dia do projeto! 😉

---

### Script 2: `02_token_counter.py` (Investigação de Idiomas e Código)
```python
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

textos = {
    "Inglês": "Artificial Intelligence is transforming how we build software systems and interact with data.",
    "Português": "A Inteligência Artificial está transformando a forma como construímos sistemas de software e interagimos com dados.",
    "Código Python": """
def calcular_media(valores: list[float]) -> float:
    if not valores:
        return 0.0
    return sum(valores) / len(valores)
"""
}

print(f"{'Categoria':<15} | {'Caracteres':<12} | {'Palavras':<10} | {'Tokens':<8} | {'Razão Token/Palavra'}")
print("-" * 70)

for categoria, texto in textos.items():
    res = client.models.count_tokens(model=MODELO_FLASH, contents=texto)
    qtd_chars = len(texto)
    qtd_palavras = len(texto.split())
    qtd_tokens = res.total_tokens
    razao = qtd_tokens / max(qtd_palavras, 1)
    print(f"{categoria:<15} | {qtd_chars:<12} | {qtd_palavras:<10} | {qtd_tokens:<8} | {razao:.2f}")

# 💡 Dica de Engenharia: Se algo não funcionar de primeira, leia o traceback e debugar faz parte do projeto! 😉
```

---

### Script 3: `03_temperature_lab.py` (Experimento Empírico de Temperatura)
```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

prompt = "Crie uma metáfora curta e poética para explicar o que é uma função recursiva na programação."
temperaturas = [0.0, 0.7, 1.5]

print(f"🎯 Prompt Testado: '{prompt}'\n")

for temp in temperaturas:
    print(f"\n" + "=" * 50)
    print(f"🔥 EXPERIMENTO COM TEMPERATURA = {temp}")
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

# 💡 Dica de Engenharia: Se algo não funcionar de primeira, leia o traceback e debugar faz parte do projeto! 😉
```

---

### Script 4: `04_top_p_top_k_lab.py` (Experimento com Top-P e Top-K)
Além da temperatura, `top_p` (nucleus sampling) e `top_k` também controlam a diversidade da resposta, restringindo o conjunto de tokens candidatos a cada passo de geração:

```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

prompt = "Sugira um nome criativo para uma startup de IA que ajuda desenvolvedores a debugar código."

print(f"🎯 Prompt Testado: '{prompt}'\n")

# Experimento 1: variando TOP_P (temperature fixa em 1.0)
print("=" * 50)
print("🎲 EXPERIMENTO 1: Variando TOP_P (temperature=1.0)")
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
print("🎯 EXPERIMENTO 2: Variando TOP_K (temperature=1.0)")
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

# 💡 Dica de Engenharia: Se algo não funcionar de primeira, leia o traceback e debugar faz parte do projeto! 😉
```

**Dica de observação:** com `top_k=1`, o modelo só pode escolher o token mais provável a cada passo (praticamente determinístico, mesmo com `temperature=1.0`). Conforme `top_p`/`top_k` aumentam, mais nomes criativos tendem a aparecer.

---

## 🔍 6. Bloco 4: Auto-Avaliação & Conclusões (16:45 - 17:00)

Analise com sua dupla os resultados obtidos nos terminais:
1. **Determinismo:** Em `temperature = 0.0`, as tentativas 1 e 2 foram praticamente idênticas? (Isso é crucial quando precisamos de precisão lógica e código).
2. **Criatividade vs Caos:** Em `temperature = 1.5`, a metáfora ficou mais criativa ou começou a perder coerência sintática?
3. **Custo de Tokenização em Português:** Por que a razão Token/Palavra no português foi maior que no inglês? (O vocabulário BPE da maioria das LLMs é predominantemente treinado em inglês, dividindo palavras em português em múltiplos pedaços menores).
4. **Top-P e Top-K:** Com `top_k=1`, as respostas ficaram praticamente iguais entre si mesmo com `temperature=1.0`? Por quê? Em que cenário real (ex: geração de código vs. brainstorm criativo) você usaria `top_k` baixo e em qual usaria alto?

### ✅ Checklist de Conclusão do Dia 02:
- [x] Leituras da Cloudflare concluídas.
- [x] API Key do Google AI Studio configurada no `.env`.
- [x] Scripts `01_hello_gemini.py`, `02_token_counter.py`, `03_temperature_lab.py` e `04_top_p_top_k_lab.py` executados com o Modelo Flash Gemini (`gemini-3.8-flash`).
- [x] Entendimento prático de Tokens, Temperatura, Top-P e Top-K consolidado.

---

## 🎁 Extra Opcional (Se Sobrar Tempo)
* 🎥 [3Blue1Brown: But what is a GPT? Visual intro to Transformers](https://www.youtube.com/watch?v=yMQPQuz5WpA) — vídeo (27 min, inglês com legendas) com visualização de como um Transformer prevê o próximo token.
* 🕹️ [Transformer Explainer (Georgia Tech)](https://poloclub.github.io/transformer-explainer/) — roda um GPT-2 pequeno direto no navegador (sem instalação) e mostra em tempo real a atenção e a geração de tokens.
