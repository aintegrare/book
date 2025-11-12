/**
 * Script to update Chapter 4 with complete structured content
 * Processo Civil - 3 full exam questions
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const booksPath = join(__dirname, 'src', 'data', 'books.json');
const booksData = JSON.parse(readFileSync(booksPath, 'utf-8'));
const oabBook = booksData.find(book => book.code === 'OAB360');

console.log('🚀 Converting Chapter 4 (Processo Civil)...\n');

const chapter4Content = [
  {
    type: 'section',
    level: 2,
    number: '4.1',
    title: 'Questões Organizadas por Artigos do CPC',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Agora vamos ver o mesmo padrão aplicado ao Processo Civil.',
  },

  {
    type: 'paragraph',
    text: 'Observe como a FGV cobra diferentes artigos do MESMO CAPÍTULO sobre recursos.',
  },

  {
    type: 'box',
    variant: 'principle',
    content: 'SISTEMA RECURSAL: ARTIGOS 1.005 A 1.044',
  },

  {
    type: 'separator',
  },

  // Questão 1
  {
    type: 'question',
    exam: 'EXAME XXVIII',
    number: 'Q.52',
    text: 'As irmãs Odete e Nara celebraram contrato bancário, com cláusula de solidariedade, com uma pequena instituição financeira, com o objetivo de constituir uma empresa na cidade de Campos.\n\nDepois de sete anos, a instituição financeira, sem receber o valor que lhe era devido, propôs ação judicial em face das duas irmãs.\n\nOcorre que a empresa familiar teve suas atividades encerradas por má gestão e as irmãs, há alguns anos, não mais se falam e, por isso, contrataram advogados(as) de escritórios de advocacia distintos para realizar a defesa judicial.\n\nSobre a hipótese apresentada, assinale a afirmativa correta:',
    alternatives: [
      {
        letter: 'A',
        text: 'Caso o(a) advogado(a) de Nara perca o prazo do recurso de apelação, a alegação de prescrição no apelo interposto pelo advogado(a) de Odete, se acolhida, beneficiará Nara.',
      },
      {
        letter: 'B',
        text: 'O litisconsórcio formado pelas irmãs pode ser classificado como litisconsórcio passivo, necessário e unitário.',
      },
      {
        letter: 'C',
        text: 'Caberá à parte interessada alegar a prescrição, sendo vedado ao magistrado reconhecer a prescrição de ofício.',
      },
      {
        letter: 'D',
        text: 'Os prazos para as manifestações dos litisconsortes com advogados(as) de diferentes escritórios de advocacia serão contados em dobro, ainda quando os autos do processo forem eletrônicos.',
      },
    ],
    answer: 'A',
    article: 'Art. 1.005',
    law: 'Código de Processo Civil',
  },

  {
    type: 'separator',
  },

  // Questão 2
  {
    type: 'question',
    exam: 'EXAME XXX',
    number: 'Q.55',
    text: 'Cláudio, em face da execução por título extrajudicial que lhe moveu Daniel, ajuizou embargos à execução, os quais foram julgados improcedentes.\n\nO advogado de Cláudio, inconformado, interpõe recurso de apelação. Uma semana após a interposição do referido recurso, o advogado de Daniel requer a penhora de um automóvel pertencente a Cláudio.\n\nDiante do caso concreto e considerando que o juízo não concedeu efeito suspensivo aos embargos, assinale a afirmativa correta:',
    alternatives: [
      {
        letter: 'A',
        text: 'A penhora foi indevida, tendo em vista que os embargos à execução possuem efeito suspensivo decorrente de lei.',
      },
      {
        letter: 'B',
        text: 'O recurso de apelação interposto por Cláudio é dotado de efeito suspensivo por força de lei, tornando a penhora incorreta.',
      },
      {
        letter: 'C',
        text: 'A apelação interposta em face de sentença que julga improcedentes os embargos à execução é dotada de efeito meramente devolutivo, o que não impede a prática de atos de constrição patrimonial, tal como a penhora.',
      },
      {
        letter: 'D',
        text: 'O recurso de apelação não deve ser conhecido, pois o pronunciamento judicial que julga os embargos do executado tem natureza jurídica de decisão interlocutória, devendo ser impugnada por meio de agravo de instrumento.',
      },
    ],
    answer: 'C',
    article: 'Art. 1.012, caput, §1º, III',
    law: 'Código de Processo Civil',
  },

  {
    type: 'separator',
  },

  // Questão 3
  {
    type: 'question',
    exam: 'EXAME XXXIII',
    number: 'Q.53',
    text: 'Após anos de relacionamento conjugal, Adriana e Marcelo resolvem se divorciar.\n\nDiante da recusa do cônjuge ao pagamento de alimentos, Adriana, desempregada, resolve ingressar com ação a fim de exigir o pagamento.\n\nA ação teve regular processamento, tendo o juiz proferido sentença de procedência, condenando o réu ao pagamento de R$ 2.000,00 (dois mil reais) mensais à autora, sendo publicada no dia seguinte.\n\nInconformado, o réu interpõe recurso de apelação, mas Adriana promove, imediatamente, o cumprimento provisório da decisão.\n\nDiante das informações expostas, assinale a afirmativa correta:',
    alternatives: [
      {
        letter: 'A',
        text: 'A sentença não pode ser executada neste momento, pois o recurso de apelação possui efeito suspensivo.',
      },
      {
        letter: 'B',
        text: 'A sentença não pode ser executada, uma vez que a sentença declaratória não permite a execução provisória.',
      },
      {
        letter: 'C',
        text: 'Poderá ser iniciada a execução provisória, pois a sentença que condena a pagar alimentos começa a produzir efeitos imediatamente após a sua publicação.',
      },
      {
        letter: 'D',
        text: 'Pode ser iniciada execução provisória, pois os recursos de apelação nunca possuem efeito suspensivo.',
      },
    ],
    answer: 'C',
    article: 'Art. 1.012, II',
    law: 'Código de Processo Civil',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '4.2',
    title: 'O Padrão Se Repete',
  },

  {
    type: 'box',
    variant: 'diagnosis',
    title: 'Análise do Padrão de Cobrança',
    content: '▸ Todas essas questões cobram artigos do CAPÍTULO sobre recursos (Arts. 1.005 a 1.044)\n\n▸ Quem estuda "apelação" sem entender o sistema recursal completo ERRA\n\n▸ Quem domina o CAPÍTULO inteiro consegue resolver questões sobre qualquer tipo de recurso',
  },
];

const chapter4 = oabBook.chapters.find(ch => ch.number === 4);
if (chapter4) {
  chapter4.content = chapter4Content;
  console.log('✅ Chapter 4 updated successfully');
  console.log(`   Content blocks: ${chapter4Content.length}`);
  console.log(`   Includes: 3 complete exam questions\n`);
}

writeFileSync(booksPath, JSON.stringify(booksData, null, 2), 'utf-8');
console.log('✅ Chapter 4 conversion complete!');
