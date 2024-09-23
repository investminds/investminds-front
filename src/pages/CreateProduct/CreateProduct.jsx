import React, { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Button, Tooltip } from "antd";
import { IoMdCloudUpload } from "react-icons/io";
import { toast } from "react-toastify";
import softwareCatalog from "../../services/software-catalog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import imgbbService from "../../services/imgbb";
import { FaTrash } from "react-icons/fa";

const { Option } = Select;

const planCategories = ["Free", "Basic", "Premium", "VIP"];
const categories = ["Tech", "Cripto", "Ouro", "Outros"];

const API_KEY = import.meta.env.VITE_UPLOAD_IMAGES_API_KEY;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [imagesToEdit, setImagesToEdit] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const softwareToEdit = location.state;
  console.log(softwareToEdit);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const payload = { ...values, images: imagesUrls };
      await softwareCatalog.createSoftware(payload);
      form.resetFields();
      setImageList([]);
      setImagesUrls([]);
      toast.success("Produto cadastrado com sucesso!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  const handleImageUpload = (fileList) => {
    setImageList(fileList);
  };

  const handleUpload = async () => {
    if (imageList.length === 0) {
      alert("Por favor, selecione pelo menos uma imagem para fazer o upload.");
      return;
    }
    setIsLoading(true);

    try {
      const imagesUrls = await imgbbService.uploadFileFromList(imageList);
      toast.success("Imagens enviadas com sucesso!");
      setImagesUrls(imagesUrls);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (softwareToEdit?.images) setImagesToEdit(softwareToEdit.images);
  }, [softwareToEdit]);

  const handlesSubmitUpdate = (values) => {
    const changedFields = {};
    for (let key in values) {
      if (values[key] !== softwareToEdit[key]) {
        changedFields[key] = values[key];
      }
    }
    console.log(changedFields);
    const payload = {
      ...changedFields,
      images: [...imagesToEdit, ...imagesUrls],
    };
    console.log(payload);
    softwareCatalog
      .updateSoftware(softwareToEdit._id, payload)
      .then(() => {
        toast.success("Produto atualizado com sucesso!");
        navigate("/products", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao atualizar produto. Tente novamente.");
      });
  };

  return (
    <div>
      <PageTitle
        title={softwareToEdit ? "Edição de Produto" : "Cadastro de Produto"}
        subtitle={
          softwareToEdit
            ? "Atualize as informações do seu produto"
            : "Crie um novo produto para ser divulgado na plataforma."
        }
      />

      <div className="p-4 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md">
        <Form
          form={form}
          onFinish={softwareToEdit ? handlesSubmitUpdate : onFinish}
          layout="vertical"
          initialValues={
            softwareToEdit
              ? {
                  name: softwareToEdit.name,
                  description: softwareToEdit.description,
                  external_link: softwareToEdit.external_link,
                  categories: softwareToEdit.categories,
                  subscription_level: softwareToEdit.subscription_level,
                }
              : {}
          }
        >
          <Form.Item
            name="name"
            label="Nome do produto"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição do Produto"
            initialValue=""
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="external_link"
            label="Link de acesso"
            rules={[
              {
                required: true,
                message:
                  "Por favor informe o link de acesso para o seu software.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              className="col-span-1"
              name="categories"
              label="Categorias"
              rules={[
                {
                  required: true,
                  message: "Por favor selecione ao menos uma categoria",
                },
              ]}
            >
              <Select mode="multiple">
                {categories.map((category, index) => (
                  <Option key={`${category}-${index}`} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              className="col-span-1"
              name="subscription_level"
              label="Nível de Assinatura"
              rules={[
                {
                  required: true,
                  message: "Por favor selecione o nível de assinatura.",
                },
              ]}
            >
              <Select>
                {planCategories.map((category, index) => (
                  <Option key={`${category}-${index}`} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Imagens">
            <>
              <Upload
                listType="picture-card"
                fileList={imageList}
                beforeUpload={() => false}
                onChange={({ fileList }) => handleImageUpload(fileList)}
              >
                {imageList.length >= 10 ? null : (
                  <div className="flex flex-col items-center justify-center">
                    <IoMdCloudUpload size={20} />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <Button
                className="flex mt-2 items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:!bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                type="primary"
                htmlType="button"
                onClick={handleUpload}
                disabled={imageList.length === 0 || imageList.length > 10}
                loading={isloading}
              >
                Confirmar upload das imagens
              </Button>
            </>
          </Form.Item>
          {imagesToEdit.length > 0 &&
            imagesToEdit.map((image, index) => (
              <div
                className="flex items-center justify-between w-1/2 h-12 p-2 mb-2 bg-white border-2 rounded-md"
                key={`${image}-${index}`}
              >
                <img src={image} className="w-10 h-10" />
                <p>Remover imagem</p>
                <Tooltip title="Remover imagem">
                  <FaTrash
                    size={20}
                    className="cursor-pointer hover:text-[#FF003D] text-[#FF4773]"
                    onClick={() => {
                      setImagesToEdit((prev) =>
                        prev.filter((img) => img !== image)
                      );
                    }}
                  />
                </Tooltip>
              </div>
            ))}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isloading}
              className="flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:!bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              {softwareToEdit ? "Atualizar" : "Criar Produto"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default CreateProduct;
