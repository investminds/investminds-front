import { Button, Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const Media = (props) => {
  const { fields, handleSubmit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={fields}
      onFinish={(values) => {
        handleSubmit("reach.media", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item className="mb-0" valuePropName="checked" name="searchStrategy">
        <Checkbox>{t("reach_pillar_media_SearchStrategy")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="paidMediaProspect"
      >
        <Checkbox>{t("reach_pillar_media_PaidMediaProspect")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="influencerMarket"
      >
        <Checkbox>{t("reach_pillar_media_InfluencerMarket")}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Media;
