'use strict'

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'myHelloTable';

module.exports.initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

module.exports.saveItem = item => {
  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item.itemId;
    });
};

module.exports.getItem = itemId => {
  const params = {
    
  }
}
