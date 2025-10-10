'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { questionnaireData, getQuestionById } from '@/data/questions';
import { Answer } from '@/types/questions';

export default function ReviewPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('questionnaire_answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleSubmit = async () => {
    if (!businessName.trim()) {
      alert('กรุณากรอกชื่อบริษัท/แบรนด์');
      return;
    }

    // For now, just save to localStorage
    // In production, this would save to the database via API
    localStorage.setItem('questionnaire_business_name', businessName);
    localStorage.setItem('questionnaire_completed', 'true');

    router.push('/questionnaire/complete');
  };

  const answersBySection = questionnaireData.sections.map((section) => ({
    section,
    answers: answers.filter((a) => a.sectionId === section.id),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ตรวจสอบคำตอบ</h1>
          <p className="text-gray-600 mb-8">กรุณาตรวจสอบคำตอบของคุณก่อนส่ง</p>

          {/* Business Name Input */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <label className="block mb-2">
              <span className="text-lg font-medium text-gray-900">
                ชื่อบริษัท / แบรนด์ <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="กรุณากรอกชื่อบริษัทหรือแบรนด์ของคุณ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Answers Summary */}
          <div className="space-y-6">
            {answersBySection.map(({ section, answers: sectionAnswers }) => (
              <div key={section.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      {section.id}
                    </span>
                    {section.title}
                  </h2>
                  <Link href={`/questionnaire/${section.id}`}>
                    <Button variant="outline" size="sm">
                      แก้ไข
                    </Button>
                  </Link>
                </div>
                <div className="ml-11 space-y-3">
                  {sectionAnswers.length === 0 ? (
                    <p className="text-red-500 text-sm">ยังไม่ได้ตอบคำถามในส่วนนี้</p>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      ตอบแล้ว {sectionAnswers.length} / {section.questions.length} คำถาม
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">สรุป</h3>
            <p className="text-gray-700">
              คุณได้ตอบคำถามทั้งหมด {answers.length} / {getTotalQuestions()} ข้อ
            </p>
            {answers.length < getTotalQuestions() && (
              <p className="text-yellow-600 mt-2 text-sm">
                คุณสามารถส่งแบบประเมินได้แม้ยังไม่ได้ตอบครบทุกข้อ แต่ควรตอบให้ครบเพื่อผลลัพธ์ที่ดีที่สุด
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8">
            <Link href={`/questionnaire/${questionnaireData.sections.length}`}>
              <Button variant="outline">← กลับไปแก้ไข</Button>
            </Link>
            <Button onClick={handleSubmit} size="lg">
              ส่งแบบประเมิน
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function getTotalQuestions() {
  return questionnaireData.sections.reduce((total, section) => total + section.questions.length, 0);
}
