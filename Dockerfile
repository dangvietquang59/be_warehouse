# Sử dụng image node chính thức
FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Cài đặt dependencies với Yarn
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Sao chép wait-for-it.sh vào trong container
COPY wait-for-it.sh /app/wait-for-it.sh

# Đảm bảo rằng wait-for-it.sh có quyền thực thi
RUN chmod +x /app/wait-for-it.sh

# Biên dịch ứng dụng TypeScript
RUN yarn build

# Mở cổng mà ứng dụng sử dụng
EXPOSE 5000

# Chạy ứng dụng NestJS
CMD ["yarn", "start:prod"]
