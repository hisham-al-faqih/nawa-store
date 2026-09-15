import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
})

export async function POST(request: Request) {
  try {
    const input = inquirySchema.parse(await request.json())
    const inquiry = await prisma.contactInquiry.create({ data: input })
    return NextResponse.json({ id: inquiry.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "يرجى مراجعة البيانات المدخلة." }, { status: 400 })
    console.error("[contact] failed to save inquiry", error)
    return NextResponse.json({ message: "حدث خطأ أثناء إرسال الاستفسار." }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "غير مسموح" }, { status: 405 })
}
