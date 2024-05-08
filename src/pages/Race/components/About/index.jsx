import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "/src/store/reducers/raceForm";
const { TextArea } = Input;

const About = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { about } = useSelector((state) => state.raceForm);
  const [form] = Form.useForm();

  return (
    <div className="grid grid-cols-12 mt-8">
      <div className="col-span-12 mt-4 text-gray-800 text-md">
        {t("about_companyDescription")}
      </div>
      <div className="col-span-12">
        <Form
          form={form}
          onFinish={(values) => {
            console.log(values);
            dispatch(
              updateField({
                field: "about",
                value: {
                  ...values,
                  raceMesages: about.raceMesages,
                },
              })
            );
          }}
          initialValues={about}
          layout="vertical"
        >
          <Form.Item
            name="companyName"
            className="mt-4"
            label={t("about_companyName")}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="about_companySector"
            label={t("about_companySector")}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="about_targetAudience"
            label={t("about_targetAudience")}
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="marketingObjectives"
            label={t("marketingObjectives")}
          >
            <Input />
          </Form.Item>
          <Form.Item name="additionalInfo" label={t("additionalInfo")}>
            <TextArea
              showCount
              maxLength={256}
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default About;
