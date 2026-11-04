// Cardio de oração: sessões guiadas para caminhada, esteira ou bike.
// Cada sessão tem falas que aparecem no minuto certo. O áudio gravado entra depois (campo audio).

export type Fala = { min: number; texto: string };
export type SessaoCardio = { id: string; titulo: string; descricao: string; minutos: number; tipo: "oracao" | "palavra" | "silencio"; audio?: string; falas: Fala[] };

export const CARDIOS: SessaoCardio[] = [
  {
    id: "gratidao", titulo: "Caminhada de gratidão", minutos: 20, tipo: "oracao",
    descricao: "Comece leve e agradeça por uma coisa a cada bloco de 4 minutos.",
    falas: [
      { min: 0, texto: "Comece num ritmo confortável. Respire pelo nariz. Agradeça a Deus por estar de pé e conseguir se mover hoje." },
      { min: 4, texto: "Aumente um pouco o ritmo. Agradeça por uma pessoa que esteve com você este ano. Diga o nome dela em voz baixa." },
      { min: 8, texto: "Ritmo firme. Agradeça por algo difícil que você atravessou. Você ainda está aqui." },
      { min: 12, texto: "Mantenha o ritmo. Agradeça por algo simples: comida na mesa, uma cama, água." },
      { min: 16, texto: "Comece a desacelerar. Termine com uma frase: Pai, obrigado. Eu não estou sozinho." },
    ],
  },
  {
    id: "salmo-23", titulo: "Esteira com o Salmo 23", minutos: 15, tipo: "palavra",
    descricao: "Um versículo a cada 3 minutos. Leia, repita e deixe a frase acompanhar o passo.",
    falas: [
      { min: 0, texto: "“O SENHOR é meu pastor, nada me faltará.” Repita no ritmo do passo." },
      { min: 3, texto: "“Ele me faz deitar em pastos verdes, e me leva a águas quietas.” Solte os ombros. Respire fundo." },
      { min: 6, texto: "“Ele restaura minha alma, e me guia pelos caminhos da justiça por seu nome.” Aumente um pouco a velocidade." },
      { min: 9, texto: "Pense em um vale que você está atravessando. Ele não pede que você passe sozinho." },
      { min: 12, texto: "Desacelere. Agradeça por ter um Pastor. Termine o cardio em paz." },
    ],
  },
  {
    id: "pelos-meus", titulo: "Oração pelos meus", minutos: 20, tipo: "oracao",
    descricao: "Interceda por quem está perto de você enquanto o corpo trabalha.",
    falas: [
      { min: 0, texto: "Aquecimento. Ore por você: peça força para ser o homem que sua casa precisa." },
      { min: 4, texto: "Ore pela sua família, um por um, pelo nome." },
      { min: 8, texto: "Ore por um amigo que está passando por um momento difícil." },
      { min: 12, texto: "Agora o mais difícil: ore por alguém com quem você está em conflito." },
      { min: 16, texto: "Desacelere. Entregue tudo o que você pediu e termine em silêncio." },
    ],
  },
  {
    id: "silencio", titulo: "Silêncio e respiração", minutos: 10, tipo: "silencio",
    descricao: "Sem fone, sem música. Só respiração e uma frase curta.",
    falas: [
      { min: 0, texto: "Tire o fone. Respire em 4 tempos, segure 2, solte em 6." },
      { min: 3, texto: "Ao inspirar, pense: Abba. Ao soltar: Pai." },
      { min: 7, texto: "Fique em silêncio. Não precisa dizer nada. Ele já sabe." },
    ],
  },
];

export const cardio = (id: string) => CARDIOS.find((c) => c.id === id) ?? null;
