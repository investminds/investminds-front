import { Input, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../../../services/auth";

const ResetPasswordForm = ({ handleCancel, email }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitResetPassword = async (code, password) => {
    try {
      await authService.resetPassword(code, email, password);
      toast.success("Senha alterada com sucesso.");
      navigate("/login");
    } catch (error) {
      if (error.response.data.error === "Invalid code.") {
        toast.error("Código inválido.");
        return;
      }
      if (error.response.data.error === "Token expired.") {
        toast.error("Código expirado.");
        return;
      }
      toast.error("Erro ao alterar senha");
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (!code) {
      setError("O código de recuperação é obrigatório!");
      setIsLoading(false);

      return;
    }
    if (password !== confirmPassword) {
      setError("Senhas não são iguais!");
      setIsLoading(false);
      return;
    }

    await handleSubmitResetPassword(code, password);

    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {error && <p className="mb-2 text-red-500">{error}</p>}

      <form
        className="flex flex-col items-center justify-center gap-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center w-full gap-y-2">
          <p className="text-sm text-zinc-400">
            Insira o código de recuperação enviado para o seu email.
          </p>
          <Input.OTP
            id="code"
            length={6}
            onChange={setCode}
            size="large"
            value={code}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Nova senha:
          </label>
          <input
            disabled={isLoading}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            min={6}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirme sua nova senha:
          </label>
          <input
            disabled={isLoading}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            min={6}
          />
          {isLoading ? (
            <div className="flex items-center justify-center w-full mt-4">
              <Spin />
            </div>
          ) : (
            <>
              <button
                type="submit"
                className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-4"
              >
                Confirmar
              </button>
              <button
                type="button"
                className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-4"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Voltar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
