FROM mhart/alpine-node:15 as ffmpeg-base

RUN  apk add --no-cache ffmpeg

FROM ffmpeg-base 

WORKDIR /app
COPY package.json ./package.json
RUN npm install --production

COPY /src/ /app/src/

EXPOSE 1488 7000
# ENV PORT=1488 LOGDIR=/storage/LOGS DATADIR=/storage/DATA LENGTHSEC=1800

CMD node --inspect=0.0.0.0:7000  ./src/server.js