/**
 * Script to update Chapters 5-9 with complete structured content
 * All practical/informational chapters
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const booksPath = join(__dirname, 'src', 'data', 'books.json');
const booksData = JSON.parse(readFileSync(booksPath, 'utf-8'));
const oabBook = booksData.find(book => book.code === 'OAB360');

console.log('🚀 Converting Chapters 5-9 (Practical Guides)...\n');

// ============================================================================
// CHAPTER 5: Como Usar Este Método na Prática
// ============================================================================

const chapter5Content = [
  {
    type: 'section',
    level: 2,
    number: '5.1',
    title: 'Passo a Passo para Aplicação Imediata',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 1 — Se Planeje',
    content: 'Antes de começar, defina:\n\n▸ Quantas horas por semana você tem disponível?\n▸ Quais disciplinas você vai estudar primeiro?\n▸ Qual seu prazo até a prova?',
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'Seja realista.\nÉ melhor estudar 2h/dia com FOCO\ndo que 8h/dia disperso.',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 2 — Escolha Uma Disciplina e Uma Prova',
    content: 'Não tente estudar tudo de uma vez.\n\n1. Escolha UMA disciplina para começar (ex: Direito Penal)\n2. Baixe UMA prova anterior da FGV\n3. Resolva a primeira questão\n4. Identifique o artigo cobrado\n5. Estude aquele CAPÍTULO inteiro da lei\n\nRepita esse ciclo para cada questão.',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 3 — Gere Simulados das Disciplinas Estudadas',
    content: 'Após estudar 3-4 capítulos de uma disciplina, faça simulados APENAS com questões daquela disciplina.\n\nIsso serve para:\n✓ Fixar o conteúdo estudado\n✓ Identificar lacunas que você ainda tem\n✓ Ganhar confiança progressiva',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 4 — Revise as Provas Resolvidas',
    content: 'Não basta resolver e esquecer.\n\n• Volte às questões que você já resolveu\n• Releia os capítulos estudados\n• Expanda para os artigos anteriores e subsequentes',
  },

  {
    type: 'callout',
    variant: 'important',
    content: 'A revisão inteligente vale MAIS do que estudar conteúdo novo sem fixação',
  },

  {
    type: 'box',
    variant: 'example',
    title: 'Passo 5 — Descanse',
    content: 'Seu cérebro precisa de tempo para consolidar o aprendizado.\n\n• Estude com intervalos\n• Durma bem\n• Não entre em modo "desespero" de 12h/dia',
  },

  {
    type: 'box',
    variant: 'principle',
    content: 'CONSISTÊNCIA > INTENSIDADE',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '5.2',
    title: 'Cronograma Sugerido',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Exemplo de planejamento:',
  },

  {
    type: 'paragraph',
    text: 'SEMANA 1-2    → Direito Penal (Parte Geral)\nSEMANA 3-4    → Direito Penal (Parte Especial)\nSEMANA 5-6    → Processo Penal\nSEMANA 7-8    → Direito Civil (Parte Geral)\nSEMANA 9-10   → Direito Civil (Obrigações e Contratos)\n...',
  },

  {
    type: 'paragraph',
    text: 'Adapte conforme seu ritmo e suas dificuldades.',
  },
];

// ============================================================================
// CHAPTER 6: Ferramentas Necessárias
// ============================================================================

const chapter6Content = [
  {
    type: 'section',
    level: 2,
    number: '6.1',
    title: 'O Que Você Precisa para Máxima Eficiência',
  },

  {
    type: 'paragraph',
    text: 'Para aplicar este método com eficiência máxima, você precisa de:',
  },

  {
    type: 'list',
    listType: 'check',
    items: [
      'Cronograma de estudos editável',
      'Sistema de organização por artigos/capítulos',
      'Gerador de simulados por matéria',
      'Resoluções comentadas pela lei seca',
      'Analytics de performance por dispositivo legal',
    ],
  },

  {
    type: 'paragraph',
    text: 'Você precisa adaptar seu plano conforme avança.',
  },

  {
    type: 'paragraph',
    text: 'Saber EXATAMENTE quais capítulos a FGV mais cobra é essencial.',
  },

  {
    type: 'paragraph',
    text: 'Não adianta estudar teoria sem aplicar em questões reais.',
  },

  {
    type: 'paragraph',
    text: 'Você precisa de fundamentação legal clara, não de "achismos".',
  },

  {
    type: 'paragraph',
    text: 'Saber quais artigos/capítulos você domina e quais ainda precisa revisar.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '6.2',
    title: 'É Exatamente Isso Que Oferecemos',
  },

  {
    type: 'box',
    variant: 'principle',
    title: 'Plataforma Resolução 360',
    content: '▸ Banco completo e organizado dos artigos cobrados\n   → Visualização prática dos respectivos capítulos\n\n▸ Resoluções completas por especialistas\n   → Lei seca (1ª Fase)\n   → Espelho oficial FGV (2ª Fase)\n\n▸ Gerador de simulados customizáveis\n   → 1ª e 2ª fase\n\n▸ Mentoria individual\n   → Com professores especializados\n\n▸ Sistema de analytics\n   → Performance por dispositivo legal',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '6.3',
    title: 'Pronto para Estudar com Precisão Cirúrgica?',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Você acabou de ver o poder do método de organização por capítulo de lei com apenas algumas questões.',
  },

  {
    type: 'paragraph',
    text: 'Imagine ter acesso a + 1.000 questões FGV organizadas dessa forma.',
  },

  {
    type: 'box',
    variant: 'principle',
    content: 'Cada capítulo.\nCada padrão.\nCada pegadinha da banca.',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Conheça a Plataforma Resolução 360:\n\nwww.resolucao360.com.br',
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'Estude Inteligente.\nEstude com a Resolução 360.',
  },
];

// ============================================================================
// CHAPTER 7: Depoimentos
// ============================================================================

const chapter7Content = [
  {
    type: 'section',
    level: 2,
    number: '7.1',
    title: 'O Que Nossos Alunos Estão Dizendo',
  },

  {
    type: 'callout',
    variant: 'quote',
    content: 'Estou entrando e gostei muito, principalmente a parte pedagógica que está bem estruturada.\n\n— Renata, Estudante',
  },

  {
    type: 'callout',
    variant: 'quote',
    content: 'Estou achando muito bom, está dando tudo certo e está super tranquilo e didático também continue assim vcs vão ajudar muitos os estudantes.\n\n— Gabi, Estudante',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '7.2',
    title: 'Nosso Time de Professores Especialistas',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Todos os nossos professores possuem mais de 24 anos de experiência e são especialistas em suas áreas:',
  },

  {
    type: 'list',
    listType: 'bullet',
    items: [
      'Ana Laura Vallarelli Gutierres Araujo — +37 anos de formação',
      'Antonio Carlos Freitas De Almeida — +41 anos de formação',
      'Cássio Vinicius Dal Castel Veronezzi Lazzari Prestes — +28 anos de formação',
      'Cristina Muller Destro — +26 anos de formação',
      'Nilton Silva Cezar Junior — +34 anos de formação',
      'Rodrigo Da Costa Ratto Cavalheiro — +24 anos de formação',
    ],
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'Conheça mais sobre cada professor no próximo capítulo',
  },
];

// ============================================================================
// CHAPTER 8: Sobre a Plataforma
// ============================================================================

const chapter8Content = [
  {
    type: 'section',
    level: 2,
    number: '8.1',
    title: 'Nossa História',
  },

  {
    type: 'paragraph',
    variant: 'lead',
    text: 'Por Isabella, Fundadora',
  },

  {
    type: 'paragraph',
    text: 'Sou bacharel em Direito e, por um tempo, fui concursada.',
  },

  {
    type: 'paragraph',
    text: 'Sempre gostei da ideia de trabalhar com propósito, de sentir que, de alguma forma, eu estava contribuindo mais diretamente para a sociedade como um todo.',
  },

  {
    type: 'paragraph',
    text: 'Depois que me casei, meu marido (empresário) me incentivou a prestar a prova da OAB, com o intuito de auxiliá-lo nas questões jurídicas da empresa.',
  },

  {
    type: 'paragraph',
    text: 'Foi aí que comecei a procurar cursos para me preparar.',
  },

  {
    type: 'section',
    level: 3,
    title: 'Mas o Que Encontrei Me Frustrou',
  },

  {
    type: 'list',
    listType: 'cross',
    items: [
      'Plataformas desorganizadas',
      'Materiais genéricos',
      'Vídeos longos',
      'PDFs que mais confundiam do que ajudavam',
    ],
  },

  {
    type: 'paragraph',
    text: 'Cheguei a investir mil reais em um material, tentei por algumas semanas e percebi em pouco tempo que estudar por ali não iria adiantar e decidi não continuar.',
  },

  {
    type: 'section',
    level: 3,
    title: 'A Virada',
  },

  {
    type: 'paragraph',
    text: 'Foi então que resolvi montar meu próprio material de estudos.',
  },

  {
    type: 'paragraph',
    text: 'Com o tempo, visualizei que eu não precisava de mais conteúdo — eu precisava de MÉTODO, CLAREZA e PRATICIDADE.',
  },

  {
    type: 'paragraph',
    text: 'E, enquanto criava, percebi algo muito maior:',
  },

  {
    type: 'callout',
    variant: 'quote',
    content: 'O que mais me realizava, quando era concursada, era sentir que o meu trabalho ajudava de forma a atingir um número considerável de pessoas',
  },

  {
    type: 'paragraph',
    text: 'Descobri que o que eu realmente queria não era prestar a prova, mas AJUDAR O MAIOR NÚMERO DE INSCRITOS A CHEGAR LÁ.',
  },

  {
    type: 'section',
    level: 3,
    title: 'O Nascimento da Plataforma',
  },

  {
    type: 'paragraph',
    text: 'Então pensei: por que não reunir todo esse método, essa análise e esse conteúdo em um só lugar e construir uma plataforma com ferramentas diferentes de todas as existentes do mercado?',
  },

  {
    type: 'list',
    listType: 'check',
    items: [
      'Intuitiva',
      'Dinâmica',
      'Rápida',
      'Prática',
    ],
  },

  {
    type: 'paragraph',
    text: 'Com alguns dos melhores advogados e professores do estado de São Paulo para auxiliar milhares de formandos e formados que estão se preparando para o tão ansioso dia D.',
  },

  {
    type: 'section',
    level: 3,
    title: 'Hoje',
  },

  {
    type: 'paragraph',
    text: 'Hoje, com a criação da plataforma Resolução 360, transformei essa vontade em missão.',
  },

  {
    type: 'paragraph',
    text: 'Esse propósito se tornou o coração da minha plataforma.',
  },

  {
    type: 'paragraph',
    text: 'Minha plataforma nasceu para:',
  },

  {
    type: 'list',
    listType: 'bullet',
    items: [
      'Simplificar',
      'Motivar',
      'Mostrar que o sonho da aprovação é possível',
    ],
  },

  {
    type: 'paragraph',
    text: 'quando se tem um caminho claro, humano e com ferramentas que contribuem para economia e otimização do precioso tempo do aluno.',
  },

  {
    type: 'box',
    variant: 'principle',
    content: 'Estudar não deve ser um fardo,\ne sim uma ponte para alcançar seus\nobjetivos.',
  },

  {
    type: 'paragraph',
    text: 'Hoje, com a ajuda de especialistas com mais de 24 anos de formação, expertises em diversas áreas do direito e currículo de dar inveja a qualquer um, quero ajudar todos os inscritos que irão prestar prova a conquistarem seus sonhos com um método prático e eficiente.',
  },

  {
    type: 'paragraph',
    text: 'Sem excessos. Sem enrolação.',
  },

  {
    type: 'paragraph',
    text: 'Apenas com o que realmente precisam para alcançar a aprovação e realizarem seus sonhos de conseguirem a tão almejada Carteira da Ordem Dos Advogados Do Brasil.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '8.2',
    title: 'Nossa Missão',
  },

  {
    type: 'box',
    variant: 'principle',
    content: 'Transformar a preparação para OAB\natravés de organização inteligente',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    number: '8.3',
    title: 'Conheça a Resolução 360',
  },

  {
    type: 'paragraph',
    text: 'Website: www.resolucao360.com.br\nE-mail: contato@resolucao360.com.br\nInstagram: @resolucao360\nTelefone: +55 15 98765-4321',
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'Estude Inteligente.\nEstude com a Resolução 360.',
  },
];

// ============================================================================
// CHAPTER 9: Professores (Continuação em próximo arquivo devido ao tamanho)
// ============================================================================

const chapter9Content = [
  {
    type: 'section',
    level: 1,
    title: 'Conheça Nossos Professores',
  },

  {
    type: 'section',
    level: 2,
    title: 'Ana Laura Vallarelli Gutierres Araujo',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+37 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formada em Direito desde 1987, é Mestre pela Pontifícia Universidade Católica de São Paulo (PUC-SP) e possui especialização em Direitos Difusos e Coletivos e em Direito Tributário.',
  },

  {
    type: 'paragraph',
    text: 'Advogada com ampla trajetória nas áreas civil, tributária e coletiva, alia experiência prática à sólida formação acadêmica.',
  },

  {
    type: 'paragraph',
    text: 'Como professora universitária, ministra disciplinas que abrangem Direito Civil, Biodireito, Direitos Difusos e Coletivos — com ênfase em Direito do Consumidor e Direito Ambiental — além de Direito Tributário.',
  },

  {
    type: 'paragraph',
    text: 'Reconhecida pela profundidade de seus conhecimentos e pela dedicação ao ensino, busca transmitir uma visão humanista e contemporânea do Direito, incentivando a reflexão crítica e ética entre seus alunos e colegas de profissão.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    title: 'Antonio Carlos Freitas de Almeida',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+41 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formado em Direito desde 1983, é especialista em Direito Civil pela Universidade de São Paulo (USP) e em Direito do Trabalho e Processo do Trabalho pela Pontifícia Universidade Católica de São Paulo (PUC-SP).',
  },

  {
    type: 'paragraph',
    text: 'Com mais de três décadas de experiência na advocacia trabalhista patronal, construiu uma trajetória sólida assessorando empresas de grande porte nível Brasil (Paraná, São Paulo, Mato Grosso e Rio De Janeiro), sempre pautado pela ética, pela técnica e pela eficiência jurídica.',
  },

  {
    type: 'paragraph',
    text: 'Ao longo de sua carreira, conquistou resultados expressivos em causas ganhas em favor de seus clientes corporativos — reflexo de sua dedicação, profundo conhecimento jurídico e habilidade estratégica na defesa dos interesses empresariais.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    title: 'Cássio Vinicius Dal Castel Veronezzi Lazzari Prestes',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+28 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formado em Direito desde 1996, é Mestre em Direito pela Universidade Metodista de Piracicaba. Possui pós-graduação em Direito Penal pela Escola Superior do Ministério Público de São Paulo e em Direito Constitucional pela Escola Superior de Direito Constitucional.',
  },

  {
    type: 'paragraph',
    text: 'Atua como professor nas instituições UNIP e ANHEMBI MORUMBI, lecionando as disciplinas de Direito Penal, Direito Constitucional, Direito Civil e Processo Civil.',
  },

  {
    type: 'paragraph',
    text: 'Ao longo de sua trajetória acadêmica, acumulou sólida experiência didático-pedagógica, com destaque para a área de Criminologia.',
  },

  {
    type: 'paragraph',
    text: 'Já integrou o corpo docente de diversas instituições renomadas, como o Complexo Jurídico Damásio de Jesus, a Universidade de Sorocaba, e cursos preparatórios para OAB/SP e carreiras jurídicas.',
  },

  {
    type: 'paragraph',
    text: 'Apaixonado pelo ensino e pelo Direito, dedica-se a transmitir conhecimento de forma clara e prática, contribuindo para a formação de novos profissionais comprometidos com a justiça e a excelência.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    title: 'Cristina Muller Destro',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+26 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formada em Direito desde 1998, possui MBA Executivo em Gestão Empresarial pelo Centro Paula Souza, com pesquisa voltada à importância da implementação de indicadores de desempenho e à visão estratégica do departamento jurídico.',
  },

  {
    type: 'paragraph',
    text: 'Ao longo de sua trajetória, aprimorou-se em diversas áreas complementares do Direito e da gestão corporativa, com especializações em Auditoria Jurídica de Contratos, Compliance, e Processo Civil com foco no Novo CPC.',
  },

  {
    type: 'paragraph',
    text: 'Também é certificada em Mediação de Conflitos pela Associação Brasileira de Franchising (ABF), ampliando sua atuação na resolução estratégica e humanizada de disputas.',
  },

  {
    type: 'paragraph',
    text: 'Com uma formação sólida e visão moderna sobre a interseção entre Direito, gestão e governança, dedica-se a aplicar o conhecimento jurídico de forma estratégica, eficiente e alinhada às boas práticas corporativas.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    title: 'Nilton Silva Cezar Junior',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+34 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formado em Direito desde 1990, possui especialização em Direito Processual Civil pela Faculdade de Direito de Itu e em Direito Empresarial pela Universidade Presbiteriana Mackenzie.',
  },

  {
    type: 'paragraph',
    text: 'Com ampla experiência na área de Direito Privado, atua com destaque nas áreas processual e empresarial, unindo conhecimento técnico e visão prática.',
  },

  {
    type: 'paragraph',
    text: 'É membro da Associação dos Advogados de São Paulo (AASP) e atual Vice-Presidente da Associação Comercial de Sorocaba, onde contribui ativamente para o fortalecimento do diálogo entre o meio jurídico e o setor empresarial.',
  },

  {
    type: 'paragraph',
    text: 'É também presidente da comissão de empreendedorismo da OAB Sorocaba.',
  },

  {
    type: 'paragraph',
    text: 'Além de sua atuação profissional, é palestrante reconhecido por abordar de forma clara e objetiva temas ligados à prática do Direito e à gestão empresarial, sempre com foco no desenvolvimento e na aplicação prática do conhecimento jurídico.',
  },

  {
    type: 'separator',
  },

  {
    type: 'section',
    level: 2,
    title: 'Rodrigo da Costa Ratto Cavalheiro',
  },

  {
    type: 'paragraph',
    variant: 'small',
    text: '+24 anos de formação',
  },

  {
    type: 'paragraph',
    text: 'Formado em Direito desde 2000, é Mestre em Direito pela Universidade Metodista de Piracicaba (UNIMEP) e Especialista em Direito Processual Civil pela Universidade Paulista (UNIP).',
  },

  {
    type: 'paragraph',
    text: 'Também possui especialização em Artes Cênicas pela Faculdade Paulista de Artes e é graduando em Letras — Português/Inglês pela Universidade Paulista.',
  },

  {
    type: 'paragraph',
    text: 'Atua como professor nas áreas de Direito Civil, Direito Processual Civil e Direito do Consumidor na Universidade Paulista (UNIP/Sorocaba) e na Faculdade de Direito de Itu (FADITU), onde também integra o Núcleo Docente Estruturante (NDE).',
  },

  {
    type: 'paragraph',
    text: 'É membro fundador do Núcleo de Estudos em Propriedade Intelectual do Programa de Mestrado da UNIMEP, consolidando sua trajetória acadêmica voltada à pesquisa e à produção científica.',
  },

  {
    type: 'paragraph',
    text: 'Autor do livro "O Monopólio e as Multinacionais Farmacêuticas", publicou ainda diversas obras de relevância acadêmica na área de Propriedade Intelectual e Direito.',
  },

  {
    type: 'paragraph',
    text: 'Com sólida formação e ampla vivência acadêmica, alia o rigor científico à sensibilidade humanista, buscando contribuir para uma compreensão mais crítica e inovadora do Direito.',
  },

  {
    type: 'separator',
  },

  {
    type: 'callout',
    variant: 'tip',
    content: 'Estude Inteligente.\nEstude com a Resolução 360.\n\nwww.resolucao360.com.br',
  },
];

// ============================================================================
// Update all chapters
// ============================================================================

const chapters = [
  { num: 5, content: chapter5Content, name: 'Como Usar Este Método na Prática' },
  { num: 6, content: chapter6Content, name: 'Ferramentas Necessárias' },
  { num: 7, content: chapter7Content, name: 'Depoimentos' },
  { num: 8, content: chapter8Content, name: 'Sobre a Plataforma Resolução 360' },
  { num: 9, content: chapter9Content, name: 'Conheça Nossos Professores' },
];

chapters.forEach(({ num, content, name }) => {
  const chapter = oabBook.chapters.find(ch => ch.number === num);
  if (chapter) {
    chapter.content = content;
    console.log(`✅ Chapter ${num} (${name}) updated`);
    console.log(`   Content blocks: ${content.length}\n`);
  }
});

writeFileSync(booksPath, JSON.stringify(booksData, null, 2), 'utf-8');

console.log('✅ All chapters 5-9 converted successfully!');
console.log(`📖 Complete ebook with ${oabBook.chapters.length} chapters`);
console.log(`🎉 All 9 chapters now use LaTeX-quality structured content!`);
