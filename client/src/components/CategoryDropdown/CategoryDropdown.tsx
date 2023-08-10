import React from "react";
import { Task, Category } from "../../../../server/src/types/types";
import { CategoryBlock, Dropdown, DropdownInput, DropdownItem } from "./CategoryDropdown,styled";
import { fetchTaskCategories, addCategoryToTask } from "../../http/apiTasks";

interface CategoryDropdownProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  categories: Category[];
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  editingCategories: boolean;
  handleRemoveCategory: (categoryId: number) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  task,
  setTasks,
  categories,
  selectedCategories,
  setSelectedCategories,
  editingCategories,
  handleRemoveCategory,
}) => {
  const handleCategoryToggle = (categoryId: number) => {
    if (selectedCategories.some((category) => category.id === categoryId)) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId));
      handleRemoveCategory(categoryId);
    } else {
      const selectedCategory = categories.find((c) => c.id === categoryId);
      if (selectedCategory) {
        setSelectedCategories([...selectedCategories, selectedCategory]);
        handleAddCategory(selectedCategory.id);
      }
    }
  };

  async function handleAddCategory(categoryId: number) {
    try {
      await addCategoryToTask(task.id, categoryId);
      // Обновляем данные категорий для задачи после добавления
      const updatedCategories = await fetchTaskCategories(task.id);
      // Обновляем состояние задачи на клиенте
      const updatedTask = {
        ...task,
        categories: updatedCategories, // Обновляем категории в состоянии задачи
      };
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)));
      setSelectedCategories(updatedCategories);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }
  return editingCategories ? (
    <CategoryBlock>
      {categories.map((category) => (
        <Dropdown key={category.id}>
          <DropdownItem>
            <DropdownInput
              type="checkbox"
              checked={selectedCategories.some((c) => c.id === category.id)}
              onChange={() => handleCategoryToggle(category.id)}
            />
            {category.name}
          </DropdownItem>
        </Dropdown>
      ))}
    </CategoryBlock>
  ) : null;
};

export default CategoryDropdown;
