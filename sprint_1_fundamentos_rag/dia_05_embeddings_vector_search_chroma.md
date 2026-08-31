# 📅 Dia 05 (18/09 - Sexta-feira)
# 🔍 Embeddings, Similaridade Semântica & ChromaDB Local

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Modalidade:** Estudo Guiado + Hands-on em Duplas + Formação Oficial dos Trios da Sprint 1

---

## 🎯 1. Objetivos do Encontro
1. Compreender o conceito intuitivo de **Embeddings Vetoriais**: como textos são convertidos em listas de números (vetores) em um espaço multidimensional onde significados próximos ficam geometricamente próximos.
2. Entender a diferença entre busca léxica (palavra-chave / SQL `LIKE`) e busca semântica (por significado).
3. Instalar e manipular localmente o **ChromaDB**, o banco de dados vetorial open-source mais popular do ecossistema de IA.
4. Construir um motor de busca semântica local em Python para documentos técnicos.
5. Formar oficialmente os **5 Trios da Sprint 1** para o desenvolvimento do projeto *AskData* na Semana 2.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:25   │ Warm-up Visual: "Geometria do Significado" (Embeddings)│
│ 14:25 - 15:20   │ Setup do ChromaDB + Estudo Guiado & Embeddings API     │
│ 15:20 - 15:35   │ Coffee Break & Conexão                                 │
│ 15:35 - 16:30   │ Laboratório Prático: "Buscador Semântico com ChromaDB" │
│ 16:30 - 17:00   │ Formação dos Trios & Prévia do Projeto da Sprint 1     │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 💡 3. Bloco 1: Warm-up & Intuição dos Vetores (14:00 - 14:25)
* **O que é um Vetor de Embedding?** Uma lista de 768 números decimais (no caso do modelo `text-embedding-004` da Google) que captura o significado semântico, contexto e nuances de um texto.
* **Exemplo de Proximidade:**
  - *"O cachorro latiu no quintal"* e *"O cão fez barulho no jardim"* compartilham quase zero palavras idênticas, mas têm vetores com **distância quase nula** (alta similaridade de cosseno).
  - *"O preço do petróleo subiu na bolsa"* terá um vetor apontando para uma direção completamente diferente no espaço vetorial.
* **Por que precisamos de um Vector Database?** Para fazer consultas ultrarrápidas de vizinhos mais próximos (*Approximate Nearest Neighbors - ANN*) em milhares de documentos sem precisar recalcular distâncias um a um.

---

## 📦 4. Bloco 2: Setup & Estudo Guiado (14:25 - 15:20)

### 1. Instalar o ChromaDB:
Com o venv ativado:
```bash
pip install chromadb
```

### 📚 Materiais de Estudo e Leitura (Tempo estimado: 35 min)
* [O que são Embeddings? - Guia Visual da Cloudflare](https://www.cloudflare.com/pt-br/learning/ai/what-are-embeddings/) — *Leitura em Português (15 min)*: Visualização intuitiva de clusters semânticos.
* [Documentação Oficial do ChromaDB (Getting Started)](https://docs.trychroma.com/) — *Guia prático (15 min)*: Criação de coleções, inserção de documentos com metadados e consultas (`collection.query`).
* [Google GenAI Embeddings Guide](https://ai.google.dev/gemini-api/docs/embeddings) — *Consulta oficial (10 min)*: Utilizando o modelo `text-embedding-004`.

---

## 💻 5. Bloco 3: Laboratório Prático em Duplas (15:35 - 16:30)

As duplas criarão um buscador semântico local que indexa documentos e responde a consultas por significado.

### Script Completo: `buscador_semantico.py`

```python
import os
import chromadb
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# 1. Função auxiliar para gerar embeddings via Gemini API
def gerar_embedding(texto: str) -> list[float]:
    response = client.models.embed_content(
        model="text-embedding-004",
        contents=texto,
    )
    return response.embeddings[0].values

# 2. Inicializar cliente local persistente do ChromaDB (salva na pasta ./chroma_data)
chroma_client = chromadb.PersistentClient(path="./chroma_data")

# 3. Criar ou obter a coleção
collection = chroma_client.get_or_create_collection(
    name="base_conhecimento_datalakers",
    metadata={"hnsw:space": "cosine"} # Utilizar distância de cosseno
)

# 4. Corpus de documentos técnicos para teste
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
        "texto": "Para projetos com LLMs, utilizamos ChromaDB para busca vetorial local e Gemini 2.0 Flash para geração e Structured Outputs.",
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

print("🔄 Gerando embeddings e inserindo documentos no ChromaDB...")
for doc in documentos:
    vetor = gerar_embedding(doc["texto"])
    collection.upsert(
        ids=[doc["id"]],
        embeddings=[vetor],
        documents=[doc["texto"]],
        metadatas=[{"categoria": doc["categoria"]}]
    )

print("✅ Base de conhecimento indexada com sucesso!\n")

# 5. Loop de Busca Semântica Interativa
print("=" * 60)
print("🔍 BUSCADOR SEMÂNTICO LOCAL (Digite 'sair' para encerrar)")
print("=" * 60)

while True:
    query = input("\nDigite sua pergunta ou busca: ").strip()
    if query.lower() in ["sair", "exit", "quit"]:
        break
    if not query:
        continue

    # Gerar vetor da pergunta do usuário
    vetor_query = gerar_embedding(query)

    # Buscar os 2 documentos mais semanticamente próximos
    resultados = collection.query(
        query_embeddings=[vetor_query],
        n_results=2
    )

    print("\n🎯 Resultados Mais Relevantes Encontrados:")
    for i, (doc_texto, meta, dist) in enumerate(zip(
        resultados["documents"][0], 
        resultados["metadatas"][0], 
        resultados["distances"][0]
    ), 1):
        similaridade = 1.0 - dist # Cosseno normalizado
        print(f"\n[{i}] Categoria: {meta['categoria']} (Similaridade: {similaridade:.2%})")
        print(f"    Texto: \"{doc_texto}\"")
```

---

## 👥 6. Bloco 4: Formação dos Trios & Prévia da Semana 2 (16:30 - 17:00)

1. **Formação dos 5 Trios:** Organização oficial dos 15 alunos em 5 trios para a Semana de Projeto (Semana 2).
2. **Apresentação do Desafio "AskData":**
   - Na próxima semana, cada trio construirá uma aplicação completa de **RAG com Streamlit**.
   - Cada trio escolherá um domínio de dados reais (ex: Manuais da PUCRS, Leis Brasileiras, Documentação de Frameworks Python, ou Base Corporativa Simulada da DataLakers).
   - O mentor apresentará a arquitetura de referência que será construída passo a passo do Dia 06 ao Dia 10.

### ✅ Critério de Conclusão do Dia 05 (Fechamento da Semana 1):
- [x] ChromaDB instalado e dados persistidos localmente no disco.
- [x] Geração e manipulação de embeddings com `text-embedding-004`.
- [x] Busca semântica testada com sucesso e compreensão do cálculo de similaridade.
- [x] Trios formados e alinhados para a Semana de Projeto.
