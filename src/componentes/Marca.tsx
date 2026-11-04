// Símbolo do AbbaFit: a cruz formada por uma barra com anilhas.
export function Simbolo({ tamanho = 32, fundo = "#1d3fd6", traco = "#ffffff", className = "" }: { tamanho?: number; fundo?: string; traco?: string; className?: string }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="18" fill={fundo} />
      {/* haste da cruz */}
      <rect x="29" y="12" width="6" height="42" rx="3" fill={traco} />
      {/* barra */}
      <rect x="12" y="23" width="40" height="5" rx="2.5" fill={traco} />
      {/* anilhas */}
      <rect x="9" y="17" width="6" height="17" rx="2" fill={traco} />
      <rect x="49" y="17" width="6" height="17" rx="2" fill={traco} />
    </svg>
  );
}

export function Logo({ claro = false, tamanho = 28 }: { claro?: boolean; tamanho?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Simbolo tamanho={tamanho} fundo={claro ? "#ffffff" : "#1d3fd6"} traco={claro ? "#081335" : "#ffffff"} />
      <span className={"titulo text-[22px] lowercase " + (claro ? "text-white" : "text-tinta")} style={{ letterSpacing: "-0.03em" }}>abbafit</span>
    </span>
  );
}
