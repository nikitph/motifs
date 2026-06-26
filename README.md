# Motif Atlas

A light, animated static website for the Universal Systems Compiler and the 32-motif atlas.

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## GitHub Pages

This repo can be hosted as a static GitHub Pages site from the repository root. The motif pages are pre-generated under `motifs/<slug>/index.html`, so each motif has a dedicated URL.

After editing `site-data.js`, regenerate motif pages:

```sh
node tools/generate-pages.mjs
```
