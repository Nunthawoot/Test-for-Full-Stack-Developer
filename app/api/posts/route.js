import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/database/config";

export async function GET(request) {
  const promisePool = mysqlPool.promise();

  try {
    const [posts] = await promisePool.query(`
      SELECT p.ID AS post_id, 
             p.OWNER AS post_owner, 
             p.CREATE_DATE AS post_create_date, 
             p.CATEGORY AS post_category, 
             p.TITLE AS post_title, 
             p.CONTENT AS post_content, 
             u.USERNAME AS user_username
      FROM posts p
      LEFT JOIN users u ON p.OWNER = u.ID
    `);

    const postIds = posts.map((post) => post.post_id);
    const [comments] = await promisePool.query(
      `
      SELECT c.POST_ID, c.COMMENT_TEXT
      FROM comments c
      WHERE c.POST_ID IN (?)
    `,
      [postIds]
    );

    const commentsByPostId = comments.reduce((acc, comment) => {
      if (!acc[comment.POST_ID]) {
        acc[comment.POST_ID] = [];
      }
      acc[comment.POST_ID].push(comment.COMMENT_TEXT);
      return acc;
    }, {});

    const result = posts.map((post) => ({
      ...post,
      comments: commentsByPostId[post.post_id] || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
