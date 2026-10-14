# Dia 24 (19/10/2026 - Segunda-feira)
# Kickoff do OmniAssistant, Arquitetura Modular e Setup Git

Sprint 3: Multimodalidade (Visao + Audio Whisper) e Projeto OmniAssistant  
Horario: 14:00 as 17:00 (180 minutos) | Formato: Presencial Autonomo (Navi Hub / Tecnopuc)  
Fase: Semana 2: Desenvolvimento Cumulativo do OmniAssistant em Trios  

Bem-vindos a Semana 2! O jogo agora subiu de nivel: a partir de hoje, voces atuam como squads fixas de 3 desenvolvedores construindo um produto de ponta a ponta: o **OmniAssistant**. Tudo o que for codificado a partir de agora compoe diretamente os modulos do repositorio final que voces apresentarao na sexta-feira para os gestores da DataLakers e do Navi Hub.

Dinamica de Squad: Cada trio trabalha em seu proprio repositorio Git. Alternem entre os papeis de Piloto (teclado), Copiloto (revisao e testes em tempo real) e Arquiteto (documentacao e consistencia dos contratos Pydantic).

---

## 1. Objetivos do Encontro

1. Realizar o Kickoff Oficial do OmniAssistant, definindo o problema de negocio da squad e as regras de sucesso da aplicacao.
2. Criar a arquitetura de pastas modular do projeto (`src/core/`, `src/vision/`, `src/audio/`, `src/tools/` e `data/`).
3. Centralizar segredos e configuracoes de API com carregamento seguro via python-dotenv em `src/core/config.py`.
4. Modelar os contratos de dados compartilhados com Pydantic (`Entrada`, `Segmento`, `Evidencia`) em `src/core/contracts.py`.
5. Implementar e executar o Smoke Test do trio (`src/core/smoke.py`), validando a integridade da arquitetura sem quebrar o fluxo.
6. Publicar o repositorio inicial da squad no GitHub com README tecnico e `.gitignore` blindado.
7. Consolidar os conceitos no Quiz Interativo e na Atividade Interativa antes do formulario diario.

---

## 2. Cronograma Minuto a Minuto

| Horario | Duracao | Bloco | Atividade |
| :--- | :---: | :--- | :--- |
| 14:00 - 14:05 | 5 min | Abertura | Daily Standup do Trio: definicao dos papeis de hoje |
| 14:05 - 14:20 | 15 min | Bloco 1 | Leitura Padronizada e Ferramentas Visuais de Arquitetura |
| 14:20 - 14:50 | 30 min | Bloco 2 | Laboratorio 1: Setup Modular do OmniAssistant e Configuracoes |
| 14:50 - 15:30 | 40 min | Bloco 3 | Laboratorio 2: Contratos de Entrada e Evidencia com Pydantic |
| 15:30 - 15:45 | 15 min | Intervalo | Coffee Break e Networking |
| 15:45 - 16:15 | 30 min | Bloco 4 | Desafio Pratico: O Smoke Test Integrador do Trio |
| 16:15 - 16:25 | 10 min | Bloco 5 | Testes de Resiliencia: Blindagem contra Variaveis Ausentes |
| 16:25 - 16:35 | 10 min | Bloco 6 | Sincronizacao no GitHub da Squad (Git Sync v0.1) |
| 16:35 - 16:45 | 10 min | Bloco 7 | Quiz e Atividade Interativa HTML no Navegador |
| 16:45 - 17:00 | 15 min | Bloco 8 | Formulario Diario de Auto-Avaliacao e Alinhamento |

---

## 3. Daily Standup de Abertura (14:00 - 14:05)

Reuniao de 5 minutos em pe da squad de 3 integrantes:
1. O que mais gostei na primeira semana de fundamentos (visao, audio e avaliacao).
2. Minha maior dificuldade ou bug enfrentado na Semana 1.
3. Alinhem papeis (Piloto, Copiloto e Arquiteto) e o dominio tematico do assistente do trio.
Iniciem a leitura e exploracao visual as 14:05.

---

## 4. Bloco 1: Leitura Padronizada de Referencia e Ferramentas de Design (14:05 - 14:20)

Tempo dedicado: 15 minutos (leitura individual e alinhamento no trio).

Por que arquitetura limpa e desacoplamento importam no OmniAssistant:
Projetos multimodais que misturam tudo em um unico script monolitico viram pesadelos de manutencao: se o Whisper falha, a tela do Streamlit congela; se o usuario manda uma imagem pesada, a chamada de banco de dados estoura. Em times profissionais de tecnologia (como na DataLakers), construimos sistemas orientados a contratos estritos. O modulo de audio nao sabe o que o Streamlit faz; o modulo de visao nao sabe o que o SQLite faz. Todos se comunicam atraves de contratos tipados em Pydantic (`Entrada` -> `Evidencia` -> `Acao`). Esse desacoplamento permite que os 3 integrantes da squad programem modulos diferentes simultaneamente sem pisar no pe uns dos outros!

O que voce vai encontrar nos links recomendados:
- Na Documentacao do Streamlit: aprenda como estruturar aplicacoes multimodais com chat e upload de arquivos.
- Nos Guias do Google AI: veja padroes arquiteturais recomendados para agentes que combinam ferramentas e dados multimodais.

Links Educacionais Recomendados:
- [Streamlit Documentation: Building Multimodal AI Apps](https://docs.streamlit.io/develop/tutorials/llms): tutorial oficial sobre como criar interfaces interativas de chat multimodal.
- [Google AI: Multimodal Agent Architecture Patterns](https://ai.google.dev/gemini-api/docs/multimodal-concepts): padroes de design para fusao de texto, imagens e chamadas de funcao.
- [Pydantic Models & Clean Architecture](https://docs.pydantic.dev/latest/concepts/models/): como contratos de dados garantem robustez e eliminam bugs de tipos entre modulos.

Jogos Web e Playgrounds Interativos para Testar Agora (2 a 3 min):
- [Learn Git Branching](https://learngitbranching.js.org/): jogue uma fase rapida simulando criacao de branches e commits. Fundamental para a squad nao quebrar a branch main durante a semana!
- [Streamlit App Gallery Multimodal](https://streamlit.io/gallery): explore apps reais de visao e audio para se inspirar na interface que voces vao construir no Dia 27.
- [Excalidraw Web](https://excalidraw.com/): abram uma sessao colaborativa rapida de 2 minutos para rascunhar as 4 caixas do sistema (Visao, Audio, Agente, Streamlit).

---

## 5. Bloco 2: Laboratorio 1 - Setup Modular do OmniAssistant (14:20 - 14:50)

Tempo dedicado: 30 minutos | Formato: Trios.

Sua Missao na Squad:
Criar a raiz do repositorio do projeto OmniAssistant e implementar o modulo `src/core/config.py`. Ele e responsavel por centralizar timeouts, identificadores de modelo e carregar chaves de API sem vazar segredos para o Git.

Estrutura de Pastas a ser Criada no Repositorio do Trio:
```bash
mkdir -p src/core src/vision src/audio src/tools data tests
touch src/__init__.py src/core/__init__.py src/vision/__init__.py src/audio/__init__.py src/tools/__init__.py
```

Geracao de Dados de Demonstracao pela Squad:
Cada squad e responsavel por produzir seus proprios dados de teste dentro de `data/`, adaptados ao cenario de negocio escolhido pelo trio (prints de sistemas reais, diagramas desenhados pela equipe e mensagens de voz gravadas pelos proprios integrantes). Nenhuma midia externa pre-fabricada e necessaria.

Criar `.gitignore` na raiz do repositorio:
```gitignore
.env
.venv/
__pycache__/
*.pyc
data/*.sqlite
data/*.sqlite-journal
.streamlit/secrets.toml
```

Implementar `src/core/config.py`:

```python
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

MODEL = "gemini-3.8-flash"
TIMEOUT_MS = 30_000

def criar_cliente_gemini() -> genai.Client:
    """Carrega as variaveis de ambiente e instancia o cliente oficial com timeout estrito."""
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise ValueError("Chave GEMINI_API_KEY ausente! Crie o arquivo .env ou configure no ambiente.")
        
    return genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(timeout=TIMEOUT_MS)
    )

def obter_status_configuracao(nome_squad: str) -> str:
    # TODO: Retorne uma string identificando a squad e os parametros ativos (sem vazar a chave!)
    return f"Squad '{nome_squad}' | Modelo: {MODEL} | Timeout: {TIMEOUT_MS}ms"

if __name__ == "__main__":
    print(obter_status_configuracao("Squad Alpha"))
    print("Configuracao centralizada carregada com sucesso!")
```

Como testar:
```bash
python -m src.core.config
```

Criterio de Sucesso da Squad: O comando executa sem erros, exibindo o status de configuracao no terminal sem expor chaves ou credenciais sensiveis.

---

## 6. Bloco 3: Laboratorio 2 - Contratos de Entrada e Evidencia com Pydantic (14:50 - 15:30)

Tempo dedicado: 40 minutos | Formato: Trios (inverter quem digita!).

Sua Missao na Squad:
Implementar `src/core/contracts.py`. Este modulo define os contratos de dados sagrados da aplicacao: `EntradaUsuario` (recebendo caminhos de imagens, audios ou comandos em texto), `SegmentoFala` e `EvidenciaMultimodal`. Toda a comunicacao entre os modulos nos proximos dias obedecera a essas classes.

Scaffold de `src/core/contracts.py`:

```python
from pathlib import Path
from typing import Literal, Self
from pydantic import BaseModel, ConfigDict, Field, model_validator

class ContratoBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

class EntradaUsuario(ContratoBase):
    tipo: Literal["imagem", "audio", "texto"]
    caminho_arquivo: Path | None = None
    texto_comando: str = ""

    @model_validator(mode="after")
    def validar_consistencia(self) -> Self:
        if self.tipo == "texto" and not self.texto_comando.strip():
            raise ValueError("Entrada do tipo texto nao pode estar vazia.")
        if self.tipo in ("imagem", "audio"):
            if self.caminho_arquivo is None or not self.caminho_arquivo.is_file():
                raise ValueError(f"Arquivo obrigatorio nao encontrado para entrada do tipo {self.tipo}.")
        return self

class SegmentoFala(ContratoBase):
    inicio_segundos: float = Field(ge=0.0)
    fim_segundos: float = Field(ge=0.0)
    texto_transcrito: str = Field(min_length=1)

    @model_validator(mode="after")
    def validar_ordem_cronologica(self) -> Self:
        if self.fim_segundos < self.inicio_segundos:
            raise ValueError("O timestamp final nao pode ser menor que o timestamp inicial.")
        return self

class EvidenciaMultimodal(ContratoBase):
    origem: Literal["visao", "audio", "texto", "banco_dados"]
    resumo_informacao: str = Field(min_length=1)
    segmentos_audio: list[SegmentoFala] = Field(default_factory=list)
    confianca_declarada: float = Field(default=1.0, ge=0.0, le=1.0)

if __name__ == "__main__":
    entrada_valida = EntradaUsuario(tipo="texto", texto_comando="Auditar lote 502")
    print("Contrato EntradaUsuario validado:")
    print(entrada_valida.model_dump_json(indent=2))
```

Como testar:
```bash
python -m src.core.contracts
```

Criterio de Sucesso da Squad: O script executa e valida o modelo Pydantic; e se alguem tentar passar um timestamp com fim menor que inicio, o validador lanca um `ValidationError` claro.

---

## 7. Coffee Break e Networking (15:30 - 15:45)

Pausa de 15 minutos! Tomem um cafe, conversem com as outras squads sobre a escolha dos seus dominios e alinhem como sera a divisão de tarefas para os proximos 3 dias de codigo.

---

## 8. Bloco 4: Desafio Pratico - O Smoke Test Integrador do Trio (15:45 - 16:15)

Tempo dedicado: 30 minutos | Formato: Trios.

Sua Missao na Squad:
Implementar o primeiro teste de integracao de ponta a ponta em `tests/smoke_test_omni.py`. Este script deve importar as configuracoes, criar um ciclo completo de Entrada -> Evidencia e, se houver flag `--api`, realizar um "ping" real no gemini-3.8-flash para provar que a squad tem conexao operacional.

Scaffold de `tests/smoke_test_omni.py`:

```python
import argparse
import json
from src.core.config import MODEL, TIMEOUT_MS, criar_cliente_gemini
from src.core.contracts import EntradaUsuario, EvidenciaMultimodal, SegmentoFala

def executar_smoke_test(testar_api: bool = False) -> dict:
    print("Iniciando Smoke Test do OmniAssistant...")
    
    # 1. Validacao dos contratos
    cmd = EntradaUsuario(tipo="texto", texto_comando="Ping de teste da arquitetura")
    evidencia = EvidenciaMultimodal(
        origem="texto",
        resumo_informacao=cmd.texto_comando,
        segmentos_audio=[SegmentoFala(inicio_segundos=0.0, fim_segundos=1.5, texto_transcrito="Ping")]
    )
    
    # Valida serializacao e desserializacao JSON
    evidencia_recuperada = EvidenciaMultimodal.model_validate_json(evidencia.model_dump_json())
    assert evidencia_recuperada == evidencia, "Falha na integridade dos contratos Pydantic!"
    
    resultado = {
        "status_contratos": "PASS",
        "modelo_ativo": MODEL,
        "timeout_ms": TIMEOUT_MS,
        "conexao_api": "NAO_SOLICITADA"
    }
    
    # 2. Teste opcional de conectividade com a API
    if testar_api:
        try:
            cliente = criar_cliente_gemini()
            resposta = cliente.models.generate_content(
                model=MODEL,
                contents="Responda apenas com a palavra: OPERACIONAL"
            )
            resultado["conexao_api"] = "CONECTADO_COM_SUCESSO" if resposta.text else "RESPOSTA_VAZIA"
        except Exception as e:
            resultado["conexao_api"] = f"ERRO_DE_CONEXAO: {type(e).__name__}"
            
    return resultado

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--api", action="store_true", help="Dispara chamada real de validacao no Gemini")
    args = parser.parse_args()
    
    relatorio = executar_smoke_test(testar_api=args.api)
    print(json.dumps(relatorio, indent=2, ensure_ascii=False))
```

Como testar:
```bash
python -m tests.smoke_test_omni --api
```

Criterio de Sucesso da Squad: O terminal imprime `status_contratos: "PASS"` e `conexao_api: "CONECTADO_COM_SUCESSO"`.

---

## 9. Bloco 5: Testes de Resiliencia - Blindagem contra Variaveis Ausentes (16:15 - 16:25)

Tempo dedicado: 10 minutos | Formato: Trios.

O que acontece se um desenvolvedor novo clonar o repositorio e esquecer de configurar o `.env`? O sistema deve falhar imediatamente com uma mensagem educativa explicando exatamente o que falta, em vez de estourar um traceback misterioso no meio do app Streamlit!

Crie `tests/test_resiliencia_config.py`:

```python
import os
from unittest.mock import patch
from src.core.config import criar_cliente_gemini

def testar_falha_sem_chave():
    with patch.dict(os.environ, {"GEMINI_API_KEY": ""}):
        try:
            criar_cliente_gemini()
            print("FALHA: O cliente foi criado sem chave de API!")
        except ValueError as e:
            print("PASS: Sistema levantou ValueError educativo:", str(e))

if __name__ == "__main__":
    testar_falha_sem_chave()
```

Como testar:
```bash
python -m tests.test_resiliencia_config
```

Criterio de Sucesso: O terminal exibe `PASS`, comprovando que o cliente rejeita inicializacao sem credencial antes de quebrar as telas de interface.

---

## 10. Bloco 6: Sincronizacao no GitHub da Squad (16:25 - 16:35)

Tempo dedicado: 10 minutos.

Publicar a versao v0.1-setup do repositorio compartilhado do trio no GitHub!
1. Conferir que o arquivo `.env` NAO ESTA sendo rastreado pelo git (`git status`).
2. Adicionar os modulos e criar o primeiro commit oficial do projeto:
```bash
git status
git add src/ tests/ .gitignore README.md
git commit -m "feat(omni-v0.1): kickoff do projeto, arquitetura modular, contratos pydantic e smoke test"
git push origin main
```
3. Cada um dos outros 2 integrantes faz `git pull` em sua maquina e roda `python -m tests.smoke_test_omni` para validar que o ambiente esta perfeitamente sincronizado.

---

## 11. Bloco 7: Quiz Interativo e Atividade Interativa no Navegador (16:35 - 16:45)

Tempo dedicado: 10 minutos (6 min para o Quiz + 4 min para a Atividade).

1. Abra diretamente no seu navegador o arquivo: [Quiz do Dia 24](quizzes/quiz_dia_24.html)
   - Responda questoes sobre arquitetura modular em Python, contratos Pydantic para pipelines de IA e padroes de seguranca.
2. Abra a atividade pratica gamificada: [Atividade Interativa do Dia 24](quizzes/atividade_dia_24.html)
   - Resolva desafios interativos de ordenar fluxos de dados, consertar bugs em contratos e classificar modulos.

---

## 12. Bloco 8: Formulario Diario de Auto-Avaliacao e Feedback (16:45 - 17:00)

Tempo dedicado: 15 minutos (preenchimento individual).

Acesse o link disponibilizado pelo facilitador:
[Preencher Formulario do Google Forms - Dia 24](https://docs.google.com/forms/d/e/1FAIpQLSdwTctKNV6uLhe9pquUsXs9LdK8-Z9kFlfSfTbU8Buwh7Nagg/viewform)

Pautas de hoje:
- Como foi o alinhamento da squad no kickoff do projeto.
- Dominio e caso de uso escolhido para o OmniAssistant.
- Dificuldades encontradas na estrutura de pastas ou na sincronizacao Git entre os 3 integrantes.

---

## 13. Checklist de Conclusao do Dia 24

- [ ] Daily Standup da squad realizada com definicao de papeis.
- [ ] Leitura e rascunho de arquitetura no Excalidraw concluidos.
- [ ] Modulo `src/core/config.py` implementado e isolando chaves.
- [ ] Modulo `src/core/contracts.py` definindo contratos Pydantic.
- [ ] Smoke Test em `tests/smoke_test_omni.py` aprovado com `PASS`.
- [ ] Teste de resiliencia `test_resiliencia_config.py` validado.
- [ ] Repositorio do trio no GitHub sincronizado por todos os 3 integrantes.
- [ ] Quiz e Atividade Interativa do Dia 24 respondidos no navegador.
- [ ] Formulario individual de autoavaliacao preenchido.

---

## 14. Atividades Complementares (Para Aprofundamento)

1. Video Recomendado: [Modern Python Project Structure & Clean Architecture (ArjanCodes, YouTube)](https://www.youtube.com/watch?v=Prssbxc4L34). Veja por que separar contratos de dominio da camada de infraestrutura economiza dezenas de horas de refatoracao em projetos corporativos.
2. Desafio Bonus: Adicione uma docstring completa em formato Google Style em cada funcao de `contracts.py` e gere a documentacao automatica usando o comando `python -m pydoc src.core.contracts`.

---
[Voltar ao README da Sprint 3](README.md)
