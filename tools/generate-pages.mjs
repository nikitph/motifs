import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = readFileSync(join(root, "site-data.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const template = (motif) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="${motif.name}: ${motif.question.replaceAll('"', "&quot;")}"
    />
    <title>${motif.name} - Motif Atlas</title>
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../../styles.css" />
  </head>
  <body data-page="motif" data-slug="${motif.slug}">
    <canvas class="ambient-canvas" id="ambientCanvas" aria-hidden="true"></canvas>
    <header class="site-header">
      <a class="brand" href="../../" aria-label="Motif Atlas home">
        <span class="brand-mark"></span>
        <span>Motif Atlas</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a href="../../#sic">SIC Skill</a>
        <a href="../../#atlas">Atlas</a>
        <a href="../../#compiler">Compiler</a>
        <a href="../../#author">Author</a>
      </nav>
    </header>

    <main id="app"></main>

    <script src="../../site-data.js" defer></script>
    <script src="../../app.js" defer></script>
  </body>
</html>
`;

for (const motif of context.window.MOTIF_DATA.motifs) {
  const dir = join(root, "motifs", motif.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), template(motif));
}
