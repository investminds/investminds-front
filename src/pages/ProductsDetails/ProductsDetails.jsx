import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import softwareCatalog from "../../services/software-catalog";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Carousel,
  Checkbox,
  Empty,
  Input,
  Rate,
  Skeleton,
  Tag,
  Tooltip,
} from "antd";
import { subscriptionColorsmap, archiveColorsmap } from "../OwnProducts/OwnProducts";
import { CiLink } from "react-icons/ci";
import PageTitle from "../../components/PageTitle";
import { useSelector } from "react-redux";

const ProductsDetails = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [userRate, setUserRate] = useState(3.5);
  const [userFeedback, setUserFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    getData(id);
    loadReviews(id);
  }, [id]);

  const getData = async (productId) => {
    try {
      const productDetailed = await softwareCatalog.getSoftwareById(productId);
      setProduct(productDetailed);
      setIsLoading(false);
    } catch (error) {
      toast.error("Erro ao buscar os detalhes do produto");
      setIsLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const reviews = await softwareCatalog.getReviewsBySoftwareId(id);
      setReviews(reviews);
      setIsLoadingReviews(false);
    } catch (error) {
      toast.error("Erro ao buscar os feedbacks do produto");
      setIsLoadingReviews(false);
    }
  };

  const handleSubmitReview = async () => {
    try {
      setSendingFeedback(true);
      const payload = {
        software: id,
        rating: userRate,
        comment: userFeedback,
        isAnonymous,
      };

      const response = await softwareCatalog.addReview(payload);

      console.log("response", response);

      toast.success("Feedback enviado com sucesso!");
      setUserRate(3.5);
      setUserFeedback("");
      setIsAnonymous(false);
      setSendingFeedback(false);
      await loadReviews();
    } catch (error) {
      toast.error("Erro ao enviar feedback. Tente novamente.");
      setSendingFeedback(false);
    }
  };

  return (
    <div>
      <PageTitle
        title="Detalhes"
        subtitle="Informações detalhadas sobre o produto"
      />
      {isloading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          {product ? (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <Carousel
                  arrows
                  className="rounded-md shadow-xl bg-[#FF4773] w-full col-span-1"
                >
                  {product.images.length > 0 ? (
                    product.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="object-contain p-8 max-h-80"
                      />
                    ))
                  ) : (
                    <img
                      key={"not-found"}
                      src={"https://placehold.co/600x400"}
                      alt={`Image Not Found`}
                      className="p-8"
                    />
                  )}
                </Carousel>
                <div className="col-span-1 p-4 bg-white rounded-md shadow-lg">
                  <>
                    <p className="text-xl">{product.name}</p>
                    <p className="text-lg text-slate-500">
                      {product.description}
                    </p>
                  </>
                  <div>
                    <p className="mt-4 text-lg">Detalhes</p>
                    <div className="flex flex-wrap items-center justify-start py-4">
                      <Tooltip title="Nível de assinatura">
                        <Tag
                          color={
                            subscriptionColorsmap[product.subscription_level]
                          }
                        >
                          {product.subscription_level}
                        </Tag>
                      </Tooltip>
                      <Tooltip title="Status">
                        <Tag color={archiveColorsmap(product.isArchived)}>
                          {product.isArchived ? "Arquivado" : "Disponível"}
                        </Tag>
                      </Tooltip>
                      <Tooltip title="Avaliação">
                        <Rate value={product.rating || 0} disabled />
                      </Tooltip>
                    </div>
                    <a
                      className="flex items-center space-x-2 hover:cursor-pointer hover:text-blue-500"
                      href={product.external_link}
                      target="blank"
                    >
                      <CiLink /> <span>Link de acesso</span>
                    </a>
                  </div>
                </div>
              </div>
              {user.role === "consumer" && (
                <div className="w-full p-4 mt-10 space-y-2 text-gray-500 bg-white rounded-md shadow-lg">
                  <p>
                    Nos conte um pouco de como foi a sua experiência com o
                    produto
                  </p>
                  <div className="flex items-center gap-x-4">
                    <Rate
                      value={userRate}
                      onChange={setUserRate}
                      allowHalf
                      disabled={sendingFeedback}
                    />
                  </div>
                  <div className="gap-y-2">
                    <Input.TextArea
                      minRows={3}
                      maxRows={6}
                      value={userFeedback}
                      onChange={(e) => setUserFeedback(e.target.value)}
                      placeholder="Esse software é incrível!"
                      disabled={sendingFeedback}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onChange={() => setIsAnonymous((prev) => !prev)}
                      disabled={isAnonymous}
                    >
                      Deseja ser enviar como anônimo?
                    </Checkbox>
                  </div>
                  <Button
                    type="primary"
                    className="mt-2 flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:!bg-[#FF003D] hover:!text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    loading={sendingFeedback}
                    onClick={() => {
                      handleSubmitReview();
                    }}
                  >
                    Enviar Feedback
                  </Button>
                </div>
              )}
              <div className="w-full p-4 mt-10 space-y-2 bg-white rounded-md shadow-lg">
                <p className="text-xl">Feedbacks de usuários</p>

                {isLoadingReviews ? (
                  <Skeleton />
                ) : reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={`${review._id}-${index}`}
                      className="flex items-center gap-4 p-4 text-gray-500 bg-gray-100 rounded-md"
                    >
                      <div>
                        <Avatar
                          size="large"
                          src={
                            review.user?.picture ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${
                              review.user?.name[0] || "INVESTMINDS"
                            }`
                          }
                        />
                      </div>
                      <div>
                        {review.isAnonymous ? (
                          <p className="text-lg">Anônimo</p>
                        ) : (
                          <p className="text-lg">{review.user?.name}</p>
                        )}
                        <Rate value={review.rating} allowHalf disabled />
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <Empty
                    description={<p>Este produto ainda não tem feedbacks</p>}
                  />
                )}
              </div>
            </div>
          ) : (
            <p>Produto não encontrado</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsDetails;
