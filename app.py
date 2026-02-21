"""
Flask Backend – AI Fairy Godmother App
All REST API routes for the app.
"""
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from database import (
    init_db, create_user, get_user,
    save_incident, rate_incident, share_incident,
    get_user_incidents, get_user_stats,
    get_community_posts, like_post,
)
from ai_engine import generate_comeback, detect_category

load_dotenv()

app = Flask(__name__, static_folder="../javascript", static_url_path="")
CORS(app)

# ── Initialise DB on startup ──────────────────────────────────────────────────
with app.app_context():
    init_db()


# ── Serve frontend ────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(app.static_folder, path)


# ── User routes ───────────────────────────────────────────────────────────────

@app.route("/api/user", methods=["POST"])
def api_create_user():
    """Create or retrieve a session user."""
    data = request.get_json(silent=True) or {}
    nickname = data.get("nickname", "Fairy Fan")
    user_id = create_user(nickname)
    return jsonify({"user_id": user_id, "nickname": nickname}), 201


@app.route("/api/user/<int:user_id>", methods=["GET"])
def api_get_user(user_id):
    user = get_user(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(dict(user))


# ── Comeback generation ───────────────────────────────────────────────────────

@app.route("/api/comeback", methods=["POST"])
def api_comeback():
    """
    Body:
      {
        "scenario":     "My boss interrupted me in the meeting again",
        "humor_level":  7,        // 1-10, optional (default 5)
        "user_id":      1,        // optional
        "save":         true      // save to incident log? optional
      }
    """
    data = request.get_json(silent=True)
    if not data or "scenario" not in data:
        return jsonify({"error": "Missing 'scenario' field"}), 400

    scenario = data["scenario"].strip()
    humor_level = int(data.get("humor_level", 5))
    humor_level = max(1, min(10, humor_level))  # clamp
    user_id = data.get("user_id")
    should_save = data.get("save", True)
    image_b64 = data.get("image_b64")  # optional screenshot (base64)

    result = generate_comeback(scenario, humor_level, image_b64=image_b64)

    incident_id = None
    if should_save and user_id:
        incident_id = save_incident(
            user_id=user_id,
            scenario=scenario,
            category=result["category"],
            humor_level=humor_level,
            response=result["response"],
        )

    return jsonify({
        "comeback":     result["response"],
        "category":     result["category"],
        "humor_level":  humor_level,
        "incident_id":  incident_id,
        "method":       result["method"],   # "openai" or "fallback"
    })


# ── Incident routes ───────────────────────────────────────────────────────────

@app.route("/api/incident/<int:incident_id>/rate", methods=["POST"])
def api_rate_incident(incident_id):
    """Body: { "emoji": "🔥" }"""
    data = request.get_json(silent=True) or {}
    emoji = data.get("emoji", "❤️")
    rate_incident(incident_id, emoji)
    return jsonify({"ok": True, "emoji": emoji})


@app.route("/api/incident/<int:incident_id>/share", methods=["POST"])
def api_share_incident(incident_id):
    """Share to community wall. Body: { "story": "optional context" }"""
    data = request.get_json(silent=True) or {}
    story = data.get("story", "A Fairy Fan shared a comeback! 💅")
    post_id = share_incident(incident_id, story)
    return jsonify({"ok": True, "post_id": post_id}), 201


@app.route("/api/user/<int:user_id>/incidents", methods=["GET"])
def api_user_incidents(user_id):
    incidents = get_user_incidents(user_id)
    return jsonify([dict(i) for i in incidents])


# ── Stats & insights ──────────────────────────────────────────────────────────

@app.route("/api/user/<int:user_id>/stats", methods=["GET"])
def api_user_stats(user_id):
    stats = get_user_stats(user_id)
    total = stats["total"]

    # generate a fun insight message based on stats
    if total == 0:
        insight = "✨ All quiet on the western front! Enjoy the peace, queen."
    elif total < 3:
        insight = f"🧚‍♀️ {total} situation(s) handled like a BOSS! You're already levelling up."
    elif total < 6:
        insight = (
            f"🔥 {total} battles fought this month! Maybe treat yourself to a bubble bath? "
            "You've EARNED it, warrior."
        )
    elif total < 10:
        insight = (
            f"👑 {total} incidents?! You're out here fighting battles daily. "
            "Time for a spa day and maybe a strongly-worded letter to the universe."
        )
    else:
        insight = (
            f"🌟 {total} incidents! Officially a Legend. At this point your Fairy Godmother "
            "needs a vacation too. PLEASE claim a spa day – you've more than earned it! 🛁✨"
        )

    top_category = (
        stats["by_category"][0]["category"] if stats["by_category"] else None
    )

    return jsonify({
        "total_incidents": total,
        "by_category": stats["by_category"],
        "top_offender_category": top_category,
        "insight_message": insight,
    })


# ── Community routes ──────────────────────────────────────────────────────────

@app.route("/api/community", methods=["GET"])
def api_community():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 20))
    offset = (page - 1) * limit
    posts = get_community_posts(limit, offset)
    return jsonify([dict(p) for p in posts])


@app.route("/api/community/<int:post_id>/like", methods=["POST"])
def api_like_post(post_id):
    like_post(post_id)
    return jsonify({"ok": True})


# ── Health check ──────────────────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    openai_configured = bool(os.environ.get("OPENAI_API_KEY"))
    return jsonify({
        "status": "✨ Fairy Godmother is online and fabulous!",
        "openai": openai_configured,
        "version": "1.0.0",
    })


# ── Run ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    print(f"🧚‍♀️ Fairy Godmother warming up on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)
