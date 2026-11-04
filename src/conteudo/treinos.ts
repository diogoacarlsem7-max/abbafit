// Biblioteca inicial de exercícios (mesmos vídeos da biblioteca do Diogo) e os programas de entrada.

export type Grupo = "peito" | "costas" | "pernas" | "ombros" | "biceps" | "triceps" | "abdomen" | "gluteos";

export type Exercicio = { id: number; nome: string; grupo: Grupo; video: string; dica: string };

export type Item = { exercicio: number; series: number; reps: string; descanso: number };
export type Dia = { letra: string; titulo: string; foco: string; itens: Item[] };
export type Programa = { id: "academia" | "casa"; nome: string; descricao: string; dias: Dia[] };

const E = (id: number, nome: string, grupo: Grupo, video: string, dica: string): Exercicio => ({ id, nome, grupo, video, dica });

export const EXERCICIOS: Exercicio[] = [
  E(3, "Supino reto na máquina", "peito", "https://youtu.be/M4Iagnqx4cg", "Desça até quase encostar no peito. Não encurte a amplitude para pôr mais carga."),
  E(6, "Supino inclinado com halteres", "peito", "https://youtu.be/scFPfYWy92I", "Desça até quase encostar no peito. Não encurte a amplitude para pôr mais carga."),
  E(8, "Crucifixo na máquina (voador)", "peito", "https://youtu.be/zEcIgGm7fxU", "Abra sentindo o peito alongar e feche contraindo. Sem balançar o peso."),
  E(10, "Flexão de braço", "peito", "https://youtu.be/RRi0-tvte6A", "Corpo reto da cabeça aos pés. Desça até quase encostar o peito no chão."),
  E(11, "Flexão inclinada", "peito", "https://youtu.be/GnuYLJ6lqeY", "Mãos num banco ou sofá firme. Corpo reto e desça controlando."),
  E(36, "Desenvolvimento na máquina", "ombros", "https://youtu.be/MqZAjh9zsyo", "Suba sem travar o cotovelo e desça até a linha do queixo."),
  E(39, "Elevação lateral", "ombros", "https://youtu.be/S-xzjHYI_8w", "Suba até a linha do ombro e controle a descida. Sem impulso de tronco."),
  E(38, "Desenvolvimento com halteres", "ombros", "https://youtu.be/J7A8UVbL3kQ", "Suba sem travar o cotovelo e desça até a linha do queixo."),
  E(51, "Tríceps na polia com corda", "triceps", "https://youtu.be/tOTt2w6KX-A", "Cotovelo parado. Estenda 100% e volte segurando a descida."),
  E(55, "Tríceps francês com halteres", "triceps", "https://youtu.be/wk0KBGIrivU", "Cotovelo parado, apontando para cima. Estenda tudo e volte devagar."),
  E(56, "Mergulho no banco", "triceps", "https://youtu.be/qAKB1H2kz2g", "Ombros longe das orelhas. Desça até o cotovelo fazer 90° e suba."),
  E(15, "Puxada máquina neutra", "costas", "https://youtu.be/76zk3CD2JJQ", "Puxe com as costas até o peito, não com o braço. Solte alongando por completo."),
  E(19, "Remada baixa com triângulo", "costas", "https://youtu.be/tHsFuxvkNZY", "Leve o cotovelo para trás e aperte a escápula. Não roube com o tronco."),
  E(21, "Remada serrote (unilateral)", "costas", "https://youtu.be/VoGNKTI5wG8", "Leve o cotovelo para trás e aperte a escápula. Não roube com o tronco."),
  E(92, "Pulldown na polia com corda", "costas", "https://youtu.be/lChEuE0wH3w", "Braços quase estendidos. Leve a corda até as coxas pelas costas."),
  E(23, "Remada curvada com halteres", "costas", "https://youtu.be/aEk2KG_DmOk", "Coluna neutra, tronco inclinado. Puxe os halteres até a cintura."),
  E(47, "Rosca na polia", "biceps", "https://youtu.be/zqklqTcOsbo", "Cotovelo fixo, sem balançar o corpo. Contraia no topo e desça segurando."),
  E(49, "Rosca martelo", "biceps", "https://youtu.be/xvvjkh3Aa4s", "Cotovelo fixo, sem balançar o corpo. Contraia no topo e desça segurando."),
  E(48, "Rosca alternada com halteres", "biceps", "https://youtu.be/Hm0LVX0j7JI", "Cotovelo fixo, sem balançar o corpo. Contraia no topo e desça segurando."),
  E(27, "Leg press 45°", "pernas", "https://youtu.be/fz1panjj5lI", "Desça controlado abaixo dos 90°. Sem trancar o joelho no topo."),
  E(25, "Agachamento na máquina (Smith)", "pernas", "https://youtu.be/OXH8lJ8y2Lk", "Desça controlado abaixo dos 90°. Sem trancar o joelho no topo."),
  E(29, "Cadeira flexora", "pernas", "https://youtu.be/CHsaztLSSrc", "Segure 1 segundo na contração e desça devagar."),
  E(28, "Cadeira extensora", "pernas", "https://youtu.be/Z1ECmSJfiwA", "Segure 1 segundo na contração e desça devagar."),
  E(34, "Panturrilha na máquina", "pernas", "https://youtu.be/oqZSjXBYNcI", "Suba na ponta e alongue lá embaixo. Pausa de 1 segundo em cima."),
  E(35, "Agachamento goblet", "pernas", "https://youtu.be/DF9sXArkDUw", "Halter junto ao peito. Desça controlado abaixo dos 90°."),
  E(81, "Afundo reverso", "pernas", "https://youtu.be/UwugrgY0zJM", "Passo para trás, joelho de trás quase no chão. Suba empurrando com a perna da frente."),
  E(79, "Terra romeno com halteres", "pernas", "https://youtu.be/_3OOH8JzdFE", "Halteres perto das pernas. Quadril para trás com a coluna neutra."),
  E(33, "Panturrilha em pé", "pernas", "https://youtu.be/Exscjanwhng", "Suba na ponta e alongue lá embaixo. Pausa de 1 segundo em cima."),
  E(57, "Prancha isométrica", "abdomen", "https://youtu.be/xDyEdr_FAhA", "Abdômen e glúteo contraídos, quadril na linha. Não deixe a lombar cair."),
  E(60, "Abdominal na máquina", "abdomen", "https://youtu.be/pR7WtwTOOTw", "Encurte a barriga contraindo. Não puxe com o pescoço."),
  E(102, "Dead bug", "abdomen", "https://youtu.be/0loS0bRNqfs", "Lombar colada no chão o tempo todo. Estenda braço e perna opostos devagar."),
];

export const exercicio = (id: number) => EXERCICIOS.find((e) => e.id === id)!;

const I = (exercicio: number, series: number, reps: string, descanso = 75): Item => ({ exercicio, series, reps, descanso });

export const PROGRAMAS: Programa[] = [
  {
    id: "academia", nome: "Base na academia", descricao: "3 treinos por semana, alternando A, B e C.",
    dias: [
      { letra: "A", titulo: "Peito, ombros e tríceps", foco: "Empurrar", itens: [I(3, 4, "8–10", 90), I(6, 3, "10–12"), I(8, 3, "12"), I(36, 3, "10"), I(39, 3, "12–15", 60), I(51, 3, "12", 60)] },
      { letra: "B", titulo: "Costas e bíceps", foco: "Puxar", itens: [I(15, 4, "8–10", 90), I(19, 3, "10–12"), I(21, 3, "10"), I(92, 3, "12", 60), I(47, 3, "12", 60), I(49, 3, "12", 60)] },
      { letra: "C", titulo: "Pernas e abdômen", foco: "Base", itens: [I(27, 4, "10–12", 120), I(25, 3, "8–10", 120), I(29, 3, "12"), I(28, 3, "12"), I(34, 4, "15", 45), I(60, 3, "15", 45)] },
    ],
  },
  {
    id: "casa", nome: "Base em casa", descricao: "3 treinos por semana com halteres e peso do corpo.",
    dias: [
      { letra: "A", titulo: "Peito, ombros e tríceps", foco: "Empurrar", itens: [I(10, 4, "máximo", 75), I(11, 3, "12"), I(38, 3, "10–12"), I(39, 3, "12–15", 60), I(55, 3, "12", 60), I(56, 3, "12", 60)] },
      { letra: "B", titulo: "Costas e bíceps", foco: "Puxar", itens: [I(23, 4, "10–12", 90), I(21, 3, "10"), I(48, 3, "12", 60), I(49, 3, "12", 60), I(57, 3, "40 s", 45)] },
      { letra: "C", titulo: "Pernas e abdômen", foco: "Base", itens: [I(35, 4, "12", 90), I(81, 3, "10 cada", 75), I(79, 3, "12", 75), I(33, 4, "15", 45), I(102, 3, "10 cada", 45)] },
    ],
  },
];

export const programa = (id: string | undefined) => PROGRAMAS.find((p) => p.id === id) ?? PROGRAMAS[0]!;

export function youtubeId(url: string | null | undefined): string | null {
  const m = String(url || "").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1]! : null;
}
export const youtubeCapa = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
export const youtubeEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export const minutosDoDia = (d: Dia) => Math.max(15, Math.round(d.itens.reduce((t, it) => t + it.series * (40 + it.descanso), 0) / 60 / 5) * 5);
