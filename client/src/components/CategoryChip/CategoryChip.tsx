import React from "react";
import { Category } from "../../types/types";
import deleteMiniIcon from "../../assets/icons/delete-mini.svg";
import { Chip } from "./CategoryChip.styled";

interface CategoryChipProps {
  category: Category;
  handleRemoveCategory: (categoryId: number) => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category, handleRemoveCategory }) => {
  return (
    <Chip style={{ borderColor: category.color }}>
      {category.name}
      <button onClick={() => handleRemoveCategory(category.id)}>
        <img src={deleteMiniIcon} alt="Delete Icon" />
      </button>
    </Chip>
  );
};

export default React.memo(CategoryChip);
