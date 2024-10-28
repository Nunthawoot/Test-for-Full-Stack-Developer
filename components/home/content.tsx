"use client";

import { useEffect, useState } from "react";
import { CardPost } from "../Post/card-post";
import { Post } from "@/helpers/types";
import { SearchContent } from "@/components/home/search-content";

export const Content = () => {
  const [isPost, setIsPost] = useState<Post[] | null>(null);

  const fetchPostData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
      const data = await res.json();
      setIsPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div className="w-full space-y-6">
      <SearchContent />
      <div>
        {isPost ? (
          isPost.map((post, index) => (
            <CardPost
              key={post.post_id}
              post={post}
              index={index}
              lastindex={isPost.length - 1}
            /> // ส่ง post ไปยัง child component
          ))
        ) : (
          <p>Loading posts...</p> // แสดงข้อความขณะโหลดโพสต์
        )}
      </div>
    </div>
  );
};
