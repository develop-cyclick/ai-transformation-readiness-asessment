import Link from "next/link";
import { Button } from "@/components/Button";
import { questionnaireData, getTotalQuestions } from "@/data/questions";

export default function Home() {
  const totalQuestions = getTotalQuestions();
  const totalSections = questionnaireData.sections.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {questionnaireData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {questionnaireData.description}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">จำนวนคำถาม</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalQuestions} ข้อ
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">แบ่งออกเป็น</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalSections} ส่วน
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              หัวข้อในแบบประเมิน
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {questionnaireData.sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {section.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {section.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {section.questions.length} คำถาม
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>หมายเหตุ:</strong>{" "}
                  คุณสามารถบันทึกและกลับมาทำต่อได้ทุกเมื่อ
                  ไม่จำเป็นต้องทำให้เสร็จในครั้งเดียว
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/questionnaire/1">
              <Button size="lg" className="w-full sm:w-auto">
                เริ่มทำแบบประเมิน
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>สร้างโดย AI Transformation Consultant</p>
          <p className="mt-2">
            เพื่อช่วยให้องค์กรพัฒนา Use Case และนำ AI
            มาใช้แก้ปัญหาธุรกิจอย่างมีประสิทธิภาพ
          </p>
        </div>
      </div>
    </main>
  );
}
