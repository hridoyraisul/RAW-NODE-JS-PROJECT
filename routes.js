const {aboutHandler} = require('./handlers/routeHandlers/aboutHandlers')
const {notFoundHandler} = require('./handlers/routeHandlers/notFoundHandler');

const routes = {
    about: aboutHandler
}

module.exports = routes;