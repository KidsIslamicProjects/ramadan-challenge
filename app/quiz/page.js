"use client";
import { useState, useEffect } from "react";
import { questions } from "../data/quiz";
import Header from "../components/Header";
import Logo from "../components/Logo";
import axios from "axios";
import Notification from "../components/Notification";
import { useRouter } from "next/navigation";
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const FillInBlankQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/signup");
      return;
    }
    const shuffled = questions.map((question) => ({
      ...question,
      options: shuffleArray([...question.options]),
    }));

    setShuffledQuestions(shuffled);

    const checkSubmission = async () => {
      try {
        const response = await axios.get(
          `https://ramadan-server-topaz.vercel.app/api/status/${userId}`
        );
        if (response.data.alreadySubmitted) {
          setQuizSubmitted(true);
          fetchTotalScore(userId); // Fetch the score if already submitted
        }
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };

    checkSubmission();
  }, []);

  const fetchTotalScore = async (userId) => {
    try {
      const response = await axios.get(
        `https://ramadan-server-topaz.vercel.app/api/answers/${userId}`
      );

      const userScore = response.data.find(
        (item) => item.userId._id === userId
      );

      if (userScore) {
        setTotalScore(userScore.totalScore);
      } else {
        console.log("User score not found.");
      }
    } catch (error) {
      console.error("Error fetching total score:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`https://ramadan-server-topaz.vercel.app/api/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const userIdd = localStorage.getItem("userId");
    setLoading(true);
    const unansweredQuestions = shuffledQuestions.filter((q) => !answers[q.id]);

    if (unansweredQuestions.length > 0) {
      setLoading(false);

      setNotification({
        message: "الرجاء أجب عن جميع الأسئلة.",
        type: "error",
      });
      return;
    }

    try {
      const userId = userIdd;
      const answerData = shuffledQuestions.map((q) => ({
        question: q.question,
        selectedAnswer: answers[q.id] || "",
        correctAnswer: q.correctAnswer,
        score: q.score,
      }));

      const response = await axios.post(
        "https://ramadan-server-topaz.vercel.app/api/answers",
        {
          userId,
          answers: answerData,
        }
      );
      setLoading(false);

      setNotification({
        message: "تمّ إرسال الإجابات بنجاح! رضي الله عنك",
        type: "success",
      });
    } catch (error) {
      setLoading(false);

      setNotification({
        message: "حدث خطأ ما، الرجاء اعادة المحاولة",
        type: "error",
      });
    }
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <div dir="rtl" className="bg-white min-h-screen flex flex-col py-8 px-4">
        <Logo />
        {quizSubmitted ? (
          <p className="text-center text-lg bold text-secondary">
            لقد أتممت هذه المسابقة مُسبقاً!
          </p>
        ) : (
          <>
            <h2 className="text-xl bold text-main my-4 text-center">
              املأ الفراغ بالجواب المناسب
            </h2>
            <p className="text-secondary text-center regular">
              بعد مشاهداتك لمقاطع سارة وسعود، املأ الفراغات في الأسئلة باختيارك
              للجواب الصحيح
            </p>
          </>
        )}

        {quizSubmitted && totalScore !== null && (
          <div className="text-center my-4">
            <p className="text-lg semi text-main">
              مجموعك هو: {totalScore} من 15
            </p>
          </div>
        )}

        {quizSubmitted ? (
          <></>
        ) : (
          shuffledQuestions.map((q) => (
            <div key={q.id} className="mb-4 p-4">
              <p className="mb-2 semi text-main">
                {q.question.replace("_____", "______")}
              </p>
              <div className="grid grid-cols-2 semi gap-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={`p-2 border text-sm rounded ${
                      submitted
                        ? option === q.correctAnswer
                          ? "bg-green-700 text-white"
                          : answers[q.id] === option
                          ? "bg-red-700 text-white"
                          : "bg-[#f7f6f6]"
                        : answers[q.id] === option
                        ? "bg-main text-white"
                        : "bg-[#f7f6f6]"
                    }`}
                    onClick={() => handleSelect(q.id, option)}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}

        {quizSubmitted ? (
          <></>
        ) : (
          <button
            dir="rtl"
            className="mt-4 p-2 semi bg-secondary text-white rounded"
            onClick={handleSubmit}
            disabled={submitted}
          >
            {loading ? "جاري الإرسال..." : "إرســــــال"}
          </button>
        )}

        <Notification message={notification.message} type={notification.type} />
      </div>
    </>
  );
};

export default FillInBlankQuiz;
