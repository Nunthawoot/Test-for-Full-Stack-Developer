import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface SelectCategoryProps {
  onSelect?: (value: string) => void;
}

export const SelectCategory = ({ onSelect }: SelectCategoryProps) => {
  const [value, setValue] = useState<string>("");

  const categories = [
    { key: "history", label: "History" },
    { key: "food", label: "Food" },
    { key: "pets", label: "Pets" },
    { key: "health", label: "Health" },
    { key: "fashion", label: "Fashion" },
    { key: "exercise", label: "Exercise" },
    { key: "others", label: "Others" },
  ];

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onSelect && onSelect(e.target.value);
  };

  return (
    <div>
      <Select
        placeholder="Select a category"
        className="min-w-[128px] max-w-[128px]"
        onChange={handleSelectionChange}
      >
        {categories.map((category) => (
          <SelectItem key={category.key} value={category.key}>
            {category.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
