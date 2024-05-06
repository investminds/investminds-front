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
        handleSubmit("plan.planning", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        })
      }
    >
      <Form.Item className="mb-0" valuePropName="checked" name="intDigiPlan">
        <Checkbox>{t("plan_pillar_planning_intDigiPlan")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="markStrat">
        <Checkbox>{t("plan_pillar_planning_markStrat")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="digiTransPlan">
        <Checkbox>{t("plan_pillar_planning_digiTransPlan")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="empSkillsGap">
        <Checkbox>{t("plan_pillar_planning_empSkillsGap")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="empDevPlans">
        <Checkbox>{t("plan_pillar_planning_empDevPlans")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="aiMartechStack">
        <Checkbox>{t("plan_pillar_planning_aiMartechStack")}</Checkbox>
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
