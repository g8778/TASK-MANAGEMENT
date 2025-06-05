"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push("/dashboard")
      } else {
        router.push("/auth/login")
      }
    }

    checkUser()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl flex flex-col items-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  )
}