FROM node:20-alpine AS build
WORKDIR /app

# Vite inlines env vars at build time, so the CMS URL has to be known here rather than
# at container start. Pass it with:
#   docker build --build-arg VITE_STRAPI_URL=https://cms.example.de .
ARG VITE_STRAPI_URL=""
ARG VITE_STRAPI_API_TOKEN=""
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL
ENV VITE_STRAPI_API_TOKEN=$VITE_STRAPI_API_TOKEN

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
