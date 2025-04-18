// netlify/functions/log.js

exports.handler = async (event, context) => {
    // event.body will be the JSON payload you send
    console.log('Client log:', event.body);
    return {
        statusCode: 200,
        body: JSON.stringify({ status: 'ok' }),
    };
};