#!/usr/bin/env python3
"""Normalize Directus slugs. Use --dry-run first; --apply changes production data."""
from __future__ import annotations
import argparse, json, os, re, unicodedata, urllib.parse, urllib.request
from collections import defaultdict

BASE = os.getenv('DIRECTUS_URL', 'http://localhost:8056').rstrip('/')
EMAIL = os.getenv('DIRECTUS_ADMIN_EMAIL', '')
PASSWORD = os.getenv('DIRECTUS_ADMIN_PASSWORD', '')
RU = str.maketrans(dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', 'abvgdeyozhziyklmnoprstufkhc chshshchyeyuya'.replace(' ','')) ))
# Explicit table keeps the policy readable; Ukrainian markers use DSTU system B.
RU.update(str.maketrans({'ж':'zh','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ю':'yu','я':'ya','й':'y','ы':'y','ё':'yo','ь':'','ъ':''}))
UK = str.maketrans({'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ye','ж':'zh','з':'z','и':'y','і':'i','ї':'yi','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia'})
DE = str.maketrans({'ä':'ae','ö':'oe','ü':'ue','ß':'ss'})
SKIP_SONG_IDS = {'168', '487'}

def slugify(value: str) -> str:
    s = value.strip().lower()
    if re.search('[äöüß]', s): s = s.translate(DE)
    elif re.search('[іїєґ]', s): s = s.translate(UK)
    else: s = s.translate(RU)
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode()
    return re.sub('-+', '-', re.sub('[^a-z0-9]+', '-', s)).strip('-')

def request(method, path, token, body=None):
    req=urllib.request.Request(BASE+path, data=json.dumps(body,ensure_ascii=False).encode() if body is not None else None, headers={'Content-Type':'application/json','Authorization':f'Bearer {token}'}, method=method)
    with urllib.request.urlopen(req) as response: return json.load(response)['data']

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--apply', action='store_true'); args=parser.parse_args()
    auth=request('POST','/auth/login',None,{'email':EMAIL,'password':PASSWORD}); token=auth['access_token']
    artists=request('GET','/items/artists?fields=id,slug,name&limit=-1',token)
    artist_names={str(x['id']):x['slug'] for x in artists}
    plans=[]
    for collection,title_field,extra in [('artists','name',{}),('albums','title',{'fields':'id,artist,slug,title,year'}),('songs','title',{'fields':'id,artist,slug,title'}),('galleries','title',{'fields':'id,artist,slug,title'})]:
        if collection=='artists': rows=artists
        else:
            params={'limit':'-1',**extra}; rows=request('GET',f'/items/{collection}?{urllib.parse.urlencode(params)}',token)
        used=defaultdict(set)
        for row in rows:
            current=str(row.get('slug','')); rid=str(row['id'])
            if collection=='songs' and rid in SKIP_SONG_IDS: continue
            scope='global' if collection=='artists' else str(row.get('artist'))
            candidate=slugify(str(row.get(title_field,''))) or current or f'item-{rid}'
            # Keep current value when already suitable and free in its scope.
            if candidate != current and candidate in used[scope]: candidate=f'{candidate}-{row.get("year", rid)}'
            used[scope].add(current)
            used[scope].add(candidate)
            if candidate != current: plans.append((collection,rid,current,candidate))
    for collection,rid,current,candidate in plans:
        print(f'{collection}/{rid}: {current} -> {candidate}')
        if args.apply: request('PATCH',f'/items/{collection}/{rid}',token,{'slug':candidate})
    print(f'changes: {len(plans)}; mode: {"apply" if args.apply else "dry-run"}')

if __name__=='__main__': main()
