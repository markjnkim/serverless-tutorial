"use strict";

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');
// console.log('Loading function');

// const doc = require('dynamodb-doc');

// const dynamo = new doc.DynamoDB();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.hello = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  console.log(event);
  // const done = (err, res) => callback(null, {
  //     statusCode: err ? '400' : '200',
  //     body: err ? err.message : JSON.stringify(res),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // });

  switch (event.httpMethod) {
    case "DELETE":
      // dynamo.deleteItem(JSON.parse(event.body), done);
      deleteItem(event, callback);
      break;
    case "GET":
      // dynamo.scan({ TableName: event.queryStringParameters.TableName }, done;
      getItem(event, callback);
      break;
    case "POST":
      // dynamo.putItem(JSON.parse(event.body), done);
      saveItem(event, callback);
      break;
    case "PUT":
      // dynamo.updateItem(JSON.parse(event.body), done);
      updateItem(event, callback);
      break;
    default:
      // done(new Error(`Unsupported method "${event.httpMethod}"`));
      sendResponse(200, `UNSUPPORTED METHOD "${event.httpMethod}"`, callback);
  }
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode,
    body: JSON.stringify(message),
  }
  callback(null, response);
}

function saveItem(event, callback) {
  const item = JSON.parse(event.body);

  item.itemId = uuidv1();

  databaseManager.saveItem(item).then(response => {
    console.log(response);
    sendResponse(200, item.itemId, callback)
  });
}

function getItem(event, callback) {
  const itemId = event.pathParameters.itemId;

  databaseManager.getItem(itemId).then(response => {
    console.log(response);
    sendResponse(200, JSON.stringify(response), callback);
  });
}