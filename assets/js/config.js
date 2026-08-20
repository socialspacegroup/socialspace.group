/* ==========================================================================
   Social Space - Configuration & Constants
   ========================================================================== */

const CONFIG = {
  // Official Community Description
  DESCRIPTION: 'Social Space une pessoas de diversas áreas para debates, trocas de conhecimento, diversão e evolução conjunta. Acreditamos que a união de diferentes mundos potencializa o crescimento, transformando nosso espaço num ambiente rico e inspirador.',

  // Platform Access URLs
  DISCORD_URL: 'https://discord.gg/prtapQcA2d',
  ROOT_URL: 'https://rootapp.gg/ADDCcwx-gwqFet6LYjyQ4w',
  GITHUB_URL: 'https://github.com/socialspacegroup',

  // Community Statistics Initial Values & Targets
  STATS: {
    MEMBERS_ONLINE: 1420,
    TOTAL_MEMBERS: 12850,
    PROJECTS_SHIPPED: 340,
    ARTICLES_PUBLISHED: 890,
    LINES_OF_CODE: '2.4M+'
  },

  // Sample Articles Data (Montserrat focus)
  ARTICLES: [
    {
      id: 1,
      category: 'Design Systems',
      tagClass: 'badge-cyan',
      title: 'Arquitetura de Design Systems Glassmorphism com CSS Moderno',
      summary: 'Como estruturar tokens visuais, temas escuros, variáveis dinâmicas e efeitos de desfoque mantendo 60FPS de performance.',
      author: 'Lucas Silva',
      role: 'Staff UI/UX',
      readTime: '6 min de leitura',
      date: '20 de Ago'
    },
    {
      id: 2,
      category: 'Desenvolvimento',
      tagClass: 'badge-gradient',
      title: 'Construindo Microserviços de Alta Performance com WebAssembly e Rust',
      summary: 'Estudo prático sobre integração de módulos Wasm no ecossistema Node/Go para acelerar processamento em tempo real.',
      author: 'Gabriel Santos',
      role: 'Lead Architect',
      readTime: '9 min de leitura',
      date: '18 de Ago'
    },
    {
      id: 3,
      category: 'Open Source',
      tagClass: 'badge-yellow',
      title: 'Guia de Contribuição: Do Primeiro Commit à Liderança de Projetos',
      summary: 'Melhores práticas para criar Pull Requests impecáveis, documentação clara e cultura de Code Review no Social Space.',
      author: 'Mariana Costa',
      role: 'Open Source Maintainer',
      readTime: '5 min de leitura',
      date: '15 de Ago'
    }
  ]
};

// Freeze config object to prevent accidental runtime mutations
Object.freeze(CONFIG);
