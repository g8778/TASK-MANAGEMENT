export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  due_date?: string
  category_id?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  color: string
  user_id: string
  created_at: string
}
