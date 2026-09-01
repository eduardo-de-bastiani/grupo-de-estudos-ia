# 📅 Dia 04 (17/09 - Quinta-feira)
# 📐 Structured Outputs com Pydantic & Gemini 2.0 Flash

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Modalidade:** Leitura de Referência + Hands-on com Pydantic + Desafio em Trios

---

## 🎯 1. Objetivos do Encontro
1. Compreender por que saídas em texto livre ou JSON "artesanal" geram falhas em sistemas de software (`JSONDecodeError`, alucinação de campos, tipos incorretos).
2. Aprender a modelar esquemas de dados estritos utilizando **Pydantic v2** (`BaseModel`, `Field`, `Enum`, validações de tipo).
3. Utilizar o recurso nativo de **Structured Outputs** do Google GenAI SDK (`response_schema` com Pydantic) no Gemini 2.0 Flash.
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

### 2. Script Base: `exemplo_pydantic.py`
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

# 3. Chamada com Structured Outputs nativo
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=f"Extraia os dados estruturados do seguinte texto:\n{texto_curriculo}",
    config={
        "response_mime_type": "application/json",
        "response_schema": PerfilCandidato,
    },
)

# 4. Acesso direto ao objeto Python validado (sem json.loads!)
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
```

---

## 👥 5. Bloco 3: Desafio Prático em Trios (15:45 - 16:45)

### Desafio: "Parser Inteligente de Incidentes e Logs para DataOps"
**Cenário DataLakers:** A equipe de suporte recebe mensagens informais de desenvolvedores relatando erros e falhas em pipelines de dados. O sistema precisa extrair dados estruturados para abrir chamados automaticamente.

**Instruções para o Trio:**
1. Criem o arquivo `parser_incidentes.py`.
2. Modelem o schema Pydantic `IncidenteTI` contendo:
   - `titulo`: Título curto do problema.
   - `severidade`: Enum (`BAIXA`, `MEDIA`, `ALTA`, `CRITICA`).
   - `servico_afetado`: Nome do serviço (ex: `PostgreSQL`, `Kafka`, `API de Pagamentos`, `Airflow ETL`, `Outro`).
   - `descricao_problema`: Resumo técnico do erro.
   - `passos_reproducao`: Lista de strings (`List[str]`).
   - `acoes_recomendadas`: Lista de strings com sugestões de correção imediata (`List[str]`).
3. Testem o parser com pelo menos 3 mensagens de chat simulando problemas reais de infraestrutura e dados.

---

## 🔍 6. Bloco 4: Auto-Avaliação & Conclusões (16:45 - 17:00)

* **Impacto em Arquitetura de Software:** O uso de Pydantic + Structured Outputs permite integrar LLMs diretamente com endpoints de APIs REST (FastAPI) e bancos de dados SQL (PostgreSQL), eliminando falhas de parsing.
* **Próximo Passo (Dia 05):** Como consultar informações em grandes volumes de documentos que não cabem no prompt de uma só vez? Amanhã exploraremos **Embeddings Vetoriais e ChromaDB**.

### ✅ Checklist de Conclusão do Dia 04:
- [x] Leitura de Structured Outputs e Pydantic concluída.
- [x] Pydantic instalado e script base executado com sucesso.
- [x] Desafio em trios do parser de incidentes concluído e validado.
