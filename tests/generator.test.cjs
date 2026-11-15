// Offline regression for UGC durations, malformed browser storage and brief grounding.
// Run: npm install --no-package-lock && node --test tests/generator.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../lib/generator.ts'), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = new Module(path.join(__dirname, '../lib/generator.ts'), module);
loaded.filename = path.join(__dirname, '../lib/generator.ts');
loaded.paths = module.paths;
loaded._compile(js, loaded.filename);
const generator = loaded.exports;
const base = {
 product: 'Bavetta artigianale', niche: 'Neonati', target: 'Genitori',
 problem: 'Regali impersonali', desire: 'Un regalo speciale',
 benefit: 'Cotone morbido', offer: 'Personalizzazione',
 platform: 'Instagram Reels', duration: '15 sec', style: 'Naturale',
 creator: 'Neutro', energy: 'Media', goal: 'Vendita', tone: 'Amichevole'
};
test('generation for each supported duration returns a grounded script', () => {
 assert.equal(typeof generator.generateScript, 'function', 'export generateScript missing');
 for (const duration of ['15 sec', '30 sec', '60 sec']) {
  const output = generator.generateScript({ ...base, duration });
  assert.ok(output && typeof output.script === 'string' && output.script.trim(), duration);
  assert.ok(output.hook.includes(base.problem), 'hook must reflect the brief');
  assert.ok(output.hook.includes(base.product), 'hook must identify product');
  assert.ok(Array.isArray(output.timeline) && output.timeline.length > 0, duration);
 }
});
test('browser storage failures never interrupt remembering an output', () => {
 const previous = global.window;
 global.window = { localStorage: { getItem: () => '{bad json', setItem: () => { throw Error('quota'); } } };
 try { assert.doesNotThrow(() => generator.rememberOutput({ hook: 'test' })); }
 finally { if (previous === undefined) delete global.window; else global.window = previous; }
});

test('malformed but valid storage data is ignored without crashing', () => {
 const previous = global.window;
 for (const stored of ['{}', '42', 'null', '[1, false, {"bad": true}]']) {
  let saved;
  global.window = { localStorage: { getItem: () => stored, setItem: (_key, value) => { saved = JSON.parse(value); } } };
  try {
   assert.doesNotThrow(() => generator.rememberOutput({ hook: 'test', pattern: 'test', finalCta: 'ok', creativeAngle: 'angle' }));
   assert.ok(Array.isArray(saved) && saved.length === 1 && typeof saved[0] === 'string');
  } finally { if (previous === undefined) delete global.window; else global.window = previous; }
 }
});
test('storage read exception does not prevent saving output', () => {
 const previous = global.window;
 let saved;
 global.window = { localStorage: { getItem: () => { throw Error('denied'); }, setItem: (_key, value) => { saved = JSON.parse(value); } } };
 try {
  assert.doesNotThrow(() => generator.rememberOutput({ hook: 'test', pattern: 'test', finalCta: 'ok', creativeAngle: 'angle' }));
  assert.equal(saved.length, 1);
 } finally { if (previous === undefined) delete global.window; else global.window = previous; }
});


test('spoken copy respects brief and duration without inventing claims', () => {
 const scenarios = [
  { product: 'Bavetta artigianale', problem: 'Regali impersonali', desire: 'Un regalo speciale', benefit: 'Cotone morbido', offer: 'Personalizzazione' },
  { product: 'Agenda digitale', problem: 'Scadenze dimenticate', desire: 'Pianificare meglio', benefit: 'Vista settimanale', offer: 'Download PDF' },
  { product: 'Lezioni di chitarra', problem: 'Esercizi confusi', desire: 'Suonare con sicurezza', benefit: 'Lezioni progressive', offer: '' }
 ];
 for (const brief of scenarios) {
  const outputs = ['15 sec', '30 sec', '60 sec'].map(duration => generator.generateScript({ ...base, ...brief, duration }));
  for (const output of outputs) {
   assert.ok(output.script.includes(brief.product), 'spoken script must mention actual product');
   assert.ok(output.script.includes(brief.problem), 'spoken script must use stated problem');
   assert.ok(output.script.includes(brief.desire), 'spoken script must use stated desire');
   assert.ok(!/guadagn[ai] garantiti|risultati garantiti/i.test(output.script), 'unsupported guarantee');
  }
  assert.ok(!outputs[0].script.includes('Il beneficio indicato'), '15s script should stay concise');
  assert.ok(outputs[1].script.includes(brief.benefit), '30s script must mention stated benefit');
  assert.ok(outputs[2].script.includes(brief.benefit), '60s script must mention stated benefit');
  if (brief.offer) assert.ok(outputs[1].script.includes(brief.offer), '30s script must preserve offer');
 }
});
