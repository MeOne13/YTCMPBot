FROM mhart/alpine-node:15

# COPY setup-ffmpeg.sh setup-ffmpeg.sh
#RUN ./setup-ffmpeg.sh

WORKDIR /app
COPY package.json ./package.json
RUN npm install --production

# WORKDIR /app/src
COPY /src/ /app/src/

# VOLUME unwound:/DATA

EXPOSE 3000
# ENV LOGDIR=/storage/LOGS DATADIR=/storage/DATA LENGTHSEC=1800

CMD node --inspect=0.0.0.0 ./src/indexWebHook.js
# CMD /bin/bash