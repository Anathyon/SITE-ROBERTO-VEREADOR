import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Calendar, CheckCircle2, ChevronRight,
  Clock, FileText, Instagram, Facebook, Menu, X, Scale, Landmark,
  Megaphone, ShieldCheck, Users, MapPin, Mail, Phone, Play,
} from "lucide-react";

import heroImg from "@/assets/vereador-hero.jpg";
import plenarioImg from "@/assets/plenario.jpg";
import agenda1 from "@/assets/agenda-1.jpg";
import agenda2 from "@/assets/agenda-2.jpg";
import agenda3 from "@/assets/agenda-3.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

// TikTok icon (lucide has no tiktok)
const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.42a8.16 8.16 0 0 0 4.77 1.52V7.5a4.85 4.85 0 0 1-1.84-.81z"/>
  </svg>
);

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#materias", label: "Matérias" },
  { href: "#tramitacao", label: "Tramitação" },
  { href: "#agenda", label: "Agenda" },
  { href: "#transparencia", label: "Transparência" },
  { href: "#contato", label: "Contato" },
];

export function Home() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <Sobre />
      <Materias />
      <Tramitacao />
      <Agenda />
      <Feed />
      <Transparencia />
      <Contato />
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.14_0.05_260/0.75)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white">
          <div className="w-9 h-9 rounded-md gold-gradient flex items-center justify-center font-display font-black text-navy-deep">
            R
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm tracking-wide">VEREADOR ROBERTO</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Mandato 2025 – 2028</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-white/80 hover:text-gold transition-colors relative group">
              {n.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <a href="#contato" className="hidden lg:inline-flex items-center gap-2 text-sm font-medium gold-gradient text-navy-deep px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          Fale com o gabinete
          <ArrowRight className="w-4 h-4" />
        </a>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-navy-deep border-t border-white/10 px-6 py-6 space-y-4">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-white/80 hover:text-gold">{n.label}</a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen hero-bg flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* decorative grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(oklch(0.82 0.15 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.15 85) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <motion.div style={{ y, opacity }} className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Mandato Ativo
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
            Trabalho <span className="italic text-shimmer">honesto</span><br />
            pela nossa cidade.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
            Um mandato aberto, participativo e acessível. Aqui você acompanha em tempo real cada projeto, cada voto e cada agenda do gabinete.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4">
            <a href="#tramitacao" className="inline-flex items-center gap-2 gold-gradient text-navy-deep font-semibold px-7 py-3.5 rounded-full hover:scale-105 transition-transform">
              Acompanhar projetos <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#agenda" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors">
              <Play className="w-4 h-4" /> Ver agenda
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-xl border-t border-white/10 pt-8">
            {[
              { n: "42", l: "Projetos apresentados" },
              { n: "18", l: "Leis aprovadas" },
              { n: "126", l: "Bairros visitados" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl font-bold text-gold">{s.n}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative animate-float">
            <div className="absolute -inset-6 gold-gradient rounded-4xl blur-2xl opacity-30" />
            <div className="relative rounded-4xl overflow-hidden border border-gold/30" style={{ boxShadow: "var(--shadow-glow)" }}>
              <img src={heroImg} alt="Vereador Roberto" width={1200} height={1408} className="w-full h-auto" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <div className="font-display text-2xl text-white">Roberto Silva</div>
                  <div className="text-xs uppercase tracking-widest text-gold">Vereador · Câmara Municipal</div>
                </div>
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-navy-deep" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Transparência", "Escuta ativa", "Saúde pública", "Educação", "Mobilidade", "Segurança", "Habitação", "Desenvolvimento social"];
  return (
    <div className="w-full bg-navy-deep border-y border-white/10 py-6 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-16 font-display text-3xl text-white/40">
            {it}
            <span className="text-gold">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ id, kicker, title, children, className = "" }: { id?: string; kicker: string; title: string | React.ReactNode; children: React.ReactNode; className?: string; }) {
  return (
    <section id={id} className={`w-full py-24 md:py-32 px-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            <span className="w-8 h-px bg-gold" />
            {kicker}
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-balance max-w-3xl leading-[1.05]">{title}</h2>
        </motion.div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <Section id="sobre" kicker="Sobre o mandato" title={<>Um parlamentar <em className="italic text-primary/70">próximo</em> das ruas e firme no plenário.</>}>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Nascido e criado na nossa cidade, Roberto Silva é professor de formação e servidor público de vocação. No seu segundo mandato como vereador, atua com foco em <span className="text-foreground font-medium">educação, saúde pública e transparência</span>.
          </p>
          <p>
            O gabinete funciona de portas abertas: cada projeto, cada emenda e cada visita a bairro é documentada e publicada aqui — porque o mandato é do povo.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: ShieldCheck, l: "Ficha limpa" },
              { icon: Users, l: "Comissões: Educação e Saúde" },
              { icon: Landmark, l: "Bloco Independente" },
              { icon: Scale, l: "Ficha limpa e patrimônio público" },
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary">
                <b.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-foreground font-medium">{b.l}</div>
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden aspect-4/5" style={{ boxShadow: "var(--shadow-card)" }}>
          <img src={plenarioImg} alt="Plenário da Câmara Municipal" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-xs uppercase tracking-widest text-gold mb-2">Plenário</div>
            <div className="font-display text-3xl leading-tight">"Governar é escutar antes de decidir."</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Materias() {
  const items = [
    { n: "PL 034/2025", tag: "Educação", title: "Programa de reforço escolar em contraturno na rede municipal", date: "12 mar 2025" },
    { n: "PL 022/2025", tag: "Saúde", title: "Ampliação do atendimento em UBS aos sábados", date: "28 fev 2025" },
    { n: "PL 011/2025", tag: "Mobilidade", title: "Passe livre estudantil para universitários da rede pública", date: "14 fev 2025" },
    { n: "PL 003/2025", tag: "Transparência", title: "Portal do vereador — publicação obrigatória de emendas", date: "05 fev 2025" },
  ];
  return (
    <Section id="materias" kicker="Matérias apresentadas" title={<>Cada proposta com <em className="italic">nome</em>, número e destino.</>}>
      <div className="grid gap-4">
        {items.map((it, i) => (
          <motion.a
            key={it.n} href="#" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group grid md:grid-cols-12 gap-4 items-center p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary transition-all hover:shadow-lg"
          >
            <div className="md:col-span-2">
              <div className="font-mono text-xs text-muted-foreground">{it.date}</div>
              <div className="font-display font-bold text-2xl text-primary mt-1">{it.n}</div>
            </div>
            <div className="md:col-span-8">
              <span className="inline-block text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">{it.tag}</span>
              <h3 className="mt-3 font-display text-xl md:text-2xl leading-snug text-balance group-hover:text-primary transition-colors">{it.title}</h3>
            </div>
            <div className="md:col-span-2 flex md:justify-end">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Tramitacao() {
  const steps = [
    { l: "Protocolo", d: "Projeto apresentado no plenário", state: "done" },
    { l: "Comissões", d: "Análise técnica e jurídica", state: "done" },
    { l: "Emendas", d: "Debate público e ajustes", state: "active" },
    { l: "Plenário", d: "Votação pelos vereadores", state: "pending" },
    { l: "Sanção", d: "Promulgação pelo Executivo", state: "pending" },
  ];
  const bills = [
    { n: "PL 034/2025", t: "Reforço escolar em contraturno", stage: 3, updated: "há 2 dias" },
    { n: "PL 022/2025", t: "UBS aos sábados", stage: 4, updated: "há 6 dias" },
    { n: "PL 011/2025", t: "Passe livre estudantil", stage: 2, updated: "há 3 semanas" },
  ];
  return (
    <Section id="tramitacao" kicker="Tramitação" title={<>Acompanhe cada projeto <em className="italic">passo a passo</em>.</>} className="bg-secondary/40">
      <div className="grid lg:grid-cols-5 gap-4 mb-14">
        {steps.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl border-2 ${s.state === "active" ? "bg-primary text-primary-foreground border-primary" : s.state === "done" ? "bg-card border-primary/30" : "bg-card border-border opacity-60"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono opacity-70">0{i + 1}</div>
              {s.state === "done" && <CheckCircle2 className="w-4 h-4" />}
              {s.state === "active" && <Clock className="w-4 h-4 animate-pulse" />}
            </div>
            <div className="font-display font-bold text-lg">{s.l}</div>
            <div className="text-xs opacity-70 mt-1">{s.d}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">Em tramitação agora</h3>
          <a href="#" className="text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">Ver todos <ChevronRight className="w-4 h-4" /></a>
        </div>
        <div className="divide-y divide-border">
          {bills.map((b) => (
            <div key={b.n} className="p-6 md:grid md:grid-cols-12 gap-4 items-center hover:bg-secondary/40 transition-colors">
              <div className="md:col-span-2 font-mono text-sm font-semibold text-primary">{b.n}</div>
              <div className="md:col-span-5 mt-2 md:mt-0 font-medium">{b.t}</div>
              <div className="md:col-span-4 mt-3 md:mt-0">
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full gold-gradient" style={{ width: `${(b.stage / 5) * 100}%` }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">Etapa {b.stage} de 5 · atualizado {b.updated}</div>
              </div>
              <div className="md:col-span-1 mt-3 md:mt-0 md:text-right">
                <ArrowUpRight className="w-5 h-5 inline text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Agenda() {
  const events = [
    { d: "18", m: "MAR", t: "Audiência pública — Mobilidade urbana", loc: "Câmara Municipal · 19h", img: agenda1 },
    { d: "22", m: "MAR", t: "Visita técnica à Escola Estadual Marechal Deodoro", loc: "Bairro Jardim das Palmeiras · 09h", img: agenda2 },
    { d: "28", m: "MAR", t: "Vistoria de obra — Rua das Acácias", loc: "Zona Leste · 14h", img: agenda3 },
  ];
  return (
    <Section id="agenda" kicker="Agenda & atividades" title={<>Onde o mandato <em className="italic">acontece</em> essa semana.</>}>
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((e, i) => (
          <motion.article key={e.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all">
            <div className="relative aspect-4/3 overflow-hidden">
              <img src={e.img} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 gold-gradient rounded-xl px-4 py-2 text-navy-deep text-center leading-none">
                <div className="font-display text-3xl font-black">{e.d}</div>
                <div className="text-[10px] font-bold tracking-widest">{e.m}</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display font-bold text-lg leading-tight text-balance">{e.t}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {e.loc}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Feed() {
  const posts = [
    { t: "Aprovamos por unanimidade a criação do Programa Cidade Escuta.", tag: "Plenário" },
    { t: "Reunião com moradores do Jd. das Palmeiras sobre iluminação pública.", tag: "Bairro" },
    { t: "Discurso na tribuna sobre valorização dos professores da rede.", tag: "Tribuna" },
    { t: "Entrega da emenda que reformou o CRAS da região norte.", tag: "Entrega" },
    { t: "Café da manhã com lideranças comunitárias no Parque das Flores.", tag: "Comunidade" },
    { t: "Fiscalização de contrato de merenda escolar no Centro Educacional.", tag: "Fiscalização" },
  ];
  return (
    <Section kicker="Comunicação · @vereadorroberto" title={<>Do plenário direto pro seu <em className="italic">feed</em>.</>} className="bg-navy-deep text-white">
      <div className="grid md:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-colors cursor-pointer">
            <div className="absolute inset-0 hero-bg opacity-90" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-gold border border-gold/40 px-2 py-1 rounded-full">{p.tag}</span>
                <Instagram className="w-5 h-5 text-white/40 group-hover:text-gold transition-colors" />
              </div>
              <div>
                <p className="font-display text-xl leading-snug text-balance">{p.t}</p>
                <div className="mt-4 text-xs text-white/50">há {i + 1} dia{i > 0 ? "s" : ""}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 gold-gradient text-navy-deep font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform">
          <Instagram className="w-4 h-4" /> Seguir no Instagram
        </a>
      </div>
    </Section>
  );
}

function Transparencia() {
  const cards = [
    { icon: FileText, t: "Emendas parlamentares", d: "Cada real destinado a saúde, educação e infraestrutura.", n: "R$ 4,2M" },
    { icon: Scale, t: "Presença em plenário", d: "Histórico de presença nas sessões e comissões.", n: "98%" },
    { icon: Landmark, t: "Votações nominais", d: "Como votei em cada projeto — sem esconder.", n: "312" },
    { icon: Users, t: "Prestação de contas", d: "Relatório mensal aberto ao cidadão.", n: "Mensal" },
  ];
  return (
    <Section id="transparencia" kicker="Transparência" title={<>Nada a esconder — <em className="italic">tudo</em> a mostrar.</>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.a key={c.t} href="#" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="group relative p-8 rounded-2xl bg-primary text-primary-foreground overflow-hidden hover:bg-navy-deep transition-colors">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full gold-gradient opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700" />
            <c.icon className="w-8 h-8 text-gold relative" />
            <div className="mt-8 font-display text-4xl font-bold text-gold relative">{c.n}</div>
            <div className="mt-2 font-display text-xl font-bold relative">{c.t}</div>
            <div className="mt-2 text-sm text-white/60 relative">{c.d}</div>
            <ArrowUpRight className="absolute bottom-6 right-6 w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Contato() {
  return (
    <Section id="contato" kicker="Fale com o gabinete" title={<>O gabinete é seu. <em className="italic">Escreva</em>, ligue, apareça.</>} className="bg-secondary/40">
      <div className="grid lg:grid-cols-2 gap-12">
        <form onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! Retornaremos em breve."); }} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input required placeholder="Seu nome" className="w-full px-5 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" />
            <input required type="email" placeholder="Seu e-mail" className="w-full px-5 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" />
          </div>
          <input placeholder="Bairro / Cidade" className="w-full px-5 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" />
          <textarea required rows={5} placeholder="Sua demanda, denúncia ou sugestão..." className="w-full px-5 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all resize-none" />
          <button type="submit" className="inline-flex items-center gap-2 gold-gradient text-navy-deep font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform">
            Enviar mensagem <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <div className="space-y-6">
          {[
            { icon: MapPin, t: "Gabinete 217", d: "Câmara Municipal — Praça da República, s/nº — Centro" },
            { icon: Phone, t: "Telefone", d: "(11) 4000-1234 · WhatsApp (11) 99000-1234" },
            { icon: Mail, t: "E-mail", d: "gabinete@vereadorroberto.com.br" },
            { icon: Calendar, t: "Atendimento", d: "Segunda a sexta, das 09h às 18h" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-lg">{c.t}</div>
                <div className="text-muted-foreground text-sm mt-1">{c.d}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            {[
              { icon: Instagram, href: "https://instagram.com", l: "Instagram" },
              { icon: Facebook, href: "https://facebook.com", l: "Facebook" },
              { icon: TikTok, href: "https://tiktok.com", l: "TikTok" },
            ].map((s) => (
              <a key={s.l} href={s.href} target="_blank" rel="noreferrer" aria-label={s.l}
                className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:gold-gradient hover:text-navy-deep transition-all hover:-translate-y-1">
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-navy-deep text-white pt-20 pb-10 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-md gold-gradient flex items-center justify-center font-display font-black text-navy-deep text-lg">R</div>
              <div>
                <div className="font-display font-bold text-lg">Vereador Roberto</div>
                <div className="text-xs text-white/60 uppercase tracking-widest">Mandato 2025 – 2028</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-white/60 leading-relaxed">
              Um mandato de portas abertas. Feito para escutar, propor e prestar contas.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Navegue</div>
            <ul className="space-y-2 text-sm text-white/70">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Redes</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="https://instagram.com" className="hover:text-gold flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</a></li>
              <li><a href="https://facebook.com" className="hover:text-gold flex items-center gap-2"><Facebook className="w-4 h-4" /> Facebook</a></li>
              <li><a href="https://tiktok.com" className="hover:text-gold flex items-center gap-2"><TikTok className="w-4 h-4" /> TikTok</a></li>
              <li><a href="#" className="hover:text-gold flex items-center gap-2"><Megaphone className="w-4 h-4" /> Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Gabinete do Vereador Roberto. Todos os direitos reservados.</div>
          <div>Conteúdo institucional · Este site não veicula propaganda eleitoral.</div>
        </div>
      </div>
    </footer>
  );
}
