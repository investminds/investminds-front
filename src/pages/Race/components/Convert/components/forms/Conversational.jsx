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
        handleSubmit("convert.conversational", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="emailNurture">
        <Checkbox>{t("convert_pillar_conversational_EmailNurture")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="sitePersonalization"
      >
        <Checkbox>
          {t("convert_pillar_conversational_SitePersonalization")}
        </Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="digitalSalesAssist"
      >
        <Checkbox>
          {t("convert_pillar_conversational_DigitalSalesAssist")}
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
