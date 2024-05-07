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
        handleSubmit("act.conversational", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="welcomeEmails">
        <Checkbox>{t("act_pillar_conversational_WelcomeEmails")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="communityInteraction"
      >
        <Checkbox>
          {t("act_pillar_conversational_CommunityInteraction")}
        </Checkbox>
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
