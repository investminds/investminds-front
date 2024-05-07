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
        handleSubmit("convert.planning", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        })
      }
    >
      <Form.Item className="mb-0" valuePropName="checked" name="structTestPlan">
        <Checkbox>{t("convert_pillar_planning_StructTestPlan")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="croPlan">
        <Checkbox>{t("convert_pillar_planning_CROPlan")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="regularTesting">
        <Checkbox>{t("convert_pillar_planning_RegularTesting")}</Checkbox>
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
