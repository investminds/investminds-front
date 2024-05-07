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
        handleSubmit("act.goals", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="convRateMeas">
        <Checkbox>{t("act_pillar_goals_ConvRateMeas")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="visitorQuality">
        <Checkbox>{t("act_pillar_goals_VisitorQuality")}</Checkbox>
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
