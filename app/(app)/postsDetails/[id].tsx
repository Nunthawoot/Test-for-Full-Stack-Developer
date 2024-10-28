"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Post } from "@/helpers/types";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
          );
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          setPost(data);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h1>{post.post_title}</h1>
      <p>{post.post_content}</p>
      <span>By: {post.user_username}</span>
      <span>Category: {post.post_category}</span>
      <span>Comments: {post.comments.length}</span>
    </div>
  );
};

export default PostDetail;
