# 📅 Dia 07 (22/09 - Terça-feira)
# 🎙️ Conversa com Ramon Lummertz & Ingestão com Chunking

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Evento Especial (14h às 15h):** Palestra / Conversa Online com **Ramon Lummertz** sobre Inteligência Artificial  
**Semana 2:** Desenvolvimento do Projeto "AskData" em Trios

---

## 🎯 1. Objetivos do Encontro
1. Participar da sessão online com **Ramon Lummertz**, absorvendo insights práticos e visões sobre o mercado de Inteligência Artificial.
2. Compreender a teoria e aplicação de **Chunking Estratégico** (relação entre tamanho de bloco e taxa de sobreposição/overlap).
3. Implementar o pipeline de ingestão (`src/ingestion.py`) do projeto *AskData* no trio, extraindo textos de arquivos **PDF** e **Markdown** com `pypdf`.
4. Indexar os chunks e seus respectivos metadados de origem (nome do arquivo e número da página) no **ChromaDB** local persistente.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 15:00   │ 🎙️ CONVERSA ONLINE COM RAMON LUMMERTZ (Palestra de IA) │
│ 15:00 - 15:15   │ Coffee Break & Descompressão                           │
│ 15:15 - 15:30   │ Leitura Padronizada de Referência (Pinecone Chunking)  │
│ 15:30 - 16:45   │ Mão na Massa em Trio: Implementação do `ingestion.py`  │
│ 16:45 - 17:00   │ Verificação da Ingestão no ChromaDB & Git Sync         │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🎙️ 3. Bloco 1: Sessão com Convidado — Ramon Lummertz (14:00 - 15:00)
- **Horário:** 14:00 às 15:00 (Pontual).
- **Formato:** Sessão Online / Transmissão no auditório/sala do Navi Hub.
- **Pauta:** Inteligência Artificial no mundo real, carreira em tecnologia, desafios de engenharia e tendências.
- **Ação dos Alunos:** Anotar dúvidas técnicas e de carreira para interagir na sessão de perguntas e respostas.

---

## 📖 4. Bloco 2: Leitura Padronizada de Referência (15:15 - 15:30)

Realize a leitura objetiva sobre estratégias de chunking:

1. 📄 [Pinecone: Chunking Strategies for LLM Applications](https://www.pinecone.io/learn/chunking-strategies/) — *Por que o tamanho do chunk afeta a qualidade da busca vetorial e como o overlap evita perda de contexto nas bordas.*

```
Texto Original: [ ────────────────────────────────────────────────────────── ]
Chunk 1:        [ ════════════════════ ]
Chunk 2:                     [ ════════════════════ ]   (Overlap: ░░░░)
Chunk 3:                                  [ ════════════════════ ]
```

---

## 📦 5. Bloco 3: Setup & Instalação de Dependências (15:30 - 15:35)

Com o `.venv` do projeto ativado:
```bash
pip install pypdf
```

---

## 💻 6. Bloco 4: Implementação do Módulo `src/ingestion.py` (15:35 - 16:45)

Os integrantes do trio implementam o módulo de ingestão para carregar os arquivos da pasta `data/`.

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
    """Lê um arquivo PDF e extrai o texto página a página com metadados."""
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
    """Lê um arquivo Markdown e extrai o texto com metadados."""
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
    """Divide os textos em blocos de tamanho fixo com sobreposição (overlap)."""
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
    """Gera embeddings e salva os chunks e metadados no ChromaDB local."""
    chroma_client = chromadb.PersistentClient(path=path_db)
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"}
    )
    
    print(f"📊 Total de chunks a serem indexados: {len(chunks)}")
    
    for i, ch in enumerate(chunks, 1):
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
    
    # 1. Carregar PDFs da pasta data
    for pdf_path in glob.glob(f"{pasta_dados}/*.pdf"):
        print(f"📖 Processando PDF: {pdf_path}")
        todos_documentos.extend(extrair_texto_pdf(pdf_path))
        
    # 2. Carregar Markdowns da pasta data
    for md_path in glob.glob(f"{pasta_dados}/*.md"):
        print(f"📖 Processando Markdown: {md_path}")
        todos_documentos.extend(extrair_texto_markdown(md_path))
        
    if not todos_documentos:
        print("⚠️ Nenhum arquivo PDF ou Markdown encontrado em ./data! Adicione arquivos para testar.")
    else:
        # 3. Gerar Chunks
        lista_chunks = criar_chunks(todos_documentos, chunk_size=700, chunk_overlap=100)
        # 4. Indexar no ChromaDB
        indexar_no_chromadb(lista_chunks)
```

---

## 🧪 7. Bloco 5: Teste & Sincronização no GitHub (16:45 - 17:00)

1. Execute o pipeline de ingestão no terminal:
   ```bash
   python src/ingestion.py
   ```
2. Verifique se a pasta `chroma_db/` foi populada com os arquivos binários do banco vetorial.
3. Faça o commit e push das alterações no repositório do trio:
   ```bash
   git add src/ingestion.py requirements.txt
   git commit -m "feat: implement PDF/MD ingestion and chunking pipeline with ChromaDB"
   git push origin main
   ```

### ✅ Checklist de Conclusão do Dia 07:
- [x] Participação na palestra online com Ramon Lummertz.
- [x] Leitura de estratégias de chunking da Pinecone concluída.
- [x] Pipeline `src/ingestion.py` testado com sucesso nos documentos do trio.
- [x] Código sincronizado no GitHub.
