# Business Questionnaire - Executive Summary Blueprint

แบบประเมินธุรกิจออนไลน์ 50 คำถาม เพื่อช่วยให้เจ้าของธุรกิจเข้าใจธุรกิจของตนเองอย่างลึกซึ้ง

สร้างโดย AI Transformation Consultant สำหรับช่วยในการวิเคราะห์และพัฒนาธุรกิจด้วย AI

## ✨ Features

- 📝 **50 คำถามครอบคลุม** แบ่งเป็น 10 ส่วนหลัก
- 💾 **บันทึกอัตโนมัติ** ไม่ต้องกังวลเรื่องข้อมูลหาย
- 📊 **Progress Tracking** ติดตามความคืบหน้าแบบ real-time
- 📱 **Responsive Design** ใช้งานได้ทั้งมือถือและคอมพิวเตอร์
- 🎨 **Modern UI/UX** ออกแบบสวยงาม ใช้งานง่าย
- 🇹🇭 **รองรับภาษาไทย** ทั้งหมด

## 🏗️ Tech Stack

- **Next.js 15** - React Framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Production database (configurable)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
cd questionnaire-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
questionnaire-app/
├── app/                       # Next.js App Router
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── admin/                # Admin dashboard
│   └── questionnaire/        # Questionnaire pages
│       ├── [sectionId]/      # Dynamic section pages
│       ├── review/           # Review page
│       └── complete/         # Completion page
├── components/               # Reusable components
│   ├── Button.tsx
│   ├── ProgressBar.tsx
│   └── QuestionInput.tsx
├── data/                     # Question data
│   └── questions.ts          # All 50 questions
├── lib/                      # Utilities
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Helper functions
├── prisma/                   # Database schema
│   └── schema.prisma
├── types/                    # TypeScript types
│   └── questions.ts
└── public/                   # Static files
```

## 📝 10 Assessment Sections

1. **ข้อมูลทั่วไปของธุรกิจ** - ข้อมูลพื้นฐานของบริษัท
2. **ตลาด & อุตสาหกรรม** - การวิเคราะห์ตลาดและคู่แข่ง
3. **โมเดลธุรกิจ** - โครงสร้างและรายได้
4. **ผู้ก่อตั้ง & ทีมงาน** - ทีมและโครงสร้างองค์กร
5. **ลูกค้า & ความต้องการ** - ฐานลูกค้าและความพึงพอใจ
6. **โอกาสขยายธุรกิจ** - ศักยภาพในการเติบโต
7. **ทางออก & ความเสี่ยง** - Exit Strategy และการจัดการความเสี่ยง
8. **Digital Readiness & Technology** - ความพร้อมด้านดิจิทัล
9. **Operations & Efficiency** - ประสิทธิภาพการดำเนินงาน
10. **Brand & Market Position** - แบรนด์และตำแหน่งในตลาด

## 🗄️ Database Setup (For Production)

### Option 1: Using Supabase (Recommended)

1. สร้างโปรเจค on [Supabase](https://supabase.com)
2. Copy Database URL
3. Update `.env`:
   ```
   DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Option 2: Local PostgreSQL

1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE questionnaire;
   ```
3. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/questionnaire"
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## 🔧 Development

```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Open Prisma Studio (Database GUI)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

### Deploy to Other Platforms

Compatible with:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📊 Current Status

### ✅ Completed Features

- Multi-step questionnaire (10 sections, 50 questions)
- Progress tracking and auto-save (localStorage)
- Responsive design
- Form validation
- Review page
- Completion flow

### 🚧 Coming Soon

- Database integration (replace localStorage)
- Admin dashboard with data visualization
- PDF/Excel export
- Email notifications
- Advanced analytics
- Multi-language support

## 🤝 Contributing

This project was created for AI Transformation consulting purposes. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary software created for AI Transformation consulting services.

## 💡 Use Cases

- Business owners self-assessment
- Consulting intake forms
- Pre-investment due diligence
- Strategic planning workshops
- AI Transformation readiness assessment

## 📞 Support

For questions or support, please contact the AI Transformation team.

---

**Built with ❤️ for helping businesses grow**

*ตอบ 50 ข้อนี้! และคุณจะรู้จักธุรกิจของคุณจริงๆ*
