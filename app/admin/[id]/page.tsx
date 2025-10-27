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
  const [isExporting, setIsExporting] = useState(false);
  const [editedData, setEditedData] = useState<ResponseData | null>(null);

  useEffect(() => {
    async function loadResponse() {
      try {
        const res = await fetch(`/api/responses/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResponse(data);
        }
      } catch (error) {
        console.error('Error loading response:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadResponse();
  }, [id]);

  async function handleDelete() {
    if (!confirm('คุณต้องการลบข้อมูลนี้หรือไม่?')) return;

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

  function handleEdit() {
    setEditedData(response);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditedData(null);
    setIsEditing(false);
  }

  async function handleSave() {
    if (!editedData) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/responses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: editedData.businessName,
          email: editedData.email,
          answers: editedData.answers.map(a => ({
            id: a.id,
            value: a.value
          }))
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      const updated = await res.json();
      setResponse(updated);
      setEditedData(null);
      setIsEditing(false);
      alert('บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error saving:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSaving(false);
    }
  }

  function updateEditedField(field: keyof ResponseData, value: string | null) {
    if (!editedData) return;
    setEditedData({ ...editedData, [field]: value });
  }

  function updateEditedAnswer(answerId: string, value: string) {
    if (!editedData) return;
    const updatedAnswers = editedData.answers.map(a =>
      a.id === answerId ? { ...a, value } : a
    );
    setEditedData({ ...editedData, answers: updatedAnswers });
  }

  async function handleExport(format: 'csv' | 'xlsx') {
    if (!response) return;

    setIsExporting(true);
    try {
      const res = await fetch('/api/responses/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [response.id], format }),
      });

      if (!res.ok) {
        throw new Error('Export failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `response-${response.businessName || 'unnamed'}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Export สำเร็จ');
    } catch (error) {
      console.error('Export error:', error);
      alert('เกิดข้อผิดพลาดในการ export ข้อมูล');
    } finally {
      setIsExporting(false);
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
            <div className="flex-1 mr-4">
              {isEditing && editedData ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อบริษัท
                    </label>
                    <input
                      type="text"
                      value={editedData.businessName || ''}
                      onChange={(e) => updateEditedField('businessName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="ชื่อบริษัทหรือองค์กร"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      value={editedData.email || ''}
                      onChange={(e) => updateEditedField('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="อีเมล"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {response.businessName || 'ยังไม่ระบุชื่อบริษัท'}
                  </h1>
                  {response.email && (
                    <p className="text-gray-600">{response.email}</p>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    ยกเลิก
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    แก้ไขข้อมูล
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={() => handleExport('xlsx')}
                      disabled={isExporting}
                    >
                      {isExporting ? 'กำลัง Export...' : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Export Excel
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleExport('csv')}
                    disabled={isExporting}
                  >
                    Export CSV
                  </Button>
                  <Button variant="outline" onClick={handleDelete}>
                    ลบข้อมูล
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">สถานะ</p>
              <p className="font-semibold">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  response.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {response.completed ? 'เสร็จสมบูรณ์' : 'ยังไม่เสร็จ'}
                </span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">ความคืบหน้า</p>
              <p className="font-semibold text-lg text-gray-900">{response.progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${response.progress}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">จำนวนคำตอบ</p>
              <p className="font-semibold text-lg text-gray-900">
                {response.answers.length} / {getTotalQuestions()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">อัพเดทล่าสุด</p>
              <p className="font-semibold text-sm text-gray-900">
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
                  {answers.length === 0 ? (
                    <p className="text-gray-500 italic">ยังไม่ได้ตอบคำถามในส่วนนี้</p>
                  ) : (
                    answers.map((answer) => {
                      const questionData = getQuestionById(answer.questionId);
                      if (!questionData) return null;

                      const currentAnswer = isEditing && editedData
                        ? editedData.answers.find(a => a.id === answer.id)
                        : answer;

                      if (!currentAnswer) return null;

                      let displayValue = currentAnswer.value;
                      try {
                        const parsed = JSON.parse(currentAnswer.value);
                        if (Array.isArray(parsed)) {
                          displayValue = parsed.join(', ');
                        }
                      } catch {
                        // Value is already a string
                      }

                      const questionType = questionData.question.type;

                      return (
                        <div key={currentAnswer.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-gray-900 mb-2">
                            {currentAnswer.questionId}. {questionData.question.text}
                          </p>
                          {isEditing && editedData ? (
                            <div>
                              {questionType === 'textarea' ? (
                                <textarea
                                  value={currentAnswer.value}
                                  onChange={(e) => updateEditedAnswer(currentAnswer.id, e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  rows={4}
                                />
                              ) : questionType === 'select' && questionData.question.options ? (
                                <select
                                  value={currentAnswer.value}
                                  onChange={(e) => updateEditedAnswer(currentAnswer.id, e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                >
                                  <option value="">-- เลือก --</option>
                                  {questionData.question.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : questionType === 'multiselect' && questionData.question.options ? (
                                <div className="space-y-2">
                                  {questionData.question.options.map((opt) => {
                                    let selectedValues: string[] = [];
                                    try {
                                      const parsed = JSON.parse(currentAnswer.value);
                                      selectedValues = Array.isArray(parsed) ? parsed : [];
                                    } catch {
                                      // Not a JSON array
                                    }

                                    const isChecked = selectedValues.includes(opt);

                                    return (
                                      <label key={opt} className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            let newValues = [...selectedValues];
                                            if (e.target.checked) {
                                              newValues.push(opt);
                                            } else {
                                              newValues = newValues.filter(v => v !== opt);
                                            }
                                            updateEditedAnswer(currentAnswer.id, JSON.stringify(newValues));
                                          }}
                                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-900">{opt}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={currentAnswer.value}
                                  onChange={(e) => updateEditedAnswer(currentAnswer.id, e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-700 whitespace-pre-wrap">{displayValue}</p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
