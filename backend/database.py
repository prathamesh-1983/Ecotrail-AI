import sqlite3
from pathlib import Path
from typing import Any

from .config import settings


def _connect() -> sqlite3.Connection:
    path = Path(settings.database_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with _connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS observations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                species TEXT NOT NULL,
                confidence REAL NOT NULL,
                summary TEXT NOT NULL,
                habitat TEXT NOT NULL,
                safety TEXT NOT NULL,
                outdoor_action TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()


def create_observation(data: dict[str, Any]) -> dict[str, Any]:
    with _connect() as conn:
        cursor = conn.execute(
            """
            INSERT INTO observations
            (species, confidence, summary, habitat, safety, outdoor_action)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                data["species"],
                data["confidence"],
                data["summary"],
                data["habitat"],
                data["safety"],
                data["outdoor_action"],
            ),
        )
        conn.commit()
        row = conn.execute(
            "SELECT * FROM observations WHERE id = ?",
            (cursor.lastrowid,),
        ).fetchone()
        return dict(row)


def list_observations() -> list[dict[str, Any]]:
    with _connect() as conn:
        rows = conn.execute(
            "SELECT * FROM observations ORDER BY id DESC"
        ).fetchall()
        return [dict(row) for row in rows]
