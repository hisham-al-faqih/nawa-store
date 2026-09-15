import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'سماعات نوفا اللاسلكية', slug: 'nova-wireless-headphones', price: 45000, oldPrice: 59000, description: 'صوت نقي وتجربة مريحة طوال اليوم مع تصميم أنيق يناسب أسلوبك.', category: 'إلكترونيات', image: '/images/product-editorial.png', isBestSeller: true, stockQuantity: 24 },
  { name: 'حقيبة جلدية يومية', slug: 'daily-leather-bag', price: 38500, oldPrice: 46000, description: 'حقيبة عملية من الجلد الطبيعي، مصممة لترافقك في كل تفاصيل يومك.', category: 'أزياء', image: '/images/product-editorial.png', stockQuantity: 12 },
  { name: 'ساعة أورا الذكية', slug: 'aura-smart-watch', price: 72000, oldPrice: 89000, description: 'تابع صحتك ونشاطك واتصالاتك من معصمك بتصميم مستقبلي خفيف.', category: 'إلكترونيات', image: '/images/product-editorial.png', stockQuantity: 7 },
  { name: 'عطر سكون أو دو بارفيوم', slug: 'sukoon-eau-de-parfum', price: 29000, oldPrice: 35000, description: 'رائحة هادئة ومتوازنة بنفحات دافئة تمنح حضوراً لا ينسى.', category: 'العناية والجمال', image: '/images/hero-lifestyle.png', stockQuantity: 31 },
]

async function main() {
  const categories = [
    { name: 'إلكترونيات', slug: 'electronics', description: 'تقنية ذكية ليوم أكثر سلاسة', image: '/images/product-editorial.png', sortOrder: 1 },
    { name: 'أزياء', slug: 'fashion', description: 'قطع مختارة تعبر عن أسلوبك', image: '/images/hero-lifestyle.png', sortOrder: 2 },
    { name: 'العناية والجمال', slug: 'beauty', description: 'تفاصيل صغيرة تصنع فرقاً كبيراً', image: '/images/hero-lifestyle.png', sortOrder: 3 },
  ]

  for (const category of categories) await prisma.category.upsert({ where: { slug: category.slug }, update: category, create: category })

  for (const item of products) {
    const category = await prisma.category.findFirstOrThrow({ where: { name: item.category } })
    const { category: _category, image, ...productData } = item
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: { ...productData, categoryId: category.id },
      create: {
        ...productData,
        categoryId: category.id,
        images: { create: { url: image, alt: item.name } },
      },
    })
  }

  await prisma.banner.deleteMany()
  await prisma.banner.create({ data: { title: 'اكتشف ما يناسبك', subtitle: 'اختيارات مدروسة بتفاصيل تصنع يومك', image: '/images/hero-lifestyle.png', ctaLabel: 'تسوق الآن', href: '/products' } })

  await prisma.user.upsert({
    where: { email: 'admin@atelier.local' },
    update: { role: Role.ADMIN },
    create: { name: 'مدير المتجر', email: 'admin@atelier.local', role: Role.ADMIN },
  })
}

main().finally(() => prisma.$disconnect())
