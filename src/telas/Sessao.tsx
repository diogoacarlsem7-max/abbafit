import { useEffect, useRef, useState } from "react";
import { Bookmark, Check, ChevronLeft, ChevronRight, Pause, Play, Timer, X } from "lucide-react";
import { CHAVE_ANDAMENTO, fmt0, fmt1, gravarLocal, minutos, novoId, seriesFeitas, useApp, volume, type Registro, type SerieFeita } from "../lib/estado";
import { andamentoSalvo, type Andamento } from "../lib/treino";
import { exercicio, programa, youtubeCapa, youtubeEmbed, youtubeId, type Item } from "../conteudo/treinos";
import { cartaoPorId, escolherCartao, type Cartao, type Momento } from "../conteudo/versiculos";
import { MARCOS } from "../conteudo/marcos";
import { ir } from "../App";
import { Compartilhar } from "../componentes/Compartilhar";

/** "8–10" -> 10; "12" -> 12; "40 s" / "máximo" -> null */
const topoReps = (r: string) => { if (/s\s*$|m[aá]x/i.test(r.trim())) return null; const n = r.match(/\d+/g); return n ? Number(n[n.length - 1]) : null; };
const num = (v: string) => { const n = Number(v.replace(",", ".")); return v.trim() === "" || !Number.isFinite(n) ? null : n; };

/** Última vez que fez esse exercício. */
function ultimaVez(registros: Registro[], id: number) {
  for (const r of registros) { const x = r.exercicios.find((y) => y.exercicio === id); if (x && x.series.some((s) => s.feita && s.kg)) return x; }
  return null;
}

export function Sessao({ letra }: { letra: string }) {
  const { e, addRegistro } = useApp();
  const dia = programa(e.perfil?.local).dias.find((d) => d.letra === letra);
  const [and, setAnd] = useState<Andamento | null>(null);
  const [descanso, setDescanso] = useState<{ total: number; proximo: string; cartao: Cartao } | null>(null);
  const [concluido, setConcluido] = useState<{ r: Registro; antes: string[] } | null>(null);

  useEffect(() => {
    if (!dia) return;
    const salvo = andamentoSalvo();
    if (salvo && salvo.letra === letra) { setAnd(salvo); return; }
    const series: Record<number, SerieFeita[]> = {};
    for (const it of dia.itens) {
      const u = ultimaVez(e.registros, it.exercicio);
      series[it.exercicio] = Array.from({ length: it.series }, (_, k) => ({ kg: u?.series[k]?.kg ?? u?.series[u.series.length - 1]?.kg ?? null, reps: null, feita: false }));
    }
    setAnd({ letra, inicio: new Date().toISOString(), idx: 0, series, cartoes: [] });
  }, [letra]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (and && !concluido) gravarLocal(CHAVE_ANDAMENTO, and); }, [and, concluido]);

  // tela ligada durante o treino
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
    nav.wakeLock?.request("screen").then((l) => { lock = l; }).catch(() => {});
    return () => { lock?.release().catch(() => {}); };
  }, []);

  if (concluido) return <Concluido r={concluido.r} antes={concluido.antes} />;
  if (!dia) return <p className="p-8 text-center">Treino não encontrado. <a className="text-azul underline" href="#/treinar">Ver treinos</a></p>;
  if (!and) return null;

  const idx = Math.min(and.idx, dia.itens.length - 1);
  const it = dia.itens[idx]!;
  const ex = exercicio(it.exercicio);
  const series = and.series[it.exercicio] || [];
  const ultimo = idx === dia.itens.length - 1;
  const u = ultimaVez(e.registros, it.exercicio);

  const mudarSerie = (k: number, p: Partial<SerieFeita>) =>
    setAnd((a) => (a ? { ...a, series: { ...a.series, [it.exercicio]: (a.series[it.exercicio] || []).map((s, j) => (j === k ? { ...s, ...p } : s)) } } : a));
  const irPara = (i: number) => { setAnd((a) => (a ? { ...a, idx: i } : a)); window.scrollTo(0, 0); };

  /** Que palavra combina com este descanso. */
  function momento(k: number, reps: number | null): Momento {
    const meta = topoReps(it.reps);
    if (!and!.cartoes.length) return "comeco";
    if (meta != null && reps != null && reps < meta) return "falha";
    if (ultimo || idx === dia!.itens.length - 2 && k === series.length - 1) return "reta-final";
    if (it.descanso >= 90) return "pesado";
    return and!.cartoes.length % 3 === 2 ? "constancia" : "descanso";
  }

  function abrirDescanso(k: number, reps: number | null, proximo: string) {
    const c = escolherCartao(momento(k, reps), and!.cartoes);
    setAnd((a) => (a ? { ...a, cartoes: [...a.cartoes, c.id] } : a));
    setDescanso({ total: it.descanso, proximo, cartao: c });
  }

  function marcar(k: number) {
    const s = series[k]!;
    if (s.feita) { mudarSerie(k, { feita: false }); return; }
    const reps = s.reps ?? topoReps(it.reps);
    mudarSerie(k, { feita: true, reps });
    const ultimaSerie = k === series.length - 1;
    if (ultimo && ultimaSerie) return;
    const prox: Item = ultimaSerie ? dia!.itens[idx + 1]! : it;
    const nSerie = ultimaSerie ? 1 : k + 2;
    if (it.descanso > 0) abrirDescanso(k, s.reps, `${exercicio(prox.exercicio).nome}, série ${nSerie} de ${prox.series}`);
  }

  function concluir() {
    if (!and || !dia) return;
    const feitas = Object.values(and.series).flat().filter((s) => s.feita).length;
    if (!feitas && !confirm("Você não marcou nenhuma série. Concluir mesmo assim?")) return;
    const antes = MARCOS.filter((m) => m.atingido(e)).map((m) => m.id);
    const r: Registro = {
      id: novoId(), dia: dia.letra, titulo: dia.titulo, inicio: and.inicio, fim: new Date().toISOString(),
      exercicios: dia.itens.map((x) => ({ exercicio: x.exercicio, series: and.series[x.exercicio] || [] })), cartoes: and.cartoes,
    };
    addRegistro(r);
    gravarLocal(CHAVE_ANDAMENTO, null);
    setConcluido({ r, antes });
  }

  function sair() {
    const algo = Object.values(and!.series).flat().some((s) => s.feita);
    if (!algo || confirm("Sair e descartar este treino? Para pausar e voltar depois, use a seta de voltar.")) { gravarLocal(CHAVE_ANDAMENTO, null); ir("/treinar"); }
  }

  const top = u?.series.filter((s) => s.feita && s.kg).reduce((m, s) => ((s.kg || 0) > (m?.kg || 0) ? s : m), null as SerieFeita | null);

  return (
    <div className="flex min-h-tela flex-col bg-fundo">
      <Video key={it.exercicio} nome={ex.nome} url={ex.video}>
        <a href="#/" aria-label="Pausar e voltar ao início" className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-tinta"><ChevronLeft size={22} /></a>
        <button onClick={sair} aria-label="Descartar treino" className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-tinta"><X size={20} /></button>
      </Video>

      {/* progresso do treino: um segmento por exercício */}
      <div className="flex gap-1 px-5 pt-4" aria-label={`Exercício ${idx + 1} de ${dia.itens.length}`}>
        {dia.itens.map((x, i) => {
          const done = (and.series[x.exercicio] || []).every((s) => s.feita);
          return <button key={i} onClick={() => irPara(i)} aria-label={`Ir para o exercício ${i + 1}`} className={"h-1.5 flex-1 rounded-full " + (i === idx ? "bg-azul" : done ? "bg-azul/45" : "bg-linha")} />;
        })}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-6">
        <div>
          <p className="text-[13px] font-semibold text-azul">Treino {dia.letra}, exercício {idx + 1} de {dia.itens.length}</p>
          <h1 className="titulo mt-1 text-[26px]">{ex.nome}</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-suave">{ex.dica}</p>
        </div>

        <p className="rounded-2xl bg-ceu px-4 py-3 text-[13px] text-tinta">
          {top ? <>Última vez: <b>{fmt1(top.kg || 0)} kg × {top.reps ?? "?"}</b>. Bateu a meta em todas as séries? Suba um pouco a carga.</> : <>Primeira vez neste exercício: comece leve e foque na execução.</>}
        </p>

        <div className="grid grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)_52px] gap-2 px-0.5 pt-1 text-[11px] font-semibold text-suave">
          <span>Série</span><span>Carga (kg)</span><span>Reps (meta {it.reps})</span><span />
        </div>
        {series.map((s, k) => (
          <div key={k} className="grid grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)_52px] items-center gap-2">
            <span className={"numero pl-1 text-[22px] " + (s.feita ? "text-azul" : "text-fraco")}>{k + 1}</span>
            <input aria-label={`Carga da série ${k + 1}`} inputMode="decimal" placeholder="kg" value={s.kg ?? ""} onChange={(ev) => mudarSerie(k, { kg: num(ev.target.value) })}
              className={"h-12 min-w-0 rounded-xl border-[1.5px] text-center text-[16px] font-semibold " + (s.feita ? "border-transparent bg-ceu text-azul" : "border-linha bg-white")} />
            <input aria-label={`Repetições da série ${k + 1}`} inputMode="numeric" placeholder={String(topoReps(it.reps) ?? "")} value={s.reps ?? ""} onChange={(ev) => mudarSerie(k, { reps: num(ev.target.value) })}
              className={"h-12 min-w-0 rounded-xl border-[1.5px] text-center text-[16px] font-semibold " + (s.feita ? "border-transparent bg-ceu text-azul" : "border-linha bg-white")} />
            <button onClick={() => marcar(k)} aria-label={`Marcar série ${k + 1} como feita`} aria-pressed={s.feita}
              className={"flex h-12 w-[52px] items-center justify-center rounded-xl border-[1.5px] transition-colors " + (s.feita ? "border-azul bg-azul text-white" : "border-linha bg-white text-fraco")}>
              <Check size={22} strokeWidth={2.8} />
            </button>
          </div>
        ))}

        <div className="flex-1" />
        <div className="flex gap-2 pt-3">
          {idx > 0 && <button className="botao-sec w-14 shrink-0 px-0" aria-label="Exercício anterior" onClick={() => irPara(idx - 1)}><ChevronLeft size={22} /></button>}
          {it.descanso > 0 && <button className="botao-sec shrink-0 gap-1.5 px-4" aria-label={`Descanso de ${it.descanso} segundos`} onClick={() => abrirDescanso(0, null, ex.nome)}><Timer size={18} /> {it.descanso}s</button>}
          {ultimo
            ? <button className="botao flex-1 px-2" onClick={concluir}>Concluir treino</button>
            : <button className="botao flex-1 px-2" onClick={() => irPara(idx + 1)}>Próximo <ChevronRight size={20} /></button>}
        </div>
      </div>

      {descanso && <Descanso key={descanso.cartao.id + descanso.proximo} {...descanso} aoFechar={() => setDescanso(null)} />}
    </div>
  );
}

function Video({ nome, url, children }: { nome: string; url: string; children: React.ReactNode }) {
  const [tocando, setTocando] = useState(false);
  const vid = youtubeId(url);
  return (
    <div className="relative aspect-[16/10] max-h-[280px] w-full shrink-0 bg-noite">
      {vid && tocando ? (
        <iframe className="absolute inset-0 h-full w-full" src={youtubeEmbed(vid)} title={"Execução: " + nome} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <>
          {vid && <img src={youtubeCapa(vid)} alt="" onError={(ev) => { ev.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover opacity-85" />}
          <div className="absolute inset-0 bg-gradient-to-t from-noite/60 to-transparent" />
          {vid && (
            <button onClick={() => setTocando(true)} aria-label="Assistir vídeo de execução" className="absolute inset-0 m-auto flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white text-azul">
              <Play size={28} fill="currentColor" className="ml-1" />
            </button>
          )}
        </>
      )}
      {children}
    </div>
  );
}

function bip() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const c = new AC(); const o = c.createOscillator(); const g = c.createGain();
    o.frequency.value = 880; o.connect(g); g.connect(c.destination);
    g.gain.setValueAtTime(0.25, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
    o.start(); o.stop(c.currentTime + 0.5);
  } catch { /* sem áudio */ }
  try { navigator.vibrate?.([200, 100, 200]); } catch { /* sem vibração */ }
}

/** O descanso: o céu à noite com a Palavra. É o coração do AbbaFit. */
function Descanso({ total: total0, proximo, cartao, aoFechar }: { total: number; proximo: string; cartao: Cartao; aoFechar: () => void }) {
  const { e, alternarSalvo } = useApp();
  const [total, setTotal] = useState(total0);
  const [fimEm, setFimEm] = useState(() => Date.now() + total0 * 1000);
  const [pausadoCom, setPausadoCom] = useState<number | null>(null);
  const [agora, setAgora] = useState(Date.now());
  const avisou = useRef(false);
  const salvo = e.salvos.includes(cartao.id);

  useEffect(() => { const iv = setInterval(() => setAgora(Date.now()), 250); return () => clearInterval(iv); }, []);
  const resta = pausadoCom ?? Math.max(0, Math.ceil((fimEm - agora) / 1000));
  useEffect(() => {
    if (resta === 0 && !avisou.current) { avisou.current = true; bip(); const t = setTimeout(aoFechar, 1600); return () => clearTimeout(t); }
  }, [resta, aoFechar]);

  const ajustar = (s: number) => {
    if (pausadoCom != null) { const n = Math.max(0, pausadoCom + s); setPausadoCom(n); setTotal((t) => Math.max(t, n)); return; }
    const n = Math.max(0, resta + s); setFimEm(Date.now() + n * 1000); setTotal((t) => Math.max(t, n));
  };
  const alternar = () => { if (pausadoCom != null) { setFimEm(Date.now() + pausadoCom * 1000); setPausadoCom(null); } else setPausadoCom(resta); };
  const frac = total ? resta / total : 0;

  return (
    <div className="ceu-noite fixed inset-x-0 bottom-0 top-[env(safe-area-inset-top)] z-50 flex flex-col" role="dialog" aria-label="Descanso">
      {/* barra do tempo que resta */}
      <div className="h-1 w-full bg-white/10"><div className="h-full bg-white transition-[width] duration-300 ease-linear" style={{ width: `${frac * 100}%` }} /></div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-5 pb-7">
        <div className="flex items-center gap-3">
          <span role="timer" aria-live="off" className="numero text-[54px] leading-none">{resta === 0 ? "Bora" : `${Math.floor(resta / 60)}:${String(resta % 60).padStart(2, "0")}`}</span>
          <span className="flex-1 text-[13px] leading-tight text-white/60">{pausadoCom != null ? "Pausado" : "de descanso"}</span>
          <button onClick={() => ajustar(-15)} aria-label="Tirar 15 segundos" className="h-11 rounded-full bg-white/10 px-3 text-[13px] font-semibold">−15</button>
          <button onClick={alternar} aria-label={pausadoCom != null ? "Continuar" : "Pausar"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
            {pausadoCom != null ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </button>
          <button onClick={() => ajustar(15)} aria-label="Somar 15 segundos" className="h-11 rounded-full bg-white/10 px-3 text-[13px] font-semibold">+15</button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <blockquote key={cartao.id} className="palavra amanhecer text-[27px] leading-[1.28] text-white">“{cartao.texto}”</blockquote>
          <p className="amanhecer mt-4 text-[14px] font-semibold text-luz" style={{ animationDelay: "150ms" }}>{cartao.ref}</p>
          <div className="amanhecer mt-7 border-l-2 border-luz/70 pl-4" style={{ animationDelay: "350ms" }}>
            <p className="text-[13px] font-semibold text-luz">No treino</p>
            <p className="mt-1 text-[17px] leading-relaxed text-white/90">{cartao.treino}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] text-white/55">A seguir</p>
            <p className="truncate text-[14px] font-semibold">{proximo}</p>
          </div>
          <button onClick={() => alternarSalvo(cartao.id)} aria-pressed={salvo} aria-label={salvo ? "Remover dos salvos" : "Salvar versículo"} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Bookmark size={18} fill={salvo ? "currentColor" : "none"} />
          </button>
        </div>
        <button className="botao-claro mt-3 w-full" onClick={aoFechar}>Pular descanso</button>
      </div>
    </div>
  );
}

function Concluido({ r, antes }: { r: Registro; antes: string[] }) {
  const { e } = useApp();
  const novos = MARCOS.filter((m) => m.atingido(e) && !antes.includes(m.id));
  const cartoes = r.cartoes.map(cartaoPorId).filter((c): c is Cartao => !!c);
  return (
    <div className="entrar mx-auto flex min-h-tela max-w-md flex-col px-5 pt-12 pb-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-azul text-white"><Check size={34} strokeWidth={3} /></span>
      <h1 className="titulo mt-6 text-[34px]">Treino {r.dia} concluído</h1>
      <p className="mt-1 text-[15px] text-suave">{r.titulo}</p>

      <div className="papel mt-6 grid grid-cols-3 divide-x divide-linha py-4 text-center">
        <Num v={String(minutos(r.inicio, r.fim))} l="minutos" />
        <Num v={String(seriesFeitas(r))} l="séries" />
        <Num v={fmt0(volume(r))} l="kg de volume" />
      </div>

      {novos.map((m) => (
        <div key={m.id} className="ceu-noite mt-4 rounded-[22px] px-5 py-4">
          <p className="text-[13px] font-semibold text-luz">Novo marco</p>
          <p className="titulo mt-1 text-[22px]">{m.titulo}</p>
          <p className="mt-1 text-[13px] text-white/70">{m.descricao}</p>
        </div>
      ))}

      {cartoes.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[15px] font-semibold">Palavras deste treino {cartoes.length > 3 && <span className="font-normal text-suave">(as 3 últimas de {cartoes.length})</span>}</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {cartoes.slice(-3).map((c, i) => (
              <li key={i} className="papel px-4 py-3">
                <p className="text-[13px] font-semibold text-azul">{c.ref}</p>
                <p className="text-[14px] text-suave">{c.treino}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6"><Compartilhar titulo={novos[0]?.titulo ?? `Treino ${r.dia} concluído`} linha={novos[0] ? novos[0].descricao : `${minutos(r.inicio, r.fim)} minutos, ${seriesFeitas(r)} séries`} cartao={cartoes[cartoes.length - 1] ?? null} /></div>
      <div className="flex-1" />
      <button className="botao-sec mt-4 w-full" onClick={() => ir("/")}>Voltar ao início</button>
    </div>
  );
}

function Num({ v, l }: { v: string; l: string }) {
  return (
    <div>
      <p className="numero text-[26px] leading-none">{v}</p>
      <p className="mt-1 text-[12px] text-suave">{l}</p>
    </div>
  );
}
