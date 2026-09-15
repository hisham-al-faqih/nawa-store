"use client"

import Link from "next/link"
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from "lucide-react"
import { useEffect, useState } from "react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem("nawa-theme")
    const isDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    window.localStorage.setItem("nawa-theme", next ? "dark" : "light")
  }

  return <header className="sticky top-0 z-40 border-b border-[#eadfd9]/80 bg-[#FFFDFB]/95 backdrop-blur-xl dark:border-[#3a2b2f] dark:bg-[#171315]/95">
    <div className="bg-[#773441] px-4 py-1.5 text-center text-[10px] font-medium text-[#fff8f4]">شحن مجاني للطلبات فوق 100,000 ريال <span className="mx-1.5 text-[#e9c9bc]">•</span> استبدال سهل خلال 14 يوماً</div>
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2.5" aria-label="نواة الرئيسية"><span className="flex size-9 items-center justify-center rounded-xl bg-[#773441] text-lg text-[#F1DED0]">ن</span><span><strong className="block text-lg tracking-tight text-[#773441]">نواة</strong><small className="hidden text-[8px] font-medium tracking-[0.2em] text-[#9e8582] sm:block">CURATED LIVING</small></span></Link>
      <nav className="hidden items-center gap-6 text-sm font-bold lg:flex"><Link href="/">الرئيسية</Link><Link href="/products">المنتجات</Link><Link href="/products#categories">التصنيفات</Link><Link href="/products#offers">العروض</Link><Link href="/contact">تواصل معنا</Link></nav>
      <div className="flex items-center gap-0.5"><Link href="/products" aria-label="البحث" className="rounded-full p-2 transition hover:bg-[#f4e9e4] dark:hover:bg-[#302126]"><Search /></Link><Link href="/account" aria-label="الحساب" className="rounded-full p-2 transition hover:bg-[#f4e9e4] dark:hover:bg-[#302126]"><UserRound /></Link><Link href="/products#wishlist" aria-label="المفضلة" className="hidden rounded-full p-2 transition hover:bg-[#f4e9e4] dark:hover:bg-[#302126] sm:block"><Heart /></Link><button type="button" onClick={toggleTheme} aria-label={dark ? "الوضع الفاتح" : "الوضع الداكن"} className="rounded-full p-2 transition hover:bg-[#f4e9e4] dark:hover:bg-[#302126]">{dark ? <Sun /> : <Moon />}</button><Link href="/cart" aria-label="السلة" className="rounded-full bg-[#773441] p-2 text-white transition hover:bg-[#612a36]"><ShoppingBag /></Link><button type="button" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden">{open ? <X /> : <Menu />}</button></div>
    </div>
    {open && <nav className="border-t border-[#eadfd9] bg-[#FFFDFB] px-4 py-3 dark:border-[#3a2b2f] dark:bg-[#171315] lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-bold"><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-[#f4e9e4] dark:hover:bg-[#302126]" href="/">الرئيسية</Link><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-[#f4e9e4] dark:hover:bg-[#302126]" href="/products">المنتجات والتصنيفات</Link><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-[#f4e9e4] dark:hover:bg-[#302126]" href="/account">حسابي والمفضلة</Link><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-[#f4e9e4] dark:hover:bg-[#302126]" href="/contact">تواصل معنا</Link></div></nav>}
  </header>
}

export function SiteFooter() {
  return <footer className="border-t border-[#eadfd9] bg-[#f8f1ed] px-4 py-8 dark:border-[#3a2b2f] dark:bg-[#21191c] sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4"><div><Link href="/" className="text-xl font-black text-[#773441]">نواة</Link><p className="mt-2 max-w-xs text-sm leading-6 text-[#806e6b] dark:text-[#cdb6b0]">اختيارات جميلة لحياة أهدأ، ننتقيها لك بعناية.</p></div><div><h3 className="mb-3 font-bold">المتجر</h3><div className="flex flex-col gap-2 text-sm text-[#806e6b]"><Link href="/products">كل المنتجات</Link><Link href="/cart">السلة</Link><Link href="/account">حسابي</Link></div></div><div><h3 className="mb-3 font-bold">المساعدة</h3><div className="flex flex-col gap-2 text-sm text-[#806e6b]"><Link href="/contact">تواصل معنا</Link><a href="https://wa.me/967774426179" target="_blank" rel="noreferrer">واتساب مباشر</a></div></div><div><h3 className="mb-3 font-bold">نواة</h3><p className="text-sm leading-6 text-[#806e6b]">تجربة تسوق هادئة ومنتقاة.</p></div></div><div className="mx-auto mt-6 max-w-7xl border-t border-[#eadfd9] pt-4 text-xs text-[#806e6b]">برمجة وتطوير هشام الفقيه <span className="mx-2">•</span><a href="https://wa.me/967774426179" target="_blank" rel="noreferrer" className="font-bold text-[#773441]">واتساب 774426179</a></div></footer>
}
