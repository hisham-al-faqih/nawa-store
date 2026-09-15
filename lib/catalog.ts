export const catalogProducts = [
  { slug: 'nova-wireless-headphones', name: 'سماعات نوفا اللاسلكية', category: 'إلكترونيات', price: 45000, oldPrice: 59000, rating: 4.9, badge: 'الأكثر مبيعاً', stock: 'متوفر', image: '/images/product-editorial.png', description: 'صوت نقي وتجربة مريحة طوال اليوم مع تصميم أنيق يناسب أسلوبك.', specs: ['إلغاء ضوضاء نشط', 'بطارية تدوم 32 ساعة', 'شحن USB-C'] },
  { slug: 'daily-leather-bag', name: 'حقيبة جلدية يومية', category: 'أزياء', price: 38500, oldPrice: 46000, rating: 4.8, badge: 'جديد', stock: 'متوفر', image: '/images/product-editorial.png', description: 'حقيبة عملية من الجلد الطبيعي، مصممة لترافقك في كل تفاصيل يومك.', specs: ['جلد طبيعي', 'جيب داخلي مبطن', 'حزام قابل للتعديل'] },
  { slug: 'aura-smart-watch', name: 'ساعة أورا الذكية', category: 'إلكترونيات', price: 72000, oldPrice: 89000, rating: 4.7, badge: 'خصم 20%', stock: 'مخزون منخفض', image: '/images/product-editorial.png', description: 'تابع صحتك ونشاطك واتصالاتك من معصمك بتصميم مستقبلي خفيف.', specs: ['مقاومة للماء', 'تتبع النوم والنبض', 'شاشة AMOLED'] },
  { slug: 'sukoon-eau-de-parfum', name: 'عطر سكون أو دو بارفيوم', category: 'العناية والجمال', price: 29000, oldPrice: 35000, rating: 5, badge: 'محدود', stock: 'متوفر', image: '/images/hero-lifestyle.png', description: 'رائحة هادئة ومتوازنة بنفحات دافئة تمنح حضوراً لا ينسى.', specs: ['50 مل', 'ثبات طويل', 'نفحات خشبية ناعمة'] },
] as const

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ar-YE').format(price)
}
