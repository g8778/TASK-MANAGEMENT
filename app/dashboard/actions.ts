"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function createTask(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: (formData.get("due_date") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    user_id: user.id,
  }

  const { error } = await supabase.from("tasks").insert([taskData])

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateTask(id: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: (formData.get("due_date") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("tasks").update(taskData).eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function toggleTaskComplete(id: string, completed: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("tasks")
    .update({ completed, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const categoryData = {
    name: formData.get("name") as string,
    color: formData.get("color") as string,
    user_id: user.id,
  }

  const { error } = await supabase.from("categories").insert([categoryData])

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}
