import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Goals = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  
  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("plan.goals", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="smartObj">
        <Checkbox>{t("plan_pillar_goals_smartObj")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="gaCustom">
        <Checkbox>{t("plan_pillar_goals_gaCustom")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="digPerfDash">
        <Checkbox>{t("plan_pillar_goals_digPerfDash")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Goals;
