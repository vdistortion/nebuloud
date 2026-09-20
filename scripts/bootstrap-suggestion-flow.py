#!/usr/bin/env python3
"""Create/update the content suggestion webhook flow in Directus.

Secrets are read from environment variables and are never written to the repo.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

BASE_URL = os.getenv("DIRECTUS_URL", "http://localhost:8056").rstrip("/")
EMAIL = os.getenv("DIRECTUS_ADMIN_EMAIL", "admin@nebuloud.dev")
PASSWORD = os.getenv("DIRECTUS_ADMIN_PASSWORD", "change-this-admin-password")
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
FLOW_NAME = "Content suggestions intake"
CREATE_KEY = "create_content_suggestion"
NOTIFY_KEY = "notify_content_suggestion"


def request(method: str, path: str, token: str | None = None, body: dict | None = None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    data = json.dumps(body, ensure_ascii=False).encode() if body is not None else None
    req = urllib.request.Request(f"{BASE_URL}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"{method} {path} failed ({error.code}): {error.read().decode()}") from error


def find(token: str, collection: str, query: dict[str, str]):
    params = urllib.parse.urlencode(query)
    _, response = request("GET", f"/{collection}?{params}", token)
    return response["data"]


def main() -> int:
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        raise RuntimeError("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required")

    _, auth = request("POST", "/auth/login", body={"email": EMAIL, "password": PASSWORD})
    token = auth["data"]["access_token"]
    _, flow_response = request("GET", "/flows?limit=-1", token)
    flow = next((item for item in flow_response["data"] if item["name"] == FLOW_NAME), None)

    flow_payload = {
        "name": FLOW_NAME,
        "icon": "feedback",
        "status": "active",
        "trigger": "webhook",
        "accountability": "$full",
        "options": {"method": "POST", "async": False, "return": "$last"},
    }
    if flow is None:
        _, response = request("POST", "/flows", token, flow_payload)
        flow = response["data"]
    else:
        _, response = request("PATCH", f"/flows/{flow['id']}", token, flow_payload)
        flow = response["data"]

    _, operations_response = request("GET", f"/operations?filter[flow][_eq]={flow['id']}&limit=-1", token)
    operations = operations_response["data"]
    create = next((item for item in operations if item["key"] == CREATE_KEY), None)
    notify = next((item for item in operations if item["key"] == NOTIFY_KEY), None)

    fields = [
        "kind", "artist_slug", "song_slug", "song_title", "page_url",
        "current_lyrics", "proposed_lyrics", "comment", "source_url", "contact",
    ]
    payload = {field: f"{{$trigger.body.{field}}}" for field in fields}
    create_options = {
        "collection": "content_suggestions",
        "permissions": "$full",
        "emitEvents": False,
        "payload": payload,
    }
    create_payload = {
        "name": "Create content suggestion",
        "key": CREATE_KEY,
        "type": "item-create",
        "position_x": 1,
        "position_y": 1,
        "options": create_options,
        "flow": flow["id"],
    }
    if create is None:
        _, response = request("POST", "/operations", token, create_payload)
        create = response["data"]
    else:
        _, response = request("PATCH", f"/operations/{create['id']}", token, create_payload)
        create = response["data"]

    message = (
        "📝 Новое предложение по тексту\n\n"
        "Артист: {{$trigger.body.artist_slug}}\n"
        "Песня: {{$trigger.body.song_title}}\n"
        "Тип: {{$trigger.body.kind}}\n\n"
        "Ссылка: {{$trigger.body.page_url}}\n\n"
        "Комментарий: {{$trigger.body.comment}}\n\n"
        "Предложенный текст:\n{{$trigger.body.proposed_lyrics}}"
    )
    notify_options = {
        "method": "POST",
        "url": f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        "headers": [{"header": "Content-Type", "value": "application/json"}],
        "body": {"chat_id": TELEGRAM_CHAT_ID, "text": message},
    }
    notify_payload = {
        "name": "Notify content suggestion",
        "key": NOTIFY_KEY,
        "type": "request",
        "position_x": 2,
        "position_y": 1,
        "options": notify_options,
        "flow": flow["id"],
    }
    if notify is None:
        _, response = request("POST", "/operations", token, notify_payload)
        notify = response["data"]
    else:
        _, response = request("PATCH", f"/operations/{notify['id']}", token, notify_payload)
        notify = response["data"]

    request("PATCH", f"/operations/{create['id']}", token, {"resolve": notify["id"]})
    request("PATCH", f"/flows/{flow['id']}", token, {"operation": create["id"]})
    print(f"Suggestion flow ready: {BASE_URL}/flows/trigger/{flow['id']}")
    return 0


if __name__ == "__main__":
    try:
        import urllib.parse
        sys.exit(main())
    except Exception as error:
        print(error, file=sys.stderr)
        sys.exit(1)
