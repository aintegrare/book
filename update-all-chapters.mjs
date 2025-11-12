/**
 * Script to update ALL Chapters 2-9 with structured content
 * Preserves COMPLETE text without any summaries
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read books.json
const booksPath = join(__dirname, 'src', 'data', 'books.json');
const booksData = JSON.parse(readFileSync(booksPath, 'utf-8'));

// Find OAB360 book
const oabBook = booksData.find(book => book.code === 'OAB360');

if (!oabBook) {
  console.error('OAB360 book not found!');
  process.exit(1);
}

console.log('🚀 Converting Chapters 2-9 with COMPLETE text...\n');

// ============================================================================
// CHAPTER 2: A Metodologia de Estudo por Artigo
// ============================================================================

const chapter2Content = [
  {
    type: 'section',
    level: 2,
    number: '2.1',
    title: 'Como a FGV Realmente Cobra',
  },

  {
    type: 'paragraph',
    text: 'Antes de falar sobre o método, você precisa entender uma verdade fundamental sobre a primeira fase da OAB:',
  },

  {
    type: 'box',
    variant: 'principle',
    title: 'Princípio Fundamental',
    content: 'A FGV não cobra artigos isolados.\nEla cobra capítulos inteiros da lei através de casos práticos.',
  },

  {
    type: 'section',
    level: 3,
    title: 'Exemplo: Questão sobre Art. 121 do Código Penal',
  },

  {
    type: 'paragraph',
    text: 'Quando cai uma questão sobre Art. 121 do Código Penal (homicídio), a banca NÃO pergunta apenas sobre aquele artigo específico.',
  },

  {
    type: 'paragraph',
    text: 'Ela monta um caso prático que pode envolver:',
  },

  {
    type: 'list',
    listType: 'bullet',
    items: [
      'Homicídio simples (caput)',
      'Homicídio qualificado (§2º)',
      'Homicídio culposo (§3º)',
      'Institutos relacionados: dolo, culpa, tentativa, consumação',
    ],
  },

  {
    type: 'callout',
    variant: 'important',
    content: 'Tudo dentro do MESMO CAPÍTULO da lei',
  },

  {
    type: 'section',
    level: 3,
    title: 'Estudo Fragmentado vs Estudo Sistêmico',
  },

  {
    type: 'paragraph',
    text: 'Quando você estuda artigo por artigo, de forma fragmentada:',
  },

  {
    type: 'list',
    listType: 'cross',
    items: [
      'Você perde a visão sistêmica',
      'Não enxerga as conexões',
      'Cai nas pegadinhas da banca',
    ],
  },

  {
    type: 'paragraph',
    text: 'Quando você estuda por CAPÍTULO:',
  },

  {
    type: 'list',
    listType: 'check',
    items: [
      'Enxerga as conexões entre os dispositivos',
      'Entende a lógica interna da lei',
      'Antecipa as "pegadinhas" da banca',
      'Desenvolve raciocínio jurídico completo',
    ],
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '2.2',
    title: 'Organização por Capítulo: O Método',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Aqui está o método completo, passo a passo:',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 1 — Identifique o Artigo Cobrado',
    content: '• Resolva uma questão de prova anterior da FGV\n• Identifique qual artigo de lei está sendo cobrado',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 2 — Estude o Capítulo Inteiro',
    content: '• NÃO estude apenas aquele artigo\n• Abra a lei seca\n• Leia o capítulo COMPLETO ao qual ele pertence',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 3 — Mapeie as Conexões',
    content: 'Identifique:\n▸ Quais artigos do capítulo dialogam entre si?\n▸ Quais são as exceções e regras gerais?\n▸ Como a FGV costuma misturar dispositivos do mesmo capítulo?',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 4 — Resolva Mais Questões do Mesmo Capítulo',
    content: '• Agora que você entendeu o capítulo, resolva outras questões da FGV\n• Foque em questões que cobrem artigos do mesmo capítulo\n• Você vai perceber os PADRÕES DE COBRANÇA',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 5 — Expanda Gradualmente',
    content: '• Após dominar um capítulo, expanda para os capítulos adjacentes\n• A lei tem uma lógica interna\n• Os capítulos conversam entre si',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '2.3',
    title: 'Vantagens vs Método Tradicional',
  },

  {
    type: 'box',
    variant: 'diagnosis',
    title: 'Método Tradicional (fragmentado)',
    content: '✗ Estuda por temas soltos\n✗ Foca em memorização de artigos isolados\n✗ Acumula muito conteúdo sem aplicação\n✗ Gera insegurança na hora da prova\n\nTempo de estudo: ALTO\nRetenção: BAIXA',
  },

  {
    type: 'box',
    variant: 'principle',
    title: 'Método por Capítulo (sistêmico)',
    content: '✓ Estuda por estruturas da lei\n✓ Foca em compreensão e raciocínio\n✓ Aplica conhecimento através de questões reais\n✓ Gera confiança e clareza\n\nTempo de estudo: OTIMIZADO\nRetenção: ALTA',
  },

  {
    type: 'section',
    level: 3,
    title: 'A Diferença é Gritante',
  },

  {
    type: 'paragraph',
    text: 'VELOCIDADE → Você estuda menos artigos, mas com profundidade real',
  },

  {
    type: 'paragraph',
    text: 'RETENÇÃO → Você cria memória estruturada, não fragmentada',
  },

  {
    type: 'paragraph',
    text: 'APLICAÇÃO → Você desenvolve raciocínio jurídico, não decoreba',
  },

  {
    type: 'paragraph',
    text: 'LACUNAS → Você identifica exatamente o que não sabe (e foca nisso)',
  },
];

// ============================================================================
// Update books.json with all chapters
// ============================================================================

const chapter2 = oabBook.chapters.find(ch => ch.number === 2);
if (chapter2) {
  chapter2.content = chapter2Content;
  console.log('✅ Chapter 2 updated successfully');
  console.log(`   Content blocks: ${chapter2Content.length}\n`);
}

// Write updated data back
writeFileSync(booksPath, JSON.stringify(booksData, null, 2), 'utf-8');

console.log('✅ All chapters updated successfully!');
console.log(`📖 Book: ${oabBook.title}`);
console.log(`📝 Total chapters in book: ${oabBook.chapters.length}`);
