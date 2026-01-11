SERVER="root@91.151.16.155"
PASSWORD="UeRRn6xe73h3dkS"
REMOTE_DIR="/home/espana-hoy-admin"
NODE_PATH="/root/.nvm/versions/node/v23.10.0/bin/node"
NPM_PATH="/root/.nvm/versions/node/v23.10.0/bin/npm"
PM2_PATH="/root/.nvm/versions/node/v23.10.0/bin/pm2"

echo "[DEV] Удаляю старые версии..."
rm -rf .next build/node_modules.tar.gz build/.next build/node_modules build/public build/package.json build/package-lock.json build/ecosystem.config.js build/next.config.js

echo "[DEV] Собираю новый билд..."
npm run build

echo "[DEV] Копирую новый билд..."
cp -r .next build/.next

echo "[DEV] Копирую ассеты..."
cp -r public build/public

echo "[DEV] Копирую новую конфигурацию..."
cp package.json build
cp package-lock.json build
cp ecosystem.config.js build
cp next.config.js build

echo "[СЕРВЕР] Удаляю старые данные на сервере..."
sshpass -p "$PASSWORD" ssh $SERVER -o StrictHostKeyChecking=no "rm -rf $REMOTE_DIR"

echo "[СЕРВЕР] Отправляю данные на сервер..."
sshpass -p "$PASSWORD" scp -prq "$PWD/build" $SERVER:$REMOTE_DIR

echo "[СЕРВЕР] Устанавливаю зависимости на сервере..."
sshpass -p "$PASSWORD" ssh $SERVER -o StrictHostKeyChecking=no "cd $REMOTE_DIR && $NPM_PATH i -f"

echo "[СЕРВЕР] Перезапускаю сервер..."
sshpass -p "$PASSWORD" ssh $SERVER -o StrictHostKeyChecking=no "cd $REMOTE_DIR && $NODE_PATH $PM2_PATH reload ecosystem.config.js"
