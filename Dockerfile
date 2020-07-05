FROM node:alpine
COPY server package.json . /blog_app/
WORKDIR /blog_app
RUN cd /blog_app && npm install --production
EXPOSE 3001
CMD ["node", "./server/app.ts"]