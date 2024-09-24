import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Button,
  Upload,
  message,
  Result,
  Skeleton,
  Empty,
  Card,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import AssistantChat from "../../components/AssistantChat";
import PageTitle from "../../components/PageTitle";
import { FaImage } from "react-icons/fa";
import dayjs from "dayjs";
import imgbbService from "../../services/imgbb";

const { TextArea } = Input;

const FacebookCampaigns = () => {
  const user = useSelector((state) => state.user);
  const { facebookToken } = user;

  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [imageLink, setImageLink] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loadingFacebookPages, setLoadingFacebookPages] = useState(false);
  const [facebookPages, setFacebookPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const listFacebookPages = async () => {
      try {
        setLoadingFacebookPages(true);
        const response = await fetch(
          `https://graph.facebook.com/v10.0/me/accounts?access_token=${facebookToken}`
        );
        const facebookPages = await response.json();
        const pages = facebookPages.data.map((page) => ({
          id: page.id,
          token: page.access_token,
          name: page.name,
          category: page.category,
        }));
        setLoadingFacebookPages(false);
        setFacebookPages(pages);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao buscar suas páginas do Facebook");
        setLoadingFacebookPages(false);
      }
    };
    if (facebookToken) listFacebookPages();
  }, [facebookToken]);

  useEffect(() => {
    if (selectedPage) {
      const selectPages = async () => {
        const posts = await fetch(
          `https://graph.facebook.com/v20.0/${selectedPage.id}/feed?access_token=${selectedPage.token}`
        );
        const postsData = await posts.json();
      };
      selectPages();
    }
  }, [selectedPage]);

  useEffect(() => {
    if (imageList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageList[0].originFileObj);
    } else if (imageLink) {
      setPreviewImage(imageLink);
    } else {
      setPreviewImage("");
    }
  }, [imageList, imageLink]);

  const handleCreatePost = async (pageId, content) => {
    try {
      setLoadingCreatePost(true);
      const formData = new URLSearchParams();
      formData.append("message", content.message);
      formData.append("access_token", content.access_token);
      if (content.timestamp) {
        const dateUtc = new Date(new Date(content.timestamp).toISOString());
        const unixTimestamp = Math.floor(new Date(dateUtc).getTime() / 1000);

        formData.append("published", false);
        formData.append("scheduled_publish_time", unixTimestamp);
      }
      //   const response = await fetch(
      //     `https://graph.facebook.com/v20.0/${pageId}/photos`,
      //     {
      //       method: "POST",
      //       body: formData.toString(),
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },
      //     }
      //   );

      if (content.url) {
        formData.append("url", content.url);
        await fetch(`https://graph.facebook.com/v20.0/${pageId}/photos`, {
          method: "POST",
          body: formData.toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
      } else {
        await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
          method: "POST",
          body: formData.toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
      }

      message.success("Publicação criada com sucesso!");
      setLoadingCreatePost(false);
      setDescription("");
      setImageLink("");
      setPreviewImage("");
      setDate(null);
    } catch (error) {
      setLoadingCreatePost(false);
      message.error("Erro ao criar publicação.");
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const urls = await imgbbService.uploadFileFromList(imageList);
      setImageLink(urls[0]);

      toast.success("Foto da publicação carregada com sucesso!");
      setImageList([]);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      toast.error("Erro ao carregar foto da publicação.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col flex-wrap">
      <PageTitle
        title="Publicações"
        subtitle="Aqui você pode criar publicações para suas páginas do Facebook e usar o nosso assistente virtual"
      />

      {facebookToken ? (
        <>
          {loadingFacebookPages ? (
            <Skeleton />
          ) : (
            <>
              {facebookPages.length === 0 ? (
                <Empty
                  description={<p>Nenhuma página do facebook encontrada</p>}
                />
              ) : (
                <>
                  {selectedPage ? (
                    <>
                      <div className="flex items-center justify-between p-4 mt-4 bg-white rounded-md shadow-lg">
                        <p>
                          Página selecionada:{" "}
                          <strong>{selectedPage.name}</strong>
                        </p>
                        <button
                          type="primary"
                          onClick={() => setSelectedPage(null)}
                          className="flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                          Selecionar outra página
                        </button>
                      </div>
                      <div className="grid grid-cols-3 mt-4 space-x-4">
                        <div className="col-span-1 bg-white rounded-md shadow-lg">
                          <div className="flex flex-col items-center p-4 shadow">
                            <h2 className="mb-4 text-xl font-bold">
                              Preview da publicação
                            </h2>
                            <Card
                              className="min-w-full p-2"
                              cover={
                                previewImage && (
                                  <img
                                    src={previewImage}
                                    className="object-cover w-full h-full"
                                  />
                                )
                              }
                              actions={[
                                <div className="flex items-center justify-center">
                                  <AiOutlineLike key="like" size={20} />
                                </div>,
                                <div className="flex items-center justify-center">
                                  <FaRegComment key="comment" size={20} />
                                </div>,
                                <div className="flex items-center justify-center">
                                  <FaWhatsapp key="wpp" size={20} />
                                </div>,
                                <div className="flex items-center justify-center">
                                  <PiShareFat key="share" size={20} />
                                </div>,
                              ]}
                            >
                              {description}
                            </Card>
                          </div>
                        </div>
                        <div className="col-span-2 bg-white rounded-md shadow-lg">
                          <div className="p-4 shadow">
                            <h2 className="mb-4 text-xl font-bold">
                              Detalhes da publicação
                            </h2>
                            <TextArea
                              rows={4}
                              placeholder="Descrição"
                              className="mb-4"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="flex items-center">
                              <div className="flex justify-between w-full space-x-2">
                                <DatePicker
                                  value={date}
                                  onChange={(value) => {
                                    setDate(value);
                                  }}
                                  showTime
                                  placeholder="Data da publicação"
                                  // minDate={dayjs()}
                                />

                                <Button
                                  loading={loadingCreatePost}
                                  disabled={!description && !imageLink}
                                  type="primary"
                                  onClick={() =>
                                    handleCreatePost(selectedPage.id, {
                                      access_token: selectedPage.token,
                                      message: description,
                                      url: imageLink,
                                      timestamp: date,
                                    })
                                  }
                                  className="flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:!bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                >
                                  Criar Publicação
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2">
                              <Upload
                                listType="picture"
                                fileList={imageList}
                                beforeUpload={() => false}
                                onChange={({ fileList }) => {
                                  setImageList(fileList);
                                }}
                                onRemove={() => setImageList([])}
                                className="w-full"
                              >
                                {imageList.length > 0 ? null : (
                                  <button
                                    type="button"
                                    className="flex items-center gap-2 w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                  >
                                    Selecionar Imagem
                                    <FaImage size={20} />
                                  </button>
                                )}
                              </Upload>
                              {imageList.length > 0 && (
                                <>
                                  {uploading ? (
                                    <div className="flex items-center justify-center w-full">
                                      {" "}
                                      <Spin />
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      className="w-full bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                      onClick={handleUpload}
                                    >
                                      Confirmar Foto
                                    </button>
                                  )}
                                </>
                              )}
                              {imageLink && (
                                <button
                                  type="button"
                                  className="bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                  onClick={() => setImageLink("")}
                                >
                                  Remover Foto
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 mt-4 bg-white rounded-md shadow-lg">
                      <p>Slecione uma página para realizar a publicação</p>
                      {facebookPages.map((page) => (
                        <div
                          key={page.id}
                          className="flex items-center justify-between p-4 border-b"
                        >
                          <p>{page.name}</p>
                          <button
                            type="primary"
                            onClick={() => setSelectedPage(page)}
                            className="flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                          >
                            Selecionar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Result
          status="warning"
          title="Você não está conectado ao Facebook."
          subTitle="Para criar uma publicação, vincule sua conta empresarial ao perfil."
        />
      )}
    </div>
  );
};

export default FacebookCampaigns;
