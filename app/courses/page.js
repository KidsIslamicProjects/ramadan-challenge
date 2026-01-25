// app/courses/page.jsx
import { redirect } from "next/navigation";
import CoursesList from "../components/CoursesList";

async function getUser() {
  return { id: 1, name: "Kiddo" }; // Change to null to test redirect
}

// Mock Data Fetching
const CATEGORIES = [
  {
    id: 1,
    title: "المساق العلمي",
    courses: [
      { id: 101, title: "عالم الفضاء", slug: "space-science" },
      { id: 102, title: "جسم الإنسان", slug: "human-body" },
    ],
  },
  {
    id: 2,
    title: "المساق الأدبي",
    courses: [],
  },
];

export default async function CoursesPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?error=must_register");
  }

  return (
    <main className="min-h-screen bg-surface p-4 md:p-8 font-regular" dir="rtl">
      <header className="text-center mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
          مكتبة التعلم 📚
        </h1>
        <p className="text-thirdly opacity-80 font-regular">
          اختر مساقك المفضل وابدأ التحدي
        </p>
      </header>

      <CoursesList categories={CATEGORIES} />
    </main>
  );
}
