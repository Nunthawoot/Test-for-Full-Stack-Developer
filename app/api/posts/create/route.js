import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/database/config";

export async function POST(request) {
  const promisePool = mysqlPool.promise();

  try {
    const { owner, category, title, content } = await request.json();

    if (!owner || !category || !title || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const [result] = await promisePool.query(
      `
      INSERT INTO posts (OWNER, CREATE_DATE, CATEGORY, TITLE, CONTENT)
      VALUES (?, NOW(), ?, ?, ?)
    `,
      [owner, category, title, content]
    );

    

    const newPost = {
      ID: result.insertId,
      OWNER: owner,
      CREATE_DATE: new Date().toISOString(),
      CATEGORY: category,
      TITLE: title,
      CONTENT: content,
    };

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
