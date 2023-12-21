git pull
rm -Rf node-modules
rm -Rf .next
yarn
yarn build

pm2 restart angels-fe
