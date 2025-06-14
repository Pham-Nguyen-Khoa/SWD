# FROM node:18-alpine
# # Cài đặt bash
# RUN apk add --no-cache bash

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate

# RUN npm run build

# COPY docker-entrypoint.sh .
# RUN chmod +x docker-entrypoint.sh

# EXPOSE 8000

# ENTRYPOINT ["./docker-entrypoint.sh"]
# CMD ["node", "dist/src/main.js"]
