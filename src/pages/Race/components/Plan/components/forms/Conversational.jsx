import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Conversational = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("plan.conversational", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="emailContactPlan"
      >
        <Checkbox>{t("plan_pillar_conversational_emailContactPlan")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="custRetention">
        <Checkbox>{t("plan_pillar_conversational_custRetention")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Conversational;
