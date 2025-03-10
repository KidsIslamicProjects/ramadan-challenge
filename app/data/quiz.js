// data/questions.js
export const questions = [
  {
    id: 1,
    question: "هل استعنت بالله قبل الدخول إلى المسابقة_____.",
    options: ["نعم", "كلا"],
    correctAnswer: "نعم",
    score: 1,
  },
  {
    id: 2,
    question: "أين كان اجتماع سعود وأصدقائه في أوّل حلقة؟ _____.",
    options: [
      "بجانب الكعبة الشريفة",
      "في المسجد النبوي",
      "في بيت أحد الصحابة",
      "في السوق",
    ],
    correctAnswer: "بجانب الكعبة الشريفة",
    score: 1,
  },
  {
    id: 3,
    question: "ما أول فعل كان عليه أن يقوم به سعود قبل التصدّق بالمال؟ _____.",
    options: [
      "إخلاص النيّة",
      "إخبار والديه",
      "إحضار المال",
      "الذهاب إلى المسجد",
    ],
    correctAnswer: "إخلاص النيّة",
    score: 1,
  },
  {
    id: 4,
    question: "سورة الإخلاص سميت هكذا لكي نخلص الأعمال لـ _____.",
    options: [
      "الرسول الكريم",
      "وجه الله",
      "أولياء الله الصالحين",
      "الصحابة الكرام",
    ],
    correctAnswer: "وجه الله",
    score: 1,
  },
  {
    id: 5,
    question: "الله أحد يعني _____. والله الصمد يعني _____.",
    options: [
      "لا شريك له ولا مثيل، الذي نقصده عند الحاجة",
      "الرحمن الرحيم، الذي يغفر الذنوب",
      "واحد في ذاته وأسمائه، الذي ينصر المؤمنين",
      "مالك السماوات والأرض، الذي يرزق عباده",
    ],
    correctAnswer: "لا شريك له ولا مثيل، الذي نقصده عند الحاجة",
    score: 1,
  },
  {
    id: 6,
    question: "لم يكن له كفوا أحد يعني _____.",
    options: [
      "أنه الخالق الواحد، المتفرد بالكمال",
      "أنه أفضل من جميع المخلوقات",
      "أن الملائكة تشبهه في صفاته",
      "أن له شريكًا في الخلق",
    ],
    correctAnswer: "أنه الخالق الواحد، المتفرد بالكمال",
    score: 1,
  },
  {
    id: 7,
    question: "تأخر حسن عن الاجتماع لأنه _____.",
    options: [
      "تناول مثلجات بالشوكولا",
      "ذهب إلى السوق",
      "كان يلعب مع أصدقائه",
      "نسي موعد الاجتماع",
    ],
    correctAnswer: "تناول مثلجات بالشوكولا",
    score: 1,
  },
  {
    id: 8,
    question: "يخاطب الله تعالى _____ في سورة الناس.",
    options: ["الرسول", "الملائكة", "الصحابة", "الجن"],
    correctAnswer: "الرسول",
    score: 1,
  },
  {
    id: 9,
    question: "معنى أعوذ _____.",
    options: ["أحتمي", "أعتصم", "أبتعد", "أدعو"],
    correctAnswer: "أعتصم",
    score: 1,
  },
  {
    id: 10,
    question: "المعوذتان هما _____.",
    options: [
      "الفلق والناس",
      "الفاتحة والإخلاص",
      "الناس والإخلاص",
      "الكوثر والفلق",
    ],
    correctAnswer: "الفلق والناس",
    score: 1,
  },
  {
    id: 11,
    question: "الوسواس الخناس هو _____.",
    options: ["الشيطان", "الإنسان", "الملك", "النفس"],
    correctAnswer: "الشيطان",
    score: 1,
  },
  {
    id: 12,
    question: "الوسواس لأنه يوسوس للناس _____.",
    options: ["في العلن", "في الخفاء", "في الأحلام", "في الصوت العالي"],
    correctAnswer: "في الخفاء",
    score: 1,
  },
  {
    id: 13,
    question: "الخناس هو _____.",
    options: ["المتراجع", "المتقدم", "المتشدد", "المتعالي"],
    correctAnswer: "المتراجع",
    score: 1,
  },
  {
    id: 14,
    question: "من شر غاسق إذا وقب، أي من شر _____.",
    options: [
      "الليل إذا دخل ظلامه",
      "الرياح العاتية",
      "الشمس عند الغروب",
      "النجوم الساقطة",
    ],
    correctAnswer: "الليل إذا دخل ظلامه",
    score: 1,
  },
  {
    id: 15,
    question: "النفاثات في العقد هم _____.",
    options: ["السحرة", "الجن", "الملائكة", "العلماء"],
    correctAnswer: "السحرة",
    score: 1,
  },
];

// Helper function to shuffle options once and store the result
export function shuffleQuestions(questions) {
  return questions.map((question) => ({
    ...question,
    options: shuffleArray([...question.options]), // Shuffle options only once
  }));
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
