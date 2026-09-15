"use client"

import Link from "next/link"
import { Bell, ChevronLeft, Heart, LogOut, MapPin, Package, ShieldCheck, UserRound } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"

const sections = [
  { href: "#profile", icon: UserRound, title: "الملف الشخصي", description: "الاسم والبريد ورقم الهاتف" },
  { href: "#orders", icon: Package, title: "طلباتي", description: "تتبع الطلبات السابقة والحالية" },
  { href: "#addresses", icon: MapPin, title: "عناويني", description: "إدارة عناوين التوصيل" },
  { href: "#favorites", icon: Heart, title: "المفضلة", description: "المنتجات التي حفظتها" },
  { href: "#notifications", icon: Bell, title: "الإشعارات", description: "آخر تحديثات طلباتك وعروضنا" },
  { href: "#security", icon: ShieldCheck, title: "الأمان", description: "كلمة المرور وإعدادات الحساب" },
]

export default function AccountPage() {
  const { data: session, isPending } = authClient.useSession()
  const name = session?.user?.name || "زائر نواة"
  const email = session?.user?.email || "سجّل الدخول للوصول إلى بياناتك"

  async function logout() {
    await authClient.signOut()
    window.location.href = "/"
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#FFFDFB] text-[#2f2728] dark:bg-[#171315] dark:text-[#f9efeb]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#a48682]">مساحتك الخاصة</p>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#3c2b2d] dark:text-[#f7e9e4]">مرحباً {isPending ? "..." : name}</h1>
            <p className="mt-1 text-xs text-[#806e6b] dark:text-[#cdb6b0]">أدر حسابك وطلباتك بسهولة من مكان واحد.</p>
          </div>
          <Link href="/products" className="w-fit rounded-full border border-[#dbc8c2] px-4 py-2 text-xs font-bold text-[#773441] transition hover:bg-[#f5ebe7] dark:border-[#4b373b] dark:hover:bg-[#2a2022]">العودة للمتجر</Link>
        </header>

        <section className="flex flex-col gap-4 rounded-[1.35rem] bg-[#773441] p-4 text-white shadow-[0_12px_30px_rgba(119,52,65,0.14)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1DED0] text-lg font-bold text-[#773441]">{name.slice(0, 1)}</div>
            <div className="min-w-0"><p className="text-[10px] text-[#e6b9a9]">الحساب الشخصي</p><h2 className="truncate text-sm font-bold">{name}</h2><p className="truncate text-[11px] text-[#f1ded0]">{email}</p></div>
          </div>
          {session ? <button onClick={logout} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-bold transition hover:bg-white/10 sm:w-auto"><LogOut /> تسجيل الخروج</button> : <Link href="/sign-in" className="inline-flex w-full items-center justify-center rounded-full bg-[#F1DED0] px-4 py-2 text-xs font-bold text-[#773441] transition hover:bg-white sm:w-auto">تسجيل الدخول</Link>}
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ href, icon: Icon, title, description }) => (
            <Link key={title} href={href} className="group flex min-h-[112px] flex-col justify-between rounded-[1.15rem] border border-[#eadfd9] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d7b8ad] hover:shadow-[0_10px_24px_rgba(100,55,45,0.08)] dark:border-[#3a2b2f] dark:bg-[#21191c] dark:hover:border-[#60434a]">
              <div className="flex items-center justify-between"><span className="flex size-9 items-center justify-center rounded-xl bg-[#F1DED0] text-[#773441]"><Icon /></span><ChevronLeft className="text-[#bda6a1] transition group-hover:-translate-x-1" /></div>
              <div><h2 className="mt-3 text-sm font-bold">{title}</h2><p className="mt-0.5 text-[11px] text-[#806e6b] dark:text-[#cdb6b0]">{description}</p></div>
            </Link>
          ))}
        </div>

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.15rem] border border-[#eadfd9] bg-[#f8f1ed] p-4 dark:border-[#3a2b2f] dark:bg-[#21191c]"><p className="text-[10px] font-bold tracking-[0.16em] text-[#a48682]">مزايا نواة</p><h2 className="mt-1 text-sm font-bold">شحن مجاني للطلبات فوق 100,000 ريال</h2><p className="mt-1 text-[11px] text-[#806e6b] dark:text-[#cdb6b0]">نوصّل اختياراتك بعناية وبلا رسوم إضافية.</p></div>
          <div className="rounded-[1.15rem] border border-[#eadfd9] bg-[#f8f1ed] p-4 dark:border-[#3a2b2f] dark:bg-[#21191c]"><p className="text-[10px] font-bold tracking-[0.16em] text-[#a48682]">تسوق براحة</p><h2 className="mt-1 text-sm font-bold">استبدال سهل خلال 14 يوماً</h2><p className="mt-1 text-[11px] text-[#806e6b] dark:text-[#cdb6b0]">فريقنا جاهز لمساعدتك في كل خطوة.</p></div>
        </section>
      </div>
      <SiteFooter />
    </main>
  )
}
