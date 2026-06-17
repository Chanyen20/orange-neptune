import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { OrbitMotif } from "./decor";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 20%, oklch(0.95 0.04 230) 0%, oklch(0.78 0.10 235) 30%, oklch(0.55 0.15 245) 70%, oklch(0.38 0.14 255) 100%)",
        }}
      />
      <OrbitMotif className="absolute -right-24 -top-24 h-[420px] w-[420px] text-white/40" />
      <OrbitMotif className="absolute -bottom-32 -left-28 h-[360px] w-[360px] text-white/25" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-12 text-center">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium ring-1 ring-white/20">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
