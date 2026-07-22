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

export function Home() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      <Header />
      <Hero />
      <Marquee />
      <Sobre />
      <Materias />
      <CamaraOficial />
      <MelhoresFeitos />
      <Feed />
      <Transparencia />
      <Contato />
      <Footer />
    </div>
  );
}

