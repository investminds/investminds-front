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
        handleSubmit("engage.goals", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="customDims">
        <Checkbox>{t("engage_pillar_goals_CustomDims")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="engagementTrack"
      >
        <Checkbox>{t("engage_pillar_goals_EngagementTrack")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="custProfile">
        <Checkbox>{t("engage_pillar_goals_CustProfile")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="custSatisfaction"
      >
        <Checkbox>{t("engage_pillar_goals_CustSatisfaction")}</Checkbox>
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
