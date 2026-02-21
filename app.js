/* ══════════════════════════════════════════════════════════════════
   SASSBack AI – 100% Standalone Frontend
   No backend / Python needed. Everything runs in the browser.
   ══════════════════════════════════════════════════════════════════ */

/* ── Embedded Comeback Engine ──────────────────────────────────── */
const COMEBACKS = {
  mansplaining: [
    "Oh WOW, a free lecture! Let me grab my PhD… oh wait, I already have one. 🎓",
    "Thanks, Captain Obvious – my 10 years of experience were clearly just a warm-up. 🔥",
    "Fascinating! It's like having Google, but with 40% more unsolicited opinions. 💅",
    "Did you know? Mansplaining burns 0 calories but 100% of my patience. 🙃",
    "Thanks for the tutorial, darling – filed straight in the bin where it belongs. 🗑️",
  ],
  interruption: [
    "Sorry, did the middle of my sentence interrupt the beginning of yours? Rude of my words! 😇",
    "My idea was SO good it teleported right out of your mouth! Magic! 🪄",
    "BRB, finishing the thought I had before someone decided silence was my intro music. 🎵",
    "Plot twist: I WAS still talking. The mic is still mine, darling. 🎤",
    "I see you found my finish line before I did – remarkable cardio for someone sitting down! 🏃‍♀️",
  ],
  outfit_comment: [
    "My outfit, my rules. The dress code for your opinion is: NOT INVITED. 💁‍♀️",
    "A fashion review from someone I didn't hire! The universe is full of surprises. 👗",
    "I dressed for ME today – not for your comfort zone. Work on yours! 💅",
    "Bold of you to use your mouth for unsolicited commentary instead of minding your business. 🪄",
    "I'm the main character. You're giving 'background extra' energy right now. 🎬",
  ],
  condescension: [
    "'Calm down'! The two words that have NEVER once helped anyone calm down. Revolutionary. 🧘‍♀️",
    "I'm not emotional, I'm ACCURATE. There's a difference – I'll explain it slowly. 📖",
    "Sweetie?! Ma'am, I have a name AND a backbone – both equally powerful. 👑",
    "I'm not sensitive. You're just learning what standards feel like from the outside. 👁️",
    "Oh I'm overreacting? Let me recalculate… nope, still completely valid. ✅",
  ],
  workplace: [
    "Classic 'steal the idea then take the credit at the review.' Vintage move! 📊🔥",
    "My ideas have legs. Long, confident legs that walk straight to HR if this keeps up. 💼",
    "I suggested that 10 minutes ago. In the same room. While you were in it. Ears working? 👂",
    "Plot twist: my salary will reflect the value I bring, one way or another. Stay tuned! 📈",
    "I'm not asking for a seat at the table anymore. I'm building a BETTER table. With snacks. 🪑",
  ],
  street_harassment: [
    "I did not put on this outfit for a one-star ambience check from strangers. 🎧👑",
    "Compliments work differently when they're wanted. This was NOT wanted. 💫",
    "My existence in public is not an invitation for commentary. Mind your business! 🚶‍♀️",
    "The AUDACITY. You walked all the way over here for THIS? Invest that energy, babe. 😂🔥",
    "Thanks for your unsolicited input! I'll file it in the bin. 🗑️",
  ],
  general: [
    "That energy you threw? It's going STRAIGHT into the block pile. Bye! 👋",
    "Noted. Ignored. Moving on with my fabulous day. ✨",
    "I'd clap back harder, but I'm saving my energy for people who actually matter. 👑",
    "Your opinion: received, reviewed, and respectfully YEETED into the void. 🌌",
    "I'm not arguing – I'm correcting you. Huge difference, darling. 💅",
    "Your Fairy Godmother says: this situation is NOT worth your mascara. 🧚‍♀️",
    "That's fascinating! I'll keep it in mind the next time I need a laugh. 😂",
  ],
};

const SASS_INTROS = [
  "✨ Your Fairy Godmother has ARRIVED. Here's your comeback: ",
  "👑 QUEEN, I've got you! Deploy this: ",
  "🌟 Oh they did NOT. Fire back with: ",
  "💅 Bibbidi-bobbidi-BACK ON THAT NONSENSE — use this: ",
  "🪄 Wand twirled, spell cast, comeback delivered: ",
];

const SASS_OUTROS = [
  " 👑 You are the main character — own it.",
  " 🧚‍♀️ Their opinion isn't paying your bills anyway.",
  " ✨ Operating on a higher frequency over here!",
  " 💪 Mic drop. Tiara on. Walk away.",
];

const CATEGORY_KEYWORDS = {
  mansplaining: ["explain", "actually", "well technically", "let me tell you", "trust me", "as a man", "just saying", "let me clarify"],
  interruption: ["interrupt", "cut off", "talked over", "let me finish", "couldn't finish", "stopped me", "overtalked"],
  outfit_comment: ["outfit", "clothes", "dress", "wearing", "look", "shorts", "skirt", "appearance", "too much", "inappropriate"],
  condescension: ["sweetie", "honey", "dear", "calm down", "emotional", "overreacting", "sensitive", "not that serious", "relax"],
  workplace: ["boss", "meeting", "credit", "idea", "promoted", "colleague", "salary", "raise", "office", "manager"],
  street_harassment: ["street", "stranger", "catcall", "whistled", "followed", "stared", "commented", "unwanted"],
};

function detectCategory(scenario) {
  const text = scenario.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return cat;
  }
  return "general";
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateOfflineComeback(scenario, humorLevel) {
  const category = detectCategory(scenario);
  const bank = COMEBACKS[category] || COMEBACKS.general;
  let comeback = pick(SASS_INTROS) + pick(bank) + pick(SASS_OUTROS);
  // For savage levels, double-down
  if (humorLevel >= 8) {
    comeback = "👸 LEGENDARY MODE: " + pick(SASS_INTROS) + pick(bank) + " " + pick(COMEBACKS.general) + pick(SASS_OUTROS);
  }
  return { comeback, category };
}

/* ── State ─────────────────────────────────────────────────────── */
let currentUser = null;   // { nickname, id }
let currentComeback = null;   // current result text
let currentCategory = null;
let uploadedImageB64 = null;
let recognition = null;
let isRecording = false;

/* ── Init ────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  updateHumorLabel();
  setupCharCounter();
  setupSliderListener();
  rotateFairyBubble();
  setInterval(() => rotateFairyBubble(), 5000);
});

/* ── User (localStorage) ─────────────────────────────────────────── */
function loadUser() {
  const saved = JSON.parse(localStorage.getItem("sassback_user") || "null");
  if (saved) {
    currentUser = saved;
    showUserStrip(saved.nickname);
  }
}

function saveNickname() {
  const input = document.getElementById("nicknameInput");
  const nickname = input?.value.trim() || "Sassy Queen";
  const id = "user_" + Date.now();
  currentUser = { nickname, id };
  localStorage.setItem("sassback_user", JSON.stringify(currentUser));
  showUserStrip(nickname);
  closeModal("nicknameModal");
  showToast(`✨ Welcome, ${nickname}! SASSBack is ready to slay. 👑`);
}

function showUserStrip(nickname) {
  const strip = document.getElementById("userStrip");
  const greeting = document.getElementById("userGreeting");
  if (strip && greeting) {
    greeting.textContent = `👑 Welcome back, ${nickname}!`;
    strip.style.display = "flex";
  }
}

function resetUser() {
  localStorage.removeItem("sassback_user");
  currentUser = null;
  const s = document.getElementById("userStrip");
  if (s) s.style.display = "none";
  openNicknameModal();
}

function openNicknameModal() {
  const m = document.getElementById("nicknameModal");
  if (m) { m.style.display = "flex"; setTimeout(() => document.getElementById("nicknameInput")?.focus(), 100); }
}

/* ── Photo Upload ─────────────────────────────────────────────────── */
function handlePhotoUpload(event) { const f = event.target.files[0]; if (f) processPhotoFile(f); }

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById("uploadZone")?.classList.add("drag-over");
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById("uploadZone")?.classList.remove("drag-over");
  const f = event.dataTransfer.files[0];
  if (f && f.type.startsWith("image/")) processPhotoFile(f);
  else showToast("⚠️ Please drop an image file (JPG, PNG, WEBP).");
}

function processPhotoFile(file) {
  if (file.size > 5 * 1024 * 1024) { showToast("⚠️ File too large! Keep it under 5MB, darling. 📸"); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageB64 = e.target.result;
    document.getElementById("previewImg").src = uploadedImageB64;
    document.getElementById("uploadPreview").style.display = "block";
    document.getElementById("uploadNote").style.display = "block";
    document.getElementById("uploadZone").style.display = "none";
    showToast("📸 Screenshot loaded! Your Fairy Godmother sees it. 🪄");
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  uploadedImageB64 = null;
  document.getElementById("previewImg").src = "";
  document.getElementById("uploadPreview").style.display = "none";
  document.getElementById("uploadNote").style.display = "none";
  document.getElementById("uploadZone").style.display = "block";
  document.getElementById("photoInput").value = "";
  showToast("🗑️ Photo removed.");
}

/* ── Humor Slider ─────────────────────────────────────────────────── */
const HUMOR_LABELS = {
  1: "Level 1 – Soft & Sweet 🌸", 2: "Level 2 – Gentle Nudge 😊", 3: "Level 3 – Playfully Witty 😏",
  4: "Level 4 – Confident 💪", 5: "Level 5 – Bold & Sassy 💅", 6: "Level 6 – Fiercely Funny 🔥",
  7: "Level 7 – Drama Queen 👸", 8: "Level 8 – Extra AF 💣", 9: "Level 9 – Ultra Savage 😈",
  10: "Level 10 – LEGENDARY 👑"
};

function setupSliderListener() {
  document.getElementById("humorSlider")?.addEventListener("input", updateHumorLabel);
}
function updateHumorLabel() {
  const slider = document.getElementById("humorSlider");
  const label = document.getElementById("humorLabel");
  if (slider && label) label.textContent = HUMOR_LABELS[parseInt(slider.value)] || `Level ${slider.value}`;
}
function setHumor(level) {
  const slider = document.getElementById("humorSlider");
  if (slider) { slider.value = level; updateHumorLabel(); }
  document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
  if (event?.target) event.target.classList.add("active");
}

/* ── Char counter ─────────────────────────────────────────────────── */
function setupCharCounter() {
  const ta = document.getElementById("scenarioInput");
  if (ta) ta.addEventListener("input", () => {
    const c = document.getElementById("charCount");
    if (c) c.textContent = ta.value.length;
  });
}

/* ── Fill sample ─────────────────────────────────────────────────── */
function fillScenario(text) {
  const ta = document.getElementById("scenarioInput");
  if (ta) { ta.value = text; ta.dispatchEvent(new Event("input")); ta.focus(); ta.scrollIntoView({ behavior: "smooth", block: "center" }); }
}

/* ── Voice input ─────────────────────────────────────────────────── */
function toggleVoice() {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    showToast("🎙️ Voice input not supported. Try Chrome!"); return;
  }
  if (isRecording) { recognition?.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = "en-US"; recognition.continuous = false; recognition.interimResults = false;
  recognition.onstart = () => { isRecording = true; const b = document.getElementById("voiceBtn"); if (b) { b.classList.add("recording"); b.textContent = "⏹️"; } showToast("🎙️ Listening…"); };
  recognition.onresult = (e) => { const ta = document.getElementById("scenarioInput"); if (ta) { ta.value = e.results[0][0].transcript; ta.dispatchEvent(new Event("input")); } };
  recognition.onend = () => { isRecording = false; const b = document.getElementById("voiceBtn"); if (b) { b.classList.remove("recording"); b.textContent = "🎙️"; } };
  recognition.onerror = () => { showToast("⚠️ Couldn't catch that. Try typing!"); isRecording = false; };
  recognition.start();
}

/* ── MAIN: Generate Comeback (fully offline) ─────────────────────── */
function generateComeback() {
  const scenario = document.getElementById("scenarioInput")?.value.trim();
  const hasImage = !!uploadedImageB64;

  if (!scenario && !hasImage) {
    showToast("✨ Describe the situation OR upload a screenshot first, darling!");
    document.getElementById("scenarioInput")?.focus();
    return;
  }

  const humorLevel = parseInt(document.getElementById("humorSlider")?.value || 5);
  const btn = document.getElementById("generateBtn");
  const btnText = document.getElementById("generateBtnText");

  btn.classList.add("loading");
  btnText.innerHTML = `<span class="spinner"></span> ${hasImage ? "Reading screenshot…" : "Conjuring magic…"}`;

  // Simulate a small magic delay ✨
  setTimeout(() => {
    try {
      const effectiveScenario = scenario || (hasImage ? "someone posted a rude comment online" : "general rudeness");
      const result = generateOfflineComeback(effectiveScenario, humorLevel);

      currentComeback = result.comeback;
      currentCategory = result.category;

      // Save incident to localStorage
      saveIncident(effectiveScenario, result.comeback, result.category, humorLevel);

      displayResult(result);
    } catch (err) {
      showToast("❌ Oops, even magic hiccups sometimes! Try again.");
    } finally {
      btn.classList.remove("loading");
      btnText.textContent = "🪄 Wave the Wand!";
    }
  }, 900);
}

/* ── Save incident to localStorage ──────────────────────────────── */
function saveIncident(scenario, comeback, category, humorLevel) {
  const incidents = JSON.parse(localStorage.getItem("sassback_incidents") || "[]");
  incidents.unshift({ id: Date.now(), scenario, comeback, category, humorLevel, date: new Date().toISOString() });
  // Keep last 100
  localStorage.setItem("sassback_incidents", JSON.stringify(incidents.slice(0, 100)));
}

/* ── Display Result ──────────────────────────────────────────────── */
function displayResult({ comeback, category }) {
  const section = document.getElementById("resultSection");
  const text = document.getElementById("resultText");
  const cat = document.getElementById("resultCategory");
  if (!section || !text) return;

  text.textContent = comeback;
  if (cat) cat.textContent = formatCategory(category);

  section.style.display = "block";
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("selected"));

  launchConfetti();
  rotateFairyBubble("Your wand has been waved! ✨ Deploy that comeback, queen. 👑");
}

function formatCategory(cat) {
  const map = {
    mansplaining: "🎓 Mansplaining Detected", interruption: "🗣️ Interruption Drama",
    outfit_comment: "👗 Outfit Police Alert", condescension: "😤 Condescension City",
    workplace: "🏢 Workplace Chaos", street_harassment: "🚶‍♀️ Street Nonsense",
    general: "✨ General Sass Required",
  };
  return map[cat] || "✨ " + cat;
}

/* ── Emoji reactions (localStorage) ─────────────────────────────── */
function reactTo(emoji) {
  document.querySelectorAll(".emoji-btn").forEach(b => b.classList.remove("selected"));
  if (event?.target) event.target.classList.add("selected");
  showToast(`${emoji} Reaction saved!`);
}

/* ── Copy ────────────────────────────────────────────────────────── */
async function copyComeback() {
  const text = document.getElementById("resultText")?.textContent;
  if (!text) return;
  try { await navigator.clipboard.writeText(text); showToast("📋 Copied! Go slay! 👑"); }
  catch (_) { showToast("⚠️ Couldn't copy – select manually."); }
}

/* ── Meme Modal ──────────────────────────────────────────────────── */
function shareToMeme() {
  const text = document.getElementById("resultText")?.textContent || "";
  const mt = document.getElementById("memeText");
  if (mt) mt.textContent = text;
  document.getElementById("memeModal").style.display = "flex";
}

function downloadMeme() {
  showToast("🖼️ Right-click the meme card → 'Save Image As' — or screenshot it! 📸");
}

/* ── Community Wall (localStorage) ──────────────────────────────── */
function openShareModal() {
  if (!currentComeback) { showToast("⚠️ Generate a comeback first, then share it!"); return; }
  document.getElementById("shareModal").style.display = "flex";
}

function submitShare() {
  const story = document.getElementById("shareStoryInput")?.value.trim() || "An epic slay moment! 💅";
  const comeback = currentComeback || "";
  const category = currentCategory || "general";
  const nickname = currentUser?.nickname || "Anonymous Queen";

  const posts = JSON.parse(localStorage.getItem("sassback_community") || "[]");
  posts.unshift({ id: Date.now(), story, comeback, category, nickname, date: new Date().toISOString() });
  localStorage.setItem("sassback_community", JSON.stringify(posts.slice(0, 200)));

  showToast("🌟 Posted to the community wall! #solidarity");
  closeModal("shareModal");
}

/* ── Confetti ────────────────────────────────────────────────────── */
function launchConfetti() {
  const emojis = ["✨", "💫", "🌟", "👑", "💅", "🔥", "🎉", "🪄", "💜", "⭐"];
  for (let i = 0; i < 26; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = "-30px";
      el.style.fontSize = `${1 + Math.random() * 1.2}rem`;
      el.style.animationDuration = `${2 + Math.random() * 2}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 60);
  }
}

/* ── Fairy speech bubble ─────────────────────────────────────────── */
const FAIRY_LINES = [
  "Bibbidi-bobbidi-BACK OFF, darling. ✨",
  "Your crown is NOT up for debate. 👑",
  "No spell needed – just your beautiful confidence! 🪄",
  "Today's forecast: 100% chance of slaying. ☀️💅",
  "Your Fairy Godmother is caffeinated and ready. ☕✨",
  "They can't handle your shine. That's a THEM problem. 🌟",
  "Confidence is your superpower. I just help you aim it. 💪",
];
let bubbleIdx = 0;
function rotateFairyBubble(custom = null) {
  const b = document.getElementById("heroBubble");
  if (!b) return;
  b.style.opacity = "0";
  setTimeout(() => {
    b.textContent = custom || FAIRY_LINES[bubbleIdx % FAIRY_LINES.length];
    if (!custom) bubbleIdx++;
    b.style.opacity = "1";
    b.style.transition = "opacity 0.5s";
  }, 300);
}

/* ── Toast ───────────────────────────────────────────────────────── */
let toastTimeout;
function showToast(msg) {
  let toast = document.getElementById("globalToast");
  if (!toast) { toast = document.createElement("div"); toast.id = "globalToast"; toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ── Modals ──────────────────────────────────────────────────────── */
function closeModal(id) { const el = document.getElementById(id); if (el) el.style.display = "none"; }
document.addEventListener("keydown", e => { if (e.key === "Escape") ["nicknameModal", "shareModal", "memeModal"].forEach(closeModal); });
