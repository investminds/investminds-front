import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Content = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("plan.content", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="contMarkEff">
        <Checkbox>{t("plan_pillar_content_contMarkEff")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="contMarkStrat">
        <Checkbox>{t("plan_pillar_content_contMarkStrat")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="genAiUse">
        <Checkbox>{t("plan_pillar_content_genAiUse")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Content;
