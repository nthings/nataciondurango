FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm update @types/express-serve-static-core --depth 2 && npm update @types/serve-static --depth 2 && npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE 8000
CMD ["npm", "start"]