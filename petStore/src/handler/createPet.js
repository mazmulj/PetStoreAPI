'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createPet = (event, context, callback) =>{
    // const data = JSON.parse(event.body);
    console.log(event)

    const params = {
        TableName: 'petTable',
        Item: {
            id: event.id,
            category: {
                id: event.category.id,
                name: event.category.name
            },
            name: event.name,
            photoUrls: event.photoUrls,
            // tags: {
            //     id: event.tags.id,
            //     name: event.tags.name
            // },
            status: event.status
        }
    };
    dynamoDB.put(params, (error, event) =>{
        if(error){
            console.log(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(event.Item)
        };

        callback(null, response);
    });
}