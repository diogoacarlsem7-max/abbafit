import { useState } from "react";
import { ChevronsRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Simbolo } from "../componentes/Marca";
// Foto provisória. Troque o arquivo src/assets/capa.jpg pela foto definitiva (vertical, pelo menos 1080 × 1920).
import fotoCapa from "../assets/capa.jpg";

/** Capa de entrada: foto de fundo, frase do AbbaFit, login e inscrição. */
export function Capa({ aoInscrever }: { aoInscrever: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [aviso, setAviso] = useState("");

  function entrar(ev: React.FormEvent) {
    ev.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setAviso("Digite um e-mail válido."); return; }
    if (senha.length < 6) { setAviso("A senha tem pelo menos 6 caracteres."); return; }
    // O login com conta na nuvem entra na próxima versão (Supabase).
    setAviso("Não encontramos uma conta com esse e-mail. Toque em Inscreva-se para criar a sua.");
  }

  return (
    <div className="relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-noite text-white">
      {/* foto */}
      <img src={fotoCapa} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "44% 30%" }} />
      {/* leitura: escurece em cima (marca) e embaixo (formulário) */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,19,53,0.75) 0%, rgba(8,19,53,0.05) 24%, rgba(8,19,53,0.1) 40%, rgba(8,19,53,0.86) 64%, #081335 100%)" }} />

      <header className="relative flex flex-col items-center pt-7">
        <Simbolo tamanho={44} />
        <p className="mt-2.5 text-[13px] font-semibold tracking-[0.04em] text-white/85">abbafit</p>
      </header>

      <div className="flex-1" />

      <form onSubmit={entrar} noValidate className="relative mx-auto w-full max-w-md px-6 pb-7">
        <h1 className="titulo text-[34px] leading-[1]">Treino para o corpo. Pausa para a alma.</h1>

        <div className="mt-6 flex flex-col gap-2.5">
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

        <button type="button" onClick={() => aoInscrever(email)} className="mt-6 flex h-[54px] w-full overflow-hidden rounded-[14px] bg-white text-tinta active:scale-[0.99]">
          <span className="flex flex-1 items-center justify-center pl-[54px] text-[15px] font-bold" style={{ fontStretch: "112%" }}>Inscreva-se</span>
          <span className="flex w-[54px] items-center justify-center bg-azul text-white"><ChevronsRight size={22} /></span>
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-white/55">O AbbaFit é um app de treino cristão. Ao continuar, você concorda com os Termos de uso e a Política de privacidade.</p>
      </form>
    </div>
  );
}
