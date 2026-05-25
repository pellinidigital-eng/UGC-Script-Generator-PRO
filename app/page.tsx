"use client";

import { useMemo, useState } from "react";
import {
  defaultInput,
  examples,
  generateScript,
  rememberOutput,
  type Creator,
  type Duration,
  type Energy,
  type Goal,
  type Platform,
  type ScriptInput,
  type ScriptOutput,
  type Style,
  type Tone
} from "@/lib/generator";

const VIRAL_ANALYZER_CHECKOUT_URL = "https://pellinidigital.com/cart/add?id=53617392714071&quantity=1&return_to=/checkout";

const platforms: Platform[] = ["TikTok", "Instagram Reels", "Meta Ads", "YouTube Shorts"];
const durations: Duration[] = ["15 sec", "30 sec", "60 sec"];
const styles: Style[] = ["Naturale", "Luxury", "Aggressivo elegante", "Testimonial", "TikTok native", "Educativo", "Storytelling", "Faceless"];
const creators: Creator[] = ["Uomo", "Donna", "Neutro"];
const energies: Energy[] = ["Bassa", "Media", "Alta"];
const goals: Goal[] = ["Vendita", "Lead", "DM", "Awareness", "Click sito"];
const tones: Tone[] = ["Diretto", "Amichevole", "Professionale", "Motivazionale", "Provocatorio soft"];

type CopyState = Record<string, boolean>;

function Field({
  label,
  value,
  onChange,
  placeholder,
  optional,
  area
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[.16em] text-white/48">
        {label}
        {optional ? <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/38">opzionale</span> : null}
      </span>
      <span className="input-shell block rounded-lg">
        {area ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            rows={3}
            className="min-h-24 w-full resize-none bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/28"
          />
        ) : (
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-12 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/28"
          />
        )}
      </span>
    </label>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-white/48">{label}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-semibold transition duration-200 ${
              value === option
                ? "border-acid/60 bg-acid/14 text-acid shadow-[0_0_24px_rgba(183,255,95,.12)]"
                : "border-white/10 bg-white/[.035] text-white/62 hover:border-white/22 hover:bg-white/[.07] hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ id, text, copied, onCopy }: { id: string; text: string; copied: boolean; onCopy: (id: string, text: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onCopy(id, text)}
      className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-white/68 transition hover:border-aurora/40 hover:bg-aurora/10 hover:text-white"
      title="Copia"
    >
      {copied ? "Copiato" : "Copia"}
    </button>
  );
}

function OutputBlock({
  title,
  children,
  copy,
  copyId,
  copied,
  onCopy
}: {
  title: string;
  children: React.ReactNode;
  copy?: string;
  copyId?: string;
  copied?: boolean;
  onCopy?: (id: string, text: string) => void;
}) {
  return (
    <section className="premium-border rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        {copy && copyId && onCopy ? <CopyButton id={copyId} text={copy} copied={Boolean(copied)} onCopy={onCopy} /> : null}
      </div>
      <div className="text-sm leading-6 text-white/72">{children}</div>
    </section>
  );
}

function LoadingPanel() {
  return (
    <div className="premium-border rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="cinematic-skeleton mb-2 h-4 w-36 rounded-full" />
          <div className="cinematic-skeleton h-3 w-52 rounded-full" />
        </div>
        <div className="h-10 w-10 animate-soft-pulse rounded-full border border-acid/25 bg-acid/10" />
      </div>
      <div className="grid gap-3">
        <div className="cinematic-skeleton h-24 rounded-xl" />
        <div className="cinematic-skeleton h-16 rounded-xl" />
        <div className="cinematic-skeleton h-32 rounded-xl" />
      </div>
    </div>
  );
}

function EmptyState({ onExample }: { onExample: () => void }) {
  return (
    <div className="premium-border rounded-2xl p-6 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-aurora/25 bg-aurora/10 text-2xl shadow-glow">
        PRO
      </div>
      <h2 className="text-xl font-black text-white sm:text-2xl">Creative room pronta.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/58">
        Compila i dettagli del prodotto e genera uno script verticale con angolo, scene, CTA, prompt AI e storyboard.
      </p>
      <button
        type="button"
        onClick={onExample}
        className="mt-5 rounded-lg border border-white/12 bg-white/[.05] px-4 py-3 text-sm font-bold text-white transition hover:border-acid/40 hover:bg-acid/10"
      >
        Carica esempio premium
      </button>
    </div>
  );
}

function PremiumModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/72 p-4 backdrop-blur-md sm:items-center">
      <div className="premium-border w-full max-w-xl rounded-2xl p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-xs font-black text-acid">LOCKED PRO</div>
            <h2 className="text-2xl font-black leading-tight text-white">Vuoi sapere se questo script può davvero performare?</h2>
            <p className="mt-3 text-sm leading-6 text-white/62">
              Viral Reel Analyzer PRO analizza hook, retention, CTA e rischio flop prima che tu pubblichi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 shrink-0 rounded-lg border border-white/10 bg-white/[.04] text-white/70 transition hover:bg-white/10"
            title="Chiudi"
          >
            X
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {["Viral score", "Hook analysis", "Retention score", "CTA analysis", "Script migliorato", "Hook alternativi", "Caption ottimizzata"].map((benefit) => (
            <div key={benefit} className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-3 text-sm font-semibold text-white/76">
              {benefit}
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <a
            href={VIRAL_ANALYZER_CHECKOUT_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-acid px-5 py-4 text-center text-sm font-black text-obsidian shadow-button transition hover:scale-[1.01]"
          >
            Sblocca Viral Reel Analyzer PRO
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/12 bg-white/[.04] px-5 py-4 text-sm font-bold text-white/72 transition hover:bg-white/10"
          >
            Continua senza analisi
          </button>
        </div>
      </div>
    </div>
  );
}

function serializeOutput(output: ScriptOutput) {
  return [
    `Nome campagna/video: ${output.campaignName}`,
    `Angolo creativo: ${output.creativeAngle}`,
    `Hook iniziale: ${output.hook}`,
    `Hook alternativo A/B: ${output.hookAB}`,
    `Script completo:\n${output.script}`,
    `Timeline:\n${output.timeline.join("\n")}`,
    `Scene:\n${output.scenes.join("\n")}`,
    `Inquadrature:\n${output.shots.join("\n")}`,
    `Movimenti camera:\n${output.cameraMoves.join("\n")}`,
    `Espressioni creator:\n${output.expressions.join("\n")}`,
    `Testi a schermo:\n${output.onScreenTexts.join("\n")}`,
    `CTA finale: ${output.finalCta}`,
    `CTA alternativa: ${output.alternateCta}`,
    `Caption:\n${output.caption}`,
    `Hashtag: ${output.hashtags.join(" ")}`,
    `Prompt Heygen:\n${output.heygenPrompt}`,
    `Prompt Canva:\n${output.canvaPrompt}`,
    `Prompt ElevenLabs:\n${output.elevenLabsPrompt}`,
    `Storyboard:\n${output.storyboard.join("\n")}`,
    `Consiglio conversione: ${output.conversionTip}`
  ].join("\n\n");
}

export default function Home() {
  const [input, setInput] = useState<ScriptInput>(defaultInput);
  const [output, setOutput] = useState<ScriptOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<CopyState>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [variant, setVariant] = useState(0);

  const completion = useMemo(() => {
    const required = [input.product, input.niche, input.target, input.problem, input.desire, input.benefit];
    return Math.round((required.filter((item) => item.trim()).length / required.length) * 100);
  }, [input]);

  const canGenerate = completion >= 84;

  function update<K extends keyof ScriptInput>(key: K, value: ScriptInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function copy(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied((current) => ({ ...current, [id]: true }));
    window.setTimeout(() => {
      setCopied((current) => ({ ...current, [id]: false }));
    }, 1400);
  }

  function runGenerate(nextVariant = variant + 1) {
    if (!canGenerate) return;
    setLoading(true);
    setVariant(nextVariant);
    window.setTimeout(() => {
      const next = generateScript(input, nextVariant);
      rememberOutput(next);
      setOutput(next);
      setLoading(false);
    }, 850);
  }

  function loadExample(index = Math.floor(Math.random() * examples.length)) {
    setInput(examples[index]);
    setOutput(null);
  }

  function exportText() {
    if (!output) return;
    const blob = new Blob([serializeOutput(output)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${output.campaignName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <PremiumModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <header className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-xs font-black text-acid">UGC Script Generator PRO</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-white/50">Client-side engine</span>
          </div>
          <h1 className="max-w-3xl text-3xl font-black leading-[1.02] text-white sm:text-5xl">
            Script verticali pronti da registrare, con regia e conversione incluse.
          </h1>
        </div>
        <div className="hidden rounded-2xl border border-white/10 bg-white/[.04] p-4 text-right lg:block">
          <div className="text-3xl font-black text-acid">{completion}%</div>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-white/38">brief quality</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[440px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:overflow-auto lg:pr-1 no-scrollbar">
          <section className="premium-border rounded-2xl p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-white">Creative Brief</h2>
                <p className="text-sm text-white/48">Input completi, output piu' incisivo.</p>
              </div>
              <button
                type="button"
                onClick={() => loadExample()}
                className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-bold text-white/70 transition hover:border-aurora/40 hover:bg-aurora/10"
              >
                Esempio
              </button>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {["Brief", "DNA", "Output"].map((step, index) => (
                <div key={step} className="rounded-lg border border-white/10 bg-white/[.035] px-2 py-3 text-center">
                  <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/[.06] text-[11px] font-black text-acid">{index + 1}</div>
                  <div className="text-[11px] font-bold text-white/58">{step}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Field label="Nome prodotto/servizio" value={input.product} onChange={(value) => update("product", value)} placeholder="Es. SkinLab Serum C" />
              <Field label="Nicchia" value={input.niche} onChange={(value) => update("niche", value)} placeholder="Es. skincare premium, fitness, SaaS..." />
              <Field label="Target" value={input.target} onChange={(value) => update("target", value)} placeholder="Chi deve sentirsi chiamato in causa?" area />
              <Field label="Problema pubblico" value={input.problem} onChange={(value) => update("problem", value)} placeholder="Quale attrito vive oggi?" area />
              <Field label="Desiderio pubblico" value={input.desire} onChange={(value) => update("desire", value)} placeholder="Che risultato vuole davvero?" area />
              <Field label="Beneficio principale" value={input.benefit} onChange={(value) => update("benefit", value)} placeholder="Trasformazione concreta e visibile" area />
              <Field label="Prezzo/offerta" value={input.offer} onChange={(value) => update("offer", value)} placeholder="Es. -20%, trial, bonus, spedizione gratuita" optional />
            </div>
          </section>

          <section className="premium-border rounded-2xl p-4">
            <div className="mb-4">
              <h2 className="text-lg font-black text-white">Production DNA</h2>
              <p className="text-sm text-white/48">Piattaforma, ritmo, tono e obiettivo.</p>
            </div>
            <div className="space-y-5">
              <Segmented label="Piattaforma" value={input.platform} options={platforms} onChange={(value) => update("platform", value)} />
              <Segmented label="Durata" value={input.duration} options={durations} onChange={(value) => update("duration", value)} />
              <Segmented label="Stile" value={input.style} options={styles} onChange={(value) => update("style", value)} />
              <Segmented label="Creator" value={input.creator} options={creators} onChange={(value) => update("creator", value)} />
              <Segmented label="Energia" value={input.energy} options={energies} onChange={(value) => update("energy", value)} />
              <Segmented label="Obiettivo" value={input.goal} options={goals} onChange={(value) => update("goal", value)} />
              <Segmented label="Tono" value={input.tone} options={tones} onChange={(value) => update("tone", value)} />
            </div>
          </section>
        </aside>

        <section className="space-y-4">
          <div className="premium-border rounded-2xl p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <button
                type="button"
                disabled={!canGenerate || loading}
                onClick={() => runGenerate()}
                className="rounded-lg bg-acid px-5 py-4 text-sm font-black text-obsidian shadow-button transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Generazione cinematica..." : output ? "Rigenera variante" : "Genera script PRO"}
              </button>
              <button
                type="button"
                onClick={exportText}
                disabled={!output}
                className="rounded-lg border border-white/12 bg-white/[.04] px-5 py-4 text-sm font-bold text-white/72 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Esporta testo
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                disabled={!output}
                className="rounded-lg border border-coral/25 bg-coral/10 px-5 py-4 text-sm font-black text-coral transition hover:bg-coral/15 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Analizza questo script con Viral Reel Analyzer PRO 🔒
              </button>
            </div>
            {!canGenerate ? (
              <p className="mt-3 text-sm text-white/45">Completa almeno prodotto, nicchia, target, problema, desiderio e beneficio per sbloccare la generazione.</p>
            ) : null}
          </div>

          {loading ? <LoadingPanel /> : null}

          {!loading && !output ? <EmptyState onExample={() => loadExample(0)} /> : null}

          {!loading && output ? (
            <div className="space-y-4">
              <section className="premium-border rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-xs font-black text-acid">Quality score {output.qualityScore}</span>
                  <span className="rounded-full border border-aurora/25 bg-aurora/10 px-3 py-1 text-xs font-bold text-aurora">{output.pattern}</span>
                  <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-bold text-white/50">{input.platform} · {input.duration}</span>
                </div>
                <h2 className="mt-4 text-2xl font-black text-white">{output.campaignName}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">{output.creativeAngle}</p>
              </section>

              <div className="grid gap-4 xl:grid-cols-2">
                <OutputBlock title="Hook iniziale" copy={output.hook} copyId="hook" copied={copied.hook} onCopy={copy}>
                  <p className="text-lg font-black leading-7 text-white">{output.hook}</p>
                </OutputBlock>
                <OutputBlock title="Hook alternativo A/B" copy={output.hookAB} copyId="hookab" copied={copied.hookab} onCopy={copy}>
                  <p className="text-lg font-black leading-7 text-white">{output.hookAB}</p>
                </OutputBlock>
              </div>

              <OutputBlock title="Script completo parola per parola" copy={output.script} copyId="script" copied={copied.script} onCopy={copy}>
                <p className="whitespace-pre-line">{output.script}</p>
              </OutputBlock>

              <div className="grid gap-4 xl:grid-cols-2">
                <OutputBlock title="Timeline per secondi">
                  <ul className="space-y-2">{output.timeline.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
                <OutputBlock title="Scene da registrare">
                  <ul className="space-y-2">{output.scenes.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
                <OutputBlock title="Inquadrature">
                  <ul className="space-y-2">{output.shots.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
                <OutputBlock title="Movimenti camera">
                  <ul className="space-y-2">{output.cameraMoves.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
                <OutputBlock title="Espressioni creator">
                  <ul className="space-y-2">{output.expressions.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
                <OutputBlock title="Testi a schermo">
                  <ul className="space-y-2">{output.onScreenTexts.map((item) => <li key={item}>{item}</li>)}</ul>
                </OutputBlock>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <OutputBlock title="CTA finale" copy={output.finalCta} copyId="cta" copied={copied.cta} onCopy={copy}>
                  <p className="font-bold text-white">{output.finalCta}</p>
                </OutputBlock>
                <OutputBlock title="CTA alternativa" copy={output.alternateCta} copyId="cta2" copied={copied.cta2} onCopy={copy}>
                  <p className="font-bold text-white">{output.alternateCta}</p>
                </OutputBlock>
              </div>

              <OutputBlock title="Caption completa" copy={output.caption} copyId="caption" copied={copied.caption} onCopy={copy}>
                <p>{output.caption}</p>
                <div className="mt-3 flex flex-wrap gap-2">{output.hashtags.map((tag) => <span key={tag} className="rounded-full bg-white/[.05] px-2 py-1 text-xs text-aurora">{tag}</span>)}</div>
              </OutputBlock>

              <div className="grid gap-4 xl:grid-cols-3">
                <OutputBlock title="Prompt Heygen" copy={output.heygenPrompt} copyId="heygen" copied={copied.heygen} onCopy={copy}>
                  <p>{output.heygenPrompt}</p>
                </OutputBlock>
                <OutputBlock title="Prompt Canva" copy={output.canvaPrompt} copyId="canva" copied={copied.canva} onCopy={copy}>
                  <p>{output.canvaPrompt}</p>
                </OutputBlock>
                <OutputBlock title="Prompt ElevenLabs" copy={output.elevenLabsPrompt} copyId="eleven" copied={copied.eleven} onCopy={copy}>
                  <p>{output.elevenLabsPrompt}</p>
                </OutputBlock>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                <OutputBlock title="Storyboard sintetico">
                  <ol className="space-y-2">{output.storyboard.map((item) => <li key={item}>{item}</li>)}</ol>
                </OutputBlock>
                <OutputBlock title="Consiglio finale conversione">
                  <p className="text-base font-semibold text-white">{output.conversionTip}</p>
                </OutputBlock>
              </div>

              <section className="premium-border rounded-2xl p-5">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-lg font-black text-white">QA anti-ripetizione attivo</h3>
                    <p className="mt-1 text-sm text-white/52">Seed input + timestamp, memoria locale, weighted randomization e rigenerazione automatica se il testo e' troppo vicino al brief.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy("all", serializeOutput(output))}
                    className="rounded-lg border border-white/12 bg-white/[.04] px-5 py-4 text-sm font-bold text-white/72 transition hover:bg-white/10"
                  >
                    {copied.all ? "Output copiato" : "Copia tutto"}
                  </button>
                </div>
              </section>
            </div>
          ) : null}

          <section className="grid gap-3 pb-10 sm:grid-cols-3">
            {["Hook che cambiano pattern", "CTA alternate per obiettivo", "Prompt AI pronti per produzione"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-4">
                <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-acid via-aurora to-coral" />
                <p className="text-sm font-bold text-white/76">{item}</p>
              </div>
            ))}
          </section>

          <section className="premium-border mb-10 rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-white">FAQ PRO</h2>
                <p className="text-sm text-white/48">Dettagli operativi per creator e advertiser.</p>
              </div>
              <span className="rounded-full border border-acid/30 bg-acid/10 px-3 py-1 text-xs font-black text-acid">Premium</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Serve una API AI?", "No. Il motore usa logiche locali, pattern pesati e seed dinamici."],
                ["Posso testare piu' hook?", "Si. Rigenera varianti e confronta il primo frame con lo stesso brief."],
                ["E per ads Meta?", "Usa obiettivo, tono e durata per creare CTA e ritmo coerenti con traffico freddo."]
              ].map(([question, answer]) => (
                <div key={question} className="rounded-xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="text-sm font-black text-white">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/56">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
