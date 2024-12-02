FROM node:13.12.0-alpine

# Setting working directory. All paths relative to workdir
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Intial Dependiencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# Copy source siles
Copy . ./

EXPOSE 4000

# Run the application
CMD ["npm", "start"]
