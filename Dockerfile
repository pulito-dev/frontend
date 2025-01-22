FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . /app

EXPOSE 5173

RUN npm run prepare

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]