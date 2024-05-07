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
        handleSubmit("engage.conversational", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="onBoardingRev">
        <Checkbox>{t("engage_pillar_conversational_OnBoardingRev")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="newsletters">
        <Checkbox>{t("engage_pillar_conversational_Newsletters")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="emailComm">
        <Checkbox>{t("engage_pillar_conversational_EmailComm")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="commPref">
        <Checkbox>{t("engage_pillar_conversational_CommPref")}</Checkbox>
      </Form.Item>

      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="socialCommunities"
      >
        <Checkbox>
          {t("engage_pillar_conversational_SocialCommunities")}
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
