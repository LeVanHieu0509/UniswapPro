# Install dependencies only when needed
# FROM vnnonprdregistry.azurecr.io/rhel9/nodejs-18-minimal:latest AS deps
FROM node:18-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat

WORKDIR /opt/app-root/src
COPY package.json ./
COPY yarn.lock ./
COPY .env ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# COPY next-i18next.config.js ./
# COPY .babelrc ./
COPY tsconfig.json ./
RUN npm -v

RUN yarn config set strict-ssl false -g
RUN npm cache clean --force
RUN yarn install 
#--frozen-lockfile

# Rebuild the source code only when needed
# FROM vnnonprdregistry.azurecr.io/rhel9/nodejs-18-minimal:latest AS builder
FROM node:18-alpine AS builder
WORKDIR /opt/app-root/src

#copy everything from current folder to WORKDIR
COPY . .
COPY --from=deps /opt/app-root/src/node_modules ./node_modules

RUN yarn build

# Production image, copy all the files and run next
# FROM vnnonprdregistry.azurecr.io/rhel9/nodejs-18-minimal:latest AS runner
FROM node:18-alpine AS runner

USER root
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
USER 1001

WORKDIR /opt/app-root/src

ENV NODE_ENV production
ENV API_ENDPOINT https://tap-hoa-api.levanhieu.click/v1/api


#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

#COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# You only need to copy next.config.js if you are NOT using the default configuration

COPY --from=builder /opt/app-root/src/public ./public
COPY --from=builder /opt/app-root/src/.next ./.next
COPY --from=builder /opt/app-root/src/node_modules ./node_modules
COPY --from=builder /opt/app-root/src/package.json ./package.json
COPY --from=builder /opt/app-root/src/next.config.js ./
COPY --from=builder /opt/app-root/src/postcss.config.js ./
COPY --from=builder /opt/app-root/src/tailwind.config.js ./

# COPY --from=builder /opt/app-root/src/next-i18next.config.js ./
# COPY --from=builder /opt/app-root/src/yarn.lock ./yarn.lock
# COPY --from=builder /opt/app-root/src/.env ./
# COPY --from=builder /opt/app-root/src/.babelrc ./.babelrc
# COPY --from=builder /opt/app-root/src/tsconfig.json ./tsconfig.json
# COPY --from=builder /opt/app-root/src/version.json ./version.json
# COPY --from=builder /opt/app-root/src/.eslintrc.json ./.eslintrc.json
# COPY --from=builder /opt/app-root/src/.eslintignore ./.eslintignore
# COPY --from=builder /opt/app-root/src/.prettierignore ./.prettierignore
# COPY --from=builder /opt/app-root/src/.prettierrc ./.prettierrc
# COPY --from=builder /opt/app-root/src/src ./src

#USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
