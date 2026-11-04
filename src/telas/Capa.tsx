import { useLayoutEffect, useRef, useState } from "react";
import { ChevronsRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Simbolo } from "../componentes/Marca";
// Foto da capa (1200 × 1500). Se trocar, ajuste FOTO abaixo com as posições do rosto e das mãos.
import fotoCapa from "../assets/capa.jpg";

/** Onde está a pessoa na foto, em fração da imagem. */
const FOTO = { proporcao: 1200 / 1500, cabeca: 0.31, maos: 0.62, centroX: 0.5 };

/**
 * Enquadra a foto em qualquer celular: a pessoa fica sempre entre o logo e o formulário,
 * com as mãos encostando no começo do texto. Acima dela só há céu branco, que se funde no fundo.
 */
function enquadrar(w: number, topoForm: number) {
  const LOGO = 128;
  const alturaMax = 1.9 * w; // a pessoa inteira (nuca até a ponta dos dedos) cabe na largura da tela
  // a cabeça fica (mãos − cabeça − 0,1) × altura acima do texto; ela não pode subir até o logo
  const cabe = (topoForm - LOGO) / (FOTO.maos - FOTO.cabeca - 0.1);
  const h = Math.max(380, Math.min(alturaMax, cabe));
  const baixo = topoForm + (1 - FOTO.maos + 0.1) * h; // mãos um pouco abaixo do começo do texto
  const largura = FOTO.proporcao * h;
  return { top: baixo - h, height: h, width: largura, left: FOTO.centroX * w - FOTO.centroX * largura };
}

/** Bordas da foto se dissolvem no branco (em celular pequeno a foto não ocupa a largura toda). */
const BORDA = { maskImage: "linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%), linear-gradient(180deg, transparent 0, #000 12%)", maskComposite: "intersect", WebkitMaskComposite: "source-in" } as React.CSSProperties;

/** Capa de entrada: foto de fundo, frase do AbbaFit, login e inscrição. */
export function Capa({ aoInscrever }: { aoInscrever: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [aviso, setAviso] = useState("");
  const caixa = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [medida, setMedida] = useState<{ w: number; topo: number } | null>(null);

  useLayoutEffect(() => {
    const medir = () => {
      if (!caixa.current || !form.current) return;
      const c = caixa.current.getBoundingClientRect(), f = form.current.getBoundingClientRect();
      setMedida({ w: c.width, topo: f.top - c.top });
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (caixa.current) ro.observe(caixa.current);
    if (form.current) ro.observe(form.current);
    return () => ro.disconnect();
  }, []);
  const q = medida ? enquadrar(medida.w, medida.topo) : null;

  function entrar(ev: React.FormEvent) {
    ev.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setAviso("Digite um e-mail válido."); return; }
    if (senha.length < 6) { setAviso("A senha tem pelo menos 6 caracteres."); return; }
    // O login com conta na nuvem entra na próxima versão (Supabase).
    setAviso("Não encontramos uma conta com esse e-mail. Toque em Inscreva-se para criar a sua.");
  }

  return (
    <div ref={caixa} className="relative flex h-dvh min-h-[600px] flex-col overflow-hidden bg-white text-white">
      {/* foto: céu claro em cima, silhueta escura embaixo */}
      <img src={fotoCapa} alt="" className="absolute max-w-none transition-opacity duration-300"
        style={q ? { top: q.top, left: q.left, width: q.width, height: q.height, opacity: 1, ...BORDA } : { opacity: 0 }} />
      {/* a partir do texto, a foto se funde no azul-noite, onde fica o formulário */}
      {medida && <div className="absolute inset-x-0 bottom-0" style={{ top: medida.topo - 40, background: "linear-gradient(180deg, rgba(8,19,53,0) 0px, rgba(8,19,53,0.6) 100px, rgba(8,19,53,0.93) 200px, #081335 300px)" }} />}

      <header className="relative flex flex-col items-center pt-7 [@media(max-height:700px)]:pt-5">
        <Simbolo tamanho={44} />
        <p className="mt-2.5 text-[13px] font-semibold tracking-[0.04em] text-tinta">abbafit</p>
      </header>

      <div className="flex-1" />

      <form ref={form} onSubmit={entrar} noValidate className="relative mx-auto w-full max-w-md px-6 pb-7">
        <h1 className="titulo leading-[1.02] text-white" style={{ fontSize: "clamp(26px, 4.1vh, 34px)" }}>Treino para o corpo. Pausa para a alma.</h1>

        <div className="mt-5 flex flex-col gap-2.5 [@media(max-height:700px)]:mt-3.5">
          <label className="flex h-[54px] overflow-hidden rounded-[14px] bg-white text-tinta focus-within:ring-[3px] focus-within:ring-luz/70">
            <span className="flex w-[54px] shrink-0 items-center justify-center bg-azul text-white"><Mail size={20} /></span>
            <input id="capa-email" type="email" inputMode="email" autoComplete="email" placeholder="E-mail" aria-label="E-mail"
              value={email} onChange={(e) => { setEmail(e.target.value); setAviso(""); }}
              className="min-w-0 flex-1 bg-transparent px-4 text-[16px] outline-none placeholder:text-fraco" />
          </label>
          <label className="flex h-[54px] overflow-hidden rounded-[14px] bg-white text-tinta focus-within:ring-[3px] focus-within:ring-luz/70">
            <span className="flex w-[54px] shrink-0 items-center justify-center bg-azul text-white"><LockKeyhole size={20} /></span>
            <input id="capa-senha" type={verSenha ? "text" : "password"} autoComplete="current-password" placeholder="Senha" aria-label="Senha"
              value={senha} onChange={(e) => { setSenha(e.target.value); setAviso(""); }}
              className="min-w-0 flex-1 bg-transparent px-4 text-[16px] outline-none placeholder:text-fraco" />
            <button type="button" onClick={() => setVerSenha((v) => !v)} aria-label={verSenha ? "Esconder senha" : "Mostrar senha"} className="flex w-12 items-center justify-center text-fraco">
              {verSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setAviso(email ? `Vamos enviar um link para ${email} criar uma nova senha assim que o login estiver ativo.` : "Digite seu e-mail acima para recuperar a senha.")}
            className="text-[14px] text-white/85 underline underline-offset-4">Esqueceu sua senha?</button>
          <button type="submit" className="h-[50px] rounded-[14px] bg-azul px-8 text-[15px] font-bold text-white hover:bg-azul-2" style={{ fontStretch: "112%" }}>Entrar</button>
        </div>

        {aviso && <p role="status" className="entrar mt-3 rounded-xl bg-white/10 px-3.5 py-2.5 text-[13px] text-white/90">{aviso}</p>}

        <button type="button" onClick={() => aoInscrever(email)} className="mt-6 flex h-[54px] w-full overflow-hidden rounded-[14px] bg-white [@media(max-height:700px)]:mt-4 text-tinta active:scale-[0.99]">
          <span className="flex flex-1 items-center justify-center pl-[54px] text-[15px] font-bold" style={{ fontStretch: "112%" }}>Inscreva-se</span>
          <span className="flex w-[54px] items-center justify-center bg-azul text-white"><ChevronsRight size={22} /></span>
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-white/55 [@media(max-height:700px)]:mt-3">O AbbaFit é um app de treino cristão. Ao continuar, você concorda com os Termos de uso e a Política de privacidade.</p>
      </form>
    </div>
  );
}
