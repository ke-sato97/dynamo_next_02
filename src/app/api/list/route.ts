import { NextResponse } from "next/server";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { client } from "@/lib/client";

export async function GET() {
  try {
    const command = new ListTablesCommand({});
    const data = await client.send(command);
    return NextResponse.json({ tables: data.TableNames ?? [] });
  } catch (error) {
    console.error("Error listing tables:", error);
    return NextResponse.json(
      { error: "Failed to list DynamoDB tables" },
      { status: 500 }
    );
  }
}