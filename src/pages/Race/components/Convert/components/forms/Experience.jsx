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
        handleSubmit("convert.experience", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="basketCheckoutEff"
      >
        <Checkbox>{t("convert_pillar_xp_BasketCheckoutEff")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="multichannelConv"
      >
        <Checkbox>{t("convert_pillar_xp_MultichannelConv")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="personalizationEff"
      >
        <Checkbox>{t("convert_pillar_xp_PersonalizationEff")}</Checkbox>
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
