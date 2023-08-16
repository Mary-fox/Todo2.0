import React from "react";
import { Task, Category } from "../../types/types";
import CategoryChip from "../CategoryChip/CategoryChip";
import cancelIcon from "../../assets/icons/cancel.svg";
import addIcon from "../../assets/icons/add.svg";
import { Chips } from "./CategoryChips.styled";

interface CategoryChipsProps {
  task: Task;
  selectedCategories: Category[];
  handleRemoveCategory: (categoryId: number) => void;
  editingCategories: boolean;
  toggleCategoryDropdown: (taskId: number) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  task,
  selectedCategories,
  handleRemoveCategory,
  editingCategories,
  toggleCategoryDropdown,
}) => {
  return (
    <Chips>
      {selectedCategories.map((category) => (
        <CategoryChip key={category.id} category={category} handleRemoveCategory={handleRemoveCategory} />
      ))}
      <button onClick={() => toggleCategoryDropdown(task.id)}>
        {editingCategories ? (
          <img src={cancelIcon} alt="Cancle Icon" />
        ) : (
          <img src={addIcon} alt="Add Icon" />
        )}
      </button>
    </Chips>
  );
};

export default React.memo(CategoryChips);
