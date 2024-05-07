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
        handleSubmit("reach.experience", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="techSEO">
        <Checkbox>{t("reach_pillar_xp_TechSEO")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="webSpeedMobile">
        <Checkbox>{t("reach_pillar_xp_WebSpeedMobile")}</Checkbox>
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
