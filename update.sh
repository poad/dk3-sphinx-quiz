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

if ! (rm -rf node_modules && npx -y pnpm@latest self-update && pnpm install && pnpm up && pnpm audit --fix override && pnpm up && pnpm lint-fix && pnpm clean && rm -rf dist && pnpm build && git add .); then
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
