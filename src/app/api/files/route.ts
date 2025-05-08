import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { DynamoClient } from "@/libs/client"; 
import { NextResponse } from "next/server";
import sample from "@/app/api/files/files.json"
// import { TopLevel } from "./types";

export async function GET() {
  try {
    const today = new Date();
    console.log(today);
    console.log(sample);
  //   const client = await DynamoClient();
  //   const albumKeys = Object.keys(sample.Album)
  //   const validAlbumId = albumKeys.find(key => key !== 'undefined')
  //   const insertData: any = {
  //     albumId: "string",
  //     albumCount: sample.AlbumCount,
  //     album: sample.Album,
  //   };

  //   if (validAlbumId) {
  //     insertData.albumId = validAlbumId;
  //   } else {
  //     insertData.albumId = "test001";
  //   }
  //   const command = new PutItemCommand({
  //     TableName: "Albums", 
  //     Item: marshall(sample, {
  //       removeUndefinedValues: true,
  //       convertClassInstanceToMap: true
  //     })
  //   });

  //   console.log('sample', sample);
  //   const response = await client.send(command);
  //   return NextResponse.json(response);
  // } catch(error) {
  //   const returnData = {
  //     sample: sample,
  //     today: today,
  //     error: error
  //   }
  //   console.log('error', error);
    return NextResponse.json(sample);
  } catch(error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
