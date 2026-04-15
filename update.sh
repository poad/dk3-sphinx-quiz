#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

result=$(cd "${CURRENT}" || exit)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(git pull --prune)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi
echo ""
pwd

# result=$(npx -y pnpm@latest self-update && pnpm install && pnpm up && pnpm audit --fix && pnpm up && pnpm lint-fix && pnpm clean && rm -rf dist && pnpm build && pnpm package && git add .)
result=$(npx -y pnpm@latest self-update && pnpm install && pnpm up && pnpm up && pnpm lint-fix && pnpm clean && rm -rf dist && pnpm build && pnpm package && git add .)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

cd "${CURRENT}" || exit
result=$?
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi
git commit -am "Bumps node modules" && git push
result=$?
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

cd "${CUR}" || exit
