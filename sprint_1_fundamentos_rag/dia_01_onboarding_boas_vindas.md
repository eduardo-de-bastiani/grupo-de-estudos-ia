# 📅 Dia 01 (14/09 - Segunda-feira)
# 🚀 Kickoff Oficial, Apresentações & Setup do Ambiente

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial (Navi Hub / Tecnopuc)  
**Presença Especial:** Liderança Técnica e Gestores da DataLakers & Coordenação do Navi Hub  

---

## 🎯 1. Objetivos do Encontro
1. Participar da recepção e abertura oficial da parceria entre **Navi Hub** e **DataLakers**, conhecendo o propósito do grupo de estudos e as oportunidades de captação de talentos.
2. Conectar-se com os outros colegas da computação através da dinâmica de apresentação em duplas.
3. Compreender a estrutura do programa (3 Sprints de 2 semanas, 90 horas presenciais e Demo Days).
4. Criar um **repositório pessoal no GitHub** para centralizar todos os códigos, anotações e laboratórios desenvolvidos ao longo do grupo de estudos.
5. Realizar o checklist de setup do ambiente no notebook pessoal (Python 3.11+, VS Code, ambiente virtual `.venv` e validação com `smoke_test.py`).
6. Seguir o tutorial de ativação do **GitHub Copilot Estudantil Gratuito** via e-mail acadêmico da PUCRS (`@pucrs.br`).
7. Preencher o **Formulário Diário de Auto-Avaliação e Feedback** nos 15 minutos finais.

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 15:00   │ Apresentação do Grupo de Estudos, NAVI e DataLakers    │
│ 15:00 - 15:30   │ Coffee de Boas-Vindas Patrocinado pela DataLakers      │
│ 15:30 - 16:00   │ Dinâmica de Apresentação em Duplas (Apresentando o Par) │
│ 16:00 - 16:45   │ Setup do Ambiente, Repositório GitHub & Copilot        │
│ 16:45 - 17:00   │ Formulário de Auto-Avaliação & Feedback                │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🎤 3. Bloco 1: Apresentação do Grupo de Estudos, NAVI e DataLakers (14:00 - 15:00)

- **Boas-Vindas:** Recepção oficial na sala do Navi Hub no Tecnopuc.
- **Parceria DataLakers & NAVI:**
  - Como o grupo de estudos foi estruturado: autonomia, colaboração entre pares, pesquisa técnica e desafios práticos.
  - Apresentação da DataLakers.
- **Scouting de Talentos:** A empresa acompanhará de perto a evolução dos estudantes ao longo das 6 semanas, visando oportunidades de estágio.
- **Visão Geral da Jornada:**
  - **Sprint 1 (14/09 a 25/09):** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local.
  - **Sprint 2 (28/09 a 09/10):** Agentes Autônomos, Function/Tool Calling & Model Context Protocol (MCP).
  - **Sprint 3 (13/10 a 23/10):** Multimodalidade (Visão + Áudio) e Produtos de IA Generativa.
  - Os 3 **Demo Days** presenciais com bancas avaliadoras.

---

## ☕ 4. Bloco 2: Coffee de Boas-Vindas (15:00 - 15:30)

Momento de integração e descontração oferecido pela DataLakers!

---

## 🤝 5. Bloco 3: Dinâmica de Apresentação em Duplas (15:30 - 16:00)

Momento para a turma se conectar e quebrar o gelo através de apresentações cruzadas:

* **15:30 - 15:45 (15 min) — Perguntas em Duplas:**
  * Os alunos se organizam em duplas.
  * Durante os 15 minutos iniciais, os colegas fazem perguntas uns para os outros para se conhecerem melhor:
    1. **Identificação:** Nome, curso e semestre na PUCRS.
    2. **Stack & Experiência:** Quais tecnologias, linguagens ou ferramentas já teve contato ou mais curte usar.
    3. **Expectativa com IA:** O que mais quer aprender ou construir durante o grupo de estudos.
    4. **Curiosidade:** Um hobby, interesse pessoal ou fato curioso fora da computação.
* **15:45 - 16:00 (15 min) — Apresentação do Colega para a Turma:**
  * Cada aluno apresenta seu colega para a turma (cerca de 1 minuto por pessoa), compartilhando o que descobriu sobre ele.

---

## 🛠️ 6. Bloco 4: Setup do Ambiente, Repositório GitHub & Copilot (16:00 - 16:45)

Neste bloco de 45 minutos, cada aluno preparará seu computador pessoal para todo o programa.

### Passo 1: Criação do Repositório Pessoal no GitHub
Para organizar seus códigos e scripts individuais das Sprints, crie um repositório próprio:
1. Acesse sua conta no [GitHub](https://github.com/) e clique em **"New repository"**.
3. Marque a opção **"Add a .gitignore"** e selecione o template **Python**.
4. Clone o repositório no seu computador através do terminal:
   ```bash
   git clone https://github.com/SEU_USUARIO/grupo-de-estudos-ia-pucrs.git
   cd grupo-de-estudos-ia-pucrs
   ```

---

### Passo 2: Configuração de Python e Ambiente Virtual (`.venv`)
1. **Verifique a versão do Python:**
   ```bash
   python3 --version  # ou `python --version` no Windows
   ```
   *Requisito:* Python 3.11 ou superior instalado. Se necessário, baixe em: [python.org/downloads](https://www.python.org/downloads/).

2. **Crie e ative o ambiente virtual dentro da pasta do repositório:**
   ```bash
   # Criar o ambiente virtual isolado
   python3 -m venv .venv

   # Ativar no Linux/macOS:
   source .venv/bin/activate

   # Ativar no Windows (GitBash):
   source .venv/Scripts/activate
   ```

3. **Atualize o gerenciador de pacotes pip:**
   ```bash
   pip install --upgrade pip
   ```

---

### Passo 3: VS Code e Extensões Essenciais
Abra o repositório no Visual Studio Code (`code .`) e instale as seguintes extensões pelo marketplace (`Ctrl+Shift+X`):
* `ms-python.python` (Suporte oficial à linguagem Python)
* `ms-python.vscode-pylance` (Análise estática de código e autocompletion)
* `GitHub.copilot` (Extensão oficial do GitHub Copilot)

---

### Passo 4: Tutorial de Ativação do GitHub Copilot Estudantil Gratuito

Estudantes da PUCRS possuem direito ao **GitHub Copilot 100% gratuito** através do programa **GitHub Student Developer Pack**, utilizando a conta institucional universitária:

```
┌────────────────────────────────────────────────────────────────────────┐
│  PASSO A PASSO PARA ATIVAÇÃO DO GITHUB COPILOT GRATUITO               │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Acesse o portal: https://education.github.com/benefits?type=student │
│ 2. Faça login na sua conta pessoal do GitHub.                          │
│ 3. Adicione o e-mail da PUCRS (@pucrs.br) à sua conta:                │
│    - Acesse: https://github.com/settings/emails                        │
│    - Digite seu e-mail institucional e confirme o link de verificação │
│      recebido na caixa de entrada do Outlook da universidade.          │
│ 4. No portal GitHub Education, selecione seu e-mail @pucrs.br.         │
│ 5. Indique a instituição: Pontifícia Universidade Católica do RS       │
│ 6. Envie o comprovante acadêmico (atestado de matrícula PUCRS em PDF   │
│    ou foto da carteira estudantil digital).                            │
│ 7. Aguarde a confirmação de aprovação do Pack no seu e-mail.           │
│ 8. Com o benefício ativo, vá em: https://github.com/settings/copilot   │
│    e ative o acesso gratuito ao GitHub Copilot Individual.             │
│ 9. No VS Code, clique no ícone de perfil (canto inferior esquerdo),    │
│    faça login com a sua conta GitHub e autorize a extensão.            │
└────────────────────────────────────────────────────────────────────────┘
```

*Links Úteis de Referência:*
* 📄 [Portal Oficial: GitHub Student Developer Pack](https://education.github.com/pack)
* 📄 [Documentação: Como se inscrever no GitHub Education](https://docs.github.com/pt/education/explore-the-benefits-of-github-education/use-github-for-your-schoolwork/apply-for-a-student-developer-pack)

---

### Passo 5: Smoke Test do Ambiente
Crie o arquivo `smoke_test.py` na raiz do repositório para testar a saúde do ambiente:

```python
import sys
import platform

print("=" * 55)
print("Ambiente do Grupo de Estudos IA - Configurado com Sucesso!")
print(f"Versao do Python: {sys.version.split()[0]}")
print(f"Sistema Operacional: {platform.system()} {platform.release()}")
print("=" * 55)

```

Execute no terminal com o `.venv` ativado:
```bash
python smoke_test.py
```

---

## 📝 7. Bloco 5: Formulário Diário de Auto-Avaliação & Feedback (16:45 - 17:00)

Todos os encontros do grupo de estudos reservam os **15 minutos finais** para que cada estudante realize sua auto-avaliação individual e compartilhe seu feedback sobre o encontro do dia.


> 📋 **Link do Formulário de Auto-Avaliação:**  
> [Preencher Formulário do Google Forms - Dia 01](https://forms.gle/aaaaaaaaaa)

---
