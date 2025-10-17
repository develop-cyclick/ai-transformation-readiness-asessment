import { QuestionnaireData } from '@/types/questions';

export const questionnaireData: QuestionnaireData = {
  title: 'ประเมินโอกาสธุรกิจด้วย AI - AI Use Case Development',
  description: 'แบบฟอร์มประเมินศักยภาพและพัฒนา Use Case สำหรับการนำ AI มาใช้ในองค์กรของคุณ',
  sections: [
    {
      id: 1,
      title: 'A. ข้อมูลพื้นฐาน',
      description: 'ข้อมูลทั่วไปเกี่ยวกับองค์กรและผู้ตอบแบบฟอร์ม',
      questions: [
        {
          id: 1,
          text: 'ชื่อผู้ตอบแบบฟอร์ม',
          type: 'text',
          placeholder: 'กรุณากรอกชื่อของคุณ',
          required: true
        },
        {
          id: 2,
          text: 'เบอร์โทร',
          type: 'text',
          placeholder: 'กรุณากรอกเบอร์โทรศัพท์',
          required: true
        },
        {
          id: 3,
          text: 'อีเมล',
          type: 'text',
          placeholder: 'กรุณากรอกอีเมล (ถ้ามี)',
          required: false
        },
        {
          id: 4,
          text: 'LINE ID',
          type: 'text',
          placeholder: 'กรุณากรอก LINE ID (ถ้ามี)',
          required: false
        },
        {
          id: 5,
          text: 'รุ่นที่',
          type: 'text',
          placeholder: 'กรุณากรอกรุ่นที่',
          required: true
        },
        {
          id: 6,
          text: 'หมายเลขกลุ่ม',
          type: 'text',
          placeholder: 'กรุณากรอกหมายเลขกลุ่ม',
          required: true
        },
        {
          id: 7,
          text: 'ชื่อบริษัท',
          type: 'text',
          placeholder: 'กรุณากรอกชื่อบริษัทหรือองค์กร',
          required: true
        },
        {
          id: 8,
          text: 'ประเภทธุรกิจ',
          type: 'text',
          placeholder: 'เช่น การผลิต, ค้าปลีก, บริการ, เทคโนโลยี',
          required: true
        },
        {
          id: 9,
          text: 'ประเภทของอุตสาหกรรม',
          type: 'text',
          placeholder: 'เช่น อาหารและเครื่องดื่ม, สุขภาพ, การศึกษา, อสังหาริมทรัพย์',
          required: true
        },
        {
          id: 10,
          text: 'บทบาทและหน้าที่ในองค์กรหรือบริษัท',
          type: 'text',
          placeholder: 'เช่น CEO, CTO, Marketing Manager, Operations Manager',
          required: true
        },
        {
          id: 11,
          text: 'จำนวนพนักงานโดยประมาณ / ขนาดองค์กร',
          type: 'select',
          placeholder: 'เลือกขนาดองค์กร',
          required: true,
          options: [
            '1-10 คน (Startup)',
            '11-50 คน (SME)',
            '51-200 คน (Mid-size)',
            '201-500 คน (Large)',
            '500+ คน (Enterprise)'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'B. บริบทและปัญหาธุรกิจ',
      description: 'ความเข้าใจเกี่ยวกับปัญหาและความท้าทายในธุรกิจของคุณ',
      questions: [
        {
          id: 12,
          text: 'ลักษณะการทำงานหลักขององค์กร',
          type: 'textarea',
          placeholder: 'เช่น ผลิต – จำหน่าย – บริการลูกค้า – สร้างคอนเทนต์ – บริหารข้อมูล ฯลฯ',
          required: true
        },
        {
          id: 13,
          text: 'กระบวนการในธุรกิจที่อยากแก้ปัญหาหรือพัฒนามากที่สุด',
          type: 'textarea',
          placeholder: 'อธิบายกระบวนการที่ต้องการพัฒนา',
          required: true
        },
        {
          id: 14,
          text: 'Pain Point ที่สำคัญที่สุดของธุรกิจ',
          type: 'textarea',
          placeholder: 'อธิบายปัญหาหลักที่กระทบธุรกิจมากที่สุด',
          required: true
        },
        {
          id: 15,
          text: 'ปัญหานี้กระทบกับด้านใดของธุรกิจ (เลือกได้มากกว่า 1 ข้อ)',
          type: 'multiselect',
          placeholder: 'เลือกด้านที่ได้รับผลกระทบ',
          required: true,
          options: [
            'รายได้',
            'ต้นทุน',
            'ประสิทธิภาพทีม',
            'ความพึงพอใจลูกค้า',
            'ความเร็วในการตัดสินใจ',
            'อื่น ๆ'
          ]
        },
        {
          id: 16,
          text: 'องค์กรมีข้อมูลหรือระบบใดอยู่แล้วที่เกี่ยวข้องกับปัญหานี้',
          type: 'textarea',
          placeholder: 'เช่น มีข้อมูลลูกค้า / ยอดขาย / การผลิต / การแจ้งซ่อม / Feedback ฯลฯ',
          required: true
        },
        {
          id: 17,
          text: 'เคยมีการพยายามแก้ปัญหานี้ด้วยวิธีอื่นมาก่อนหรือไม่ (เช่น ระบบอัตโนมัติ, การจ้างเพิ่ม, เปลี่ยนกระบวนการ ฯลฯ) - ถ้ามี กรุณาเล่าผลลัพธ์โดยสรุป',
          type: 'textarea',
          placeholder: 'อธิบายวิธีที่เคยลองและผลลัพธ์',
          required: false
        },
        {
          id: 18,
          text: 'ถ้าคุณสามารถ "กดปุ่มให้ AI แก้ได้ทันที 1 เรื่อง" อยากให้มันช่วยเรื่องอะไรที่สุด',
          type: 'textarea',
          placeholder: 'เช่น วิเคราะห์ข้อมูลลูกค้า, คัดกรองงานเอกสาร, ตอบคำถามอัตโนมัติ, พยากรณ์ยอดขาย ฯลฯ',
          required: true
        },
        {
          id: 19,
          text: 'ความพร้อมของข้อมูลเพื่อใช้วิเคราะห์หรือพัฒนา AI',
          type: 'select',
          placeholder: 'เลือกระดับความพร้อมของข้อมูล',
          required: true,
          options: [
            'มีครบและเป็นระบบ',
            'มีบางส่วน ต้องจัดเก็บเพิ่ม',
            'ข้อมูลกระจัดกระจาย / อยู่หลายแหล่ง',
            'ยังไม่เคยเก็บ'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'C. วัตถุประสงค์ของการใช้ AI',
      description: 'เป้าหมายและผลลัพธ์ที่คาดหวังจากการนำ AI มาใช้',
      questions: [
        {
          id: 20,
          text: 'เป้าหมายหลักของคุณจากการใช้ AI คืออะไร (เลือกได้มากกว่า 1 ข้อ)',
          type: 'multiselect',
          placeholder: 'เลือกเป้าหมายที่ต้องการ',
          required: true,
          options: [
            'ลดต้นทุน',
            'เพิ่มยอดขาย',
            'เพิ่มประสิทธิภาพการทำงาน',
            'วิเคราะห์ข้อมูล / Insight',
            'ยกระดับประสบการณ์ลูกค้า',
            'อื่น ๆ'
          ]
        },
        {
          id: 21,
          text: 'ถ้าโครงการนี้สำเร็จ คุณอยากให้เกิด "ผลลัพธ์ที่ชัดเจน" อะไรขึ้นบ้าง (Key Results)',
          type: 'textarea',
          placeholder: 'เช่น ลดเวลาการทำงานลง 30%, เพิ่มยอดขาย 20%, ลดข้อผิดพลาด, เพิ่มความพึงพอใจลูกค้า ฯลฯ',
          required: true
        }
      ]
    },
    {
      id: 4,
      title: 'D. แนวคิดและแนวทางการดำเนินงาน',
      description: 'แผนและแนวทางในการนำ AI มาใช้แก้ปัญหา',
      questions: [
        {
          id: 22,
          text: 'อธิบายแนวคิดของ Use Case ที่คุณอยากทำ (AI จะเข้ามาทำหน้าที่อะไร / แก้ปัญหาอย่างไร)',
          type: 'textarea',
          placeholder: 'อธิบายแนวคิดและวิธีที่ AI จะช่วยแก้ปัญหา',
          required: true
        },
        {
          id: 23,
          text: 'ข้อมูล (Data) ที่คุณมีอยู่แล้วซึ่งจะช่วยให้ AI ทำงานได้มีอะไรบ้าง',
          type: 'textarea',
          placeholder: 'อธิบายข้อมูลที่มีอยู่และสามารถนำมาใช้ได้',
          required: true
        },
        {
          id: 24,
          text: 'ทีมงานหรือฝ่ายใดในองค์กรที่จะเกี่ยวข้องกับ Use Case นี้',
          type: 'textarea',
          placeholder: 'ระบุทีมงานและฝ่ายที่เกี่ยวข้อง',
          required: true
        },
        {
          id: 25,
          text: 'คิดว่าจะใช้เครื่องมือหรือเทคโนโลยีใดในการดำเนินการ (ถ้ามีในใจอยู่แล้ว)',
          type: 'textarea',
          placeholder: 'เช่น ChatGPT, Gemini, Power BI, Midjourney, n8n ฯลฯ',
          required: false
        }
      ]
    },
    {
      id: 5,
      title: 'E. ผลลัพธ์และบทเรียนที่คาดหวัง',
      description: 'การคาดการณ์ผลลัพธ์และการบริหารความเสี่ยง',
      questions: [
        {
          id: 26,
          text: 'มีปัจจัยเสี่ยงหรืออุปสรรคใดที่คิดว่าอาจเกิดขึ้นระหว่างการดำเนินโครงการ',
          type: 'textarea',
          placeholder: 'เช่น ข้อมูลไม่พร้อม, ทีมไม่เข้าใจ, ระบบไม่รองรับ ฯลฯ',
          required: true
        },
        {
          id: 27,
          text: 'ถ้ามีโอกาสได้ต่อยอดหลังโครงการนี้ คุณอยากขยายไปด้านใดต่อ',
          type: 'textarea',
          placeholder: 'อธิบายแผนการขยายหรือพัฒนาต่อยอด',
          required: true
        },
        {
          id: 28,
          text: 'หากทดลองใช้ AI แล้วประสบความสำเร็จ คุณคาดว่าจะเห็นการเปลี่ยนแปลงอะไรในองค์กร',
          type: 'textarea',
          placeholder: 'อธิบายการเปลี่ยนแปลงที่คาดหวัง',
          required: true
        }
      ]
    },
    {
      id: 6,
      title: 'F. สรุปเพื่อจัดทำ Use Case',
      description: 'สรุปข้อมูลสำหรับการจัดทำ Use Case',
      questions: [
        {
          id: 29,
          text: 'ชื่อ Use Case ที่คุณอยากเสนอคืออะไร',
          type: 'text',
          placeholder: 'เช่น "การใช้ AI เพื่อปรับปรุงการตอบแชทลูกค้า", "AI สำหรับวิเคราะห์ยอดขายและคาดการณ์สต็อก"',
          required: true
        },
        {
          id: 30,
          text: 'สรุปปัญหา → แนวทางการแก้ไขด้วย AI → ผลลัพธ์ที่คาดหวัง สั้น ๆ ภายใน 3–5 บรรทัด',
          type: 'textarea',
          placeholder: 'สรุปโดยย่อภายใน 3-5 บรรทัด',
          required: true
        }
      ]
    }
  ]
};

// Helper function to get total number of questions
export const getTotalQuestions = (): number => {
  return questionnaireData.sections.reduce((total, section) => total + section.questions.length, 0);
};

// Helper function to get section by ID
export const getSectionById = (sectionId: number) => {
  return questionnaireData.sections.find(section => section.id === sectionId);
};

// Helper function to get question by ID
export const getQuestionById = (questionId: number) => {
  for (const section of questionnaireData.sections) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) return { question, section };
  }
  return null;
};
