import { Steps } from "antd";
import { useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbHandClick } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { LuClipboardSignature, LuBadgeInfo } from "react-icons/lu";

import About from "./components/About";
import Plan from "./components/Plan";
import Reach from "./components/Reach";
import Act from "./components/Act";
import Convert from "./components/Convert";
import Engage from "./components/Engage";
import Finish from "./components/Finish";
import { useTranslation } from "react-i18next";

const getStepComponent = (step) => {
  switch (step) {
    case 0:
      return <About />;
    case 1:
      return <Plan />;
    case 2:
      return <Reach />;
    case 3:
      return <Act />;
    case 4:
      return <Convert />;
    case 5:
      return <Engage />;
    case 6:
      return <Finish />;
    default:
      return <h1>Ooops... Step not found.</h1>;
  }
};

const Race = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    {
      title: t("race_about"),
      description: t("race_about_description"),
      icon: <LuBadgeInfo />,
    },
    {
      title: t("race_plan"),
      description: t("race_plan_description"),
      icon: <LuClipboardSignature />,
    },
    {
      title: t("race_reach"),
      description: t("race_reach_description"),
      icon: <AiOutlineGlobal />,
    },
    {
      title: t("race_act"),
      description: t("race_act_description"),
      icon: <TbHandClick />,
    },
    {
      title: t("race_convert"),
      description: t("race_convert_description"),
      icon: <MdOutlinePriceChange />,
    },
    {
      title: t("race_engage"),
      description: t("race_engage_description"),
      icon: <GrGroup />,
    },
    {
      title: t("race_finish"),
      description: t("race_finish_description"),
      icon: <AiOutlineFileDone />,
    },
  ];

  return (
    <div className="grid p-8 bg-white rounded-md gird-cols-12">
      <div className="items-center col-span-12">
        <Steps
          items={steps}
          current={currentStep}
          onChange={setCurrentStep}
          size="small"
        />
      </div>
      <div className="col-span-12">{getStepComponent(currentStep)}</div>
    </div>
  );
};

export default Race;
