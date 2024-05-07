import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateField } from "/src/store/reducers/raceForm";
import PillarsSelector from "/src/components/PillarsSelector";
import Planning from "./components/forms/Planning";
import Goals from "./components/forms/Goals";
import Media from "./components/forms/Media";
import Content from "./components/forms/Content";
import Experience from "./components/forms/Experience";
import Conversational from "./components/forms/Conversational";

const getForm = (step, plan, handleSubmit) => {
  switch (step) {
    case 0:
      return <Planning fields={plan.planning} handleSubmit={handleSubmit} />;
    case 1:
      return <Goals fields={plan.goals} handleSubmit={handleSubmit} />;
    case 2:
      return <Media fields={plan.media} handleSubmit={handleSubmit} />;
    case 3:
      return <Content fields={plan.content} handleSubmit={handleSubmit} />;
    case 4:
      return (
        <Experience fields={plan.experience} handleSubmit={handleSubmit} />
      );
    case 5:
      return (
        <Conversational
          fields={plan.conversational}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <h1>Ooops... Step not found.</h1>;
  }
};

const Engage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { engage } = useSelector((state) => state.raceForm);
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
          {getForm(currentPillar, engage, handleSubmit)}
        </div>
      </div>
    </div>
  );
};

export default Engage;
