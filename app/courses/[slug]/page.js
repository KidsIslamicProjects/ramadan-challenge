// app/courses/[slug]/page.jsx
import { notFound, redirect } from "next/navigation";
import GamifiedMap from "../../components/Gamifiedmap";

// Mock Auth Check
async function getUser() {
  return { id: 1, name: "Kiddo" };
}

// Mock Database Fetch
async function getCourseData(slug) {
  // Simulating DB call
  if (slug === "space-science") {
    return {
      title: "عالم الفضاء",
      userProgress: 2, // User is at stage 2
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      stages: [
        { id: 1, title: "الانطلاق", isQuiz: true },
        { id: 2, title: "الكواكب", isQuiz: true },
        { id: 3, title: "النجوم", isQuiz: true },
        { id: 4, title: "الهبوط", isQuiz: true },
      ],
    };
  }
  return null;
}

export default async function CourseMapPage({ params }) {
  const user = await getUser();
  if (!user) redirect("/login");

  const course = await getCourseData(params.slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen bg-[#E0F2FE] p-4 font-regular" dir="rtl">
      <header className="text-center py-6 sticky top-0 bg-[#E0F2FE]/95 backdrop-blur-sm z-40 border-b border-white/20">
        <h1 className="text-2xl font-bold text-secondary">{course.title}</h1>
        <p className="text-thirdly text-sm">أكمل المراحل للوصول إلى الكنز</p>
      </header>

      <GamifiedMap courseData={course} />
    </main>
  );
}
