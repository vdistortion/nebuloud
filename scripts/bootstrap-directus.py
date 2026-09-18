#!/usr/bin/env python3
"""Create the minimal Nebuloud content model in a local Directus instance.

The script is intentionally idempotent: existing collections and fields are kept.
It creates the content shape first; relations and permissions are a later step.
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

RELATIONS = [
    ("albums", "artist", "artists", "albums"),
    ("songs", "artist", "artists", "songs"),
    ("galleries", "artist", "artists", "galleries"),
    ("album_songs", "album", "albums", "songs"),
    ("album_songs", "song", "songs", "albums"),
    ("gallery_images", "gallery", "galleries", "images"),
    ("streaming_links", "artist", "artists", "streaming_links"),
    ("streaming_links", "album", "albums", "streaming_links"),
    ("streaming_links", "song", "songs", "streaming_links"),
]

COLLECTIONS = {
    "artists": {
        "icon": "music_note",
        "fields": [
            ("slug", "string", {"interface": "input", "required": True}, {"is_unique": True}),
            ("name", "string", {"interface": "input", "required": True}, {}),
            ("image", "uuid", {"interface": "file"}, {}),
            ("country", "json", {"interface": "input-code", "options": {"language": "json"}}, {}),
            ("description", "text", {"interface": "input-rich-text-md"}, {}),
        ],
    },
    "albums": {
        "icon": "album",
        "fields": [
            ("artist", "integer", {"interface": "input"}, {}),
            ("slug", "string", {"interface": "input", "required": True}, {}),
            ("title", "string", {"interface": "input", "required": True}, {}),
            ("year", "integer", {"interface": "input"}, {}),
            ("cover", "uuid", {"interface": "file"}, {}),
            ("description", "text", {"interface": "input-rich-text-md"}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
    "songs": {
        "icon": "lyrics",
        "fields": [
            ("artist", "integer", {"interface": "input"}, {}),
            ("slug", "string", {"interface": "input", "required": True}, {}),
            ("title", "string", {"interface": "input", "required": True}, {}),
            ("aliases", "json", {"interface": "input-code", "options": {"language": "json"}}, {}),
            ("lyrics", "text", {"interface": "input-rich-text-md"}, {}),
            ("authors", "string", {"interface": "input"}, {}),
            ("video_url", "string", {"interface": "input"}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
    "galleries": {
        "icon": "photo_library",
        "fields": [
            ("artist", "integer", {"interface": "input"}, {}),
            ("slug", "string", {"interface": "input", "required": True}, {}),
            ("title", "string", {"interface": "input", "required": True}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
    "album_songs": {
        "icon": "queue_music",
        "fields": [
            ("album", "integer", {"interface": "input"}, {}),
            ("song", "integer", {"interface": "input"}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
    "gallery_images": {
        "icon": "image",
        "fields": [
            ("gallery", "integer", {"interface": "input"}, {}),
            ("image", "uuid", {"interface": "file", "required": True}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
    "streaming_links": {
        "icon": "link",
        "fields": [
            ("artist", "integer", {"interface": "input"}, {}),
            ("album", "integer", {"interface": "input"}, {}),
            ("song", "integer", {"interface": "input"}, {}),
            ("service", "string", {"interface": "input", "required": True}, {}),
            ("url", "string", {"interface": "input", "required": True}, {}),
            ("sort", "integer", {"interface": "input"}, {"default_value": 0}),
        ],
    },
}


def request(method: str, path: str, token: str | None = None, body: dict | None = None):
    data = json.dumps(body).encode() if body is not None else None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(f"{BASE_URL}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        payload = error.read().decode()
        if error.code == 404:
            return error.code, None
        raise RuntimeError(f"{method} {path} failed ({error.code}): {payload}") from error


def main() -> int:
    _, auth = request("POST", "/auth/login", body={"email": EMAIL, "password": PASSWORD})
    token = auth["data"]["access_token"]
    _, existing = request("GET", "/collections", token)
    collection_names = {item["collection"] for item in existing["data"]}

    for name, config in COLLECTIONS.items():
        if name not in collection_names:
            request(
                "POST",
                "/collections",
                token,
                {
                    "collection": name,
                    "meta": {"icon": config["icon"], "note": "Nebuloud content"},
                    "schema": {},
                },
            )
            print(f"created collection: {name}")
        else:
            print(f"exists collection: {name}")

        _, fields = request("GET", f"/fields/{name}", token)
        field_names = {field["field"] for field in fields["data"]}
        for field, field_type, meta, schema in config["fields"]:
            if field in field_names:
                continue
            request(
                "POST",
                f"/fields/{name}",
                token,
                {"field": field, "type": field_type, "meta": meta, "schema": schema},
            )
            print(f"  created field: {name}.{field}")

    _, relation_response = request("GET", "/relations", token)
    existing_relations = {
        (relation["collection"], relation["field"], relation["related_collection"])
        for relation in relation_response["data"]
    }
    for collection, field, related_collection, one_field in RELATIONS:
        key = (collection, field, related_collection)
        if key in existing_relations:
            print(f"exists relation: {collection}.{field} -> {related_collection}")
            continue
        request(
            "POST",
            "/relations",
            token,
            {
                "collection": collection,
                "field": field,
                "related_collection": related_collection,
                "meta": {"one_field": one_field},
                "schema": {"on_delete": "SET NULL", "on_update": "NO ACTION"},
            },
        )
        print(f"created relation: {collection}.{field} -> {related_collection}")

    print("Nebuloud Directus content model is ready.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
