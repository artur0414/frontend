const LoginError = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="mt-2">
          No se pudo iniciar sesión. Verifica tu nombre de usuario y contraseña.
        </p>
        <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Intenta de nuevo
        </a>
      </div>
    </div>
  );
};

export default LoginError;
