FROM registry.gz.cvte.cn/library/node:8.9.3

#指定工作目录为/app，并切换到/app目录，以下所有操作都是基于/app目录
WORKDIR /app

COPY ./app /app/app
COPY ./build /app/build
COPY ./config /app/config
COPY ./node_modules /app/node_modules
COPY ./package.json /app

#指定启动命令
CMD npm run server
