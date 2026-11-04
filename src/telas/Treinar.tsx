import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { useApp } from "../lib/estado";
import { exercicio, minutosDoDia, programa, youtubeCapa, youtubeId } from "../conteudo/treinos";
import { proximoDia } from "../lib/treino";

export function Treinar() {
  const { e, salvarPerfil } = useApp();
  const p = e.perfil!;
  const prog = programa(p.local);
  const prox = proximoDia(e);
  const [aberto, setAberto] = useState<string | null>(prox.letra);

  return (
    <div className="px-4 pt-6">
      <h1 className="titulo text-[30px]">Treinar</h1>
      <p className="mt-1 text-[15px] text-suave">{prog.nome}. {prog.descricao}</p>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-2xl bg-white p-1 ring-1 ring-linha" role="tablist" aria-label="Onde você treina">
        {(["academia", "casa"] as const).map((v) => (
          <button key={v} role="tab" aria-selected={p.local === v} onClick={() => salvarPerfil({ ...p, local: v })}
            className={"h-10 rounded-xl text-[14px] font-semibold " + (p.local === v ? "bg-azul text-white" : "text-suave")}>
            {v === "academia" ? "Academia" : "Em casa"}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {prog.dias.map((d) => {
          const ab = aberto === d.letra;
          return (
            <section key={d.letra} className={"papel overflow-hidden " + (d.letra === prox.letra ? "ring-2 ring-azul/25" : "")}>
              <button onClick={() => setAberto(ab ? null : d.letra)} aria-expanded={ab} className="flex w-full items-center gap-4 px-4 py-4 text-left">
                <span className="titulo flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-noite text-[28px] text-white">{d.letra}</span>
                <span className="min-w-0 flex-1">
                  {d.letra === prox.letra && <span className="text-[12px] font-semibold text-azul">Próximo treino</span>}
                  <span className="block text-[17px] font-semibold leading-snug">{d.titulo}</span>
                  <span className="text-[13px] text-suave">{d.itens.length} exercícios, cerca de {minutosDoDia(d)} min</span>
                </span>
                <ChevronDown size={20} className={"text-fraco transition-transform " + (ab ? "rotate-180" : "")} />
              </button>
              {ab && (
                <div className="entrar border-t border-linha px-4 pt-2 pb-4">
                  <ul>
                    {d.itens.map((it, i) => {
                      const ex = exercicio(it.exercicio);
                      const vid = youtubeId(ex.video);
                      return (
                        <li key={i} className="flex items-center gap-3 border-b border-linha/70 py-2.5 last:border-0">
                          <span className="h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-ceu">{vid && <img src={youtubeCapa(vid)} alt="" onError={(ev) => { ev.currentTarget.style.display = "none"; }} className="h-full w-full object-cover" loading="lazy" />}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold">{ex.nome}</span>
                            <span className="text-[12px] text-suave">{it.series} séries de {it.reps}, descanso {it.descanso}s</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <a href={"#/sessao/" + d.letra} className="botao mt-3 w-full"><Play size={18} fill="currentColor" /> Começar treino {d.letra}</a>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
