import { useState } from "react";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useApp } from "../lib/estado";
import { leitura, leiturasProntas, trilha, TRILHAS } from "../conteudo/jornada";
import { cartaoPorId } from "../conteudo/versiculos";
import { CartaoPalavra } from "../componentes/CartaoPalavra";
import { Topo, ir } from "../App";

export function Jornada() {
  const { e, salvarPerfil } = useApp();
  const p = e.perfil!;
  const t = trilha(p.trilha);
  const outra = TRILHAS.find((x) => x.id !== t.id)!;

  return (
    <div className="px-4 pt-6">
      <p className="text-[13px] font-semibold text-azul">{t.para}</p>
      <h1 className="titulo mt-1 text-[30px]">Jornada {t.nome}</h1>
      <p className="mt-1 text-[15px] text-suave">Leituras de 3 minutos para fazer antes ou depois do treino.</p>

      <ol className="mt-6 flex flex-col gap-4">
        {t.semanas.map((s, i) => {
          const ls = leiturasProntas(s);
          const pronta = ls.length > 0;
          const feitas = ls.filter((l) => e.leituras[l.id]).length;
          return (
            <li key={i} className={"papel overflow-hidden " + (pronta ? "" : "opacity-70")}>
              <div className="flex items-start gap-4 px-4 pt-4 pb-3">
                <span className={"numero flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[18px] " + (pronta ? "bg-noite text-white" : "bg-fundo text-fraco ring-1 ring-linha")}>{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-suave">Semana {i + 1}{pronta ? `, ${feitas} de ${ls.length} leituras` : ", em breve"}</p>
                  <p className="text-[17px] font-semibold leading-snug">{s.titulo}</p>
                  <p className="text-[13px] text-suave">{s.resumo}</p>
                </div>
              </div>
              {pronta ? (
                <ul className="border-t border-linha">
                  {ls.map((l, d) => {
                    const ok = !!e.leituras[l.id];
                    return (
                      <li key={l.id}>
                        <a href={"#/jornada/" + l.id} className="flex items-center gap-3 border-b border-linha/70 px-4 py-3 last:border-0">
                          <span className={"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold " + (ok ? "bg-azul text-white" : "bg-ceu text-azul")}>{ok ? <Check size={15} strokeWidth={3} /> : d + 1}</span>
                          <span className={"min-w-0 flex-1 truncate text-[15px] " + (ok ? "text-suave" : "font-medium")}>{l.titulo}</span>
                          <ChevronRight size={18} className="text-fraco" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="border-t border-linha px-4 py-2.5">
                  {(s.dias as string[]).map((d) => <li key={d} className="flex items-center gap-2 py-1 text-[13px] text-fraco"><Lock size={12} /> {d}</li>)}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <button onClick={() => salvarPerfil({ ...p, trilha: outra.id })} className="mt-5 mb-2 w-full rounded-2xl border border-dashed border-linha px-4 py-3.5 text-left text-[13px] text-suave">
        Quer trocar de jornada? <span className="font-semibold text-azul">Mudar para {outra.nome}</span>. {outra.para}.
      </button>
    </div>
  );
}

export function LeituraDia({ id }: { id: string }) {
  const { e, marcarLeitura } = useApp();
  const l = leitura(id);
  const [resposta, setResposta] = useState(() => e.leituras[id]?.resposta ?? "");
  if (!l) return <p className="p-8">Leitura não encontrada.</p>;
  const c = cartaoPorId(l.cartao);
  const feita = !!e.leituras[id];

  return (
    <div className="mx-auto max-w-md pb-10">
      <Topo voltar="/jornada" />
      <article className="px-5">
        <h1 className="titulo text-[30px]">{l.titulo}</h1>
        <div className="mt-5 flex flex-col gap-4">
          {l.texto.map((p, i) => <p key={i} className="palavra text-[19px] leading-[1.6] text-tinta">{p}</p>)}
        </div>
        {c && <div className="mt-7"><CartaoPalavra c={c} titulo="A Palavra" /></div>}

        <section className="mt-7 rounded-[22px] bg-ceu p-5">
          <p className="text-[13px] font-semibold text-azul">Para pensar no treino de hoje</p>
          <p className="mt-1.5 text-[17px] font-semibold leading-snug">{l.pergunta}</p>
          <textarea className="campo mt-4 min-h-24 border-transparent py-3 text-[15px]" maxLength={600} placeholder="Escreva se quiser. Só você vê."
            value={resposta} onChange={(ev) => setResposta(ev.target.value)} aria-label="Sua resposta" />
        </section>

        <button className="botao mt-6 w-full" onClick={() => { marcarLeitura(id, resposta.trim()); ir("/jornada"); }}>
          {feita ? "Salvar resposta" : "Concluir leitura"}
        </button>
      </article>
    </div>
  );
}
