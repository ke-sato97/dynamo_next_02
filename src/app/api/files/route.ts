import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { NextResponse } from "next/server";
import sample from "@/app/api/files/files.json";  // JSONファイルをインポート
import { DynamoClient } from "@/libs/client"

export async function GET() {
  try {
    const client = await DynamoClient();
    // JSONファイルの読み込み

    const files = sample.files;
    console.log('files', files);

    // DynamoDBへの書き込み処理を非同期で実行
    const putPromises = Object.entries(files).map(async ([fileId, fileData]) => {
      const item = marshall({
        file_id: fileId,                // 必須のパーティションキー "file_id"
        user_id: fileData.user,         // 必須のソートキー "user_id"
        comment_count: fileData.comment_count, // コメント数
        created_at: new Date(fileData.created).toISOString(),  // 作成日時（ISO形式に変換）
        filename_small: fileData.filename_small,  // 小さいサムネイル画像のファイル名
        filesize: fileData.filesize,           // ファイルサイズ
        ref: fileData.ref,                    // ファイルの参照URL
        thumbnail_murl: fileData.thumbnail_murl,  // ミニサムネイルのURL
        thumbnail_ref: fileData.thumbnail_ref,  // サムネイルの参照URL
        thumbnail_surl: fileData.thumbnail_surl,  // サムネイルの小URL
        thumbnail_url: fileData.thumbnail_url,  // サムネイルのフルURL
        type: fileData.type,                  // ファイルタイプ（例: "photo"）
        url: fileData.url,                    // ファイルのURL
        videoDuration: fileData.videoDuration,  // 動画の再生時間（0の場合も）
        videoURL: fileData.videoURL,            // 動画のURL（動画タイプのみ）
      });
      
      const command = new PutItemCommand({
        TableName: 'files',  // テーブル名を適切に変更
        Item: item,
      });

      await client.send(command);  // データをDynamoDBに送信
    });

    // すべての書き込み処理が完了するのを待つ
    await Promise.all(putPromises);

    return NextResponse.json({ message: 'DynamoDBに保存しました。', count: Object.keys(files).length });
  } catch (error) {
    console.error('保存エラー:', error);
    return NextResponse.json({ error: '保存に失敗しました。' }, { status: 500 });
  }
}
