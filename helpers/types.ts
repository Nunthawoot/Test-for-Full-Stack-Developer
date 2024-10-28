export type LoginFormType = {
  usename: string;
};

export type Post = {
  post_id: number; // ID ของโพสต์
  post_owner: number; // ID ของเจ้าของโพสต์
  post_create_date: string; // วันที่สร้างโพสต์ในรูปแบบ ISO 8601
  post_category: string; // หมวดหมู่ของโพสต์
  post_title: string; // ชื่อเรื่องของโพสต์
  post_content: string; // เนื้อหาของโพสต์
  user_username: string; // ชื่อผู้ใช้ของเจ้าของโพสต์
  comments: string[]; // คอมเมนต์ที่เกี่ยวข้องกับโพสต์
};

export type Comments = {
  postId: string;
  comment: string;
  owner: string;
  id: string;
};

export type User = {
  name: string;
  id: string;
};
