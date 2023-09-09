const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });

const port = process.env.PORT || 3000;

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/quotes/:category': '/quotes?category=:category'
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