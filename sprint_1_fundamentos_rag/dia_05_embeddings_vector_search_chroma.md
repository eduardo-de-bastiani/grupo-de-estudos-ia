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
4. Construir um motor de busca semântica local em Python com o modelo gratuito **`gemini-embedding-001`**, indexando um documento técnico real em PDF: o **Manual do Smartwatch Redmi Watch 5 Active** (13 páginas).
5. Formar oficialmente os **5 Trios da Sprint 1** para o desenvolvimento do projeto *AskData* na Semana 2.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:25   │ Leitura Padronizada de Referência (Cloudflare Hub)     │
│ 14:25 - 15:20   │ Setup do ChromaDB + Indexação do Manual em PDF         │
│ 15:20 - 15:35   │ Coffee Break & Networking                              │
│ 15:35 - 16:30   │ Laboratório Prático: Buscador Semântico vs. Léxico     │
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

## 📦 4. Bloco 2: Setup do ChromaDB + Indexação do Manual em PDF (14:25 - 15:20)

Com o `.venv` ativado, instale as bibliotecas necessárias:
```bash
pip install chromadb pypdf
```

### 📄 O Documento Indexável: Manual do Smartwatch em PDF
Em vez de utilizarmos frases soltas ou fictícias, utilizaremos um documento técnico oficial do mundo real: o **Manual do Usuário do Smartwatch Redmi Watch 5 Active** (localizado em [`data/manual_xiaomi_watch5.pdf`](data/manual_xiaomi_watch5.pdf)).

O manual possui 13 páginas ricas em dados técnicos e instruções de uso:
* **Página 4:** Visão geral do relógio, microfone, botão liga/desliga e carregamento com cabo magnético.
* **Página 5 e 6:** Inserindo, retirando e ajustando a pulseira (posicionamento ideal a um dedo de distância do osso do pulso para precisão do sensor de frequência cardíaca).
* **Página 7:** Download e configuração do aplicativo oficial **Mi Fitness** via QR Code e conexão Bluetooth 5.3.
* **Página 8:** Funções de toque, retorno à tela inicial e como **forçar reinicialização segurando o botão por 12 segundos**.
* **Página 9:** Caminho para **restauração de fábrica (Factory Reset)** pelo menu do relógio e aviso crucial de **não utilizar sabão ou produtos de limpeza abrasivos**.
* **Página 10:** Precauções de segurança, carregador certificado e manuseio de bateria.
* **Página 11:** Especificações Técnicas completas (Modelo `M2351W1`, bateria de **470 mAh**, resistência à água **5 ATM**, faixa de temperatura de -10°C a 45°C).
* **Páginas 12 e 13:** Diretrizes de descarte ecológico e canais de atendimento ao cliente.

---

### Script de Indexação: `indexar_documentos.py`
Em duplas, criem e executem o script `indexar_documentos.py`. Ele lê o arquivo PDF com `pypdf`, extrai o texto de cada página, gera os embeddings vetoriais com o modelo gratuito **`gemini-embedding-001`** do Google AI Studio e persiste a coleção no disco local (`./chroma_data`):

```python
import os
import chromadb
from dotenv import load_dotenv
from google import genai
from pypdf import PdfReader

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

EMBEDDING_MODEL = "gemini-embedding-001"

# Suporte flexivel de caminho para execucao da raiz ou de dentro da sprint
caminhos_possiveis = [
    "data/manual_xiaomi_watch5.pdf",
    "sprint_1_fundamentos_rag/data/manual_xiaomi_watch5.pdf"
]
CAMINHO_PDF = next((p for p in caminhos_possiveis if os.path.exists(p)), "data/manual_xiaomi_watch5.pdf")

# 1. Funcao para gerar embeddings vetoriais via Gemini API
def gerar_embedding(texto: str) -> list[float]:
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=texto,
    )
    return response.embeddings[0].values

# 2. Leitura e extracao de paginas do PDF com pypdf
if not os.path.exists(CAMINHO_PDF):
    raise FileNotFoundError(
        f"Arquivo '{CAMINHO_PDF}' nao encontrado! "
        "Certifique-se de que o arquivo manual_xiaomi_watch5.pdf esta na pasta data/."
    )

reader = PdfReader(CAMINHO_PDF)
total_paginas = len(reader.pages)
print(f"Lendo manual em PDF: '{CAMINHO_PDF}' ({total_paginas} paginas)...")

documentos_indexados = []
for num_pagina, pagina in enumerate(reader.pages, start=1):
    texto = (pagina.extract_text() or "").strip()
    if len(texto) > 30:  # Ignora paginas sem conteudo textual relevante
        documentos_indexados.append({
            "id": f"pagina_{num_pagina:02d}",
            "pagina": num_pagina,
            "texto": texto
        })

print(f"Extraidas {len(documentos_indexados)} paginas com conteudo textual.")

# 3. Inicializar cliente local persistente do ChromaDB (salva em ./chroma_data)
chroma_client = chromadb.PersistentClient(path="./chroma_data")

# 4. Criar ou obter a colecao vetorial com similaridade de cosseno
collection = chroma_client.get_or_create_collection(
    name="manual_xiaomi_watch5",
    metadata={"hnsw:space": "cosine"}
)

# 5. Gerar embeddings e indexar cada pagina no ChromaDB
print("Gerando embeddings e inserindo paginas no ChromaDB...")
for doc in documentos_indexados:
    vetor = gerar_embedding(doc["texto"])
    collection.upsert(
        ids=[doc["id"]],
        embeddings=[vetor],
        documents=[doc["texto"]],
        metadatas=[{"pagina": doc["pagina"], "arquivo": "manual_xiaomi_watch5.pdf"}]
    )
    resumo_linha = doc["texto"].split("\n")[0][:45]
    print(f"  -> Indexada Pagina {doc['pagina']:02d}: {resumo_linha}... (ID: {doc['id']})")

print("\n" + "=" * 65)
print(f"Sucesso! Colecao '{collection.name}' pronta com {collection.count()} paginas indexadas.")
print("=" * 65)
```
> 💡 Se algo der erro de importação ou execução, verifique se instalou as dependências com `pip install chromadb pypdf` no seu `.venv`. Ler os logs de erro e debugar faz parte do dia a dia do projeto! 😉

---

## 💻 5. Bloco 3: Laboratório Prático em Duplas — Busca Semântica vs. Léxica (15:35 - 16:30)

Agora, em `buscador_semantico.py`, reabram a coleção já indexada no Bloco 2 (persistida em `./chroma_data`) e construam uma consulta interativa no terminal. O script compara, lado a lado, uma **busca léxica ingênua** (baseada em palavras-chave exatas) com a **busca semântica do ChromaDB** (baseada no significado matemático do embedding):

```python
import os
import chromadb
from dotenv import load_dotenv
from google import genai
from pypdf import PdfReader

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

EMBEDDING_MODEL = "gemini-embedding-001"

caminhos_possiveis = [
    "data/manual_xiaomi_watch5.pdf",
    "sprint_1_fundamentos_rag/data/manual_xiaomi_watch5.pdf"
]
CAMINHO_PDF = next((p for p in caminhos_possiveis if os.path.exists(p)), "data/manual_xiaomi_watch5.pdf")

def gerar_embedding(texto: str) -> list[float]:
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=texto,
    )
    return response.embeddings[0].values

# 1. Carregar paginas do PDF para a comparacao com busca lexica
paginas_lexicas = []
if os.path.exists(CAMINHO_PDF):
    reader = PdfReader(CAMINHO_PDF)
    for i, pagina in enumerate(reader.pages, start=1):
        txt = (pagina.extract_text() or "").strip()
        if len(txt) > 30:
            paginas_lexicas.append({
                "pagina": i,
                "texto": txt
            })

# 2. Reabrir a colecao persistida no ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_data")
collection = chroma_client.get_or_create_collection(
    name="manual_xiaomi_watch5",
    metadata={"hnsw:space": "cosine"}
)

print("=" * 70)
print("BUSCADOR TECNICO DO MANUAL: BUSCA SEMANTICA vs. BUSCA LEXICA")
print(f"Colecao ChromaDB: {collection.name} ({collection.count()} paginas indexadas)")
print("Digite sua pergunta sobre o Smartwatch Xiaomi (ou 'sair' para encerrar)")
print("=" * 70)

while True:
    query = input("\nSua duvida sobre o relogio: ").strip()
    if query.lower() in ["sair", "exit", "quit"]:
        break
    if not query:
        continue

    # --- 1. BUSCA LEXICA (Procura palavras exatas da query no texto) ---
    print("\n--- 1. RESULTADOS DA BUSCA LEXICA (Palavras Exatas) ---")
    termos_query = [t for t in query.lower().split() if len(t) > 2]
    encontrados_lexico = []
    for pag in paginas_lexicas:
        texto_lower = pag["texto"].lower()
        if any(termo in texto_lower for termo in termos_query):
            encontrados_lexico.append(pag["pagina"])

    if encontrados_lexico:
        paginas_str = ", ".join(f"Pagina {p}" for p in encontrados_lexico[:4])
        print(f"  [Match Palavra-Chave]: {paginas_str}")
    else:
        print("  (Nenhuma pagina contem as palavras exatas digitadas)")

    # --- 2. BUSCA SEMANTICA (ChromaDB + Embeddings Gemini) ---
    print("\n--- 2. RESULTADOS DA BUSCA SEMANTICA (Similaridade de Cosseno) ---")
    vetor_query = gerar_embedding(query)
    resultados = collection.query(
        query_embeddings=[vetor_query],
        n_results=2
    )

    for i, (doc_texto, meta, dist) in enumerate(zip(
        resultados["documents"][0],
        resultados["metadatas"][0],
        resultados["distances"][0]
    ), 1):
        similaridade = 1.0 - dist
        primeiras_linhas = " ".join(doc_texto.split("\n")[:3])
        print(f"  [Top #{i}] Pagina {meta['pagina']:02d} do Manual (Similaridade: {similaridade:.2%})")
        print(f"         Trecho: \"{primeiras_linhas[:180]}...\"\n")
```

---

### 🧪 Experimentos Sugeridos em Dupla:
Testem perguntas em linguagem natural e observem como a busca léxica falha e a busca semântica brilha:

1. **Restauração de Fábrica / Reset:**
   * *Pergunta:* `"como resetar o relogio para as configuracoes de fabrica"`
2. **Resistência à Água & Piscina:**
   * *Pergunta:* `"posso mergulhar na piscina ou tomar banho com o relogio?"`
3. **Aplicativo para Celular:**
   * *Pergunta:* `"qual o aplicativo que devo baixar no celular para conectar?"`
4. **Capacidade de Bateria:**
   * *Pergunta:* `"qual a capacidade da bateria em mAh e como carrega?"`
5. **Cuidados com Limpeza e Produtos:**
   * *Pergunta:* `"como limpar o relogio se sujar de suor no treino?"`
6. **Travamento de Tela / Reset Forçado:**
   * *Pergunta:* `"a tela travou e nao responde ao toque, o que fazer?"`

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
- [x] Manual oficial em PDF (`data/manual_xiaomi_watch5.pdf`) lido e indexado página por página com `pypdf` e ChromaDB.
- [x] Buscador semântico funcionando com embeddings do Google (`gemini-embedding-001`).
- [x] Comparação prática entre busca léxica e busca semântica realizada em `buscador_semantico.py` com perguntas reais sobre o smartwatch.
- [x] Trios formados e alinhados para a Semana de Projeto.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.

---

## 🎁 Extra Opcional (Se Sobrar Tempo)
* 🕹️ [TensorFlow Embedding Projector](https://projector.tensorflow.org/) — ferramenta interativa e sem instalação para visualizar embeddings em 2D/3D e "enxergar" a geometria da similaridade semântica.
* 🎥 [IBM Technology: What is a Vector Database?](https://www.youtube.com/watch?v=gl1r1XV0SLw) — vídeo curto explicando por que bancos vetoriais existem e como se comparam a bancos relacionais tradicionais.
