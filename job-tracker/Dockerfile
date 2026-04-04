FROM node:22 AS build

WORKDIR /app

# Copy only dependency files first
COPY package.json package-lock.json ./

RUN npm install

# Copy rest of the project
COPY . .

# This creates production files like (/app/dist)
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]