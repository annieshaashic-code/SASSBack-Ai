"""
AI Engine – generates fierce, funny, empowering comebacks.
SASSBack AI  |  Primary: OpenAI GPT-4o  |  Fallback: curated witty bank.
"""
import os
import random
from typing import Optional

# ── Category detection keywords ──────────────────────────────────────────────

CATEGORY_KEYWORDS = {
    "mansplaining": [
        "explain", "actually", "well technically", "let me tell you",
        "you probably don't know", "as a man", "trust me", "mistake",
        "just saying", "no offense but", "let me clarify"
    ],
    "interruption": [
        "interrupt", "cut off", "talked over", "let me finish",
        "couldn't finish", "stopped me", "didn't let me", "overtalked"
    ],
    "outfit_comment": [
        "outfit", "clothes", "dress", "wearing", "look", "shorts",
        "skirt", "appearance", "too much", "not enough", "inappropriate"
    ],
    "condescension": [
        "sweetie", "honey", "dear", "young lady", "calm down",
        "emotional", "overreacting", "sensitive", "not that serious",
        "little girl", "girls", "relax"
    ],
    "workplace": [
        "boss", "meeting", "credit", "idea", "promoted", "colleague",
        "salary", "raise", "office", "job", "work", "manager"
    ],
    "street_harassment": [
        "street", "stranger", "catcall", "whistled", "followed",
        "stared", "commented", "unwanted attention", "uncomfortable"
    ],
}

# ── Fallback comeback bank (when no API key is provided) ─────────────────────

FALLBACK_COMEBACKS = {
    "mansplaining": [
        "Oh WOW, a free lecture! Let me grab my PhD… oh wait, I already have one. 🎓✨",
        "Bless your heart for explaining that to me! My 10 years of experience were clearly just a warm-up. 🔥",
        "Thanks, Captain Obvious! I've survived without your tutorial for decades – plot twist, I'll survive after it too. 🚀",
        "Fascinating! It's like having Google, but with 40% more unsolicited opinions. 💅",
        "Did you know? Mansplaining burns 0 calories but 100% of my patience. Impressive efficiency! ✨",
    ],
    "interruption": [
        "Oh sorry, did the middle of my sentence interrupt the beginning of yours? How rude of my words! 😇",
        "Wow, my idea was SO good it teleported right out of your mouth two seconds later! Magic! ✨🪄",
        "BRB, finishing the thought I had before someone decided silence was just my intro music. 🎵",
        "Plot twist: I WAS still talking. The mic is still mine, darling. 🎤👑",
        "I see you found my finish line before I did – remarkable cardio for someone sitting down! 🏃‍♀️",
    ],
    "outfit_comment": [
        "My outfit, my rules. The dress code for your opinion is: NOT INVITED. Thanks for coming to my TED talk! 💁‍♀️",
        "Wow, a fashion review from someone I didn't hire! The universe is truly full of surprises. 👗✨",
        "I dressed for ME today, not for your comfort zone. Work on YOUR zone, babes! 💅🔥",
        "Bold of you to use your mouth for unsolicited commentary instead of, you know, minding business. 🪄",
        "I'm the main character. You're giving 'background extra' energy right now. ✨🎬",
    ],
    "condescension": [
        "Wow, 'calm down'! The two words that have NEVER once helped anyone calm down. Revolutionary advice. 🧘‍♀️",
        "I'm not emotional, I'm ACCURATE. There's a difference, and I'll explain it slowly. 📖💅",
        "Sweetie? SWEETIE?! Ma'am, I have a name AND a backbone – both equally powerful. 🦋👑",
        "Oh I'm overreacting? Let me recalculate… nope, still completely valid. Math checks out! ✅🔢",
        "I'm not sensitive. You're just learning what standards feel like from the outside. Eye-opening, isn't it? 👁️✨",
    ],
    "workplace": [
        "Ah yes, the classic 'steal the idea in the meeting then take the credit at the review.' Vintage move! 📊🔥",
        "My ideas have legs. Long, confident legs that walk straight to HR if this keeps up. 💼👠",
        "I suggested that 10 minutes ago. In the same room. While you were in it. Just checking – ears working? 👂💅",
        "Plot twist: my salary will reflect the value I bring, one way or another. Stay tuned! 📈✨",
        "I'm not asking for a seat at the table anymore. I'm building a BETTER table. With snacks. 🪑🍰",
    ],
    "street_harassment": [
        "I did not put on this outfit and these headphones for a one-star ambience check from strangers. 🎧👑",
        "Compliments work differently when they're wanted. This was not wanted. Shocking, I know. 💫",
        "My existence in public is not an invitation for commentary. Kindly return to minding your business! 🚶‍♀️✨",
        "The audacity. The AUDACITY. You walked all the way over here for THIS? Babe, invest that energy. 😂🔥",
        "Thanks for your unsolicited input! I'll file it directly in the bin. 🗑️💅",
    ],
    "general": [
        "Wow, that energy you just threw? It's going STRAIGHT into the block pile. Bye! 👋🚫",
        "Noted. Ignored. Moving on with my fabulous day. ✨💃",
        "I'd clap back harder, but I'm saving my energy for people who matter. Good day! 👑",
        "Your opinion has been received, reviewed, and respectfully YEETED into the void. 🌌✨",
        "I'm not arguing with you – I'm correcting you. Huge difference, darling. 💅🎓",
        "Fairy Godmother says: this situation is not worth your mascara. Cry ZERO tears. 🧚‍♀️✨",
        "That's a fascinating perspective! I'll keep it in mind the next time I need a laugh. 😂👑",
    ],
}

SASS_INTROS = [
    "✨ *sparkle sparkle* Honey, your Fairy Godmother has ARRIVED. Here's what you say: ",
    "🧚‍♀️ Oh DARLING, the nerve! Let me wave my wand… Here's your comeback: ",
    "👑 QUEEN, I've got you! Your Fairy Godmother commands you to say: ",
    "🌟 *dramatic gasp* Oh they did NOT. Here's what you fire back: ",
    "💅 Bibbidi-bobbidi-BACK ON THAT NONSENSE. Your comeback, delivered with love: ",
    "🪄 *wand twirl* Your Fairy Godmother has reviewed the situation and finds it UNACCEPTABLE. Deploy this: ",
]

SASS_OUTROS = [
    "\n\n*drops wand dramatically* 💫 Remember: you are the main character. Own it.",
    "\n\n🧚‍♀️ You've got this, gorgeous. Their opinion isn't paying your bills anyway.",
    "\n\n✨ And if they don't get it? Not your problem. You're operating on a higher frequency!",
    "\n\n👑 Mic drop. Tiara on. Walk away like the royalty you are.",
    "\n\n💪 That's the spirit! Your Fairy Godmother is SO proud. Now go live your best life!",
    "\n\n🌟 *confetti cannon fires* THIS IS YOUR MOMENT. Savour it.",
]

HUMOR_MODIFIERS = {
    range(1, 4): "gentle and sweet",
    range(4, 7): "confident and clever",
    range(7, 9): "bold and sassy",
    range(9, 11): "absolutely savage and extra",
}


def detect_category(scenario: str) -> str:
    """Heuristically classify the scenario into a category."""
    text = scenario.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in text for kw in keywords):
            return category
    return "general"


def _humor_style(level: int) -> str:
    for r, style in HUMOR_MODIFIERS.items():
        if level in r:
            return style
    return "confident and clever"


def _fallback_response(category: str, humor_level: int) -> str:
    options = FALLBACK_COMEBACKS.get(category, FALLBACK_COMEBACKS["general"])
    return (
        random.choice(SASS_INTROS)
        + random.choice(options)
        + random.choice(SASS_OUTROS)
    )


def generate_comeback(
    scenario: str,
    humor_level: int = 5,
    category: Optional[str] = None,
    openai_key: Optional[str] = None,
    image_b64: Optional[str] = None,
) -> dict:
    """
    Main entry point. Returns:
       { "response": str, "category": str, "method": "openai" | "fallback" }
    Pass image_b64 (data:image/... base64 string) to enable vision-based
    reply generation from a screenshot of an online comment.
    """
    if category is None:
        category = detect_category(scenario)

    humor_style = _humor_style(humor_level)

    # ── Try OpenAI ────────────────────────────────────────────────────────────
    api_key = openai_key or os.environ.get("OPENAI_API_KEY")
    if api_key:
        try:
            import openai
            client = openai.OpenAI(api_key=api_key)

            system_prompt = (
                "You are SASSBack AI – a fierce fairy godmother: think Wanda from Fairly OddParents "
                "meets a stand-up comedian. Generate short, witty, empowering replies for women. "
                "Tone: " + humor_style + ". "
                "RULES: reply in MAX 2 SHORT punchy sentences. One emoji max. "
                "Be specific and validating. If given a screenshot, read the comment text "
                "and craft a direct reply TO that comment."
            )

            if image_b64:
                # Vision mode – read the screenshot and reply to the comment in it
                user_content = [
                    {
                        "type": "text",
                        "text": (
                            f"Humor level (1=mild, 10=savage): {humor_level}\n"
                            f"Context: {scenario}\n"
                            "Read the comment/message in this screenshot and fire back "
                            "a short, punchy reply TO it. Max 2 sentences."
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": image_b64, "detail": "low"},
                    },
                ]
                model = "gpt-4o"   # vision requires gpt-4o
            else:
                # Text-only mode
                user_content = (
                    f"Humor level (1=mild, 10=savage): {humor_level}\n"
                    f"Category: {category}\n"
                    f"Situation: {scenario}\n"
                    "Write ONE sharp comeback – max 2 sentences, one emoji."
                )
                model = "gpt-4o-mini"

            resp = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user",   "content": user_content},
                ],
                max_tokens=90,        # keeps replies short & punchy
                temperature=0.9,
            )
            content = resp.choices[0].message.content.strip()
            return {"response": content, "category": category, "method": "openai"}

        except Exception as e:
            print(f"[AI Engine] OpenAI failed ({e}). Using fallback.")

    # ── Fallback: curated bank ────────────────────────────────────────────────
    response = _fallback_response(category, humor_level)
    return {"response": response, "category": category, "method": "fallback"}
