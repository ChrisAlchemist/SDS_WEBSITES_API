FROM node:12  

WORKDIR /crm-orange-ws

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3020

CMD ["npm","run","start:sandbox"]

#===================    heroku  =====================
# heroku login
# docker ps
# heroku container:login
# heroku container:push web -a cash-oip-ws
# heroku container:release web -a cash-oip-ws
# heroku restart -a  cash-oip-ws