import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, Dumbbell, Footprints, Home, UserRound } from "lucide-react";
import { useApp } from "./lib/estado";
import { BoasVindas } from "./telas/BoasVindas";
import { Inicio } from "./telas/Inicio";
import { Treinar } from "./telas/Treinar";
import { Sessao } from "./telas/Sessao";
import { Cardio, CardioGuiado } from "./telas/Cardio";
import { Jornada, LeituraDia } from "./telas/Jornada";
import { Perfil, EditarPerfil } from "./telas/Perfil";

export function useRota() {
  const [h, setH] = useState(() => location.hash);
  useEffect(() => {
    const f = () => { setH(location.hash); window.scrollTo(0, 0); };
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return h.replace(/^#/, "") || "/";
}
export const ir = (r: string) => { location.hash = r; };

export function App() {
  const { e } = useApp();
  const rota = useRota();
  if (!e.perfil) return <BoasVindas />;

  let tela: ReactNode;
  let menu = true;
  let m: RegExpMatchArray | null;
  if ((m = rota.match(/^\/sessao\/([A-G])$/))) { tela = <Sessao letra={m[1]!} />; menu = false; }
  else if ((m = rota.match(/^\/cardio\/([\w-]+)$/))) { tela = <CardioGuiado id={m[1]!} />; menu = false; }
  else if ((m = rota.match(/^\/jornada\/([\w-]+)$/))) { tela = <LeituraDia id={m[1]!} />; menu = false; }
  else if (rota === "/perfil/editar") { tela = <EditarPerfil />; menu = false; }
  else if (rota.startsWith("/treinar")) tela = <Treinar />;
  else if (rota === "/cardio") tela = <Cardio />;
  else if (rota === "/jornada") tela = <Jornada />;
  else if (rota === "/perfil") tela = <Perfil />;
  else tela = <Inicio />;

  return (
    <>
      <div className={"mx-auto min-h-tela max-w-md " + (menu ? "pb-28" : "")}>{tela}</div>
      {menu && <Menu rota={rota} />}
    </>
  );
}

const ITENS = [
  { r: "/", l: "Início", I: Home },
  { r: "/treinar", l: "Treinar", I: Dumbbell },
  { r: "/cardio", l: "Cardio", I: Footprints },
  { r: "/jornada", l: "Jornada", I: BookOpen },
  { r: "/perfil", l: "Perfil", I: UserRound },
];

function Menu({ rota }: { rota: string }) {
  return (
    <nav aria-label="Menu principal" className="pb-seguro fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-[66px] max-w-md grid-cols-5 px-1">
        {ITENS.map(({ r, l, I }) => {
          const ativo = r === "/" ? rota === "/" : rota.startsWith(r);
          return (
            <a key={r} href={"#" + r} aria-current={ativo ? "page" : undefined}
              className={"relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold " + (ativo ? "text-azul" : "text-fraco")}>
              {ativo && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-azul" />}
              <I size={22} strokeWidth={ativo ? 2.3 : 1.9} />
              {l}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function Topo({ titulo, voltar, direita }: { titulo?: string; voltar?: string; direita?: ReactNode }) {
  return (
    <header className="flex h-14 items-center gap-2 px-4">
      {voltar && (
        <a href={"#" + voltar} aria-label="Voltar" className="-ml-1 flex h-11 w-11 items-center justify-center rounded-full text-tinta hover:bg-ceu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
      )}
      {titulo && <p className="min-w-0 flex-1 truncate text-[15px] font-semibold">{titulo}</p>}
      {!titulo && <span className="flex-1" />}
      {direita}
    </header>
  );
}
