'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createOrder = (event, context, callback) =>{
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'order',
        Item: {
            id: data.id,
            petId: data.petId,
            quantity: data.quantity,
            shipDate: data.shipDate,
            status: data.status,
            complete: data.complete
        }
    };
    dynamoDB.put(params, (error, data) =>{
        if(error){
            console.log(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}