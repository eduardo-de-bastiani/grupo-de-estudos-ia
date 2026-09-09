# 📅 Dia 04 (17/09 - Quinta-feira)
# 📐 Structured Outputs com Pydantic & Modelo Flash Gemini

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Modalidade:** Leitura de Referência + Hands-on com Pydantic + Desafio em Trios

---

## 🎯 1. Objetivos do Encontro
1. Compreender por que saídas em texto livre ou JSON "artesanal" geram falhas em sistemas de software (`JSONDecodeError`, alucinação de campos, tipos incorretos).
2. Aprender a modelar esquemas de dados estritos utilizando **Pydantic v2** (`BaseModel`, `Field`, `Enum`, validações de tipo).
3. Utilizar o recurso nativo de **Structured Outputs** do Google GenAI SDK (`response_schema` com Pydantic) no **Modelo Flash Gemini**.
4. Construir em trios um pipeline de extração e validação automática de dados não estruturados (incidentes de TI e logs).

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:25   │ Leitura Padronizada de Referência (Google Docs / Pyd.) │
│ 14:25 - 15:30   │ Setup do Pydantic + Script Base com Gemini             │
│ 15:30 - 15:45   │ Coffee Break & Descompressão                           │
│ 15:45 - 16:45   │ Desafio em Trios: "Parser de Incidentes para DataOps"  │
│ 16:45 - 17:00   │ Auto-Avaliação & Conclusões de Engenharia de Software  │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:25)

Realize a leitura dos materiais de referência sobre saídas estruturadas e tipagem:

1. 📄 [Google AI Docs: Structured Outputs com JSON Schemas](https://ai.google.dev/gemini-api/docs/structured-output) — *Como a API do Gemini força o modelo a gerar 100% de conformidade com schemas Pydantic.*
2. 📄 [Pydantic v2: Models & Validation Overview](https://docs.pydantic.dev/latest/) — *Conceito de `BaseModel`, campos tipados (`int`, `str`, `List`, `Enum`) e metadados com `Field(description="...")`.*

---

## 📦 4. Bloco 2: Setup & Script Base (14:25 - 15:30)

### 1. Instalação no Terminal:
Com o `.venv` ativado:
```bash
pip install pydantic
```

### 2. O Problema: Texto Livre Não é Confiável — `demo_problema_texto_livre.py`
Antes de ver a solução, reproduzam o problema. Peçam ao Gemini uma saída "JSON artesanal" via texto livre (sem `response_schema`) e tentem fazer o parse manualmente:

```python
import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELO_FLASH = "gemini-3.8-flash"

response = client.models.generate_content(
    model=MODELO_FLASH,
    contents="Extraia nome e senioridade em JSON do texto: 'Meu nome é Ana, sou desenvolvedora sênior.'",
)

print("📄 Resposta bruta do modelo:")
print(response.text)

print("\n🔴 Tentando fazer parse manual com json.loads()...")
try:
    dados = json.loads(response.text)
    print("✅ Parse funcionou:", dados)
except json.JSONDecodeError as e:
    print(f"❌ JSONDecodeError: {e}")

# 💡 Dica de Engenharia: Se algo não funcionar de primeira, leia o traceback e debugar faz parte do projeto! 😉
```

Rodem esse script algumas vezes (em duplas, comparem os resultados). É comum o modelo envolver o JSON em blocos de markdown (` ```json ... ``` `), adicionar uma frase explicativa antes/depois, trocar o nome de um campo ou omitir um campo — qualquer uma dessas variações quebra um parser rígido em produção. É exatamente esse problema que o `response_schema` do script a seguir resolve de forma determinística.

### 3. Script Base: `exemplo_pydantic.py`
Analise e execute o exemplo abaixo para ver como o retorno é um objeto Python tipado:

```python
from enum import Enum
from typing import List, Optional
import os
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, Field

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# 1. Definição do Modelo Pydantic
class NivelSenioridade(str, Enum):
    ESTAGIARIO = "Estagiário"
    JUNIOR = "Júnior"
    PLENO = "Pleno"
    SENIOR = "Sênior"

class Habilidade(BaseModel):
    nome: str = Field(description="Nome da tecnologia ou competência técnica.")
    anos_experiencia: Optional[float] = Field(default=None, description="Tempo estimado de experiência em anos.")

class PerfilCandidato(BaseModel):
    nome: str = Field(description="Nome completo do candidato.")
    email: Optional[str] = Field(default=None, description="E-mail de contato se presente.")
    senioridade_estimada: NivelSenioridade
    habilidades_principais: List[Habilidade]
    resumo_executivo: str = Field(description="Resumo de 2 linhas sobre os pontos fortes do perfil.")

# 2. Texto não estruturado recebido
texto_curriculo = """
Olá equipe da DataLakers! Me chamo Eduardo Silva (eduardo.silva@pucrs.br). 
Sou estudante do 4º semestre de Sistemas de Informação. Trabalho com Python há 2 anos, 
faço scripts de automação e manipulação de dados com Pandas. Nos últimos 6 meses tenho 
estudado LLMs e bancos vetoriais, desenvolvendo pequenas aplicações em Streamlit e FastAPI.
Gostaria muito de uma oportunidade de estágio em IA Generativa na empresa.
"""

# 3. Chamada com Structured Outputs nativo no Modelo Flash Gemini
MODELO_FLASH = "gemini-3.8-flash"

response = client.models.generate_content(
    model=MODELO_FLASH,
    contents=f"Extraia os dados estruturados do seguinte texto:\n{texto_curriculo}",
    config={
        "response_mime_type": "application/json",
        "response_schema": PerfilCandidato,
    },
)

# 4. Acesso direto ao objeto Python validado (sem json.loads manual!)
perfil: PerfilCandidato = response.parsed

print("=" * 60)
print("✅ DADOS EXTRAÍDOS E VALIDADOS COM PYDANTIC:")
print("=" * 60)
print(f"👤 Nome: {perfil.nome}")
print(f"📧 E-mail: {perfil.email}")
print(f"💼 Senioridade: {perfil.senioridade_estimada.value}")
print(f"📝 Resumo: {perfil.resumo_executivo}")
print("\n🛠️ Habilidades Identificadas:")
for hab in perfil.habilidades_principais:
    anos = f"({hab.anos_experiencia} anos)" if hab.anos_experiencia else "(não informado)"
    print(f" - {hab.nome} {anos}")

# 💡 Dica de Engenharia: Se algo não funcionar de primeira, leia o traceback e debugar faz parte do projeto! 😉
```

> 💡 **Dica de Engenharia:** Se a validação do Pydantic acusar `ValidationError`, examine se algum campo obrigatório do modelo não foi retornado ou defina valores padrão / `Optional`. Ler o traceback e debugar faz parte do dia a dia do projeto! 😉

---

## 👥 6. Bloco 3: Desafio Prático em Trios (15:45 - 16:45)

### Desafio: "Parser Inteligente de Incidentes e Logs para DataOps"
**Cenário DataLakers:** A equipe de suporte recebe mensagens informais de desenvolvedores relatando erros e falhas em pipelines de dados. O sistema precisa extrair dados estruturados para abrir chamados automaticamente.

**Instruções para o Trio:**
1. Criem o arquivo `parser_incidentes.py`.
2. Modelem o schema Pydantic `IncidenteTI` contendo:
   - `titulo`: Título curto do problema.
   - `severidade`: Enum (`BAIXA`, `MEDIA`, `ALTA`, `CRITICA`).
   - `servico_afetado`: Enum (`POSTGRESQL`, `KAFKA`, `API_PAGAMENTOS`, `AIRFLOW_ETL`, `OUTRO`) — modelem como Enum, igual fizeram com `severidade`, em vez de string livre.
   - `descricao_problema`: Resumo técnico do erro.
   - `passos_reproducao`: Lista de strings (`List[str]`).
   - `acoes_recomendadas`: Lista de strings com sugestões de correção imediata (`List[str]`).
3. Testem o parser com pelo menos 3 mensagens de chat simulando problemas reais de infraestrutura e dados.

---

## 🔍 7. Bloco 4: Auto-Avaliação & Conclusões (16:45 - 17:00)

* **Impacto em Arquitetura de Software:** O uso de Pydantic + Structured Outputs permite integrar LLMs diretamente com endpoints de APIs REST (FastAPI) e bancos de dados SQL (PostgreSQL), eliminando falhas de parsing.
* **Próximo Passo (Dia 05):** Como consultar informações em grandes volumes de documentos que não cabem no prompt de uma só vez? Amanhã exploraremos **Embeddings Vetoriais e ChromaDB**.

### ✅ Checklist de Conclusão do Dia 04:
- [x] Leitura de Structured Outputs e Pydantic concluída.
- [x] `demo_problema_texto_livre.py` executado com o Modelo Flash Gemini, reproduzindo um `JSONDecodeError` real com parsing manual.
- [x] Pydantic instalado e script base executado com sucesso no Modelo Flash Gemini (`gemini-3.8-flash`).
- [x] Desafio em trios do parser de incidentes concluído e validado, com `servico_afetado` modelado como Enum.

---

## 🎁 Extra Opcional (Se Sobrar Tempo)
* 📄 [Real Python: Pydantic — Simplifying Data Validation in Python](https://realpython.com/python-pydantic/) — tutorial mais aprofundado sobre validadores customizados e gerenciamento de configurações.
* 📓 [Gemini Cookbook: Structured Outputs em PDFs (Notebook)](https://github.com/google-gemini/cookbook/blob/main/examples/Pdf_structured_outputs_on_invoices_and_forms.ipynb) — exemplo oficial do Google usando `response_schema` para extrair dados estruturados de faturas e formulários em PDF.
