# 🚀 Quick Start Guide

## ทดลองใช้งานทันที (Development Mode)

```bash
# 1. เข้าไปที่โฟลเดอร์โปรเจค
cd questionnaire-app

# 2. รันเซิร์ฟเวอร์
npm run dev
```

เปิดเบราว์เซอร์ที่: **http://localhost:3000**

## 🎯 สิ่งที่คุณจะเห็น

### หน้าหลัก (Home)
- ภาพรวมของแบบประเมิน 50 คำถาม
- แบ่งออกเป็น 10 ส่วน
- ปุ่มเริ่มทำแบบประเมิน

### หน้าแบบประเมิน (/questionnaire/1 ถึง /questionnaire/10)
- คำถามในแต่ละส่วน
- บันทึกอัตโนมัติใน localStorage
- Progress bar แสดงความคืบหน้า
- ปุ่มกลับและไปต่อ

### หน้าสรุป (/questionnaire/review)
- ดูภาพรวมคำตอบทั้งหมด
- กรอกชื่อบริษัท/แบรนด์
- ส่งแบบประเมิน

### หน้าเสร็จสิ้น (/questionnaire/complete)
- ข้อความขอบคุณ
- ขั้นตอนต่อไป
- ปุ่มทำแบบประเมินใหม่

### Admin Dashboard (/admin)
- หน้าแสดงผลแบบประเมิน (Placeholder)
- ฟีเจอร์ที่จะพัฒนาต่อ

## 💾 ข้อมูลจัดเก็บอย่างไร (ปัจจุบัน)

**localStorage** (Browser storage):
- `questionnaire_answers` - คำตอบทั้งหมด
- `questionnaire_business_name` - ชื่อบริษัท
- `questionnaire_completed` - สถานะการทำเสร็จ

**การทดสอบ:**
1. ทำแบบประเมินไปบางส่วน
2. ปิดเบราว์เซอร์
3. เปิดใหม่ - คำตอบจะยังอยู่!
4. ทำต่อได้เลย

## 🗄️ สำหรับ Production (ใช้งานจริง)

ต้องตั้งค่าเพิ่มเติม:

### 1. ตั้งค่า Database

```bash
# เลือก 1 ใน 3 วิธี:

# ตัวเลือก 1: Supabase (แนะนำ - ฟรี)
# สมัครที่ https://supabase.com
# สร้างโปรเจคใหม่
# Copy Database URL

# ตัวเลือก 2: Neon (Serverless PostgreSQL - ฟรี)
# สมัครที่ https://neon.tech

# ตัวเลือก 3: Local PostgreSQL
brew install postgresql  # macOS
# หรือติดตั้งตามระบบปฏิบัติการ
```

### 2. อัพเดท Environment Variables

```bash
# แก้ไข .env
DATABASE_URL="your-database-url-here"
```

### 3. รัน Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. สร้าง API Routes

ยังไม่ได้สร้าง - ต้องพัฒนาเพิ่ม:
- `app/api/responses/route.ts` - บันทึกคำตอบ
- `app/api/responses/[id]/route.ts` - ดึงข้อมูล
- อัพเดทหน้า questionnaire ให้ใช้ API แทน localStorage

## 📱 ทดสอบบนมือถือ

1. รัน `npm run dev`
2. เช็ค IP ของเครื่องคุณ:
   ```bash
   ipconfig getifaddr en0  # macOS
   ipconfig               # Windows
   ```
3. เปิดเบราว์เซอร์บนมือถือ: `http://[your-ip]:3000`

## 🎨 แก้ไขคำถาม

```typescript
// แก้ไขที่ data/questions.ts

export const questionnaireData: QuestionnaireData = {
  title: 'ชื่อแบบประเมิน',
  sections: [
    {
      id: 1,
      title: 'ชื่อส่วน',
      questions: [
        {
          id: 1,
          text: 'คำถามของคุณ?',
          type: 'text', // หรือ textarea, number, select
          required: true
        }
      ]
    }
  ]
}
```

## 🐛 แก้ปัญหาทั่วไป

### Port 3000 ถูกใช้อยู่
```bash
# ใช้ port อื่น
PORT=3001 npm run dev
```

### ไม่เห็นการเปลี่ยนแปลง
```bash
# ลบ cache และ rebuild
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
# Generate Prisma Client ใหม่
npx prisma generate
```

### ลบข้อมูลทดสอบ
```javascript
// เปิด Developer Console (F12)
localStorage.clear()
location.reload()
```

## 📦 Deploy เร็ว (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push

# 2. ไปที่ vercel.com
# 3. Import repository
# 4. ใส่ Environment Variables
# 5. Deploy!
```

## ✅ Checklist ก่อน Deploy

- [ ] ตั้งค่า DATABASE_URL
- [ ] รัน `npx prisma migrate deploy`
- [ ] สร้าง API routes (ถ้าต้องการ)
- [ ] เทส build: `npm run build`
- [ ] เทสใน production mode: `npm start`
- [ ] เช็ค environment variables บน hosting

## 💡 Tips

1. **พัฒนาต่อ:**
   - ดูที่ `CLAUDE.md` สำหรับ architecture
   - ดูที่ `README.md` สำหรับภาพรวม

2. **ทดสอบ:**
   - ลองตอบครบทุกคำถาม
   - ลองปิดเปิดเบราว์เซอร์
   - ลองทำบนมือถือ

3. **ปัญหา:**
   - เช็ค Developer Console (F12)
   - เช็ค Terminal สำหรับ errors
   - ดูที่ `npm run build` output

## 🎯 Next Steps

1. ✅ ทดสอบแบบประเมินให้เรียบร้อย
2. ⏳ ตั้งค่า Database (ถ้าต้องการ production)
3. ⏳ สร้าง API routes
4. ⏳ Deploy ขึ้น hosting
5. ⏳ เพิ่ม authentication
6. ⏳ สร้าง admin dashboard จริง
7. ⏳ เพิ่ม export PDF/Excel

---

**พร้อมแล้ว! เริ่มต้นได้เลย 🚀**

หากมีคำถาม ดูเพิ่มเติมได้ที่ README.md และ CLAUDE.md
