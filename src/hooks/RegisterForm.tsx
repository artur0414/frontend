"use client";
import { createContext, useState } from "react";

interface InitialContext {
  username: string;
}

const initialContext = {
  username: "",
};

export const RegisterContext = createContext<InitialContext>(initialContext);

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false); // Estado para el preloader

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Inicia el preloader
    try {
      if (repeatPassword !== password) {
        setPasswordError(true);
        return;
      }

      // const result = await fetch("http://localhost:1234/register", {
      const result = await fetch(
        "https://auth-user-m8g4168vv-arturo-acostas-projects.vercel.app/register",
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
        throw new Error(errorData.error || "register failed"); // Cambia message por error
      }

      setUsername("");
      setPassword("");
      setRepeatPassword("");
      setPasswordError(false);

      window.location.href = "/dashboard";
    } catch (error: any) {
      setMessage(error.message); // Actualiza el estado de error
    }
  };

  return (
    <RegisterContext.Provider value={{ username }}>
      <div className="w-[20%] h-[60%] p-5 flex flex-col items-start justify-start gap-7 shadow-md">
        <div className="w-[95%] m-0 p-0 flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Join Now</h2>
          <p className="text-xs text-zinc-700">Join to get access to our API</p>
        </div>

        <form
          className="w-[95%] flex flex-col justify-center gap-7"
          onSubmit={handleSubmit}
          action="formAction"
        >
          <input
            className="w-full border border-gray-300 h-12 pl-2 rounded-md"
            onChange={handleUsernameInput}
            type="username"
            id="register-username"
            name="username"
            value={username}
            placeholder="Username"
            maxLength={16} // Limita a 16 caracteres
            required
          />
          <input
            className="w-full border border-gray-300 h-12 pl-2 rounded-md"
            onChange={handlePasswordInput}
            type="password"
            id="register-password"
            name="password"
            value={password}
            placeholder="password"
            maxLength={16} // Limita a 16 caracteres
            required
          />
          <input
            className="w-full border border-gray-300 h-12 pl-2 rounded-md"
            onChange={handleRepeatPassword}
            type="password"
            id="repeat-password"
            name="password"
            value={repeatPassword}
            placeholder="repeat password"
            maxLength={16} // Limita a 16 caracteres
            required
          />
          {passwordError && <p>password doesn't match</p>}
          {message.length !== 0 && (
            <p className="text-red-400 text-xs">{message}</p>
          )}
          <button className="w-full h-12 bg-blue-600 mt-10 text-white rounded-3xl">
            Sign Up
          </button>
        </form>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="text-blue-600 ml-4">Cargando...</span>
          </div>
        )}
      </div>
    </RegisterContext.Provider>
  );
};

export default RegisterForm;
