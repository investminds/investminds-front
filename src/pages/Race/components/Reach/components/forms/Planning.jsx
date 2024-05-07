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
        handleSubmit("reach.planning", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        })
      }
    >
      <Form.Item className="mb-0" valuePropName="checked" name="acqBudget">
        <Checkbox>{t("reach_pillar_planning_AcqBudget")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="brandMsg">
        <Checkbox>{t("reach_pillar_planning_BrandMsg")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="keywordRes">
        <Checkbox>{t("reach_pillar_planning_KeywordRes")}</Checkbox>
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
