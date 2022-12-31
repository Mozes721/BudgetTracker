FROM node:12.18.3

LABEL description="This is the base docker image for the frontend react app."

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install
RUN npm audit fix


COPY . .

EXPOSE 5000

CMD ["npm", "start"]