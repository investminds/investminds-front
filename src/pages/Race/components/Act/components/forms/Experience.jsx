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
        handleSubmit("act.experience", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="landingPageOpt">
        <Checkbox>{t("act_pillar_xp_LandingPageOpt")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="leadProfiling">
        <Checkbox>{t("act_pillar_xp_LeadProfiling")}</Checkbox>
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
