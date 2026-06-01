import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Shield, ShieldCheck, Lock, Terminal, Activity, Server, Bug, Network,
  Cpu, KeyRound, Eye, ArrowRight, Github, Mail, MapPin, Award, Zap, Radar,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSec — Elite Security Operator" },
      { name: "description", content: "Penetration testing, threat intel y arquitectura de seguridad de élite." },
    ],
  }),
  component: Index,
});

function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01ABCDEF{}<>/$#@*".split("");
    const fontSize = 14;
    let drops: number[] = [];
    const initDrops = () => {
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    };
    initDrops();
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(10,14,26,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,170,0.75)";
      ctx.font = `${fontSize}px "Fira Code", monospace`;
      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(() => setTimeout(draw, 55));
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-30" />;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const dur = 1400;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Index() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Top status bar */}
      <div className="border-b border-border bg-surface/60 px-4 py-2 text-xs font-code text-muted-foreground backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-success pulse-glow" />
            SYSTEM ONLINE · uptime 99.998%
          </span>
          <span className="hidden sm:inline">root@cybersec:~$ status --all</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary glow-border">
              <Shield className="h-5 w-5" />
            </div>
            <span className="font-tech text-lg font-bold tracking-widest">CYBER<span className="text-primary">SEC</span></span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {["Home", "Operations", "Services", "Skills", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-muted-foreground transition hover:text-primary">
                {l}
              </a>
            ))}
          </div>
          <a href="#contact" className="hidden rounded-md border border-primary/40 bg-primary/10 px-4 py-2 font-code text-xs text-primary transition hover:bg-primary/20 md:inline-block">
            ./hire_me.sh
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <MatrixCanvas />
        <div className="absolute inset-0 grid-bg" />
        <div className="scanline pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2 lg:py-32">
          <div className="animate-float-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-code text-xs text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              ELITE SECURITY EXPERT · AVAILABLE
            </div>
            <h1 className="mt-6 font-tech text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              PROTECTING<br />
              <span className="text-gradient">DIGITAL</span><br />
              FRONTIERS<span className="text-primary cursor-blink">_</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Penetration testing · Threat intelligence · Arquitectura zero-trust.
              Diez años rompiendo y reconstruyendo defensas para empresas Fortune 500.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 font-code text-xs">
              {["Penetration Testing", "Red Team Ops", "OWASP Top 10", "Zero-Trust"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-surface px-3 py-1.5">{t}</span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-tech text-sm font-bold text-primary-foreground transition hover:shadow-[var(--shadow-glow-strong)]">
                SECURE YOUR SYSTEM <Lock className="h-4 w-4 transition group-hover:scale-110" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3 font-tech text-sm transition hover:border-primary hover:text-primary">
                VIEW SERVICES <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Terminal card */}
          <div className="relative animate-float-up rounded-xl border border-border bg-surface/90 shadow-2xl glow-border [animation-delay:200ms]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-danger" />
                <span className="h-3 w-3 rounded-full bg-warning" />
                <span className="h-3 w-3 rounded-full bg-success" />
              </div>
              <span className="font-code text-xs text-muted-foreground">~/security/protocols</span>
              <Terminal className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2 p-6 font-code text-sm">
              <div><span className="text-primary">root@cybersec</span>:<span className="text-secondary">~$</span> ./init_security.sh</div>
              <div className="text-muted-foreground">[INFO] Scanning vulnerabilities...</div>
              <div className="text-muted-foreground">[INFO] Firewall: <span className="text-success">ACTIVE</span></div>
              <div className="text-muted-foreground">[INFO] Encryption: <span className="text-success">AES-256</span></div>
              <div className="text-muted-foreground">[INFO] IDS/IPS: <span className="text-success">ONLINE</span></div>
              <div className="text-muted-foreground">[WARN] 3 threats <span className="text-warning">QUARANTINED</span></div>
              <div className="text-success">[SUCCESS] System secured. Access granted.</div>
              <div className="pt-2"><span className="text-primary">root@cybersec</span>:<span className="text-secondary">~$</span> <span className="cursor-blink text-primary">▊</span></div>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
              {[
                { icon: Activity, label: "Threats Blocked", v: "12,847" },
                { icon: Radar, label: "Scans / hour", v: "1.2k" },
              ].map(({ icon: I, label, v }) => (
                <div key={label} className="flex items-center gap-3 bg-surface p-4">
                  <I className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-tech text-lg font-bold">{v}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 500, s: "+", l: "Systems Secured", i: Server },
            { n: 10, s: "+", l: "Years Experience", i: Award },
            { n: 25, s: "", l: "Certifications", i: ShieldCheck },
            { n: 200, s: "+", l: "Clients Protected", i: KeyRound },
          ].map(({ n, s, l, i: I }) => (
            <div key={l} className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition hover:border-primary/60 hover:bg-surface-hover">
              <I className="h-7 w-7 text-primary" />
              <div className="mt-4 font-tech text-4xl font-black"><Counter to={n} suffix={s} /></div>
              <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/25" />
            </div>
          ))}
        </div>
      </section>

      {/* OPERATIONS */}
      <section id="operations" className="relative border-y border-border bg-surface/40 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="// recent operations" title="Live threat intelligence" />
          <div className="mt-12 overflow-hidden rounded-xl border border-border bg-background">
            <div className="grid grid-cols-12 border-b border-border bg-surface px-4 py-3 font-code text-xs uppercase text-muted-foreground">
              <div className="col-span-2">Status</div>
              <div className="col-span-4">Operation</div>
              <div className="col-span-2 hidden md:block">Target</div>
              <div className="col-span-2 hidden md:block">Severity</div>
              <div className="col-span-2 text-right">Time</div>
            </div>
            {[
              { s: "RESOLVED", op: "SQL Injection mitigated", t: "fintech-prod", sev: "critical", time: "12m ago", c: "success" },
              { s: "ACTIVE",   op: "Phishing campaign blocked", t: "mail-gateway", sev: "high",   time: "1h ago",  c: "warning" },
              { s: "RESOLVED", op: "Zero-day patched", t: "k8s-cluster", sev: "critical", time: "3h ago", c: "success" },
              { s: "ACTIVE",   op: "DDoS mitigation", t: "edge-cdn", sev: "medium", time: "5h ago", c: "secondary" },
              { s: "AUDIT",    op: "Quarterly pentest report", t: "client #042", sev: "info", time: "1d ago", c: "primary" },
            ].map((r, i) => (
              <div key={i} className="grid grid-cols-12 items-center border-b border-border px-4 py-4 font-code text-sm last:border-0 transition hover:bg-surface/60">
                <div className="col-span-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                    r.c === "success" ? "bg-success/15 text-success" :
                    r.c === "warning" ? "bg-warning/15 text-warning" :
                    r.c === "secondary" ? "bg-secondary/15 text-secondary" :
                    "bg-primary/15 text-primary"
                  }`}>{r.s}</span>
                </div>
                <div className="col-span-10 md:col-span-4">{r.op}</div>
                <div className="col-span-2 hidden text-muted-foreground md:block">{r.t}</div>
                <div className="col-span-2 hidden uppercase text-muted-foreground md:block">{r.sev}</div>
                <div className="col-span-2 hidden text-right text-muted-foreground md:block">{r.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="// services" title="Defensive & offensive capabilities" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: Bug, t: "Penetration Testing", d: "Auditorías ofensivas controladas para descubrir vectores antes que el adversario." },
              { i: Eye, t: "Threat Hunting", d: "Búsqueda proactiva de IoCs y TTPs con telemetría EDR y SIEM en tiempo real." },
              { i: Network, t: "Network Security", d: "Diseño de segmentación, micro-perímetros y políticas zero-trust." },
              { i: Cpu, t: "App Security", d: "Code review, SAST/DAST y modelado de amenazas STRIDE para apps críticas." },
              { i: Zap, t: "Incident Response", d: "Contención, erradicación y post-mortem 24/7 con cadena de custodia forense." },
              { i: ShieldCheck, t: "Compliance", d: "ISO 27001, SOC 2, PCI-DSS, GDPR. De auditoría a certificación." },
            ].map(({ i: I, t, d }) => (
              <article key={t} className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]">
                <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="font-tech text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                <div className="mt-4 flex items-center gap-2 font-code text-xs text-primary opacity-0 transition group-hover:opacity-100">
                  read manifest <ArrowRight className="h-3 w-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-y border-border bg-surface/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="// loadout" title="Arsenal & skill matrix" />
            <p className="mt-4 max-w-md text-muted-foreground">
              Diez años especializándome en red team, blue team y arquitectura zero-trust.
              Toolkit actualizado mensualmente.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 font-code text-xs">
              {["Burp Suite","Metasploit","Nmap","Wireshark","Splunk","CrowdStrike","Kubernetes","Terraform","Python","Rust","Ghidra","Volatility"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary hover:text-primary transition">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {[
              { l: "Offensive Security", v: 95 },
              { l: "Cloud Security (AWS/GCP/Azure)", v: 90 },
              { l: "Reverse Engineering", v: 82 },
              { l: "Cryptography", v: 78 },
              { l: "Incident Response", v: 92 },
            ].map((s) => (
              <div key={s.l}>
                <div className="mb-2 flex justify-between font-code text-sm">
                  <span>{s.l}</span>
                  <span className="text-primary">{s.v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="// initiate contact" title="Solicita una evaluación" />
            <p className="mt-4 max-w-md text-muted-foreground">
              Envía los detalles de tu infraestructura. Respuesta cifrada en menos de 24h.
            </p>
            <div className="mt-8 space-y-4 font-code text-sm">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> ops@cybersec.io</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Remote · LATAM / EU</div>
              <div className="flex items-center gap-3"><Github className="h-4 w-4 text-primary" /> github.com/cybersec</div>
            </div>
            <div className="mt-8 rounded-lg border border-border bg-surface p-4 font-code text-xs">
              <div className="mb-2 text-muted-foreground">PGP fingerprint</div>
              <div className="break-all text-primary">A1B2 C3D4 E5F6 7890 1234 5678 9ABC DEF0 1234 5678</div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="relative rounded-xl border border-border bg-surface p-6 glow-border"
          >
            <div className="mb-4 flex items-center gap-2 font-code text-xs text-muted-foreground">
              <Terminal className="h-4 w-4" /> secure_channel://encrypted
              <span className="ml-auto flex items-center gap-1 text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> TLS 1.3
              </span>
            </div>
            <div className="space-y-4">
              <Field label="Identifier" placeholder="Jane Doe" />
              <Field label="Encrypted email" type="email" placeholder="you@domain.com" />
              <Field label="Organization" placeholder="Acme Corp" />
              <div>
                <label className="mb-1 block font-code text-xs uppercase text-muted-foreground">Mission brief</label>
                <textarea required rows={5} placeholder="Describe target, scope, timeline..." className="w-full rounded-md border border-border bg-background px-3 py-2 font-code text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_20%,transparent)]" />
              </div>
              <button type="submit" disabled={sent} className="group relative w-full overflow-hidden rounded-md bg-primary px-6 py-3 font-tech text-sm font-bold text-primary-foreground transition hover:shadow-[var(--shadow-glow-strong)] disabled:opacity-70">
                {sent ? "TRANSMISSION RECEIVED ✓" : "TRANSMIT SECURELY"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface/40 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 font-code text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} CYBERSEC · All packets reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-glow" />
            Connection secure · AES-256-GCM
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="font-code text-xs uppercase text-primary">{eyebrow}</div>
      <h2 className="mt-3 font-tech text-4xl font-black leading-tight sm:text-5xl">{title}</h2>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1 block font-code text-xs uppercase text-muted-foreground">{label}</label>
      <input required {...props} className="w-full rounded-md border border-border bg-background px-3 py-2 font-code text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_20%,transparent)]" />
    </div>
  );
}
