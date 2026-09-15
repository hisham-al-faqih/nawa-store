'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatPrice } from '@/lib/catalog'

type CartItem = { slug: string; name: string; price: number; image: string; quantity: number }

const fallbackItems: CartItem[] = [
  { slug: 'nova-wireless-headphones', name: 'سماعات نوفا اللاسلكية', price: 45000, image: '/images/product-editorial.png', quantity: 1 },
]

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('sukoon-cart')
    setItems(stored ? JSON.parse(stored) : fallbackItems)
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem('sukoon-cart', JSON.stringify(items))
  }, [items, ready])

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const shipping = subtotal >= 100000 || subtotal === 0 ? 0 : 2500
  const total = subtotal + shipping

  const updateQuantity = (slug: string, delta: number) => setItems((current) => current.map((item) => item.slug === slug ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  const removeItem = (slug: string) => setItems((current) => current.filter((item) => item.slug !== slug))

  return <main dir="rtl" className="min-h-screen bg-[#FFFDFB] px-4 py-8 text-[#2f2728] sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#773441] transition hover:gap-3"><ArrowRight /> متابعة التسوق</Link>
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex-1">
          <div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-bold tracking-[0.2em] text-[#a48682]">مراجعة مشترياتك</p><h1 className="mt-2 text-3xl font-bold text-[#3c2b2d]">سلة التسوق</h1></div><span className="rounded-full bg-[#F1DED0] px-3 py-1.5 text-xs font-bold text-[#773441]">{items.length} منتجات</span></div>
          {items.length === 0 ? <div className="rounded-[2rem] border border-[#eadfd9] bg-white p-12 text-center"><ShoppingBag className="mx-auto text-[#773441]" size={38} /><h2 className="mt-4 text-xl font-bold">سلتك فارغة حالياً</h2><p className="mt-2 text-sm text-[#806e6b]">اكتشف اختياراتنا وأضف ما يعجبك.</p><Link href="/products" className="mt-6 inline-flex rounded-full bg-[#773441] px-5 py-3 text-sm font-bold text-white">استكشف المنتجات</Link></div> : <div className="flex flex-col gap-3">{items.map((item) => <article key={item.slug} className="flex items-center gap-4 rounded-3xl border border-[#eadfd9] bg-white p-3 sm:p-4"><div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-[#f0ebe8]"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" /></div><div className="min-w-0 flex-1"><Link href={`/products/${item.slug}`} className="font-bold text-[#493638] hover:text-[#773441]">{item.name}</Link><p className="mt-1 text-sm font-bold text-[#773441]">{formatPrice(item.price)} ريال</p><div className="mt-3 flex items-center gap-2"><button aria-label="تقليل الكمية" onClick={() => updateQuantity(item.slug, -1)} className="flex size-8 items-center justify-center rounded-full border border-[#eadfd9] text-[#773441]"><Minus /></button><span className="min-w-6 text-center text-sm font-bold">{item.quantity}</span><button aria-label="زيادة الكمية" onClick={() => updateQuantity(item.slug, 1)} className="flex size-8 items-center justify-center rounded-full bg-[#773441] text-white"><Plus /></button></div></div><button aria-label={`حذف ${item.name}`} onClick={() => removeItem(item.slug)} className="rounded-full p-2 text-[#a48682] transition hover:bg-[#f8eeea] hover:text-[#773441]"><Trash2 /></button></article>)}</div>}
        </section>
        <aside className="w-full rounded-[2rem] bg-[#773441] p-6 text-[#F1DED0] lg:max-w-sm"><h2 className="text-xl font-bold text-white">ملخص الطلب</h2><div className="mt-6 flex flex-col gap-4 text-sm"><div className="flex justify-between"><span>المجموع الفرعي</span><strong className="text-white">{formatPrice(subtotal)} ريال</strong></div><div className="flex justify-between"><span>الشحن</span><strong className="text-white">{shipping === 0 ? 'مجاني' : `${formatPrice(shipping)} ريال`}</strong></div><div className="h-px bg-white/20" /><div className="flex justify-between text-base"><span>الإجمالي</span><strong className="text-xl text-white">{formatPrice(total)} ريال</strong></div></div><Link href="/checkout" aria-disabled={items.length === 0} className={`mt-8 flex w-full justify-center rounded-full bg-[#F1DED0] px-5 py-3.5 text-sm font-bold text-[#773441] transition hover:bg-white ${items.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>إتمام الطلب</Link><p className="mt-4 text-center text-xs text-[#e6b9a9]">الشحن مجاني للطلبات فوق 100,000 ريال</p></aside>
      </div>
    </div>
  </main>
}
