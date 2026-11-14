// Offline regression for UGC durations, malformed browser storage and brief grounding.
// Run: npm ci && node --test tests/generator.test.cjs
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
