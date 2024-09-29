import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/signin"); // Redirige a la página de login
};

export default HomePage;
