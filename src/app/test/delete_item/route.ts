import { NextResponse } from "next/server";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoClient } from "@/libs/client";

export async function GET() {
  try {
    const client = await DynamoClient();
    console.log('GET request to endpoint processed');

      const command = new DeleteCommand({
        TableName: "gui-table",
        Key: {
          id: "1",
          name: "icck"
        }
      });
      const response = await client.send(command);
      console.log("✅ データ取得:", response);
      return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing GET request:', error);
    
    return NextResponse.json(
      { error: "Failed to process data request" },
      { status: 500 }
    );
  }
}