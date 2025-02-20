"use client";
import React, { useState, useEffect } from "react";

const StudentsTable = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="p-2">
      <h2 className="text-lg semi mb-4 text-secondary">
        عدد المستخدمين: {users.length}
      </h2>
      {users.length > 0 ? (
        users.map((user, idx) => (
          <div key={idx} className="p-2 border-b">
            <h3 className="text-main semi">
              {idx + 1}. {user.name}
            </h3>
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
