const handler = {};

handler.notFoundHandler = (statusCode, callback) => {
    callback(404,{
        message: 'Invalid Request!'
    });
}

module.exports = handler;