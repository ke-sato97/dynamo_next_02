import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://dynamodb:8000", // ローカルDynamoDB
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});
