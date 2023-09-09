const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });

const port = process.env.PORT || 3000;

server.use(middlewares);

server.use(jsonServer.rewriter({
    '/quotes/:id': '/quotes?id=:id',
    '/quotes/:category': '/quotes?category=:category',
    '/products/:id': '/products?id=:id',
    '/products/:category': '/products?category=:category'
}))

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

server.use(router);
server.listen(port);