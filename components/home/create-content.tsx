import { SelectCategory } from "@/components/home/select-category";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

export const CreateContent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handlePost = async () => {
    if (!title || !content || !category) {
      alert("กรุณากรอกข้อมูลให้ครบทุกฟิลด์");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: 1,
          category,
          title,
          content,
        }),
      }
    );

    if (response.ok) {
      setTitle("");
      setContent("");
      setCategory("");
      onOpenChange();
      alert("โพสต์ถูกสร้างสำเร็จ!");
    } else {
      alert("เกิดข้อผิดพลาดในการสร้างโพสต์");
    }
  };

  return (
    <div>
      <Button onPress={onOpen} className="bg-success text-white">
        Create +
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-1/2 w-1/2"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Post
              </ModalHeader>
              <ModalBody>
                <SelectCategory
                  onSelect={(selectedCategory) => setCategory(selectedCategory)}
                />
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="What's on your mind..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  className="border border-success text-success"
                >
                  Cancel
                </Button>
                <Button onPress={handlePost} className="bg-success text-white">
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
