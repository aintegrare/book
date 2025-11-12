/**
 * Script to update Chapter 1 with structured content
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import structured content for Chapter 1
const chapter1Content = [
  // Section 1.1
  {
    type: 'section',
    level: 2,
    number: '1.1',
    title: 'Você Não Precisa de Mais Conteúdo',
  },
  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Se você está se preparando para a primeira fase da OAB, provavelmente já passou por este ciclo:',
  },
  {
    type: 'list',
    listType: 'bullet',
    items: [
      'Comprou mais de um curso preparatório',
      'Baixou dezenas de PDFs de resumos',
      'Salvou centenas de posts no Instagram sobre "dicas de aprovação"',
      'Tentou assistir videoaulas de 3 horas sobre cada disciplina',
      'Acumulou material de estudo que levaria anos para revisar',
    ],
  },
  {
    type: 'paragraph',
    text: 'E ainda assim, ao abrir uma prova da FGV, você sente aquela pontada:',
  },
  {
    type: 'callout',
    variant: 'quote',
    content: 'Eu estudei isso... mas não lembro direito.\nVi esse assunto, mas não sei aplicar.\nParece que nunca é suficiente.',
  },
  {
    type: 'box',
    variant: 'diagnosis',
    title: 'Diagnóstico',
    content: 'O problema não é falta de conteúdo.\nÉ excesso dele.',
  },
  {
    type: 'paragraph',
    text: 'Você não precisa de mais PDFs. Você precisa de CLAREZA.\nVocê não precisa de mais aulas. Você precisa de FOCO.\nVocê não precisa de mais resumos. Você precisa de MÉTODO.',
  },
  {
    type: 'separator',
  },
  // Section 1.2
  {
    type: 'section',
    level: 2,
    number: '1.2',
    title: 'A Ilusão do "Estudar Tudo"',
  },
  {
    type: 'section',
    level: 3,
    title: 'Panorama da 1ª Fase da OAB',
  },
  {
    type: 'list',
    listType: 'bullet',
    items: [
      '17 disciplinas',
      'Dezenas (às vezes centenas) de artigos de lei por disciplina',
      'Bancas de cursinhos que te convencem: "você precisa dominar tudo"',
    ],
  },
  {
    type: 'callout',
    variant: 'important',
    content: 'VERDADE INCONVENIENTE:\n\nVocê nunca vai conseguir estudar tudo com profundidade.\nE não precisa.',
  },
  {
    type: 'section',
    level: 3,
    title: 'O Que a FGV Realmente Cobra',
  },
  {
    type: 'paragraph',
    text: 'A FGV não cobra "tudo".',
  },
  {
    type: 'list',
    listType: 'check',
    items: [
      'Ela cobra PADRÕES',
      'Ela cobra ESTRUTURAS',
      'Ela cobra RACIOCÍNIO APLICADO a situações práticas',
    ],
  },
  {
    type: 'paragraph',
    text: 'E ela faz isso de uma forma específica, organizada e previsível:',
  },
  {
    type: 'box',
    variant: 'principle',
    content: 'POR CAPÍTULOS DE LEI',
  },
  {
    type: 'section',
    level: 3,
    title: 'Quando Você Alinha Seu Estudo à Lógica da Banca',
  },
  {
    type: 'paragraph',
    text: 'Quando você organiza seu estudo da mesma forma que a banca organiza a prova, algo transformador acontece:',
  },
  {
    type: 'list',
    listType: 'bullet',
    items: [
      'Você estuda MENOS TEMPO',
      'Retém MAIS INFORMAÇÃO',
      'Identifica PADRÕES DE COBRANÇA',
      'Desenvolve RACIOCÍNIO JURÍDICO (não apenas memorização)',
      'Sente CONFIANÇA REAL ao abrir a prova',
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Este guia vai te mostrar exatamente como fazer isso.',
  },
];

// Read books.json
const booksPath = join(__dirname, 'src', 'data', 'books.json');
const booksData = JSON.parse(readFileSync(booksPath, 'utf-8'));

// Find OAB360 book
const oabBook = booksData.find(book => book.code === 'OAB360');

if (!oabBook) {
  console.error('OAB360 book not found!');
  process.exit(1);
}

// Update Chapter 1 content
const chapter1 = oabBook.chapters.find(ch => ch.number === 1);

if (!chapter1) {
  console.error('Chapter 1 not found!');
  process.exit(1);
}

chapter1.content = chapter1Content;

// Write updated data back
writeFileSync(booksPath, JSON.stringify(booksData, null, 2), 'utf-8');

console.log('✅ Chapter 1 updated successfully with structured content!');
console.log(`📖 Book: ${oabBook.title}`);
console.log(`📄 Chapter: ${chapter1.title}`);
console.log(`🔢 Content blocks: ${chapter1Content.length}`);
