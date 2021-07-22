const express = require('express')
const app = express()

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.use((req, res) => {
    res.status(200).header({"content-type": "application/json", "method": req.method}).send(req.body)
})

app.listen(8080, () => {
    console.log('Server running');
});