"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiTrash } from "react-icons/hi"; // Importing the delete icon

const StudentsTable = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://ramadan-server-topaz.vercel.app/api/users`
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigate = (id) => {
    router.push(`/admin/students/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

    try {
      const response = await fetch(
        `https://ramadan-server-topaz.vercel.app/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("فشل في حذف المستخدم");

      // Remove user from UI after deletion
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-lg semi mb-4 text-secondary">
        عدد المستخدمين: {users.length}
      </h2>
      {users.length > 0 ? (
        users.map((user, idx) => (
          <div
            key={user._id}
            className="p-2 border-b flex justify-between items-center"
          >
            <h3
              className="text-main semi cursor-pointer hover:text-blue-500"
              onClick={() => handleNavigate(user._id)}
            >
              {idx + 1}. {user.name}
            </h3>
            <HiTrash
              className="text-red-600 cursor-pointer hover:text-red-800 text-xl"
              onClick={() => handleDelete(user._id)}
            />
          </div>
        ))
      ) : (
        <p className="semi text-main" dir="rtl">
          جاري تحميل البيانات...
        </p>
      )}
    </div>
  );
};

export default StudentsTable;
