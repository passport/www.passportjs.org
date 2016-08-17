FROM mhart/alpine-node:4.2.2


RUN apk add --update make gcc g++ git python

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000
