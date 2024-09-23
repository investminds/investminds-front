import { Spin } from "antd";
import { useState } from "react";
import authService from "../../../services/auth";


const RequestRecoveryForm = ({ handleSuccess }) => {
  const [loadingSendCode, setLoadingSendCode] = useState(false);

  const sendRecoveryCodeToEmail = async (event) => {
    try {
      setLoadingSendCode(true);
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get("email");
      await authService.forgotPassword(email);
      setLoadingSendCode(false);
      handleSuccess(email);
    } catch (error) {
        console.log("Error: ", error);
      if (error.response.data.error === "User not found") {
        toast.error("Email não cadastrado.");
      }
    }
  };

  return (
    <form onSubmit={sendRecoveryCodeToEmail}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Informe o email cadastrado:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          disabled={loadingSendCode}
        />
        {loadingSendCode ? (
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
          </>
        )}
      </div>
    </form>
  );
};

export default RequestRecoveryForm;
