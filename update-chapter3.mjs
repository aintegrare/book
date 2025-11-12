/**
 * Script to update Chapter 3 with complete structured content
 * Includes 3 full exam questions
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const booksPath = join(__dirname, 'src', 'data', 'books.json');
const booksData = JSON.parse(readFileSync(booksPath, 'utf-8'));
const oabBook = booksData.find(book => book.code === 'OAB360');

console.log('🚀 Converting Chapter 3 (Direito Penal)...\n');

const chapter3Content = [
  {
    type: 'section',
    level: 2,
    number: '3.1',
    title: 'Caso Real: Artigo 121 do Código Penal',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Vamos aplicar o método em tempo real.',
  },

  {
    type: 'paragraph',
    text: 'Abaixo, você verá questões FGV reais sobre artigos do MESMO CAPÍTULO, observando como a banca expande e combina dispositivos em blocos.',
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'OBSERVE OS PADRÕES DE COBRANÇA',
  },

  {
    type: 'separator',
  },

  // Questão 1
  {
    type: 'question',
    exam: 'EXAME XXVII',
    number: 'Q.62',
    text: 'Inconformado com o fato de Mauro ter votado em um candidato que defendia ideologia diferente da sua, João desferiu golpes de faca contra seu colega, assim agindo com a intenção de matá-lo.\n\nAcreditando ter obtido o resultado desejado, João levou o corpo da vítima até uma praia deserta e o jogou no mar.\n\nDias depois, o corpo foi encontrado, e a perícia constatou que a vítima morreu afogada, e não em razão das facadas desferidas por João.\n\nDescobertos os fatos, João foi preso, denunciado e pronunciado pela prática de dois crimes de homicídio dolosos, na forma qualificada, em concurso material.\n\nAo apresentar recurso contra a decisão de pronúncia, você, advogado(a) de João, sob o ponto de vista técnico, deverá alegar que ele somente poderia ser responsabilizado:',
    alternatives: [
      {
        letter: 'A',
        text: 'pelo crime de lesão corporal, considerando a existência de causa superveniente, relativamente independente, que, por si só, causou o resultado.',
      },
      {
        letter: 'B',
        text: 'por um crime de homicídio culposo, na forma consumada.',
      },
      {
        letter: 'C',
        text: 'por um crime de homicídio doloso qualificado, na forma tentada, e por um crime de homicídio culposo, na forma consumada, em concurso material.',
      },
      {
        letter: 'D',
        text: 'por um crime de homicídio doloso qualificado, na forma consumada.',
      },
    ],
    answer: 'D',
    article: 'Art. 121 CP §2º, II',
    law: 'Aplicando-se quanto aos meios de execução o instituto da ABERRATIO CAUSAE ou DOLO GERAL\n\nCódigo Penal',
  },

  {
    type: 'separator',
  },

  // Questão 2
  {
    type: 'question',
    exam: 'EXAME XXVIII',
    number: 'Q.61',
    text: 'David, em dia de sol, levou sua filha, Vivi, de 03 anos, para a piscina do clube.\n\nEnquanto a filha brincava na piscina infantil, David precisou ir ao banheiro, solicitando, então, que sua amiga Carla, que estava no local, ficasse atenta para que nada de mal ocorresse com Vivi.\n\nCarla se comprometeu a cuidar da filha de David. Naquele momento, Vitor assumiu o posto de salva-vidas da piscina.\n\nCarla, que sempre fora apaixonada por Vitor, começou a conversar com ele e ambos ficam de costas para a piscina, não atentando para as crianças que lá estavam.\n\nVivi começa a brincar com o filtro da piscina e acaba sofrendo uma sucção que a deixa embaixo da água por tempo suficiente para causar seu afogamento.\n\nDavid vê quando o ato acontece através de pequena janela no banheiro do local, mas o fecho da porta fica emperrado e ele não consegue sair.\n\nVitor e Carla não veem o ato de afogamento da criança porque estavam de costas para a piscina conversando.\n\nDiante do resultado morte, David, Carla e Vitor ficam preocupados com sua responsabilização penal e procuram um advogado, esclarecendo que nenhum deles adotou comportamento positivo para gerar o resultado.\n\nConsiderando as informações narradas, o advogado deverá esclarecer que:',
    alternatives: [
      {
        letter: 'A',
        text: 'Carla e Vitor, apenas, poderão responder por homicídio culposo, já que podiam atuar e possuíam obrigação de agir na situação.',
      },
      {
        letter: 'B',
        text: 'David, apenas, poderá responder por homicídio culposo, já que era o único com dever legal de agir por ser pai da criança.',
      },
      {
        letter: 'C',
        text: 'David, Carla, Vitor poderão responder por homicídio culposo, já que os três tinham o dever de agir.',
      },
      {
        letter: 'D',
        text: 'Vítor, apenas, poderá responder pelo crime de omissão de socorro.',
      },
    ],
    answer: 'A',
    article: 'Art. 121, §3º',
    law: 'Código Penal',
  },

  {
    type: 'separator',
  },

  // Questão 3
  {
    type: 'question',
    exam: 'EXAME XXIX',
    number: 'Q.61',
    text: 'Sandra, mãe de Enrico, de 4 anos de idade, fruto de relacionamento anterior, namorava Fábio.\n\nApós conturbado término do relacionamento, cujas discussões tinham como principal motivo a criança e a relação de Sandra com o ex-companheiro, Fábio comparece à residência de Sandra, enquanto esta trabalhava, para buscar seus pertences.\n\nNa ocasião, ele encontrou Enrico e uma irmã de Sandra, que cuidava da criança.\n\nCom raiva pelo término da relação, Fábio, aproveitando-se da distração da tia, conversa com a criança sobre como seria legal voar do 8º andar apenas com uma pequena toalha funcionando como paraquedas.\n\nDiante do incentivo de Fábio, Enrico pula da varanda do apartamento com a toalha e vem a sofrer lesões corporais de natureza grave, já que cai em cima de uma árvore.\n\nDescobertos os fatos, a família de Fábio procura advogado para esclarecimentos sobre as consequências jurídicas do ato.\n\nConsiderando as informações narradas, sob o ponto de vista técnico, deverá o advogado esclarecer que a conduta de Fábio configura:',
    alternatives: [
      {
        letter: 'A',
        text: 'conduta atípica, já que não houve resultado de morte a partir da instigação ao suicídio.',
      },
      {
        letter: 'B',
        text: 'crime de instigação ao suicídio consumado, com pena inferior àquela prevista para quando há efetiva morte.',
      },
      {
        letter: 'C',
        text: 'crime de instigação ao suicídio na modalidade tentada.',
      },
      {
        letter: 'D',
        text: 'crime de homicídio na modalidade tentada.',
      },
    ],
    answer: 'D',
    article: 'Art. 121',
    law: 'Código Penal',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '3.2',
    title: 'Perceba o Padrão',
  },

  {
    type: 'box',
    variant: 'diagnosis',
    title: 'Análise do Padrão de Cobrança',
    content: '▸ Todas essas questões giram em torno do MESMO CAPÍTULO do Código Penal\n\n▸ A FGV explora diferentes aspectos:\n   • Dolo\n   • Culpa\n   • Tentativa\n   • Consumação\n   • Qualificadoras\n\n▸ Quem estuda apenas "homicídio" de forma genérica SE PERDE\n\n▸ Quem estuda o CAPÍTULO completo DOMINA todas as variações',
  },
];

const chapter3 = oabBook.chapters.find(ch => ch.number === 3);
if (chapter3) {
  chapter3.content = chapter3Content;
  console.log('✅ Chapter 3 updated successfully');
  console.log(`   Content blocks: ${chapter3Content.length}`);
  console.log(`   Includes: 3 complete exam questions\n`);
}

writeFileSync(booksPath, JSON.stringify(booksData, null, 2), 'utf-8');
console.log('✅ Chapter 3 conversion complete!');
