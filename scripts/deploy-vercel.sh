#!/usr/bin/env bash
# ============================================================
# DEPLOY OTOMATIS PORTFOLIO KE VERCEL
# Pemakaian: ./scripts/deploy-vercel.sh "<VERCEL_TOKEN>" "<NEON_DATABASE_URL>"
# Semua langkah (link project, env var, deploy, smoke test) otomatis.
# ============================================================
set -euo pipefail

TOKEN="${1:?Butuh VERCEL_TOKEN}"
DATABASE_URL="${2:?Butuh NEON_DATABASE_URL}"
PROJECT="portfolio"

step() { echo -e "\n\033[1;32m==> $1\033[0m"; }

step "1/5 Link project '$PROJECT' ke akun Vercel"
vercel link --yes --project "$PROJECT" --token "$TOKEN"

step "2/5 Set environment variable DATABASE_URL (production)"
# Hapus env lama bila ada (abaikan error), lalu tambahkan yang baru
echo "$DATABASE_URL" | vercel env add DATABASE_URL production --token "$TOKEN" 2>/dev/null || \
  { vercel env rm DATABASE_URL production --yes --token "$TOKEN" 2>/dev/null || true; \
    echo "$DATABASE_URL" | vercel env add DATABASE_URL production --token "$TOKEN"; }

step "3/5 Deploy ke production (build berjalan di Vercel + tabel DB dibuat otomatis)"
DEPLOY_URL=$(vercel --prod --token "$TOKEN" | tail -1)
echo "URL deployment: $DEPLOY_URL"

step "4/5 Smoke test website live"
sleep 5
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DEPLOY_URL#https://}")
echo "Homepage: HTTP $HTTP_CODE"
VIEWS=$(curl -s -X POST "https://${DEPLOY_URL#https://}/api/visits" | head -c 100)
echo "API kunjungan: $VIEWS"
GB=$(curl -s -X POST "https://${DEPLOY_URL#https://}/api/guestbook" \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Bot","message":"Website berhasil dideploy ke Vercel! 🚀"}' | head -c 120)
echo "API buku tamu: $GB"

step "5/5 Selesai!"
echo "✅ Portfolio live di: $DEPLOY_URL"
