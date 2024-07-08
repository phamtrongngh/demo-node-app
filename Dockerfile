FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

RUN rm -rf src/

CMD ["node", "dist/index.js"]