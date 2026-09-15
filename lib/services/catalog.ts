import { prisma } from '@/lib/prisma'

export async function listActiveProducts(options?: { categorySlug?: string; search?: string; take?: number; skip?: number }) {
  const search = options?.search?.trim()
  return prisma.product.findMany({
    where: {
      isActive: true,
      ...(options?.categorySlug ? { category: { slug: options.categorySlug } } : {}),
      ...(search ? { OR: [{ name: { contains: search } }, { description: { contains: search } }, { brand: { contains: search } }] } : {}),
    },
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 }, category: true },
    orderBy: { createdAt: 'desc' },
    take: options?.take ?? 24,
    skip: options?.skip ?? 0,
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { images: { orderBy: { sortOrder: 'asc' } }, category: true, reviews: { where: { isApproved: true }, orderBy: { createdAt: 'desc' }, take: 10 } },
  })
}

export async function listActiveCategories() {
  return prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } })
}

export async function listActiveBanners() {
  return prisma.banner.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })
}
