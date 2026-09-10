# 📅 Dia 05 (18/09 - Sexta-feira)
# 🔍 Embeddings, Similaridade Semântica & ChromaDB Local

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Modalidade:** Leitura de Referência + Laboratório em Duplas + Formação Oficial dos Trios

---

## 🎯 1. Objetivos do Encontro
1. Compreender o conceito intuitivo de **Embeddings Vetoriais**: como textos são transformados em vetores numéricos onde significados próximos ficam geometricamente próximos.
2. Diferenciar busca léxica (palavra-chave / SQL `LIKE`) de busca semântica (por significado).
3. Instalar e utilizar localmente o **ChromaDB** (banco vetorial open-source gratuito), persistindo coleções vetoriais no disco.
4. Construir um motor de busca semântica local em Python com o modelo gratuito **`gemini-embedding-001`**.
5. Formar oficialmente os **5 Trios da Sprint 1** para o desenvolvimento do projeto *AskData* na Semana 2.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:25   │ Leitura Padronizada de Referência (Cloudflare Hub)     │
│ 14:25 - 15:20   │ Setup do ChromaDB + Script de Embeddings & Distâncias  │
│ 15:20 - 15:35   │ Coffee Break & Networking                              │
│ 15:35 - 16:30   │ Laboratório Prático em Duplas: Buscador Semântico      │
│ 16:30 - 16:45   │ Formação dos 5 Trios da Sprint 1 & Alinhamento         │
│ 16:45 - 17:00   │ Formulário de Auto-Avaliação & Feedback (Google Forms) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Bloco 1: Leitura Padronizada de Referência (14:00 - 14:25)

Realize a leitura introdutória no **Cloudflare Learning Hub** e **ChromaDB Docs**:

1. 📄 [Cloudflare: O que são Embeddings?](https://www.cloudflare.com/pt-br/learning/ai/what-are-embeddings/) — *Como vetores em alta dimensão representam conceitos, palavras e documentos.*
2. 📄 [Cloudflare: O que é um Banco de Dados Vetorial?](https://www.cloudflare.com/pt-br/learning/ai/what-is-vector-database/) — *Por que bancos relacionais tradicionais não escalam para busca vetorial de vizinhos mais próximos (ANN).*
3. 📄 [ChromaDB Docs: Getting Started](https://docs.trychroma.com/) — *Visão geral da API do ChromaDB em Python.*

---

## 📦 4. Bloco 2: Setup do ChromaDB + Indexação de Documentos (14:25 - 15:20)

Com o `.venv` ativado:
```bash
pip install chromadb
```

Em duplas, criem e executem `indexar_documentos.py`, que gera os embeddings do corpus e os persiste em disco:

```python
import os
import chromadb
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Modelo gratuito de embeddings do Google AI Studio
EMBEDDING_MODEL = "gemini-embedding-001"

# 1. Função para gerar embeddings via Gemini API
def gerar_embedding(texto: str) -> list[float]:
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=texto,
    )
    return response.embeddings[0].values

# 2. Inicializar cliente local persistente do ChromaDB (salva na pasta ./chroma_data)
chroma_client = chromadb.PersistentClient(path="./chroma_data")

# 3. Criar ou obter a coleção vetorial
collection = chroma_client.get_or_create_collection(
    name="base_conhecimento_datalakers",
    metadata={"hnsw:space": "cosine"} # Utiliza distância de cosseno
)

# 4. Corpus de documentos de exemplo
documentos = [
    {
        "id": "doc_01",
        "texto": "A DataLakers adota pipelines ETL modernos em Python utilizando Apache Airflow para orquestração e DBT para transformação.",
        "categoria": "Engenharia de Dados"
    },
    {
        "id": "doc_02",
        "texto": "Nossos modelos de Machine Learning são empacotados com Docker e versionados com MLflow no cluster Kubernetes.",
        "categoria": "MLOps"
    },
    {
        "id": "doc_03",
        "texto": "Para projetos com LLMs, utilizamos ChromaDB para busca vetorial local e o Modelo Gemini para geração e Grounding.",
        "categoria": "IA Generativa"
    },
    {
        "id": "doc_04",
        "texto": "Os colaboradores possuem horário flexível de trabalho e encontros presenciais às terças e quintas no Tecnopuc.",
        "categoria": "Cultura & RH"
    },
    {
        "id": "doc_05",
        "texto": "A política de segurança exige autenticação em dois fatores (2FA) e proibição de chaves de API commitadas no Git.",
        "categoria": "Segurança"
    }
]

print("Gerando embeddings e inserindo documentos no ChromaDB...")
for doc in documentos:
    vetor = gerar_embedding(doc["texto"])
    collection.upsert(
        ids=[doc["id"]],
        embeddings=[vetor],
        documents=[doc["texto"]],
        metadatas=[{"categoria": doc["categoria"]}]
    )

print(f"Base de conhecimento indexada com sucesso! ({collection.count()} documentos na colecao)")

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

---

## 💻 5. Bloco 3: Laboratório Prático em Duplas — Busca Semântica vs. Léxica (15:35 - 16:30)

Agora, em `buscador_semantico.py`, reabram a coleção já indexada no Bloco 2 (persistida em `./chroma_data`) e construam uma consulta interativa que compara, lado a lado, uma busca léxica ingênua (palavra-chave) com a busca semântica do ChromaDB — assim vocês enxergam na prática a diferença entre os dois tipos de busca:

```python
import os
import chromadb
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Modelo gratuito de embeddings do Google AI Studio
EMBEDDING_MODEL = "gemini-embedding-001"

def gerar_embedding(texto: str) -> list[float]:
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=texto,
    )
    return response.embeddings[0].values

# Reabre a coleção já indexada no Bloco 2 (mesma pasta persistente em disco)
chroma_client = chromadb.PersistentClient(path="./chroma_data")
collection = chroma_client.get_or_create_collection(
    name="base_conhecimento_datalakers",
    metadata={"hnsw:space": "cosine"}
)

# Mesmo corpus do Bloco 2, usado aqui só para a busca léxica de comparação
documentos = [
    {"texto": "A DataLakers adota pipelines ETL modernos em Python utilizando Apache Airflow para orquestração e DBT para transformação."},
    {"texto": "Nossos modelos de Machine Learning são empacotados com Docker e versionados com MLflow no cluster Kubernetes."},
    {"texto": "Para projetos com LLMs, utilizamos ChromaDB para busca vetorial local e o Modelo Gemini para geração e Grounding."},
    {"texto": "Os colaboradores possuem horário flexível de trabalho e encontros presenciais às terças e quintas no Tecnopuc."},
    {"texto": "A política de segurança exige autenticação em dois fatores (2FA) e proibição de chaves de API commitadas no Git."},
]

print("=" * 60)
print("BUSCADOR SEMANTICO vs. BUSCA LEXICA (Digite 'sair' para encerrar)")
print("=" * 60)

while True:
    query = input("\nDigite sua busca em linguagem natural: ").strip()
    if query.lower() in ["sair", "exit", "quit"]:
        break
    if not query:
        continue

    # --- Busca Léxica (contém alguma das palavras da query, literalmente?) ---
    print("\n--- BUSCA LEXICA (palavra-chave) ---")
    termos_query = query.lower().split()
    encontrados_lexico = [
        doc["texto"] for doc in documentos
        if any(termo in doc["texto"].lower() for termo in termos_query)
    ]
    if encontrados_lexico:
        for texto in encontrados_lexico:
            print(f"    - \"{texto}\"")
    else:
        print("    (nenhum documento contém as palavras exatas da busca)")

    # --- Busca Semântica (ChromaDB) ---
    vetor_query = gerar_embedding(query)
    resultados = collection.query(
        query_embeddings=[vetor_query],
        n_results=2
    )

    print("\n--- BUSCA SEMANTICA (ChromaDB) ---")
    for i, (doc_texto, meta, dist) in enumerate(zip(
        resultados["documents"][0],
        resultados["metadatas"][0],
        resultados["distances"][0]
    ), 1):
        similaridade = 1.0 - dist
        print(f"    [{i}] Categoria: {meta['categoria']} (Similaridade: {similaridade:.2%})")
        print(f"        \"{doc_texto}\"")

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

**Experimento sugerido em dupla:** busquem por `"como a empresa organiza dados de forma automatizada"`. A busca léxica provavelmente não encontra nada (nenhuma palavra bate exatamente com o texto), mas a busca semântica deve trazer o `doc_01` sobre Airflow/ETL como resultado mais relevante — essa é a diferença entre buscar por palavra e buscar por significado.

> 💡 Se a geração de embeddings acusar erro ou o ChromaDB reclamar de dimensões incompatíveis, certifique-se de usar o mesmo modelo (`gemini-embedding-001`) para a indexação e para a query. Ler o traceback e debugar faz parte do dia a dia do projeto! 😉

---

## 👥 6. Bloco 4: Formação dos Trios da Sprint 1 (16:30 - 16:45)

1. **Organização Autônoma da Turma:** Os 15 estudantes organizam-se oficialmente em **5 Trios**.
2. **Preparação para a Semana 2:**
   - Leiam o [README da Sprint 1](README.md) para compreender o escopo completo do projeto *AskData*.
   - Combinem no trio ideias de temas e documentos reais (manuais técnicos, documentações open-source, regulamentos) para trazerem na segunda-feira (Dia 06).

---

## 📝 7. Bloco 5: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 05](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão da Semana 1:
- [x] Leituras da Cloudflare sobre Embeddings e Bancos Vetoriais concluídas.
- [x] ChromaDB instalado e testado com persistência local em disco (`indexar_documentos.py`).
- [x] Buscador semântico funcionando com embeddings do Google (`gemini-embedding-001`).
- [x] Comparação prática entre busca léxica e busca semântica realizada em `buscador_semantico.py`.
- [x] Trios formados e alinhados para a Semana de Projeto.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.

---

## 🎁 Extra Opcional (Se Sobrar Tempo)
* 🕹️ [TensorFlow Embedding Projector](https://projector.tensorflow.org/) — ferramenta interativa e sem instalação para visualizar embeddings em 2D/3D e "enxergar" a geometria da similaridade semântica.
* 🎥 [IBM Technology: What is a Vector Database?](https://www.youtube.com/watch?v=gl1r1XV0SLw) — vídeo curto explicando por que bancos vetoriais existem e como se comparam a bancos relacionais tradicionais.
