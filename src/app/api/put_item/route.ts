import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { client } from "@/lib/client"; 
import { NextResponse } from "next/server";

export async function GET() {
  // const command = new PutCommand({
  //   TableName: "gui-table",
  //   Item: {
  //     "id": "3",
  //     "created_at": "2024-01-01T00:00:00Z"
  //   },
  // });
  try {
    const input: any = {
      TableName: "gui-table",
      Item: {
        id: {
          S: "3"
        },
        name: {
          S: "佐藤 圭太"
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
