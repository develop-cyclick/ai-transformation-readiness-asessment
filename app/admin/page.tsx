'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับหน้าหลัก
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">
            จัดการและดูผลการประเมินธุรกิจทั้งหมด
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Development Mode</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    ในขณะนี้แอปพลิเคชันใช้ localStorage สำหรับจัดเก็บข้อมูล เพื่อใช้งานจริงต้อง:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>ตั้งค่า PostgreSQL database</li>
                    <li>รัน <code className="bg-blue-100 px-1 rounded">npx prisma migrate dev</code></li>
                    <li>สร้าง API routes สำหรับบันทึกและดึงข้อมูล</li>
                    <li>เพิ่มระบบ authentication สำหรับ admin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-gray-900">รายการคำตอบทั้งหมด</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                ดูและจัดการคำตอบจากผู้ใช้งานทั้งหมด พร้อมฟิลเตอร์และค้นหา
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-gray-900">รายงานและวิเคราะห์</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                สถิติและกราฟแสดงผลการประเมิน insights สำหรับธุรกิจ
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-gray-900">ส่งออกข้อมูล</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Export ข้อมูลเป็น PDF หรือ Excel สำหรับนำไปวิเคราะห์
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-bold text-gray-900">จัดการผู้ใช้งาน</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                จัดการ admin accounts และสิทธิ์การเข้าถึง
              </p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Current Features */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ฟีเจอร์ที่ใช้งานได้</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-2">✅ แบบประเมินออนไลน์</h3>
              <ul className="space-y-2 text-green-800 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>แบบฟอร์ม 50 คำถาม แบ่งเป็น 10 ส่วน</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>บันทึกความคืบหน้าอัตโนมัติ (localStorage)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Progress bar และการนำทาง</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Responsive design รองรับมือถือและแท็บเล็ต</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
