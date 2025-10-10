import { QuestionnaireData } from '@/types/questions';

export const questionnaireData: QuestionnaireData = {
  title: 'ธุรกิจของคุณพร้อม AI แล้วหรือยัง? ตอบ 50 ข้อนี้!',
  description: 'AI Transformation Readiness Assessment - ประเมินศักยภาพและโอกาสในการนำ AI มาขับเคลื่อนธุรกิจ',
  sections: [
    {
      id: 1,
      title: 'ข้อมูลทั่วไปของธุรกิจ',
      description: 'ข้อมูลพื้นฐานเกี่ยวกับธุรกิจของคุณ',
      questions: [
        {
          id: 1,
          text: 'ชื่อบริษัท / แบรนด์',
          type: 'text',
          placeholder: 'กรุณากรอกชื่อบริษัทหรือแบรนด์',
          required: true
        },
        {
          id: 2,
          text: 'ปีที่ก่อตั้ง',
          type: 'number',
          placeholder: 'พ.ศ. เช่น 2565',
          required: true,
          validation: {
            min: 2400,
            max: 2600
          }
        },
        {
          id: 3,
          text: 'อุตสาหกรรม / ประเภทธุรกิจ',
          type: 'text',
          placeholder: 'เช่น ค้าปลีก, บริการ, เทคโนโลยี',
          required: true
        },
        {
          id: 4,
          text: 'สินค้า/บริการหลักที่ให้',
          type: 'textarea',
          placeholder: 'อธิบายสินค้าหรือบริการหลักของคุณ',
          required: true
        },
        {
          id: 5,
          text: 'กลุ่มลูกค้าเป้าหมาย (Target Audience)',
          type: 'textarea',
          placeholder: 'อธิบายกลุ่มลูกค้าเป้าหมายของคุณ',
          required: true
        },
        {
          id: 6,
          text: 'รายได้เฉลี่ยต่อเดือน / ต่อปี (3 ปีล่าสุด)',
          type: 'textarea',
          placeholder: 'ระบุรายได้เฉลี่ยในแต่ละปี',
          required: true
        },
        {
          id: 7,
          text: 'กำไรสุทธิเฉลี่ย (3 ปีล่าสุด)',
          type: 'textarea',
          placeholder: 'ระบุกำไรสุทธิเฉลี่ยในแต่ละปี',
          required: true
        },
        {
          id: 8,
          text: 'จำนวนพนักงานปัจจุบัน',
          type: 'number',
          placeholder: 'จำนวนพนักงานทั้งหมด',
          required: true
        },
        {
          id: 9,
          text: 'ช่องทางการขาย (Online, Offline, Distributor ฯลฯ)',
          type: 'textarea',
          placeholder: 'อธิบายช่องทางการขายทั้งหมด',
          required: true
        },
        {
          id: 10,
          text: 'จุดแข็งหลักของธุรกิจที่ทำให้แตกต่างจากคู่แข่ง',
          type: 'textarea',
          placeholder: 'อธิบายจุดแข็งและความแตกต่าง',
          required: true
        }
      ]
    },
    {
      id: 2,
      title: 'ตลาด & อุตสาหกรรม',
      description: 'ข้อมูลเกี่ยวกับตลาดและอุตสาหกรรมที่คุณดำเนินธุรกิจ',
      questions: [
        {
          id: 11,
          text: 'คุณประเมินว่าตลาดที่คุณอยู่ "กำลังเติบโต/ทรงตัว/ถดถอย" อย่างไร? โปรดอธิบาย',
          type: 'textarea',
          placeholder: 'อธิบายสถานการณ์ตลาดและเหตุผล',
          required: true
        },
        {
          id: 12,
          text: 'ขนาดตลาด (TAM) ที่คุณประเมินคือเท่าไร? และคุณถือส่วนแบ่งเท่าไร (Market Share)',
          type: 'textarea',
          placeholder: 'ระบุขนาดตลาดและส่วนแบ่งการตลาด',
          required: true
        },
        {
          id: 13,
          text: 'ใครคือคู่แข่งหลัก 3 รายในตลาด และคุณแตกต่างจากพวกเขาอย่างไร',
          type: 'textarea',
          placeholder: 'ระบุคู่แข่งและความแตกต่าง',
          required: true
        },
        {
          id: 14,
          text: 'อุปสรรคในการเข้าตลาด (เช่น เงินทุน, เทคโนโลยี, กฎหมาย, ความเชี่ยวชาญ) มีอะไรบ้าง',
          type: 'textarea',
          placeholder: 'อธิบายอุปสรรคต่างๆ',
          required: true
        }
      ]
    },
    {
      id: 3,
      title: 'โมเดลธุรกิจ',
      description: 'โครงสร้างและรูปแบบการสร้างรายได้ของธุรกิจ',
      questions: [
        {
          id: 15,
          text: 'รายได้หลักของคุณมาจากไหน (ระบุ % ของแต่ละช่องทาง)',
          type: 'textarea',
          placeholder: 'เช่น ขายตรง 50%, ออนไลน์ 30%, ตัวแทนจำหน่าย 20%',
          required: true
        },
        {
          id: 16,
          text: 'คุณมีรายได้ซ้ำ (Recurring Revenue) หรือ Subscription Model หรือไม่? โปรดอธิบาย',
          type: 'textarea',
          placeholder: 'อธิบายรูปแบบรายได้ซ้ำ (ถ้ามี)',
          required: true
        },
        {
          id: 17,
          text: 'Margin โดยเฉลี่ย (Gross Margin และ Net Margin) อยู่ที่กี่ %',
          type: 'textarea',
          placeholder: 'ระบุ Gross Margin และ Net Margin',
          required: true
        },
        {
          id: 18,
          text: 'คุณสามารถปรับขึ้นราคาสินค้า/บริการได้หรือไม่โดยไม่เสียลูกค้า? อธิบายเหตุผล',
          type: 'textarea',
          placeholder: 'อธิบายความยืดหยุ่นของราคาและเหตุผล',
          required: true
        },
        {
          id: 19,
          text: 'ระบบและกระบวนการปัจจุบันมีอะไรบ้าง เช่น SOP, Automation, ระบบ CRM, ERP ฯลฯ',
          type: 'textarea',
          placeholder: 'อธิบายระบบและกระบวนการที่ใช้',
          required: true
        }
      ]
    },
    {
      id: 4,
      title: 'ผู้ก่อตั้ง & ทีมงาน',
      description: 'ข้อมูลเกี่ยวกับผู้ก่อตั้งและทีมงาน',
      questions: [
        {
          id: 20,
          text: 'ชื่อผู้ก่อตั้ง / ประวัติย่อ / ประสบการณ์',
          type: 'textarea',
          placeholder: 'แนะนำผู้ก่อตั้งและประสบการณ์ที่เกี่ยวข้อง',
          required: true
        },
        {
          id: 21,
          text: 'คุณได้ลงทุนส่วนตัวในธุรกิจนี้เท่าไรแล้ว? (เงิน / เวลา / ทรัพยากร)',
          type: 'textarea',
          placeholder: 'อธิบายการลงทุนทั้งหมด',
          required: true
        },
        {
          id: 22,
          text: 'คุณคิดว่าความเสี่ยงส่วนตัวของคุณคืออะไร ถ้าธุรกิจนี้ล้มเหลว',
          type: 'textarea',
          placeholder: 'อธิบายความเสี่ยงส่วนตัว',
          required: true
        },
        {
          id: 23,
          text: 'โครงสร้างทีมหลัก (เช่น ฝ่ายขาย, การตลาด, การเงิน, ปฏิบัติการ) เป็นอย่างไร?',
          type: 'textarea',
          placeholder: 'อธิบายโครงสร้างทีมและหน้าที่',
          required: true
        },
        {
          id: 24,
          text: 'ทีมปัจจุบันขาดความสามารถในด้านใดบ้าง?',
          type: 'textarea',
          placeholder: 'ระบุจุดอ่อนหรือทักษะที่ขาด',
          required: true
        },
        {
          id: 25,
          text: 'ธุรกิจสามารถเดินได้โดยไม่มีคุณใน 1–3 เดือนหรือไม่? อธิบาย',
          type: 'textarea',
          placeholder: 'อธิบายความเป็นอิสระของธุรกิจจากตัวคุณ',
          required: true
        }
      ]
    },
    {
      id: 5,
      title: 'ลูกค้า & ความต้องการ',
      description: 'ข้อมูลเกี่ยวกับฐานลูกค้าและพฤติกรรม',
      questions: [
        {
          id: 26,
          text: 'ฐานลูกค้าปัจจุบันมีกี่ราย (Active Customers)',
          type: 'number',
          placeholder: 'จำนวนลูกค้าที่ใช้บริการอยู่',
          required: true
        },
        {
          id: 27,
          text: '% ของลูกค้าที่กลับมาซื้อซ้ำ (Repeat Customer)',
          type: 'number',
          placeholder: 'เช่น 40 (คิดเป็นเปอร์เซ็นต์)',
          required: true,
          validation: {
            min: 0,
            max: 100
          }
        },
        {
          id: 28,
          text: 'ลูกค้าของคุณมองว่าธุรกิจคุณแก้ปัญหาอะไรให้เขา?',
          type: 'textarea',
          placeholder: 'อธิบายปัญหาที่คุณแก้ให้ลูกค้า',
          required: true
        },
        {
          id: 29,
          text: 'มีการบอกต่อแบบปากต่อปากหรือ Referral Program หรือไม่? โปรดเล่า',
          type: 'textarea',
          placeholder: 'อธิบายการบอกต่อและโปรแกรมแนะนำ',
          required: true
        },
        {
          id: 30,
          text: 'ลูกค้าที่ไม่พอใจ/เลิกใช้บริการ ส่วนใหญ่เกิดจากสาเหตุอะไร?',
          type: 'textarea',
          placeholder: 'อธิบายสาเหตุของการสูญเสียลูกค้า',
          required: true
        }
      ]
    },
    {
      id: 6,
      title: 'โอกาสขยายธุรกิจ',
      description: 'โอกาสในการเติบโตและพัฒนาธุรกิจ',
      questions: [
        {
          id: 31,
          text: 'ถ้าคุณมีทรัพยากร (Network, Marketing, Systems, Mentorship) คุณคิดว่ายอดขายสามารถโตได้กี่เท่าใน 3 ปี?',
          type: 'textarea',
          placeholder: 'อธิบายศักยภาพการเติบโตและเหตุผล',
          required: true
        },
        {
          id: 32,
          text: 'ธุรกิจคุณสามารถสร้างรายได้ใหม่จากช่องทางใดบ้าง? เช่น Upsell, Cross-sell, Subscription, Franchise',
          type: 'textarea',
          placeholder: 'อธิบายโอกาสสร้างรายได้ใหม่',
          required: true
        },
        {
          id: 33,
          text: 'คุณเคยคิดหรือวางแผนเรื่องการขยายไปต่างจังหวัด/ต่างประเทศหรือไม่?',
          type: 'textarea',
          placeholder: 'อธิบายแผนการขยายพื้นที่',
          required: true
        },
        {
          id: 34,
          text: 'มีเทคโนโลยีหรือระบบใดที่สามารถช่วย Scale ธุรกิจของคุณได้ทันที?',
          type: 'textarea',
          placeholder: 'อธิบายเทคโนโลยีที่ต้องการ',
          required: true
        },
        {
          id: 35,
          text: 'ถ้าผมเข้ามาเป็น Strategic Partner คุณอยากให้ช่วยด้านไหนมากที่สุด (เลือก 3 อันดับแรก: เช่น การตลาด, ระบบ, การเงิน, กลยุทธ์, การขาย, Branding ฯลฯ)',
          type: 'textarea',
          placeholder: 'ระบุ 3 อันดับแรกที่ต้องการความช่วยเหลือ',
          required: true
        }
      ]
    },
    {
      id: 7,
      title: 'ทางออก & ความเสี่ยง',
      description: 'แผนออกจากธุรกิจและการจัดการความเสี่ยง',
      questions: [
        {
          id: 36,
          text: 'คุณเคยคิดเรื่องการ Exit ไว้อย่างไร (ขายกิจการ, Franchise, IPO, Family Business ฯลฯ)',
          type: 'textarea',
          placeholder: 'อธิบายแผน Exit Strategy',
          required: true
        },
        {
          id: 37,
          text: 'ถ้าได้ Strategic Partner เข้ามา คุณมองว่า Exit Strategy ที่เหมาะสมที่สุดคือแบบไหน',
          type: 'textarea',
          placeholder: 'อธิบาย Exit Strategy ที่เหมาะสม',
          required: true
        },
        {
          id: 38,
          text: 'ปัจจุบันธุรกิจคุณมีความเสี่ยงหลักอะไรบ้าง? (การเงิน, คู่แข่ง, เทคโนโลยี, ทีม, กฎหมาย)',
          type: 'textarea',
          placeholder: 'อธิบายความเสี่ยงต่างๆ',
          required: true
        },
        {
          id: 39,
          text: 'คุณเคยมีประวัติหนี้เสีย / การเงินติดขัดที่เกี่ยวข้องกับธุรกิจหรือไม่?',
          type: 'textarea',
          placeholder: 'อธิบายประวัติทางการเงิน',
          required: true
        },
        {
          id: 40,
          text: 'ในมุมคุณ อะไรคือสิ่งที่ทำให้คุณมั่นใจที่สุดว่าธุรกิจนี้จะโตได้ 10X ในอนาคต?',
          type: 'textarea',
          placeholder: 'อธิบายความมั่นใจและเหตุผล',
          required: true
        }
      ]
    },
    {
      id: 8,
      title: 'Digital Readiness & Technology',
      description: 'ความพร้อมด้านดิจิทัลและเทคโนโลยี',
      questions: [
        {
          id: 41,
          text: 'ปัจจุบันธุรกิจใช้เทคโนโลยีอะไรบ้าง? (Website, Social Media, Analytics, AI/ML)',
          type: 'textarea',
          placeholder: 'อธิบายเทคโนโลยีที่ใช้',
          required: true
        },
        {
          id: 42,
          text: 'มีข้อมูลลูกค้า (Customer Data) เก็บอยู่ในระบบอะไร และใช้ประโยชน์อย่างไร?',
          type: 'textarea',
          placeholder: 'อธิบายการจัดการข้อมูลลูกค้า',
          required: true
        },
        {
          id: 43,
          text: '% ของยอดขายที่มาจากช่องทาง Digital คิดเป็นเท่าไร?',
          type: 'number',
          placeholder: 'เช่น 60 (คิดเป็นเปอร์เซ็นต์)',
          required: true,
          validation: {
            min: 0,
            max: 100
          }
        },
        {
          id: 44,
          text: 'ทีมงานมีความพร้อมด้าน Digital Skills อยู่ในระดับใด (1-10)?',
          type: 'number',
          placeholder: 'ระดับ 1-10',
          required: true,
          validation: {
            min: 1,
            max: 10
          }
        }
      ]
    },
    {
      id: 9,
      title: 'Operations & Efficiency',
      description: 'การดำเนินงานและประสิทธิภาพ',
      questions: [
        {
          id: 45,
          text: 'กระบวนการทำงานหลักใช้เวลาเฉลี่ยเท่าไร? (จาก Lead → Close Sale → Delivery)',
          type: 'textarea',
          placeholder: 'อธิบายระยะเวลาในแต่ละขั้นตอน',
          required: true
        },
        {
          id: 46,
          text: 'มี Pain Points ในการดำเนินงานประจำวันอะไรบ้าง?',
          type: 'textarea',
          placeholder: 'อธิบายปัญหาในการดำเนินงาน',
          required: true
        },
        {
          id: 47,
          text: 'ถ้าต้องการเพิ่ม Capacity 2 เท่า ต้องลงทุนอะไรเพิ่มบ้าง?',
          type: 'textarea',
          placeholder: 'อธิบายการลงทุนที่จำเป็น',
          required: true
        }
      ]
    },
    {
      id: 10,
      title: 'Brand & Market Position',
      description: 'แบรนด์และตำแหน่งในตลาด',
      questions: [
        {
          id: 48,
          text: 'ลูกค้ารู้จักคุณผ่านช่องทางไหนมากที่สุด?',
          type: 'textarea',
          placeholder: 'อธิบายช่องทางที่ลูกค้ารู้จักแบรนด์',
          required: true
        },
        {
          id: 49,
          text: 'Brand Awareness ในตลาดอยู่ในระดับใด? (Top of Mind, Known, Unknown)',
          type: 'select',
          placeholder: 'เลือกระดับ',
          required: true,
          options: [
            'Top of Mind (อยู่ในใจลูกค้าอันดับแรก)',
            'Known (ลูกค้ารู้จัก)',
            'Unknown (ลูกค้ายังไม่ค่อยรู้จัก)'
          ]
        },
        {
          id: 50,
          text: 'มี Brand Value หรือ Mission/Vision ที่ชัดเจนหรือไม่?',
          type: 'textarea',
          placeholder: 'อธิบาย Brand Value, Mission และ Vision',
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
