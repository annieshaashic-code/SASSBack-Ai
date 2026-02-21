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
    "I appreciate the enthusiasm, but I've already solved this while you were still finding the intro. 💡",
    "If I needed a narrator for my own life, I'd have hired Morgan Freeman. But thanks! 🎙️",
    "That's a lot of words just to say you didn't read my previous email. 📧",
    "You explained that so confidently! Too bad confidence doesn't equal correctness. 📉",
    "I love how you summarized exactly what I just said. Great listening skills! 👂✨"
  ],
  interruption: [
    "Sorry, did the middle of my sentence interrupt the beginning of yours? Rude of my words! 😇",
    "My idea was SO good it teleported right out of your mouth! Magic! 🪄",
    "BRB, finishing the thought I had before someone decided silence was my intro music. 🎵",
    "Plot twist: I WAS still talking. The mic is still mine, darling. 🎤",
    "I see you found my finish line before I did – remarkable cardio for someone sitting down! 🏃‍♀️",
    "Oh, I didn't realize we were doing a relay race with my sentences. I'll take the baton back now. 🏃‍♂️💨",
    "Hold that thought! It'll be even better once I finish mine. ⏳",
    "My sentence wasn't a question, so it didn't actually need an answer mid-way. 🚫",
    "I'll pause so you can get that out, and then we'll go back to the actual point I was making. ⏸️",
    "Stream of consciousness is great for journaling, but let's stick to one speaker at a time here. 🌊"
  ],
  outfit_comment: [
    "My outfit, my rules. The dress code for your opinion is: NOT INVITED. 💁‍♀️",
    "A fashion review from someone I didn't hire! The universe is full of surprises. 👗",
    "I dressed for ME today – not for your comfort zone. Work on yours! 💅",
    "Bold of you to use your mouth for unsolicited commentary instead of minding your business. 🪄",
    "I'm the main character. You're giving 'background extra' energy right now. 🎬",
    "Is my outfit distracting you from your work? I'll try to be less iconic tomorrow. (No I won't). 🌟",
    "I don't remember asking for a style consultation. Is this a free trial or do you charge? 💸",
    "It’s a bold look, isn't it? Just like your decision to comment on it. 💥",
    "I wear what makes me feel powerful. Clearly, it's working if it's getting this much attention. 💪",
    "My wardrobe wasn't curated for your approval, but thanks for the feedback! 📂"
  ],
  condescension: [
    "'Calm down'! The two words that have NEVER once helped anyone calm down. Revolutionary. 🧘‍♀️",
    "I'm not emotional, I'm ACCURATE. There's a difference – I'll explain it slowly. 📖",
    "Sweetie?! Ma'am, I have a name AND a backbone – both equally powerful. 👑",
    "I'm not sensitive. You're just learning what standards feel like from the outside. 👁️",
    "Oh I'm overreacting? Let me recalculate… nope, still completely valid. ✅",
    "I appreciate the 'concern', but I've got this handled. Focus on your own lane. 🛣️",
    "The 'sweetheart' tone is very 1950s. We've actually moved on since then. 🕰️",
    "I’m not being difficult, I’m being direct. I know it can be a shock for some. ⚡",
    "If my competence feels like a threat, that's something you should look into. 🔍",
    "I'm using logic, you're using adjectives. Let's try to meet in the middle. 🤝"
  ],
  workplace: [
    "Classic 'steal the idea then take the credit at the review.' Vintage move! 📊🔥",
    "My ideas have legs. Long, confident legs that walk straight to HR if this keeps up. 💼",
    "I suggested that 10 minutes ago. In the same room. While you were in it. Ears working? 👂",
    "Plot twist: my salary will reflect the value I bring, one way or another. Stay tuned! 📈",
    "I'm not asking for a seat at the table anymore. I'm building a BETTER table. With snacks. 🪑",
    "That’s exactly what I said earlier, I’m glad you’ve finally processed it. 🧠",
    "I’ll be CC-ing myself on that 'collaborative' project from now on. For 'clarity'. 📧",
    "Let’s look at the meeting notes—oh wait, I wrote them, and my name is right next to that idea. 📝",
    "I’m here to contribute, not to be a ghostwriter for your career. ✍️❌",
    "My contribution wasn't a suggestion, it was the solution. Let's credit it correctly. 🏆"
  ],
  street_harassment: [
    "I did not put on this outfit for a one-star ambience check from strangers. 🎧👑",
    "Compliments work differently when they're wanted. This was NOT wanted. 💫",
    "My existence in public is not an invitation for commentary. Mind your business! 🚶‍♀️",
    "The AUDACITY. You walked all the way over here for THIS? Invest that energy, babe. 😂🔥",
    "Thanks for your unsolicited input! I'll file it in the bin. 🗑️",
    "I'm busy living my life, not waiting for a guest appearance in yours. 🚶‍♀️💨",
    "Silence is also a choice. You should try it sometime! 🤫",
    "That line was so bad it actually made the weather worse. Impressive. ☁️",
    "I’m not a statue, you don’t need to narrate my walk. 🗿❌",
    "Was that supposed to be a compliment? Because it felt like a chore. 🧹"
  ],
  general: [
    "That energy you threw? It's going STRAIGHT into the block pile. Bye! 👋",
    "Noted. Ignored. Moving on with my fabulous day. ✨",
    "I'd clap back harder, but I'm saving my energy for people who actually matter. 👑",
    "Your opinion: received, reviewed, and respectfully YEETED into the void. 🌌",
    "I'm not arguing – I'm correcting you. Huge difference, darling. 💅",
    "Your Fairy Godmother says: this situation is NOT worth your mascara. 🧚‍♀️",
    "That's fascinating! I'll keep it in mind the next time I need a laugh. 😂",
    "I’m not here to validate your ego. I have a schedule, you know. 📅",
    "Oh, were we having a discussion? I thought you were just rehearsing a monologue. 🎭",
    "You have the right to remain silent. Anything you say will be used as a meme. 🚔💅",
    "I love your confidence! It's almost cute how wrong you are. 🧸",
    "I don't have the time or the crayons to explain this to you right now. 🖍️"
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
  mansplaining: ["explain", "actually", "well technically", "let me tell you", "trust me", "as a man", "just saying", "let me clarify", "condescending", "lecture", "tutorial"],
  interruption: ["interrupt", "cut off", "talked over", "let me finish", "couldn't finish", "stopped me", "overtalked", "ignore", "not listening"],
  outfit_comment: ["outfit", "clothes", "dress", "wearing", "look", "shorts", "skirt", "appearance", "too much", "inappropriate", "fashion", "makeup"],
  condescension: ["sweetie", "honey", "dear", "calm down", "emotional", "overreacting", "sensitive", "not that serious", "relax", "difficult", "angry"],
  workplace: ["boss", "meeting", "credit", "idea", "promoted", "colleague", "salary", "raise", "office", "manager", "promotion", "pay gap"],
  street_harassment: ["street", "stranger", "catcall", "whistled", "followed", "stared", "commented", "unwanted", "shout", "hey baby"],
};

function detectCategory(scenario) {
  const text = scenario.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return cat;
  }
  return "general";
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const SPECIFIC_REPLAYS = [
  { keys: ["boss", "credit"], reply: "My contribution wasn't a suggestion, it was the solution. I'll be CC-ing myself on the next update for 'visibility'. 🏆" },
  { keys: ["smile"], reply: "I'm not here for a one-star ambience check from strangers. Silence is a choice, try it! 🤫💅" },
  { keys: ["sweetie", "honey", "dear"], reply: "Sweetie? Ma'am, I have a name AND a backbone. Let's stick to the professional project goals. 👑" },
  { keys: ["calm down", "emotional"], reply: "I'm not being emotional, I'm being accurate. There's a difference, but I'll wait while you process that. 📖✅" },
  { keys: ["actually", "technically"], reply: "Oh, are we doing a lecture? Let me grab my PhD… oh wait, I already have one. Let's get back to facts. 🎓🔥" },
  { keys: ["outfit", "dress", "shorts"], reply: "I dressed for ME today, not for your comfort zone. If my confidence is distracting, that sounds like a 'you' problem. 👗✨" },
  { keys: ["interrupt", "cut off"], reply: "Did the middle of my sentence interrupt the beginning of yours? Rude of my words! I'll take the mic back now. 🎤🪄" },
  { keys: ["pay", "salary", "raise"], reply: "My salary should reflect my results, not your assumptions. Let's focus on the value I've delivered. 📈💼" },
];

function generateOfflineComeback(scenario, humorLevel) {
  const text = scenario.toLowerCase();
  let selectedReply = null;

  // 1. Try to find a logical match first
  for (const match of SPECIFIC_REPLAYS) {
    if (match.keys.every(k => text.includes(k))) {
      selectedReply = match.reply;
      break;
    }
  }

  // 2. Fallback to category random pick if no specific match
  const category = detectCategory(scenario);
  const bank = COMEBACKS[category] || COMEBACKS.general;

  if (!selectedReply) {
    selectedReply = pick(bank);
  }

  let comeback = pick(SASS_INTROS) + selectedReply + pick(SASS_OUTROS);

  // For savage levels, add some extra spice
  if (humorLevel >= 8) {
    comeback = "👸 LEGENDARY MODE: " + pick(SASS_INTROS) + selectedReply + " " + pick(COMEBACKS.general) + pick(SASS_OUTROS);
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

/* ── MAIN: Generate Comeback (API with Offline Fallback) ────────── */
async function generateComeback() {
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
  btnText.innerHTML = `<span class="spinner"></span> ${hasImage ? "Analyzing with AI…" : "Consulting the stars…"}`;

  const effectiveScenario = scenario || (hasImage ? "someone posted a rude comment online" : "general rudeness");

  try {
    // 1. Attempt to call the REAL AI Backend
    const response = await fetch("http://localhost:5000/api/comeback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: effectiveScenario,
        humor_level: humorLevel,
        image_b64: uploadedImageB64,
        save: false // Insights were removed
      })
    });

    if (!response.ok) throw new Error("API call failed");

    const resultData = await response.json();

    // Check if the backend actually used AI or its own fallback
    currentComeback = resultData.comeback;
    currentCategory = resultData.category;

    displayResult({
      comeback: resultData.comeback,
      category: resultData.category,
      method: resultData.method || "ai"
    });

  } catch (err) {
    // 2. Fallback to 100% Offline Magic if API fails or Server is down
    console.warn("Backend unavailable, using Offline Magic fallback. ✨");
    const result = generateOfflineComeback(effectiveScenario, humorLevel);
    currentComeback = result.comeback;
    currentCategory = result.category;
    displayResult({ ...result, method: "offline" });
  } finally {
    btn.classList.remove("loading");
    btnText.textContent = "🪄 Wave the Wand!";
  }
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
