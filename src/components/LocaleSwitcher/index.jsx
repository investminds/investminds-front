import { useTranslation } from "react-i18next";
import { supoortedLocales } from "../../config/translator.js";
import { MdGTranslate } from "react-icons/md";
import { Select } from "antd";

const options = Object.entries(supoortedLocales).map(([code, name]) => ({
  value: code,
  label: name,
}));

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md">
      <MdGTranslate />
      <Select
        value={i18n.resolvedLanguage}
        onChange={i18n.changeLanguage}
        options={options}
        variant="borderless"
      />
    </div>
  );
};

export default LocaleSwitcher;
