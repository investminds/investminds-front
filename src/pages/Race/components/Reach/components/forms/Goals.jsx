import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Goals = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  
  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("reach.goals", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="convForecast">
        <Checkbox>{t("reach_pillar_goals_ConvForecast")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="keyphraseGap">
        <Checkbox>{t("reach_pillar_goals_KeyphraseGap")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="gA4Events">
        <Checkbox>{t("reach_pillar_goals_GA4Events")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Goals;
