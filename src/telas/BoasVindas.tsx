import { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { useApp, type Etapa, type Objetivo, type Perfil } from "../lib/estado";
import { Capa } from "./Capa";

const OBJETIVOS: { v: Objetivo; l: string; d: string }[] = [
  { v: "massa", l: "Ganhar massa", d: "Ficar mais forte e encorpado" },
  { v: "gordura", l: "Perder gordura", d: "Secar sem perder músculo" },
  { v: "condicionamento", l: "Ganhar condicionamento", d: "Ter fôlego e disposição" },
  { v: "voltar", l: "Voltar a treinar", d: "Retomar depois de um tempo parado" },
];

export const ETAPAS: { v: Etapa | "nao"; l: string; d: string }[] = [
  { v: "conhecendo", l: "Estou conhecendo", d: "Tenho curiosidade e algumas perguntas." },
  { v: "recomecando", l: "Estou recomeçando", d: "Já caminhei com Deus, me afastei e quero voltar." },
  { v: "caminhando", l: "Caminho com Deus", d: "A fé já faz parte da minha vida." },
  { v: "nao", l: "Prefiro não dizer agora", d: "Você pode mudar isso depois, no perfil." },
];

const MOTIVOS = ["Saúde", "Autoestima", "Disciplina", "Ter energia para a família", "Recomeçar"];

export function BoasVindas() {
  const { salvarPerfil } = useApp();
  const [passo, setPasso] = useState(0);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null);
  const [local, setLocal] = useState<"academia" | "casa" | null>(null);
  const [etapa, setEtapa] = useState<Etapa | "nao" | null>(null);
  const [desde, setDesde] = useState("");
  const [consente, setConsente] = useState(false);
  const [porque, setPorque] = useState("");

  if (passo === 0) return <Capa aoInscrever={(em) => { setEmail(em.trim()); setPasso(1); }} />;

  const podeAvancar =
    passo === 1 ? nome.trim().length >= 2 && !!objetivo && !!local :
    passo === 2 ? !!etapa && (etapa === "nao" || consente) :
    true;

  function concluir() {
    const comFe = etapa && etapa !== "nao" ? (etapa as Etapa) : null;
    const p: Perfil = {
      nome: nome.trim(), email, objetivo: objetivo!, local: local!,
      trilha: comFe === "caminhando" ? "caminhar" : "conhecer",
      etapa: comFe, desde: comFe === "caminhando" && /^\d{4}$/.test(desde) ? Number(desde) : null,
      consentimentoFe: comFe ? new Date().toISOString() : null,
      porque: porque.trim(), cidade: "", igreja: "", versiculo: null, foto: null, criadoEm: new Date().toISOString(),
    };
    salvarPerfil(p);
    location.hash = "/";
  }

  return (
    <div className="mx-auto flex min-h-tela max-w-md flex-col px-5 pt-3 pb-6">
      <div className="flex h-12 items-center gap-3">
        <button aria-label="Voltar" onClick={() => setPasso(passo - 1)} className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-ceu"><ChevronLeft size={22} /></button>
        <div className="flex flex-1 gap-1.5" aria-label={`Passo ${passo} de 3`}>
          {[1, 2, 3].map((i) => <span key={i} className={"h-1.5 flex-1 rounded-full " + (i <= passo ? "bg-azul" : "bg-linha")} />)}
        </div>
      </div>

      <div key={passo} className="entrar flex-1 pt-6">
        {passo === 1 && (
          <>
            <h1 className="titulo text-[30px]">Vamos montar seu treino</h1>
            <label className="mt-7 block">
              <span className="mb-2 block text-sm font-semibold">Como podemos te chamar?</span>
              <input className="campo" autoComplete="given-name" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <p className="mt-7 mb-2 text-sm font-semibold">Qual é o seu objetivo agora?</p>
            <div className="flex flex-col gap-2">
              {OBJETIVOS.map((o) => <Opcao key={o.v} ativa={objetivo === o.v} titulo={o.l} texto={o.d} onClick={() => setObjetivo(o.v)} />)}
            </div>
            <p className="mt-7 mb-2 text-sm font-semibold">Onde você vai treinar?</p>
            <div className="grid grid-cols-2 gap-2">
              {(["academia", "casa"] as const).map((v) => (
                <button key={v} onClick={() => setLocal(v)} aria-pressed={local === v}
                  className={"h-14 rounded-2xl border-[1.5px] text-[15px] font-semibold " + (local === v ? "border-azul bg-ceu text-azul" : "border-linha bg-white")}>
                  {v === "academia" ? "Na academia" : "Em casa"}
                </button>
              ))}
            </div>
          </>
        )}

        {passo === 2 && (
          <>
            <h1 className="titulo text-[30px]">Onde você está na caminhada com Deus?</h1>
            <p className="mt-3 text-[15px] text-suave">Não existe resposta certa. Isso só muda a jornada de leituras que acompanha o seu treino.</p>
            <div className="mt-6 flex flex-col gap-2">
              {ETAPAS.map((o) => <Opcao key={o.v} ativa={etapa === o.v} titulo={o.l} texto={o.d} onClick={() => setEtapa(o.v)} />)}
            </div>
            {etapa === "caminhando" && (
              <label className="entrar mt-4 block">
                <span className="mb-2 block text-sm font-semibold">Desde que ano? <span className="font-normal text-suave">(opcional)</span></span>
                <input className="campo" inputMode="numeric" maxLength={4} placeholder="Ex.: 2015" value={desde} onChange={(e) => setDesde(e.target.value.replace(/\D/g, ""))} />
              </label>
            )}
            {etapa && etapa !== "nao" && (
              <label className="entrar mt-5 flex cursor-pointer gap-3 rounded-2xl bg-ceu p-4">
                <input type="checkbox" checked={consente} onChange={(e) => setConsente(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#1d3fd6]" />
                <span className="text-[13px] leading-relaxed text-tinta">
                  Autorizo o AbbaFit a guardar essa informação no meu perfil. Ela fica privada, só eu vejo, e posso apagar quando quiser.
                </span>
              </label>
            )}
          </>
        )}

        {passo === 3 && (
          <>
            <h1 className="titulo text-[30px]">Por que você treina?</h1>
            <p className="mt-3 text-[15px] text-suave">Uma frase sua. Ela aparece no seu perfil e te lembra do motivo nos dias difíceis.</p>
            <textarea className="campo mt-6 min-h-28 py-3" maxLength={140} placeholder="Ex.: Quero ter disposição para brincar com meus filhos." value={porque} onChange={(e) => setPorque(e.target.value)} />
            <div className="mt-3 flex flex-wrap gap-2">
              {MOTIVOS.map((m) => (
                <button key={m} onClick={() => setPorque((p) => (p ? p : m))} className="h-9 rounded-full border border-linha bg-white px-3.5 text-[13px] font-medium text-suave">{m}</button>
              ))}
            </div>
            <p className="mt-6 text-xs text-fraco">Você pode pular e escrever depois.</p>
          </>
        )}
      </div>

      <button className="botao mt-6 w-full" disabled={!podeAvancar} onClick={() => (passo < 3 ? setPasso(passo + 1) : concluir())}>
        {passo < 3 ? "Continuar" : "Entrar no AbbaFit"}
      </button>
    </div>
  );
}

export function Opcao({ ativa, titulo, texto, onClick }: { ativa: boolean; titulo: string; texto: string; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={ativa}
      className={"flex w-full items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3.5 text-left transition-colors " + (ativa ? "border-azul bg-ceu" : "border-linha bg-white")}>
      <span className="min-w-0 flex-1">
        <span className={"block text-[15px] font-semibold " + (ativa ? "text-azul" : "")}>{titulo}</span>
        <span className="block text-[13px] text-suave">{texto}</span>
      </span>
      <span className={"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] " + (ativa ? "border-azul bg-azul text-white" : "border-linha")}>
        {ativa && <Check size={14} strokeWidth={3} />}
      </span>
    </button>
  );
}
