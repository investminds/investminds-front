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
        handleSubmit("plan.experience", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="webUsability">
        <Checkbox>{t("plan_pillar_xp_webUsability")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="structTesting">
        <Checkbox>{t("plan_pillar_xp_structTesting")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="croPlan">
        <Checkbox>{t("plan_pillar_xp_croPlan")}</Checkbox>
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
