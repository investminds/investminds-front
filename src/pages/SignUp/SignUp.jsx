import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdvertiser, setIsAdvertiser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(""); // State to manage validation error message

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      // Check if email and confirmEmail match
      if (email !== confirmEmail) {
        setError("Emails não são iguais!");
        return;
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        setError("Senhas não são iguais!");
        return;
      }

      const payload = {
        email,
        password,
        name,
        cpf,
        role: isAdvertiser ? "advertiser" : "consumer",
      };

      // If validations pass, continue with signup logic

      await authService.register(payload);

      // Reset form fields and error state after successful submission (optional)
      setName("");
      setCpf("");
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setIsAdvertiser(false);

      toast.success("Usuário cadastrado com sucesso!");

      setIsLoading(false);
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.response.data.error === "User already exists") {
        toast.error("Usuário já cadastrado. Tente fazer login.");
      } else if (
        error.response.data.error === "User with this CPF already exists"
      ) {
        toast.error("Usuário com este CPF já cadastrado.");
      } else {
        toast.error("Erro ao cadastrar usuário. Tente novamente.");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center max-h-screen hero">
        <div className="w-full p-8 bg-white rounded shadow-md sm:w-96">
          <h1 className="mb-4 text-2xl font-bold text-center">
            Cadastre-se aqui!
          </h1>
          <form onSubmit={handleSubmit}>
            {error && <p className="mb-2 text-red-500">{error}</p>}
            <div className="grid grid-cols-1 gap-4">
              {/* Nome */}
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome:
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {/* CPF */}
              <div className="">
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-700"
                >
                  CPF:
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  maxLength={11}
                />
              </div>
              {/* Email */}
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  disabled={isLoading}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {/* Confirm Email */}
              <div className="">
                <label
                  htmlFor="confirmEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirme o Email:
                </label>
                <input
                  disabled={isLoading}
                  type="email"
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {/* Senha */}
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha:
                </label>
                <input
                  disabled={isLoading}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {/* Confirm Senha */}
              <div className="">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirme a Senha:
                </label>
                <input
                  disabled={isLoading}
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="">
                <Checkbox
                  onChange={() => setIsAdvertiser((prev) => !prev)}
                  disabled={isLoading}
                >
                  Deseja ser anunciante?
                </Checkbox>
              </div>
            </div>
            <Button
              htmlType="submit"
              type="submit"
              className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-4"
              loading={isLoading}
            >
              Cadastre-se
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
