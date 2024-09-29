"use client";

import Aside from "@/components/Aside/aside";
import Header from "@/components/header/header";
import { createContext, useEffect, useState } from "react";
import {} from "vm";

// Contexto inicial
const initialContext = {
  user: "",
  setEndSession: () => {},
};

// Crear el contexto
export const ProtectedContext = createContext<{
  user: string;
  setEndSession: (value: boolean) => void; // Función que recibe un booleano
}>(initialContext);

const ProtectedPage = () => {
  const [haveAccess, setHaveAccess] = useState<boolean>(false);
  const [endSession, setEndSession] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");

  useEffect(() => {
    if (endSession) {
      const apiLogOutRequest = async () => {
        console.log(endSession);

        try {
          // const response = await fetch("http://localhost:1234/logout", {
          const response = await fetch(
            "https://auth-user-m8g4168vv-arturo-acostas-projects.vercel.app/logout",
            {
              method: "POST",
              credentials: "include",
              mode: "cors",
            }
          );

          if (!response.ok) {
            // Redirigir a la página de error si no se tiene acceso
            return; // Salir de la función
          }
        } catch (error: any) {
          throw new Error(error);
        }
      };
      apiLogOutRequest();

      window.location.href = "/";
    }
  }, [endSession]);

  useEffect(() => {
    const apiRequest = async () => {
      try {
        // const response = await fetch("http://localhost:1234/protected", {
        const response = await fetch(
          "https://auth-user-m8g4168vv-arturo-acostas-projects.vercel.app/protected",
          {
            method: "GET",
            credentials: "include",
            mode: "cors",
          }
        );

        if (!response.ok) {
          // Redirigir a la página de error si no se tiene acceso
          window.location.href = "/login-error";
          return; // Salir de la función
        }

        const data = await response.json();

        setUser(data.username); // Asegúrate de que esto sea correcto según lo que devuelves
        setHaveAccess(true);
      } catch (error) {
        // Redirigir en caso de error
        console.log(error);
        window.location.href = "/login-error";
      }
    };

    apiRequest();
  }, []);

  return (
    haveAccess && (
      <ProtectedContext.Provider value={{ user, setEndSession }}>
        <section className="w-screen h-screen bg-slate-950 flex">
          <Aside />
          <Header />
        </section>
      </ProtectedContext.Provider>
    )
  ); // No mostrar nada mientras redirige
};

export default ProtectedPage;
