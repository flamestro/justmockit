const express = require('express')
const app = express()
const mocks = require('./mocks.json')
const util = require("util");
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());


app.use((req, res) => {
    const determinePriorityOfMock = (mock) => {
        if(mock.req.query) return 0;
        return 1;
    }

    const mocksSortedByPriority = mocks.sort((mockA, mockB) => {
        if(determinePriorityOfMock(mockA) < determinePriorityOfMock(mockB)){
            return -1;
        }
        if(determinePriorityOfMock(mockA) > determinePriorityOfMock(mockB)){
            return 1;
        }
        return 0;
    })

    const checkIfMockFitsRequest = (request, mock) => {
        return request.method.toUpperCase() === mock.req.method.toUpperCase()
            && request.path === mock.req.path
            && (util.isDeepStrictEqual(req.query, mock.req.query) || !mock.req.query || !req.query);
    }
    console.log(`length ${mocksSortedByPriority.length}`)

    for (let mock of mocksSortedByPriority) {
        if (checkIfMockFitsRequest(req, mock)) {
            let response = res.status(mock.res.status)
            for(let headerKey of Object.keys(mock.res.headers)) {
                let headerObj = {}
                headerObj[headerKey] = mock.res.headers[headerKey]
                response.header(headerObj)
            }
            response.header({"content-type": "application/json"}).send(mock.res.body)
                return;
        }
    }

    // else echo
    res.status(200).header({"content-type": "application/json", "method": req.method}).send(req.body)
})

app.listen(8080, () => {
    console.log('Server running');
});