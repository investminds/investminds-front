import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Experience = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("engage.experience", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="onBoarding">
        <Checkbox>{t("engage_pillar_xp_OnBoarding")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="custJourney">
        <Checkbox>{t("engage_pillar_xp_CustJourney")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="loyaltyDrivers">
        <Checkbox>{t("engage_pillar_xp_LoyaltyDrivers")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Experience;
