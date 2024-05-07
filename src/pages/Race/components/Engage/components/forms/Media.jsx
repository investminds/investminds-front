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
        handleSubmit("engage.media", {
          ...values,
          strategicInitiativesAndActions: fields.strategicInitiativesAndActions,
        });
      }}
    >
      <Form.Item
        className="mb-0"
        valuePropName="checked"
        name="custListsReview"
      >
        <Checkbox>{t("engage_pillar_media_CustListsReview")}</Checkbox>
      </Form.Item>
      <Form.Item className="mb-0" valuePropName="checked" name="googleAdsOpt">
        <Checkbox>{t("engage_pillar_media_GoogleAdsOpt")}</Checkbox>
      </Form.Item>
      <Form.Item
        className="mb-4"
        valuePropName="checked"
        name="orgSocialAmplify"
      >
        <Checkbox>{t("engage_pillar_media_OrgSocialAmplify")}</Checkbox>
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
