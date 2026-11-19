// Adds `.js` to relative imports of the emitted declarations, so hosts with `moduleResolution: NodeNext`
// (EduProstir) resolve the types of `edu-network/core` and `edu-network/react`.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve('lib/types');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.d.ts') ? [path] : [];
  });

const fix = (file, spec) => {
  if (!spec.startsWith('.') || /\.(js|css)$/.test(spec)) return spec;
  const base = resolve(dirname(file), spec);
  if (existsSync(`${base}.d.ts`)) return `${spec}.js`;
  if (existsSync(join(base, 'index.d.ts'))) return `${spec}/index.js`;
  return spec;
};

for (const file of walk(root)) {
  const text = readFileSync(file, 'utf8');
  const out = text.replace(/(from\s+|import\(\s*)(['"])([^'"]+)\2/g, (_m, pre, q, spec) => `${pre}${q}${fix(file, spec)}${q}`);
  if (out !== text) writeFileSync(file, out);
}
