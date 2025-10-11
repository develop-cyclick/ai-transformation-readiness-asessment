'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionInput } from '@/components/QuestionInput';
import { questionnaireData, getSectionById, getTotalQuestions } from '@/data/questions';
import { Answer } from '@/types/questions';
import { getSessionToken, setResponseId } from '@/lib/session';

interface StoredAnswer {
  id: string;
  questionId: number;
  sectionId: number;
  value: string;
}

export default function QuestionnaireSection({ params }: { params: Promise<{ sectionId: string }> }) {
  const resolvedParams = use(params);
  const sectionId = parseInt(resolvedParams.sectionId);
  const router = useRouter();

  const section = getSectionById(sectionId);
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [allAnswers, setAllAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing answers from API
    async function loadAnswers() {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/responses?sessionToken=${sessionToken}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.answers) {
            setAllAnswers(data.answers);
            const sectionAnswers: Record<number, string | number | string[]> = {};
            data.answers
              .filter((a: StoredAnswer) => a.sectionId === sectionId)
              .forEach((a: StoredAnswer) => {
                try {
                  sectionAnswers[a.questionId] = JSON.parse(a.value);
                } catch {
                  sectionAnswers[a.questionId] = a.value;
                }
              });
            setAnswers(sectionAnswers);
          }
        }
      } catch (error) {
        console.error('Error loading answers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAnswers();
  }, [sectionId]);

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบหน้าที่คุณต้องการ</h1>
          <Link href="/">
            <Button>กลับหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveAndContinue = async () => {
    // Validate required fields
    const newErrors: Record<number, string> = {};
    section.questions.forEach((q) => {
      if (q.required && !answers[q.id]) {
        newErrors[q.id] = 'กรุณากรอกคำตอบ';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare answers for this section
    const sectionAnswers: Answer[] = [];
    section.questions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        sectionAnswers.push({
          questionId: q.id,
          sectionId: section.id,
          value: answers[q.id],
        });
      }
    });

    // Calculate total progress
    const updatedAllAnswers = [...allAnswers.filter((a) => a.sectionId !== sectionId), ...sectionAnswers];
    const progress = Math.round((updatedAllAnswers.length / getTotalQuestions()) * 100);

    // Save to API
    try {
      const sessionToken = getSessionToken();
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          answers: sectionAnswers,
          progress
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.responseId) {
          setResponseId(data.responseId);
        }

        // Navigate to next section or review page
        if (sectionId < questionnaireData.sections.length) {
          router.push(`/questionnaire/${sectionId + 1}`);
        } else {
          router.push('/questionnaire/review');
        }
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง');
      }
    } catch (error) {
      console.error('Error saving answers:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง');
    }
  };

  const handlePrevious = () => {
    if (sectionId > 1) {
      router.push(`/questionnaire/${sectionId - 1}`);
    } else {
      router.push('/');
    }
  };

  const answeredQuestionsInSection = section.questions.filter((q) => answers[q.id] !== undefined).length;
  const totalAnswered = (() => {
    const otherSectionAnswers = allAnswers.filter((a: Answer) => a.sectionId !== sectionId).length;
    return otherSectionAnswers + answeredQuestionsInSection;
  })();

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
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับหน้าหลัก
          </Link>
          <ProgressBar current={totalAnswered} total={getTotalQuestions()} />
        </div>

        {/* Section Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {section.id}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
            </div>
            {section.description && (
              <p className="text-gray-600 ml-13">{section.description}</p>
            )}
          </div>

          <div className="space-y-8">
            {section.questions.map((question) => (
              <div key={question.id} className="border-b border-gray-200 pb-8 last:border-0">
                <label className="block mb-3">
                  <span className="text-lg font-medium text-gray-900">
                    {question.id}. {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </label>
                <QuestionInput
                  question={question}
                  value={answers[question.id] || ''}
                  onChange={(value) => {
                    setAnswers({ ...answers, [question.id]: value });
                    // Clear error when user starts typing
                    if (errors[question.id]) {
                      const newErrors = { ...errors };
                      delete newErrors[question.id];
                      setErrors(newErrors);
                    }
                  }}
                  error={errors[question.id]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious}>
            ← {sectionId > 1 ? 'ส่วนก่อนหน้า' : 'กลับหน้าหลัก'}
          </Button>
          <div className="text-sm text-gray-600">
            ส่วนที่ {sectionId} / {questionnaireData.sections.length}
          </div>
          <Button onClick={handleSaveAndContinue}>
            {sectionId < questionnaireData.sections.length ? 'บันทึกและไปต่อ →' : 'ไปหน้าสรุป →'}
          </Button>
        </div>
      </div>
    </main>
  );
}
