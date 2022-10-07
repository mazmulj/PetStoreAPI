'use strict'

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.deleteOrder = (event, context, callback) =>{

    const params = {
        TableName: 'order',
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamoDB.delete(params, (error, data) =>{
        if(error){
            console.log(error);
            callback(new Error(error));
            return;
        }

        const response = data.Item ? {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        }: {
            statusCode: 404,
            body: JSON.stringify({"message" : "Order not found"})
        };

        callback(null, response);
    });
}