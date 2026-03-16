import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function login(email, password) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      message: null,
    };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return {
        success: false,
        data: null,
        message: error.response.data.message,
      };
    }

    return {
      success: false,
      data: null,
      message: "Something went wrong",
    };
  }
}

export async function register(username, email, password) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      message: null,
    };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return {
        success: false,
        data: null,
        message: error.response.data.message,
      };
    }

    return {
      success: false,
      data: null,
      message: "Something went wrong",
    };
  }
}

export async function getme() {
  const response = await api.get("/api/auth/get-me");

  return response.data.user;
}

export async function logout() {
  const response = await api.post("/api/auth/logout");

  return response.data.message;
}
