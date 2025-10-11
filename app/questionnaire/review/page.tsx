'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { questionnaireData } from '@/data/questions';
import { getSessionToken } from '@/lib/session';

export default function ReviewPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<any[]>([]);
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/responses?sessionToken=${sessionToken}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setAnswers(data.answers || []);
            setBusinessName(data.businessName || '');
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!businessName.trim()) {
      alert('กรุณากรอกชื่อบริษัท/แบรนด์');
      return;
    }

    const sessionToken = getSessionToken();
    try {
      // Update response with business name and mark as completed
      await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          businessName,
          completed: true
        })
      });

      router.push('/questionnaire/complete');
    } catch (error) {
      console.error('Error submitting:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองอีกครั้ง');
    }
  };

  const answersBySection = questionnaireData.sections.map((section) => ({
    section,
    answers: answers.filter((a) => a.sectionId === section.id),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-600"
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
