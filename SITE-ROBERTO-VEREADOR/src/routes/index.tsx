import { memo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";
import { Sobre } from "../components/sections/Sobre";
import { Materias } from "../components/sections/Materias";
import { CamaraOficial } from "../components/sections/CamaraOficial";
import { MelhoresFeitos } from "../components/sections/MelhoresFeitos";
import { Feed } from "../components/sections/Feed";
import { Transparencia } from "../components/sections/Transparencia";
import { Contato } from "../components/sections/Contato";

export const Route = createFileRoute("/")({ component: Home });

// Cada seção é memoizada individualmente.
// Quando o Header ou Hero re-renderizam (scroll listener, MotionValues),
// os componentes abaixo não são afetados — em especial o Contato.
const MemoHeader = memo(Header);
const MemoHero = memo(Hero);
const MemoMarquee = memo(Marquee);
const MemoSobre = memo(Sobre);
const MemoMaterias = memo(Materias);
const MemoCamaraOficial = memo(CamaraOficial);
const MemoMelhoresFeitos = memo(MelhoresFeitos);
const MemoFeed = memo(Feed);
const MemoTransparencia = memo(Transparencia);
const MemoContato = memo(Contato);
const MemoFooter = memo(Footer);

export function Home() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      <MemoHeader />
      <MemoHero />
      <MemoMarquee />
      <MemoSobre />
      <MemoMaterias />
      <MemoCamaraOficial />
      <MemoMelhoresFeitos />
      <MemoFeed />
      <MemoTransparencia />
      <MemoContato />
      <MemoFooter />
    </div>
  );
}
