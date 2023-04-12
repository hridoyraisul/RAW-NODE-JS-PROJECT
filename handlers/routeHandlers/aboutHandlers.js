const handler = {};

handler.aboutHandler = (statusCode, callback) => {
    callback(200,{
        message: 'About Routes data'
    });
}

module.exports = handler;