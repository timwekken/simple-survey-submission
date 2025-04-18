export const getAuthToken = () => localStorage.getItem("authToken");

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = async () => {
  try {
    await fetch("http://localhost:5000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  }
};

export const Login = async (email: string, password: string) => {
  const loginResponse = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: { email, password } }),
  });
  if (!loginResponse.ok) {
    throw new Error(
      `Error: ${loginResponse.status} ${loginResponse.statusText}`
    );
  }
  const data = await loginResponse.json();
  // Store token and user data in local storage
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.data));
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};
