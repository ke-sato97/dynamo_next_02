import { NextResponse } from "next/server";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoClient } from "@/libs/client";

type ResponseData = {
  test: string;
  command: string;
};

export async function GET() {
  try {
    const client = await DynamoClient();
    console.log('GET request to endpoint processed');

      const command = new GetItemCommand({
        TableName: "cli-table",
        Key: {
          id: { S: "1" },
        },
      });
      const data = await client.send(command);
      console.log("✅ データ取得:", data.Item);
      return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing GET request:', error);
    
    return NextResponse.json(
      { error: "Failed to process data request" },
      { status: 500 }
    );
  }
}