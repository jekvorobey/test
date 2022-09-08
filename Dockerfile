FROM registry.ibt.ru:5050/node:16.13.2-ibt-front-npm AS yarn
#FROM git.yiilab.com:5050/ibt.studio/ci-templates/node:12.18.3-yarn AS yarn
WORKDIR /var/www/html

COPY ./html ./

RUN set NODE_OPTIONS=--max-old-space-size=4096
RUN apk add --no-cache libjpeg-turbo-dev jpeg-dev libpng-dev tiff-dev giflib-dev
RUN rm -rf node_modules/cwebp-bin
RUN yarn cache clean && yarn install --check-files --frozen-lockfile --link-duplicates
RUN yarn rebuild

EXPOSE 8080
CMD ["yarn", "start"]
