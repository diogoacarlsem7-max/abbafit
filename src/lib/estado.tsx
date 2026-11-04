// Estado do app. Nesta primeira versão tudo fica guardado no próprio celular (localStorage).
// A troca para o banco (Supabase) acontece aqui, sem mexer nas telas.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Etapa = "conhecendo" | "recomecando" | "caminhando";
export type Objetivo = "massa" | "gordura" | "condicionamento" | "voltar";

export type Perfil = {
  nome: string;
  email?: string;
  objetivo: Objetivo;
  local: "academia" | "casa";
  trilha: "conhecer" | "caminhar";
  /** Etapa da caminhada com Deus. Só é guardada com consentimento (dado sensível pela LGPD). */
  etapa: Etapa | null;
  desde: number | null;
  consentimentoFe: string | null;
  porque: string;
  cidade: string;
  igreja: string;
  versiculo: string | null;
  foto: string | null;
  criadoEm: string;
};

export type SerieFeita = { kg: number | null; reps: number | null; feita: boolean };
export type Registro = {
  id: string; dia: string; titulo: string; inicio: string; fim: string;
  exercicios: { exercicio: number; series: SerieFeita[] }[];
  cartoes: string[];
};
export type CardioFeito = { id: string; sessao: string; data: string; minutos: number };
export type LeituraFeita = { data: string; resposta: string };

export type Estado = {
  perfil: Perfil | null;
  registros: Registro[];
  cardios: CardioFeito[];
  leituras: Record<string, LeituraFeita>;
  salvos: string[];
};

const CHAVE = "abbafit-v1";
const VAZIO: Estado = { perfil: null, registros: [], cardios: [], leituras: {}, salvos: [] };

export function lerLocal<T>(chave: string): T | null {
  try { const t = localStorage.getItem(chave); return t ? (JSON.parse(t) as T) : null; } catch { return null; }
}
export function gravarLocal(chave: string, v: unknown) {
  try { if (v == null) localStorage.removeItem(chave); else localStorage.setItem(chave, JSON.stringify(v)); } catch { /* navegação privada */ }
}
export const novoId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

type Ctx = {
  e: Estado;
  salvarPerfil: (p: Perfil) => void;
  addRegistro: (r: Registro) => void;
  addCardio: (c: CardioFeito) => void;
  marcarLeitura: (id: string, resposta: string) => void;
  alternarSalvo: (cartao: string) => void;
  apagarTudo: () => void;
};
const C = createContext<Ctx | null>(null);

export function ProvedorEstado({ children }: { children: ReactNode }) {
  const [e, setE] = useState<Estado>(() => ({ ...VAZIO, ...(lerLocal<Estado>(CHAVE) || {}) }));
  useEffect(() => { gravarLocal(CHAVE, e); }, [e]);

  const salvarPerfil = useCallback((p: Perfil) => setE((x) => ({ ...x, perfil: p })), []);
  const addRegistro = useCallback((r: Registro) => setE((x) => ({ ...x, registros: [r, ...x.registros] })), []);
  const addCardio = useCallback((c: CardioFeito) => setE((x) => ({ ...x, cardios: [c, ...x.cardios] })), []);
  const marcarLeitura = useCallback((id: string, resposta: string) => setE((x) => ({ ...x, leituras: { ...x.leituras, [id]: { data: new Date().toISOString(), resposta } } })), []);
  const alternarSalvo = useCallback((c: string) => setE((x) => ({ ...x, salvos: x.salvos.includes(c) ? x.salvos.filter((s) => s !== c) : [c, ...x.salvos] })), []);
  const apagarTudo = useCallback(() => { gravarLocal(CHAVE, null); gravarLocal(CHAVE_ANDAMENTO, null); setE(VAZIO); location.hash = "/"; }, []);

  const v = useMemo(() => ({ e, salvarPerfil, addRegistro, addCardio, marcarLeitura, alternarSalvo, apagarTudo }), [e, salvarPerfil, addRegistro, addCardio, marcarLeitura, alternarSalvo, apagarTudo]);
  return <C.Provider value={v}>{children}</C.Provider>;
}

export function useApp() {
  const v = useContext(C);
  if (!v) throw new Error("ProvedorEstado ausente");
  return v;
}

export const CHAVE_ANDAMENTO = "abbafit-treino-em-andamento";

// ---------- contas ----------
export function inicioDaSemana(d = new Date()) {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}
/** Semanas seguidas (até esta) com pelo menos um treino. */
export function semanasSeguidas(registros: Registro[]) {
  const semanas = new Set(registros.map((r) => +inicioDaSemana(new Date(r.inicio))));
  let n = 0;
  const d = inicioDaSemana();
  if (!semanas.has(+d)) d.setDate(d.getDate() - 7);
  while (semanas.has(+d)) { n++; d.setDate(d.getDate() - 7); }
  return n;
}
export const minutos = (a: string, b: string) => Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 60000));
export const seriesFeitas = (r: Registro) => r.exercicios.reduce((t, x) => t + x.series.filter((s) => s.feita).length, 0);
export const volume = (r: Registro) => r.exercicios.reduce((t, x) => t + x.series.reduce((u, s) => u + (s.feita ? (s.kg || 0) * (s.reps || 0) : 0), 0), 0);
export const fmt0 = (n: number) => Math.round(n).toLocaleString("pt-BR");
export const fmt1 = (n: number) => (Math.round(n * 10) / 10).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
export const primeiroNome = (n: string) => n.trim().split(/\s+/)[0] || n;
