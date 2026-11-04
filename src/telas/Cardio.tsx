import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Headphones, Pause, Play } from "lucide-react";
import { novoId, useApp } from "../lib/estado";
import { CARDIOS, cardio } from "../conteudo/cardio";
import { ir } from "../App";

const TIPO = { oracao: "Oração guiada", palavra: "Palavra", silencio: "Silêncio" } as const;

export function Cardio() {
  const { e } = useApp();
  const feitos = (id: string) => e.cardios.filter((c) => c.sessao === id).length;
  return (
    <div className="px-4 pt-6">
      <h1 className="titulo text-[30px]">Cardio de oração</h1>
      <p className="mt-1 max-w-[40ch] text-[15px] text-suave">Caminhada, esteira ou bike. O corpo trabalha e a cabeça tem com quem conversar.</p>

      <div className="mt-5 flex flex-col gap-3">
        {CARDIOS.map((c) => (
          <a key={c.id} href={"#/cardio/" + c.id} className="papel flex items-center gap-4 px-4 py-4">
            <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-ceu text-azul">
              <span className="numero text-[20px] leading-none">{c.minutos}</span>
              <span className="text-[10px] font-semibold">min</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-[12px] font-semibold text-azul">{TIPO[c.tipo]}</span>
              <span className="block text-[16px] font-semibold leading-snug">{c.titulo}</span>
              <span className="line-clamp-2 text-[13px] text-suave">{c.descricao}</span>
            </span>
            {feitos(c.id) > 0 && <span className="shrink-0 rounded-full bg-ceu px-2 py-0.5 text-[11px] font-semibold text-azul">{feitos(c.id)}×</span>}
            <ChevronRight size={20} className="shrink-0 text-fraco" />
          </a>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-ceu px-4 py-3 text-[13px] text-tinta">
        <Headphones size={18} className="mt-0.5 shrink-0 text-azul" />
        Os áudios gravados pelo Diogo estão em produção. Por enquanto, cada sessão guia você com textos que mudam no minuto certo.
      </p>
    </div>
  );
}

export function CardioGuiado({ id }: { id: string }) {
  const { addCardio } = useApp();
  const s = cardio(id);
  const [inicio, setInicio] = useState<number | null>(null);
  const [pausadoEm, setPausadoEm] = useState<number | null>(null);
  const [acumulado, setAcumulado] = useState(0);
  const [agora, setAgora] = useState(Date.now());
  const ultimaFala = useRef(-1);

  useEffect(() => { const iv = setInterval(() => setAgora(Date.now()), 500); return () => clearInterval(iv); }, []);
  const seg = inicio == null ? 0 : Math.floor((acumulado + ((pausadoEm ?? agora) - inicio)) / 1000);
  const min = seg / 60;
  const idxFala = s ? s.falas.reduce((m, f, i) => (min >= f.min ? i : m), 0) : 0;

  useEffect(() => {
    if (inicio != null && idxFala !== ultimaFala.current) { if (ultimaFala.current >= 0) try { navigator.vibrate?.(120); } catch { /* */ } ultimaFala.current = idxFala; }
  }, [idxFala, inicio]);

  if (!s) return <p className="p-8">Sessão não encontrada.</p>;
  const fala = s.falas[idxFala]!;
  const prox = s.falas[idxFala + 1];
  const fim = seg >= s.minutos * 60;
  const rodando = inicio != null && pausadoEm == null;

  function alternar() {
    if (inicio == null) { setInicio(Date.now()); return; }
    if (pausadoEm == null) setPausadoEm(Date.now());
    else { setAcumulado((a) => a + (pausadoEm - inicio)); setInicio(Date.now()); setPausadoEm(null); }
  }
  function concluir() {
    addCardio({ id: novoId(), sessao: s!.id, data: new Date().toISOString(), minutos: Math.max(1, Math.round(seg / 60)) });
    ir("/cardio");
  }

  return (
    <div className="ceu-noite flex min-h-tela flex-col">
      <div className="h-1 w-full bg-white/10"><div className="h-full bg-white transition-[width] duration-500" style={{ width: `${Math.min(1, seg / (s.minutos * 60)) * 100}%` }} /></div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-3 pb-8">
        <div className="flex h-12 items-center">
          <a href="#/cardio" aria-label="Voltar" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"><ChevronLeft size={22} /></a>
          <p className="flex-1 truncate text-[14px] font-semibold text-white/80">{s.titulo}</p>
        </div>

        <p role="timer" className="numero mt-6 text-[64px] leading-none">{Math.floor(seg / 60)}:{String(seg % 60).padStart(2, "0")}</p>
        <p className="mt-1 text-[13px] text-white/60">de {s.minutos} minutos{pausadoEm != null ? ", pausado" : ""}</p>

        <div className="flex flex-1 flex-col justify-center py-8">
          {inicio == null ? (
            <p className="palavra text-[25px] text-white/90">{s.descricao}</p>
          ) : (
            <p key={idxFala} className="palavra amanhecer text-[27px] leading-[1.3]">{fala.texto}</p>
          )}
          {inicio != null && prox && <p className="mt-6 text-[13px] text-white/50">Próxima fala aos {prox.min} minutos</p>}
        </div>

        {fim || (inicio != null && seg > 60) ? (
          <div className="flex gap-2">
            {!fim && <button onClick={alternar} aria-label={rodando ? "Pausar" : "Continuar"} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">{rodando ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>}
            <button className="botao-claro flex-1" onClick={concluir}>Concluir cardio</button>
          </div>
        ) : (
          <button className="botao-claro w-full" onClick={alternar}>
            {inicio == null ? <><Play size={18} fill="currentColor" /> Começar</> : rodando ? <><Pause size={18} fill="currentColor" /> Pausar</> : <><Play size={18} fill="currentColor" /> Continuar</>}
          </button>
        )}
      </div>
    </div>
  );
}
