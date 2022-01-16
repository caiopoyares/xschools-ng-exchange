FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json app/package-lock.json
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist/ng_exchange_school /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
