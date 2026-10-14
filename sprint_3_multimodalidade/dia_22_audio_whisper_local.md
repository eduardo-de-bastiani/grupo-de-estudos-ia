# Dia 22 (15/10/2026 - Quinta-feira)
# Audio e Speech-to-Text Local com Whisper: Dando Ouvidos a IA

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 1: Fundamentacao Tecnica em Duplas  

Ontem demos olhos a IA com visao computacional no Gemini. Hoje, vamos dar ouvidos ao modelo! Vamos implementar reconhecimento automatico de fala (Speech-to-Text) rodando de forma 100% gratuita e local na CPU do seu proprio notebook usando o OpenAI Whisper. Ao final do dia, voce tera um pipeline completo capaz de receber um audio gravado em portugues, transcrever a fala com precisao de milissegundos e enviar o contexto estruturado para o Gemini extrair planos de acao.

Dinamica de Hoje: Continuamos trabalhando em duplas colaborativas com alternancia de piloto e copiloto. Os scripts deste encontro ficam organizados na pasta local dia_22/.

---

## 1. Objetivos do Encontro

1. Compreender a arquitetura do Whisper: como ondas sonoras sao convertidas em espectrogramas log-Mel e decodificadas por um modelo Transformer encoder-decoder.
2. Executar o modelo Whisper (versao tiny) localmente em Python na CPU sem custos de API ou servicos em nuvem.
3. Extrair segmentos temporais com timestamps precisos de inicio e fim (start/end) para rastreabilidade auditiva de cada frase dita.
4. Construir um pipeline seguro de Audio -> Transcricao Local -> Prompt Estruturado no Gemini com schemas Pydantic.
5. Implementar filtros de resiliencia locais capazes de detectar e recusar audios vazios (silencio) ou corrompidos antes de gastar recursos.
6. Medir a taxa de tempo real (Real-Time Factor - RTF) para dimensionar a latencia da aplicacao no hardware do estudante.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario diario.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup por dupla: o que mais curti e maior dificuldade |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura Padronizada de Referencia e Jogos Web de Audio |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio 1: Transcricao de Audio Local com Whisper Tiny |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio 2: Alinhamento Temporal e Resumo com Gemini |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: Audio WhatsApp para Chamado Estruturado |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Deteccao de Silencio e Timeout |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Dupla (Git Sync) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario Diario de Auto-Avaliacao e Feedback |

---

## 3. Daily Standup de Abertura (14:00 - 14:05)

Reuniao rapida de 5 minutos em pe na sua dupla:
1. O que mais gostei no encontro anterior (Visao com Gemini e Bounding Boxes).
2. Minha maior dificuldade ou bug enfrentado.
Escolham uma licao aprendida para aplicar no laboratorio de audio de hoje e comecem o Bloco 1 pontualmente as 14:05.

---

## 4. Bloco 1: Leitura Padronizada de Referencia e Jogos Web (14:05 - 14:20)

Tempo dedicado: 15 minutos (leitura individual e experimentacao interativa).

Por que processamento local de audio importa na industria:
Em cenarios corporativos de dados, gravar audios e a forma mais natural de comunicacao humana (mensagens de voz no WhatsApp, gravacoes de reunioes e chamados tecnicos). No entanto, enviar gravacoes brutas de audio para APIs em nuvem e caro e levanta preocupacoes severas de privacidade (LGPD). O Whisper revolucionou esse cenario ao disponibilizar modelos de pesos abertos de alta precisao que rodam direto no notebook do desenvolvedor. O audio bruto e amostrado a 16 kHz e transformado em um espectrograma log-Mel (uma matriz visual que representa frequencias sonoras ao longo do tempo). O Transformer entao "lê" esse espectrograma e gera texto com timestamps de fala.

O que voce vai encontrar nos links recomendados:
- No Curso de Audio do Hugging Face: entenda visualmente a fisica do som, frequencias e espectrogramas Mel com exemplos de audio reproduziveis.
- No Guia do Whisper: veja como carregar modelos leves (`tiny` ou `base`), configurar a linguagem `pt` e otimizar a execucao na CPU com `fp16=False`.

Links Educacionais Recomendados:
- [Hugging Face Audio Course: Fundamentos de Audio para Desenvolvedores](https://huggingface.co/learn/audio-course/chapter1/audio_data): excelente guia visual e interativo explicando como computadores representam som.
- [OpenAI Whisper Guide & Quickstart](https://github.com/openai/whisper#readme): documentacao oficial explicando os tamanhos de modelo (tiny, base, small) e parametros de execucao local.
- [DeepLearning.AI: Speech-to-Text Fundamentals](https://www.deeplearning.ai/the-batch/): panorama moderno sobre reconhecimento automatico de fala em sistemas de IA.

Jogos Web e Playgrounds Interativos para Testar Agora (2 a 3 min):
- [Chrome Music Lab - Spectrogram](https://musiclab.chromeexperiments.com/Spectrogram/): ative seu microfone, fale, assobie e bata palmas. Veja na tela como sua voz vira frequencias coloridas em tempo real (e essa matriz que o Whisper consome!).
- [Whisper WebGPU no Hugging Face](https://huggingface.co/spaces/Xenova/whisper-web): grave um audio de teste e veja a transcricao acontecer 100% local no seu proprio navegador via WebGPU/Wasm.

---

## 5. Bloco 2: Laboratorio 1 - Transcricao Local com Whisper Tiny na CPU (14:20 - 14:50)

Tempo dedicado: 30 minutos | Formato: Duplas (Piloto e Copiloto).

Sua Missao na Dupla:
Construir o script `dia_22/transcrever.py`. O script deve carregar o modelo Whisper `tiny` na memoria, verificar se o arquivo de audio existe e nao e silencioso, e emitir uma transcricao completa acompanhada de cada segmento de fala e seu tempo de execucao.

Preparacao do Ambiente da Dupla:
```bash
mkdir -p dia_22 amostras
pip install openai-whisper numpy
```

Instalacao Obrigatoria do FFmpeg no Sistema (essencial para o Whisper decodificar audio):
- Linux (Ubuntu/Debian): `sudo apt update && sudo apt install -y ffmpeg`
- macOS (Homebrew): `brew install ffmpeg`
- Windows (PowerShell): `winget install Gyan.FFmpeg`
- Validacao: execute `ffmpeg -version` no terminal para confirmar que o binario esta ativo no PATH.

Geracao do Audio pela Dupla:
Cada dupla deve gerar seu proprio dado de voz! Use o microfone do notebook ou o gravador de voz do seu celular (por exemplo, mande um audio no WhatsApp Web para voce mesmo e baixe o arquivo) gravando uma fala real de 10 a 15 segundos em portugues: *"Time de dados, precisamos verificar as vendas da filial Sul no mes de outubro"*. Salve o arquivo em `amostras/comando.wav` (ou `.mp3`).

Scaffold de `dia_22/transcrever.py`:

```python
import json
import sys
from functools import lru_cache
from pathlib import Path
from time import perf_counter
from typing import TypedDict
import numpy as np
import whisper
from whisper.model import Whisper

class Segmento(TypedDict):
    inicio: float
    fim: float
    texto: str

class Transcricao(TypedDict):
    texto: str
    segmentos: list[Segmento]
    duracao_segundos: float
    tempo_processamento_ms: float
    fator_tempo_real: float

@lru_cache(maxsize=1)
def obter_modelo() -> Whisper:
    """Mantem o modelo em memoria cache para nao recarregar os pesos a cada chamada."""
    print("Carregando pesos do Whisper tiny na CPU...")
    return whisper.load_model("tiny", device="cpu")

def transcrever_audio(caminho: Path) -> Transcricao:
    inicio = perf_counter()
    
    if not caminho.is_file() or caminho.stat().st_size > 10_000_000:
        raise ValueError("Informe um arquivo de audio existente de ate 10 MB.")
        
    audio = whisper.load_audio(str(caminho))
    duracao = len(audio) / whisper.audio.SAMPLE_RATE
    
    if not 0 < duracao <= 45:
        raise ValueError("Para os laboratorios, utilize audios curtos de ate 45 segundos.")
        
    # Verificacao basica de energia RMS (rejeita arquivos de silencio absoluto)
    energia_rms = float(np.sqrt(np.mean(audio ** 2)))
    if energia_rms < 0.001:
        raise ValueError("Audio silencioso ou inaudivel. Grave uma fala clara.")
        
    modelo = obter_modelo()
    resultado = modelo.transcribe(audio, language="pt", fp16=False, verbose=False)
    
    segmentos: list[Segmento] = [
        {
            "inicio": round(float(s["start"]), 2),
            "fim": round(float(s["end"]), 2),
            "texto": str(s["text"]).strip()
        }
        for s in resultado["segments"]
    ]
    
    texto_completo = str(resultado["text"]).strip()
    tempo_total = perf_counter() - inicio
    
    # TODO: Calcule o Fator de Tempo Real (RTF = tempo_total / duracao)
    # Se duracao for 10s e levou 5s para transcrever, o RTF e 0.5 (mais rapido que tempo real).
    rtf = round(tempo_total / duracao, 2)
    
    return {
        "texto": texto_completo,
        "segmentos": segmentos,
        "duracao_segundos": round(duracao, 2),
        "tempo_processamento_ms": round(tempo_total * 1000, 1),
        "fator_tempo_real": rtf
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_22/transcrever.py amostras/comando.wav")
        sys.exit(1)
        
    resultado = transcrever_audio(Path(sys.argv[1]))
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
```

Como testar:
Grave um audio de 10 a 15 segundos no seu celular ou notebook dizendo: *"Time de dados, precisamos verificar as vendas da filial Sul no mes de outubro"* e salve em `amostras/comando.wav`:
```bash
python dia_22/transcrever.py amostras/comando.wav
```

Criterio de Sucesso da Dupla: O terminal deve imprimir o texto transcrito em portugues, a lista de segmentos com timestamps e o tempo de execucao sem erros.

---

## 6. Bloco 3: Laboratorio 2 - Alinhamento Temporal e Resumo com Gemini (14:50 - 15:30)

Tempo dedicado: 40 minutos | Formato: Duplas (invertam o teclado!).

Sua Missao na Dupla:
Ter a transcricao e apenas metade da solucao. Em sistemas profissionais, precisamos que a LLM (Gemini) processe o texto da fala e aponte com rigor quais trechos de tempo (timestamps [inicio-fim]) justificam cada informacao extraida. Isso garante rastreabilidade e explicabilidade total!

Criar `dia_22/resumir.py`:

```python
import json
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from transcrever import transcrever_audio

load_dotenv()
MODEL = "gemini-3.8-flash"

class ItemAcao(BaseModel):
    descricao: str = Field(description="Acao ou fato importante extraido do audio")
    intervalo_tempo: str = Field(description="Timestamp formatado como [inicio - fim] em segundos onde a fala ocorreu")

class AnaliseAudio(BaseModel):
    resumo_executivo: str = Field(description="Sintese clara e objetiva do que foi falado")
    acoes_identificadas: list[ItemAcao] = Field(description="Lista de itens de acao com seus respectivos tempos")
    ambiguidades_ou_ruidos: list[str] = Field(description="Alertas de trechos inaudiveis ou codigos com duvida")

def processar_audio_com_llm(caminho: Path) -> AnaliseAudio:
    transcricao = transcrever_audio(caminho)
    cliente = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    
    # Formatamos os segmentos para alimentar o modelo com timestamps precisos
    segmentos_str = json.dumps(transcricao["segmentos"], ensure_ascii=False, indent=2)
    
    # TODO: Crie a system instruction orientando o modelo a nao inventar informacoes
    # e a fundamentar rigorosamente cada acao nos intervalos de tempo recebidos.
    system_prompt = (
        "Voce e um analista de operacoes de audio. "
        "Receba os segmentos transcritos com timestamps de fala e extraia um resumo executivo. "
        "Para cada acao identificada, cite o intervalo [inicio - fim] correspondente nos segmentos. "
        "Se houver algum termo duvidoso ou codigo confuso, registre em ambiguidades_ou_ruidos."
    )
    
    resposta = cliente.models.generate_content(
        model=MODEL,
        contents=[f"Segmentos de fala recebidos:\n{segmentos_str}"],
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.0,
            response_mime_type="application/json",
            response_schema=AnaliseAudio
        )
    )
    
    return AnaliseAudio.model_validate_json(resposta.text or "{}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_22/resumir.py amostras/comando.wav")
        sys.exit(1)
        
    resultado = processar_audio_com_llm(Path(sys.argv[1]))
    print(resultado.model_dump_json(indent=2))
```

Como testar:
```bash
python dia_22/resumir.py amostras/comando.wav
```

Criterio de Sucesso da Dupla: O terminal exibe um JSON validado pelo Pydantic, contendo o resumo e as acoes associadas aos intervalos temporais exatos (ex: `"[2.5s - 5.8s]"`).

---

## 7. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Tome um cafe, converse com os colegas sobre a velocidade da CPU de cada maquina ao rodar o Whisper e compartilhe como o modelo lidou com gírias ou sotaques locais.

---

## 8. Bloco 4: Desafio Pratico - Audio de WhatsApp para Chamado Estruturado (15:45 - 16:15)

Tempo dedicado: 30 minutos | Formato: Duplas.

Cenario de Negocio:
Em operacoes de suporte tecnico, clientes enviam mensagens de voz caoticas:
*"Oi pessoal, aqui e o Marcelo da filial 3... seguinte, o servidor de banco de dados travou depois da carga das 14h, e precisamos reiniciar o pool de conexoes antes das 16h com urgencia alta!"*

Sua Missao na Dupla:
Criar `dia_22/integrar_audio.py` que recebe o audio caotico, executa o Whisper localmente e gera um Chamado de Suporte oficial estruturado com prioridade, servico afetado e prazo.

Scaffold de `dia_22/integrar_audio.py`:

```python
import json
import sys
from pathlib import Path
from pydantic import BaseModel, Field
from resumir import processar_audio_com_llm
from transcrever import transcrever_audio

class ChamadoSuporte(BaseModel):
    solicitante: str = Field(description="Nome da pessoa identificada na fala ou 'Nao identificado'")
    filial_ou_setor: str = Field(description="Setor ou filial mencionado")
    servico_afetado: str = Field(description="Componente de TI mencionado")
    prioridade: str = Field(description="ALTA, MEDIA ou BAIXA de acordo com a urgencia expressa")
    resumo_chamado: str = Field(description="Descricao tecnica clara do problema")

def gerar_chamado_de_audio(caminho: Path) -> dict:
    transcricao = transcrever_audio(caminho)
    analise = processar_audio_com_llm(caminho)
    
    return {
        "arquivo": caminho.name,
        "fala_transcrita": transcricao["texto"],
        "resumo_executivo": analise.resumo_executivo,
        "itens_com_tempo": [item.model_dump() for item in analise.acoes_identificadas],
        "tempo_total_processamento_ms": transcricao["tempo_processamento_ms"]
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python dia_22/integrar_audio.py amostras/chamado.wav")
        sys.exit(1)
        
    resultado = gerar_chamado_de_audio(Path(sys.argv[1]))
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
```

Como testar:
Grave um audio simulando o chamado de suporte e execute:
```bash
python dia_22/integrar_audio.py amostras/chamado.wav
```

Criterio de Sucesso: O script emite o relatorio completo integrando transcricao crua, extracao analitica e timestamps de suporte sem falhas de execucao.

---

## 9. Bloco 5: Testes de Resiliencia - Silencio e Controle de Timeout (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Duplas.

Vamos garantir que o sistema rejeite audios mudos ou arquivos sem conteudo util antes de invocar a LLM.

Crie `dia_22/testar_audio.py`:

```python
import wave
from pathlib import Path
from tempfile import TemporaryDirectory
from transcrever import transcrever_audio

def executar_testes_de_estresse():
    with TemporaryDirectory() as tmp_dir:
        tmp_path = Path(tmp_dir)
        
        # Teste 1: Arquivo WAV com 3 segundos de silencio absoluto (amplitude zero)
        silencio_wav = tmp_path / "silencio.wav"
        with wave.open(str(silencio_wav), "wb") as f:
            f.setnchannels(1)
            f.setsampwidth(2)
            f.setframerate(16000)
            f.writeframes(b"\x00\x00" * (16000 * 3))
            
        try:
            transcrever_audio(silencio_wav)
            print("FALHA: O sistema processou um audio mudo sem reclamar!")
        except ValueError as erro:
            if "silencioso" in str(erro).lower():
                print("PASS: Audio silencioso barrado com sucesso pela deteccao de energia RMS.")
            else:
                print(f"PASS: Falha capturada corretamente: {erro}")

if __name__ == "__main__":
    executar_testes_de_estresse()
```

Como testar:
```bash
python dia_22/testar_audio.py
```

Criterio de Sucesso: O terminal exibe `PASS`, confirmando que audios silenciosos sao filtrados na borda.

---

## 10. Bloco 6: Sincronizacao no GitHub da Dupla (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Conferir os arquivos desenvolvidos hoje na pasta `dia_22/`:
- `dia_22/transcrever.py`
- `dia_22/resumir.py`
- `dia_22/integrar_audio.py`
- `dia_22/testar_audio.py`

Comandos:
```bash
git status
git add dia_22/
git commit -m "feat(dia-22): reconhecimento de fala com whisper local e alinhamento temporal gemini"
git push
```

---

## 11. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no navegador o arquivo: [Quiz do Dia 22](quizzes/quiz_dia_22.html)
   - Responda questoes sobre log-Mel spectrograms, taxa de amostragem de 16 kHz, Whisper tiny e timestamps.
2. Abra a atividade pratica gamificada: [Atividade Interativa do Dia 22](quizzes/atividade_dia_22.html)
   - Resolva os desafios de bugs em scripts de audio, ordenacao do pipeline acustico e validadores.

---

## 12. Bloco 8: Formulario Diario de Auto-Avaliacao e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link do formulario diario disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 22](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform)

Pautas de hoje:
- Dificuldades de instalacao do FFmpeg e execucao local do Whisper na CPU.
- Qualidade da transcricao obtida no portugues.
- Avaliacao da colaboracao na dupla.

---

## 13. Checklist de Conclusao do Dia 22

- [ ] Daily Standup de abertura realizada com a dupla.
- [ ] Leitura e experimentos interativos no Chrome Music Lab concluidos.
- [ ] Script `transcrever.py` rodando com Whisper tiny na CPU e calculando RTF.
- [ ] Script `resumir.py` integrando transcricao com Gemini e emitindo timestamps.
- [ ] Desafio `integrar_audio.py` gerando chamado de suporte com prioridade.
- [ ] Teste de resiliencia `testar_audio.py` barrando audios de silencio com `PASS`.
- [ ] Codigo sincronizado no GitHub via Git Sync.
- [ ] Quiz do Dia 22 respondido no navegador.
- [ ] Atividade interativa do Dia 22 concluida no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 14. Atividades Complementares (Para Aprofundamento)

1. Video Recomendado: [Automatic Speech Recognition & Transformers (MIT 6.S191, YouTube)](https://www.youtube.com/watch?v=sR6_bZ6VkAg). Observe como modelos modernos tratam atencao temporal e compare: por que janelas de 30 segundos sao o padrao de processamento do Whisper?
2. Script Bonus de Codigo: Crie `dia_22/bonus_exportar_srt.py` para converter os segmentos retornados pelo Whisper em um arquivo de legendas padrao `.srt`. Teste abrir o video ou audio no VLC com a legenda gerada pelo seu proprio codigo Python!

---
[Voltar ao README da Sprint 3](README.md)
