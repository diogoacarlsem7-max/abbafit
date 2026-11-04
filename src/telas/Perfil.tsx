import { useState } from "react";
import { Camera, Lock, Pencil } from "lucide-react";
import { primeiroNome, semanasSeguidas, useApp, type Etapa, type Objetivo, type Perfil as TPerfil } from "../lib/estado";
import { MARCOS, cartoesLidos } from "../conteudo/marcos";
import { CARTOES, CREDITO_BIBLIA, cartaoPorId } from "../conteudo/versiculos";
import { Simbolo } from "../componentes/Marca";
import { Compartilhar } from "../componentes/Compartilhar";
import { ETAPAS, Opcao } from "./BoasVindas";
import { Topo, ir } from "../App";

export function Avatar({ tamanho = 40 }: { tamanho?: number }) {
  const { e } = useApp();
  const p = e.perfil;
  if (p?.foto) return <img src={p.foto} alt="" width={tamanho} height={tamanho} className="shrink-0 rounded-full object-cover" style={{ width: tamanho, height: tamanho }} />;
  return (
    <span className="titulo flex shrink-0 items-center justify-center rounded-full bg-azul text-white" style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.42 }}>
      {(p?.nome || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

export function textoCaminhada(p: TPerfil) {
  if (p.etapa === "conhecendo") return "Conhecendo a Deus";
  if (p.etapa === "recomecando") return "Recomeçando com Deus";
  if (p.etapa === "caminhando") return p.desde ? `Caminha com Deus desde ${p.desde}` : "Caminha com Deus";
  return null;
}

export function Perfil() {
  const { e, apagarTudo } = useApp();
  const p = e.perfil!;
  const caminhada = textoCaminhada(p);
  const versiculo = cartaoPorId(p.versiculo);
  const salvos = e.salvos.map(cartaoPorId).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <div className="px-4 pt-4">
      <div className="flex justify-end">
        <a href="#/perfil/editar" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-azul ring-1 ring-linha"><Pencil size={14} /> Editar perfil</a>
      </div>

      <section className="mt-2 flex flex-col items-center text-center">
        <Avatar tamanho={96} />
        <h1 className="titulo mt-4 text-[28px]">{p.nome}</h1>
        {caminhada && <p className="mt-2 inline-flex rounded-full bg-ceu px-3 py-1 text-[13px] font-semibold text-azul">{caminhada}</p>}
        {(p.cidade || p.igreja) && <p className="mt-2 text-[13px] text-suave">{[p.cidade, p.igreja].filter(Boolean).join(", ")}</p>}
        {p.porque && <p className="palavra mt-4 max-w-[30ch] text-[19px] italic text-tinta">“{p.porque}”</p>}
        <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-fraco"><Lock size={12} /> Perfil privado, só você vê</p>
      </section>

      <section className="papel mt-6 grid grid-cols-4 divide-x divide-linha py-4 text-center" aria-label="Seus números">
        <Num v={e.registros.length} l="treinos" />
        <Num v={semanasSeguidas(e.registros)} l="semanas seguidas" />
        <Num v={cartoesLidos(e)} l="palavras" />
        <Num v={e.cardios.length} l="cardios" />
      </section>

      {versiculo && (
        <section className="mt-4 rounded-[22px] bg-white px-5 py-4 ring-1 ring-linha">
          <p className="text-[13px] font-semibold text-azul">Versículo da vida</p>
          <p className="palavra mt-1.5 text-[18px]">“{versiculo.texto}”</p>
          <p className="mt-1.5 text-[13px] font-semibold text-suave">{versiculo.ref}</p>
        </section>
      )}

      <section className="mt-7">
        <h2 className="titulo text-[20px]">Marcos</h2>
        <ul className="mt-3 grid grid-cols-2 gap-2.5">
          {MARCOS.map((m) => {
            const ok = m.atingido(e);
            const [v, alvo] = m.progresso(e);
            return ok ? (
              <li key={m.id} className="ceu-noite flex flex-col rounded-[20px] p-4">
                <Simbolo tamanho={30} fundo="#ffffff" traco="#081335" />
                <p className="mt-3 text-[15px] font-semibold leading-snug">{m.titulo}</p>
                <p className="mt-0.5 text-[12px] text-white/65">{m.descricao}</p>
                <div className="flex-1" />
                <Compartilhar pequeno titulo={m.titulo} linha={m.descricao} cartao={versiculo} />
              </li>
            ) : (
              <li key={m.id} className="flex flex-col rounded-[20px] bg-white p-4 ring-1 ring-linha">
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] border-[1.5px] border-dashed border-linha" />
                <p className="mt-3 text-[15px] font-semibold leading-snug text-suave">{m.titulo}</p>
                <div className="flex-1" />
                <div className="mt-3 h-1.5 rounded-full bg-fundo"><div className="h-full rounded-full bg-azul/60" style={{ width: `${(v / alvo) * 100}%` }} /></div>
                <p className="mt-1 text-[11px] text-fraco">{v} de {alvo}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-7">
        <h2 className="titulo text-[20px]">Versículos salvos</h2>
        {salvos.length ? (
          <ul className="mt-3 flex flex-col gap-2">
            {salvos.map((c) => (
              <li key={c.id} className="papel px-4 py-3">
                <p className="palavra text-[16px]">“{c.texto}”</p>
                <p className="mt-1 text-[12px] font-semibold text-azul">{c.ref}</p>
              </li>
            ))}
          </ul>
        ) : <p className="mt-2 text-[14px] text-suave">Toque no marcador de um versículo, no descanso ou na palavra do dia, para guardar aqui.</p>}
      </section>

      <section className="mt-8 mb-4 rounded-[22px] bg-white px-5 py-4 ring-1 ring-linha">
        <h2 className="text-[15px] font-semibold">Seus dados</h2>
        <p className="mt-1 text-[13px] text-suave">Nesta versão de teste, tudo fica guardado só neste celular. {p.consentimentoFe ? "Você autorizou guardar sua etapa na caminhada com Deus em " + new Date(p.consentimentoFe).toLocaleDateString("pt-BR") + "." : ""}</p>
        <button className="mt-3 text-[13px] font-semibold text-red-600" onClick={() => { if (confirm("Apagar seu perfil, treinos e leituras deste celular?")) apagarTudo(); }}>Apagar meus dados</button>
        <p className="mt-4 text-[11px] text-fraco">{CREDITO_BIBLIA}</p>
      </section>
    </div>
  );
}

function Num({ v, l }: { v: number; l: string }) {
  return (
    <div className="px-1">
      <p className="numero text-[24px] leading-none">{v}</p>
      <p className="mt-1 text-[11px] leading-tight text-suave">{l}</p>
    </div>
  );
}

/** Reduz a foto para 320 px antes de guardar. */
function lerFoto(f: File): Promise<string> {
  return new Promise((ok, erro) => {
    const img = new Image();
    img.onload = () => {
      const s = 320, cv = document.createElement("canvas"); cv.width = s; cv.height = s;
      const c = cv.getContext("2d")!; const m = Math.min(img.width, img.height);
      c.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
      ok(cv.toDataURL("image/jpeg", 0.85)); URL.revokeObjectURL(img.src);
    };
    img.onerror = () => erro(new Error("Não consegui abrir essa imagem."));
    img.src = URL.createObjectURL(f);
  });
}

const OBJ: { v: Objetivo; l: string }[] = [{ v: "massa", l: "Ganhar massa" }, { v: "gordura", l: "Perder gordura" }, { v: "condicionamento", l: "Condicionamento" }, { v: "voltar", l: "Voltar a treinar" }];

export function EditarPerfil() {
  const { e, salvarPerfil } = useApp();
  const [p, setP] = useState<TPerfil>(e.perfil!);
  const [etapa, setEtapa] = useState<Etapa | "nao">(p.etapa ?? "nao");
  const [consente, setConsente] = useState(!!p.consentimentoFe);
  const [erro, setErro] = useState("");
  const set = (x: Partial<TPerfil>) => setP((a) => ({ ...a, ...x }));

  function salvar() {
    const comFe = etapa !== "nao" && consente ? etapa : null;
    salvarPerfil({ ...p, nome: p.nome.trim() || e.perfil!.nome, etapa: comFe, desde: comFe === "caminhando" ? p.desde : null, consentimentoFe: comFe ? (p.consentimentoFe ?? new Date().toISOString()) : null });
    ir("/perfil");
  }

  return (
    <div className="mx-auto max-w-md pb-10">
      <Topo voltar="/perfil" titulo="Editar perfil" />
      <div className="flex flex-col gap-6 px-5 pt-2">
        <label className="flex cursor-pointer items-center gap-4">
          <span className="relative"><Avatar tamanho={72} /><span className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-azul ring-1 ring-linha"><Camera size={15} /></span></span>
          <span className="text-[14px] font-semibold text-azul">Trocar foto</span>
          <input type="file" accept="image/*" className="sr-only" onChange={async (ev) => { const f = ev.target.files?.[0]; if (!f) return; try { const foto = await lerFoto(f); set({ foto }); salvarPerfil({ ...p, foto }); } catch (x) { setErro((x as Error).message); } }} />
        </label>
        {erro && <p role="alert" className="text-[13px] text-red-600">{erro}</p>}

        <Campo rotulo="Nome"><input className="campo" value={p.nome} onChange={(ev) => set({ nome: ev.target.value })} /></Campo>
        <Campo rotulo="Por que eu treino"><textarea className="campo min-h-20 py-3" maxLength={140} value={p.porque} onChange={(ev) => set({ porque: ev.target.value })} /></Campo>
        <div className="grid grid-cols-2 gap-3">
          <Campo rotulo="Cidade" opcional><input className="campo" value={p.cidade} onChange={(ev) => set({ cidade: ev.target.value })} /></Campo>
          <Campo rotulo="Igreja" opcional><input className="campo" value={p.igreja} onChange={(ev) => set({ igreja: ev.target.value })} /></Campo>
        </div>
        <Campo rotulo="Objetivo">
          <select className="campo" value={p.objetivo} onChange={(ev) => set({ objetivo: ev.target.value as Objetivo })}>
            {OBJ.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </Campo>
        <Campo rotulo="Versículo da vida" opcional>
          <select className="campo" value={p.versiculo ?? ""} onChange={(ev) => set({ versiculo: ev.target.value || null })}>
            <option value="">Nenhum</option>
            {CARTOES.map((c) => <option key={c.id} value={c.id}>{c.ref}</option>)}
          </select>
        </Campo>

        <div>
          <p className="mb-2 text-sm font-semibold">Minha caminhada com Deus</p>
          <div className="flex flex-col gap-2">
            {ETAPAS.map((o) => <Opcao key={o.v} ativa={etapa === o.v} titulo={o.l} texto={o.d} onClick={() => setEtapa(o.v)} />)}
          </div>
          {etapa === "caminhando" && (
            <input className="campo mt-3" inputMode="numeric" maxLength={4} placeholder="Desde que ano? (opcional)" value={p.desde ?? ""} onChange={(ev) => { const v = ev.target.value.replace(/\D/g, ""); set({ desde: v.length === 4 ? Number(v) : null }); }} />
          )}
          {etapa !== "nao" && (
            <label className="mt-3 flex cursor-pointer gap-3 rounded-2xl bg-ceu p-4">
              <input type="checkbox" checked={consente} onChange={(ev) => setConsente(ev.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#1d3fd6]" />
              <span className="text-[13px] leading-relaxed">Autorizo guardar essa informação no meu perfil. Ela fica privada e posso apagar quando quiser.</span>
            </label>
          )}
        </div>

        <button className="botao w-full" onClick={salvar}>Salvar perfil</button>
        <p className="-mt-2 text-center text-[12px] text-fraco">Perfil público e seguidores chegam numa próxima versão. {primeiroNome(p.nome)}, por enquanto só você vê.</p>
      </div>
    </div>
  );
}

function Campo({ rotulo, opcional, children }: { rotulo: string; opcional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{rotulo} {opcional && <span className="font-normal text-fraco">(opcional)</span>}</span>
      {children}
    </label>
  );
}
