import { ChevronRight, Footprints, Play } from "lucide-react";
import { useApp, primeiroNome, semanasSeguidas } from "../lib/estado";
import { andamentoSalvo, diasTreinadosNaSemana, proximaLeitura, proximoDia, saudacao } from "../lib/treino";
import { minutosDoDia } from "../conteudo/treinos";
import { palavraDoDia } from "../conteudo/versiculos";
import { CARDIOS } from "../conteudo/cardio";
import { trilha } from "../conteudo/jornada";
import { Logo } from "../componentes/Marca";
import { CartaoPalavra } from "../componentes/CartaoPalavra";
import { Avatar } from "./Perfil";

const DIAS = ["S", "T", "Q", "Q", "S", "S", "D"];

export function Inicio() {
  const { e } = useApp();
  const p = e.perfil!;
  const dia = proximoDia(e);
  const and = andamentoSalvo();
  const feitos = diasTreinadosNaSemana(e);
  const hoje = (new Date().getDay() + 6) % 7;
  const prox = proximaLeitura(e);
  const t = trilha(p.trilha);
  const cardio = CARDIOS[e.cardios.length % CARDIOS.length]!;
  const seguidas = semanasSeguidas(e.registros);

  return (
    <div className="px-4">
      <header className="flex h-16 items-center justify-between">
        <Logo />
        <a href="#/perfil" aria-label="Seu perfil"><Avatar tamanho={40} /></a>
      </header>

      <h1 className="titulo mt-2 text-[28px]">{saudacao()}, {primeiroNome(p.nome)}</h1>

      {/* semana */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-1.5">
          {DIAS.map((d, i) => (
            <span key={i} className={"flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold " +
              (feitos.has(i) ? "bg-azul text-white" : i === hoje ? "border-[1.5px] border-azul text-azul" : "bg-white text-fraco ring-1 ring-linha")}>{d}</span>
          ))}
        </div>
        <p className="text-[12px] leading-tight text-suave">
          <b className="block text-[15px] text-tinta">{feitos.size} de 3</b>treinos na semana
        </p>
      </div>

      {/* treino de hoje: o momento azul-noite */}
      <a href={"#/sessao/" + (and?.letra ?? dia.letra)} className="ceu-noite relative mt-5 block overflow-hidden rounded-[26px] px-5 pt-5 pb-5">
        <span aria-hidden="true" className="titulo pointer-events-none absolute -top-6 -right-3 text-[190px] leading-none text-white/[0.07]">{and?.letra ?? dia.letra}</span>
        <p className="text-[13px] font-semibold text-luz">{and ? "Treino em andamento" : `Treino de hoje, ${dia.foco.toLowerCase()}`}</p>
        <p className="titulo mt-2 max-w-[13ch] text-[30px]">{dia.titulo}</p>
        <p className="mt-2 text-[13px] text-white/70">{dia.itens.length} exercícios, cerca de {minutosDoDia(dia)} min</p>
        <span className="botao-claro mt-5 w-full"><Play size={18} fill="currentColor" /> {and ? "Continuar treino" : "Começar treino " + dia.letra}</span>
      </a>
      {seguidas >= 2 && <p className="mt-2 px-1 text-[13px] text-suave">{seguidas} semanas seguidas treinando. Continue assim.</p>}

      <div className="mt-5"><CartaoPalavra c={palavraDoDia()} /></div>

      {/* jornada */}
      {prox && (
        <a href={"#/jornada/" + prox.leitura.id} className="papel mt-4 flex items-center gap-4 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-azul">Jornada {t.nome}, semana {prox.semana + 1}</p>
            <p className="mt-1 text-[17px] font-semibold leading-snug">{prox.leitura.titulo}</p>
            <div className="mt-2.5 flex gap-1" aria-label={`Leitura ${prox.dia + 1} de ${prox.total}`}>
              {Array.from({ length: prox.total }, (_, i) => <span key={i} className={"h-1.5 w-6 rounded-full " + (i < prox.dia ? "bg-azul" : i === prox.dia ? "bg-azul/35" : "bg-linha")} />)}
            </div>
          </div>
          <ChevronRight size={20} className="text-fraco" />
        </a>
      )}

      {/* cardio */}
      <a href={"#/cardio/" + cardio.id} className="papel mt-4 mb-2 flex items-center gap-4 px-5 py-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ceu text-azul"><Footprints size={22} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-azul">Cardio de oração</p>
          <p className="truncate text-[16px] font-semibold">{cardio.titulo}</p>
          <p className="text-[13px] text-suave">{cardio.minutos} min</p>
        </div>
        <ChevronRight size={20} className="text-fraco" />
      </a>
    </div>
  );
}
