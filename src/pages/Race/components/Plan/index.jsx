import { useState } from "react";
import PillarsSelector from "/src/components/PillarsSelector";
import { useDispatch, useSelector } from "react-redux";
import Planning from "./components/forms/Planning";
import { useTranslation } from "react-i18next";
import { updateField } from "/src/store/reducers/raceForm";

const getForm = (step, plan, handleSubmit) => {
  switch (step) {
    case 0:
      return <Planning fields={plan.planning} handleSubmit={handleSubmit} />;
    default:
      return <h1>Ooops... Step not found.</h1>;
  }
};

const Plan = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { plan } = useSelector((state) => state.raceForm);
  const [currentPillar, setCurrentPillar] = useState(0);

  const handleSubmit = (field, value) =>
    dispatch(updateField({ field, value }));

  return (
    <div className="grid grid-cols-12 mt-8">
      <div className="col-span-12">
        <PillarsSelector
          value={currentPillar}
          handleChange={setCurrentPillar}
        />
        <div className="col-span-12 mt-4 text-gray-800 text-md">
          {t("race_audit_of_current_capabilities")}
        </div>
        <div className="col-span-12 text-sm text-gray-400">
          {t("race_check_activities")}
        </div>

        <div className="col-span-12 mt-4">
          {getForm(currentPillar, plan, handleSubmit)}
        </div>
      </div>
    </div>
  );
};

export default Plan;
