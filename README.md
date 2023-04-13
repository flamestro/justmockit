# Just Mock It!

Sometimes you come across situations in which you need to use an 
api that is either not ready yet or does not behave in an expected way on local.

In that case you can **just mock it**!

---------

# How to Start Up the Server
1. Install NodeJs v18 or above
2. Install dependencies by doing `yarn`
3. Run the project with `yarn start`

Your application will start up on `http://localhost:8085`.

If you want to change the port to a different one, you can change it  
in the `package.json` by adjusting `"start": "API_PORT=8085 node src/index.js",`

# Add Mocks
You can add mocks in `/assets/mocks.json`.

You can specify a req (Request) that should be mocked and a res (Response) that should be returned.

Currently only these fields are supported:

Request:
- method
- path
- query

Response:
- status
- body
- headers

# Mock Prioritization
Your requests will be mocked based on this prioritization:
1. A mock with an equal query exists.
2. The order of the mocks in `/assets/mocks.json`
