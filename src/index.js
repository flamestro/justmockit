const express = require('express')
const app = express()
let bodyParser = require('body-parser');
const {mockResolverMiddleware} = require("./mockResolverMiddleware");

app.use(bodyParser.json());
app.use(bodyParser.text());

const port = process.env.API_PORT

app.use(mockResolverMiddleware)

app.listen(port, () => {
    console.log('Server running');
});