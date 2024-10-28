import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Post } from "@/helpers/types";
import { MessageCircle02 } from "@/components/icons/icons";

type CardPostProps = {
  post?: Post;
  index: number;
  lastindex: number;
};

export const CardPost = ({ post, index, lastindex }: CardPostProps) => {
  return (
    <Card
      isPressable
      onPress={() => {console.log("item pressed")}}
      className={`bg-white p-5 min-h-[200px] w-full border-b cursor-pointer ${
        index === 0
          ? "rounded-t-lg"
          : index === lastindex
          ? "rounded-b-lg"
          : "rounded-none"
      }`}
      radius="none"
    >
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className=" h-[30px] w-[30px]"
          />
          <span className=" text-sm font-medium text-gray-300">
            {post?.user_username}
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <span className=" px-2 text-gray-300">{post?.post_category}</span>
        <span className=" font-semibold text-base">{post?.post_title}</span>
        <span className="line-clamp-2">{post?.post_content}</span>
      </CardBody>
      <CardFooter className="flex gap-x-[5px]">
        <MessageCircle02 size={16} />
        <span className=" text-gray-300">{post?.comments.length} Comments</span>
      </CardFooter>
    </Card>
  );
};
