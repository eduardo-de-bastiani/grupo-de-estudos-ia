# 📅 Dia 07 (22/09 - Terça-feira)
# 🎙️ Conversa com Ramon Lummertz & Ingestão com Chunking no ChromaDB

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Evento Especial (14h às 15h):** Palestra / Conversa Online com **Ramon Lummertz** sobre Inteligência Artificial  
**Semana 2:** Desenvolvimento do Projeto "AskData" em Trios

---

## 🎯 1. Objetivos do Encontro
1. Participar da sessão online com **Ramon Lummertz**, absorvendo visões práticas sobre desafios de IA no mercado de tecnologia.
2. Compreender a teoria e aplicação de **Chunking Estratégico** (relação entre tamanho de bloco e taxa de sobreposição/overlap) através da dinâmica prática **"Chunking na Régua"**.
3. Entender a fundo a arquitetura e funcionamento do **ChromaDB** (banco vetorial local, open-source e gratuito), aprendendo a configurá-lo e gerenciá-lo.
4. Implementar o pipeline de ingestão (`src/ingestion.py`) do projeto *AskData*, extraindo textos de arquivos **PDF** e **Markdown** com `pypdf`.
5. Gerar embeddings com o modelo gratuito **`gemini-embedding-001`** e persistir chunks com metadados de rastreabilidade (arquivo e página) no **ChromaDB**.
6. Auditar a qualidade dos chunks e cortes semânticos com o script **"Caça ao Chunk Perdido"** (`inspecionar_chunks.py`) e consolidar os conhecimentos no **Quiz do Dia**.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 15:00   │ 🎙️ CONVERSA ONLINE COM RAMON LUMMERTZ (Palestra de IA) │
│ 15:00 - 15:10   │ Leitura Padronizada: Chunking & O que é o ChromaDB?    │
│ 15:10 - 15:20   │ Setup Prático: Como Configurar e Testar o ChromaDB     │
│ 15:20 - 15:35   │ Coffee Break & Descompressão                           │
│ 15:35 - 16:20   │ Ingestão no AskData + Dinâmica "Chunking na Régua"     │
│ 16:20 - 16:35   │ Auditoria ("Caça ao Chunk Perdido") & Git Sync         │
│ 16:35 - 16:45   │ Quiz Interativo do Dia (quizzes/quiz_dia_07.html)      │
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

## 📖 4. Bloco 2: Leitura Padronizada de Referência (15:00 - 15:10)

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

## 🛠️ 5. Bloco 3: Como Configurar e Testar o ChromaDB (15:10 - 15:20)

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

# 2. Criar ou obter a colecao configurada com distancia de cosseno
collection = client.get_or_create_collection(
    name="teste_configuracao",
    metadata={"hnsw:space": "cosine"}
)

# 3. Teste de insercao direta (sem chamada de API externa)
collection.upsert(
    ids=["doc_1", "doc_2"],
    documents=["Documentacao oficial sobre engenharia de software.", "Manual de boas praticas da DataLakers."],
    embeddings=[[0.1] * 768, [0.9] * 768], # Vetores de teste
    metadatas=[{"arquivo": "manual.pdf", "pagina": 1}, {"arquivo": "doc.pdf", "pagina": 5}]
)

# 4. Inspecionar o banco vetorial
print("=" * 50)
print(f"Total de documentos na colecao: {collection.count()}")
print("Amostra dos metadados:", collection.peek()["metadatas"])
print("=" * 50)
print("ChromaDB configurado e persistindo localmente com sucesso!")
```

> 💡 Se algo der erro de importação ou execução, verifique se instalou as dependências com `pip install chromadb pypdf` no seu `.venv`. Ler os logs de erro e debugar faz parte do dia a dia do projeto! 😉

---

## ☕ Intervalo: Coffee Break & Descompressão (15:20 - 15:35)

Momento para um café, trocar percepções da palestra do Ramon Lummertz com colegas e preparar a mente para o bloco prático de codificação.

---

## 💻 6. Bloco 4: Engenharia de Chunking & Ingestão no AskData (15:35 - 16:20)

Neste bloco, o trio combina a análise manual de limites de texto com a automação em Python, construindo o pipeline oficial `src/ingestion.py`.

### 🧑‍🤝‍🧑 Dinâmica em Trio: "Chunking na Régua" (15:35 - 15:50)

Antes de rodar o código de corte automático, o trio fará um experimento humano empírico de segmentação:

1. **Escolha do Trecho:** Selecionem um parágrafo longo ou seção de 1 página de um dos documentos em `data/` (coletados ontem no Dia 06).
2. **Marcação Manual:** 
   - Utilizando caneta e papel ou um editor de texto com contador de caracteres, marquem visualmente onde ficaria um chunk de **700 caracteres**.
   - Identifiquem onde começaria o segundo chunk se usarem **100 caracteres de sobreposição (overlap)**.
3. **Reflexão Técnica em Trio:**
   - O corte arbitrário por contagem de caracteres dividiu alguma palavra ou sentença no meio?
   - O overlap de 100 caracteres foi suficiente para garantir que o sujeito e o verbo da frase cortada reapareçam no início do chunk seguinte?
   - Por que em RAG o overlap funciona como uma "rede de segurança semântica"?
4. **Alinhamento com o Código:** Guardem essas anotações visuais para comparar com a saída real do script Python a seguir.

---

### 🛠️ Código de Referência: `src/ingestion.py` (15:50 - 16:20)

O **Piloto** digita enquanto os **Copilotos** acompanham a lógica e conferem o arquivo `.env`:

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
    """Le um arquivo PDF e extrai o texto pagina a pagina com metadados."""
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
    """Le um arquivo Markdown e extrai o texto com metadados."""
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
    """Divide os textos em blocos com sobreposicao (overlap) para manter contexto."""
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
    chroma_client = chromadb.PersistentClient(path=path_db)
    collection = chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"}
    )
    
    print(f"Total de chunks a serem indexados: {len(chunks)}")
    
    for i, ch in enumerate(chunks, 1):
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
            
    print(f"Ingestao concluida com sucesso no ChromaDB ({path_db})! Total salvo: {collection.count()} chunks.")

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
```

> 💡 Se a chamada ao embedding der limite de cota ou erro de rede, verifique sua conexão ou adicione um pequeno delay (`import time; time.sleep(0.5)`). Debugar e contornar limites faz parte do dia a dia do projeto! 😉

---

## 🧪 7. Bloco 5: Teste & Auditoria — "Caça ao Chunk Perdido" & Git Sync (16:20 - 16:35)

Após concluir a ingestão, o trio deve auditar o banco vetorial para assegurar que a segmentação está íntegra antes de sincronizar o código no Git.

### 🔍 Dinâmica de Código: "Caça ao Chunk Perdido" (`inspecionar_chunks.py`)

Crie o arquivo `inspecionar_chunks.py` na raiz do projeto para emitir um diagnóstico completo dos chunks persistidos:

```python
import chromadb
from collections import defaultdict

# 1. Conectar ao ChromaDB persistente
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="askdata_knowledge",
    metadata={"hnsw:space": "cosine"}
)

# 2. Recuperar todos os documentos e metadados indexados
dados = collection.get(include=["documents", "metadatas"])
ids = dados["ids"]
docs = dados["documents"]
metadatas = dados["metadatas"]

total_chunks = len(ids)

print("=" * 60)
print("RELATORIO DE AUDITORIA: CACA AO CHUNK PERDIDO")
print("=" * 60)
print(f"Total de chunks indexados: {total_chunks}")

if total_chunks == 0:
    print("Colecao vazia! Execute 'python src/ingestion.py' primeiro.")
    exit()

# 3. Calcular tamanho medio dos chunks
tamanhos = [len(doc) for doc in docs]
tamanho_medio = sum(tamanhos) / total_chunks
print(f"Tamanho medio dos chunks: {tamanho_medio:.1f} caracteres")
print(f"Menor chunk: {min(tamanhos)} caracteres | Maior chunk: {max(tamanhos)} caracteres")

# 4. Contar chunks por arquivo e por pagina
chunks_por_arquivo = defaultdict(int)
chunks_por_pagina = defaultdict(lambda: defaultdict(int))

for meta in metadatas:
    arquivo = meta.get("arquivo", "desconhecido")
    pagina = meta.get("pagina", 0)
    chunks_por_arquivo[arquivo] += 1
    chunks_por_pagina[arquivo][pagina] += 1

print("\n--- Distribuicao por Arquivo ---")
for arquivo, qtd in chunks_por_arquivo.items():
    print(f"* {arquivo}: {qtd} chunks")
    for pag, count in sorted(chunks_por_pagina[arquivo].items()):
        print(f"    - Pagina {pag}: {count} chunks")

# 5. Identificar chunks cortados no meio da frase (sem pontuacao final)
pontuacao_final = ('.', '!', '?', ':', '"', "'", '”', '’')
chunks_cortados = []

for cid, doc, meta in zip(ids, docs, metadatas):
    texto_limpo = doc.strip()
    if texto_limpo and not texto_limpo.endswith(pontuacao_final):
        chunks_cortados.append((cid, texto_limpo, meta))

print("\n--- Analise de Cortes de Frase ---")
print(f"Chunks sem pontuacao final: {len(chunks_cortados)} de {total_chunks} ({len(chunks_cortados)/total_chunks*100:.1f}%)")

if chunks_cortados:
    print("\nExemplos de chunks cortados no meio da frase:")
    for cid, texto, meta in chunks_cortados[:3]:
        fim_trecho = texto[-60:].replace("\n", " ")
        print(f"  [ID: {cid}] Arquivo: {meta.get('arquivo')}, Pag: {meta.get('pagina')}")
        print(f"    Final do texto: \"...{fim_trecho}\"")
        print("    " + "-" * 50)

print("\nAuditoria concluida. Discutam no trio se o overlap de 100 caracteres")
print("preserva o contexto semantico ou se os parametros precisam ser calibrados.")
print("=" * 60)
```

Execute a auditoria no terminal:
```bash
python inspecionar_chunks.py
```

### 🔄 Sincronização no GitHub (Git Sync)
1. Certifiquem-se de que o arquivo `.gitignore` contém `chroma_db/` e `.env` para não versionar arquivos pesados ou chaves de API secretas.
2. Comitem os scripts criados:
   ```bash
   git status
   git add src/ingestion.py test_chroma_setup.py inspecionar_chunks.py
   git commit -m "feat: pipeline de ingestao, chunking e script de auditoria no chromadb"
   git push origin main
   ```
3. Todos os membros do trio executam `git pull` em seus clones locais para garantir que estão alinhados para o Dia 08.

---

## 🧠 8. Bloco 6: Quiz Interativo do Dia (16:35 - 16:45)

Chegou a hora de fixar os conceitos técnicos fundamentais trabalhados hoje de forma dinâmica:

1. Abram o arquivo [`quizzes/quiz_dia_07.html`](quizzes/quiz_dia_07.html) diretamente no navegador (dois cliques no arquivo ou abrindo via navegador como Google Chrome ou Firefox).
2. O quiz contém 16 questões cobrindo:
   - Papel do **Chunking** e da taxa de sobreposição (overlap) na precisão de recuperação semântica.
   - Comportamento e inicialização do **ChromaDB** persistente (`PersistentClient`, distância de cosseno).
   - Extração de páginas de PDF com `pypdf` e integridade de metadados.
   - Embeddings com o modelo gratuito `gemini-embedding-001`.
3. Formatos inclusos: múltipla escolha, verdadeiro/falso, preenchimento de termos, ordenação de etapas e associação de conceitos.
4. Cada integrante do trio deve responder individualmente e debater os eventuais erros com seus colegas de equipe.

---

## 📝 9. Bloco 7: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 07](https://docs.google.com/forms/d/e/1FAIpQLSfwAa5BJ5wnaXSQ8hABOF5eX5sZCy7yjsPjy_cso6XwPcAigQ/viewform)

### ✅ Checklist de Conclusão do Dia 07:
- [x] Participação na palestra online com Ramon Lummertz.
- [x] Leitura sobre Chunking e funcionamento do ChromaDB concluída.
- [x] Script de teste e configuração do ChromaDB (`test_chroma_setup.py`) executado.
- [x] Dinâmica "Chunking na Régua" realizada em trio no parágrafo de teste.
- [x] Pipeline `src/ingestion.py` implementado e testado com o modelo `gemini-embedding-001`.
- [x] Script de auditoria `inspecionar_chunks.py` ("Caça ao Chunk Perdido") executado no ChromaDB.
- [x] Chunks e metadados persistidos localmente no ChromaDB e código sincronizado no GitHub.
- [x] Quiz interativo do Dia 07 (`quizzes/quiz_dia_07.html`) respondido.
- [x] Formulário de auto-avaliação e feedback preenchido no Google Forms.
- [ ] Atividades complementares (vídeo explicativo e testes de variação de parâmetros de chunking) exploradas.

---

## 🎁 Atividades Complementares

1. 🎥 **Vídeo sobre Estratégias de Chunking:**
   - Assista ao vídeo ["RAG Chunking Strategies Explained: Optimize Document Chunking for Maximum Recall, Precision"](https://www.youtube.com/watch?v=SPl-_Z4_c9w), complementando a base conceitual sobre chunking em RAG.
   - O vídeo ilustra graficamente o dilema de tamanho de bloco: chunks pequenos aumentam a especificidade do embedding, enquanto chunks grandes garantem que o contexto sintático e relacional não seja rompido.

2. 💻 **Código Bônus — Testes Comparativos de Parâmetros:**
   - Experimentem executar a função `criar_chunks()` com 3 variações de parâmetros no documento do trio:
     - **Variação 1 (Chunks Curtos):** `chunk_size = 300` e `chunk_overlap = 50`.
     - **Variação 2 (Padrão Equilibrado):** `chunk_size = 700` e `chunk_overlap = 100`.
     - **Variação 3 (Chunks Longos):** `chunk_size = 1200` e `chunk_overlap = 200`.
   - Utilizem o `inspecionar_chunks.py` para comparar a quantidade total de chunks gerados, o impacto na fragmentação de frases e como isso afeta a granularidade da informação recuperada.
