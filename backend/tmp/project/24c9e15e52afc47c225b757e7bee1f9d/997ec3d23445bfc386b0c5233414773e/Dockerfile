FROM node:18.17.1-alpine
WORKDIR /app
COPY package.json /app
#COPY package-lock.json /app
RUN npm install
COPY . /app
EXPOSE 3001
CMD ["npm", "start"]