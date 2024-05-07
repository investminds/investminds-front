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
        handleSubmit("act.planning", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        })
      }
    >
      <Form.Item className="mb-0" valuePropName="checked" name="defContStrat">
        <Checkbox>{t("act_pillar_planning_DefContStrat")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="contentPersona">
        <Checkbox>{t("act_pillar_planning_ContentPersona")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="aiGovernance">
        <Checkbox>{t("act_pillar_planning_AiGovernance")}</Checkbox>
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
