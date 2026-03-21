"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaPlay,
  FaStar,
  FaLock,
  FaTimes,
  FaCheck,
  FaTrophy,
} from "react-icons/fa";

// ─────────────────────────────────────────────
// 📦 STATIC DATA — Stages + Per-Episode Quizzes
// ─────────────────────────────────────────────
const COURSE_STAGES = [
  {
    id: 1,
    title: "الدرس الأول: ما دينك؟",
    description: "نتعرف على ديننا الإسلام وأركانه الخمسة العظيمة.",
    videoId: "7q28xjPFIl8",
    duration: "15 دقيقة",
    isLocked: false,
    color: "bg-blue-700",
    shadow: "shadow-blue-200",
    quiz: {
      type: "matching",
      title: "وصّل كل عبارة بما يناسبها",
      pairs: [
        { id: 1, right: "ديننا", left: "الإسلام" },
        { id: 2, right: "نبينا", left: "محمد ﷺ" },
        { id: 3, right: "كتابنا", left: "القرآن الكريم" },
        { id: 4, right: "قبلتنا", left: "الكعبة المشرفة" },
      ],
    },
  },
  {
    id: 2,
    title: "الدرس الثاني: من نبيك؟",
    description: "قصة نبينا محمد ﷺ، نسبه، وولادته في مكة.",
    videoId: "hYfpprV4NVI",
    duration: "14 دقيقة",
    isLocked: false,
    color: "bg-purple-700",
    shadow: "shadow-purple-200",
    quiz: {
      type: "matching",
      title: "وصّل كل معلومة بما يناسبها",
      pairs: [
        { id: 1, right: "مولد النبي ﷺ", left: "مكة المكرمة" },
        { id: 2, right: "قبيلة النبي ﷺ", left: "قريش" },
        { id: 3, right: "والد النبي ﷺ", left: "عبدالله" },
        { id: 4, right: "جدّ النبي ﷺ", left: "عبدالمطلب" },
      ],
    },
  },
  {
    id: 3,
    title: "الدرس الثالث: المراجعة النهائية",
    description: "مراجعة الأصول الثلاثة ومن هم المؤمنون؟",
    videoId: "E_cB7NHKC1g",
    duration: "15 دقيقة",
    isLocked: false,
    color: "bg-green-700",
    shadow: "shadow-green-200",
    quiz: {
      type: "matching",
      title: "راجع معلوماتك — وصّل الأعمدة",
      pairs: [
        { id: 1, right: "الأصل الأول", left: "معرفة الله" },
        { id: 2, right: "الأصل الثاني", left: "معرفة النبي ﷺ" },
        { id: 3, right: "الأصل الثالث", left: "معرفة دين الإسلام" },
        { id: 4, right: "عدد أركان الإسلام", left: "خمسة أركان" },
      ],
    },
  },
];

// ─────────────────────────────────────────────
// 🏆 FINAL QUIZ — Covers the entire course
// ─────────────────────────────────────────────
const FINAL_QUIZ = {
  type: "matching",
  title: "الاختبار النهائي — وصّل وأثبت تفوّقك! 🏆",
  pairs: [
    { id: 1, right: "ديننا", left: "الإسلام" },
    { id: 2, right: "نبينا", left: "محمد ﷺ" },
    { id: 3, right: "مولد النبي ﷺ", left: "مكة المكرمة" },
    { id: 4, right: "الأصل الأول", left: "معرفة الله" },
    { id: 5, right: "عدد أركان الإسلام", left: "خمسة أركان" },
    { id: 6, right: "كتابنا", left: "القرآن الكريم" },
  ],
};

// ─────────────────────────────────────────────
// 🧩 MATCHING QUIZ COMPONENT
// ─────────────────────────────────────────────
function MatchingQuiz({ quiz, onComplete }) {
  const [leftItems, setLeftItems] = useState(quiz.pairs); // start unshuffled (SSR-safe)

  // Shuffle only on the client after mount to avoid hydration mismatch
  useEffect(() => {
    setLeftItems([...quiz.pairs].sort(() => Math.random() - 0.5));
  }, [quiz]);
  const [selectedRight, setSelectedRight] = useState(null); // id of selected right item
  const [selectedLeft, setSelectedLeft] = useState(null); // id of selected left item
  const [matched, setMatched] = useState([]); // array of matched pair ids
  const [wrongPair, setWrongPair] = useState(null); // { right, left } that was wrong
  const [stars, setStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  const totalPairs = quiz.pairs.length;
  const isComplete = matched.length === totalPairs;

  useEffect(() => {
    if (isComplete && !finished) {
      setFinished(true);
      setTimeout(() => onComplete && onComplete(stars), 800);
    }
  }, [isComplete]);

  function handleRightClick(pairId) {
    if (matched.includes(pairId)) return;
    setSelectedRight(pairId);
    setWrongPair(null);
    // If left already selected → try to match
    if (selectedLeft !== null) {
      tryMatch(pairId, selectedLeft);
    }
  }

  function handleLeftClick(pairId) {
    if (matched.includes(pairId)) return;
    setSelectedLeft(pairId);
    setWrongPair(null);
    // If right already selected → try to match
    if (selectedRight !== null) {
      tryMatch(selectedRight, pairId);
    }
  }

  function tryMatch(rightId, leftId) {
    setAttempts((a) => a + 1);
    if (rightId === leftId) {
      // ✅ Correct
      const pointsEarned = attempts === 0 ? 20 : 10; // bonus for first try
      setStars((s) => s + pointsEarned);
      setMatched((m) => [...m, rightId]);
      setSelectedRight(null);
      setSelectedLeft(null);
    } else {
      // ❌ Wrong
      setWrongPair({ right: rightId, left: leftId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedRight(null);
        setSelectedLeft(null);
      }, 700);
    }
  }

  function getLeftLabel(pairId) {
    return quiz.pairs.find((p) => p.id === pairId)?.left;
  }

  if (finished) {
    const maxStars = totalPairs * 20;
    const percent = Math.round((stars / maxStars) * 100);
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center border-4 border-yellow-200">
        <div className="text-6xl mb-4">
          {percent === 100 ? "🏆" : percent >= 75 ? "🌟" : "💪"}
        </div>
        <h3 className="text-2xl font-bold text-main mb-1">
          {percent === 100
            ? "ممتاز! أجبت بشكل مثالي!"
            : percent >= 75
              ? "أحسنت! نتيجة رائعة!"
              : "حاول مرة أخرى!"}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          حصلت على {stars} نجمة من {maxStars}
        </p>
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: totalPairs }).map((_, i) => (
            <FaStar
              key={i}
              className={`w-7 h-7 ${i < Math.round((stars / maxStars) * totalPairs) ? "text-yellow-400" : "text-gray-200"}`}
            />
          ))}
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">يمكنك المتابعة للدرس التالي ✨</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-100">
      {/* Quiz Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-md">
          <span className="text-white text-lg">🔗</span>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            تمرين الوصل
          </p>
          <h3 className="text-base font-bold text-main leading-tight">
            {quiz.title}
          </h3>
        </div>
        {/* Stars counter */}
        <div className="mr-auto flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
          <FaStar className="text-yellow-400 w-3 h-3" />
          <span className="text-yellow-600 font-bold text-sm">{stars}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-5 justify-center">
        {quiz.pairs.map((p) => (
          <div
            key={p.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              matched.includes(p.id) ? "bg-green-400 scale-125" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-2 gap-3" dir="rtl">
        {/* Right Column — Fixed prompts */}
        <div className="space-y-3">
          <p className="text-center text-xs text-gray-400 font-bold mb-2">
            السؤال
          </p>
          {quiz.pairs.map((pair) => {
            const isMatched = matched.includes(pair.id);
            const isSelected = selectedRight === pair.id;
            const isWrong = wrongPair?.right === pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => handleRightClick(pair.id)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-2xl text-sm font-bold transition-all duration-200 border-2 text-right
                  ${
                    isMatched
                      ? "bg-green-50 border-green-300 text-green-700 cursor-default"
                      : isWrong
                        ? "bg-red-50 border-red-300 text-red-600 animate-shake"
                        : isSelected
                          ? "bg-main/10 border-main text-main scale-105 shadow-md"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-main/40 hover:bg-main/5 active:scale-95"
                  }`}
              >
                {isMatched && (
                  <FaCheck className="inline ml-2 text-green-500" />
                )}
                {pair.right}
              </button>
            );
          })}
        </div>

        {/* Left Column — Shuffled answers */}
        <div className="space-y-3">
          <p className="text-center text-xs text-gray-400 font-bold mb-2">
            الجواب
          </p>
          {leftItems.map((pair) => {
            const isMatched = matched.includes(pair.id);
            const isSelected = selectedLeft === pair.id;
            const isWrong = wrongPair?.left === pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-2xl text-sm font-bold transition-all duration-200 border-2 text-right
                  ${
                    isMatched
                      ? "bg-green-50 border-green-300 text-green-700 cursor-default"
                      : isWrong
                        ? "bg-red-50 border-red-300 text-red-600 animate-shake"
                        : isSelected
                          ? "bg-secondary/10 border-secondary text-secondary scale-105 shadow-md"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-secondary/40 hover:bg-secondary/5 active:scale-95"
                  }`}
              >
                {isMatched && (
                  <FaCheck className="inline ml-2 text-green-500" />
                )}
                {pair.left}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-[11px] text-gray-300 mt-4">
        اضغط على عبارة من كل عمود لتوصيلهما ✨
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 📄 MAIN PAGE
// ─────────────────────────────────────────────
export default function CourseStagesPage({ params }) {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState(COURSE_STAGES[0]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // stage ids
  const [showFinalQuiz, setShowFinalQuiz] = useState(false);
  const [finalQuizDone, setFinalQuizDone] = useState(false);
  const [quizKey, setQuizKey] = useState(0); // force remount on stage change

  const allEpisodesDone = COURSE_STAGES.every((s) =>
    completedQuizzes.includes(s.id),
  );

  function handleStageClick(stage) {
    if (stage.isLocked) return;
    setActiveStage(stage);
    setQuizKey((k) => k + 1); // remount quiz for new stage
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEpisodeQuizComplete(stageId, stars) {
    if (!completedQuizzes.includes(stageId)) {
      setCompletedQuizzes((prev) => [...prev, stageId]);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-12">
      {/* HEADER */}
      <header className="bg-main text-white p-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-xl -ml-5 -mb-5" />
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <button
            onClick={() => router.back()}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all backdrop-blur-sm"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">منظومة الأصول الثلاثة</h1>
            <p className="text-white/80 text-xs">
              أكمل المراحل لتحصل على الكأس! 🏆
            </p>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* VIDEO PLAYER */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-white ring-4 ring-gray-50/50">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeStage.videoId}?rel=0&modestbranding=1`}
              title={activeStage.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          <div className="mt-4 px-2">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-bold ${activeStage.color}`}
              >
                المرحلة {activeStage.id}
              </span>
              <h2 className="text-xl font-bold text-gray-800">
                {activeStage.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {activeStage.description}
            </p>
          </div>
        </div>

        {/* ── PER-EPISODE QUIZ ── */}
        {activeStage.quiz && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gray-200 rounded" />
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                اختبر نفسك بعد الدرس
              </span>
              <div className="h-px flex-1 bg-gray-200 rounded" />
            </div>
            <MatchingQuiz
              key={quizKey}
              quiz={activeStage.quiz}
              onComplete={(stars) =>
                handleEpisodeQuizComplete(activeStage.id, stars)
              }
            />
          </div>
        )}

        {/* STAGES MAP */}
        <div className="relative pt-8 pb-12">
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-gray-200 rounded-full md:right-1/2 md:left-auto z-0" />
          <div className="space-y-12 relative z-10">
            {COURSE_STAGES.map((stage, index) => {
              const isActive = activeStage.id === stage.id;
              const isDone = completedQuizzes.includes(stage.id);
              return (
                <div
                  key={stage.id}
                  onClick={() => handleStageClick(stage)}
                  className={`relative flex items-center gap-6 transition-all duration-300 cursor-pointer group
                    ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                    ${stage.isLocked ? "cursor-not-allowed" : ""}
                  `}
                >
                  {/* Node */}
                  <div
                    className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300
                    ${isActive ? `scale-110 ${stage.color} text-white` : isDone ? "bg-green-500 text-white" : "bg-white text-gray-400 hover:scale-105"}
                    ${stage.isLocked ? "grayscale opacity-70" : ""}
                  `}
                  >
                    {stage.isLocked ? (
                      <FaLock className="w-6 h-6" />
                    ) : isDone ? (
                      <FaCheck className="w-6 h-6" />
                    ) : isActive ? (
                      <FaPlay className="w-6 h-6 ml-1 animate-pulse" />
                    ) : (
                      <span className="text-2xl font-bold">{stage.id}</span>
                    )}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 text-yellow-400 bg-white rounded-full p-1 shadow-sm">
                        <FaStar className="w-4 h-4" />
                      </div>
                    )}
                    {isDone && !isActive && (
                      <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center shadow">
                        <FaStar className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 bg-white p-4 rounded-2xl shadow-md border-b-4 transition-all
                    ${isActive ? "border-main/50" : isDone ? "border-green-200" : "border-transparent hover:shadow-lg"}
                    ${stage.isLocked ? "opacity-60" : ""}
                  `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3
                        className={`font-bold text-lg ${isActive ? "text-main" : isDone ? "text-green-600" : "text-gray-700"}`}
                      >
                        {stage.title}
                      </h3>
                      <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {stage.description}
                    </p>
                    {isDone && (
                      <span className="inline-block mt-2 text-[10px] bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">
                        ✅ أكملت الاختبار
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finish / Final Quiz trigger */}
          <div className="flex justify-center mt-12 relative z-10">
            {allEpisodesDone && !finalQuizDone ? (
              <button
                onClick={() => setShowFinalQuiz(true)}
                className="bg-secondary text-white px-8 py-3 rounded-full shadow-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
              >
                <FaTrophy className="text-yellow-100" />
                ابدأ الاختبار النهائي!
              </button>
            ) : finalQuizDone ? (
              <div className="bg-green-500 text-white px-8 py-3 rounded-full shadow-xl font-bold text-sm flex items-center gap-2">
                <FaTrophy />
                أكملت المساق بنجاح! 🎉
              </div>
            ) : (
              <div className="bg-gray-100 text-gray-400 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <FaStar className="text-gray-300" />
                أكمل جميع الدروس للوصول للاختبار النهائي
              </div>
            )}
          </div>
        </div>

        {/* ── FINAL QUIZ ── */}
        {showFinalQuiz && !finalQuizDone && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-yellow-200 rounded" />
              <span className="text-xs font-bold text-yellow-500 whitespace-nowrap flex items-center gap-1">
                <FaTrophy /> الاختبار النهائي
              </span>
              <div className="h-px flex-1 bg-yellow-200 rounded" />
            </div>
            <MatchingQuiz
              key="final"
              quiz={FINAL_QUIZ}
              onComplete={() => setFinalQuizDone(true)}
            />
          </div>
        )}

        {finalQuizDone && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold text-main mb-2">
              مبروك! أتممت المساق
            </h2>
            <p className="text-gray-500 text-sm">
              لقد أكملت منظومة الأصول الثلاثة بنجاح.
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} className="text-yellow-400 w-6 h-6" />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
