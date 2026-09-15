"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { authClient } from "@/lib/auth-client"

type AuthFormProps = { mode: "sign-in" | "sign-up" }

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const isSignUp = mode === "sign-up"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get("email") ?? "").trim()
    const password = String(form.get("password") ?? "")
    const name = String(form.get("name") ?? "").trim()
    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error) {
      setError("تعذر إتمام العملية. تحقق من البيانات وحاول مرة أخرى.")
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#FFFDFB] px-4 py-12 text-[#2c2022]">
      <section className="mx-auto flex w-full max-w-md flex-col gap-8 rounded-[2rem] border border-[#eadbd4] bg-white p-7 shadow-[0_24px_80px_rgba(119,52,65,0.12)] sm:p-10">
        <div className="flex flex-col gap-3 text-center">
          <Link href="/" className="mx-auto flex items-center gap-2 text-sm font-bold text-[#773441]">
            <ArrowLeft data-icon="inline-start" /> العودة للمتجر
          </Link>
          <span className="text-4xl font-black tracking-[-0.08em] text-[#773441]">نُقطة</span>
          <h1 className="text-2xl font-black">{isSignUp ? "أنشئ حسابك" : "مرحباً بعودتك"}</h1>
          <p className="text-sm leading-7 text-[#725f62]">{isSignUp ? "احفظ طلباتك وعناوينك واستمتع بتجربة أسرع." : "سجل دخولك لمتابعة طلباتك والمفضلة."}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && <label className="flex flex-col gap-2 text-sm font-bold">الاسم الكامل<input name="name" required minLength={2} className="h-12 rounded-2xl border border-[#e5d4ce] bg-[#fffdfb] px-4 outline-none transition focus:border-[#773441]" /></label>}
          <label className="flex flex-col gap-2 text-sm font-bold">البريد الإلكتروني<input name="email" type="email" required autoComplete="email" className="h-12 rounded-2xl border border-[#e5d4ce] bg-[#fffdfb] px-4 outline-none transition focus:border-[#773441]" /></label>
          <label className="flex flex-col gap-2 text-sm font-bold">كلمة المرور<input name="password" type="password" required minLength={8} autoComplete={isSignUp ? "new-password" : "current-password"} className="h-12 rounded-2xl border border-[#e5d4ce] bg-[#fffdfb] px-4 outline-none transition focus:border-[#773441]" /></label>
          {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#773441] font-bold text-white transition hover:bg-[#5d2935] disabled:opacity-60">{loading && <Loader2 className="animate-spin" />} {isSignUp ? "إنشاء الحساب" : "تسجيل الدخول"}</button>
        </form>
        <p className="text-center text-sm text-[#725f62]">{isSignUp ? "لديك حساب بالفعل؟ " : "ليس لديك حساب؟ "}<Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-black text-[#773441]">{isSignUp ? "تسجيل الدخول" : "إنشاء حساب"}</Link></p>
      </section>
    </main>
  )
}
