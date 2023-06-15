# syntax=docker/dockerfile:1
FROM node:16-alpine

ENV REACT_APP_SERVER_API_URL=https://voicejournal-server.onrender.com
WORKDIR /app/
COPY . .
RUN npm ci
CMD ["npm", "run", "start"]
EXPOSE 3001
