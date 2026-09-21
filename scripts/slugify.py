#!/usr/bin/env python3
"""Deterministic Nebuloud slug policy for titles and future Directus hooks."""
from __future__ import annotations

import re
import sys
import unicodedata

# Russian, Ukrainian, and Belarusian letters. German umlauts use the readable
# ae/oe/ue form instead of silently dropping the diacritic.
TRANSLIT = str.maketrans({
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
    "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
    "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
    "і": "i", "ї": "yi", "є": "ye", "ґ": "g",
    "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss",
})


def slugify(value: str) -> str:
    value = value.strip().lower().translate(TRANSLIT)
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value)).strip("-")


if __name__ == "__main__":
    print(slugify(" ".join(sys.argv[1:])))
