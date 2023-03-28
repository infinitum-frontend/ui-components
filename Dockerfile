FROM node:16-alpine3.16 as build
WORKDIR /app
COPY . .
RUN npm install --ignore-scripts
RUN npm run build-storybook

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
RUN echo "types { application/javascript js mjs; }" > /etc/nginx/conf.d/mjs.conf
VOLUME /usr/share/nginx/html
EXPOSE 8080
