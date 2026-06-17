import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageShell, PageHero } from "@/components/PageShell";
import { DotGrid, GradientBlob } from "@/components/decor";
import { buildPageHead } from "@/i18n/head";
import { getCurrentLocale } from "@/i18n";
import { getSiteText } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => buildPageHead("contact"),
  component: ContactPage,
});

/** API endpoint — defaults to the /api/* CloudFront behaviour in front of API Gateway. */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/contact";

type Status = "idle" | "sending" | "success" | "error";

function ContactPage() {
  const { t } = useTranslation();
  const site = getSiteText(getCurrentLocale());
  const email = t("pages.contact.email");

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Build a pre-filled email from whatever the visitor typed — used as a fallback
  // when the API can't be reached (e.g. an overseas endpoint is blocked in China).
  const buildMailto = () => {
    const body = [
      `${t("pages.contact.form.name")}: ${form.name}`,
      `${t("pages.contact.form.company")}: ${form.company}`,
      `${t("pages.contact.form.email")}: ${form.email}`,
      `${t("pages.contact.form.phone")}: ${form.phone}`,
      "",
      `${t("pages.contact.form.message")}`,
      form.message,
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(
      t("pages.contact.subjectLine"),
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow={t("pages.contact.heroEyebrow")}
        title={site.pages.contact.heroTitle}
        subtitle={site.pages.contact.heroSubtitle}
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <GradientBlob className="-right-24 top-0 h-[380px] w-[380px] bg-primary/10" />
        <DotGrid className="text-primary/[0.04] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
            {/* Left — reassurance copy */}
            <div className="md:pt-4">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                {t("pages.contact.intro.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("pages.contact.intro.title")}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {t("pages.contact.intro.body")}
              </p>

              <dl className="mt-10 space-y-6 border-t border-border pt-8">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-medium text-foreground">
                      {t("pages.contact.intro.responseLabel")}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {t("pages.contact.intro.responseValue")}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-medium text-foreground">
                      {t("pages.contact.intro.emailLabel")}
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${email}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                  <p className="mt-4 max-w-sm leading-relaxed text-foreground">
                    {t("pages.contact.form.success")}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("pages.contact.form.title")}
                  </h3>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <Field
                      label={t("pages.contact.form.name")}
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder={t("pages.contact.form.namePlaceholder")}
                      autoComplete="name"
                    />
                    <Field
                      label={t("pages.contact.form.company")}
                      required
                      value={form.company}
                      onChange={update("company")}
                      placeholder={t("pages.contact.form.companyPlaceholder")}
                      autoComplete="organization"
                    />
                    <Field
                      label={t("pages.contact.form.email")}
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder={t("pages.contact.form.emailPlaceholder")}
                      autoComplete="email"
                    />
                    <Field
                      label={t("pages.contact.form.phone")}
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder={t("pages.contact.form.phonePlaceholder")}
                      autoComplete="tel"
                    />
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground"
                      >
                        {t("pages.contact.form.message")}
                        <span className="ml-1 text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={update("message")}
                        placeholder={t("pages.contact.form.messagePlaceholder")}
                        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {status === "error" && (
                      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                        <p className="text-sm text-destructive">{t("pages.contact.form.error")}</p>
                        <a
                          href={buildMailto()}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          {t("pages.contact.form.emailFallback")}
                        </a>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending"
                        ? t("pages.contact.form.sending")
                        : t("pages.contact.form.submit")}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
