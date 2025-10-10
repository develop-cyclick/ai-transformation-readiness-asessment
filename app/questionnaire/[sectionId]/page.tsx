'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionInput } from '@/components/QuestionInput';
import { questionnaireData, getSectionById, getTotalQuestions } from '@/data/questions';
import { Answer } from '@/types/questions';

export default function QuestionnaireSection({ params }: { params: Promise<{ sectionId: string }> }) {
  const resolvedParams = use(params);
  const sectionId = parseInt(resolvedParams.sectionId);
  const router = useRouter();

  const section = getSectionById(sectionId);
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    // Load existing answers from localStorage
    const savedAnswers = localStorage.getItem('questionnaire_answers');
    if (savedAnswers) {
      const allAnswers: Answer[] = JSON.parse(savedAnswers);
      const sectionAnswers: Record<number, string | number | string[]> = {};
      allAnswers
        .filter((a) => a.sectionId === sectionId)
        .forEach((a) => {
          sectionAnswers[a.questionId] = a.value;
        });
      setAnswers(sectionAnswers);
    }
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

  const handleSaveAndContinue = () => {
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

    // Save answers to localStorage
    const savedAnswers = localStorage.getItem('questionnaire_answers');
    let allAnswers: Answer[] = savedAnswers ? JSON.parse(savedAnswers) : [];

    // Remove existing answers for this section
    allAnswers = allAnswers.filter((a) => a.sectionId !== sectionId);

    // Add new answers
    section.questions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        allAnswers.push({
          questionId: q.id,
          sectionId: section.id,
          value: answers[q.id],
        });
      }
    });

    localStorage.setItem('questionnaire_answers', JSON.stringify(allAnswers));

    // Navigate to next section or review page
    if (sectionId < questionnaireData.sections.length) {
      router.push(`/questionnaire/${sectionId + 1}`);
    } else {
      router.push('/questionnaire/review');
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
    const savedAnswers = localStorage.getItem('questionnaire_answers');
    if (!savedAnswers) return answeredQuestionsInSection;
    const allAnswers: Answer[] = JSON.parse(savedAnswers);
    // Count unique question IDs excluding current section, then add current section answers
    const otherSectionAnswers = allAnswers.filter((a) => a.sectionId !== sectionId).length;
    return otherSectionAnswers + answeredQuestionsInSection;
  })();

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
            {section.questions.map((question, index) => (
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
