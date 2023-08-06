export interface Category {
    id: number;
    name: string;
    color: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    text: string;
    completed: boolean;
    categoryId?: number; // categoryId является опциональным
  }