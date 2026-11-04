// Jornadas: a parte espiritual que caminha junto com o treino.
// "conhecer" = para quem está conhecendo Deus; "caminhar" = para quem já caminha com Ele.

export type Leitura = { id: string; titulo: string; texto: string[]; cartao: string; pergunta: string };
export type Semana = { titulo: string; resumo: string; dias: Leitura[] | string[] };
export type Trilha = { id: "conhecer" | "caminhar"; nome: string; para: string; semanas: Semana[] };

export const TRILHAS: Trilha[] = [
  {
    id: "conhecer", nome: "Propósito", para: "Para quem está conhecendo Deus",
    semanas: [
      {
        titulo: "Para que eu treino?", resumo: "Cinco leituras curtas sobre o que move você a treinar.",
        dias: [
          {
            id: "c1-1", titulo: "O que te trouxe até aqui", cartao: "1tm-4-8",
            texto: [
              "Todo mundo que entra numa academia tem um motivo. Saúde, autoestima, um término, um exame que assustou, a vontade de se sentir forte de novo.",
              "Nenhum desses motivos é errado. Mas vale olhar para ele com honestidade, porque o motivo decide até onde você vai quando a vontade acabar.",
              "Paulo, que escreveu boa parte do Novo Testamento, usava o atleta como exemplo. E ele foi direto: o treino do corpo ajuda, mas tem coisa que ajuda em tudo.",
            ],
            pergunta: "Se você tivesse amanhã o físico que quer, o que mudaria de verdade na sua vida?",
          },
          {
            id: "c1-2", titulo: "O vazio depois do espelho", cartao: "1co-9-25",
            texto: [
              "Muita gente bate a meta e sente um vazio estranho. O peso caiu, a camisa ficou justa no braço, e mesmo assim falta alguma coisa.",
              "Não é defeito seu. Metas do corpo são boas, mas passam. Paulo chama isso de coroa perecível: ela brilha e depois murcha.",
              "A pergunta não é parar de buscar a meta. É descobrir o que sustenta você depois que ela chega.",
            ],
            pergunta: "Que meta você já bateu e, mesmo assim, não te deixou satisfeito?",
          },
          {
            id: "c1-3", titulo: "Disciplina não é castigo", cartao: "hb-12-11",
            texto: [
              "Você sabe como é o dia de perna: ninguém acorda empolgado. Mesmo assim você vai, porque sabe o que aquilo constrói.",
              "A Bíblia fala de disciplina do mesmo jeito. Ela não é castigo de um Deus bravo. É treino de um Pai que quer ver você forte.",
              "O desconforto de agora não é sinal de que algo deu errado. Muitas vezes é sinal de que algo está sendo construído.",
            ],
            pergunta: "Em que área da vida você é disciplinado, e em qual você foge?",
          },
          {
            id: "c1-4", titulo: "Força de onde?", cartao: "is-40-31",
            texto: [
              "Tem dia em que nem o pré-treino resolve. A força acaba, a cabeça pesa, e a vontade é largar tudo.",
              "Isaías escreveu para um povo cansado, e prometeu uma força que não vem da gente: quem confia em Deus renova as forças.",
              "Confiar não é desligar o esforço. É parar de depender só dele.",
            ],
            pergunta: "Quando sua força acaba, onde você costuma buscar mais?",
          },
          {
            id: "c1-5", titulo: "Um Pai que não cobra resultado", cartao: "rm-8-15",
            texto: [
              "Abba é a palavra que Jesus usava para falar com Deus. Quer dizer Pai, do jeito íntimo, como um filho chama o próprio pai.",
              "Muitos homens cresceram com um pai ausente, ou com um pai que só aparecia para cobrar. É natural imaginar Deus do mesmo jeito.",
              "A proposta de Jesus é outra: você não precisa provar nada para ser aceito. Você treina a partir do amor, não para conquistá-lo.",
            ],
            pergunta: "Que imagem de pai você carrega? Ela se parece com o Deus que você imagina?",
          },
        ],
      },
      { titulo: "Quem sou eu sem o espelho?", resumo: "Identidade além do corpo.", dias: ["Feito com cuidado", "O que os outros dizem", "Nome novo", "Fraqueza não é vergonha", "Filho, não funcionário"] },
      { titulo: "Quem é Jesus?", resumo: "O Evangelho de Marcos em leituras curtas.", dias: ["O começo", "Ele chama pessoas comuns", "Ele toca quem ninguém tocava", "Ele acalma a tempestade", "A cruz e o túmulo vazio"] },
      { titulo: "Primeiros passos", resumo: "Oração, Bíblia e uma igreja para chamar de sua.", dias: ["Como orar sem saber orar", "Por onde começar a ler", "Por que ir a uma igreja", "Batismo", "Caminhar com outros homens"] },
    ],
  },
  {
    id: "caminhar", nome: "Templo", para: "Para quem já caminha com Deus",
    semanas: [
      {
        titulo: "Templo, não troféu", resumo: "Três leituras sobre cuidar do corpo como mordomo.",
        dias: [
          {
            id: "t1-1", titulo: "Seu corpo tem dono", cartao: "1co-6-19",
            texto: [
              "Paulo escreveu aos coríntios num lugar onde o corpo era culto ou era descartável. Ele propôs uma terceira via: o corpo é templo.",
              "Templo não se idolatra e não se abandona. Templo se cuida, porque pertence a alguém maior.",
              "Treinar, comer bem e dormir são formas práticas de dizer que você sabe de quem é o seu corpo.",
            ],
            pergunta: "O que no seu cuidado com o corpo hoje é idolatria, e o que é abandono?",
          },
          {
            id: "t1-2", titulo: "Treino como adoração", cartao: "1co-10-31",
            texto: [
              "Fazer tudo para a glória de Deus inclui o supino de segunda-feira. Adoração não acontece só no culto.",
              "Quando você treina com honestidade, sem atalhos, sem comparação e sem ego, isso também honra a Deus.",
              "Hoje, antes da primeira série, entregue o treino em uma frase.",
            ],
            pergunta: "Como seria seu treino de hoje se você treinasse para Deus, e não para o espelho?",
          },
          {
            id: "t1-3", titulo: "Corpo e alma no mesmo treino", cartao: "1tm-4-8",
            texto: [
              "Paulo não despreza o exercício. Ele coloca o exercício no lugar certo: tem proveito, mas não é tudo.",
              "O risco do cristão que treina é trocar o devocional pela academia. O risco do cristão que não treina é chamar preguiça de espiritualidade.",
              "O AbbaFit existe para você não precisar escolher entre os dois.",
            ],
            pergunta: "Esta semana, o que está ganhando mais tempo: o treino do corpo ou o da alma?",
          },
        ],
      },
      { titulo: "Disciplina", resumo: "Constância no treino e na fé.", dias: ["Domínio próprio", "Quando a vontade some", "Jejum e treino", "Recomeçar sem culpa"] },
      { titulo: "Descanso", resumo: "Recuperação do corpo e da alma.", dias: ["O dia de descanso", "Sono é obediência", "Ansiedade e treino", "Pastos verdes"] },
      { titulo: "Irmandade", resumo: "Ferro afia ferro.", dias: ["Ninguém treina sozinho", "Prestar contas", "Chamar um amigo", "Servir com a força"] },
    ],
  },
];

export const trilha = (id: string | undefined) => TRILHAS.find((t) => t.id === id) ?? TRILHAS[0]!;
export const leiturasProntas = (s: Semana): Leitura[] => (typeof s.dias[0] === "string" ? [] : (s.dias as Leitura[]));
export const todasLeituras = () => TRILHAS.flatMap((t) => t.semanas.flatMap(leiturasProntas));
export const leitura = (id: string) => todasLeituras().find((l) => l.id === id) ?? null;
