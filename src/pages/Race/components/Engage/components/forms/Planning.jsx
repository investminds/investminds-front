import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Planning = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) =>
        handleSubmit("engage.planning", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        })
      }
    >
      <Form.Item className="mb-0" valuePropName="checked" name="custResearch">
        <Checkbox>{t("engage_pillar_planning_CustResearch")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="emailPlan">
        <Checkbox>{t("engage_pillar_planning_EmailPlan")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Planning;
