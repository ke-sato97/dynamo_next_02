import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoClient } from "@/libs/client"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await DynamoClient();
    const input: any = {
      TableName: "cli-table",
      Item: {
        id: {
          S: "10"
        },
        name: {
          S: "手須戸 吾郎"
        },
        created_at: {
          S: "2025-01-01T00:00:00Z"
        }
      }
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    console.log("✅ データ取得:", response);
    return NextResponse.json(response);
  } catch(error) {
    console.log('error', error);
    return NextResponse.json(error);
  }
};
