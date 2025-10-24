'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { questionnaireData, getQuestionById, getTotalQuestions } from '@/data/questions';
import { formatDate } from '@/lib/utils';

interface ResponseData {
  id: string;
  businessName: string | null;
  email: string | null;
  progress: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Array<{
    id: string;
    questionId: number;
    sectionId: number;
    value: string;
  }>;
}

export default function ResponseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();

  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState<{
    businessName: string;
    email: string;
    completed: boolean;
    answers: { [key: number]: string };
  }>({
    businessName: '',
    email: '',
    completed: false,
    answers: {}
  });

  useEffect(() => {
    async function loadResponse() {
      try {
        const res = await fetch(`/api/responses/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResponse(data);

          // Initialize edited data
          const answersMap: { [key: number]: string } = {};
          data.answers.forEach((a: { questionId: number; value: string }) => {
            answersMap[a.questionId] = a.value;
          });

          setEditedData({
            businessName: data.businessName || '',
            email: data.email || '',
            completed: data.completed,
            answers: answersMap
          });
        }
      } catch (error) {
        console.error('Error loading response:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadResponse();
  }, [id]);

  async function handleSave() {
    if (!response) return;

    setIsSaving(true);
    try {
      // Prepare answers array
      const answers = Object.entries(editedData.answers).map(([questionId, value]) => {
        const question = questionnaireData.sections
          .flatMap(s => s.questions.map(q => ({ ...q, sectionId: s.id })))
          .find(q => q.id === parseInt(questionId));

        return {
          id: `${response.id}-${questionId}`,
          questionId: parseInt(questionId),
          sectionId: question?.sectionId || 1,
          value: value
        };
      });

      // Calculate progress
      const totalQuestions = getTotalQuestions();
      const answeredQuestions = Object.values(editedData.answers).filter(v => v.trim() !== '').length;
      const progress = Math.round((answeredQuestions / totalQuestions) * 100);

      const res = await fetch(`/api/responses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: editedData.businessName,
          email: editedData.email,
          completed: editedData.completed,
          progress: progress,
          answers: answers
        })
      });

      if (res.ok) {
        alert('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว');
        setIsEditing(false);
        // Reload response
        window.location.reload();
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error saving response:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    if (!response) return;

    // Reset to original data
    const answersMap: { [key: number]: string } = {};
    response.answers.forEach((a: { questionId: number; value: string }) => {
      answersMap[a.questionId] = a.value;
    });

    setEditedData({
      businessName: response.businessName || '',
      email: response.email || '',
      completed: response.completed,
      answers: answersMap
    });

    setIsEditing(false);
  }

  async function handleDelete() {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) return;

    try {
      const res = await fetch(`/api/responses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('ลบข้อมูลสำเร็จ');
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Error deleting response:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      alert('เกิดข้อผิดพลาดในการออกจากระบบ');
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูล</h1>
          <Link href="/admin">
            <Button>กลับหน้า Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  const answersBySection = questionnaireData.sections.map((section) => ({
    section,
    answers: response.answers.filter((a) => a.sectionId === section.id),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับหน้า Admin
            </Link>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              ออกจากระบบ
            </Button>
          </div>
        </div>

        {/* Response Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {response.businessName || 'ยังไม่ระบุชื่อบริษัท'}
              </h1>
              {response.email && (
                <p className="text-gray-600">{response.email}</p>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleDelete}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    ลบ
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    แก้ไข
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อบริษัท
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.businessName}
                  onChange={(e) => setEditedData({ ...editedData, businessName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="ชื่อบริษัท"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{response.businessName || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="อีเมล"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{response.email || '-'}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editedData.completed}
                  onChange={(e) => setEditedData({ ...editedData, completed: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">ทำเครื่องหมายว่าเสร็จสมบูรณ์</span>
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">สถานะ</p>
              <p className="font-semibold">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  (isEditing ? editedData.completed : response.completed)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {(isEditing ? editedData.completed : response.completed) ? 'เสร็จสมบูรณ์' : 'ยังไม่เสร็จ'}
                </span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">ความคืบหน้า</p>
              <p className="font-semibold text-lg">{response.progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${response.progress}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">จำนวนคำตอบ</p>
              <p className="font-semibold text-lg">
                {response.answers.length} / {getTotalQuestions()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">อัพเดทล่าสุด</p>
              <p className="font-semibold text-sm">
                {formatDate(new Date(response.updatedAt))}
              </p>
            </div>
          </div>
        </div>

        {/* Answers by Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">คำตอบทั้งหมด</h2>

          <div className="space-y-8">
            {answersBySection.map(({ section, answers }) => (
              <div key={section.id} className="border-b border-gray-200 pb-8 last:border-0">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {section.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600">
                      {answers.length} / {section.questions.length} คำถาม
                    </p>
                  </div>
                </div>

                <div className="ml-13 space-y-4">
                  {section.questions.map((question) => {
                    const answer = answers.find(a => a.questionId === question.id);
                    const currentValue = isEditing
                      ? (editedData.answers[question.id] || '')
                      : (answer?.value || '');

                    let displayValue = currentValue;
                    if (!isEditing) {
                      try {
                        const parsed = JSON.parse(currentValue);
                        if (Array.isArray(parsed)) {
                          displayValue = parsed.join(', ');
                        }
                      } catch {
                        // Value is already a string
                      }
                    }

                    return (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {question.id}. {question.text}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        {isEditing ? (
                          question.type === 'textarea' ? (
                            <textarea
                              value={displayValue}
                              onChange={(e) => setEditedData({
                                ...editedData,
                                answers: {
                                  ...editedData.answers,
                                  [question.id]: e.target.value
                                }
                              })}
                              rows={4}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder={question.placeholder}
                            />
                          ) : question.type === 'select' ? (
                            <select
                              value={displayValue}
                              onChange={(e) => setEditedData({
                                ...editedData,
                                answers: {
                                  ...editedData.answers,
                                  [question.id]: e.target.value
                                }
                              })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                              <option value="">เลือก...</option>
                              {question.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={question.type === 'number' ? 'number' : 'text'}
                              value={displayValue}
                              onChange={(e) => setEditedData({
                                ...editedData,
                                answers: {
                                  ...editedData.answers,
                                  [question.id]: e.target.value
                                }
                              })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder={question.placeholder}
                            />
                          )
                        ) : (
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {displayValue || <span className="text-gray-400 italic">ยังไม่ได้ตอบ</span>}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
