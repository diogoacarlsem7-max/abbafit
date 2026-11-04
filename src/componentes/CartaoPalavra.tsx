import { Bookmark } from "lucide-react";
import type { Cartao } from "../conteudo/versiculos";
import { useApp } from "../lib/estado";

/** A Palavra no papel branco: versículo em serifa, e a tradução para o treino logo abaixo. */
export function CartaoPalavra({ c, titulo = "Palavra de hoje" }: { c: Cartao; titulo?: string }) {
  const { e, alternarSalvo } = useApp();
  const salvo = e.salvos.includes(c.id);
  return (
    <section className="papel overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4">
        <p className="text-[13px] font-semibold text-azul">{titulo}</p>
        <button onClick={() => alternarSalvo(c.id)} aria-pressed={salvo} aria-label={salvo ? "Remover dos salvos" : "Salvar versículo"}
          className={"-mr-2 flex h-10 w-10 items-center justify-center rounded-full " + (salvo ? "text-azul" : "text-fraco")}>
          <Bookmark size={19} fill={salvo ? "currentColor" : "none"} />
        </button>
      </div>
      <blockquote className="palavra px-5 pt-1 text-[21px] text-tinta">“{c.texto}”</blockquote>
      <p className="px-5 pt-2 text-[13px] font-semibold text-suave">{c.ref}</p>
      <div className="mt-4 border-t border-linha bg-fundo/60 px-5 py-3.5">
        <p className="text-[14px] leading-relaxed"><span className="font-semibold text-azul">No treino: </span>{c.treino}</p>
      </div>
    </section>
  );
}
