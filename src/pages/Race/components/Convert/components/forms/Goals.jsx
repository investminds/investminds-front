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
        handleSubmit("convert.goals", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="ecommTrack">
        <Checkbox>{t("convert_pillar_goals_EcommTrack")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="attribution">
        <Checkbox>{t("convert_pillar_goals_Attribution")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-4" valuePropName="checked" name="offlineInfluence">
        <Checkbox>{t("convert_pillar_goals_OfflineInfluence")}</Checkbox>
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
