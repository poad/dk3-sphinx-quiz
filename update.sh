#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

if ! (cd "${CURRENT}" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git pull --prune); then
  cd "${CUR}" || exit
  exit 1
fi
echo ""
pwd

if ! (disable-checkout-persist-credentials && pnx pnpm@latest self-update && pnpm install -r --no-frozen-lockfile && pnpm up -r && pnpm audit --fix override && pnpm up -r && pnpm --if-present lint-fix && pnpm build && pnpm install --no-frozen-lockfile); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (cd "${CURRENT}" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git commit -am "Bumps node modules" && git push); then
  cd "${CUR}" || exit
  exit 1
fi

cd "${CUR}" || exit
