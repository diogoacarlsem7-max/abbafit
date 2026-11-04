import { programa, type Dia } from "../conteudo/treinos";
import { trilha, leiturasProntas, type Leitura } from "../conteudo/jornada";
import { CHAVE_ANDAMENTO, inicioDaSemana, lerLocal, type Estado, type SerieFeita } from "./estado";

export type Andamento = { letra: string; inicio: string; idx: number; series: Record<number, SerieFeita[]>; cartoes: string[] };
export const andamentoSalvo = () => lerLocal<Andamento>(CHAVE_ANDAMENTO);

/** Próximo treino da sequência A → B → C. */
export function proximoDia(e: Estado): Dia {
  const p = programa(e.perfil?.local);
  const ult = e.registros[0];
  if (!ult) return p.dias[0]!;
  const i = p.dias.findIndex((d) => d.letra === ult.dia);
  return p.dias[(i + 1) % p.dias.length]!;
}

export function diasTreinadosNaSemana(e: Estado): Set<number> {
  const ini = +inicioDaSemana();
  const s = new Set<number>();
  for (const r of e.registros) { const d = new Date(r.inicio); if (+d >= ini) s.add((d.getDay() + 6) % 7); }
  return s;
}

/** Próxima leitura da jornada ainda não feita (só as que já têm conteúdo). */
export function proximaLeitura(e: Estado): { leitura: Leitura; semana: number; dia: number; total: number } | null {
  const t = trilha(e.perfil?.trilha);
  for (let s = 0; s < t.semanas.length; s++) {
    const ls = leiturasProntas(t.semanas[s]!);
    for (let d = 0; d < ls.length; d++) if (!e.leituras[ls[d]!.id]) return { leitura: ls[d]!, semana: s, dia: d, total: ls.length };
  }
  return null;
}

export function saudacao(d = new Date()) {
  const h = d.getHours();
  return h < 5 ? "Boa noite" : h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
}
