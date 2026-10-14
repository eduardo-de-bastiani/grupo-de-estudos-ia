# Dia 25 (20/10/2026 - Terca-feira)
# Pipeline Unificado de Ingestao Multimodal: Olhos e Ouvidos Conectados

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 2: Desenvolvimento Cumulativo do OmniAssistant em Trios  

Hoje o OmniAssistant ganha seus dois orgaos sensoriais integrados: o processador de imagem (`src/vision/processor.py`) e o processador de audio local (`src/audio/processor.py`). Nosso grande objetivo e construir a camada de ingestao que recebe um print de tela e um comando de voz gravado, valida a integridade de cada entrada e normaliza tudo dentro do contrato oficial `EvidenciaMultimodal`. Ao final da tarde, sua squad tera um despachante unificado capaz de receber qualquer combinacao de midias com performance e resiliencia.

Dinamica de Squad: Mantenham a rotacao de papeis no trio (Piloto, Copiloto e Arquiteto). Hoje os modulos de visao e audio serao criados em paralelo ou em conjunto para alimentar o core da aplicacao.

---

## 1. Objetivos do Encontro

1. Implementar o processador visual do OmniAssistant em `src/vision/processor.py`, convertendo imagens tecnicas em objetos `EvidenciaMultimodal`.
2. Implementar o processador acustico do OmniAssistant em `src/audio/processor.py`, encapsulando o Whisper local com cache em memoria e timestamps.
3. Desenvolver o despachante central de ingestao em `src/core/ingestion.py` com importacoes sob demanda (lazy loading) para economizar recursos.
4. Unificar entradas heterogeneas (imagem, audio e texto) sob a mesma interface semântica consumivel pelo agente orquestrador.
5. Construir o modulo de deteccao de divergencias: identificar e sinalizar conflitos quando a foto diz uma coisa e o comando de voz diz outra!
6. Validar a resiliencia do pipeline com testes automatizados de arquivos corrompidos e audios silenciosos.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario diario.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup da Squad: alinhamento das metas do pipeline |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura Padronizada e Sandboxes de Otimizacao de Midia |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio 1: O Modulo de Visao (`src/vision/processor.py`) |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio 2: O Modulo de Audio Local (`src/audio/processor.py`) |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: O Despachante Unificado e Deteccao de Conflitos |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Validacao de Lazy Loading e Falhas |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Squad (Git Sync v0.2) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario Diario de Auto-Avaliacao e Feedback |

---

## 3. Daily Standup de Abertura (14:00 - 14:05)

Reuniao de 5 minutos da squad em pe:
1. O que mais gostei na estruturacao da arquitetura e contratos ontem.
2. Minha maior dificuldade ou bug enfrentado com imports e Git.
3. Alinhem quem comeca no teclado para o pipeline unificado de hoje.
Iniciem a leitura pontualmente as 14:05.

---

## 4. Bloco 1: Leitura Padronizada de Referencia e Otimizacao de Midias (14:05 - 14:20)

Tempo dedicado: 15 minutos (leitura individual e experimentacao na squad).

Por que fusao multimodal exige cuidado de engenharia:
Em sistemas de IA multimodais, o usuario pode enviar um print de 4K (15MB) ou um audio com 5 minutos de latencia. Se jogarmos tudo cegamente para o modelo sem preprocessamento, esgotamos a cota de tokens, estouramos a memoria do notebook e introduzimos latencias insustentaveis de 20 segundos por pergunta. Engenharia de ingestao multimodal e a arte de:
1. Filtrar lixo na porta de entrada (validar MIME real, recusar arquivos corrompidos antes de gastar rede).
2. Otimizar a midia (redimensionar prints tecnicos para que texto continue legivel sem desperdicar pixels desnecessarios).
3. Lidar com contradicoes: O que fazer se a foto de uma nota fiscal diz R$ 25,00, mas o cliente gravou um audio dizendo *"comprei por R$ 30,00"*? Um bom agente nao escolhe aleatoriamente: ele registra ambas as fontes e sinaliza a divergencia para decisao humana!

O que voce vai encontrar nos links recomendados:
- Na Documentacao do Google AI: como passar multiplas modalidades simultaneas (texto + imagem + audio) no mesmo turno de geracao.
- No Guia do Pydantic: como usar validadores customizados para normalizar campos entre diferentes fontes de dados.

Links Educacionais Recomendados:
- [Google AI: Prompting com Multiplas Modalidades](https://ai.google.dev/gemini-api/docs/prompting_with_media): boas praticas de contexto combinado em modelos Gemini.
- [Pydantic Data Pipelines Best Practices](https://docs.pydantic.dev/latest/concepts/fields/): tecnicas para validar e sanitizar dados heterogeneos.

Jogos Web e Sandboxes Interativos para Testar Agora (2 a 3 min):
- [Google AI Studio Sandbox](https://aistudio.google.com/): experimente subir simultaneamente uma imagem e um prompt no playground web do AI Studio para ver o raciocinio unificado do Gemini 3.8 Flash.
- [Squoosh (Google Chrome Labs)](https://squoosh.app/): arraste um print de tela pesado e compare visualmente o slider de qualidade WebP/PNG para ver como reduzir 80% do peso sem perder a legibilidade das fontes!

---

## 5. Bloco 2: Laboratorio 1 - O Modulo de Visao do OmniAssistant (14:20 - 14:50)

Tempo dedicado: 30 minutos | Formato: Trios.

Sua Missao na Squad:
Criar `src/vision/processor.py`. O modulo recebe um arquivo de imagem, sanitiza e valida suas dimensoes via Pillow, submete ao gemini-3.8-flash com instrucao orientada ao dominio da sua squad e empacota o resultado como uma instancia oficial de `EvidenciaMultimodal`.

Scaffold de `src/vision/processor.py`:

```python
import sys
from io import BytesIO
from pathlib import Path
from PIL import Image
from google.genai import types
from pydantic import BaseModel, Field
from src.core.config import MODEL, criar_cliente_gemini
from src.core.contracts import EvidenciaMultimodal

class LeituraVisual(BaseModel):
    resumo_observado: str = Field(description="Sintese clara dos fatos observados na imagem")
    dados_chave: list[str] = Field(description="Codigos, metricas, valores ou nomes explicitamente visiveis")
    alertas_qualidade: list[str] = Field(default_factory=list, description="Problemas de nitidez ou campos duvidosos")

def processar_imagem(caminho: Path) -> EvidenciaMultimodal:
    """Valida a imagem localmente e extrai evidencias estruturadas via Gemini."""
    if not caminho.is_file() or caminho.stat().st_size > 5_000_000:
        raise ValueError("A imagem deve existir no disco e ter ate 5 MB.")
        
    dados = caminho.read_bytes()
    with Image.open(BytesIO(dados)) as img:
        img.verify()
    with Image.open(BytesIO(dados)) as img:
        formato = img.format
        if formato not in ("PNG", "JPEG"):
            raise ValueError(f"Formato {formato} invalido. Apenas PNG e JPEG sao aceitos.")
        largura, altura = img.size
        if largura * altura > 12_000_000:
            raise ValueError("Imagem excede 12 Megapixels.")
            
    mime_type = "image/png" if formato == "PNG" else "image/jpeg"
    
    # TODO: Personalize a system instruction com o contexto de negocio da sua squad!
    system_instruction = (
        "Voce e o especialista em percepcao visual do OmniAssistant. "
        "Extraia apenas fatos, numeros e rotulos que estejam inequivocamente legiveis na imagem. "
        "Nao presuma dados ausentes. Se houver corte ou ilegibilidade, registre em alertas_qualidade."
    )
    
    cliente = criar_cliente_gemini()
    resposta = cliente.models.generate_content(
        model=MODEL,
        contents=[
            "Extraia as evidencias visuais deste documento/tela.",
            types.Part.from_bytes(data=dados, mime_type=mime_type)
        ],
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.0,
            response_mime_type="application/json",
            response_schema=LeituraVisual
        )
    )
    
    leitura = LeituraVisual.model_validate_json(resposta.text or "{}")
    texto_consolidado = f"{leitura.resumo_observado}\nDados: {', '.join(leitura.dados_chave)}"
    if leitura.alertas_qualidade:
        texto_consolidado += f"\nAlertas: {'; '.join(leitura.alertas_qualidade)}"
        
    return EvidenciaMultimodal(
        origem="visao",
        resumo_informacao=texto_consolidado,
        confianca_declarada=0.7 if leitura.alertas_qualidade else 1.0
    )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python -m src.vision.processor data/amostra.png")
        sys.exit(1)
    evidencia = processar_imagem(Path(sys.argv[1]))
    print(evidencia.model_dump_json(indent=2))
```

Como testar:
Coloque uma imagem de teste em `data/amostra.png` e execute:
```bash
python -m src.vision.processor data/amostra.png
```

Criterio de Sucesso da Squad: O terminal imprime a instancia de `EvidenciaMultimodal` com `origem="visao"`, texto descritivo e campos-chave preenchidos.

---

## 6. Bloco 3: Laboratorio 2 - O Modulo de Audio do OmniAssistant (14:50 - 15:30)

Tempo dedicado: 40 minutos | Formato: Trios (inverter piloto e copiloto).

Sua Missao na Squad:
Criar `src/audio/processor.py`. O modulo recebe um arquivo de audio gravado, valida formato e ausencia de silencio, transcreve com o modelo Whisper `tiny` (usando cache em memoria para maxima performance) e converte os segmentos temporais em uma `EvidenciaMultimodal`.

Scaffold de `src/audio/processor.py`:

```python
import sys
from functools import lru_cache
from pathlib import Path
import numpy as np
import whisper
from whisper.model import Whisper
from src.core.contracts import EvidenciaMultimodal, SegmentoFala

@lru_cache(maxsize=1)
def carregar_modelo_whisper() -> Whisper:
    print("Iniciando instancia do Whisper tiny na CPU...")
    return whisper.load_model("tiny", device="cpu")

def processar_audio(caminho: Path) -> EvidenciaMultimodal:
    """Valida o audio localmente e extrai a transcricao com segmentos temporais."""
    if not caminho.is_file() or caminho.stat().st_size > 10_000_000:
        raise ValueError("Audio invalido ou maior que 10 MB.")
        
    if caminho.suffix.lower() not in {".wav", ".mp3", ".ogg", ".m4a"}:
        raise ValueError("Extensao de audio nao suportada. Use WAV, MP3 ou OGG.")
        
    amostras = whisper.load_audio(str(caminho))
    duracao_seg = len(amostras) / whisper.audio.SAMPLE_RATE
    
    if not 0.5 <= duracao_seg <= 60.0:
        raise ValueError("O audio deve ter entre 0.5 e 60 segundos.")
        
    # Validacao de energia para barrar silencio absoluto
    energia_rms = float(np.sqrt(np.mean(amostras ** 2)))
    if energia_rms < 0.001:
        raise ValueError("Audio silencioso ou microfone desconectado.")
        
    modelo = carregar_modelo_whisper()
    resultado = modelo.transcribe(amostras, language="pt", fp16=False, verbose=False)
    
    texto_transcrito = str(resultado["text"]).strip()
    if not texto_transcrito:
        raise ValueError("Nenhuma fala compreensivel foi detectada no audio.")
        
    segmentos = [
        SegmentoFala(
            inicio_segundos=round(float(s["start"]), 2),
            fim_segundos=round(float(s["end"]), 2),
            texto_transcrito=str(s["text"]).strip()
        )
        for s in resultado["segments"]
    ]
    
    return EvidenciaMultimodal(
        origem="audio",
        resumo_informacao=texto_transcrito,
        segmentos_audio=segmentos,
        confianca_declarada=0.9
    )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python -m src.audio.processor data/comando.wav")
        sys.exit(1)
    evidencia = processar_audio(Path(sys.argv[1]))
    print(evidencia.model_dump_json(indent=2))
```

Como testar:
```bash
python -m src.audio.processor data/comando.wav
```

Criterio de Sucesso da Squad: O terminal imprime o JSON com `origem="audio"`, a transcricao e os `segmentos_audio` com seus timestamps precisos.

---

## 7. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Cafe, agua e troca de ideias entre os trios. Quem ja testou rodar os dois processadores ao mesmo tempo?

---

## 8. Bloco 4: Desafio Pratico - O Despachante Unificado e Conflitos (15:45 - 16:15)

Tempo dedicado: 30 minutos | Formato: Trios.

Cenario de Negocio:
O usuario final enviou um print de tela mostrando um pedido com valor de **R$ 150,00**, mas gravou um audio com pressa dizendo: *"Oi, favor estornar o pedido de R$ 200,00"*. Se o sistema aceitar cegamente um dos dois, a empresa perde dinheiro ou cria um chamado errado!

Geracao dos Dados pela Squad:
Para simular este caso, o trio deve produzir esses dois dados: tirem um print de tela com o texto "R$ 150,00" (ou criem uma imagem simples no Paint/Excalidraw) e gravem um audio de 10 segundos no microfone ou celular com a fala divergente de "R$ 200,00", salvando ambos em `data/`.

Sua Missao na Squad:
Criar `src/core/ingestion.py`. Ele atua como o Despachante Geral (Router) de ingestao do OmniAssistant e possui um detector de contradicoes entre imagem e voz.

Scaffold de `src/core/ingestion.py`:

```python
import argparse
import json
from pathlib import Path
from src.core.contracts import EntradaUsuario, EvidenciaMultimodal

def despachar_ingestao(entrada: EntradaUsuario) -> EvidenciaMultimodal:
    """Roteia a entrada para o processador especialista sob demanda (Lazy Loading)."""
    if entrada.tipo == "texto":
        return EvidenciaMultimodal(
            origem="texto",
            resumo_informacao=entrada.texto_comando.strip()
        )
    elif entrada.tipo == "imagem":
        # Importacao sob demanda: nao carrega Pillow/Gemini se nao precisar
        from src.vision.processor import processar_imagem
        assert entrada.caminho_arquivo is not None
        return processar_imagem(entrada.caminho_arquivo)
    elif entrada.tipo == "audio":
        # Importacao sob demanda: nao carrega Whisper na memoria se for apenas imagem/texto
        from src.audio.processor import processar_audio
        assert entrada.caminho_arquivo is not None
        return processar_audio(entrada.caminho_arquivo)
    else:
        raise ValueError(f"Tipo de entrada desconhecido: {entrada.tipo}")

def auditar_conflito_evidencias(evidencia_visao: EvidenciaMultimodal, evidencia_audio: EvidenciaMultimodal) -> dict:
    """Verifica se ha palavras ou numeros de alta relevancia divergentes entre imagem e audio."""
    # TODO: Implemente a logica que detecta contradicoes entre o texto da visao e o texto do audio
    conflito_detectado = False
    motivo = "Fontes consistentes ou complementares."
    
    # Exemplo simples: se ambos citam valores monetarios diferentes
    return {
        "visao": evidencia_visao.resumo_informacao,
        "audio": evidencia_audio.resumo_informacao,
        "divergencia_identificada": conflito_detectado,
        "parecer_auditoria": motivo
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Despachante Multimodal OmniAssistant")
    parser.add_argument("tipo", choices=["imagem", "audio", "texto"])
    parser.add_argument("--caminho", type=Path)
    parser.add_argument("--texto", default="")
    args = parser.parse_args()
    
    cmd = EntradaUsuario(tipo=args.tipo, caminho_arquivo=args.caminho, texto_comando=args.texto)
    resultado = despachar_ingestao(cmd)
    print(resultado.model_dump_json(indent=2))
```

Como testar:
```bash
python -m src.core.ingestion texto --texto "Qual o status do lote B-10?"
python -m src.core.ingestion imagem --caminho data/amostra.png
python -m src.core.ingestion audio --caminho data/comando.wav
```

Criterio de Sucesso: As tres chamadas rodam de forma fluida atraves da mesma funcao `despachar_ingestao`, devolvendo instancias consistentes de `EvidenciaMultimodal`.

---

## 9. Bloco 5: Testes de Resiliencia - Lazy Loading e Blindagem (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Trios.

Vamos provar que processar texto simples NAO carrega o modelo Whisper (que pesa centenas de MB de RAM) e que arquivos corrompidos sao descartados instantaneamente.

Crie `tests/test_resiliencia_ingestao.py`:

```python
import sys
from pathlib import Path
from src.core.contracts import EntradaUsuario
from src.core.ingestion import despachar_ingestao

def testar_lazy_loading():
    # 1. Processar texto nao deve carregar o modulo de audio
    entrada_txt = EntradaUsuario(tipo="texto", texto_comando="Ola Omni")
    despachar_ingestao(entrada_txt)
    
    assert "src.audio.processor" not in sys.modules, "FALHA: Modulo de audio carregado indevidamente!"
    print("PASS: Lazy loading validado com sucesso. Texto puro nao consome memoria de audio.")

if __name__ == "__main__":
    testar_lazy_loading()
```

Como testar:
```bash
python -m tests.test_resiliencia_ingestao
```

Criterio de Sucesso: O terminal exibe `PASS`, comprovando eficiencia de memoria no ambiente da squad.

---

## 10. Bloco 6: Sincronizacao no GitHub da Squad (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Salvar os modulos de percepcao construidos hoje:
- `src/vision/processor.py`
- `src/audio/processor.py`
- `src/core/ingestion.py`
- `tests/test_resiliencia_ingestao.py`

Comandos:
```bash
git status
git add src/ tests/
git commit -m "feat(omni-v0.2): pipeline unificado de ingestao multimodal com visao, audio e lazy loading"
git push origin main
```
Todos os integrantes fazem `git pull` e confirmam que o pipeline de ingestao roda perfeitamente em suas maquinas.

---

## 11. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no seu navegador: [Quiz do Dia 25](quizzes/quiz_dia_25.html)
   - Teste seus conhecimentos sobre envelopes multimodais, fusao de evidencias e lazy loading.
2. Abra a atividade gamificada: [Atividade Interativa do Dia 25](quizzes/atividade_dia_25.html)
   - Resolva os desafios de ordenar pipelines de ingestao e depurar validadores de contratos.

---

## 12. Bloco 8: Formulario Diario de Auto-Avaliacao e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link do formulario diario disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 25](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform)

Pautas de hoje:
- Como foi a integracao dos modulos de visao e audio no trio.
- Dificuldades de performance ao rodar ingestao multimodal local.
- Entendimento do conceito de fusao de evidencias.

---

## 13. Checklist de Conclusao do Dia 25

- [ ] Daily Standup de abertura realizada no trio.
- [ ] Leitura e testes de otimizacao no Squoosh concluidos.
- [ ] Modulo `src/vision/processor.py` extraindo evidencias visuais.
- [ ] Modulo `src/audio/processor.py` transcrevendo audios locais via Whisper.
- [ ] Despachante `src/core/ingestion.py` unificando entradas sob demanda.
- [ ] Teste de resiliencia `test_resiliencia_ingestao.py` validado com `PASS`.
- [ ] Codigo sincronizado no GitHub por todos os membros da squad.
- [ ] Quiz e Atividade Interativa do Dia 25 concluidos no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 14. Atividades Complementares (Para Aprofundamento)

1. Video Recomendado: [Multimodal RAG & Fusion with Gemini & Embeddings (Google Cloud Tech, YouTube)](https://www.youtube.com/watch?v=-XmoDzDMqj4). Observe como pipelines corporativos combinam representacoes vetoriais de imagens e texto em larga escala.
2. Desafio Bonus: Adicione um contador de tempo de execucao (latencia em ms) dentro de cada evidencia para que a interface grafica no Dia 27 possa exibir um badge dizendo *"Audio processado em 1.2s | Imagem processada em 2.4s"*.

---
[Voltar ao README da Sprint 3](README.md)
