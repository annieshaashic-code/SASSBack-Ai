"""
Database layer – initialises and queries the SQLite database.
"""
import sqlite3
import os
from models import CREATE_TABLES_SQL

DB_PATH = os.environ.get("DB_PATH", "fairy_godmother.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # dict-like rows
    return conn


def init_db():
    """Create tables on first run."""
    with get_connection() as conn:
        conn.executescript(CREATE_TABLES_SQL)
        conn.commit()
    print("Database initialised!")


# ── User helpers ────────────────────────────────────────────────────────────

def create_user(nickname: str = "Fairy Fan") -> int:
    with get_connection() as conn:
        cur = conn.execute(
            "INSERT INTO users (nickname) VALUES (?)", (nickname,)
        )
        conn.commit()
        return cur.lastrowid


def get_user(user_id: int):
    with get_connection() as conn:
        return conn.execute(
            "SELECT * FROM users WHERE id = ?", (user_id,)
        ).fetchone()


# ── Incident helpers ─────────────────────────────────────────────────────────

def save_incident(
    user_id: int,
    scenario: str,
    category: str,
    humor_level: int,
    response: str,
) -> int:
    with get_connection() as conn:
        cur = conn.execute(
            """INSERT INTO incidents
               (user_id, scenario, category, humor_level, response)
               VALUES (?, ?, ?, ?, ?)""",
            (user_id, scenario, category, humor_level, response),
        )
        conn.commit()
        return cur.lastrowid


def rate_incident(incident_id: int, emoji: str):
    with get_connection() as conn:
        conn.execute(
            "UPDATE incidents SET emoji_rating = ? WHERE id = ?",
            (emoji, incident_id),
        )
        conn.commit()


def share_incident(incident_id: int, story: str) -> int:
    with get_connection() as conn:
        conn.execute(
            "UPDATE incidents SET shared = 1 WHERE id = ?", (incident_id,)
        )
        cur = conn.execute(
            "INSERT INTO community_posts (incident_id, story) VALUES (?, ?)",
            (incident_id, story),
        )
        conn.commit()
        return cur.lastrowid


def get_user_incidents(user_id: int, limit: int = 50):
    with get_connection() as conn:
        return conn.execute(
            """SELECT * FROM incidents WHERE user_id = ?
               ORDER BY created_at DESC LIMIT ?""",
            (user_id, limit),
        ).fetchall()


def get_user_stats(user_id: int) -> dict:
    with get_connection() as conn:
        total = conn.execute(
            "SELECT COUNT(*) as cnt FROM incidents WHERE user_id = ?",
            (user_id,),
        ).fetchone()["cnt"]

        by_category = conn.execute(
            """SELECT category, COUNT(*) as cnt
               FROM incidents WHERE user_id = ?
               GROUP BY category ORDER BY cnt DESC""",
            (user_id,),
        ).fetchall()

    return {
        "total": total,
        "by_category": [dict(r) for r in by_category],
    }


# ── Community helpers ─────────────────────────────────────────────────────────

def get_community_posts(limit: int = 20, offset: int = 0):
    with get_connection() as conn:
        return conn.execute(
            """SELECT cp.id, cp.story, cp.likes, cp.created_at,
                      i.category
               FROM community_posts cp
               JOIN incidents i ON cp.incident_id = i.id
               ORDER BY cp.created_at DESC
               LIMIT ? OFFSET ?""",
            (limit, offset),
        ).fetchall()


def like_post(post_id: int):
    with get_connection() as conn:
        conn.execute(
            "UPDATE community_posts SET likes = likes + 1 WHERE id = ?",
            (post_id,),
        )
        conn.commit()
