import type { Estado } from "../lib/estado";
import { semanasSeguidas } from "../lib/estado";
import { trilha, leiturasProntas } from "./jornada";

export type Marco = { id: string; titulo: string; descricao: string; tipo: "treino" | "fe" | "cardio"; atingido: (e: Estado) => boolean; progresso: (e: Estado) => [number, number] };

const n = (v: number, alvo: number): [number, number] => [Math.min(v, alvo), alvo];

export const MARCOS: Marco[] = [
  { id: "treino-1", titulo: "Primeiro treino", descricao: "Concluiu o primeiro treino no AbbaFit.", tipo: "treino", atingido: (e) => e.registros.length >= 1, progresso: (e) => n(e.registros.length, 1) },
  { id: "treino-10", titulo: "10 treinos", descricao: "Dez treinos concluídos.", tipo: "treino", atingido: (e) => e.registros.length >= 10, progresso: (e) => n(e.registros.length, 10) },
  { id: "semanas-4", titulo: "Um mês de constância", descricao: "Treinou em 4 semanas seguidas.", tipo: "treino", atingido: (e) => semanasSeguidas(e.registros) >= 4, progresso: (e) => n(semanasSeguidas(e.registros), 4) },
  { id: "treino-50", titulo: "50 treinos", descricao: "Cinquenta treinos concluídos.", tipo: "treino", atingido: (e) => e.registros.length >= 50, progresso: (e) => n(e.registros.length, 50) },
  { id: "cardio-1", titulo: "Primeiro cardio de oração", descricao: "Fez o primeiro cardio guiado.", tipo: "cardio", atingido: (e) => e.cardios.length >= 1, progresso: (e) => n(e.cardios.length, 1) },
  { id: "cardio-10", titulo: "10 cardios de oração", descricao: "Dez cardios guiados concluídos.", tipo: "cardio", atingido: (e) => e.cardios.length >= 10, progresso: (e) => n(e.cardios.length, 10) },
  {
    id: "semana-1", titulo: "Primeira semana da jornada", descricao: "Concluiu todas as leituras da primeira semana.", tipo: "fe",
    atingido: (e) => { const l = leiturasProntas(trilha(e.perfil?.trilha).semanas[0]!); return l.length > 0 && l.every((x) => e.leituras[x.id]); },
    progresso: (e) => { const l = leiturasProntas(trilha(e.perfil?.trilha).semanas[0]!); return n(l.filter((x) => e.leituras[x.id]).length, l.length); },
  },
  { id: "palavras-30", titulo: "30 palavras no descanso", descricao: "Leu 30 cartões da Palavra entre as séries.", tipo: "fe", atingido: (e) => cartoesLidos(e) >= 30, progresso: (e) => n(cartoesLidos(e), 30) },
];

export const cartoesLidos = (e: Estado) => e.registros.reduce((t, r) => t + r.cartoes.length, 0);
export const marcosAtingidos = (e: Estado) => MARCOS.filter((m) => m.atingido(e));
