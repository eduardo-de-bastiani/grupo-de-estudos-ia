# 📅 Dia 01 (14/09 - Segunda-feira)
# 🚀 Kickoff Oficial, Boas-Vindas & Setup do Ambiente

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Presença Especial:** Liderança e Mentores da DataLakers & Coordenação do Navi Hub

---

## 🎯 1. Objetivos do Encontro
1. Apresentar a parceria entre **Navi Hub** e **DataLakers**, explicando o propósito do grupo de estudos e as oportunidades de captação de talentos (scouting).
2. Promover a integração e quebra-gelo entre os 15 alunos de Engenharia de Software e Sistemas de Informação.
3. Apresentar a estrutura do programa (3 Sprints, 90 horas presenciais, entregas e Demo Days).
4. Garantir que 100% dos alunos saiam com o ambiente de desenvolvimento inicial padronizado e funcional em seus notebooks.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:45   │ Boas-Vindas, Coffee Break & Apresentação DataLakers     │
│ 14:45 - 15:15   │ Dinâmica Quebra-Gelo: "O Prompt Humano"                │
│ 15:15 - 15:35   │ Apresentação da Jornada: O que construiremos em 6 sem? │
│ 15:35 - 15:45   │ Intervalo Rápido                                       │
│ 15:45 - 16:45   │ Setup Prático do Ambiente (Python, Git, VS Code)       │
│ 16:45 - 17:00   │ Smoke Test do Ambiente & Fechamento do Dia             │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## ☕ 3. Bloco 1: Abertura & Boas-Vindas (14:00 - 14:45)
- **Coffee Break de Acolhimento:** Recepção informal dos estudantes no espaço do Navi Hub.
- **Fala da Liderança da DataLakers:**
  - Quem é a DataLakers e quais problemas de dados e IA ela resolve no mercado.
  - Por que a empresa está investindo nesse grupo de estudos (busca por atitude, capacidade de aprendizado e trabalho em equipe).
  - O que a liderança espera ver nas apresentações de final de Sprint (Demo Days).
- **Apresentação do Cientista de Dados / Mentor:** Explicação do papel de mentoria técnica e facilitação diária.

---

## 🤝 4. Bloco 2: Dinâmica Quebra-Gelo — "O Prompt Humano" (14:45 - 15:15)
- **Formato:** Duplas aleatórias (15 alunos -> 7 duplas + 1 trio).
- **Tempo:** 15 min de conversa em duplas + 15 min de apresentação para a sala.
- **Instruções:**
  1. Cada aluno deve entrevistar sua dupla como se estivesse fazendo um *System Prompt* de uma pessoa:
     - **Role:** Qual o seu semestre, curso e qual tecnologia você mais gosta de programar?
     - **Context:** Qual a sua maior curiosidade ou receio sobre Inteligência Artificial Generativa?
     - **Special Ability (Superpoder):** Uma habilidade não técnica ou curiosidade pessoal fora da faculdade.
  2. Ao final, cada participante apresenta sua dupla para a turma em 1 minuto.

---

## 🗺️ 5. Bloco 3: Apresentação da Jornada (15:15 - 15:35)
- Visão geral das 3 Sprints:
  - **Sprint 1 (14/09 a 25/09):** Fundamentos, Prompting, Structured Outputs & RAG Local (Projeto: *AskData - Base de Conhecimento Inteligente*).
  - **Sprint 2 (28/09 a 09/10):** Agentes Autônomos, Tool Use & Model Context Protocol (Projeto: *DataOps Agent*).
  - **Sprint 3 (13/10 a 23/10):** Multimodalidade (Visão + Áudio) & Avaliação de LLMs (Projeto: *OmniAssistant*).
- Explicação da metodologia: Semana 1 (Conceito + Atividades diárias) e Semana 2 (Desenvolvimento do Projeto em Trio).
- Critérios de avaliação para scouting: curiosidade, colaboração em Git, qualidade de código e clareza no Pitch.

---

## 🛠️ 6. Bloco 4: Setup Prático do Ambiente (15:45 - 16:45)

Neste bloco, garantiremos que todas as máquinas estejam configuradas. O mentor circulará pela sala auxiliando alunos com Windows, macOS ou Linux.

### Checklist de Ferramentas Obrigatórias:

#### 1. Python 3.11+
- Verificar no terminal:
  ```bash
  python3 --version  # ou `python --version` no Windows
  ```
- Caso não possua: [Download Oficial do Python 3.11+](https://www.python.org/downloads/)

#### 2. VS Code & Extensões Essenciais
- [Download do Visual Studio Code](https://code.visualstudio.com/)
- Extensões recomendadas no VS Code:
  - `ms-python.python` (Suporte a Python)
  - `ms-python.vscode-pylance` (Tipagem e autocomplete)
  - `GitHub.copilot` (Assistente de código)

#### 3. GitHub Student Developer Pack (GitHub Copilot Gratuito)
- Estudantes universitários têm direito ao **GitHub Copilot 100% gratuito**:
  - [Link para solicitar o GitHub Student Pack](https://education.github.com/pack)
  - *Dica:* Utilizar o e-mail institucional `@edu.pucrs.br` para aprovação instantânea ou comprovação de matrícula.

#### 4. Criação do Ambiente Virtual (venv) do Grupo de Estudos
Cada aluno criará uma pasta no seu computador para os estudos da Sprint 1:

```bash
# 1. Criar e entrar na pasta de trabalho
mkdir -p ~/grupo_estudos_ia
cd ~/grupo_estudos_ia

# 2. Criar o ambiente virtual isolado
python3 -m venv .venv

# 3. Ativar o ambiente virtual
# No Linux/macOS:
source .venv/bin/activate
# No Windows (PowerShell):
# .venv\Scripts\Activate.ps1
# No Windows (CMD):
# .venv\Scripts\activate.bat

# 4. Atualizar o pip
pip install --upgrade pip
```

---

## 🧪 7. Bloco 5: Smoke Test & Fechamento (16:45 - 17:00)

Para validar que o ambiente Python está pronto, criar o arquivo de teste `smoke_test.py`:

```python
import sys
import platform

print("=" * 50)
print("🚀 Ambiente do Grupo de Estudos IA - Configurado com Sucesso!")
print(f"🐍 Versão do Python: {sys.version.split()[0]}")
print(f"💻 Sistema Operacional: {platform.system()} {platform.release()}")
print("=" * 50)
```

Executar no terminal com o venv ativado:
```bash
python smoke_test.py
```

### ✅ Critério de Conclusão do Dia 01:
- [x] Participação no coffee e alinhamento com a liderança.
- [x] Quebra-gelo realizado e conexão com os colegas de turma.
- [x] Python 3.11+, VS Code e ambiente virtual `.venv` ativos e testados com `smoke_test.py`.
- [x] Solicitação do GitHub Student Developer Pack enviada.

---

## 📚 Materiais de Apoio & Links Úteis
* [Guia do GitHub Student Developer Pack](https://docs.github.com/pt/education/explore-the-benefits-of-github-education/use-github-for-your-schoolwork/apply-for-a-student-developer-pack) — Documentação oficial para obter o Copilot gratuito.
* [Documentação do Python venv](https://docs.python.org/pt-br/3/library/venv.html) — Como criar e gerenciar ambientes virtuais.
* [Documentação do VS Code para Python](https://code.visualstudio.com/docs/python/python-tutorial) — Tutorial oficial do VS Code.
