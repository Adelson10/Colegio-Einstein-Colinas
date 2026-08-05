import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Trophy, Users, BookOpen, Star, Menu, X, MapPin, Phone, Mail, Clock, CheckCircle2, Medal, Building2, Sparkles, Target, Eye, HeartHandshake, ArrowUpRight, ArrowUp, ArrowDown, Quote, Landmark } from 'lucide-react';
import LogoIcon from '../../public/logo.jsx';
const LOGO = '/logo.png';
const IMG = {
  building: 'https://horizons-cdn.hostinger.com/1efc1057-2848-415a-b5c2-e492130a8d44/d8f2f93b491959f0074077ffa7489a29.png',
  founder: '/suelena.png',
  finance: '/odilon.png',
  // AGORA É UM ARRAY: adicione aqui os caminhos das outras fotos da sala de aula
  classroom: [
    '/sala.png',
    '/sala-2.png',
    '/sala-3.png'
  ],
  trophy: '/turma.png',
  library: 'biblioteca.png',
  // NOVOS: coloque aqui os caminhos das fotos reais de cada espaço
  parques: [
    '/parquinho.png',
    '/patio.png'
  ],
  lab: '/laboratorio.png',
  auditorium: '/auditorio.png',
  lion: '/Lion.png',
  entrada: '/Entrada.png',
  parque: '/parque.png',
  alunos: [
    '/alunos/IMG_8975.jpeg',
    '/alunos/IMG_8972.jpeg',
    '/alunos/IMG_8976.jpeg'
  ],
  conquistas: Array.from({ length: 19 }, (_, i) => `/conquistas/imagem${i}.jpg`),
};
const NAV = [{
  id: 'historia',
  label: 'História'
}, {
  id: 'missao',
  label: 'Missão'
}, {
  id: 'equipe',
  label: 'Direção'
}, {
  id: 'estrutura',
  label: 'Estrutura'
}, {
  id: 'conquistas',
  label: 'Conquistas'
}, {
  id: 'contato',
  label: 'Contato'
}];
const WHATSAPP_URL = 'https://wa.me/5563981228732?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20matr%C3%ADculas';
const fade = {
  hidden: {
    opacity: 0,
    y: 28
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
function Reveal({
  children,
  className,
  delay = 0
}) {
  return <motion.div className={className} variants={fade} initial="hidden" whileInView="show" viewport={{
    once: true,
    margin: '-80px'
  }} transition={{
    delay
  }}>
            {children}
        </motion.div>;
}

// ---------------------------------------------------------------------
// Botão em pill com selo circular de seta — vocabulário visual repetido
// em todo o site (CTAs, formulário, navegação).
// ---------------------------------------------------------------------
function PillButton({
  children,
  href,
  onClick,
  variant = 'solid',
  type = 'button',
  className = ''
}) {
  const styles = {
    solid: {
      wrap: 'bg-primary text-primary-foreground hover:brightness-110',
      icon: 'bg-white/15'
    },
    accent: {
      wrap: 'bg-accent text-accent-foreground hover:brightness-105',
      icon: 'bg-black/10'
    },
    outline: {
      wrap: 'border border-primary/20 text-primary hover:bg-primary/5',
      icon: 'bg-primary/10'
    },
    ghost: {
      wrap: 'border border-white/40 text-white hover:bg-white/10',
      icon: 'bg-white/15'
    },
    invert: {
      wrap: 'bg-white text-primary hover:brightness-95',
      icon: 'bg-primary/10'
    }
  };
  const s = styles[variant] || styles.solid;
  const Comp = href ? 'a' : 'button';
  const extra = href ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {
    type
  };
  return <Comp href={href} onClick={onClick} className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 font-600 text-sm active:scale-[0.98] transition ${s.wrap} ${className}`} {...extra}>
            {children}
            <span className={`grid place-items-center h-8 w-8 rounded-full transition-transform group-hover:translate-x-0.5 ${s.icon}`}>
                <ArrowUpRight className="h-4 w-4" />
            </span>
        </Comp>;
}

// ---------------------------------------------------------------------
// Carrossel de imagens reutilizável (troca automática + bolinhas)
// ---------------------------------------------------------------------
function ImageCarousel({ images, alt, className = '', interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const list = Array.isArray(images) ? images : [images];

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % list.length);
    }, interval);
    return () => clearInterval(timer);
  }, [list.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {list.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {list.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 z-10">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para foto ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? 'bg-accent w-5' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const isOverDark = ['missao', 'conquistas'].some(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.top >= -100;
      });
      setOverDark(isOverDark);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = id => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const effectiveOverDark = overDark && !open;
  return <header className={`${scrolled || open ? 'fixed' : 'absolute'} top-0 inset-x-0 z-50 transition-colors duration-300 ${effectiveOverDark ? 'bg-transparent border-b border-transparent' : scrolled || open ? 'bg-background border-b border-border' : 'bg-transparent border-b border-transparent'}`}>
            <nav className="mx-auto max-w-[90rem] px-5 lg:px-10 h-20 flex items-center justify-between">
                <button onClick={() => go('topo')} className="flex items-center gap-3">
                    <span className="grid place-items-center h-12 w-12 rounded-full bg-white border border-border overflow-hidden">
                        <img src={LOGO} alt="Colégio Albert Einstein" className="h-full w-full object-contain p-0.5" />
                    </span>
                    <span className="leading-tight text-left hidden sm:block">
                       <span className={`block font-display font-900 text-lg tracking-tight transition-colors duration-300 ${effectiveOverDark ? 'text-white' : 'text-primary'}`}>COLÉGIO EINSTEIN</span>
                        <span className="block text-[11px] uppercase tracking-[0.22em] text-accent">COLINAS DO TOCANTINS</span>
                    </span>
                </button>
                <div className="hidden lg:flex items-center gap-8">
                    {NAV.map(n => <button key={n.id} onClick={() => go(n.id)} className={`text-sm font-500 transition-colors ${effectiveOverDark ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-primary'}`}>
                            {n.label}
                        </button>)}
                </div>
                <div className="hidden lg:flex items-center gap-3">
                    <PillButton variant={effectiveOverDark ? 'ghost' : 'outline'} onClick={() => go('contato')}>Fale conosco</PillButton>
                    <PillButton href={WHATSAPP_URL} variant={effectiveOverDark ? 'invert' : 'solid'}>Matrículas</PillButton>
                </div>
                <button className={`lg:hidden transition-colors duration-300 ${effectiveOverDark ? 'text-white' : 'text-primary'}`} onClick={() => setOpen(!open)} aria-label="Menu">
                    {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>
            </nav>
            {open && <div className="lg:hidden bg-background border-t border-border px-5 pb-6 pt-2 flex flex-col gap-1">
                    {NAV.map(n => <button key={n.id} onClick={() => go(n.id)} className="text-left py-3 text-foreground/80 font-500 border-b border-border/60">
                            {n.label}
                        </button>)}
                    <PillButton href={WHATSAPP_URL} variant="solid" className="mt-3 justify-center">Matrículas</PillButton>
                </div>}
        </header>;
}
function AvatarDot({ src, icon: Icon, style }) {
  return <span style={style} className="relative grid place-items-center h-14 w-14 rounded-full ring-2 ring-background overflow-hidden bg-[color-mix(in_srgb,hsl(var(--accent))_15%,hsl(var(--background)))] text-accent">
            {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <Icon className="h-8 w-8" />}
        </span>;
}
function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-background min-h-0 min-[820px]:min-h-[100dvh] flex flex-col">
      <img
        src={IMG.lion}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.1] grayscale contrast-125 z-3"
      />
      <div className="flex-1 flex items-center py-14 lg:py-16">
        <div className="mx-auto max-w-[90rem] w-full px-5 lg:px-10">
          <div className="relative grid lg:grid-cols-[0.8fr_1.3fr_0.9fr] gap-8 lg:gap-6 items-center">
            <div className="hidden lg:flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative overflow-hidden aspect-[4/5] w-full grid place-items-center">
                  <LogoIcon
                    role="img"
                    aria-label="Colégio Albert Einstein"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full max-h-[85%] max-w-[85%]"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {[
                    ...IMG.alunos.map(src => ({ src })),
                    { icon: GraduationCap }
                  ].map((avatar, index) => (
                    <AvatarDot key={index} src={avatar.src} icon={avatar.icon} style={{ zIndex: index }} />
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-display font-900 text-4xl text-primary leading-none">600+</div>
                  <div className="text-[14px] text-base/3 text-muted-foreground mt-1">Alunos em nossa comunidade</div>
                </div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left h-full flex-col flex justify-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h1 className="font-display font-900 leading-[1.05] tracking-tight via-70% text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-sky-400 via-primary to-primary/80 bg-clip-text text-transparent">
                  Formar mentes
                </h1>
                <span>
                  <h1 className="inline font-display font-900 leading-[1.05] via-70% tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-sky-400 via-primary to-primary/80 bg-clip-text text-transparent">
                    para o
                  </h1>
                  <h1 className="inline font-display font-900 leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent">
                    {'  '}futuro.
                  </h1>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-muted-foreground max-w-lg mx-auto lg:ml-0 lg:mr-32 text-balance text-base sm:text-lg"
              >
                Há mais de três décadas, o Colégio Albert Einstein constrói trajetórias de aprendizado com dedicação,
                valores e resultados que se destacam entre as melhores escolas da região.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <PillButton href={WHATSAPP_URL} variant="accent">Fale conosco</PillButton>
                <PillButton
                  variant="outline"
                  onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça o colégio
                </PillButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="lg:hidden mt-9 flex items-center justify-center gap-4"
              >
                <div className="flex -space-x-3">
                  {[
                    ...IMG.alunos.map(src => ({ src })),
                    { icon: GraduationCap }
                  ].map((avatar, index) => (
                    <AvatarDot key={index} src={avatar.src} icon={avatar.icon} style={{ zIndex: index }} />
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-display font-900 text-xl text-primary leading-none">600+</div>
                  <div className="text-xs text-muted-foreground mt-1">Alunos em nossa comunidade</div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex flex-col items-start gap-3"
              >
                <GraduationCap className="h-12 w-12 text-accent" strokeWidth={1} />
                <p className="text-sm text-primary leading-snug max-w-[220px]">
                  Um caminho mais inteligente para o futuro dos seus filhos
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <img
                  src={IMG.entrada}
                  alt="Alunos do Colégio Albert Einstein"
                  loading="eager"
                  decoding="async"
                  className="rounded-[2rem] aspect-[4/3] w-full lg:w-[125%] lg:max-w-none lg:-ml-[25%] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const ROW_LOGOS = [
  { src: 'LogoESBaixa_cor.PNG', ratio: 1921 / 672 },
  { src: 'Logo_Roxo_CMYK.png', ratio: 14826 / 5407 },
  { src: 'educacross-site.png', ratio: 305 / 148 },
  { src: 'logo_eduall_bs_cor.png', ratio: 4501 / 1459 },
  { src: 'mm_original_pt.png', ratio: 4267 / 2166 },
  { src: 'sistema_anglo.png', ratio: 2624 / 2624 },
];
function Marquee() {
  const loop = [...ROW_LOGOS, ...ROW_LOGOS];
  return <div className="relative bg-transparent mx-auto max-w-[90rem] w-full px-5 lg:px-10 py-6 sm:py-4 mb-8 sm:mb-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [@media(max-height:820px)]:mb-20">
            <div className="flex items-center whitespace-nowrap animate-marquee w-max gap-8">
                {loop.map(({ src, ratio }, i) =>
                <img
                  key={i}
                  aria-hidden="true"
                  src={`/row/${src}`}
                  className="mx-8 inline-block h-10 sm:h-10 md:h-12 lg:h-16 shrink-0 object-contain"
                  style={{ aspectRatio: ratio }}
                />)}
            </div>
        </div>;
}
function Historia() {
  return <section id="historia" className="min-h-0 min-[820px]:min-h-screen flex flex-col justify-between py-20 lg:py-28 bg-secondary/50">
            <Marquee />
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
                <Reveal className="relative">
                    <div className="absolute -top-5 -left-5 h-24 w-24 rounded-2xl bg-accent/20 -z-0" />
                    <ImageCarousel images={IMG.classroom} alt="Sala de aula do colégio" className="relative rounded-3xl aspect-[4/3] w-full" />
                    <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-primary text-primary-foreground rounded-2xl p-5 max-w-[200px] z-10">
                        <div className="font-display font-900 text-3xl text-accent">1989</div>
                        <p className="text-xs text-primary-foreground/80 mt-1">Ano de fundação do colégio</p>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Nossa história</span>
                    <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                        Uma trajetória construída com propósito
                    </h2>
                    <p className="mt-5 text-muted-foreground leading-relaxed text-balance">
                        O Colégio Albert Einstein foi fundado em <strong className="text-foreground">1989</strong> pela
                        educadora <strong className="text-foreground">Suelena Alves Carvalho Torres</strong>, com o sonho
                        de oferecer um ensino de qualidade que unisse conhecimento, valores e cuidado com cada estudante.
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Ao longo de mais de três décadas, o colégio se consolidou como referência em educação, mantendo desde 2004/2006 uma sólida parceria com a <strong className="text-foreground">UNOPAR</strong>, que fortalece o material didático e a metodologia de ensino oferecidos aos alunos.</p>
                    <ul className="mt-6 space-y-3">
                        {['Ensino comprometido com valores e resultados', 'Parceria pedagógica consolidada com a UNOPAR', 'Ambiente acolhedor e familiar'].map(t => <li key={t} className="flex items-start gap-3 text-foreground">
                                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" /> {t}
                            </li>)}
                    </ul>
                </Reveal>
            </div>
        </section>;
}

const VALORES = [
  'Excelência pedagógica',
  'Compromisso com a aprendizagem',
  'Protagonismo do estudante',
  'Parceria entre escola, família e comunidade',
];

function MissaoVisaoValores() {
  const cards = [
    {
      key: 'foto',
      photo: true
    },
    {
      key: 'missao',
      icon: Target,
      title: 'Missão',
      text: 'Inspirar mentes e transformar vidas por meio de uma educação de excelência, compartilhando conhecimento e preparando crianças e jovens para os desafios acadêmicos, profissionais e da vida.'
    },
    {
      key: 'visao',
      icon: Eye,
      title: 'Visão',
      text: 'Ser referência em soluções educacionais, promovendo aprendizagem significativa, inovação e excelência pedagógica, contribuindo para a formação de estudantes protagonistas e preparados para o futuro.'
    },
    {
      key: 'valores',
      icon: HeartHandshake,
      title: 'Valores',
      highlight: true
    }
  ];

  return (
    <section id="missao" className="relative overflow-hidden bg-primary text-primary-foreground min-h-0 min-[820px]:min-h-[100dvh] flex flex-col pt-20 sm:pt-24 pb-4 sm:pb-6 lg:pb-8">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex-1 min-h-0 flex flex-col justify-center mx-auto max-w-[90rem] w-full px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          <Reveal className="max-w-xl">
            <span className="text-xs sm:text-sm font-600 uppercase tracking-[0.2em] text-accent">Nossos pilares</span>
            <h2 className="mt-1.5 sm:mt-3 font-display font-900 text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              O que nos guia todos os dias
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-md">
            <p className="hidden sm:block text-primary-foreground/75 leading-relaxed text-sm lg:text-base">
              Missão, visão e valores que orientam cada decisão pedagógica e cada relação construída dentro do Colégio Albert Einstein.
            </p>
            <div className="mt-2 sm:mt-5">
              <PillButton variant="accent" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                Fale conosco
              </PillButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {cards.map((c, i) =>
            c.photo ? (
              <Reveal key={c.key} className="rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-auto">
                <img src={IMG.parque} alt="Alunos em sala de aula" loading="lazy" decoding="async" className="h-full w-full object-cover object-left scale-150" />
              </Reveal>
            ) : (
              <Reveal
                key={c.key}
                delay={i * 0.1}
                className={`rounded-2xl lg:rounded-3xl p-5 lg:p-8 ${c.highlight ? 'bg-white' : 'bg-white/5'} flex flex-col justify-between`}
              >
                <c.icon className={`h-6 w-6 lg:h-10 lg:w-10 ${c.highlight ? 'text-accent' : 'text-white'}`}  strokeWidth={1.8} />
                <div className="flex flex-col gap-1.5 lg:gap-1.5 min-h-0">
                  <h3 className={`mt-2 lg:mt-5 font-display font-700 text-base lg:text-2xl leading-snug ${c.highlight ? 'text-primary' : ''}`}>{c.title}</h3>
                  {c.highlight ? (
                    <ul className="mt-1 lg:mt-3 space-y-1.5 lg:space-y-2 overflow-hidden">
                      {VALORES.map(v => (
                        <li key={v} className="flex items-start gap-2 lg:gap-2.5 text-sm text-foreground text-balance leading-snug">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 lg:mt-3 text-sm text-primary-foreground/70 leading-relaxed text-balance">{c.text}</p>
                  )}
                </div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
const TEAM = [{
  img: IMG.founder,
  name: 'Suelena Alves Carvalho Torres',
  role: 'Fundadora e Diretora',
  icon: GraduationCap,
  text: 'Idealizadora do colégio em 1989, dedica sua vida à educação, guiando a instituição com visão e cuidado.'
}, {
  img: IMG.finance,
  name: 'Odilon Torres de Silveira',
  role: 'Diretor Financeiro',
  icon: Landmark,
  text: 'Responsável pela gestão financeira e administrativa, garantindo a solidez e a continuidade do projeto educacional.'
}];
function Equipe() {
  const [active, setActive] = useState(0);
  const current = TEAM[active];

  useEffect(() => {
    if (TEAM.length <= 1) return;
    const timer = setInterval(() => {
      setActive(i => (i + 1) % TEAM.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [active]);

  return <section id="equipe" className="min-h-0 min-[820px]:min-h-screen flex flex-col justify-center py-20 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 w-full">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-center">
                    <Reveal className="lg:min-h-[380px] flex flex-col justify-between text-center lg:text-left items-center lg:items-start">
                        <div>
                            <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Direção</span>
                            <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                                Quem conduz o Albert Einstein
                            </h2>
                        </div>
                        <p className="mt-8 lg:mt-0 text-muted-foreground leading-relaxed max-w-xs">
                            Uma equipe comprometida com a excelência e o desenvolvimento de cada estudante.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1} className="flex flex-col items-center gap-6">
                        <current.icon key={current.role} className="h-12 w-12 text-accent" strokeWidth={1.8} />
                        <div className="relative w-full max-w-sm lg:max-w-md aspect-[9/12] rounded-3xl overflow-hidden bg-accent/80">
                            <img key={current.img} src={current.img} alt={current.name} loading="lazy" decoding="async" className="w-full object-cover object-top" />
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} className="lg:min-h-[380px] flex flex-col justify-center gap-8 text-center lg:text-left items-center lg:items-start">
                        <p className="text-lg lg:text-xl text-primary leading-relaxed text-balance">
                            {current.text}
                        </p>
                        <div className="flex items-center gap-3">
                            {TEAM.map((m, i) => <button key={m.name} onClick={() => setActive(i)} aria-label={m.name} className={`h-22 w-16 rounded-3xl overflow-hidden border-2 shrink-0 transition ${active === i ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                                    <img src={m.img} alt={m.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                </button>)}
                        </div>
                        <div>
                            <h3 className="font-display font-700 text-xl text-primary">{current.name}</h3>
                            <span className="text-sm text-muted-foreground">{current.role}</span>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>;
}
function Conquistas() {
  return (
    <section id="conquistas" className="relative overflow-hidden bg-primary text-primary-foreground min-h-0 min-[820px]:min-h-[100dvh] flex flex-col pt-20 sm:pt-24 pb-4 sm:pb-6 lg:pb-8">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex-1 min-h-0 flex flex-col justify-center mx-auto max-w-[90rem] w-full px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
          <Reveal>
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Conquistas</span>
            <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl leading-tight">
              Resultados que orgulham nossa comunidade
            </h2>
            <div className="mt-6 flex gap-4">
              <Quote className="h-8 w-8 text-accent shrink-0" fill="currentColor" />
              <p className="text-primary-foreground/80 leading-relaxed text-balance">
                No último ano, o Colégio Albert Einstein alcançou o <strong className="text-accent">3º lugar
                do estado</strong> e o <strong className="text-accent">1º lugar do município</strong>,
                reafirmando sua posição entre as melhores escolas da região. Uma conquista construída pelo
                empenho de alunos, professores e famílias.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 lg:gap-6">
              {[{
                icon: Medal,
                t: '3º lugar do Estado',
                s: 'Desempenho acadêmico'
              }, {
                icon: Trophy,
                t: '1º lugar do Município',
                s: 'Referência local'
              }, {
                icon: Award,
                t: 'Entre as melhores',
                s: 'Reconhecimento constante'
              }, {
                icon: Star,
                t: 'Excelência contínua',
                s: 'Compromisso diário'
              }].map(c => (
                <div key={c.t} className="rounded-2xl lg:rounded-3xl bg-white/5 p-3 lg:p-8 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <c.icon className="h-5 w-5 lg:h-10 lg:w-10 text-accent" strokeWidth={1.8} />
                  <div className="mt-1.5 lg:mt-5">
                    <div className="font-display font-700 text-xs lg:text-lg leading-snug">{c.t}</div>
                    <div className="mt-1 lg:mt-2 text-[10px] lg:text-sm text-primary-foreground/60">{c.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative h-full aspect-[9/10] mx-auto lg:mx-0 rounded-3xl overflow-hidden">
            <ImageCarousel images={IMG.conquistas} alt="Conquistas do colégio" className="w-full h-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Estrutura() {
  const cards = [{
    img: IMG.classroom,
    icon: Building2,
    t: 'Salas de aula',
    s: 'Ambientes preparados para um aprendizado ativo e acolhedor.'
  }, {
    img: IMG.library,
    icon: BookOpen,
    t: 'Sala de estudos',
    s: 'Espaço de leitura e pesquisa para incentivar o hábito de estudar.'
  }, {
    img: IMG.trophy,
    icon: Users,
    t: 'Comunidade escolar',
    s: 'Alunos, famílias e educadores unidos por um mesmo propósito.'
  }, {
    img: IMG.parques,
    icon: Sparkles,
    t: 'Espaço recreativo',
    s: 'Espaço seguro e divertido para brincar, socializar e recarregar as energias.'
  }, {
    img: IMG.lab,
    icon: Target,
    t: 'Laboratórios',
    s: 'Ambientes equipados para aulas práticas e experimentos que dão vida à teoria.'
  }, {
    img: IMG.auditorium,
    icon: GraduationCap,
    t: 'Auditório',
    s: 'Espaço para eventos, apresentações e celebrações que reúnem toda a comunidade escolar.'
  }];
  return <section id="estrutura" className="py-20 lg:py-28">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <Reveal className="max-w-xl">
                        <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Estrutura</span>
                        <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary">
                            Um ambiente feito para aprender
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1} className="max-w-sm">
                        <p className="text-muted-foreground">
                            Espaços pensados para o aprendizado prático, a convivência e o bem-estar de cada estudante.
                        </p>
                        <div className="mt-4">
                            <PillButton variant="outline" onClick={() => document.getElementById('contato')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                                Agende uma visita
                            </PillButton>
                        </div>
                    </Reveal>
                </div>
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {cards.map((c, i) => <Reveal key={c.t} delay={i * 0.08} className="group rounded-3xl overflow-hidden border border-border bg-card hover hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[3/2] overflow-hidden">
                                <ImageCarousel images={c.img} alt={c.t} className="h-full w-full" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-accent">
                                    <c.icon className="h-5 w-5" strokeWidth={1.8} />
                                    <span className="text-[11px] font-600 uppercase tracking-wide">Estrutura Einstein</span>
                                </div>
                                <h3 className="mt-3 font-display font-700 text-lg text-primary">{c.t}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{c.s}</p>
                                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-sm font-600 text-primary">Conheça o espaço</span>
                                    <PillButton variant="outline" className="!py-1 !pl-4 !pr-1 text-xs" onClick={() => document.getElementById('contato')?.scrollIntoView({
                        behavior: 'smooth'
                      })}>
                                        Visitar
                                    </PillButton>
                                </div>
                            </div>
                        </Reveal>)}
                </div>
            </div>
        </section>;
}

function Testimonials() {
  return <section className="py-20 lg:py-28 bg-secondary/50">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
                <Reveal>
                    <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Depoimentos</span>
                    <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                        Histórias reais da nossa comunidade
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-md">
                        Famílias e alunos que viveram de perto a proposta pedagógica do Colégio Albert Einstein.
                    </p>
                    <div className="mt-8 flex gap-5 rounded-3xl bg-card border border-border p-7">
                        <div className="flex flex-col items-center gap-2 shrink-0">
                            <span className="grid place-items-center h-8 w-8 rounded-full bg-accent/15 text-accent">
                                <ArrowUp className="h-4 w-4" />
                            </span>
                            <span className="grid place-items-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                                <ArrowDown className="h-4 w-4" />
                            </span>
                        </div>
                        <div>
                            <Quote className="h-6 w-6 text-accent/60" />
                            <p className="mt-2 text-foreground leading-relaxed">
                                Meu filho encontrou no Colégio Albert Einstein um ambiente acolhedor e exigente ao mesmo tempo.
                                Em poucos meses, vimos evolução real no desempenho e na confiança dele.
                            </p>
                            <div className="mt-4 text-sm font-600 text-primary">Mãe de aluno do Fundamental II</div>
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={0.1} className="flex justify-center lg:justify-end">
                    <div className="flex flex-col gap-4">
                        <span className="grid place-items-center h-16 w-16 rounded-full ring-4 ring-background overflow-hidden bg-accent/15 text-accent">
                            <img src={IMG.founder} alt="" className="h-full w-full object-cover" />
                        </span>
                        <span className="grid place-items-center h-16 w-16 rounded-full ring-4 ring-background overflow-hidden bg-accent/15 text-accent ml-8">
                            <img src={IMG.finance} alt="" className="h-full w-full object-cover" />
                        </span>
                        <span className="grid place-items-center h-16 w-16 rounded-full ring-4 ring-background overflow-hidden bg-accent/15 text-accent ml-16">
                            <GraduationCap className="h-6 w-6" />
                        </span>
                    </div>
                </Reveal>
            </div>
        </section>;
}

const ETAPAS = [{
  key: 'infantil',
  range: '2–5',
  unit: 'anos',
  title: 'Educação Infantil',
  text: 'Primeiros passos da alfabetização com muito cuidado, brincadeiras e descobertas.',
  items: ['Turmas reduzidas', 'Estímulo à autonomia', 'Parquinho e espaços lúdicos', 'Acompanhamento pedagógico próximo'],
  highlight: false
}, {
  key: 'fundamental',
  range: '6–14',
  unit: 'anos',
  title: 'Ensino Fundamental',
  text: 'Base sólida em conteúdo e valores, com metodologia UNOPAR e foco em resultados.',
  items: ['Material didático UNOPAR', 'Laboratórios e biblioteca', 'Preparação para o Ensino Médio', 'Acompanhamento individualizado'],
  highlight: true
}];
function Etapas() {
  return <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 text-center">
                <Reveal>
                    <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Matrículas abertas</span>
                    <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl leading-tight">
                        Escolha a etapa ideal para o seu filho.
                    </h2>
                </Reveal>
                <div className="mt-14 grid sm:grid-cols-2 gap-6 text-left">
                    {ETAPAS.map((e, i) => <Reveal key={e.key} delay={i * 0.1} className={`rounded-3xl p-8 ${e.highlight ? 'bg-white text-foreground' : 'bg-white/5 border border-white/10'}`}>
                            <h3 className={`font-display font-700 text-lg ${e.highlight ? 'text-primary' : ''}`}>{e.title}</h3>
                            <div className="mt-4 flex items-end gap-2">
                                <span className={`font-display font-900 text-5xl ${e.highlight ? 'text-primary' : 'text-accent'}`}>{e.range}</span>
                                <span className={`text-sm pb-1.5 ${e.highlight ? 'text-muted-foreground' : 'text-primary-foreground/60'}`}>{e.unit}</span>
                            </div>
                            <p className={`mt-3 text-sm ${e.highlight ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>{e.text}</p>
                            <div className="mt-6">
                                <PillButton href={WHATSAPP_URL} variant={e.highlight ? 'solid' : 'accent'} className="w-full justify-center">
                                    Matricule-se
                                </PillButton>
                            </div>
                            <ul className="mt-6 space-y-2.5">
                                {e.items.map(t => <li key={t} className={`flex items-start gap-2.5 text-sm ${e.highlight ? 'text-foreground' : 'text-primary-foreground/85'}`}>
                                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {t}
                                    </li>)}
                            </ul>
                        </Reveal>)}
                </div>
            </div>
        </section>;
}

function Contato() {
  return <section id="contato" className="py-20 lg:py-28 bg-secondary/50">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 grid lg:grid-cols-2 gap-14">
                <Reveal>
                    <span className="text-sm font-600 uppercase tracking-[0.2em] text-accent">Contato</span>
                    <h2 className="mt-3 font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                        Venha conhecer o Colégio Albert Einstein
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Estamos à disposição para tirar suas dúvidas e apresentar nossa proposta pedagógica.
                        Entre em contato pelos canais abaixo.
                    </p>
                    <div className="mt-8 space-y-5">
                        {[{
            icon: Phone,
            t: 'Telefone',
            s: '(63) 98122-8732'
          }, {
            icon: Mail,
            t: 'E-mail',
            s: 'seceinsteincolinastocantins@outlook.com'
          }, {
            icon: MapPin,
            t: 'Endereço',
            s: 'Rua Raul do Espírito Santo, 1074'
          }].map(c => <div key={c.t} className="flex items-start gap-4">
                                <span className="grid place-items-center h-11 w-11 rounded-xl bg-accent/15 text-accent shrink-0">
                                    <c.icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <div className="font-600 text-foreground">{c.t}</div>
                                    <div className="text-sm text-muted-foreground">{c.s}</div>
                                </div>
                            </div>)}
                        <div className="flex items-start gap-4">
                            <span className="grid place-items-center h-11 w-11 rounded-xl bg-accent/15 text-accent shrink-0">
                                <Clock className="h-5 w-5" />
                            </span>
                            <div>
                                <div className="font-600 text-foreground">Horário de atendimento</div>
                                <div className="text-sm text-muted-foreground space-y-0.5 mt-1">
                                    <div>Segunda a sexta-feira: 07:00-17:00</div>

                                    <div>Sábado: Fechado</div>
                                    <div>Domingo: Fechado</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="rounded-3xl border border-border bg-card p-7">
                        <ContactFields />
                    </div>
                </Reveal>
            </div>
        </section>;
}
function ContactFields() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return <div className="text-center py-14">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h3 className="mt-4 font-display font-700 text-xl text-primary">Mensagem enviada!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Agradecemos o contato. Retornaremos em breve.</p>
            </div>;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    setSent(true);
  }} className="space-y-4">
            <div className="grid gap-2">
                <label className="text-sm font-500 text-foreground">Nome</label>
                <input required className="rounded-2xl border border-input bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring/40" placeholder="Seu nome" />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-500 text-foreground">E-mail</label>
                <input required type="email" className="rounded-2xl border border-input bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring/40" placeholder="voce@email.com" />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-500 text-foreground">Mensagem</label>
                <textarea required rows={4} className="rounded-2xl border border-input bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring/40 resize-none" placeholder="Como podemos ajudar?" />
            </div>
            <PillButton type="submit" variant="solid" className="w-full justify-center">
                Enviar mensagem
            </PillButton>
        </form>;
}
function CTAFinal() {
  return <section className="py-20 lg:py-28 bg-background">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <h2 className="font-display font-900 text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                        Venha construir o futuro dos seus filhos com a gente.
                    </h2>
                    <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
                        Agende uma visita, conheça nossa estrutura e converse com nossa equipe sobre a proposta
                        pedagógica do Colégio Albert Einstein.
                    </p>
                    <div className="mt-8">
                        <PillButton href={WHATSAPP_URL} variant="solid">Fale pelo WhatsApp</PillButton>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <ImageCarousel images={IMG.classroom} alt="Alunos do Colégio Albert Einstein" className="rounded-3xl aspect-[4/3] w-full" />
                </Reveal>
            </div>
        </section>;
}
function Footer() {
  return <footer className="relative overflow-hidden bg-primary text-primary-foreground pt-14 pb-8">
            <div className="mx-auto max-w-[90rem] px-5 lg:px-10">
                <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="grid place-items-center h-12 w-12 rounded-full bg-white overflow-hidden">
                                <img src={LOGO} alt="anglo Einstein" className="h-full w-full object-contain p-0.5" />
                            </span>
                            <span className="font-display font-700 text-lg">Colégio Albert Einstein</span>
                        </div>
                        <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs">
                            Educação de excelência desde 1989, formando gerações com valores e conhecimento.
                        </p>
                        <div className="mt-4 text-xs text-primary-foreground/60 space-y-0.5">
                            <p>SUELENA ALVES DE CARVALHO TORRES LTDA</p>
                            <p>CNPJ: 20.006.238/0001-31</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-600 text-sm uppercase tracking-wider text-accent">Navegação</h4>
                        <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
                            {NAV.map(n => <li key={n.id}>
                                    <button onClick={() => document.getElementById(n.id)?.scrollIntoView({
                behavior: 'smooth'
              })} className="hover:text-accent transition-colors">{n.label}</button>
                                </li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-600 text-sm uppercase tracking-wider text-accent">Contato</h4>
                        <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
                            <li>contato@colegioalberteinstein.com.br</li>
                            <li>(63) 99991-9976</li>
                            <li className="pt-2 border-t border-white/10 mt-2">Seg a Sex: 07:00–17:00</li>
                            <li>Sábado e Domingo: Fechado</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60 sm:pr-20">
                    <p>© {new Date().getFullYear()} Colégio Albert Einstein. Todos os direitos reservados.</p>
                    <p>Parceria pedagógica UNOPAR desde 2004.</p>
                </div>
            </div>
            <span className="pointer-events-none absolute -bottom-[6vw] inset-x-0 text-center font-display font-900 text-[13vw] leading-none select-none whitespace-nowrap bg-gradient-to-b from-white/25 via-white/8 to-transparent bg-clip-text text-transparent">
                EINSTEIN
            </span>
        </footer>;
}
function WhatsAppFloat() {
  return <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp" className="fixed bottom-6 right-6 z-50 grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white hover:scale-105 active:scale-95 transition-transform animate-floaty">
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
                <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.37L3.2 28.8l6.6-1.7a12.75 12.75 0 0 0 6.2 1.58h.01c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.68-12.81-12.68zm0 23.36h-.01a10.5 10.5 0 0 1-5.37-1.47l-.38-.23-3.92 1.02 1.04-3.82-.25-.4a10.55 10.55 0 0 1-1.6-5.56c0-5.84 4.75-10.6 10.6-10.6 2.83 0 5.49 1.1 7.49 3.11a10.5 10.5 0 0 1 3.1 7.49c-.01 5.84-4.76 10.46-10.7 10.46zm5.82-7.85c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.53-.54-.72-.55-.19-.01-.4-.01-.61-.01a1.18 1.18 0 0 0-.85.4c-.29.32-1.11 1.08-1.11 2.64 0 1.55 1.14 3.05 1.3 3.26.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.51.27-.75.27-1.39.19-1.51-.08-.13-.29-.21-.61-.37z" />
            </svg>
        </a>;
}
const HomePage = () => {
  return <div className="relative overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <main>
                <Hero />
                <Historia />
                <MissaoVisaoValores />
                <Equipe />
                <Estrutura />
                <Conquistas />
                <Testimonials />
                <Etapas />
                <Contato />
                <CTAFinal />
            </main>
            <Footer />
            <WhatsAppFloat />
        </div>;
};
export default HomePage;
