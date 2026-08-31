# 📅 Dia 04 (17/09 - Quinta-feira)
# 📐 Structured Outputs com Pydantic & Gemini 2.0 Flash

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Modalidade:** Estudo Individual Guiado + Desafio Prático em Trios

---

## 🎯 1. Objetivos do Encontro
1. Compreender por que saídas em texto livre ou JSON "artesanal" geram falhas críticas em sistemas de software (`JSONDecodeError`, alucinação de chaves, tipos incompatíveis).
2. Aprender a modelar esquemas de dados estritos utilizando **Pydantic v2** (`BaseModel`, `Field`, `Enum`, validações de tipo).
3. Utilizar o recurso nativo de **Structured Outputs** do Google GenAI SDK (`response_schema` com Pydantic) no Gemini 2.0 Flash.
4. Construir em trios um pipeline de extração e validação automática de dados não estruturados (currículos e vagas técnicas) para a DataLakers.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Warm-up: O pesadelo do json.loads() em Produção        │
│ 14:20 - 15:30   │ Setup do Pydantic + Leitura Guiada & Exemplos Práticos │
│ 15:30 - 15:45   │ Coffee Break & Descompressão                           │
│ 15:45 - 16:45   │ Desafio em Trios: "Parser de Talentos DataLakers"      │
│ 16:45 - 17:00   │ Debriefing: Conectando LLMs a Bancos de Dados & APIs   │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 💡 3. Bloco 1: Warm-up & O Problema da Estrutura (14:00 - 14:20)
* **O Problema Clássico:** Você pede para a LLM: *"Retorne apenas um JSON válido com os dados do cliente"*. A LLM responde:
  ```
  Aqui está o JSON que você pediu:
  ```json
  { "nome": "João", "idade": 22 }
  ```
  Espero ter ajudado!
  ```
  Ao tentar rodar `json.loads(response.text)`, seu backend em Python quebra instantaneamente.
* **A Solução Moderna (Structured Outputs Garantidos):** A API do Gemini suporta restrição em nível de amostragem gramatical (*Grammar-constrained decoding*), garantindo que 100% dos tokens gerados obedeçam rigorosamente ao schema JSON derivado de um modelo Pydantic.

---

## 📦 4. Bloco 2: Setup & Estudo Guiado (14:20 - 15:30)

### 1. Instalar o Pydantic:
Com o venv ativado:
```bash
pip install pydantic
```

### 📚 Materiais de Consulta & Estudo (Tempo estimado: 40 min)
* [Documentação do Google GenAI: Structured Outputs & JSON Schemas](https://ai.google.dev/gemini-api/docs/structured-output) — *Leitura oficial (15 min)*: Como passar classes Pydantic no parâmetro `response_schema`.
* [Tutorial Interativo de Pydantic v2 em Python](https://docs.pydantic.dev/latest/) — *Consulta rápida (15 min)*: Conceitos de `BaseModel`, tipagem forte (`int`, `str`, `List`, `Optional`) e `Field(description="...")`.
* [Vídeo Curto: Why Pydantic is Essential for AI Engineering](https://www.youtube.com/watch?v=Vj-wKqBqZ_0) — *Vídeo complementar (10 min com fones)*.

### 🧪 Exemplo Prático Base (`exemplo_pydantic.py`):
```python
from enum import Enum
from typing import List, Optional
import os
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, Field

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# 1. Definir os Enums e Modelos Pydantic
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

# 3. Chamada com Structured Outputs
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=f"Extraia os dados estruturados do seguinte texto:\n{texto_curriculo}",
    config={
        "response_mime_type": "application/json",
        "response_schema": PerfilCandidato,
    },
)

# 4. Acesso tipado como objeto Python (sem json.loads manual!)
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

### Desafio: "Parser Inteligente de Incidentes e Logs Técnicos para DataOps"
**Cenário DataLakers:** A equipe de suporte recebe dezenas de mensagens informais no Slack de desenvolvedores relatando falhas e incidentes em pipelines de dados. A empresa precisa de um sistema que processe essas mensagens e gere um JSON estruturado para abertura de tickets.

**Requisitos da Atividade em Trios:**
1. Criar um arquivo `parser_incidentes.py`.
2. Modelar um schema Pydantic `IncidenteTI` contendo:
   - `titulo`: Título curto e padronizado do problema.
   - `severidade`: Enum (`BAIXA`, `MEDIA`, `ALTA`, `CRITICA`).
   - `servico_afetado`: Nome do serviço (ex: `PostgreSQL`, `Kafka`, `API de Pagamentos`, `Pipeline ETL`, `Outro`).
   - `descricao_problema`: Resumo técnico objetivo.
   - `passos_reproducao`: Lista de strings (`List[str]`).
   - `acoes_recomendadas`: Lista de strings com sugestões de correção imediata (`List[str]`).
3. Testar o parser com pelo menos 3 mensagens de chat diferentes (uma falha simples de banco, uma queda de servidor e uma dúvida não relacionada a erro).
4. Garantir que o script trate exceções e imprima uma tabela formatada no terminal.

---

## 🎤 6. Bloco 4: Debriefing & Fechamento (16:45 - 17:00)

* **Discussão:** Como Structured Outputs viabiliza a criação de APIs REST com FastAPI onde o retorno do endpoint é um objeto de negócio 100% tipado?
* **Ponte para o Dia 05:** Agora que sabemos extrair dados limpos de qualquer texto, como fazemos buscas inteligentes em milhões de documentos que não cabem no prompt de uma só vez? A resposta são **Embeddings e Bancos Vetoriais (ChromaDB)**.

### ✅ Critério de Conclusão do Dia 04:
- [x] Pydantic v2 instalado e testado no ambiente virtual.
- [x] Domínio do parâmetro `response_schema` com `google-genai`.
- [x] Desafio em trios do parser de incidentes concluído com sucesso e validação de tipos.
- [x] Compreensão da importância de schemas tipados na engenharia de software com LLMs.
