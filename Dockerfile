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
# CMD ["echo", "Dockerfile is now valid but not running the app."]


# Bắt đầu từ image Node.js
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy các file package và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Mở port 8000
EXPOSE 8000

# Lệnh CMD để khởi động ứng dụng
CMD ["node", "dist/src/main.js"]
