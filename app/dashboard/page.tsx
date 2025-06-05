"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Task, Category } from "@/lib/types"
import { Plus, LogOut, Trash2, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState({ title: "", description: "", category_id: "" })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setUser(user)
    await fetchData()
    setLoading(false)
  }

  const fetchData = async () => {
    await Promise.all([fetchTasks(), fetchCategories()])
  }

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tasks:", error)
    } else {
      setTasks(data || [])
    }
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("Error fetching categories:", error)
    } else {
      setCategories(data || [])
      console.log("Fetched categories:", data)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert([
      {
        title: newTask.title,
        description: newTask.description || null,
        category_id: newTask.category_id || null,
        user_id: user?.id,
      },
    ]);

    if (error) {
      console.error("Error creating task:", error);
    } else {
      setNewTask({ title: "", description: "", category_id: "" });
      fetchTasks();
    }
  };

  const toggleTaskComplete = async (task: Task) => {
    const { error } = await supabase.from("tasks").update({ completed: !task.completed }).eq("id", task.id)

    if (error) {
      console.error("Error updating task:", error)
    } else {
      fetchTasks()
    }
  }

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) {
      console.error("Error deleting task:", error)
    } else {
      fetchTasks()
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <header className="backdrop-blur bg-white/80 shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Create Task Form */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6" /> Create New Task
          </h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
                required
                placeholder="Task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
                rows={2}
                placeholder="Task description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newTask.category_id}
                onChange={(e) => setNewTask({ ...newTask, category_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">No Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow hover:scale-105 transition-transform font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Your Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks yet. Create your first task above!</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => {
                const category = categories.find((c) => c.id === task.category_id)

                return (
                  <li
                    key={task.id}
                    className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:bg-blue-50 transition"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleTaskComplete(task)}
                        className={`mt-1 rounded-full border-2 ${
                          task.completed
                            ? "border-green-400 bg-green-100"
                            : "border-gray-300 bg-white"
                        } w-6 h-6 flex items-center justify-center transition`}
                        title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {task.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </button>
                      <div className="flex-1">
                        <h3 className={`font-medium text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        {category && (
                          <span
                            className="inline-block text-xs px-2 py-1 mt-2 rounded-full"
                            style={{
                              backgroundColor: category.color + "20",
                              color: category.color,
                            }}
                          >
                            {category.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="ml-4 text-red-500 hover:text-red-700 p-2 rounded-full transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}