# 📅 Dia 01 (14/09 - Segunda-feira)
# 🚀 Kickoff Oficial, Boas-Vindas & Setup do Ambiente

**Sprint 1:** Fundamentos de GenAI, Prompting, Structured Outputs & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Presença Especial:** Liderança da DataLakers & Coordenação do Navi Hub (Boas-Vindas e Abertura)

---

## 🎯 1. Objetivos do Encontro
1. Participar da recepção e abertura oficial da parceria entre **Navi Hub** e **DataLakers**, conhecendo o propósito do grupo de estudos e as oportunidades de captação de talentos (scouting).
2. Conectar-se com os outros 14 colegas de curso (Engenharia de Software e Sistemas de Informação da PUCRS) através da dinâmica de acolhimento.
3. Compreender a estrutura do programa (3 Sprints, 90 horas presenciais, entregas e Demo Days).
4. Realizar de forma autônoma o checklist de setup inicial do ambiente de desenvolvimento no notebook pessoal (Python 3.11+, VS Code, venv e GitHub Student Pack / Copilot).

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:45   │ Boas-Vindas, Coffee Break & Apresentação DataLakers     │
│ 14:45 - 15:15   │ Dinâmica de Integração: "O Prompt Humano"              │
│ 15:15 - 15:35   │ Leitura da Jornada: O que construiremos em 6 semanas?  │
│ 15:35 - 15:45   │ Intervalo Rápido                                       │
│ 15:45 - 16:45   │ Setup Autônomo do Ambiente (Python, Git, VS Code)      │
│ 16:45 - 17:00   │ Execução do Smoke Test & Auto-Avaliação                │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## ☕ 3. Bloco 1: Abertura & Boas-Vindas (14:00 - 14:45)
- **Coffee Break de Acolhimento:** Recepção no espaço do Navi Hub.
- **Abertura com a Liderança da DataLakers:**
  - Apresentação da empresa, projetos de dados e IA no mercado real.
  - O propósito do grupo de estudos: identificar talentos com alta capacidade de autonomia, curiosidade e colaboração técnica.
  - As expectativas da liderança para os Demo Days ao final de cada Sprint.

---

## 🤝 4. Bloco 2: Dinâmica de Integração — "O Prompt Humano" (14:45 - 15:15)
- **Formato:** Duplas autônomas (15 alunos -> 7 duplas + 1 trio).
- **Tempo:** 15 min de conversa em duplas + 15 min de apresentação para a turma.
- **Instruções:**
  1. Cada aluno entrevista seu colega de dupla estruturando um *System Prompt* pessoal:
     - **Role:** Semestre atual, curso e linguagem/tecnologia favorita.
     - **Context:** O que mais desperta curiosidade ou dúvida sobre Inteligência Artificial Generativa?
     - **Special Ability (Superpoder):** Uma habilidade não técnica ou hobby fora da faculdade.
  2. Ao final, cada participante apresenta sua dupla para a turma em 1 minuto.

---

## 🗺️ 5. Bloco 3: Visão Geral da Jornada (15:15 - 15:35)
Leia o [README Mestre do Projeto](../README.md) para compreender:
- A dinâmica das 3 Sprints (Fundamentos/RAG -> Agentes/MCP -> Multimodalidade).
- A metodologia: Semana 1 (Fundamentação, leitura de referência e desafios diários) e Semana 2 (Desenvolvimento do Projeto em Trio).
- O funcionamento autônomo dos encontros diários.

---

## 🛠️ 6. Bloco 4: Setup Autônomo do Ambiente (15:45 - 16:45)

Siga o checklist abaixo no seu notebook pessoal:

### Checklist de Ferramentas Obrigatórias:

#### 1. Python 3.11+
- Verifique no seu terminal:
  ```bash
  python3 --version  # ou `python --version` no Windows
  ```
- Caso precise instalar ou atualizar: [Download Oficial do Python 3.11+](https://www.python.org/downloads/)

#### 2. VS Code & Extensões Essenciais
- [Download do Visual Studio Code](https://code.visualstudio.com/)
- No menu de extensões (`Ctrl+Shift+X` / `Cmd+Shift+X`), instale:
  - `ms-python.python` (Python oficial da Microsoft)
  - `ms-python.vscode-pylance` (Tipagem estática e autocomplete)
  - `GitHub.copilot` (Assistente de código com IA)

#### 3. GitHub Student Developer Pack (GitHub Copilot Gratuito)
- Estudantes universitários têm direito ao **GitHub Copilot 100% gratuito**:
  - [Link oficial de solicitação: GitHub Student Pack](https://education.github.com/pack)
  - Utilize o seu e-mail institucional da universidade (`@edu.pucrs.br`).

#### 4. Criação do Ambiente Virtual (venv) de Estudos
Execute no terminal da sua máquina:

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

## 🧪 7. Bloco 5: Smoke Test & Auto-Avaliação (16:45 - 17:00)

Crie um arquivo de teste `smoke_test.py` na pasta do projeto:

```python
import sys
import platform

print("=" * 55)
print("🚀 Ambiente do Grupo de Estudos IA - Configurado com Sucesso!")
print(f"🐍 Versão do Python: {sys.version.split()[0]}")
print(f"💻 Sistema Operacional: {platform.system()} {platform.release()}")
print("=" * 55)
```

Execute no terminal com o venv ativado:
```bash
python smoke_test.py
```

### ✅ Checklist de Conclusão do Dia 01:
- [x] Participação na abertura e apresentação da DataLakers.
- [x] Dinâmica de integração concluída com a turma.
- [x] Python 3.11+, VS Code e ambiente virtual `.venv` ativos e validados com `smoke_test.py`.
- [x] Solicitação do GitHub Student Developer Pack enviada.

---

## 📚 Materiais de Apoio & Links Úteis
* [Guia do GitHub Student Developer Pack](https://docs.github.com/pt/education/explore-the-benefits-of-github-education/use-github-for-your-schoolwork/apply-for-a-student-developer-pack) — Documentação oficial para obter o Copilot gratuito.
* [Documentação do Python venv](https://docs.python.org/pt-br/3/library/venv.html) — Como criar e gerenciar ambientes virtuais.
* [Documentação do VS Code para Python](https://code.visualstudio.com/docs/python/python-tutorial) — Tutorial oficial do VS Code.
