'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';

export default function CompletePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ขอบคุณที่ทำแบบประเมิน!
          </h1>
          <p className="text-gray-600 mb-8">
            คำตอบของคุณได้ถูกบันทึกเรียบร้อยแล้ว<br />
            ข้อมูลเหล่านี้จะช่วยให้คุณเข้าใจธุรกิจของคุณมากยิ่งขึ้น
          </p>

          {/* Stats */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">แบบประเมินของคุณ</p>
            <p className="text-2xl font-bold text-blue-600">Executive Summary BluePrint</p>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">ขั้นตอนต่อไป</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>ทีมงานจะทำการวิเคราะห์ข้อมูลของคุณ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>คุณจะได้รับรายงานสรุปผลการประเมินธุรกิจ</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>พร้อมคำแนะนำในการพัฒนาธุรกิจด้วย AI Transformation</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                กลับหน้าหลัก
              </Button>
            </Link>
            <Button
              onClick={() => {
                if (confirm('คุณต้องการทำแบบประเมินใหม่หรือไม่? คำตอบเดิมจะถูกลบ')) {
                  localStorage.removeItem('questionnaire_answers');
                  localStorage.removeItem('questionnaire_business_name');
                  localStorage.removeItem('questionnaire_completed');
                  window.location.href = '/questionnaire/1';
                }
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              ทำแบบประเมินใหม่
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
