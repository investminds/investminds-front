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
        handleSubmit("reach.conversational", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="emailCampaigns">
        <Checkbox>{t("reach_pillar_conversational_EmailCampaigns")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="coMarketingEmail"
      >
        <Checkbox>{t("reach_pillar_conversational_CoMarketingEmail")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="socialSelling">
        <Checkbox>{t("reach_pillar_conversational_SocialSelling")}</Checkbox>
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
