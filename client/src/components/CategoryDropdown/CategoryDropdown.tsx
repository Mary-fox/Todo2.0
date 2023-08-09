import React from "react";
import { Category } from "../../../../server/src/types/types";

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategories: Category[];
  editingCategories: boolean;
  handleCategoryToggle: (categoryId: number) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategories,
  editingCategories,
  handleCategoryToggle,
}) => {
  return editingCategories ? (
    <div className="category-dialog">
      {categories.map((category) => (
        <div key={category.id} className={`category-dropdown ${editingCategories ? "open" : ""}`}>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.some((c) => c.id === category.id)}
              onChange={() => handleCategoryToggle(category.id)}
            />
            {category.name}
          </label>
        </div>
      ))}
    </div>
  ) : null;
};

export default CategoryDropdown;
