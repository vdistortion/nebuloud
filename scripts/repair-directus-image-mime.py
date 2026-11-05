#!/usr/bin/env python3
"""Repair generic MIME metadata for image files already stored in Directus.

The script is a dry run by default. Pass --apply and --confirm-url to update
only files whose type is application/octet-stream and whose download filename
has a supported image extension.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

MIME_BY_EXTENSION = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
}
PAGE_SIZE = 200
BATCH_SIZE = 100


def load_env_file() -> dict[str, str]:
    """Read simple KEY=value entries without overriding the process environment."""
    env_path = Path(__file__).resolve().parent.parent / ".env"
    result: dict[str, str] = {}
    if not env_path.exists():
        return result

    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        result.setdefault(key.strip(), value)
    return result


def request(
    base_url: str,
    method: str,
    path: str,
    token: str | None = None,
    body: dict | None = None,
) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(f"{base_url}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            raw = response.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as error:
        details = error.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} failed ({error.code}): {details}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Could not reach Directus at {base_url}: {error.reason}") from error


def read_files(base_url: str) -> list[dict]:
    files = []
    offset = 0
    query = urllib.parse.urlencode(
        {"fields": "id,filename_download,type", "limit": PAGE_SIZE}
    )
    while True:
        page_query = f"{query}&offset={offset}"
        page = request(base_url, "GET", f"/files?{page_query}").get("data", [])
        files.extend(page)
        if len(page) < PAGE_SIZE:
            return files
        offset += PAGE_SIZE


def plan_updates(files: list[dict]) -> tuple[dict[str, list[str]], int]:
    updates: dict[str, list[str]] = defaultdict(list)
    skipped_generic = 0
    for file in files:
        if file.get("type") != "application/octet-stream":
            continue
        extension = Path(str(file.get("filename_download") or "")).suffix.lower()
        mime_type = MIME_BY_EXTENSION.get(extension)
        if mime_type:
            updates[mime_type].append(str(file["id"]))
        else:
            skipped_generic += 1
    return dict(updates), skipped_generic


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="apply the changes (without this flag, the script only previews them)",
    )
    parser.add_argument(
        "--confirm-url",
        help="required with --apply; must exactly match the Directus URL being changed",
    )
    args = parser.parse_args()

    file_env = load_env_file()
    base_url = (
        os.environ.get("DIRECTUS_URL")
        or file_env.get("DIRECTUS_URL")
        or "http://localhost:8056"
    ).rstrip("/")
    print(f"Directus target: {base_url}")

    files = read_files(base_url)
    updates, skipped_generic = plan_updates(files)
    total = sum(len(ids) for ids in updates.values())
    print(f"Files inspected: {len(files)}")
    if total == 0:
        print("No supported image files with application/octet-stream MIME type found.")
        if skipped_generic:
            print(f"Skipped generic-MIME files with unsupported extensions: {skipped_generic}")
        return 0

    print("Planned MIME updates:")
    for mime_type, ids in sorted(updates.items()):
        print(f"  {mime_type}: {len(ids)}")
    if skipped_generic:
        print(f"Skipped generic-MIME files with unsupported extensions: {skipped_generic}")

    if not args.apply:
        print("Dry run only; pass --apply and --confirm-url to make changes.")
        return 0

    if args.confirm_url != base_url:
        raise RuntimeError(
            "For safety, --apply requires --confirm-url to exactly match the target URL."
        )

    email = os.environ.get("DIRECTUS_ADMIN_EMAIL") or file_env.get("DIRECTUS_ADMIN_EMAIL")
    password = os.environ.get("DIRECTUS_ADMIN_PASSWORD") or file_env.get("DIRECTUS_ADMIN_PASSWORD")
    if not email or not password:
        raise RuntimeError("Set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD before applying.")

    auth = request(base_url, "POST", "/auth/login", body={"email": email, "password": password})
    token = auth["data"]["access_token"]
    changed = Counter()
    for mime_type, ids in sorted(updates.items()):
        for start in range(0, len(ids), BATCH_SIZE):
            batch = ids[start : start + BATCH_SIZE]
            result = request(
                base_url,
                "PATCH",
                "/files",
                token,
                {"keys": batch, "data": {"type": mime_type}},
            )
            updated_files = result.get("data", [])
            if len(updated_files) != len(batch):
                raise RuntimeError(
                    f"Directus updated {len(updated_files)} of {len(batch)} {mime_type} files."
                )
            changed[mime_type] += len(updated_files)

    print("Updated file metadata:")
    for mime_type, count in sorted(changed.items()):
        print(f"  {mime_type}: {count}")
    print("Done. Asset URLs are unchanged; Directus should now serve the correct image MIME type.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (KeyError, RuntimeError, urllib.error.URLError) as error:
        print(f"error: {error}", file=sys.stderr)
        sys.exit(1)
