export type Platform = "TikTok" | "Instagram Reels" | "Meta Ads" | "YouTube Shorts";
export type Duration = "15 sec" | "30 sec" | "60 sec";
export type Style =
  | "Naturale"
  | "Luxury"
  | "Aggressivo elegante"
  | "Testimonial"
  | "TikTok native"
  | "Educativo"
  | "Storytelling"
  | "Faceless";
export type Creator = "Uomo" | "Donna" | "Neutro";
export type Energy = "Bassa" | "Media" | "Alta";
export type Goal = "Vendita" | "Lead" | "DM" | "Awareness" | "Click sito";
export type Tone = "Diretto" | "Amichevole" | "Professionale" | "Motivazionale" | "Provocatorio soft";

export type ScriptInput = {
  product: string;
  niche: string;
  target: string;
  problem: string;
  desire: string;
  benefit: string;
  offer: string;
  platform: Platform;
  duration: Duration;
  style: Style;
  creator: Creator;
  energy: Energy;
  goal: Goal;
  tone: Tone;
};

export type ScriptOutput = {
  campaignName: string;
  creativeAngle: string;
  hook: string;
  hookAB: string;
  script: string;
  timeline: string[];
  scenes: string[];
  shots: string[];
  cameraMoves: string[];
  expressions: string[];
  onScreenTexts: string[];
  finalCta: string;
  alternateCta: string;
  caption: string;
  hashtags: string[];
  heygenPrompt: string;
  canvaPrompt: string;
  elevenLabsPrompt: string;
  storyboard: string[];
  conversionTip: string;
  qualityScore: number;
  pattern: string;
};

type Weighted<T> = { value: T; weight: number };

const forbiddenPhrases = [
  "scopri come",
  "se anche tu",
  "ti svelo",
  "metodo segreto",
  "clicca qui"
];

const structures: Weighted<string>[] = [
  { value: "hook shock", weight: 12 },
  { value: "hook POV", weight: 11 },
  { value: "curiosita tesa", weight: 11 },
  { value: "storytelling in prima persona", weight: 10 },
  { value: "mini tutorial", weight: 10 },
  { value: "contrarian", weight: 9 },
  { value: "domanda forte", weight: 8 },
  { value: "errore comune", weight: 10 },
  { value: "testimonianza concreta", weight: 9 },
  { value: "diagnosi rapida", weight: 8 },
  { value: "prima/dopo narrativo", weight: 8 },
  { value: "myth busting", weight: 7 }
];

const creativeAngles = [
  "La frizione invisibile che blocca la decisione",
  "Il prima/dopo senza trasformazione finta",
  "L'errore silenzioso che costa tempo, soldi o fiducia",
  "La prova sociale raccontata come micro scena reale",
  "Il cambio di prospettiva che rende ovvia la soluzione",
  "La checklist mentale che il pubblico fa prima di comprare",
  "Il momento in cui il problema diventa impossibile da ignorare",
  "La soluzione premium presentata con calma, non con hype",
  "Il confronto tra scelta improvvisata e scelta professionale",
  "La piccola abitudine che crea un risultato percepito enorme",
  "Il dietro le quinte che rende credibile la promessa",
  "Il costo nascosto del rimandare"
];

const openings = [
  "Questa e' la parte che quasi nessuno guarda, ma decide tutto.",
  "Il problema non e' la motivazione. E' il punto esatto in cui perdi chiarezza.",
  "Se lo stai valutando da giorni, probabilmente non ti manca interesse: ti manca una prova concreta.",
  "Il momento critico arriva prima del prezzo, prima del confronto, prima del checkout.",
  "La differenza tra un contenuto ignorato e uno salvato spesso sta nei primi tre secondi.",
  "Quando una scelta sembra complicata, di solito c'e' un dettaglio che sta rubando fiducia.",
  "Non serve urlare di piu'. Serve far vedere il problema meglio.",
  "La maggior parte delle persone cerca la soluzione nel posto sbagliato.",
  "C'e' una ragione se continui a rimandare questa cosa.",
  "Questo e' il tipo di errore che sembra piccolo finche' non lo misuri."
];

const hookFrames = [
  "Stai perdendo {loss} per un dettaglio che sembra innocuo.",
  "Prima di scegliere {category}, guarda cosa succede quando ignori questo passaggio.",
  "Il tuo pubblico non compra quando capisce tutto. Compra quando si riconosce.",
  "POV: hai provato a sistemare {pain}, ma il vero blocco era altrove.",
  "Tre segnali che {audience} sta chiedendo una soluzione piu' semplice.",
  "La cosa piu' costosa non e' il prezzo: e' continuare con il vecchio sistema.",
  "Se {desireShort} sembra lontano, controlla prima questo.",
  "Quello che fai dopo il primo dubbio decide se perdi o converti.",
  "Nessuno parla del momento in cui {pain} diventa una scelta quotidiana.",
  "Il modo elegante per trasformare indecisione in azione."
];

const storyBeats = [
  "Apertura con frizione concreta",
  "Micro prova visiva",
  "Contrasto tra vecchio comportamento e nuova possibilita'",
  "Beneficio reso osservabile",
  "Obiezione neutralizzata senza difensiva",
  "CTA coerente con il livello di fiducia",
  "Chiusura con immagine mentale memorabile"
];

const objections = [
  "Non ho tempo per iniziare",
  "Ho gia' provato qualcosa di simile",
  "Non so se fa per me",
  "Il prezzo mi fa esitare",
  "Ho paura che sia complicato",
  "Non voglio sembrare principiante",
  "Mi serve una prova prima di decidere",
  "Posso farlo da solo piu' avanti"
];

const transitions = [
  "E qui cambia il punto.",
  "Guarda la differenza.",
  "Ora rendiamolo pratico.",
  "Questo e' il passaggio che manca.",
  "Da qui diventa semplice.",
  "La parte interessante e' questa.",
  "Ecco il confronto reale.",
  "Tieni d'occhio questo dettaglio."
];

const ctas = {
  soft: [
    "Salva questo video e valuta la prossima mossa con calma.",
    "Quando vuoi fare il passo giusto, parti da qui.",
    "Guarda l'offerta e scegli solo se senti che e' il momento.",
    "Tienilo aperto: ti servira' quando vorrai smettere di improvvisare."
  ],
  aggressive: [
    "Non aspettare un altro ciclo di tentativi. Entra ora e chiudi il problema.",
    "Fai la scelta che ti evita altri mesi di prove a vuoto.",
    "Se il problema e' gia' chiaro, rimandare e' solo un costo.",
    "Passa alla versione seria della tua strategia oggi."
  ],
  dm: [
    "Scrivi 'PRO' in DM e ti mando il punto di partenza piu' adatto.",
    "Mandami 'CHECK' in DM e capiamo dove si blocca la conversione.",
    "Scrivi 'START' e ricevi il primo step senza confusione.",
    "DM con la parola 'FOCUS' e ti rispondo con la direzione migliore."
  ],
  curiosity: [
    "Apri il link e guarda cosa cambia quando togli il collo di bottiglia.",
    "Vai a vedere la pagina: la parte piu' interessante e' il confronto.",
    "Lascia che sia la demo a chiarirti il punto.",
    "Controlla i dettagli prima che il prossimo dubbio ti rallenti."
  ],
  click: [
    "Tocca il link e scegli il percorso piu' adatto.",
    "Vai alla pagina e guarda l'opzione disponibile ora.",
    "Apri il sito e parti dalla versione piu' semplice.",
    "Segui il link e trasforma questa intenzione in un'azione concreta."
  ]
};

const visualDirections = [
  "close-up sul volto con luce laterale e sfondo ordinato",
  "inquadratura tre quarti, mani visibili, prodotto o mockup in scena",
  "ripresa POV con telefono in mano e gesto naturale",
  "taglio rapido su schermata, appunto, pacco, risultato o dettaglio operativo",
  "camera fissa da scrivania, ritmo calmo e autorevole",
  "B-roll minimal: gesto, texture, dettaglio, prima/dopo",
  "faceless con mani, overlay grandi e ritmo editoriale",
  "walk-and-talk in ambiente reale con micro pause intenzionali"
];

const cameraMoves = [
  "push-in lento nei primi due secondi",
  "jump cut sul cambio di idea",
  "whip pan morbido tra problema e soluzione",
  "zoom digitale leggero sul testo chiave",
  "tilt down verso il dettaglio che prova il beneficio",
  "cut secco su reazione del creator",
  "rack focus simulato dal volto all'oggetto",
  "split screen rapido con vecchio vs nuovo comportamento"
];

const expressions = [
  "sguardo concentrato, sopracciglio appena alzato",
  "mezzo sorriso sicuro, tono calmo",
  "pausa breve prima della frase chiave",
  "espressione incredula ma controllata",
  "energia alta senza sembrare teatrale",
  "tono confidenziale, come un consiglio privato",
  "sicurezza professionale, ritmo pulito",
  "reazione di sollievo dopo la dimostrazione"
];

const captionOpeners = [
  "Il contenuto che converte non spinge: rimuove attrito.",
  "Quando il pubblico si riconosce, la decisione diventa piu' semplice.",
  "La conversione spesso nasce da un dettaglio che rende la promessa credibile.",
  "Il problema non va gonfiato. Va mostrato nel momento esatto in cui pesa.",
  "Un video breve puo' fare molto quando ha un angolo chiaro."
];

const campaignAdjectives = ["Signal", "Momentum", "Proof", "Velocity", "Frame", "Pulse", "Lift", "Focus", "Clarity", "Edge"];

const memoryKey = "ugc-pro-recent-signatures";

function hash(input: string) {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function createRng(seed: number) {
  let state = seed || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return ((state >>> 0) / 4294967296);
  };
}

function pick<T>(rng: () => number, items: T[]) {
  return items[Math.floor(rng() * items.length) % items.length];
}

function pickWeighted<T>(rng: () => number, items: Weighted<T>[]) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let cursor = rng() * total;
  for (const item of items) {
    cursor -= item.weight;
    if (cursor <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

function words(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !["questo", "questa", "sono", "della", "degli", "delle", "come", "perche"].includes(word));
}

function similarity(a: string, b: string) {
  const setA = new Set(words(a));
  const setB = new Set(words(b));
  if (!setA.size || !setB.size) return 0;
  let overlap = 0;
  setA.forEach((word) => {
    if (setB.has(word)) overlap += 1;
  });
  return overlap / Math.min(setA.size, setB.size);
}

function sanitizeInput(value: string, fallback: string) {
  const clean = value.trim().replace(/\s+/g, " ");
  return clean || fallback;
}

function shortConcept(value: string, fallback: string) {
  const clean = sanitizeInput(value, fallback);
  return clean.split(/[,.!?;:]/)[0].split(/\s+/).slice(0, 7).join(" ");
}

function fill(template: string, input: ScriptInput, rng: () => number) {
  const category = shortConcept(input.niche, "questa categoria");
  const pain = shortConcept(input.problem, "il problema");
  const desireShort = shortConcept(input.desire, "il risultato desiderato");
  const audience = shortConcept(input.target, "il pubblico giusto");
  const losses = [
    "fiducia nei primi secondi",
    "attenzione prima della proposta",
    "conversioni da persone gia' interessate",
    "chiarezza nel momento decisivo",
    "tempo su tentativi non misurati"
  ];

  return template
    .replace("{loss}", pick(rng, losses))
    .replace("{category}", category)
    .replace("{pain}", pain.toLowerCase())
    .replace("{desireShort}", desireShort.toLowerCase())
    .replace("{audience}", audience.toLowerCase());
}

function ctaBucket(goal: Goal): keyof typeof ctas {
  if (goal === "DM") return "dm";
  if (goal === "Click sito") return "click";
  if (goal === "Lead") return "curiosity";
  if (goal === "Vendita") return "aggressive";
  return "soft";
}

function durationSeconds(duration: Duration) {
  return duration === "15 sec" ? 15 : duration === "30 sec" ? 30 : 60;
}

function energyPace(energy: Energy) {
  if (energy === "Alta") return "tagli rapidi, frasi corte, pause secche";
  if (energy === "Media") return "ritmo scandito, una frase chiave ogni blocco";
  return "ritmo cinematografico, voce bassa e controllo";
}

function toneLine(tone: Tone) {
  const map: Record<Tone, string> = {
    Diretto: "senza giri di parole",
    Amichevole: "come un consiglio dato a una persona che stimi",
    Professionale: "con precisione e zero hype",
    Motivazionale: "con spinta concreta, non frasi motivazionali vuote",
    "Provocatorio soft": "con una piccola tensione che fa riflettere"
  };
  return map[tone];
}

function scriptBody(input: ScriptInput, rng: () => number, hook: string, cta: string, pattern: string) {
  const product = sanitizeInput(input.product, "la soluzione");
  const benefit = shortConcept(input.benefit, "rendere il risultato piu' semplice e misurabile");
  const problem = shortConcept(input.problem, "il blocco principale");
  const desire = shortConcept(input.desire, "il risultato desiderato");
  const offer = input.offer.trim() ? ` In questo momento l'offerta rende l'ingresso piu' leggero: ${input.offer.trim()}.` : "";
  const transitionA = pick(rng, transitions);
  const objection = pick(rng, objections);
  const proof = pick(rng, [
    "un dettaglio visivo, una mini prova e una frase che anticipa il dubbio",
    "un confronto semplice tra prima e dopo",
    "una scena reale in cui il beneficio si capisce senza spiegarlo troppo",
    "una sequenza di tre micro passaggi facili da seguire",
    "una prova di contesto: cosa cambia nel comportamento della persona"
  ]);

  const bridges: Record<string, string> = {
    "mini tutorial": `Fai cosi': mostra il blocco, nomina l'effetto, poi fai vedere il passaggio che accorcia la strada verso ${desire}.`,
    contrarian: `La mossa forte e' smettere di inseguire piu' opzioni e rendere visibile il criterio che fa scegliere ${product}.`,
    "errore comune": `L'errore e' trattare ${problem} come una questione di forza di volonta'. In realta' serve un percorso piu' leggibile.`,
    "testimonianza concreta": `La scena deve sembrare appena successa: "ho cambiato una cosa, e il risultato e' diventato piu' facile da ripetere".`,
    "hook POV": `Entra nella testa di chi sta decidendo: dubbio, attrito, piccola prova, sollievo.`,
    "storytelling in prima persona": `Raccontalo come una svolta minuscola: prima confusione, poi un dettaglio che rimette ordine.`,
    "domanda forte": `La domanda deve aprire una tensione reale, poi il video risponde con ${proof}.`,
    "curiosita tesa": `Lascia una micro lacuna di informazione, poi chiudila con una prova visiva.`,
    "hook shock": `La frase iniziale crea rottura, ma il resto resta credibile e utile.`,
    "diagnosi rapida": `Fai sembrare il video una valutazione lucida: sintomo, causa, prossima azione.`,
    "prima/dopo narrativo": `Mostra due comportamenti, non due promesse: uno disperde energia, l'altro crea direzione.`,
    "myth busting": `Smonta una credenza comune senza umiliare il pubblico.`
  };

  return [
    hook,
    transitionA,
    `${bridges[pattern] ?? bridges["diagnosi rapida"]}`,
    `Il punto non e' aggiungere complessita': e' togliere il passaggio che rende ${problem.toLowerCase()} piu' pesante del necessario.`,
    `Con ${product}, il beneficio diventa concreto: ${benefit}.`,
    `Se ti stai dicendo "${objection.toLowerCase()}", guarda prima la prova: ${proof}.`,
    `${offer}${cta}`
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeTimeline(input: ScriptInput, rng: () => number, hook: string, cta: string) {
  const seconds = durationSeconds(input.duration);
  const blocks = seconds === 15
    ? [[0, 2, "Hook"], [3, 6, "Problema visivo"], [7, 11, "Prova/beneficio"], [12, 15, "CTA"]]
    : seconds === 30
      ? [[0, 3, "Hook"], [4, 9, "Contesto"], [10, 17, "Dimostrazione"], [18, 24, "Obiezione"], [25, 30, "CTA"]]
      : [[0, 4, "Hook"], [5, 12, "Story"], [13, 24, "Problema"], [25, 38, "Soluzione"], [39, 51, "Prova"], [52, 60, "CTA"]];

  return blocks.map(([start, end, label]) => {
    const detail = label === "Hook"
      ? hook
      : label === "CTA"
        ? cta
        : pick(rng, storyBeats);
    return `${start}-${end}s | ${label}: ${detail}`;
  });
}

function makeHashtags(input: ScriptInput, rng: () => number) {
  const raw = [
    input.platform.replace(/\s+/g, ""),
    shortConcept(input.niche, "business").replace(/\s+/g, ""),
    "ugcstrategy",
    "videoads",
    "contentmarketing",
    "creatorbusiness",
    "reelsitalia",
    "tiktokads",
    "conversioncopy",
    "brandgrowth"
  ];
  return [...new Set(raw)]
    .sort(() => rng() - 0.5)
    .slice(0, 8)
    .map((tag) => `#${tag.toLowerCase().replace(/[^a-z0-9]/g, "")}`);
}

function cleanForbidden(text: string, rng: () => number) {
  let output = text;
  forbiddenPhrases.forEach((phrase) => {
    const pattern = new RegExp(phrase, "gi");
    if (pattern.test(output) && rng() > 0.12) {
      output = output.replace(pattern, pick(rng, ["guarda il punto", "parti da qui", "nota il dettaglio", "valuta questa mossa"]));
    }
  });
  return output;
}

function signature(output: ScriptOutput) {
  return [output.pattern, output.hook, output.finalCta, output.creativeAngle].join(" | ").toLowerCase();
}

function emptyMemory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(memoryKey) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function rememberOutput(output: ScriptOutput) {
  if (typeof window === "undefined") return;
  const recent = emptyMemory();
  const next = [signature(output), ...recent].slice(0, 12);
  window.localStorage.setItem(memoryKey, JSON.stringify(next));
}

function tooCloseToInput(input: ScriptInput, output: ScriptOutput) {
  const source = Object.values(input).join(" ");
  const generated = [
    output.hook,
    output.hookAB,
    output.script,
    output.finalCta,
    output.caption
  ].join(" ");
  return similarity(source, generated) > 0.42;
}

function tooCloseToMemory(output: ScriptOutput, memory: string[]) {
  const sig = signature(output);
  return memory.some((item) => similarity(sig, item) > 0.52 || item.includes(output.hook.toLowerCase().slice(0, 34)));
}

function generateOnce(input: ScriptInput, seed: number): ScriptOutput {
  const rng = createRng(seed);
  const pattern = pickWeighted(rng, structures);
  const angle = pick(rng, creativeAngles);
  const hook = fill(pick(rng, hookFrames.concat(openings)), input, rng);
  let hookAB = fill(pick(rng, hookFrames.concat(openings)), input, rng);
  if (hookAB === hook) hookAB = fill(pick(rng, openings), input, rng);

  const bucket = ctaBucket(input.goal);
  const finalCta = pick(rng, ctas[bucket]);
  const alternateBucket = pick(rng, Object.keys(ctas).filter((key) => key !== bucket) as Array<keyof typeof ctas>);
  const alternateCta = pick(rng, ctas[alternateBucket]);
  const script = cleanForbidden(scriptBody(input, rng, hook, finalCta, pattern), rng);
  const product = sanitizeInput(input.product, "Launch");
  const campaignName = `${pick(rng, campaignAdjectives)} ${hash(product + seed).toString(36).slice(0, 4).toUpperCase()}`;
  const hashtags = makeHashtags(input, rng);
  const visual = pick(rng, visualDirections);
  const benefit = shortConcept(input.benefit, "un risultato piu' chiaro");
  const target = shortConcept(input.target, "pubblico qualificato");

  const scenes = [
    `Apertura: ${visual}; testo grande in overlay, pausa di mezzo secondo.`,
    `Problema: mostra una situazione riconoscibile per ${target}, senza ripetere la frase dell'input.`,
    `Prova: usa ${pick(rng, ["screen recording", "oggetto reale", "prima/dopo", "nota su telefono", "gesto pratico"])} per rendere ${benefit.toLowerCase()} visibile.`,
    `Chiusura: volto o dettaglio premium, CTA con overlay minimale.`
  ];

  const shots = [
    pick(rng, visualDirections),
    pick(rng, visualDirections),
    pick(rng, visualDirections),
    "final frame pulito con spazio negativo per CTA e badge offerta"
  ];

  const output: ScriptOutput = {
    campaignName,
    creativeAngle: angle,
    hook,
    hookAB,
    script,
    timeline: makeTimeline(input, rng, hook, finalCta),
    scenes,
    shots,
    cameraMoves: [pick(rng, cameraMoves), pick(rng, cameraMoves), pick(rng, cameraMoves)],
    expressions: [pick(rng, expressions), pick(rng, expressions), pick(rng, expressions)],
    onScreenTexts: [
      "Il dettaglio che cambia la decisione",
      "Vecchio approccio vs approccio chiaro",
      benefit,
      input.offer.trim() ? "Offerta attiva ora" : "Prossimo passo semplice"
    ],
    finalCta,
    alternateCta,
    caption: cleanForbidden(`${pick(rng, captionOpeners)} ${script.split(".").slice(1, 4).join(".").trim()}. ${finalCta} ${hashtags.slice(0, 5).join(" ")}`, rng),
    hashtags,
    heygenPrompt: `Avatar ${input.creator.toLowerCase()}, stile ${input.style.toLowerCase()}, energia ${input.energy.toLowerCase()}, voce in italiano ${toneLine(input.tone)}. Leggi lo script con pause naturali, sguardo in camera e micro espressioni coerenti con un video ${input.platform} da ${input.duration}.`,
    canvaPrompt: `Crea storyboard verticale 9:16 premium dark/glass, overlay leggibili, glow elegante, scene UGC per ${input.platform}. Inserisci frame: hook, problema, prova, beneficio, CTA. Mood ${input.style}, ritmo ${energyPace(input.energy)}.`,
    elevenLabsPrompt: `Voce italiana ${input.creator.toLowerCase()}, timbro premium, ritmo ${energyPace(input.energy)}, tono ${input.tone.toLowerCase()}. Evita enfasi artificiale, usa pause brevi dopo hook e prima della CTA.`,
    storyboard: [
      `Frame 1: hook in primo piano, ${pick(rng, cameraMoves)}.`,
      `Frame 2: problema visuale con overlay: "${pick(rng, ["Troppo attrito", "Decisione bloccata", "Tempo perso", "Fiducia bassa"])}".`,
      `Frame 3: dimostrazione compatta del beneficio.`,
      `Frame 4: prova/obiezione neutralizzata.`,
      `Frame 5: CTA finale con visual pulito e caption pronta.`
    ],
    conversionTip: pick(rng, [
      "Taglia ogni frase che spiega cio' che la scena puo' mostrare: aumenta retention e credibilita'.",
      "Metti la prova visiva prima della promessa. Il pubblico freddo crede prima a cio' che vede.",
      "La CTA deve chiedere un'azione proporzionata alla fiducia creata nei primi due terzi.",
      "Registra due varianti cambiando solo hook e primo B-roll: e' il test piu' veloce per capire l'angolo.",
      "Mantieni l'overlay sotto otto parole per frame: se il testo richiede lettura, perdi ritmo."
    ]),
    qualityScore: Math.round(82 + rng() * 15),
    pattern
  };

  return output;
}

export function generateScript(input: ScriptInput, variant = 0): ScriptOutput {
  const normalized = JSON.stringify(input).toLowerCase();
  const timeSeed = Date.now() + variant * 9973;
  const baseSeed = hash(`${normalized}:${timeSeed}`);
  const memory = emptyMemory();
  let output = generateOnce(input, baseSeed);

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    if (!tooCloseToInput(input, output) && !tooCloseToMemory(output, memory)) break;
    output = generateOnce(input, baseSeed + attempt * 104729);
  }

  return output;
}

export const examples: ScriptInput[] = [
  {
    product: "GlowDesk Planner",
    niche: "produttivita per founder e creator",
    target: "creator digitali che lavorano su troppi progetti",
    problem: "perdono priorita tra contenuti, clienti e lanci",
    desire: "avere una settimana chiara e contenuti pubblicati senza stress",
    benefit: "trasforma idee sparse in un piano operativo settimanale",
    offer: "trial 7 giorni con template inclusi",
    platform: "Instagram Reels",
    duration: "30 sec",
    style: "Luxury",
    creator: "Neutro",
    energy: "Media",
    goal: "Lead",
    tone: "Professionale"
  },
  {
    product: "SkinLab Serum C",
    niche: "skincare premium",
    target: "donne 28-45 che vogliono pelle luminosa ma odiano routine lunghe",
    problem: "comprano troppi prodotti e non vedono costanza nei risultati",
    desire: "pelle piu luminosa con una routine essenziale",
    benefit: "un solo step mattutino per glow visibile e texture piu uniforme",
    offer: "bundle lancio con spedizione gratuita",
    platform: "TikTok",
    duration: "15 sec",
    style: "TikTok native",
    creator: "Donna",
    energy: "Alta",
    goal: "Vendita",
    tone: "Amichevole"
  },
  {
    product: "LocalFit Coaching",
    niche: "fitness online",
    target: "uomini e donne impegnati che si allenano a casa",
    problem: "iniziano forte e mollano dopo due settimane",
    desire: "sentirsi in forma senza vivere in palestra",
    benefit: "piano flessibile con check settimanali e progressi sostenibili",
    offer: "",
    platform: "Meta Ads",
    duration: "60 sec",
    style: "Testimonial",
    creator: "Uomo",
    energy: "Media",
    goal: "DM",
    tone: "Motivazionale"
  }
];

export const defaultInput: ScriptInput = {
  product: "",
  niche: "",
  target: "",
  problem: "",
  desire: "",
  benefit: "",
  offer: "",
  platform: "TikTok",
  duration: "30 sec",
  style: "Naturale",
  creator: "Neutro",
  energy: "Media",
  goal: "Vendita",
  tone: "Diretto"
};
