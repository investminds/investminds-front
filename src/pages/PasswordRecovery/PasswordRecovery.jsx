import { useState } from "react";
import RequestRecoveryForm from "./components/RequestRecoveryForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

const RecoverySteps = (step, email, handleSuccessRecovery, setCurrentStep) => {
  switch (step) {
    case 1:
      return (
        <RequestRecoveryForm
          handleSuccess={(email) => handleSuccessRecovery(email)}
        />
      );
    case 2:
      return (
        <ResetPasswordForm
          email={email}
          handleCancel={() => setCurrentStep(1)}
        />
      );
    default:
      return <RequestRecoveryForm handleSuccess={() => setCurrentStep(2)} />;
  }
};

const PasswordRecovery = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleSuccessRecovery = (email) => {
    setCurrentStep(2);
    setEmail(email);
  };

  return (
    <div>
      <section className="flex items-center justify-center max-h-screen hero">
        <div className="w-full p-8 bg-white rounded shadow-md sm:w-96">
          <h1 className="mb-4 text-2xl font-bold text-center">
            Recuperar senha
          </h1>
          {RecoverySteps(
            currentStep,
            email,
            handleSuccessRecovery,
            setCurrentStep
          )}
        </div>
      </section>
    </div>
  );
};

export default PasswordRecovery;
