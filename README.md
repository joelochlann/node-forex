# node-forex
Algorithmic trading in a browser.

This is an attempt to do some algorithmic trading with nothing but JavaScript. (See [Atwood's Law](http://blog.codinghorror.com/the-principle-of-least-power/)). Fake price data (based on a combination of two sine waves) is fed from node.js to the browser via WebSockets (using socket.io). The browser updates a price graph as the data comes in, and trader objects in the browser use different algorithms to decide when to buy or sell based on the incoming data.

This is the outcome of a hackathon under extreme time pressure. The code is in need of a lot of cleaning up and refactoring.

## Demo
http://guarded-tundra-1962.herokuapp.com

## Technologies
node.js, socket.io, Bootstrap, Handlebars, Less, Highcharts

## Installation
`npm install`

## Getting started
`node index.js` will serve up the application on port 5000
