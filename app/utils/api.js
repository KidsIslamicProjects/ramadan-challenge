export const API_URL = "http://localhost:3001/api";

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("فشل في إنشاء الحساب، حاول مرة أخرى.");

    return data;
  } catch (error) {
    throw error;
  }
};
