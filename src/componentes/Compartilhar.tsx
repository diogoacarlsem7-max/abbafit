import { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import { primeiroNome, useApp } from "../lib/estado";
import type { Cartao } from "../conteudo/versiculos";

const W = 1080, H = 1920;

/** Quebra o texto em linhas que cabem na largura. */
function linhas(c: CanvasRenderingContext2D, t: string, max: number) {
  const out: string[] = []; let atual = "";
  for (const p of t.split(/\s+/)) { const teste = atual ? atual + " " + p : p; if (c.measureText(teste).width > max && atual) { out.push(atual); atual = p; } else atual = teste; }
  if (atual) out.push(atual);
  return out;
}

function simbolo(c: CanvasRenderingContext2D, x: number, y: number, s: number) {
  const k = s / 64;
  const r = (rx: number, ry: number, w: number, h: number, rad: number, cor: string) => { c.fillStyle = cor; c.beginPath(); c.roundRect(x + rx * k, y + ry * k, w * k, h * k, rad * k); c.fill(); };
  r(0, 0, 64, 64, 18, "#ffffff");
  r(29, 12, 6, 42, 3, "#081335"); r(12, 23, 40, 5, 2.5, "#081335"); r(9, 17, 6, 17, 2, "#081335"); r(49, 17, 6, 17, 2, "#081335");
}

export async function gerarStory(o: { titulo: string; linha: string; nome: string; cartao: Cartao | null }): Promise<Blob> {
  await Promise.all([document.fonts.load('800 expanded 120px "Archivo Variable"'), document.fonts.load('400 60px "Newsreader Variable"')]).catch(() => {});
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const c = cv.getContext("2d")!;
  // céu à noite
  c.fillStyle = "#081335"; c.fillRect(0, 0, W, H);
  const g1 = c.createRadialGradient(W * 0.9, -100, 0, W * 0.9, -100, 1300); g1.addColorStop(0, "rgba(78,110,255,0.55)"); g1.addColorStop(1, "rgba(78,110,255,0)");
  c.fillStyle = g1; c.fillRect(0, 0, W, H);
  const g2 = c.createRadialGradient(0, H + 100, 0, 0, H + 100, 1100); g2.addColorStop(0, "rgba(29,63,214,0.5)"); g2.addColorStop(1, "rgba(29,63,214,0)");
  c.fillStyle = g2; c.fillRect(0, 0, W, H);

  const X = 96;
  simbolo(c, X, 120, 96);
  c.fillStyle = "#fff"; c.font = '800 expanded 52px "Archivo Variable"';
  c.fillText("abbafit", X + 120, 186);

  // título
  c.font = '800 expanded 112px "Archivo Variable"';
  const tl = linhas(c, o.titulo, W - 2 * X);
  let y = 620;
  for (const l of tl) { c.fillText(l, X, y); y += 118; }
  c.fillStyle = "rgba(255,255,255,0.75)"; c.font = '500 44px "Archivo Variable"';
  c.fillText(o.linha, X, y + 10);

  // a Palavra
  if (o.cartao) {
    y += 170;
    c.fillStyle = "#fff"; c.font = '400 58px "Newsreader Variable"';
    const vl = linhas(c, `“${o.cartao.texto}”`, W - 2 * X).slice(0, 7);
    for (const l of vl) { c.fillText(l, X, y); y += 76; }
    c.fillStyle = "#a9bcff"; c.font = '600 38px "Archivo Variable"';
    c.fillText(o.cartao.ref, X, y + 20);
  }

  // rodapé
  c.fillStyle = "#fff"; c.font = '800 expanded 64px "Archivo Variable"';
  c.fillText(o.nome, X, H - 170);
  c.fillStyle = "rgba(255,255,255,0.6)"; c.font = '500 34px "Archivo Variable"';
  c.fillText("Treino para o corpo. Pausa para a alma.", X, H - 110);

  return new Promise((ok, erro) => cv.toBlob((b) => (b ? ok(b) : erro(new Error("Não consegui gerar a imagem."))), "image/png"));
}

export function Compartilhar({ titulo, linha, cartao, pequeno = false }: { titulo: string; linha: string; cartao: Cartao | null; pequeno?: boolean }) {
  const { e } = useApp();
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [previa, setPrevia] = useState("");
  const [gerando, setGerando] = useState(false);
  useEffect(() => () => { if (previa) URL.revokeObjectURL(previa); }, [previa]);

  async function abrir() {
    setGerando(true);
    try {
      const blob = await gerarStory({ titulo, linha, nome: primeiroNome(e.perfil?.nome || ""), cartao });
      setArquivo(new File([blob], "abbafit.png", { type: "image/png" }));
      setPrevia(URL.createObjectURL(blob));
    } finally { setGerando(false); }
  }
  const podeCompartilhar = !!arquivo && typeof navigator.canShare === "function" && navigator.canShare({ files: [arquivo] });

  return (
    <>
      {pequeno
        ? <button className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-white/12 px-3 text-[12px] font-semibold text-white" onClick={abrir} disabled={gerando}><Share2 size={14} /> {gerando ? "Montando…" : "Compartilhar"}</button>
        : <button className="botao w-full" onClick={abrir} disabled={gerando}><Share2 size={18} /> {gerando ? "Montando a imagem…" : "Compartilhar nos stories"}</button>}
      {previa && arquivo && (
        <div className="fixed inset-x-0 bottom-0 top-[env(safe-area-inset-top)] z-50 flex flex-col items-center bg-noite/95 px-5 pt-4 pb-6" role="dialog" aria-label="Imagem para compartilhar">
          <div className="flex w-full max-w-md justify-end">
            <button onClick={() => { setPrevia(""); setArquivo(null); }} aria-label="Fechar" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"><X size={20} /></button>
          </div>
          <img src={previa} alt="Prévia da imagem para os stories" className="mt-2 min-h-0 flex-1 rounded-2xl object-contain" />
          <div className="mt-4 w-full max-w-md space-y-2">
            {podeCompartilhar && <button className="botao-claro w-full" onClick={() => navigator.share({ files: [arquivo] }).catch(() => {})}><Share2 size={18} /> Compartilhar</button>}
            <a className={(podeCompartilhar ? "botao-sec" : "botao-claro") + " w-full"} href={previa} download={arquivo.name}><Download size={18} /> Salvar imagem</a>
          </div>
        </div>
      )}
    </>
  );
}
