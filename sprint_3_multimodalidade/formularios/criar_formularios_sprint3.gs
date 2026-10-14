/**
 * Grupo de Estudos IA — Sprint 3 (Multimodalidade)
 * Cria os 3 formulários de auto-avaliação & feedback e a planilha única de respostas.
 *
 * Como usar:
 *   1. Acesse https://script.google.com e clique em "Novo projeto".
 *   2. Cole este arquivo no editor e salve.
 *   3. Selecione a função `criarFormulariosSprint3` e clique em "Executar"
 *      (autorize o acesso ao Forms e Planilhas).
 *   4. Copie os IDs e links exibidos no "Registro de execução".
 *
 * A especificação das perguntas está em formularios/README.md.
 * Ao alterar perguntas, atualize este script E o README.
 */

const ESCALA_1_A_5 = ['1', '2', '3', '4', '5'];
const AJUDA_GRADE_1_A_5 = '1 = muito ruim · 5 = excelente';

const NIVEIS_CONHECIMENTO = [
  'Nunca vi',
  'Já ouvi falar',
  'Uso com ajuda',
  'Uso sozinho(a)',
  'Consigo ensinar',
];

// Idêntica no Dia 21 e no Dia 28 para medir o delta de evolução.
const TEMAS_CONHECIMENTO = [
  'Visão computacional com LLMs (envio via bytes e Pillow)',
  'Grounding visual e extração de Bounding Boxes',
  'Reconhecimento de fala local com OpenAI Whisper (Speech-to-Text)',
  'Espectrogramas Mel e alinhamento temporal de áudio',
  'Avaliação sistemática de LLMs (LLM-as-a-Judge)',
  'Métricas de Groundedness vs Precisão Factual',
  'Orquestração agêntica multimodal (Percepção -> Tools -> Resposta)',
  'Streamlit com mídia (upload de prints, player de áudio e explicabilidade XAI)',
  'Colaboração Git em squad (branches de features, code review e resolução de conflitos)',
];

const DIAS_FORMULARIO_DIARIO = [
  'Dia 22 — 15/10 (Qui) — Áudio e Speech-to-Text Local com Whisper',
  'Dia 23 — 16/10 (Sex) — Avaliação de LLMs e Formação Oficial dos Trios',
  'Dia 24 — 19/10 (Seg) — Kickoff do OmniAssistant, Arquitetura e Setup Git',
  'Dia 25 — 20/10 (Ter) — Pipeline Unificado de Ingestão Multimodal',
  'Dia 26 — 21/10 (Qua) — Orquestração de Ferramentas e Raciocínio Multimodal',
  'Dia 27 — 22/10 (Qui) — Interface Streamlit, Telemetria e Ensaio do Pitch',
];

function criarFormulariosSprint3() {
  const planilha = SpreadsheetApp.create('Grupo de Estudos IA — Sprint 3 — Respostas dos Formulários');

  const formularios = [
    { placeholders: ['{FORM_ID_DIA_21}'], form: criarFormularioDia21_() },
    {
      placeholders: ['{FORM_ID_DIA_22}', '{FORM_ID_DIA_23}', '{FORM_ID_DIA_24}',
                     '{FORM_ID_DIA_25}', '{FORM_ID_DIA_26}', '{FORM_ID_DIA_27}'],
      form: criarFormularioDiario_(),
    },
    { placeholders: ['{FORM_ID_DIA_28}'], form: criarFormularioDia28_() },
  ];

  formularios.forEach(({ form }) => {
    form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());
  });

  Logger.log('Planilha de respostas: ' + planilha.getUrl());
  formularios.forEach(({ placeholders, form }) => {
    Logger.log('---');
    Logger.log(form.getTitle());
    Logger.log('  ID (substitui ' + placeholders.join(', ') + '): ' + form.getId());
    Logger.log('  Link de resposta: https://docs.google.com/forms/d/' + form.getId() + '/viewform');
    Logger.log('  Link de edição:   ' + form.getEditUrl());
  });
}

// ---------------------------------------------------------------------------
// 1. Dia 21 — Expectativas & Auto-Avaliação Inicial
// ---------------------------------------------------------------------------
function criarFormularioDia21_() {
  const form = novoFormulario_(
    'Sprint 3 — Dia 21 — Expectativas & Auto-Avaliação Inicial',
    'Abertura da Sprint 3 (Multimodalidade: Visão + Áudio). Leva cerca de 15 minutos. ' +
    'Suas respostas ajudam a medir sua evolução até o Demo Day (Dia 28).'
  );

  secaoTitulo_(form, 'Identificação');
  textoCurto_(form, 'Nome completo', true);
  emailPucrs_(form);
  form.addMultipleChoiceItem()
    .setTitle('Curso')
    .setChoiceValues([
      'Ciência da Computação',
      'Engenharia de Software',
      'Engenharia de Computação',
      'Sistemas de Informação',
      'Outro',
    ])
    .setRequired(true);
  form.addListItem()
    .setTitle('Semestre atual')
    .setChoiceValues(['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º ou mais'])
    .setRequired(true);

  secao_(form, 'Ponto de Partida e Grade de Conhecimento Multimodal');
  gradeConhecimento_(form);

  secao_(form, 'Expectativas para a Sprint 3 e OmniAssistant');
  paragrafo_(form, 'O que você mais quer aprender ou ser capaz de construir ao final desta Sprint 3?', true);
  escala_(form, 'Quão confiante você está em acompanhar o ritmo e a integração de visão e áudio?',
    'Nada confiante', 'Muito confiante');
  paragrafo_(form, 'Quais lições aprendidas da Sprint 2 você quer aplicar no seu trio da Sprint 3?', true);
  paragrafo_(form, 'Você tem algum receio ou preocupação em relação a esta sprint?', false);

  secao_(form, 'Avaliação do Dia 21 (Abertura e Visão)');
  form.addCheckboxItem()
    .setTitle('Quais etapas você concluiu hoje no encontro?')
    .setChoiceValues([
      'Ambiente e chaves configurados',
      'Laboratório 1: Ingestão via bytes e PIL',
      'Laboratório 2: Bounding Boxes e OCR estruturado',
      'Desafio do Detetive de Diagramas',
      'Quiz e atividade interativa offline',
      'Não consegui concluir nenhuma etapa',
    ])
    .setRequired(true);
  escala_(form, 'Nota geral do encontro de hoje', 'Muito ruim', 'Excelente');
  paragrafo_(form, 'O que você achou mais interessante no dia de hoje?', true);
  paragrafo_(form, 'Algo ficou confuso ou te travou tecnicamente?', false);

  return form;
}

// ---------------------------------------------------------------------------
// 2. Dias 22 a 27 — Auto-Avaliação & Feedback Diário
// ---------------------------------------------------------------------------
function criarFormularioDiario_() {
  const form = novoFormulario_(
    'Sprint 3 — Dias 22 a 27 — Auto-Avaliação & Feedback Diário',
    'Preencha nos 15 minutos finais de cada encontro, selecionando o dia correspondente. ' +
    'O mesmo link vale para os Dias 22 a 27.'
  );

  secaoTitulo_(form, 'Identificação');
  textoCurto_(form, 'Nome completo', true);
  emailPucrs_(form);
  form.addListItem()
    .setTitle('Qual é o dia da Sprint?')
    .setChoiceValues(DIAS_FORMULARIO_DIARIO)
    .setRequired(true);
  textoCurto_(form, 'Nome da sua Squad / Domínio do OmniAssistant', false)
    .setHelpText('Preencha a partir do Dia 23.');

  secao_(form, 'Aprendizado do Dia');
  paragrafo_(form, 'O que você aprendeu de mais relevante no encontro de hoje?', true);
  paragrafo_(form, 'O que achou mais estimulante (playgrounds, labs ou desafios)?', true);
  paragrafo_(form, 'O que ainda ficou nebuloso ou precisa de reforço?', false);
  escala_(form, 'Quão seguro(a) você se sente para aplicar o conhecimento de hoje de forma autônoma?',
    'Nada seguro(a)', 'Muito seguro(a)');

  secao_(form, 'Auto-Avaliação e Atuação na Squad');
  form.addMultipleChoiceItem()
    .setTitle('Quanto das metas práticas do dia você concluiu?')
    .setChoiceValues(['Tudo', 'A maior parte', 'Uma parte', 'Não consegui avançar'])
    .setRequired(true);
  grade1a5_(form, 'Como você avalia sua atuação no encontro de hoje?', [
    'Foco e engajamento individual',
    'Colaboração na dupla ou trio (rotação de piloto/copiloto)',
    'Autonomia para investigar erros e debugar',
    'Sincronização de código e commits no GitHub',
  ]);
  form.addMultipleChoiceItem()
    .setTitle('O Git Sync da squad foi concluído hoje com sucesso?')
    .setChoiceValues(['Sim', 'Parcialmente', 'Não'])
    .setRequired(true);

  secao_(form, 'Avaliação do Encontro');
  escala_(form, 'Nota geral do encontro de hoje', 'Muito ruim', 'Excelente');
  grade1a5_(form, 'Avalie as etapas do dia', [
    'Daily Standup e Leitura de Referência / Playgrounds Web',
    'Laboratórios práticos guiados (scaffolds Python)',
    'Desafio colaborativo da squad',
    'Testes de resiliência e Git Sync',
    'Quiz e atividade interativa no navegador',
  ]);
  escala_(form, 'Nível de ritmo e tempo', 'Muito arrastado', 'Muito corrido')
    .setHelpText('1 = Muito arrastado · 3 = Ideal · 5 = Muito corrido');
  paragrafo_(form, 'Sugestões para os próximos encontros', false);

  return form;
}

// ---------------------------------------------------------------------------
// 3. Dia 28 — Avaliação Final da Sprint 3 e Encerramento Geral (90h)
// ---------------------------------------------------------------------------
function criarFormularioDia28_() {
  const form = novoFormulario_(
    'Sprint 3 — Dia 28 — Avaliação Final e Encerramento Geral (90h)',
    'Avaliação final da Sprint 3, do projeto OmniAssistant e retrospectiva global das 3 sprints. ' +
    'Leva cerca de 10 minutos.'
  );

  secaoTitulo_(form, 'Identificação');
  textoCurto_(form, 'Nome completo', true);
  emailPucrs_(form);
  textoCurto_(form, 'Nome da sua Squad / Projeto OmniAssistant', true);

  secao_(form, 'Sua Evolução Técnica (Grade Comparativa)');
  gradeConhecimento_(form);
  escala_(form, 'Suas expectativas para a Sprint 3 e para o OmniAssistant foram atendidas?',
    'Nada atendidas', 'Totalmente atendidas');
  paragrafo_(form, 'Qual foi o maior salto de maturidade técnica que você deu nesta sprint?', true);
  paragrafo_(form, 'Qual foi o seu maior aprendizado comportamental / trabalho em squad?', true);

  secao_(form, 'O Projeto OmniAssistant e a Apresentação no Demo Day');
  escala_(form, 'Como você avalia o resultado do produto apresentado pela sua squad?',
    'Muito ruim', 'Excelente');
  grade1a5_(form, 'Como foi o trabalho interno do trio durante a Semana 2?', [
    'Comunicação e alinhamento de escopo',
    'Divisão justa de tarefas e cooperação',
    'Resolução de conflitos técnicos e bugs de integração',
    'Ensaio e desempenho no pitch ao vivo',
  ]);
  paragrafo_(form, 'Qual foi o momento mais desafiador da construção do OmniAssistant e como superaram?', true);

  secao_(form, 'Avaliação Global do Programa de Formação (90 Horas / 3 Sprints)');
  escala_(form, 'Nota geral para o programa completo (Sprints 1, 2 e 3)', 'Muito ruim', 'Excelente');
  grade1a5_(form, 'Avalie os pilares metodológicos do programa', [
    'Metodologia autônoma (sem aulas expositivas passivas)',
    'Qualidade e clareza dos roteiros autodirigidos',
    'Desafios práticos e projetos cumulativos (AskData, DataOps Agent, OmniAssistant)',
    'Quizzes e atividades interativas de fixação',
    'Suporte e mentoria técnica',
    'Espaço físico e infraestrutura no Tecnopuc (Navi Hub)',
  ]);
  form.addScaleItem()
    .setTitle('De 0 a 10, o quanto você recomendaria este Grupo de Estudos a outros alunos da PUCRS?')
    .setBounds(0, 10)
    .setLabels('Não recomendaria', 'Recomendaria com certeza')
    .setRequired(true);
  paragrafo_(form, 'Mensagem final, agradecimentos ou conselhos para futuras turmas', false);

  return form;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function novoFormulario_(titulo, descricao) {
  const form = FormApp.create(titulo);
  form.setDescription(descricao);
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);
  // Contas mais novas criam formulários não publicados por padrão.
  try {
    form.setPublished(true);
  } catch (e) {
    Logger.log('Não foi possível publicar "' + titulo + '" automaticamente: ' + e);
  }
  return form;
}

// Título da primeira seção (a primeira página não aceita quebra de página).
function secaoTitulo_(form, titulo) {
  return form.addSectionHeaderItem().setTitle(titulo);
}

function secao_(form, titulo) {
  return form.addPageBreakItem().setTitle(titulo);
}

function textoCurto_(form, titulo, obrigatoria) {
  return form.addTextItem().setTitle(titulo).setRequired(obrigatoria);
}

function paragrafo_(form, titulo, obrigatoria) {
  return form.addParagraphTextItem().setTitle(titulo).setRequired(obrigatoria);
}

function emailPucrs_(form) {
  const validacao = FormApp.createTextValidation()
    .setHelpText('Use seu e-mail institucional (@edu.pucrs.br ou @pucrs.br).')
    .requireTextMatchesPattern('^[A-Za-z0-9._%+-]+@(edu\\.)?pucrs\\.br$')
    .build();
  return form.addTextItem()
    .setTitle('E-mail PUCRS')
    .setHelpText('Seu e-mail @edu.pucrs.br ou @pucrs.br — identifica você em todos os formulários.')
    .setValidation(validacao)
    .setRequired(true);
}

function escala_(form, titulo, rotuloMin, rotuloMax) {
  return form.addScaleItem()
    .setTitle(titulo)
    .setBounds(1, 5)
    .setLabels(rotuloMin, rotuloMax)
    .setRequired(true);
}

function grade1a5_(form, titulo, linhas) {
  return form.addGridItem()
    .setTitle(titulo)
    .setHelpText(AJUDA_GRADE_1_A_5)
    .setRows(linhas)
    .setColumns(ESCALA_1_A_5)
    .setRequired(true);
}

function gradeConhecimento_(form) {
  return form.addGridItem()
    .setTitle('Como você avalia seu conhecimento HOJE em cada tema?')
    .setRows(TEMAS_CONHECIMENTO)
    .setColumns(NIVEIS_CONHECIMENTO)
    .setRequired(true);
}
