import { Radio } from "antd";
import { useTranslation } from "react-i18next";

const PillarsSelector = (props) => {
  const { value, handleChange } = props;
  const { t } = useTranslation();
  return (
    <Radio.Group
      defaultValue={0}
      value={value}
      buttonStyle="solid"
      onChange={(e) => handleChange(e.target.value)}
    >
      <Radio.Button value={0}>{t("pillar_planning")}</Radio.Button>
      <Radio.Button value={1}>{t("pillar_goals")}</Radio.Button>
      <Radio.Button value={2}>{t("pillar_media")}</Radio.Button>
      <Radio.Button value={3}>{t("pillar_content")}</Radio.Button>
      <Radio.Button value={4}>{t("pillar_xp")}</Radio.Button>
      <Radio.Button value={5}>{t("pillar_conversational")}</Radio.Button>
    </Radio.Group>
  );
};

export default PillarsSelector;
