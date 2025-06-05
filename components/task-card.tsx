"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2 } from "lucide-react"
import { TaskForm } from "./task-form"
import type { Task, Category } from "@/lib/types"

interface TaskCardProps {
  task: Task
  categories: Category[]
  onUpdate: () => void
}

export function TaskCard({ task, categories, onUpdate }: TaskCardProps) {
  const supabase = createClient()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggleComplete = async () => {
    if (isToggling) return
    setIsToggling(true)
    try {
      const { error } = await supabase
        .from("tasks")
        .update({
          completed: !task.completed,
          updated_at: new Date().toISOString(),
        })
        .eq("id", task.id)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error("Error toggling task:", error)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true)
      try {
        const { error } = await supabase.from("tasks").delete().eq("id", task.id)

        if (error) throw error
        onUpdate()
      } catch (error) {
        console.error("Error deleting task:", error)
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const taskCategory = categories.find((c) => c.id === task.category_id)
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed

  if (isEditing) {
    return <TaskForm task={task} categories={categories} onClose={() => setIsEditing(false)} onSuccess={onUpdate} />
  }

  return (
    <Card
      className={`transition-all ${task.completed ? "opacity-60" : ""} ${isOverdue ? "border-red-200 bg-red-50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
            disabled={isToggling}
          />

          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>

            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>{task.description}</p>
            )}

            <div className="flex items-center gap-2 mt-2">
              {taskCategory && (
                <Badge variant="secondary" className="text-xs">
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: taskCategory.color }} />
                  {taskCategory.name}
                </Badge>
              )}

              {task.due_date && (
                <Badge variant={isOverdue ? "destructive" : "outline"} className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(task.due_date)}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
