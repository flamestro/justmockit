const express = require('express')
const app = express()
const mocks = require('./mocks.json')
const util = require("util");
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());


app.use((req, res) => {
    // check if response should be mocked

    // check query parameters
    for (let mock of mocks) {
        if (req.method.toUpperCase() === mock.method.toUpperCase() && req.path === mock.path) {
            if (mock.query && req.query && util.isDeepStrictEqual(req.query, mock.query)) {
                res.status(mock.res.status).header({"content-type": "application/json"}).send(mock.res.body)
                return;
            }
        }
    }

    // check without parameters TODO: simplify duplicated code
    for (let mock of mocks) {
        if (req.method.toUpperCase() === mock.method.toUpperCase() && req.path === mock.path) {
                res.status(mock.res.status).header({"content-type": "application/json"}).send(mock.res.body)
                return
        }
    }

    // else echo
    res.status(200).header({"content-type": "application/json", "method": req.method}).send(req.body)
})

app.listen(8080, () => {
    console.log('Server running');
});