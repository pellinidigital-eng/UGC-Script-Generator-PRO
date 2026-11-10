"use client";

import { useState } from "react";

const examples = [
  {
    label: "Prodotto artigianale",
    product: "Una borsa personalizzata",
    audience: "Chi cerca un regalo originale",
    hook: "Un regalo che non finisce dimenticato in un cassetto.",
    scene: "Mostra la borsa da vicino, poi il dettaglio del nome personalizzato.",
    cta: "Scrivici per scegliere il tuo modello."
  },
  {
    label: "Servizio professionale",
    product: "Una landing page per un'attività",
    audience: "Piccoli imprenditori",
    hook: "Hai un servizio valido, ma online non si capisce cosa offri?",
    scene: "Mostra prima una pagina confusa e poi una proposta chiara con una sola azione.",
    cta: "Richiedi un preventivo per la tua pagina."
  }
];

export default function PublicDemo() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];

  return (
    <main className="min-h-screen bg-[#0a1122] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-300">PelliniDigital · Anteprima gratuita</p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Guarda come nasce uno script UGC</h1>
        <p className="mb-8 max-w-2xl text-slate-300">Scegli uno dei due esempi per vedere il tipo di struttura che puoi ottenere. Questa è un'anteprima guidata, non il generatore PRO completo.</p>
        <label htmlFor="demo-example" className="mb-2 block font-semibold">Scegli un esempio</label>
        <select id="demo-example" value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mb-6 w-full rounded-xl border border-slate-500 bg-slate-900 p-3 text-white">
          {examples.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
        </select>
        <section aria-live="polite" className="rounded-2xl border border-slate-600 bg-[#14213b] p-6 shadow-xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-300">Brief di esempio</p>
          <p className="mb-5 text-slate-200">{example.product} · {example.audience}</p>
          <h2 className="mb-2 text-xl font-bold">Hook</h2>
          <p className="mb-5 text-slate-200">{example.hook}</p>
          <h2 className="mb-2 text-xl font-bold">Scena</h2>
          <p className="mb-5 text-slate-200">{example.scene}</p>
          <h2 className="mb-2 text-xl font-bold">Call to action</h2>
          <p className="text-slate-200">{example.cta}</p>
        </section>
        <p className="mt-5 text-sm text-slate-400">Esempi dimostrativi predefiniti. Il tool PRO consente di lavorare su brief personalizzati e strutture più complete.</p>
        <a className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-indigo-400 px-6 py-3 font-bold text-slate-950" href="https://www.pellinidigital.it/downloads/ugc-script-generator-pro/">Scopri UGC Script Generator PRO</a>
      </div>
    </main>
  );
}
