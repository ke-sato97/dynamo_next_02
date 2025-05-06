import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { config } from "dotenv";
export async function DynamoClient() {
  config();
  console.log('envファイルの内様', process.env.DYNAMODB_ENDPOINT);
  console.log('envファイルの内様', process.env.AWS_ACCESS_KEY_ID);
  console.log('envファイルの内様', process.env.AWS_SECRET_ACCESS_KEY);
  const client = new DynamoDBClient({
    region: "ap-northeast-1",
    endpoint: process.env.DYNAMODB_ENDPOINT || undefined, 
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}