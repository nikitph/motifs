(function () {
  const data = window.MOTIF_DATA;
  const app = document.getElementById("app");
  const body = document.body;
  const page = body.dataset.page || "home";
  const slug = body.dataset.slug || "";
  const root = page === "motif" ? "../../" : "./";
  const groups = data.groups;
  const motifs = data.motifs;
  const bySlug = Object.fromEntries(motifs.map((motif) => [motif.slug, motif]));
  const byGroup = Object.fromEntries(groups.map((group) => [group.id, group]));

  function motifUrl(motif) {
    return `${root}motifs/${motif.slug}/`;
  }

  function homeUrl() {
    return root;
  }

  function assetUrl(path) {
    return `${root}${path}`;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderHome() {
    app.innerHTML = `
      <section class="hero section-frame">
        <img class="hero-art" src="${assetUrl("assets/motif-atlas-hero.png")}" alt="" />
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <p class="eyebrow">Universal Systems Compiler</p>
            <h1>The Motif Atlas</h1>
            <p class="hero-lede">
              Thirty-two structural questions for seeing across computing, biology, economics,
              organizations, psychology, and civilization.
            </p>
            <div class="hero-actions" aria-label="Hero actions">
              <a class="icon-link primary" href="#sic"><span aria-hidden="true">01</span> Download SIC</a>
              <a class="icon-link" href="#atlas"><span aria-hidden="true">02</span> Explore the atlas</a>
            </div>
          </div>
          <div class="hero-orbit reveal" aria-hidden="true">
            <canvas id="heroAtlasCanvas"></canvas>
          </div>
        </div>
      </section>

      <section class="intro-band reveal">
        <p class="section-kicker">Core thesis</p>
        <h2>Hard problems are often sparse regions of motif space.</h2>
        <p>
          The atlas strips away substrate vocabulary and exposes reusable structure:
          what persists, what changes, what constrains change, what crosses boundaries,
          and what lets distant systems converge.
        </p>
      </section>

      <section id="sic" class="sic-section section-frame">
        <div class="sic-inner">
          <div class="sic-copy reveal">
            <p class="section-kicker">Try the compiler</p>
            <h2>The atlas is the map. SIC is the instrument.</h2>
            <p>
              The Motif Atlas presented here is the conceptual foundation, not the full machine.
              The Systems Innovation Compiler is already a substantially more developed applied
              framework built on top of it.
            </p>
            <p>
              SIC combines the 32 motifs with primitive decomposition, innovation methods,
              distortion analysis, institutional templates, validation procedures, and implementation
              planning. It is designed to be pasted into an LLM and used on real systems.
            </p>
            <p>
              The current skill package is focused on the software domain for demonstration purposes.
              The underlying compiler structure is domain-general, and can be extended to economics,
              governance, biology, organizations, and other complex systems.
            </p>
          </div>
          <aside class="download-panel reveal" aria-label="Systems Innovation Compiler downloads">
            <p class="download-label">LLM Skill Package</p>
            <h3>Systems Innovation Compiler</h3>
            <p>
              Install the skill, give it a system or problem, and ask it to diagnose what is present,
              what is weak, what is missing, and where innovation may be structurally possible.
            </p>
            <p class="scope-note">
              Current demo scope: software systems. The framework is built to generalize beyond software.
            </p>
            <a class="download-button" href="${assetUrl("assets/sic/systems-innovation-compiler.zip")}" download>
              <span aria-hidden="true">DL</span>
              Download SIC package
            </a>
            <div class="download-links">
              <a href="${assetUrl("assets/sic/sic_skill.md")}" download>Skill prompt</a>
              <a href="${assetUrl("assets/sic/sic_readme.md")}" download>Installation notes</a>
            </div>
          </aside>
        </div>
      </section>

      <section id="author" class="author-section">
        <article class="author-letter reveal">
          <p class="letter-kicker">Some words from the author</p>
          <p>Hello, and thank you for being here.</p>
          <p>
            This project grew out of a question I have carried for a long time: what are the hidden
            structures underneath the things we see every day? Beneath software, economics, biology,
            organizations, psychology, governance, and culture, there seem to be recurring patterns
            that quietly shape how systems behave.
          </p>
          <p>
            For years, I felt the absence of a tool that could help me see those patterns clearly
            across domains. The internet made knowledge accessible, but not always structurally
            comparable. Working with LLMs helped push this search past a threshold. Moving across
            subjects and systems, I began to see a recurring set of structural concerns: motifs that
            combine to produce the architectures we recognize as knowledge, institutions, technologies,
            and behavior.
          </p>
          <p>
            The number I arrived at is thirty-two. I believe this atlas is comprehensive in a meaningful
            empirical sense, but I do not claim the number itself is sacred. Someone thoughtful may
            argue for thirty, or thirty-six, or a different decomposition altogether. That debate is
            welcome. The deeper claim is that reality appears to be composed from a finite structural
            alphabet, and that understanding this alphabet lets us compare, diagnose, and transfer
            solutions across domains.
          </p>
          <p>
            This site introduces the foundation, not the full machine. The Systems Innovation Compiler
            is significantly more built out than the theory shown here. The atlas explains the structural
            alphabet; the compiler is the applied engine that uses that alphabet to analyze and redesign
            real systems.
          </p>
          <p>
            So I would ask you to try it before dismissing it. Take a software system, a policy problem,
            a market, an organization, a research question, or a product you are building. Run it
            through the skill. Look at what is present, what is weak, what is absent, and what combinations
            are doing the real work.
          </p>
          <p>
            If SIC helps you understand a system more precisely, identify hidden failure modes, or
            generate better interventions, then this work has done what it set out to do.
          </p>
          <p class="letter-signature">Nikit Phadke</p>
        </article>
      </section>

      <section id="atlas" class="atlas-section">
        <div class="section-heading reveal">
          <p class="section-kicker">The 32 motifs</p>
          <h2>A structural alphabet for systems.</h2>
        </div>
        <div class="atlas-controls reveal" role="list" aria-label="Filter motifs by group">
          <button class="group-pill active" data-filter="all" type="button">All</button>
          ${groups.map((group) => `<button class="group-pill" data-filter="${group.id}" type="button">${group.short}</button>`).join("")}
        </div>
        <div class="motif-grid" id="motifGrid">
          ${motifs.map((motif) => motifCard(motif)).join("")}
        </div>
      </section>

      <section id="compiler" class="compiler-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Compiler</p>
          <h2>Domain language becomes transferable structure.</h2>
        </div>
        <div class="pipeline reveal" aria-label="Compiler pipeline">
          ${["Domain description", "Motif tokens", "Motif AST", "Semantic analysis", "Patterns and interventions"]
            .map((step, index) => `<div class="pipe-step" style="--i:${index}"><span>${String(index + 1).padStart(2, "0")}</span>${step}</div>`)
            .join("")}
        </div>
        <div class="compiler-panels">
          ${[
            ["Lexer", "Surface language is reduced to a thirty-two-symbol motif vocabulary."],
            ["Parser", "Boundary nesting creates a tree of scopes, signatures, and typed edges."],
            ["Analyzer", "Valence, invariants, viability, and collisions are checked structurally."],
            ["Generator", "The modified structure returns as a domain-specific intervention."]
          ]
            .map(([title, copy]) => `<article class="concept-panel reveal"><h3>${title}</h3><p>${copy}</p></article>`)
            .join("")}
        </div>
      </section>

      <section id="geometry" class="geometry-section">
        <div class="geometry-copy reveal">
          <p class="section-kicker">Geometry</p>
          <h2>Every system occupies a point in motif space.</h2>
          <p>
            Structural distance makes unlikely neighbors visible. A distributed database,
            a cooperative bank, and a treaty system may sit close together when their
            motif signatures rhyme.
          </p>
        </div>
        <div class="space-stage reveal" aria-hidden="true">
          <canvas id="spaceCanvas"></canvas>
        </div>
      </section>
    `;

    setupFilters();
    setupReveal();
    startHeroCanvas(document.getElementById("heroAtlasCanvas"));
    startSpaceCanvas(document.getElementById("spaceCanvas"));
  }

  function motifCard(motif) {
    const group = byGroup[motif.group];
    return `
      <a class="motif-card reveal" href="${motifUrl(motif)}" data-group="${motif.group}" style="--accent:${group.accent}">
        <span class="motif-number">${String(motif.number).padStart(2, "0")}</span>
        <span class="motif-family">${group.short}</span>
        <h3>${motif.name}</h3>
        <p>${motif.question}</p>
      </a>
    `;
  }

  function renderMotif() {
    const motif = bySlug[slug] || motifs[0];
    const group = byGroup[motif.group];
    document.title = `${motif.name} - Motif Atlas`;
    document.documentElement.style.setProperty("--page-accent", group.accent);

    const index = motifs.findIndex((item) => item.slug === motif.slug);
    const prev = motifs[(index + motifs.length - 1) % motifs.length];
    const next = motifs[(index + 1) % motifs.length];
    const related = (motif.composition || []).map((itemSlug) => bySlug[itemSlug]).filter(Boolean);

    app.innerHTML = `
      <section class="motif-hero section-frame" style="--accent:${group.accent}">
        <div class="motif-hero-copy reveal">
          <a class="return-link" href="${homeUrl()}#atlas"><span aria-hidden="true"><-</span> Atlas</a>
          <p class="eyebrow">${String(motif.number).padStart(2, "0")} / ${group.label}</p>
          <h1>${motif.name}</h1>
          <p class="motif-question">${motif.question}</p>
        </div>
        <div class="motif-visual-wrap reveal" aria-label="${motif.name} animated visual">
          <canvas id="motifCanvas" data-visual="${motif.visual}" data-seed="${motif.number}"></canvas>
        </div>
      </section>

      <section class="motif-body">
        <article class="motif-main reveal">
          <p class="section-kicker">Essence</p>
          <h2>${motif.essence}</h2>
          <p>${motif.why}</p>
          ${motif.callout ? `<aside class="motif-callout">${motif.callout}</aside>` : ""}
        </article>
        <aside class="motif-side reveal">
          <div>
            <p class="side-label">Absent or weak</p>
            <p>${motif.absence}</p>
          </div>
          <div>
            <p class="side-label">Manifests as</p>
            <div class="domain-list">
              ${motif.domains.map((domain) => `<span>${domain}</span>`).join("")}
            </div>
          </div>
        </aside>
      </section>

      ${
        related.length
          ? `<section class="related-section reveal">
              <p class="section-kicker">Composition</p>
              <h2>This motif depends on earlier structure.</h2>
              <div class="related-grid">
                ${related.map((item) => motifCard(item)).join("")}
              </div>
            </section>`
          : ""
      }

      <nav class="motif-pager reveal" aria-label="Motif pager">
        <a href="${motifUrl(prev)}"><span aria-hidden="true"><-</span> ${prev.name}</a>
        <a href="${motifUrl(next)}">${next.name} <span aria-hidden="true">-></span></a>
      </nav>
    `;

    setupReveal();
    startMotifCanvas(document.getElementById("motifCanvas"), motif, group);
  }

  function setupFilters() {
    const pills = Array.from(document.querySelectorAll(".group-pill"));
    const cards = Array.from(document.querySelectorAll(".motif-card"));
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const filter = pill.dataset.filter;
        pills.forEach((item) => item.classList.toggle("active", item === pill));
        cards.forEach((card) => {
          const visible = filter === "all" || card.dataset.group === filter;
          card.toggleAttribute("hidden", !visible);
        });
      });
    });
  }

  function setupReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => observer.observe(item));
  }

  function fitCanvas(canvas) {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width: rect.width, height: rect.height };
  }

  function startAmbient() {
    const canvas = document.getElementById("ambientCanvas");
    const points = Array.from({ length: 42 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.7 + Math.random() * 1.8,
      p: i * 0.43
    }));
    function frame(time) {
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, width, height } = fit;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(47, 125, 104, 0.09)";
      points.forEach((point) => {
        const x = point.x * width + Math.sin(time * 0.00025 + point.p) * 18;
        const y = point.y * height + Math.cos(time * 0.00018 + point.p) * 12;
        ctx.beginPath();
        ctx.arc(x, y, point.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function startHeroCanvas(canvas) {
    if (!canvas) return;
    const nodes = motifs.map((motif, index) => {
      const group = byGroup[motif.group];
      return { index, motif, color: group.accent, phase: index * 0.61 };
    });
    function frame(time) {
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, width, height } = fit;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.32;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(35, 52, 66, 0.13)";
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * ring * 0.43, radius * ring * 0.3, ring * 0.42, 0, Math.PI * 2);
        ctx.stroke();
      }
      const positions = nodes.map((node) => {
        const angle = (node.index / nodes.length) * Math.PI * 2 + time * 0.00008;
        const wave = Math.sin(time * 0.0007 + node.phase) * 16;
        return {
          node,
          x: cx + Math.cos(angle) * (radius + wave),
          y: cy + Math.sin(angle) * (radius * 0.72 + wave * 0.3)
        };
      });
      positions.forEach((a, i) => {
        const b = positions[(i + 5) % positions.length];
        ctx.strokeStyle = "rgba(35, 52, 66, 0.08)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      positions.forEach(({ node, x, y }) => {
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.72;
        ctx.beginPath();
        ctx.arc(x, y, 3.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function startSpaceCanvas(canvas) {
    if (!canvas) return;
    const clouds = groups.map((group, index) => ({
      group,
      angle: index * 1.03,
      radius: 0.18 + index * 0.035
    }));
    function frame(time) {
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, width, height } = fit;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(35, 52, 66, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const y = (height / 8) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(time * 0.0004 + i) * 10);
        ctx.stroke();
      }
      clouds.forEach((cloud, cloudIndex) => {
        for (let i = 0; i < 10; i++) {
          const angle = cloud.angle + i * 0.62 + time * 0.00009;
          const x = width * (0.28 + cloudIndex * 0.095) + Math.cos(angle) * width * cloud.radius;
          const y = height * (0.5 + Math.sin(cloudIndex) * 0.08) + Math.sin(angle * 1.4) * height * cloud.radius;
          ctx.fillStyle = cloud.group.accent;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function startMotifCanvas(canvas, motif, group) {
    if (!canvas) return;
    const seed = motif.number * 997;
    const accent = group.accent;
    function frame(time) {
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, width, height } = fit;
      drawMotif(ctx, width, height, time * 0.001, motif.visual, accent, seed);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function drawMotif(ctx, width, height, t, visual, accent, seed) {
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) * 0.34;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.fillRect(0, 0, width, height);
    drawPaperGrid(ctx, width, height);
    ctx.strokeStyle = "rgba(35, 52, 66, 0.16)";
    ctx.lineWidth = 1;

    if (["membrane", "terminal", "simulation", "modules", "veil"].includes(visual)) {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * (0.55 + i * 0.22), r * (0.38 + i * 0.13), Math.sin(t * 0.2 + i) * 0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    switch (visual) {
      case "lattice":
      case "archive":
        drawLattice(ctx, width, height, t, accent);
        break;
      case "flow":
      case "signals":
        drawFlow(ctx, width, height, t, accent);
        break;
      case "constraint":
      case "mandate":
        drawConstraint(ctx, width, height, t, accent);
        break;
      case "fingerprint":
      case "recursion":
        drawFingerprint(ctx, width, height, t, accent);
        break;
      case "membrane":
      case "veil":
        drawMembrane(ctx, width, height, t, accent);
        break;
      case "terminal":
        drawTerminal(ctx, width, height, t, accent);
        break;
      case "entropy":
        drawEntropy(ctx, width, height, t, accent, seed);
        break;
      case "locator":
      case "encoder":
        drawLocator(ctx, width, height, t, accent);
        break;
      case "copies":
      case "sync":
        drawCopies(ctx, width, height, t, accent, visual === "sync");
        break;
      case "loop":
      case "forecast":
        drawLoop(ctx, width, height, t, accent, visual === "forecast");
        break;
      case "maze":
      case "gradient":
        drawSearch(ctx, width, height, t, accent, visual === "gradient");
        break;
      case "simulation":
        drawSimulation(ctx, width, height, t, accent);
        break;
      case "fold":
        drawFold(ctx, width, height, t, accent);
        break;
      case "split":
        drawSplit(ctx, width, height, t, accent);
        break;
      case "assembly":
      case "tree":
      case "modules":
        drawStructure(ctx, width, height, t, accent, visual);
        break;
      case "swarm":
        drawSwarm(ctx, width, height, t, accent, seed);
        break;
      case "reservoir":
      case "queue":
      case "timeline":
        drawAllocation(ctx, width, height, t, accent, visual);
        break;
      case "merge":
      case "convergence":
        drawMerge(ctx, width, height, t, accent, visual === "convergence");
        break;
      default:
        drawLattice(ctx, width, height, t, accent);
    }
  }

  function drawPaperGrid(ctx, width, height) {
    ctx.strokeStyle = "rgba(35, 52, 66, 0.045)";
    ctx.lineWidth = 1;
    for (let x = 24; x < width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 24; y < height; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawNode(ctx, x, y, color, size = 5) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLattice(ctx, width, height, t, accent) {
    const cols = 6;
    const rows = 4;
    const gapX = width / (cols + 1);
    const gapY = height / (rows + 1);
    for (let y = 1; y <= rows; y++) {
      for (let x = 1; x <= cols; x++) {
        const px = gapX * x;
        const py = gapY * y;
        const pulse = 4 + Math.sin(t * 1.8 + x + y) * 2;
        drawNode(ctx, px, py, accent, pulse);
        if (x < cols) line(ctx, px, py, gapX * (x + 1), py, "rgba(35,52,66,.13)");
      }
    }
  }

  function drawFlow(ctx, width, height, t, accent) {
    for (let i = 0; i < 5; i++) {
      const y = height * (0.22 + i * 0.14);
      const start = width * 0.16;
      const end = width * 0.84;
      line(ctx, start, y, end, y + Math.sin(t + i) * 12, "rgba(35,52,66,.16)");
      const x = start + ((t * 70 + i * 85) % (end - start));
      drawNode(ctx, x, y + Math.sin(t + i) * 12, accent, 5);
    }
  }

  function drawConstraint(ctx, width, height, t, accent) {
    const cx = width / 2;
    for (let i = 0; i < 5; i++) {
      const y = height * (0.22 + i * 0.13);
      line(ctx, width * 0.18, y, width * 0.82, y, i === 2 ? accent : "rgba(35,52,66,.15)");
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(cx - 72 + Math.sin(t) * 5, height * 0.25, 144, height * 0.5);
    ctx.stroke();
  }

  function drawFingerprint(ctx, width, height, t, accent) {
    const cx = width / 2;
    const cy = height / 2;
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = i % 2 ? accent : "rgba(35,52,66,.2)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 28 + i * 18, 20 + i * 13, Math.sin(t * 0.2) * 0.2, Math.PI * 0.15, Math.PI * 1.85);
      ctx.stroke();
    }
  }

  function drawMembrane(ctx, width, height, t, accent) {
    const cx = width / 2;
    const cy = height / 2;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      const rr = Math.min(width, height) * 0.27 + Math.sin(a * 5 + t * 1.5) * 8;
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr * 0.72;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawTerminal(ctx, width, height, t, accent) {
    drawFlow(ctx, width, height, t, accent);
    ctx.fillStyle = accent;
    ctx.fillRect(width * 0.78, height * 0.25, 6, height * 0.5);
  }

  function drawEntropy(ctx, width, height, t, accent, seed) {
    for (let i = 0; i < 58; i++) {
      const a = (i * 12.989 + seed) % 6.28;
      const spread = 0.2 + ((i % 13) / 13) * 0.7;
      const x = width / 2 + Math.cos(a + t * 0.2) * width * spread * 0.4;
      const y = height / 2 + Math.sin(a * 1.7 + t * 0.17) * height * spread * 0.38;
      drawNode(ctx, x, y, i % 3 ? "rgba(35,52,66,.23)" : accent, 2.5 + (i % 4));
    }
  }

  function drawLocator(ctx, width, height, t, accent) {
    drawLattice(ctx, width, height, t, accent);
    const x = width * (0.35 + Math.sin(t * 0.65) * 0.22);
    const y = height * (0.5 + Math.cos(t * 0.55) * 0.18);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.stroke();
    line(ctx, x + 18, y + 18, x + 42, y + 42, accent);
  }

  function drawCopies(ctx, width, height, t, accent, sync) {
    const centers = [0.3, 0.5, 0.7].map((x, i) => [width * x, height * (0.5 + Math.sin(t + i) * 0.03)]);
    centers.forEach(([x, y], i) => {
      ctx.strokeStyle = i === 1 ? accent : "rgba(35,52,66,.2)";
      ctx.strokeRect(x - 44, y - 34, 88, 68);
      drawNode(ctx, x + Math.sin(t + i) * 18, y, accent, 4);
    });
    if (sync) {
      centers.slice(0, 2).forEach((center, i) => line(ctx, center[0] + 48, center[1], centers[i + 1][0] - 48, centers[i + 1][1], accent));
    }
  }

  function drawLoop(ctx, width, height, t, accent, forecast) {
    const cx = width / 2;
    const cy = height / 2;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, width * 0.24, height * 0.22, 0, 0, Math.PI * 2);
    ctx.stroke();
    const a = t % (Math.PI * 2);
    drawNode(ctx, cx + Math.cos(a) * width * 0.24, cy + Math.sin(a) * height * 0.22, accent, 7);
    if (forecast) line(ctx, cx, cy, cx + width * 0.31, cy - height * 0.22, "rgba(35,52,66,.22)");
  }

  function drawSearch(ctx, width, height, t, accent, gradient) {
    let x = width * 0.14;
    let y = height * 0.72;
    for (let i = 0; i < 9; i++) {
      const nx = width * (0.14 + i * 0.09);
      const ny = gradient ? height * (0.75 - i * 0.055) : height * (0.5 + Math.sin(i * 1.7) * 0.24);
      line(ctx, x, y, nx, ny, i < t * 2 % 9 ? accent : "rgba(35,52,66,.14)");
      drawNode(ctx, nx, ny, accent, 4);
      x = nx;
      y = ny;
    }
  }

  function drawSimulation(ctx, width, height, t, accent) {
    const cx = width / 2;
    const cy = height / 2;
    ctx.strokeStyle = accent;
    ctx.strokeRect(cx - 88, cy - 58, 176, 116);
    drawLoop(ctx, width, height, t, accent, true);
  }

  function drawFold(ctx, width, height, t, accent) {
    for (let i = 0; i < 7; i++) {
      const y = height * (0.25 + i * 0.08);
      line(ctx, width * 0.15, y, width * (0.82 - i * 0.055), y + Math.sin(t + i) * 10, i === 5 ? accent : "rgba(35,52,66,.14)");
    }
    drawNode(ctx, width * 0.68, height * 0.64, accent, 8);
  }

  function drawSplit(ctx, width, height, t, accent) {
    const x = width * 0.25;
    const y = height * 0.5;
    drawNode(ctx, x, y, accent, 8);
    line(ctx, x, y, width * 0.72, height * 0.3 + Math.sin(t) * 12, accent);
    line(ctx, x, y, width * 0.72, height * 0.7 + Math.cos(t) * 12, "rgba(35,52,66,.2)");
    drawNode(ctx, width * 0.72, height * 0.3 + Math.sin(t) * 12, accent, 6);
    drawNode(ctx, width * 0.72, height * 0.7 + Math.cos(t) * 12, accent, 6);
  }

  function drawStructure(ctx, width, height, t, accent, visual) {
    const levels = visual === "tree" ? [1, 2, 4] : [3, 4, 5];
    levels.forEach((count, row) => {
      for (let i = 0; i < count; i++) {
        const x = width * ((i + 1) / (count + 1));
        const y = height * (0.25 + row * 0.22);
        drawNode(ctx, x, y, accent, 5);
        if (row > 0) line(ctx, x, y, width / 2 + Math.sin(t + i) * 10, height * (0.25 + (row - 1) * 0.22), "rgba(35,52,66,.14)");
      }
    });
  }

  function drawSwarm(ctx, width, height, t, accent, seed) {
    for (let i = 0; i < 70; i++) {
      const a = i * 0.61 + t * 0.25 + seed * 0.001;
      const x = width / 2 + Math.cos(a) * (40 + (i % 13) * 11);
      const y = height / 2 + Math.sin(a * 1.3) * (32 + (i % 9) * 9);
      drawNode(ctx, x, y, i % 5 === 0 ? accent : "rgba(35,52,66,.22)", 2.5);
    }
  }

  function drawAllocation(ctx, width, height, t, accent, visual) {
    const count = visual === "queue" ? 8 : 6;
    for (let i = 0; i < count; i++) {
      const x = width * (0.18 + i * 0.09);
      const y = visual === "timeline" ? height * 0.55 : height * (0.68 - i * 0.055);
      ctx.strokeStyle = i === Math.floor(t % count) ? accent : "rgba(35,52,66,.18)";
      ctx.strokeRect(x, y - 20, 46, 40);
    }
    if (visual === "reservoir") {
      ctx.fillStyle = "rgba(181,83,69,.12)";
      ctx.fillRect(width * 0.18, height * 0.55 + Math.sin(t) * 8, width * 0.48, height * 0.15);
    }
  }

  function drawMerge(ctx, width, height, t, accent, convergence) {
    const leftY = height * 0.3 + Math.sin(t) * 16;
    const rightY = height * 0.7 + Math.cos(t) * 16;
    const targetX = width * 0.72;
    const targetY = convergence ? height * 0.5 : height * 0.52 + Math.sin(t * 0.5) * 8;
    line(ctx, width * 0.18, leftY, targetX, targetY, accent);
    line(ctx, width * 0.18, rightY, targetX, targetY, "rgba(35,52,66,.24)");
    drawNode(ctx, width * 0.18, leftY, accent, 6);
    drawNode(ctx, width * 0.18, rightY, accent, 6);
    drawNode(ctx, targetX, targetY, accent, 9);
  }

  function line(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  startAmbient();
  if (page === "motif") renderMotif();
  else renderHome();
})();
