# 📅 Dia 07 (22/09 - Terça-feira)
# 🎙️ Conversa com Ramon Lummertz & Ingestão com Chunking no ChromaDB

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Evento Especial (14h às 15h):** Palestra / Conversa Online com **Ramon Lummertz** sobre Inteligência Artificial  
**Semana 2:** Desenvolvimento do Projeto "AskData" em Trios

---

## 🎯 1. Objetivos do Encontro
1. Participar da sessão online com **Ramon Lummertz**, absorvendo visões práticas sobre desafios de IA no mercado de tecnologia.
2. Compreender a teoria e aplicação de **Chunking Estratégico** (relação entre tamanho de bloco e taxa de sobreposição/overlap).
3. Entender a fundo a arquitetura e funcionamento do **ChromaDB** (banco vetorial local, open-source e gratuito), aprendendo a configurá-lo e gerenciá-lo.
4. Implementar o pipeline de ingestão (`src/ingestion.py`) do projeto *AskData*, extraindo textos de arquivos **PDF** e **Markdown** com `pypdf`.
5. Gerar embeddings com o modelo gratuito **`gemini-embedding-001`** e persistir chunks com metadados de rastreabilidade (arquivo e página) no **ChromaDB**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 15:00   │ 🎙️ CONVERSA ONLINE COM RAMON LUMMERTZ (Palestra de IA) │
│ 15:00 - 15:15   │ Coffee Break & Descompressão                           │
│ 15:15 - 15:40   │ Leitura Padronizada: Chunking & O que é o ChromaDB?    │
│ 15:40 - 16:05   │ Lab Prático: Como Configurar e Testar o ChromaDB       │
│ 16:05 - 16:35   │ Mão na Massa em Trio: Implementação do `ingestion.py`  │
│ 16:35 - 16:45   │ Verificação da Ingestão no ChromaDB & Git Sync         │
│ 16:45 - 17:00   │ Formulário Diário de Auto-Avaliação & Feedback (Forms) │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🎙️ 3. Bloco 1: Sessão com Convidado — Ramon Lummertz (14:00 - 15:00)
- **Horário:** 14:00 às 15:00 (Pontual).
- **Formato:** Transmissão Online na sala/auditório do Navi Hub.
- **Pauta:** Inteligência Artificial no mundo real, carreira em tecnologia, engenharia de dados e modelos generativos.
- **Ação dos Alunos:** Anotar insights e formular perguntas para a rodada final de Q&A.

---

## 📖 4. Bloco 2: Leitura Padronizada de Referência (15:15 - 15:40)

Antes de codificar a ingestão, cada aluno deve ler os dois artigos de referência:

1. 📄 [Data Science Academy: Estratégias de Chunking em Aplicações de IA Generativa](https://blog.dsacademy.com.br/estrategias-de-chunking-em-aplicacoes-de-ia-generativa/) — *O que é chunking, por que o tamanho do bloco influencia a precisão do RAG e como o overlap evita que frases sejam cortadas no meio.*
2. 📄 [O que é Chroma DB?](https://www.ionos.com/pt-br/digitalguide/servidor/conhecimento/chroma-db/) — *Guia conceitual sobre o ChromaDB: um banco de dados vetorial open-source (Apache 2.0), 100% gratuito, que roda embutido no processo Python sem precisar de servidores externos ou nuvem paga.*

```
Visualização de Chunking com Overlap:
Texto Original: [ ────────────────────────────────────────────────────────── ]
Chunk 1:        [ ════════════════════ ]
Chunk 2:                     [ ════════════════════ ]   (Overlap: ░░░░)
Chunk 3:                                  [ ════════════════════ ]
```

---

## 🛠️ 5. Bloco 3: Como Configurar e Testar o ChromaDB (15:40 - 16:05)

### 💡 O que você precisa saber sobre a configuração do ChromaDB:
* **Gratuito e Local:** O ChromaDB não exige cadastro, chave de API própria ou cartão de crédito. Ele roda 100% na máquina local.
* **Modo Persistente (`PersistentClient`):** Salva os vetores e metadados diretamente em uma pasta local (`./chroma_db`) utilizando internamente SQLite para metadados e arquivos HNSW para os índices de vetores.
* **Métrica de Distância:** Ao criar uma coleção, configuramos `metadata={"hnsw:space": "cosine"}` para utilizar a similaridade de cosseno (ideal para embeddings de texto).

### Script de Teste Rápido: `test_chroma_setup.py`
Para entender os comandos do ChromaDB antes de plugar na leitura pesada de PDFs, criem e executem este script no trio:

```python
import chromadb

# 1. Configurar o cliente persistente (cria ou usa a pasta ./chroma_db)
client = chromadb.PersistentClient(path="./chroma_db")

# 2. Criar ou obter a coleção configurada com distância de cosseno
collection = client.get_or_create_collection(
    name="teste_configuracao",
    metadata={"hnsw:space": "cosine"}
)

# 3. Teste de inserção direta (sem chamada de API externa)
collection.upsert(
    ids=["doc_1", "doc_2"],
    documents=["Documentação oficial sobre engenharia de software.", "Manual de boas práticas da DataLakers."],
    embeddings=[[0.1] * 768, [0.9] * 768], # Vetores de teste
    metadatas=[{"arquivo": "manual.pdf", "pagina": 1}, {"arquivo": "doc.pdf", "pagina": 5}]
)

# 4. Inspecionar o banco vetorial
print("=" * 50)
print(f"Total de documentos na colecao: {collection.count()}")
print("Amostra dos metadados:", collection.peek()["metadatas"])
print("=" * 50)
print("ChromaDB configurado e persistindo localmente com sucesso!")

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

> 💡 Se algo der erro de importação ou execução, verifique se instalou as dependências com `pip install chromadb pypdf` no seu `.venv`. Ler os logs de erro e debugar faz parte do dia a dia do projeto! 😉

---

## 💻 6. Bloco 4: Implementação do Pipeline `src/ingestion.py` (16:05 - 16:35)

Agora, o trio junta a extração de PDFs com o chunking e a indexação vetorial no ChromaDB utilizando o modelo de embedding atual gratuito do Google: **`gemini-embedding-001`**.

### Código de Referência: `src/ingestion.py`

```python
import os
import glob
from pathlib import Path
from pypdf import PdfReader
import chromadb
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY não encontrada no arquivo .env!")

client = genai.Client(api_key=api_key)

# Modelo gratuito de embeddings do Google AI Studio
EMBEDDING_MODEL = "gemini-embedding-001"

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
    """Divide os textos em blocos com sobreposição (overlap) para manter contexto."""
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
    """Gera embeddings e salva os chunks e metadados no ChromaDB local persistente."""
    # Inicialização persistente do ChromaDB
    chroma_client = chromadb.PersistentClient(path=path_db)
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"} # Métrica de distância de cosseno
    )
    
    print(f"Total de chunks a serem indexados: {len(chunks)}")
    
    for i, ch in enumerate(chunks, 1):
        # Gerar embedding com o modelo atual gratuito gemini-embedding-001
        res = client.models.embed_content(
            model=EMBEDDING_MODEL,
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
            
    print(f"Ingestão concluída com sucesso no ChromaDB ({path_db})! Total salvo: {collection.count()} chunks.")

if __name__ == "__main__":
    pasta_dados = "./data"
    todos_documentos = []
    
    # 1. Carregar PDFs da pasta data
    for pdf_path in glob.glob(f"{pasta_dados}/*.pdf"):
        print(f"Processando PDF: {pdf_path}")
        todos_documentos.extend(extrair_texto_pdf(pdf_path))
        
    # 2. Carregar Markdowns da pasta data
    for md_path in glob.glob(f"{pasta_dados}/*.md"):
        print(f"Processando Markdown: {md_path}")
        todos_documentos.extend(extrair_texto_markdown(md_path))
        
    if not todos_documentos:
        print("Nenhum arquivo PDF ou Markdown encontrado em ./data! Adicione arquivos na pasta para testar.")
    else:
        # 3. Gerar Chunks
        lista_chunks = criar_chunks(todos_documentos, chunk_size=700, chunk_overlap=100)
        # 4. Indexar no ChromaDB
        indexar_no_chromadb(lista_chunks)

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

---

## 🧪 7. Bloco 5: Teste & Sincronização no GitHub (16:35 - 16:45)

1. Execute a ingestão dos documentos do trio:
   ```bash
   python src/ingestion.py
   ```
2. Verifique se a pasta local `chroma_db/` foi criada e populada com os dados indexados.
3. Dediquem os minutos finais para que o trio sincronize as alterações no repositório compartilhado do GitHub:
   - Certifiquem-se de que `src/ingestion.py`, `test_chroma_setup.py` e `requirements.txt` estão versionados.
   - Confirmem que o `.gitignore` está protegendo o arquivo `.env` e a pasta `chroma_db/` (o banco vetorial local não deve ser enviado ao Git remoto).
   - Todos os 3 integrantes devem atualizar suas branches locais para estarem alinhados para o Dia 08.

> 💡 Se a chamada ao embedding der limite de cota ou erro de rede, verifique sua conexão ou adicione um pequeno delay (`import time; time.sleep(0.5)`). Debugar e contornar limites faz parte do dia a dia do projeto! 😉

---

## 📝 8. Bloco 6: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 07](#) *(Link disponibilizado pelo instrutor em sala)*

### ✅ Checklist de Conclusão do Dia 07:
- [x] Participação na palestra online com Ramon Lummertz.
- [x] Leitura sobre Chunking e funcionamento do ChromaDB concluída.
- [x] Script de teste e configuração do ChromaDB (`test_chroma_setup.py`) executado.
- [x] Pipeline `src/ingestion.py` testado com o modelo `gemini-embedding-001`.
- [x] Chunks e metadados persistidos localmente no ChromaDB e código sincronizado no GitHub.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.
