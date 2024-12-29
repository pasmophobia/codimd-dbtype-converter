FROM node:20.17.0

# Create app directory
COPY . /app
WORKDIR /app

# Install app dependencies
RUN npm install

CMD ["npm", "start"]