# 📅 Dia 02 (15/09 - Terça-feira)
# 🧪 Explorando o Google AI Studio: Playground, Ferramentas, Parâmetros & Compare Mode

**Sprint 1:** Fundamentos de GenAI, Google AI Studio, Prompting & RAG Local  
**Horário:** 14:00 às 17:00 (3 horas) | **Formato:** Presencial Autônomo (Navi Hub / Tecnopuc)  
**Semana 1:** Imersão e Experimentação com Modelos de Linguagem  

---

## 🎯 1. Objetivos do Encontro
1. Criar a chave de API gratuita (`GEMINI_API_KEY`) no **Google AI Studio** e dominar a navegação do portal de desenvolvedores.
2. Explorar os modos de interação da plataforma: **Chat Prompt**, **Freeform Prompt** e configuração de **System Instructions**.
3. Compreender a fundo e testar empiricamente os parâmetros de geração:
   - **Temperature:** Determinismo vs. Criatividade.
   - **Top-P (Nucleus Sampling) & Top-K:** Controle estatístico do conjunto de tokens candidatos.
   - **Output Length (Max Output Tokens):** Teto máximo de tokens na resposta gerada.
   - **Thinking Level / Budget:** Capacidade de raciocínio passo a passo interno em modelos com suporte a pensamento.
4. Explorar e testar as ferramentas nativas (**Tools**) do Google AI Studio:
   - **Structured Output:** Definição visual de JSON Schemas sem quebrar formato.
   - **Code Execution:** Sandbox Python integrada para cálculos matemáticos e manipulação exata de dados.
   - **Grounding with Google Search:** Ancoragem de respostas na busca web em tempo real com citação de links.
   - **Grounding with Google Maps:** Conexão com dados geográficos e estabelecimentos.
   - **URL Context:** Leitura, extração e análise direta de links e páginas web.
5. Ajustar e analisar os limites de moderação em **Safety Settings** (avaliação de filtros de ódio, assédio e conteúdo perigoso).
6. Utilizar o **Compare Mode** para testar lado a lado diferentes modelos (Gemini Flash vs. Gemini Pro) e diferentes hiperparâmetros com o mesmo prompt.
7. Utilizar o recurso **"Get Code"** para exportar qualquer teste do Studio diretamente para código Python com o SDK oficial (`google-genai`).

---

## ⏰ 2. Cronograma Minuto a Minuto

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ 14:00 - 14:20   │ Leitura Padronizada de Referência (Google AI Studio)   │
│ 14:20 - 14:50   │ Bloco 1: Acesso ao AI Studio, API Key & Modos de Prompt│
│ 14:50 - 15:30   │ Bloco 2: Laboratório Prático de Hiperparâmetros        │
│ 15:30 - 15:45   │ Coffee Break & Networking                              │
│ 15:45 - 16:25   │ Bloco 3: Ferramentas Nativas (Tools) & Grounding       │
│ 16:25 - 16:45   │ Bloco 4: Safety Settings, Compare Mode & "Get Code"    │
│ 16:45 - 17:00   │ Bloco 5: Checklist do Dia & Alinhamento para Python    │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📖 3. Leitura Padronizada de Referência (14:00 - 14:20)

Antes de iniciar os testes práticos, cada aluno deve ler os seguintes guias oficiais:

1. 📄 [Google AI Docs: Google AI Studio Quickstart](https://ai.google.dev/gemini-api/docs/ai-studio-quickstart) — *Visão geral da interface, tipos de prompt e criação de API Keys.*
2. 📄 [Google AI Docs: Conceitos de Parâmetros e Prompting](https://ai.google.dev/gemini-api/docs/prompting-intro) — *O papel da Temperatura, Top-P, Top-K e System Instructions na inferência.*
3. 📄 [Google AI Docs: Grounding with Google Search](https://ai.google.dev/gemini-api/docs/grounding) — *Como o Grounding conecta o modelo à web para trazer fatos atualizados e mitigar alucinações.*

---

## 🖥️ 4. Bloco 1: Acesso ao AI Studio, API Key & Modos de Prompt (14:20 - 14:50)

### 1. Acessando o Google AI Studio
1. Acesse: [https://aistudio.google.com/](https://aistudio.google.com/)
2. Faça login com sua conta Google institucional da PUCRS ou pessoal.
3. Aceite os termos de serviço para desenvolvedores.

### 2. Gerando sua Chave de API (`GEMINI_API_KEY`)
1. No canto superior esquerdo ou no menu lateral, clique em **"Get API key"**.
2. Clique em **"Create API key"**.
3. Selecione o projeto padrão ou crie um novo projeto no Google Cloud (não requer cartão de crédito).
4. Copie a chave gerada e guarde-a em local seguro temporário (amanhã iremos usá-la no arquivo `.env` para codificar em Python).

> ⚠️ **Atenção:** Nunca compartilhe sua API Key em repositórios públicos do GitHub ou em mensagens abertas.

### 3. Conhecendo os Modos de Prompt
No menu superior esquerdo, explore as opções de criação:
* **Chat Prompt:** Interface conversacional com turnos alternados entre *User* e *Model*. Ideal para testar fluxos de assistentes e personas.
* **Freeform Prompt:** Tela aberta de completamento de texto. Permite inserir instruções, exemplos (*few-shot*) e testar geração sem formatação rígida de chat.
* **System Instructions (Instrução de Sistema):** Campo dedicado no topo da tela. Define o comportamento base, papel, restrições e regras inquebráveis do modelo antes mesmo de qualquer mensagem do usuário.

#### Exercício Prático 1: Testando System Instructions
1. Abra um **Chat Prompt**.
2. No campo **System Instructions**, insira:
   ```text
   Você é um revisor de código sênior da DataLakers.
   Sua única função é identificar potenciais bugs e problemas de performance em código Python.
   Responda sempre em exatamente três tópicos numerados, de forma técnica e direta.
   ```
3. No campo de mensagem do usuário, envie:
   ```text
   def buscar_item(lista, alvo):
       for i in range(len(lista)):
           if lista[i] == alvo:
               return True
       return False
   ```
4. Observe se o modelo obedeceu rigorosamente ao tom, formato e número de tópicos estabelecidos na instrução de sistema.

---

## 🎛️ 5. Bloco 2: Laboratório Prático de Hiperparâmetros (14:50 - 15:30)

No painel lateral direito (**Run Settings**), você encontra os parâmetros que governam a distribuição estatística de geração de texto da LLM.

### 1. O que significa cada parâmetro?

| Parâmetro | O que faz? | Quando usar valor BAIXO? | Quando usar valor ALTO? |
| :--- | :--- | :--- | :--- |
| **Temperature** (0.0 a 2.0) | Controla o grau de aleatoriedade na escolha do próximo token. | `0.0 - 0.2`: Extração de dados, código, cálculos, fatos precisos (determinístico). | `0.8 - 1.5`: Escrita criativa, ideação, brainstorm, histórias. |
| **Top-P** (Nucleus Sampling, 0.0 a 1.0) | Soma as probabilidades dos tokens mais prováveis até atingir $P$. O modelo só escolhe dentre esse "núcleo". | `0.1 - 0.5`: Restringe a escolha apenas às opções estatisticamente seguras. | `0.9 - 1.0`: Permite que tokens menos prováveis tenham chance de serem sorteados. |
| **Top-K** (1 a 40) | Limita a escolha aos $K$ tokens mais prováveis a cada passo, descartando todo o resto. | `1`: O modelo escolhe sempre o token número 1 (praticamente determinístico). | `40`: Maior variedade e vocabulário aberto. |
| **Output Length** (Max Tokens) | Define o número máximo de tokens que o modelo pode gerar na resposta. | Reduzido para evitar respostas excessivamente longas e economizar latência. | Elevado para textos longos, artigos ou blocos extensos de código. |
| **Thinking Level / Budget** | Disponível na família Gemini com raciocínio (ex: *Gemini 2.5 Flash / Thinking*). Permite ao modelo gerar tokens internos de reflexão ("thought") antes da resposta final. | Desativado/baixo para tarefas simples e rápidas (reduz latência). | Elevado para problemas matemáticos complexos, enigmas lógicos e depuração profunda de algoritmos. |

---

### 2. Experimentos em Duplas

#### Experimento A: O Impacto da Temperatura
1. Configure o modelo para **Gemini Flash**.
2. Defina o prompt:
   ```text
   Complete a frase com uma metáfora poética e original: "Um banco de dados vetorial é como..."
   ```
3. Teste com **Temperature = 0.0**. Clique em "Run" 3 vezes consecutivas. As respostas mudaram?
4. Teste com **Temperature = 1.0**. Clique em "Run" 3 vezes. Como variou o vocabulário?
5. Teste com **Temperature = 1.8**. O texto continuou coerente ou começou a apresentar combinações bizarras de palavras?

#### Experimento B: O Efeito do Top-K = 1
1. Mantenha a **Temperature = 1.0** (alta aleatoriedade).
2. Ajuste o **Top-K = 1**.
3. Execute o mesmo prompt 3 vezes.
4. **Discussão em dupla:** Por que, mesmo com a temperatura alta, as respostas ficaram idênticas? *(Resposta: porque com Top-K=1, só existe 1 candidato elegível a cada passo, anulando a aleatoriedade da temperatura).*

#### Experimento C: Testando o Thinking Level (Raciocínio Interno)
1. No seletor de modelos, escolha um modelo que suporte *Thinking* (ex: *Gemini 2.5 Flash* com Thinking ativado ou *Gemini 2.0 Flash Thinking*).
2. Envie o seguinte enigma lógico:
   ```text
   Um fazendeiro precisa atravessar um rio com um lobo, uma cabra e um repolho.
   O barco só comporta o fazendeiro e mais um item.
   Se o lobo ficar sozinho com a cabra, ele a come.
   Se a cabra ficar sozinha com o repolho, ela o come.
   Como o fazendeiro transporta todos em segurança para a outra margem?
   ```
3. Observe a seção expansível de **Thoughts** (pensamentos): veja como o modelo planeja cada viagem mentalmente, avalia restrições e corrige inconsistências antes de emitir a resposta definitiva.

---

## 🛠️ 6. Bloco 3: Ferramentas Nativas (Tools) & Grounding (15:45 - 16:25)

No Google AI Studio, as LLMs podem ir além do texto estático ativando **Tools** no painel lateral direito.

### 1. Grounding with Google Search (Busca Web em Tempo Real)
* **O Problema:** Todo modelo pré-treinado tem uma data de corte de conhecimento (*knowledge cutoff*). Se perguntarmos sobre notícias de hoje, ele alucina ou recusa.
* **A Solução:** Ative a opção **"Google Search"** em Tools.
* **Teste Prático:**
  1. Com a busca desligada, pergunte: `"Quem ganhou o último jogo do Grêmio ou Internacional ontem?"` ou `"Qual é a versão mais recente do Python lançada neste mês?"`.
  2. Agora **ative o Google Search** e refaça a pergunta.
  3. Note como o modelo inclui trechos da web e **citações com links diretos** para as fontes consultadas.

### 2. Code Execution (Execução de Código em Sandbox)
* **O Problema:** LLMs são modelos estatísticos preditores de palavras; elas erram contas matemáticas simples com frequência (ex: multiplicar dois números de 8 dígitos).
* **A Solução:** Ative a opção **"Code Execution"**.
* **Teste Prático:**
  1. Envie: `"Calcule o produto de 84938291 multiplicado por 72918471 e me mostre o resultado exato."`
  2. Observe a resposta: o Gemini escreve um script Python em tempo real, executa-o na nuvem segura do Google e utiliza a saída do terminal Python para responder com 100% de precisão matemática.

### 3. Structured Output no AI Studio (Modo JSON com Schema Visual)
* No painel de configurações, localize a seção **"Structured output"**.
* Marque a opção e defina um Schema JSON simples:
  ```json
  {
    "type": "object",
    "properties": {
      "nome_aluno": {"type": "string"},
      "curso": {"type": "string"},
      "semestre": {"type": "integer"},
      "tecnologias_dominadas": {
        "type": "array",
        "items": {"type": "string"}
      }
    },
    "required": ["nome_aluno", "curso", "semestre", "tecnologias_dominadas"]
  }
  ```
* Envie um texto informal: `"Oi, sou a Mariana, faço o quarto semestre de Engenharia de Software na PUCRS e manjo bastante de Python, Docker e PostgreSQL."`
* Note como a resposta sai **estritamente em JSON puro**, sem introduções como `"Aqui está seu JSON"`, perfeitamente parseável por sistemas.

### 4. URL Context & Multimodalidade
* No campo de prompt, adicione uma URL pública de documentação técnica ou anexe um arquivo PDF/imagem pelo botão de anexo (**+**).
* Peça para o modelo resumir o conteúdo do link ou extrair tabelas do PDF.

---

## ⚖️ 7. Bloco 4: Safety Settings, Compare Mode & "Get Code" (16:25 - 16:45)

### 1. Safety Settings (Configurações de Segurança)
* Abra a aba **"Safety settings"** no painel direito.
* Examine as quatro categorias de risco monitoradas:
  * *Harassment* (Assédio)
  * *Hate Speech* (Discurso de Ódio)
  * *Sexually Explicit* (Conteúdo Sexualmente Explícito)
  * *Dangerous Content* (Conteúdo Perigoso / Instruções Danosas)
* Cada categoria pode ser ajustada entre *Block none*, *Block few*, *Block some* e *Block most*.
* **Reflexão Técnica:** Em aplicações corporativas de atendimento a clientes (B2C), filtros mais estritos evitam incidentes de marca; já em ferramentas de análise de logs de segurança (SIEM) ou análise médica, filtros excessivamente estritos podem gerar falsos positivos bloqueando análises legítimas de vulnerabilidades.

### 2. Compare Mode (Comparação Lado a Lado)
1. No topo da tela do Studio, clique no botão **"Compare"** (ícone com duas janelas divididas).
2. O Google AI Studio divide a tela em duas colunas:
   * **Coluna da Esquerda:** Modelo A (ex: *Gemini 3.8 Flash* com Temperature 0.1).
   * **Coluna da Direita:** Modelo B (ex: *Gemini 2.5 Pro* com Temperature 0.1, ou o mesmo modelo com Temperature 1.0).
3. Digite um prompt de desafio lógico ou de geração de código e clique em executar.
4. Compare lado a lado:
   * Tempo de resposta e latência.
   * Profundidade da argumentação técnica.
   * Formatação e precisão sintática.

### 3. A Ponte para o Código: O Botão "Get Code"
1. Depois de montar qualquer prompt no Studio (com System Instructions, Temperatura ajustada, Tools ativadas ou Structured Output), olhe no canto superior direito da tela.
2. Clique no botão **"Get Code"**.
3. Selecione a aba **Python**.
4. Veja como o Google AI Studio gera automaticamente o código Python completo utilizando o SDK oficial `google-genai` com todos os parâmetros que você configurou visualmente!

```python
# Exemplo do que o botão 'Get Code' gera para você:
import os
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Seu prompt testado no Studio",
    config=types.GenerateContentConfig(
        temperature=0.2,
        top_p=0.95,
        top_k=20,
    ),
)
print(response.text)

# Dica de Engenharia: Se algo nao funcionar de primeira, leia o traceback e debugar faz parte do projeto!
```

---

## 🏁 8. Bloco 5: Checklist do Dia & Preparação para Python (16:45 - 17:00)

Dediquem os 15 minutos finais para garantir que todos os alunos possuem suas credenciais prontas para o Dia 03:
- Sua `GEMINI_API_KEY` está gerada e testada no Google AI Studio?
- Você experimentou a diferença entre Temperatura 0.0 e 1.5?
- Você testou o Compare Mode e viu como o "Get Code" exporta scripts Python?

> 📌 **Próximo Encontro (Dia 03):** Sairemos do navegador e colocaremos as mãos no código! Vamos construir nossos primeiros scripts em Python com o SDK oficial da Google, investigar como as LLMs contam tokens e validar nossos testes direto no terminal.

### ✅ Checklist de Conclusão do Dia 02:
- [x] Login no Google AI Studio realizado e `GEMINI_API_KEY` gerada com sucesso.
- [x] Testes de System Instructions realizados no Chat Prompt.
- [x] Experimentos práticos com Temperature, Top-P, Top-K e Thinking Level concluídos.
- [x] Ferramentas nativas (Search Grounding, Code Execution e Structured Output) testadas no Studio.
- [x] Compare Mode experimentado com dois modelos ou hiperparâmetros lado a lado.
- [x] Recurso "Get Code" visualizado e compreendido.
