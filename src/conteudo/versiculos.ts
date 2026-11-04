// Cartões da Palavra que aparecem no descanso entre as séries.
// Texto bíblico: Bíblia Livre (BLIVRE), licença Creative Commons Atribuição 4.0 — https://ebible.org/porbr2018/
// "treino" = a tradução da passagem para o momento do treino (texto do AbbaFit).

export type Momento = "comeco" | "descanso" | "falha" | "pesado" | "constancia" | "reta-final";

export type Cartao = { id: string; ref: string; texto: string; treino: string; momentos: Momento[] };

export const CREDITO_BIBLIA = "Texto bíblico: Bíblia Livre (BLIVRE), CC BY 4.0.";

export const CARTOES: Cartao[] = [
  {
    id: "js-1-9", ref: "Josué 1:9", momentos: ["comeco"],
    texto: "Olha que te mando que te esforces e sejas valente: não temas nem desmaies, porque o SENHOR teu Deus será contigo onde quer que fores.",
    treino: "Começou o treino. Você não entra nessa academia sozinho.",
  },
  {
    id: "1co-10-31", ref: "1 Coríntios 10:31", momentos: ["comeco", "descanso"],
    texto: "Portanto, ao comer, ou ao beber, ou ao fazer qualquer coisa, fazei tudo para a glória de Deus.",
    treino: "Até a primeira série conta. Faça bem feito, como quem treina para alguém maior.",
  },
  {
    id: "mt-11-28", ref: "Mateus 11:28", momentos: ["descanso"],
    texto: "Vinde a mim todos vós que estais cansados e sobrecarregados, e eu vos farei descansar.",
    treino: "O músculo cresce na pausa, não na série. A alma também precisa da dela.",
  },
  {
    id: "sl-23-1", ref: "Salmos 23:1-2", momentos: ["descanso"],
    texto: "O SENHOR é meu pastor, nada me faltará. Ele me faz deitar em pastos verdes, e me leva a águas quietas.",
    treino: "Beba água, solte os ombros. Até um descanso de 60 segundos pode ser lugar de paz.",
  },
  {
    id: "is-40-31", ref: "Isaías 40:31", momentos: ["descanso", "constancia"],
    texto: "Mas os que confiam no SENHOR renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
    treino: "Força não se renova só com carboidrato. Confiança também recarrega.",
  },
  {
    id: "2co-12-9", ref: "2 Coríntios 12:9", momentos: ["falha"],
    texto: "Mas ele me disse: “Minha graça te basta, porque meu poder se aperfeiçoa na fraqueza”.",
    treino: "Chegou na falha? É no limite que você descobre que não precisa carregar tudo sozinho.",
  },
  {
    id: "is-40-29", ref: "Isaías 40:29", momentos: ["falha", "pesado"],
    texto: "Ele dá força ao cansado, e multiplica as forças daquele que não tem vigor.",
    treino: "Cansaço não é sinal para parar. É onde a força de verdade começa a aparecer.",
  },
  {
    id: "fp-4-13", ref: "Filipenses 4:13", momentos: ["falha"],
    texto: "Posso todas as coisas em Cristo que me fortalece.",
    treino: "Não é sobre levantar qualquer peso. É sobre não enfrentar nenhum deles sozinho.",
  },
  {
    id: "2tm-1-7", ref: "2 Timóteo 1:7", momentos: ["falha", "pesado"],
    texto: "Pois Deus não nos deu espírito de medo; mas sim de força, de amor, e de moderação.",
    treino: "Medo da carga nova? Força com moderação: suba o peso com técnica, sem ego.",
  },
  {
    id: "hb-12-11", ref: "Hebreus 12:11", momentos: ["pesado"],
    texto: "De fato, no presente, nenhuma disciplina parece ser motivo de alegria, mas sim, de sofrimento; mas depois produz um fruto pacífico de justiça aos que foram exercitados por ela.",
    treino: "Ninguém gosta do treino de perna na hora. É dele que você vai se orgulhar daqui a três meses.",
  },
  {
    id: "rm-5-3", ref: "Romanos 5:3-4", momentos: ["pesado", "constancia"],
    texto: "Nos alegramos nas tribulações, sabendo que a tribulação produz paciência; a paciência produz experiência, e a experiência produz esperança.",
    treino: "Série após série com carga pesada. É assim que se constrói músculo, e é assim que se constrói caráter.",
  },
  {
    id: "gl-6-9", ref: "Gálatas 6:9", momentos: ["constancia", "reta-final"],
    texto: "Porém não cansemos de fazer o bem, pois no tempo devido colheremos, se não desistirmos.",
    treino: "O resultado não aparece em uma semana. Aparece em quem não desiste na quarta-feira.",
  },
  {
    id: "1co-9-24", ref: "1 Coríntios 9:24", momentos: ["constancia"],
    texto: "Não sabeis vós que os que correm nas competições, realmente todos correm, mas somente um leva o prêmio? Correi de tal maneira, que o alcanceis.",
    treino: "Qualquer um faz a série. Faça essa como quem quer o prêmio.",
  },
  {
    id: "1co-9-25", ref: "1 Coríntios 9:25", momentos: ["constancia", "reta-final"],
    texto: "E todo aquele que luta, tenha domínio próprio sobre tudo. Pois aqueles fazem para receber uma coroa perecível, porém nós para uma que não perece.",
    treino: "O shape passa. A disciplina que você está construindo agora fica.",
  },
  {
    id: "hb-12-1", ref: "Hebreus 12:1", momentos: ["reta-final"],
    texto: "Deixemos toda sobrecarga, e o pecado que facilmente nos envolve, e corramos com perseverança a corrida que nos está proposta.",
    treino: "Reta final. Largue o que está pesando à toa e termine o que começou.",
  },
  {
    id: "rm-8-15", ref: "Romanos 8:15", momentos: ["descanso"],
    texto: "Pois não recebestes o espírito de escravidão, para voltardes ao medo; mas recebestes o Espírito de adoção como filhos, pelo qual clamamos: Aba, Pai!",
    treino: "Você não treina para provar seu valor. Filho não precisa provar nada para o Pai.",
  },
  {
    id: "sl-139-14", ref: "Salmos 139:14", momentos: ["descanso"],
    texto: "Eu te louvarei porque de um jeito assombroso e maravilhoso eu fui feito; maravilhosas são tuas obras; e minha alma sabe muito bem.",
    treino: "Antes de qualquer mudança no espelho, você já foi feito com cuidado. Treine a partir disso, não para conseguir isso.",
  },
  {
    id: "2co-5-17", ref: "2 Coríntios 5:17", momentos: ["comeco", "descanso"],
    texto: "Portanto, se alguém está em Cristo, uma nova criatura é; as coisas velhas já passaram, eis que tudo se fez novo.",
    treino: "Todo recomeço conta. Hoje pode ser o dia um de novo.",
  },
  {
    id: "1co-6-19", ref: "1 Coríntios 6:19-20", momentos: ["descanso"],
    texto: "Ou não sabeis que vosso corpo é templo do Espírito Santo, o qual está em vós, o qual tendes de Deus, e que não sois de vós mesmos? Porque vós fostes comprados por alto preço; então glorificai a Deus em vosso corpo.",
    treino: "Cuidar do corpo não é vaidade quando você sabe de quem ele é.",
  },
  {
    id: "1tm-4-8", ref: "1 Timóteo 4:8", momentos: ["descanso"],
    texto: "Pois o exercício do corpo tem pouco proveito; mas a devoção divina é proveitosa para tudo, pois tem as promessas da vida atual e da futura.",
    treino: "A Bíblia diz que o treino ajuda pouco. Pouco não é nada: treine o corpo e não esqueça do resto.",
  },
  {
    id: "pv-27-17", ref: "Provérbios 27:17", momentos: ["descanso", "constancia"],
    texto: "O ferro é afiado com ferro; assim também o homem afia o rosto de seu amigo.",
    treino: "Treinar com alguém do lado muda tudo. Chame um amigo para o próximo treino.",
  },
];

export const cartaoPorId = (id: string | null | undefined) => CARTOES.find((c) => c.id === id) ?? null;

/** Escolhe um cartão do momento, evitando os que já apareceram neste treino. */
export function escolherCartao(momento: Momento, jaVistos: string[]): Cartao {
  const doMomento = CARTOES.filter((c) => c.momentos.includes(momento));
  const novos = doMomento.filter((c) => !jaVistos.includes(c.id));
  const pool = novos.length ? novos : CARTOES.filter((c) => !jaVistos.includes(c.id));
  const lista = pool.length ? pool : CARTOES;
  return lista[Math.floor(Math.random() * lista.length)]!;
}

/** Palavra do dia: muda à meia-noite, igual para todo mundo. */
export function palavraDoDia(d = new Date()): Cartao {
  const dia = Math.floor((+d - d.getTimezoneOffset() * 60000) / 86400000);
  return CARTOES[dia % CARTOES.length]!;
}
