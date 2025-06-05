import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = cookies()
  
  // Temporary hardcoded values - REMOVE BEFORE PRODUCTION!
  const supabaseUrl = "https://ooycyirsqxjxtgikjkbm.supabase.co"
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9veWN5aXJzcXhqeHRnaWtqa2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzkzMTAsImV4cCI6MjA2NDcxNTMxMH0.dq7dwa_c2SciLzJ8UjjUexV9tP0o91Ef_VXu6zinknA"

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}