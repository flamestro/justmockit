const mocks = require("../assets/mocks.json");
const util = require("util");

const mockPriority = (mock) => {
    if (mock.req.query) return 0;
    return 1;
}

const prioritySortMocks = (mockA, mockB) => {
    if (mockPriority(mockA) < mockPriority(mockB)) {
        return -1;
    }
    if (mockPriority(mockA) > mockPriority(mockB)) {
        return 1;
    }
    return 0;
}

const mockResolverMiddleware = (req, res) => {
    const sortedMocks = mocks.sort(prioritySortMocks)

    const doesMockFitRequest = (request, mock) => {
        const isHttpMethodEqual = request.method.toUpperCase() === mock.req.method.toUpperCase();
        const isPathEqual = request.path === mock.req.path;
        const isQueryEqual = util.isDeepStrictEqual(req.query, mock.req.query);
        return isHttpMethodEqual && isPathEqual && (isQueryEqual || !mock.req.query || !req.query);
    }

    for (let mock of sortedMocks) {
        if (doesMockFitRequest(req, mock)) {
            let outgoingMessage = res.status(mock.res.status)
            if (mock.res.headers) {
                for (let headerKey of Object.keys(mock.res.headers)) {
                    let headerObj = {}
                    headerObj[headerKey] = mock.res.headers[headerKey]
                    outgoingMessage.header(headerObj)
                }
            }
            outgoingMessage.header({"content-type": "application/json"}).send(mock.res.body)
            return;
        }
    }

    res.status(404).send();
}

module.exports = {mockResolverMiddleware}