"use client";
import { useState, useEffect } from "react";
import { questions } from "../data/quiz";
import Header from "../components/Header";
import Logo from "../components/Logo";
import axios from "axios"; // For making HTTP requests
import Notification from "../components/Notification"; // Import Notification component

// Shuffle function for options
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

  useEffect(() => {
    // Shuffle options only once when the component is mounted
    const shuffled = questions.map((question) => ({
      ...question,
      options: shuffleArray([...question.options]), // Shuffle the options for each question
    }));

    setShuffledQuestions(shuffled);

    const userId = localStorage.getItem("userId");

    const checkSubmission = async () => {
      try {
        const response = await axios.get(
          `https://ramadan-server-topaz.vercel.app/api/status/${userId}`
        );
        if (response.data.alreadySubmitted) {
          setQuizSubmitted(true);
        }
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };

    checkSubmission();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`https://ramadan-server-topaz.vercel.app/api/users/${userId}`)
        .then((response) => {
          // Set the user data to state
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle selection of answers
  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const userIdd = localStorage.getItem("userId");
    setLoading(true);
    // Ensure all questions have an answer before submitting
    const unansweredQuestions = shuffledQuestions.filter((q) => !answers[q.id]);

    if (unansweredQuestions.length > 0) {
      setNotification({
        message: "Please answer all questions before submitting.",
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
        message: response.data.message || "Quiz submitted successfully!",
        type: "success",
      });
    } catch (error) {
      setLoading(false);

      console.error("Error submitting answers:", error);
      setNotification({
        message:
          "There was an error submitting your answers. Please try again.",
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
        <h2 className="text-xl bold text-main my-4 text-center">
          املأ الفراغ بالجواب المناسب
        </h2>

        {/* Display the message if quiz is already submitted */}
        {quizSubmitted ? (
          <p className="text-center text-lg bold text-secondary">
            لقد أتممت هذه المسابقة مُسبقاً!
          </p>
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
            className="mt-4 p-2 semi bg-secondary text-white rounded"
            onClick={handleSubmit}
            disabled={submitted}
          >
            {loading ? "جاري الإرسال" : "إرســــــال"}
          </button>
        )}

        {/* Display notification */}
        <Notification message={notification.message} type={notification.type} />
      </div>
    </>
  );
};

export default FillInBlankQuiz;
