const express = require('express')
const cors = require('cors')
const lowDb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')
const { nanoid } = require('nanoid')

const db = lowDb(new FileSync('db.json'))
db.defaults({}).write()
const app = express()
app.use(cors())
app.use(bodyParser.json())

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const path = require('path');
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });

const port = process.env.PORT || 3000;

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/quotes/:category': '/quotes?category=:category',
    '/billing/card/:type': '/billing?card_type=:type'
}))

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        const note = req.body
        db.get('notes').push({
            ...note, id: nanoid()
        }).write()
        res.json({ success: true })
    }
    // Continue to JSON Server router
    next()
})

server.use(router);
server.listen(port);