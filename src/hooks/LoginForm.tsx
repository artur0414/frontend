"use client";

import { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Limpiar los parámetros de la URL al cargar el componente
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setError("");
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      // const result = await fetch("http://localhost:1234/login", {
      const result = await fetch(
        "https://auth-user-m8g4168vv-arturo-acostas-projects.vercel.app/login",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if (!result.ok) {
        const errorData = await result.json(); // Suponiendo que el servidor devuelve un mensaje de error en JSON
        throw new Error(errorData.error || "Login failed"); // Cambia message por error
      }

      window.location.href = "/dashboard";
    } catch (error: unknown) {
      console.log(error);
      throw error; // Re-lanza el error para que pueda ser capturado en el componente
    }
  };

  return (
    <div className="w-[20%] h-[60%] p-5 flex flex-col items-start justify-start gap-7 shadow-md">
      <div className="w-[95%] m-0 p-0 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-xs text-zinc-700">Log in to get access to our API</p>
      </div>
      <form
        className="w-[95%] flex flex-col justify-center gap-10"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border border-gray-300 h-12 pl-2 rounded-md"
          onChange={handleUsernameInput}
          type="text" // Cambié "username" a "text"
          id="username"
          name="username"
          value={username}
          placeholder="Username"
          required
        />
        <input
          className="w-full border border-gray-300 h-12 pl-2 rounded-md"
          onChange={handlePasswordInput}
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Password"
          required
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button className="w-full h-12 bg-blue-600 text-white rounded-3xl">
          Log in
        </button>
      </form>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="text-blue-600 ml-4">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
