import { useState } from "react";
import PillarsSelector from "../../../components/PillarsSelector";
const Act = () => {
  const [currentPillar, setCurrentPillar] = useState(0);
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      <div className="col-span-12">
        <p className="text-sm text-gray-400">Pillars of Digital Success</p>
      </div>
      <div className="col-span-12">
        <PillarsSelector value={currentPillar} handleChange={setCurrentPillar} />
      </div>
    </div>
  );
};

export default Act;
