FROM node:14

WORKDIR /var/www/app

COPY . .

RUN npm install

EXPOSE 3000

# CMD [ "npm", "run", "start:prod" ]
CMD [ "npm", "run", "dev" ]
