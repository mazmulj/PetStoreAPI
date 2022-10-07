'use strict'

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.findByStatus = (event, context, callback) =>{
    const statusParam = event.queryStringParameters.orderStatus;
    console.log(statusParam);
    const params = {
        TableName: 'petTable',
        FilterExpression: 'orderStatus = :orderStatus',
        ExpressionAttributeValues: {
            ":orderStatus": statusParam
        }
    };

    dynamoDB.scan(params, (error, data) =>{
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
            body: JSON.stringify({"message" : "Pet not found"})
        };

        callback(null, response);
    });
}