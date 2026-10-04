#!/usr/bin/env bash
# Klaim subdomain <nama>.vercel.app untuk project portfolio via API Vercel.
# Pemakaian: ./claim-vercel-subdomain.sh <nama1> [nama2] [nama3] ...
set -uo pipefail

TOKEN="$(cat /home/z/my-project/.zscripts/vt)"
PROJ="prj_uupA2P8rc8lldjZwzKXV7WeYCxSo"
OLD="portfolio-one-gamma-sgfz0n8ka7.vercel.app"
RESP="/home/z/my-project/.zscripts/last-resp.json"

if [ $# -lt 1 ]; then
  echo "usage: $0 <nama1> [nama2] ..."
  exit 1
fi

CLAIMED=""
for n in "$@"; do
  code=$(curl -s -o "$RESP" -w "%{http_code}" -X POST \
    "https://api.vercel.com/v9/projects/$PROJ/domains" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$n.vercel.app\"}")
  errcode=$(python3 -c "
import json,sys
try:
    d=json.load(open('$RESP'))
    print(d.get('error',{}).get('code','OK'))
except Exception:
    print('PARSE_FAIL')
")
  echo "$n.vercel.app -> HTTP $code [$errcode]"
  if [ "$code" = "200" ] || [ "$code" = "201" ]; then
    CLAIMED="$n.vercel.app"
    echo ">>> BERHASIL DIKLAIM: $CLAIMED"
    break
  fi
done

if [ -z "$CLAIMED" ]; then
  echo "Tidak ada nama yang berhasil diklaim."
  exit 2
fi

# Set redirect: URL lama yang panjang -> subdomain baru yang pendek (308 permanen)
echo ""
echo "--- Set redirect $OLD -> $CLAIMED ---"
rcode=$(curl -s -o "$RESP" -w "%{http_code}" -X PATCH \
  "https://api.vercel.com/v9/projects/$PROJ/domains/$OLD" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"redirect\":\"$CLAIMED\",\"redirectStatusCode\":308}")
echo "redirect PATCH -> HTTP $rcode $(head -c 200 "$RESP")"

# Daftar domain project
echo ""
echo "--- Daftar domain project ---"
curl -s "https://api.vercel.com/v9/projects/$PROJ/domains" \
  -H "Authorization: Bearer $TOKEN" > "$RESP"
python3 -c "
import json
d = json.load(open('$RESP'))
for dm in d.get('domains', []):
    print(' -', dm.get('name'), '| redirect:', dm.get('redirect'))
"

# Smoke test
echo ""
echo "--- Smoke test ---"
sleep 3
for u in "https://$CLAIMED" "https://$OLD"; do
  sc=$(curl -s -o /dev/null -w "%{http_code} redirect=%{redirect_url}" "$u")
  echo "$u -> $sc"
done

echo "CLAIMED=$CLAIMED"
