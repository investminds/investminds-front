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
        handleSubmit("engage.content", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="rofuRetention">
        <Checkbox>{t("engage_pillar_content_RofuRetention")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="returnVisitPers">
        <Checkbox>{t("engage_pillar_content_ReturnVisitPers")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="supportContent">
        <Checkbox>{t("engage_pillar_content_SupportContent")}</Checkbox>
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
