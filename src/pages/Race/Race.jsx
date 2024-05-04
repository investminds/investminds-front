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
const steps = [
  {
    title: "About",
    description: "Tell us about your company",
    icon: <LuBadgeInfo />,
  },
  {
    title: "Plan",
    description: "Define your strategy",
    icon: <LuClipboardSignature />,
  },
  {
    title: "Reach",
    description: "Grow your audience",
    icon: <AiOutlineGlobal />,
  },
  {
    title: "Act",
    description: "Prompt interactions, subscribers and leads",
    icon: <TbHandClick />,
  },
  {
    title: "Convert",
    description: "Achieve sales online oroffline",
    icon: <MdOutlinePriceChange />,
  },
  {
    title: "Engage",
    description: "Encourage repeat business",
    icon: <GrGroup />,
  },
  {
    title: "Finish",
    description: "Review and send it",
    icon: <AiOutlineFileDone />,
  },
];

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
  return (
    <div className="grid p-4 bg-white rounded-md gird-cols-12">
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
