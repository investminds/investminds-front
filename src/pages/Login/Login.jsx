import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <section className="hero min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Realize seu Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
