# Dia 21 (14/10/2026 - Quarta-feira)
# Fundamentos de Visao Multimodal com Gemini: Dando Olhos a LLM

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 1: Fundamentacao Tecnica em Duplas  

Boas-vindas a Sprint 3! Na Sprint 1, ensinamos o modelo a ler documentos textuais com RAG. Na Sprint 2, capacitamos o modelo a agir no mundo atraves de ferramentas e servidores MCP. Agora, entramos na fronteira mais emocionante da IA moderna: a Multimodalidade. Hoje, vamos dar "olhos" ao modelo para que ele seja capaz de inspecionar prints de dashboards, laudos tecnicos, diagramas de arquitetura e notas fiscais com precisao analitica.

Dinamica de Hoje: O trabalho e realizado em duplas colaborativas (piloto e copiloto se alternando no teclado). Os scripts deste encontro ficam organizados na pasta local dia_21/ para construir sua base tecnica de visao.

---

## 1. Objetivos do Encontro

1. Compreender a mecanica de modelos de visao nativa: como LLMs processam patches visuais em vez de dependerem de OCR tradicional engessado.
2. Ingerir imagens em Python utilizando tanto fluxos de bytes puros (types.Part.from_bytes) quanto manipulacao em memoria com Pillow (PIL.Image).
3. Construir um pipeline de extracao estruturada com Pydantic, convertendo informacoes visuais em schemas JSON tipados.
4. Extrair coordenadas normalizadas de caixas delimitadoras (Bounding Boxes [ymin, xmin, ymax, xmax]) para localizar componentes e textos em diagramas.
5. Desenvolver tecnicas rigorosas de Grounding Visual para evitar que o modelo alucine elementos ou dados ausentes na imagem.
6. Implementar testes de resiliencia locais contra arquivos corrompidos e imagens de baixa resolucao.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario de abertura da Sprint 3.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:20 | 20 min | Bloco 1 | Abertura da Sprint 3, Contexto Tecnico e Leitura Base |
| 14:20 - 14:55 | 35 min | Bloco 2 | Laboratorio 1: Ingestao Visual via Bytes e Pillow |
| 14:55 - 15:30 | 35 min | Bloco 3 | Laboratorio 2: OCR Estruturado e Bounding Boxes com Pydantic |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: O Detetive de Diagramas e Grounding |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Imagens Ruidosas e Corrompidas |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Dupla (Git Sync) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario de Abertura da Sprint 3 e Autoavaliacao |

Regra do Primeiro Dia: Nao ocorre reuniao de alinhamento previa hoje. Iniciamos pontualmente as 14:00 com a visao geral da Sprint 3 e alinhamento do ecossistema multimodal.

---

## 3. Bloco 1: Leitura Padronizada de Referencia e Jogos Web (14:00 - 14:20)

Tempo dedicado: 20 minutos (5 min de alinhamento da squad + 15 min de leitura e experimentacao interativa).

Por que visao multimodal importa na industria:
No dia a dia de engenharia de dados (como na DataLakers), problemas reais raramente chegam como texto limpo. Um cliente ou analista envia um print de tela com um dashboard com erro 500, uma foto de uma nota fiscal rasurada ou o diagrama de uma fila Kafka no quadro branco. Se usassemos OCR tradicional (como Tesseract), perderiamos toda a relacao espacial e o contexto semantico. Modelos multimodais modernos como o gemini-3.8-flash recebem os pixels diretamente como tokens visuais: eles "enxergam" a direcao das setas, leem tabelas complexas e entendem relacoes hierarquicas de forma integrada.

O que voce vai encontrar nos links recomendados:
- No Guia do Google AI Studio: veja como passar imagens via Part.from_bytes e como controlar a resolucao dos tokens de visao.
- No Manual do Pillow: entenda como verificar dimensoes reais e sanitizar arquivos antes de disparar requisicoes de rede.
- No Artigo do Simon Willison: uma visao intuitiva de como modelos transformam imagens em vetores e raciocinam sobre espaco.

Links Educacionais Recomendados:
- [Google AI Studio: Compreensao Visual com Gemini](https://ai.google.dev/gemini-api/docs/generate-content/image-understanding): guia oficial pratico mostrando envio de imagens e tecnicas de prompting visual.
- [Pillow (PIL) Handbook para Desenvolvedores Python](https://pillow.readthedocs.io/en/stable/handbook/tutorial.html): tutorial conciso de como abrir, inspecionar formatos reais e manipular imagens em memoria.
- [Simon Willison: Como Modelos de Visao Compreendem o Mundo](https://simonwillison.net/2023/Oct/23/embeddings/): ensaio ilustrado e claro sobre como a IA conecta conceitos visuais e linguagem.

Jogos Web e Playgrounds Interativos para Testar Agora (2 a 3 min):
- [Quick, Draw! (Google AI)](https://quickdraw.withgoogle.com/): jogue uma rodada rapida de 20 segundos desenhando objetos e veja como a rede neural reconhece padroes visuais em tempo real.
- [Teachable Machine - Visao (Google)](https://teachablemachine.withgoogle.com/train/image): veja no navegador como uma camera classifica imagens e detecta confianca estatistica instantaneamente.
- [Google AI Studio Playground](https://aistudio.google.com/): suba uma foto ou diagrama na galeria multimodal e faca perguntas sobre o que esta visivel.

---

## 4. Bloco 2: Laboratorio 1 - Ingestao Visual via Bytes e Pillow (14:20 - 14:55)

Tempo dedicado: 35 minutos | Formato: Duplas (Piloto e Copiloto).

Sua Missao na Dupla:
Criar o script `dia_21/visao.py` capaz de receber uma imagem em disco, validar seu formato e dimensoes reais usando Pillow (evitando arquivos maliciosos ou corrompidos) e submete-la ao gemini-3.8-flash de duas formas distintas: como payload binario puro (`types.Part.from_bytes`) e como objeto nativo `PIL.Image`.

Geracao da Imagem pela Dupla:
Cada dupla deve gerar seu proprio dado de teste! Tire um print de tela da sua propria IDE/codigo, capture um diagrama de arquitetura qualquer (ou desenhe um no Excalidraw) ou tire uma foto de uma anotacao/quadro da sala com o celular e salve em `amostras/diagrama.png` (formato PNG ou JPEG, ate 5 MB).

Preparacao do Ambiente da Dupla (uma vez na máquina):
```bash
mkdir -p dia_21 amostras
source .venv/bin/activate
pip install google-genai pillow pydantic python-dotenv
```

Scaffold de `dia_21/visao.py`:
Salve o codigo abaixo e implemente as instrucoes marcadas com `# TODO:`.

```python
import os
import sys
from io import BytesIO
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image

load_dotenv()
MODEL = "gemini-3.8-flash"

def carregar_imagem(caminho: Path) -> tuple[bytes, str, Image.Image]:
    """Valida o arquivo em disco e retorna os bytes, o MIME real e a imagem Pillow."""
    if not caminho.is_file() or caminho.stat().st_size > 5_000_000:
        raise ValueError("O arquivo deve existir e ter ate 5 MB.")
    
    dados = caminho.read_bytes()
    
    # Validacao de integridade com Pillow (evita renomear .txt para .png)
    with Image.open(BytesIO(dados)) as img:
        img.verify()
        formato = img.format
        largura, altura = img.size

    mime = {"PNG": "image/png", "JPEG": "image/jpeg"}.get(formato or "")
    if not mime:
        raise ValueError(f"Formato nao suportado: {formato}. Use PNG ou JPEG.")
    
    if largura * altura > 12_000_000:
        raise ValueError("Imagem excede o limite de 12 Megapixels.")

    with Image.open(BytesIO(dados)) as img:
        imagem_pil = img.convert("RGB")

    return dados, mime, imagem_pil

def comparar_modalidades(caminho: Path) -> dict[str, str]:
    """Envia a mesma imagem via bytes e via PIL e compara a clareza da resposta."""
    dados, mime, imagem_pil = carregar_imagem(caminho)
    
    # TODO: Refine o prompt para que a IA descreva os componentes tecnicos e
    # as direcoes das setas, declarando explicitamente caso algum rotulo esteja ilegivel.
    prompt = (
        "Voce e um especialista em auditoria de diagramas de arquitetura. "
        "Descreva os componentes presentes e a direcao exata de todas as setas. "
        "Se algum rotulo nao estiver 100% legivel, declare explicitamente: ROTULO_ILEGIVEL."
    )
    
    entradas = {
        "bytes": types.Part.from_bytes(data=dados, mime_type=mime),
        "PIL": imagem_pil
    }
    
    resultados: dict[str, str] = {}
    cliente = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    
    for modo, entrada in entradas.items():
        resposta = cliente.models.generate_content(
            model=MODEL,
            contents=[prompt, entrada],
            config=types.GenerateContentConfig(temperature=0.0)
        )
        resultados[modo] = resposta.text or "Sem resposta gerada."
        
    return resultados

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_21/visao.py amostras/diagrama.png")
        sys.exit(1)
        
    respostas = comparar_modalidades(Path(sys.argv[1]))
    for modo, texto in respostas.items():
        print(f"\n=== Resposta via {modo.upper()} ===")
        print(texto)
```

Como testar:
Coloque qualquer diagrama ou print de sistema em `amostras/diagrama.png` e execute:
```bash
python dia_21/visao.py amostras/diagrama.png
```

Criterio de Sucesso da Dupla: O terminal deve imprimir duas analises ricas identificadas por BYTES e PIL, listando os componentes e a direcao das setas com precisao visual.

---

## 5. Bloco 3: Laboratorio 2 - OCR Estruturado e Bounding Boxes com Pydantic (14:55 - 15:30)

Tempo dedicado: 35 minutos | Formato: Duplas (inverter quem digita!).

Sua Missao na Dupla:
Em sistemas de missao critica, uma descricao solta em texto livre nao serve para automacao. Precisamos extrair dados da imagem sob um contrato estrito em Pydantic. Criar `dia_21/ocr.py` para extrair fragmentos de texto acompanhados de suas coordenadas espaciais normalizadas (Bounding Boxes no formato `[ymin, xmin, ymax, xmax]`, de 0 a 1000).

Scaffold de `dia_21/ocr.py`:

```python
import os
import sys
from pathlib import Path
from typing import Annotated
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from visao import carregar_imagem

load_dotenv()
MODEL = "gemini-3.8-flash"

Coordenada = Annotated[int, Field(ge=0, le=1000, description="Coordenada normalizada de 0 a 1000")]

class ElementoVisual(BaseModel):
    texto_extraido: str = Field(description="Texto exato lido na regiao")
    caixa_delimitadora: list[Coordenada] = Field(
        min_length=4, max_length=4,
        description="Coordenadas [ymin, xmin, ymax, xmax] normalizadas de 0 a 1000"
    )

class AnaliseDocumento(BaseModel):
    elementos: list[ElementoVisual] = Field(description="Lista de textos e suas posicoes")
    codigo_identificador: str | None = Field(default=None, description="Codigo principal do documento (ex: A101) ou null se ausente")
    relacoes_detectadas: list[str] = Field(description="Relacoes semanticas observadas no diagrama")
    limitacoes_visuais: list[str] = Field(description="Alertas de baixa resolucao, cortes ou incertezas")

def extrair_dados_estruturados(caminho: Path) -> AnaliseDocumento:
    dados, mime, _ = carregar_imagem(caminho)
    cliente = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    
    # TODO: Complete a instrucao orientando o modelo a nao inventar campos ausentes.
    prompt = (
        "Analise a imagem tecnica fornecida. "
        "Localize todas as caixas de texto com suas coordenadas [ymin, xmin, ymax, xmax]. "
        "Se o codigo identificador nao estiver nitido, preencha como null. "
        "Liste em limitacoes_visuais qualquer problema de qualidade ou duvida."
    )
    
    resposta = cliente.models.generate_content(
        model=MODEL,
        contents=[prompt, types.Part.from_bytes(data=dados, mime_type=mime)],
        config=types.GenerateContentConfig(
            temperature=0.0,
            response_mime_type="application/json",
            response_schema=AnaliseDocumento
        )
    )
    
    documento = AnaliseDocumento.model_validate_json(resposta.text or "{}")
    
    # Validacao de consistencia geometrica
    for item in documento.elementos:
        ymin, xmin, ymax, xmax = item.caixa_delimitadora
        if ymin >= ymax or xmin >= xmax:
            raise ValueError(f"Coordenadas geometricamente invalidas detectadas: {item.caixa_delimitadora}")
            
    return documento

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_21/ocr.py amostras/diagrama.png")
        sys.exit(1)
        
    resultado = extrair_dados_estruturados(Path(sys.argv[1]))
    print(resultado.model_dump_json(indent=2))
```

Como testar:
```bash
python dia_21/ocr.py amostras/diagrama.png
```

Criterio de Sucesso da Dupla: O terminal deve emitir um JSON perfeitamente validado pelo Pydantic, contendo os textos, as coordenadas de 0 a 1000 e o campo `codigo_identificador` preenchido ou `null` caso ausente.

---

## 6. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Pegue um cafe, descanse os olhos das telas e converse com outras duplas sobre quais diferencas voces notaram entre pedir texto livre e forcar o schema JSON.

---

## 7. Bloco 4: Desafio Pratico - O Detetive de Diagramas e Grounding (15:45 - 16:15)

Tempo dedicado: 30 minutos | Formato: Duplas.

Cenario de Negocio:
Em auditorias de sistemas, um analista precisa checar se uma arquitetura implementada corresponde ao desenho homologado. Sua dupla deve criar o script integrador `dia_21/integrar_documento.py`.

Missao do Desafio:
1. O script recebe a imagem de um diagrama e executa tanto a descricao conceitual quanto o OCR estruturado.
2. O script cruza os dois resultados e confere programaticamente se determinados rotulos criticos esperados (por exemplo, "API Gateway", "PostgreSQL", "Worker") realmente foram observados visualmente nos pixels.
3. Se o modelo mencionar um servico na descricao mas esse servico NAO tiver sido capturado no OCR estruturado com Bounding Box, o script emite um alerta de suspeita de alucinacao!

Scaffold de `dia_21/integrar_documento.py`:

```python
import json
import sys
from pathlib import Path
from visao import comparar_modalidades
from ocr import extrair_dados_estruturados

def auditar_diagrama(caminho: Path, rotulos_obrigatorios: list[str]) -> dict:
    descricoes = comparar_modalidades(caminho)
    analise = extrair_dados_estruturados(caminho)
    
    textos_encontrados = " ".join(e.texto_extraido for e in analise.elementos).casefold()
    
    conferencias = {}
    for rotulo in rotulos_obrigatorios:
        presente = rotulo.casefold() in textos_encontrados
        conferencias[rotulo] = "CONFIRMADO_VISUALMENTE" if presente else "ALERTA_NAO_ENCONTRADO"
        
    return {
        "arquivo": caminho.name,
        "conferencias": conferencias,
        "total_elementos_detectados": len(analise.elementos),
        "limitacoes_apontadas": analise.limitacoes_visuais
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_21/integrar_documento.py amostras/diagrama.png")
        sys.exit(1)
        
    # TODO: Altere a lista com componentes reais que deveriam estar no seu diagrama de teste
    componentes_esperados = ["Database", "Backend", "Frontend"]
    relatorio = auditar_diagrama(Path(sys.argv[1]), componentes_esperados)
    print(json.dumps(relatorio, indent=2, ensure_ascii=False))
```

Como testar:
```bash
python dia_21/integrar_documento.py amostras/diagrama.png
```

Criterio de Sucesso: O script emite o relatorio de auditoria apontando com precisao quais componentes esperados foram confirmados visualmente e quais foram sinalizados com ALERTA_NAO_ENCONTRADO.

---

## 8. Bloco 5: Testes de Resiliencia - O Estresse das Imagens Caoticas (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Duplas.

Na vida real, usuarios enviam imagens corrompidas, arquivos de texto disfarcados de imagem ou prints com ruido severo. Vamos garantir que seu codigo falhe de forma elegante sem quebrar a aplicacao.

Crie `dia_21/testar_imagens.py`:

```python
from pathlib import Path
from tempfile import TemporaryDirectory
from PIL import Image, ImageDraw, UnidentifiedImageError
from visao import carregar_imagem

def executar_testes_de_estresse():
    with TemporaryDirectory() as tmp_dir:
        tmp_path = Path(tmp_dir)
        
        # Teste 1: Arquivo corrompido / falso PNG
        arquivo_falso = tmp_path / "fake.png"
        arquivo_falso.write_bytes(b"Isto definitivamente nao sao pixels de uma imagem!")
        try:
            carregar_imagem(arquivo_falso)
            print("FALHA: O validador aceitou um arquivo corrompido!")
        except (UnidentifiedImageError, ValueError, OSError):
            print("PASS: Validador bloqueou o arquivo corrompido antes de chamar a API.")
            
        # Teste 2: Imagem valida gerada programaticamente com texto e ruido
        img_teste = Image.new("RGB", (400, 200), color="white")
        draw = ImageDraw.Draw(img_teste)
        draw.text((50, 80), "CODIGO: B-404", fill="black")
        
        caminho_ok = tmp_path / "valido.png"
        img_teste.save(caminho_ok)
        
        dados, mime, pil_img = carregar_imagem(caminho_ok)
        assert mime == "image/png"
        assert pil_img.size == (400, 200)
        print("PASS: Imagem sintetizada validada com sucesso pelo pipeline.")

if __name__ == "__main__":
    executar_testes_de_estresse()
```

Como testar:
```bash
python dia_21/testar_imagens.py
```

Criterio de Sucesso: O terminal exibe os dois avisos de `PASS`, provando que arquivos maliciosos sao barrados localmente sem desperdicar cotas de API.

---

## 9. Bloco 6: Sincronizacao no GitHub da Dupla (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Hora de salvar o progresso da dupla no repositorio!
Conferir o status dos arquivos criados na pasta `dia_21/`:
- `dia_21/visao.py`
- `dia_21/ocr.py`
- `dia_21/integrar_documento.py`
- `dia_21/testar_imagens.py`

Comandos para versionamento:
```bash
git status
git add dia_21/
git commit -m "feat(dia-21): pipeline de visao multimodal, ocr estruturado e testes de estresse"
git push
```

Regra de Ouro da Squad: Nunca commitar o arquivo `.env` nem arquivos de imagens pessoais confidenciais.

---

## 10. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no seu navegador o arquivo: [Quiz do Dia 21](quizzes/quiz_dia_21.html)
   - Responda as questoes sobre tokens de visao, Bounding Boxes, `types.Part.from_bytes` e Grounding.
   - Leia atentamente as justificativas comentadas de cada resposta.
2. Abra a atividade pratica gamificada: [Atividade Interativa do Dia 21](quizzes/atividade_dia_21.html)
   - Resolva os 5 desafios de cacar bugs em codigo de visao, ordenar pipelines e testar validadores.

---

## 11. Bloco 8: Formulario de Abertura da Sprint 3 e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link do formulario disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Abertura da Sprint 3](https://docs.google.com/forms/d/{FORM_ID_DIA_21}/viewform)

Pautas do formulario de hoje:
- Expectativas individuais para a Sprint 3 e para o projeto OmniAssistant.
- Dificuldades encontradas na manipulacao de imagens em Python e nas cotas do Gemini.
- Avaliacao da dinamica em dupla.

---

## 12. Checklist de Conclusao do Dia 21

- [ ] Abertura da Sprint 3 e objetivos alinhados com a turma.
- [ ] Leitura conceitual e testes nos playgrounds interativos (Quick Draw / AI Studio) concluidos.
- [ ] Script `01_visao.py` executado com sucesso com entradas em bytes e PIL.
- [ ] Script `02_ocr.py` gerando Bounding Boxes normalizadas e validacao Pydantic.
- [ ] Desafio `integrar_documento.py` aprovado cruzando informacoes do diagrama.
- [ ] Teste de estresse `testar_imagens.py` emitindo `PASS` para rejeicao de falhas.
- [ ] Codigo sincronizado no GitHub via Git Sync.
- [ ] Quiz do Dia 21 respondido no navegador.
- [ ] Atividade interativa do Dia 21 concluida.
- [ ] Formulario individual de abertura da sprint preenchido.

---

## 13. Atividades Complementares (Para Aprofundamento)

1. Video Inspirador: [Gemini Multimodal Capabilities & Visual Understanding (Google Developers, YouTube)](https://www.youtube.com/watch?v=37ZPM_5fyWc). Observe como o modelo processa fluxos contínuos de imagens e tente mapear: como o conceito de Bounding Box que voces usaram hoje se conecta com deteccao de objetos em video?
2. Desafio Bonus de Codigo: Crie `dia_21/bonus_visualizar_caixas.py` usando `ImageDraw.rectangle` do Pillow para desenhar as caixas delimitadoras extraidas pelo Gemini por cima da imagem original e salvar como `amostras/diagrama_anotado.png`. Ver as caixas desenhadas sobre o seu diagrama e a melhor forma de validar visualmente a precisao da IA!

---
[Voltar ao README da Sprint 3](README.md)
