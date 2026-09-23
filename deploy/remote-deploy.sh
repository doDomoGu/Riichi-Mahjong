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

# nginx：本项目只维护自己的路由片段，由 dodomogu.conf 统一 include
mkdir -p /etc/nginx/conf.d/dodomogu.d
cp deploy/mahjong.conf /etc/nginx/conf.d/dodomogu.d/mahjong.conf

# 一次性迁移：hanabi-domain.conf 是拆分前的合并配置，与 dodomogu.conf
# 定义了同一个 server_name，两者共存会互相冲突（后者被忽略，/hanabi/ 静默失效）。
# 确认 dodomogu.conf 已在位后再移除，避免拆分没做完就把整站打挂。
if [ -f /etc/nginx/conf.d/dodomogu.conf ]; then
  rm -f /etc/nginx/conf.d/hanabi-domain.conf
else
  echo "提醒：/etc/nginx/conf.d/dodomogu.conf 尚未就位，暂不移除 hanabi-domain.conf。"
fi

systemctl daemon-reload
systemctl enable mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service
systemctl restart mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service
nginx -t
nginx -s reload
systemctl --no-pager --full status mahjong-home.service mahjong-wind.service mahjong-score-practice.service mahjong-gateway.service | /usr/bin/grep -E '●|Active:'
