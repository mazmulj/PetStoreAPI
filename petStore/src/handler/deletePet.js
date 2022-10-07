'use strict'

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.deletePet = (event, context, callback) =>{
    const petId = parseInt(event.pathParameters.id);

    const params = {
        TableName: 'petTable',
        Key: {
            id: petId
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
            body: JSON.stringify({"message" : "Pet not found"})
        };

        callback(null, response);
    });
}