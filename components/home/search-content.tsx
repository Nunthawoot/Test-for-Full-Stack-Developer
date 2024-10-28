import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SelectCategory } from "@/components/home/select-category";
import { CreateContent } from "@/components/home/create-content";

export const SearchContent = () => {
  return (
    <div className=" flex gap-x-[20px]">
      <Input placeholder="Search" variant="flat" />
      <div className=" flex gap-x-[10px]">
        <SelectCategory  />
        <CreateContent />
      </div>
    </div>
  );
};
