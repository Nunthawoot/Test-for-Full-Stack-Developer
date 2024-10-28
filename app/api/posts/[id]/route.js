import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/database/config"; // นำเข้า MySQL pool ของคุณ

export async function GET(request, { params }) {
  const { id } = params; // ดึง id จาก params
  const promisePool = mysqlPool.promise();

  try {
    // Query เพื่อดึงโพสต์ตาม ID
    const [post] = await promisePool.query(
      `
      SELECT p.ID AS post_id, 
             p.OWNER AS post_owner, 
             p.CREATE_DATE AS post_create_date, 
             p.CATEGORY AS post_category, 
             p.TITLE AS post_title, 
             p.CONTENT AS post_content, 
             u.USERNAME AS user_username
      FROM posts p
      LEFT JOIN users u ON p.OWNER = u.ID
      WHERE p.ID = ?
      `,
      [id]
    );

    if (post.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Query เพื่อดึงคอมเมนต์สำหรับโพสต์นี้
    const [comments] = await promisePool.query(
      `
      SELECT c.COMMENT_TEXT
      FROM comments c
      WHERE c.POST_ID = ?
      `,
      [id]
    );

    // สร้างผลลัพธ์สุดท้ายรวมโพสต์และคอมเมนต์
    const result = {
      ...post[0],
      comments: comments.map((comment) => comment.COMMENT_TEXT),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
