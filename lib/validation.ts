import { parsePhoneNumberFromString } from 'libphonenumber-js/max'
import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'اكتب الاسم الكامل بشكل صحيح'),
  email: z.string().trim().toLowerCase().email('أدخل بريداً إلكترونياً صحيحاً'),
  phone: z.string().trim().min(6, 'أدخل رقم الهاتف'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  confirmPassword: z.string(),
  country: z.string().default('YE'),
}).refine((value) => value.password === value.confirmPassword, {
  path: ['confirmPassword'],
  message: 'كلمتا المرور غير متطابقتين',
}).superRefine((value, ctx) => {
  const phone = parsePhoneNumberFromString(value.phone, value.country as never)
  if (!phone?.isValid()) {
    ctx.addIssue({ code: 'custom', path: ['phone'], message: 'رقم الهاتف غير صالح للدولة المحددة' })
  }
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('أدخل بريداً إلكترونياً صحيحاً'),
  password: z.string().min(1, 'أدخل كلمة المرور'),
})

export const addressSchema = z.object({
  label: z.string().trim().min(2, 'أدخل اسم العنوان'),
  fullName: z.string().trim().min(2, 'أدخل الاسم الكامل'),
  phone: z.string().trim().min(6, 'أدخل رقم الهاتف'),
  governorate: z.string().trim().min(2, 'اختر المحافظة'),
  city: z.string().trim().min(2, 'أدخل المدينة'),
  district: z.string().trim().min(2, 'أدخل المنطقة'),
  details: z.string().trim().min(5, 'أدخل العنوان التفصيلي'),
  landmark: z.string().trim().optional(),
  deliveryNotes: z.string().trim().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type AddressInput = z.infer<typeof addressSchema>
