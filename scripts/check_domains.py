#!/usr/bin/env python3
"""Cek ketersediaan subdomain gratis: *.vercel.app (DoH), is-a.dev (registry GitHub), us.kg (DoH indikatif)."""
import json
import time
import urllib.request
import urllib.error

UA = {"User-Agent": "Mozilla/5.0 (domain-availability-check)"}


def doh(name: str, rtype: str = "A"):
    """Query DNS-over-HTTPS Google. Return (status, answers). Status 0=NOERROR, 3=NXDOMAIN."""
    url = f"https://dns.google/resolve?name={name}&type={rtype}"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=10) as r:
            d = json.load(r)
        answers = [a.get("data", "") for a in d.get("Answer", [])]
        return d.get("Status", -1), answers
    except Exception as e:
        return None, [repr(e)]


def is_a_dev_taken(name: str):
    """True=taken, False=available, None=unknown."""
    url = f"https://raw.githubusercontent.com/is-a-dev/register/main/domains/{name}.json"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        return None
    except Exception:
        return None


print("=== Kalibrasi DoH ===")
st, ans = doh("portfolio-one-gamma-sgfz0n8ka7.vercel.app")
print(f"domain kita (harus resolve)  : status={st} answer={ans[:1]}")
st, ans = doh("zxq-avail-test-9x2q-random.vercel.app")
print(f"nama acak (harus NXDOMAIN=3) : status={st}")

vercel_candidates = [
    "raka", "rakapratama", "raka-pratama", "rakap", "pratama",
    "raka-dev", "rakadev", "itsraka", "its-raka", "hey-raka",
    "byraka", "raka-works", "rakaworks", "raka-builds", "rakabuilds",
    "raka-site", "rakasite", "raka-web", "rakaweb", "rakaio", "raka-io",
    "rakaverse", "raka-zone", "porto-raka", "raka-porto", "raka-portfolio",
    "rakaportfolio", "rakaprofile", "raka-profile",
]

print("\n=== *.vercel.app ===")
free_vercel = []
for n in vercel_candidates:
    st, _ = doh(f"{n}.vercel.app")
    if st == 3:
        tag, free_vercel = "AVAILABLE", free_vercel + [n]
    elif st == 0:
        tag = "taken"
    else:
        tag = f"?status={st}"
    print(f"  {n}.vercel.app -> {tag}")
    time.sleep(0.15)

print(f"\n  >> Tersedia ({len(free_vercel)}): {', '.join(free_vercel) if free_vercel else '-'}")

print("\n=== is-a.dev (registry resmi) ===")
isad_candidates = ["raka", "rakapratama", "raka-pratama", "pratama", "itsraka",
                   "byraka", "raka-dev", "rakap", "hey-raka"]
free_isad = []
for n in isad_candidates:
    t = is_a_dev_taken(n)
    if t is False:
        tag, free_isad = "AVAILABLE", free_isad + [n]
    elif t is True:
        tag = "taken"
    else:
        tag = "?gagal cek"
    print(f"  {n}.is-a.dev -> {tag}")
    time.sleep(0.15)
print(f"\n  >> Tersedia ({len(free_isad)}): {', '.join(free_isad) if free_isad else '-'}")

print("\n=== us.kg / dpdns.org (indikatif via DNS) ===")
for n in ["raka", "rakapratama", "raka-pratama", "pratama"]:
    st, _ = doh(f"{n}.us.kg")
    tag = "kemungkinan tersedia" if st == 3 else ("taken/ada record" if st == 0 else f"?{st}")
    print(f"  {n}.us.kg -> {tag}")
    time.sleep(0.15)

print("\nSelesai.")
