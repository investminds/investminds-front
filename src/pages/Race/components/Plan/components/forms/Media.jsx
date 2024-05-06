import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Media = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("plan.media", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="digMediaEff">
        <Checkbox>{t("plan_pillar_media_digMediaEff")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="sopMedia">
        <Checkbox>{t("plan_pillar_media_sopMedia")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Media;
