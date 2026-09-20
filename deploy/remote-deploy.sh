#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/opt/riichi-mahjong
NEW_DIR=/opt/riichi-mahjong.new
OLD_DIR=/opt/riichi-mahjong.old

rm -rf "$NEW_DIR"
mkdir -p "$NEW_DIR"
tar -xzf /tmp/riichi-mahjong-deploy.tgz -C "$NEW_DIR"
rm -f /tmp/riichi-mahjong-deploy.tgz

if [ -d "$APP_DIR/wind/data" ]; then
  cp -a "$APP_DIR/wind/data" "$NEW_DIR/wind/data"
fi
if [ -d "$APP_DIR/score-practice/question-history" ]; then
  cp -a "$APP_DIR/score-practice/question-history" "$NEW_DIR/score-practice/question-history"
fi

rm -rf "$OLD_DIR"
if [ -d "$APP_DIR" ]; then
  mv "$APP_DIR" "$OLD_DIR"
fi
mv "$NEW_DIR" "$APP_DIR"

cd "$APP_DIR"
npm install --registry=https://registry.npmjs.org
cd wind
npm install --registry=https://registry.npmjs.org
npm install --no-save @rollup/rollup-linux-x64-gnu@4.63.3 --registry=https://registry.npmjs.org
npm run build
cd "$APP_DIR"

cp deploy/mahjong-home.service /etc/systemd/system/mahjong-home.service
cp deploy/mahjong-wind.service /etc/systemd/system/mahjong-wind.service
cp deploy/mahjong-score-practice.service /etc/systemd/system/mahjong-score-practice.service
cp deploy/mahjong-gateway.service /etc/systemd/system/mahjong-gateway.service
cp deploy/hanabi-domain.conf /etc/nginx/conf.d/hanabi-domain.conf

systemctl daemon-reload
systemctl enable mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service
systemctl restart mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service
nginx -t
nginx -s reload
systemctl --no-pager --full status mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service | /usr/bin/grep -E '●|Active:'
