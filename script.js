/* items list*/
const ITEMS = [
  { id: 1,  name: "Hasło",              allowed: false, x: 66.83, y: 6.60,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 2,  name: "Laptop",             allowed: true,  x: 42.40, y: 57.19,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { id: 3,  name: "Roślina",            allowed: true,  x: 15.63, y: 41.21,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { id: 4,  name: "Notatka",            allowed: false, x: 62.10, y: 43.34,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa." },
  { id: 5,  name: "Drukowane materiały", allowed: false, x: 94.13, y: 24.81,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit." },
  { id: 6,  name: "Pendrive",           allowed: false, x: 89.76, y: 54.53,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." },
  { id: 7,  name: "Wrażliwe dane",      allowed: false, x: 19.04, y: 62.09,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate velit." },
  { id: 8,  name: "Identyfikator",      allowed: false, x: 29.40, y: 85.20,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus." },
  { id: 9,  name: "Komórka",            allowed: false, x: 50.60, y: 79.87,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque." },
  { id: 10, name: "Kubek",              allowed: true,  x: 79.58, y: 63.90,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus autem quibusdam et aut officiis debitis aut rerum." }
];

(function () {
  const stage    = document.getElementById("deskStage");
  const list     = document.getElementById("itemList");
  const modal    = document.getElementById("modal");
  const card     = modal.querySelector(".modal-card");
  const elNum    = document.getElementById("modalNum");
  const elBadge  = document.getElementById("modalBadge");
  const elTitle  = document.getElementById("modalTitle");
  const elText   = document.getElementById("modalText");
  const prevBtn  = document.getElementById("prevBtn");
  const nextBtn  = document.getElementById("nextBtn");
  const progress = document.getElementById("progress");

  const visited = new Set();
  let current = -1;        
  let lastFocus = null;    
  let savedScroll = 0;

  const label = (it) => it.allowed ? "Dozwolone" : "Zakazane";

  
  ITEMS.forEach((it, i) => {
    const kind = it.allowed ? "allowed" : "forbidden";

    const m = document.createElement("button");
    m.type = "button";
    m.className = `marker marker--${kind}`;
    m.style.left = it.x + "%";
    m.style.top  = it.y + "%";
    m.textContent = it.id;
    m.dataset.index = i;
    m.setAttribute("aria-label", `${it.id}. ${it.name} – ${label(it)}`);
    m.addEventListener("click", () => open(i, m));
    stage.appendChild(m);

    const li = document.createElement("li");
    li.innerHTML =
      `<button type="button" class="item item--${kind}" data-index="${i}">
         <span class="item-num">${it.id}</span>
         <span class="item-name">${it.name}</span>
         <span class="item-tag">${it.allowed ? "✓" : "✕"} ${label(it)}</span>
       </button>`;
    const btn = li.firstElementChild;
    btn.addEventListener("click", () => open(i, btn));
    list.appendChild(li);
  });

  
  function lockScroll() {
    savedScroll = window.scrollY;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sbw ? sbw + "px" : "";
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add("is-locked");
  }
  function unlockScroll() {
    document.body.classList.remove("is-locked");
    document.body.style.top = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, savedScroll);
  }

  
  function render(i) {
    const it = ITEMS[i];
    current = i;
    modal.dataset.kind = it.allowed ? "allowed" : "forbidden";
    elNum.textContent   = it.id;
    elBadge.textContent = (it.allowed ? "✓ " : "✕ ") + label(it);
    elTitle.textContent = it.name;
    elText.textContent  = it.text;

    visited.add(i);
    document.querySelectorAll(`[data-index="${i}"]`).forEach(el => el.classList.add("is-visited"));
    progress.textContent = `Odkryto ${visited.size} z ${ITEMS.length}`;
    if (visited.size === ITEMS.length) progress.classList.add("is-done");
  }

  function open(i, trigger) {
    const wasOpen = !modal.hidden;
    render(i);
    if (wasOpen) return;
    lastFocus = trigger || document.activeElement;
    lockScroll();
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    card.focus();
  }

  function close() {
    if (modal.hidden) return;
    modal.classList.remove("is-open");
    unlockScroll();
    setTimeout(() => { modal.hidden = true; }, 200);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  const step = (d) => render((current + d + ITEMS.length) % ITEMS.length);

  modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", close));
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      
      const f = card.querySelectorAll("button");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === card)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
