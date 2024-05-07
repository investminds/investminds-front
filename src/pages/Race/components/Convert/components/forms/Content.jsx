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
        handleSubmit("convert.content", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="bofuContent">
        <Checkbox>{t("convert_pillar_content_BofuContent")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="structTestCRO">
        <Checkbox>{t("convert_pillar_content_StructTestCRO")}</Checkbox>
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
