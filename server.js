const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);