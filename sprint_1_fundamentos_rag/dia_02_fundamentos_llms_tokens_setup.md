# 📅 Dia 02 (15/09 - Terça-feira)
# 🧠 O que são LLMs? Tokens, Parâmetros & Google AI Studio

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Modalidade:** Estudo Individual Guiado + Desafio Prático em Duplas

---

## 🎯 1. Objetivos do Encontro
1. Compreender a intuição fundamental por trás de Modelos de Linguagem de Grande Porte (LLMs): como funcionam como "preditores probabilísticos do próximo token" (sem fórmulas matemáticas pesadas).
2. Diferenciar Machine Learning tradicional (classificação/regressão supervisionada) de IA Generativa.
3. Obter e configurar uma chave de API **100% gratuita** no **Google AI Studio** (sem necessidade de cartão de crédito).
4. Escrever o primeiro script Python utilizando o SDK oficial `google-genai` e manipular hiperparâmetros fundamentais: `temperature`, `top_p`, `top_k` e contagem de tokens.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Warm-up: "Autocompletar com Esteroides" — A Lógica LLM │
│ 14:20 - 15:30   │ Setup do Google AI Studio + Leitura Guiada & Vídeo     │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:45   │ Laboratório Prático em Duplas: Tokens & Hiperparâmetros│
│ 16:45 - 17:00   │ Debriefing Coletivo: O que aprendemos sobre Temperatura│
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 💡 3. Bloco 1: Warm-up & Conceito (14:00 - 14:20)
* **A Grande Ideia:** Uma LLM não "pensa" como um ser humano. Ela calcula a distribuição de probabilidade da próxima palavra (ou sub-palavra / token) dado um contexto de entrada.
* **Tokens ≠ Palavras:** Em média, 1 token ≈ 0.75 palavras em inglês. Em português, devido à tokenização baseada em sub-palavras, muitas vezes 1 palavra pode virar 2 ou 3 tokens (ex: "desenvolvimento" -> `des`, `envolv`, `imento`).
* **Hiperparâmetros de Amostragem:**
  * `temperature` (0.0 a 2.0): Controla a aleatoriedade. `0.0` é determinístico (sempre escolhe o token mais provável); `1.0+` aumenta a criatividade (mas também o risco de alucinação).
  * `top_p` (Nucleus Sampling): Seleciona apenas os tokens cuja probabilidade acumulada atinge o valor P (ex: 0.95 descarta o 5% menos provável).

---

## 📖 4. Bloco 2: Setup do Google AI Studio & Conteúdo Curado (14:20 - 15:30)

### 🔑 Passo a Passo: Obtenção da API Key Gratuita (Tempo estimado: 15 min)
1. Acesse o portal oficial: [Google AI Studio](https://aistudio.google.com/)
2. Faça login com sua conta Google (@gmail.com ou institucional).
3. No menu lateral, clique em **"Get API key"** -> **"Create API key in new project"**.
4. Copie a chave gerada.
   > ⚠️ **Atenção de Segurança:** NUNCA suba sua API Key para o GitHub público! Usaremos o arquivo `.env` para guardá-la com segurança.

### 📦 Instalação das Bibliotecas no Python (venv):
Com o ambiente virtual ativado no terminal:
```bash
pip install google-genai python-dotenv
```

### 📚 Materiais de Leitura & Vídeos Curados (Tempo estimado: 40 min)
* [O que são Large Language Models (LLMs)? - Cloudflare Learning](https://www.cloudflare.com/pt-br/learning/ai/what-is-large-language-model/) — *Leitura em Português (15 min)*: Explicação conceitual de redes neurais, transformers e treinamento sem jargões matemáticos excessivos.
* [Vídeo: How LLMs Actually Work (Visual Guide) - 3Blue1Brown (Trecho Introdutório)](https://www.youtube.com/watch?v=wjZofJX0v4U) — *Vídeo no YouTube (15 min com fones)*: Visualização gráfica fantástica de vetores e predição de tokens.
* [Documentação Oficial do Google Gen AI SDK](https://github.com/google-gemini/cookbook) — *Consulta Rápida (10 min)*: Exemplos oficiais em Python da biblioteca `google-genai`.

---

## 💻 5. Bloco 3: Laboratório Prático em Duplas (15:45 - 16:45)

Trabalho em duplas para implementar e analisar 3 scripts práticos.

### 📁 Estrutura de Arquivos da Atividade:
```
dia_02/
├── .env
├── .gitignore
├── 01_hello_gemini.py
├── 02_token_counter.py
└── 03_temperature_lab.py
```

### Passo 1: Configurar `.env` e `.gitignore`
Crie o arquivo `.env`:
```env
GEMINI_API_KEY=sua_chave_aqui_sem_aspas
```

Crie o arquivo `.gitignore`:
```
.env
.venv/
__pycache__/
```

---

### Passo 2: Script `01_hello_gemini.py` (Primeira Chamada)
```python
import os
from dotenv import load_dotenv
from google import genai

# Carregar variável de ambiente do .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Erro: GEMINI_API_KEY não encontrada no arquivo .env!")

# Inicializar o cliente oficial da Google
client = genai.Client(api_key=api_key)

# Fazer chamada ao modelo Gemini 2.0 Flash
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explique em exatamente 2 frases por que entender tokens é importante para um desenvolvedor de software.",
)

print("\n🤖 Resposta do Gemini:")
print(response.text)
print("\n📊 Metadados de Uso (Tokens):")
print(f"Tokens de Entrada (Prompt): {response.usage_metadata.prompt_token_count}")
print(f"Tokens de Saída (Resposta): {response.usage_metadata.candidates_token_count}")
print(f"Total de Tokens: {response.usage_metadata.total_token_count}")
```

---

### Passo 3: Script `02_token_counter.py` (Investigação de Idiomas)
Este script investiga a diferença de consumo de tokens entre Inglês, Português e Código Python:

```python
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

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
    res = client.models.count_tokens(model="gemini-2.0-flash", contents=texto)
    qtd_chars = len(texto)
    qtd_palavras = len(texto.split())
    qtd_tokens = res.total_tokens
    razao = qtd_tokens / max(qtd_palavras, 1)
    print(f"{categoria:<15} | {qtd_chars:<12} | {qtd_palavras:<10} | {qtd_tokens:<8} | {razao:.2f}")
```

---

### Passo 4: Script `03_temperature_lab.py` (Experimento de Temperatura)
As duplas testarão como o mesmo prompt reage sob 3 temperaturas diferentes (`0.0`, `0.7`, `1.5`):

```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

prompt = "Crie uma metáfora curta e poética para explicar o que é uma função recursiva na programação."

temperaturas = [0.0, 0.7, 1.5]

print(f"🎯 Prompt Testado: '{prompt}'\n")

for temp in temperaturas:
    print(f"\n" + "=" * 50)
    print(f"🔥 EXPERIMENTO COM TEMPERATURA = {temp}")
    print("=" * 50)
    
    # Rodar 2 vezes para cada temperatura para verificar determinismo
    for tentativa in range(1, 3):
        response = client.models.generate_content(
            model="gemini-2.0-flash",
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

## 🎤 6. Bloco 4: Debriefing & Conclusões (16:45 - 17:00)

Discussão aberta com a sala liderada pelo mentor:
1. **O que aconteceu na `temperatura = 0.0` entre a tentativa 1 e a tentativa 2?** (Esperado: respostas praticamente idênticas - determinismo).
2. **O que aconteceu na `temperatura = 1.5`?** (Esperado: metáforas mais ousadas, vocabulário incomum ou saídas mais instáveis).
3. **Por que o texto em Português gerou mais tokens por palavra do que o texto em Inglês?** (Discussão sobre o vocabulário do tokenizer BPE ser treinado predominantemente em corpus em inglês).

### ✅ Critério de Conclusão do Dia 02:
- [x] Chave de API do Google AI Studio criada e configurada com segurança no `.env`.
- [x] Script de chamada ao `gemini-2.0-flash` executado com sucesso no terminal.
- [x] Experimento de contagem de tokens executado e diferenças de idioma compreendidas.
- [x] Efeito prático da `temperature` verificado em código.
