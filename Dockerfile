FROM node:16.14
EXPOSE 8080

WORKDIR /code
COPY . /code/

RUN npm run build

CMD npm run serve
