# 📅 Dia 07 (22/09 - Terça-feira)
# ⚙️ Pipeline de Ingestão de Dados & Chunking Estratégico

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Semana 2:** Desenvolvimento do Projeto "AskData" em Trios

---

## 🎯 1. Objetivos do Encontro
1. Dominar os conceitos de **Chunking de Documentos** (tamanho do bloco, taxa de sobreposição/overlap e preservação semântica).
2. Construir um extrator de texto robusto para arquivos **PDF** e **Markdown** utilizando a biblioteca `pypdf`.
3. Implementar o módulo `src/ingestion.py` do projeto em cada trio, garantindo que metadados cruciais (arquivo de origem, número da página, ID do chunk) sejam indexados junto aos vetores no **ChromaDB**.
4. Validar o pipeline de ingestão com o corpus de documentos selecionado pelo trio.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:15   │ Daily Standup: Alinhamento de Metas do Dia por Trio    │
│ 14:15 - 14:45   │ Masterclass: A Arte do Chunking (Tamanho vs Overlap)   │
│ 14:45 - 15:30   │ Mão na Massa: Implementação do Loader & Chunking       │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:45   │ Mão na Massa: Integração e Persistência no ChromaDB    │
│ 16:45 - 17:00   │ Verificação dos Bancos Vetoriais & Git Commit/Push     │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 💡 3. Bloco 1: Masterclass — A Arte do Chunking (14:15 - 14:45)

* **Por que não vetorizar o documento inteiro de uma vez?**
  1. *Diluição Semântica:* Um vetor de 768 dimensões para um PDF de 50 páginas perde as nuances específicas de cada parágrafo.
  2. *Precisão de Recuperação:* Chunks menores e focados (500 a 800 caracteres) permitem injetar no prompt da LLM apenas o trecho exato que responde à pergunta do usuário.
* **O Papel do Overlap (Sobreposição):**
  - Se dividirmos um texto rigidamente a cada 500 caracteres, uma frase importante pode ser cortada no meio (*ex: "A taxa de juros é de..." [corte] "... 12% ao ano"*).
  - Um overlap de 10% a 20% (100 caracteres) garante que a fronteira entre os blocos preserve a continuidade das frases.

```
Texto Original: [ ────────────────────────────────────────────────────────── ]
Chunk 1:        [ ════════════════════ ]
Chunk 2:                     [ ════════════════════ ]   (Overlap: ░░░░)
Chunk 3:                                  [ ════════════════════ ]
```

---

## 📦 4. Bloco 2: Setup & Dependências (14:45 - 15:00)

Instalar o extrator de PDF oficial no ambiente virtual:
```bash
pip install pypdf
```

---

## 💻 5. Bloco 3: Implementação do Módulo `src/ingestion.py` (15:00 - 16:45)

Cada trio implementará e adaptará o módulo de ingestão para ler sua pasta `data/`.

### Código de Referência: `src/ingestion.py`

```python
import os
import glob
from pathlib import Path
from pypdf import PdfReader
import chromadb
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def extrair_texto_pdf(caminho_pdf: str) -> list[dict]:
    """Lê um arquivo PDF e retorna uma lista de páginas com texto e metadados."""
    reader = PdfReader(caminho_pdf)
    paginas = []
    nome_arquivo = Path(caminho_pdf).name
    
    for idx, pagina in enumerate(reader.pages):
        texto = pagina.extract_text() or ""
        if texto.strip():
            paginas.append({
                "texto": texto.strip(),
                "arquivo": nome_arquivo,
                "pagina": idx + 1
            })
    return paginas

def extrair_texto_markdown(caminho_md: str) -> list[dict]:
    """Lê um arquivo Markdown e retorna o texto com metadados."""
    nome_arquivo = Path(caminho_md).name
    with open(caminho_md, "r", encoding="utf-8") as f:
        texto = f.read().strip()
    
    if texto:
        return [{
            "texto": texto,
            "arquivo": nome_arquivo,
            "pagina": 1
        }]
    return []

def criar_chunks(documentos_paginas: list[dict], chunk_size: int = 700, chunk_overlap: int = 100) -> list[dict]:
    """Divide os textos das páginas em blocos menores com sobreposição."""
    chunks = []
    
    for item in documentos_paginas:
        texto = item["texto"]
        inicio = 0
        chunk_idx = 1
        
        while inicio < len(texto):
            fim = inicio + chunk_size
            trecho = texto[inicio:fim]
            
            chunk_id = f"{item['arquivo']}_p{item['pagina']}_c{chunk_idx}"
            chunks.append({
                "id": chunk_id,
                "texto": trecho,
                "arquivo": item["arquivo"],
                "pagina": item["pagina"],
                "chunk_idx": chunk_idx
            })
            
            inicio += (chunk_size - chunk_overlap)
            chunk_idx += 1
            
    return chunks

def indexar_no_chromadb(chunks: list[dict], path_db: str = "./chroma_db", collection_name: str = "askdata_knowledge"):
    """Gera embeddings e salva os chunks no ChromaDB local persistente."""
    chroma_client = chromadb.PersistentClient(path=path_db)
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"}
    )
    
    print(f"📊 Total de chunks a serem indexados: {len(chunks)}")
    
    for i, ch in enumerate(chunks, 1):
        # Gerar embedding via Gemini API
        res = client.models.embed_content(
            model="text-embedding-004",
            contents=ch["texto"]
        )
        vetor = res.embeddings[0].values
        
        collection.upsert(
            ids=[ch["id"]],
            embeddings=[vetor],
            documents=[ch["texto"]],
            metadatas={
                "arquivo": ch["arquivo"],
                "pagina": ch["pagina"],
                "chunk_idx": ch["chunk_idx"]
            }
        )
        if i % 5 == 0 or i == len(chunks):
            print(f"  -> Indexados {i}/{len(chunks)} chunks...")
            
    print(f"✅ Ingestão concluída com sucesso no ChromaDB ({path_db})!")

if __name__ == "__main__":
    pasta_dados = "./data"
    todos_documentos = []
    
    # 1. Carregar PDFs
    for pdf_path in glob.glob(f"{pasta_dados}/*.pdf"):
        print(f"📖 Processando PDF: {pdf_path}")
        todos_documentos.extend(extrair_texto_pdf(pdf_path))
        
    # 2. Carregar Markdowns
    for md_path in glob.glob(f"{pasta_dados}/*.md"):
        print(f"📖 Processando Markdown: {md_path}")
        todos_documentos.extend(extrair_texto_markdown(md_path))
        
    if not todos_documentos:
        print("⚠️ Nenhum arquivo PDF ou Markdown encontrado na pasta ./data! Adicione arquivos para testar.")
    else:
        # 3. Gerar Chunks
        lista_chunks = criar_chunks(todos_documentos, chunk_size=700, chunk_overlap=100)
        # 4. Salvar no ChromaDB
        indexar_no_chromadb(lista_chunks)
```

---

## 🧪 6. Bloco 4: Teste e Verificação do Pipeline (16:45 - 17:00)

Cada trio executará a ingestão de seus arquivos e verificará:
1. Se a pasta `chroma_db/` foi criada e populada localmente.
2. Quantos chunks foram gerados e se os metadados de página/arquivo estão íntegros.
3. Realização de um commit e push das alterações no GitHub do trio:
   ```bash
   git add src/ingestion.py requirements.txt
   git commit -m "feat: implement data ingestion and chunking pipeline with ChromaDB"
   git push origin main
   ```

### ✅ Critério de Conclusão do Dia 07:
- [x] Módulo `src/ingestion.py` implementado e funcional.
- [x] Arquivos da pasta `data/` lidos, segmentados com overlap e indexados no ChromaDB.
- [x] Metadados de rastreabilidade (arquivo e página) salvos em cada vetor.
- [x] Código sincronizado no GitHub da squad.
