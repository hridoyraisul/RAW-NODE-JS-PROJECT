const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

const app = {};

// data.create('testingDir','testfile', {'name': 'BD','lang': 'bengali'},(err) => {
//     console.log(`error => `,err);
// });

// data.read('testingDir','testfile', (err, data) => {
//     console.log(err, data);
// });

// data.update('testingDir','testfile', {'name': 'Pak','lang': 'urdu'},(err) => {
//     console.log(`error => `,err);
// });

// data.delete('testingDir','testfile', (err) => {
//     console.log(err);
// });

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,() => {
        console.log(`Running on port ${environment.port} in ${environment.envName}`);
    });
}

app.handleReqRes = handleReqRes

app.createServer();