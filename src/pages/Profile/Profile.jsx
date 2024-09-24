import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Empty,
  Input,
  Space,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import imgbbService from "../../services/imgbb";
import { setUserPicture } from "../../store/reducers/user";
import { toast } from "react-toastify";
import { LoginButton } from "react-facebook";
import { Link } from "react-router-dom";
import authService from "../../services/auth";
import bffService from "../../services/bff";
import { RiPriceTag2Fill } from "react-icons/ri";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const urls = await imgbbService.uploadFileFromList(imageList);
      await authService.updateUserbByFields(user.id, { picture: urls[0] });
      dispatch(setUserPicture(urls[0]));

      toast.success("Foto de perfil atualizada com sucesso!");
      setImageList([]);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  const handleCompleteLogin = async (response) => {
    try {
      setIsLoading(true);
      const { accounts, accessToken, userID } = response;

      const pages = accounts.data
        ? accounts.data.map((page) => ({
            pageId: page.id,
            pageName: page.name,
            pageToken: page.access_token,
            category: page.category,
          }))
        : [];

      const payload = {
        facebookId: userID,
        facebookToken: accessToken,
        pages,
        email: user.email,
      };

      const res = await authService.linkFacebookAccount(payload);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Ocorreu um erro ao logar com facebook.");
    }
  };

  const handleSuceess = async (response) => {
    try {
      setIsLoading(true);
      const { authResponse } = response;
      const { userID, accessToken } = authResponse;

      FB.api(
        "/me",
        { fields: "name,email,picture,accounts" },
        async function (response) {
          await handleCompleteLogin({ ...response, userID, accessToken });
        }
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Ocorreu um erro ao logar com facebook.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!newPassword) {
        toast.error("Por favor, insira uma nova senha");
        return;
      }
      setLoadingPassword(true);
      await authService.updatePassword(newPassword);
      toast.success("Senha atualizada com sucesso!");
      setNewPassword("");
      setLoadingPassword(false);
    } catch (error) {
      setLoadingPassword(false);
      toast.error("Erro ao atualizar senha. Tente novamente.");
    }
  };

  const loadSubscriptions = async () => {
    try {
      const userData = await authService.getUserSubscriptions(user.id);
      const { subscriptions } = userData;
      setSubscriptions(subscriptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  return (
    <div>
      <PageTitle title="Perfil" subtitle="Confira os detalhes da sua conta" />

      <div className="grid grid-cols-2 p-6 bg-white rounded-md">
        <div className="flex col-span-1 ">
          <div className="flex flex-col justify-center">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={
                user?.picture ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${
                  user?.name[0] || "I"
                }`
              }
              shape="square"
              className="border border-gray-300"
            />
          </div>
          <div className="flex flex-col justify-center px-4 text-gray-500 text-md">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>
              Tipo do perfil:{" "}
              <strong>
                {user.role === "advertiser" ? "Anunciante" : "Consumidor"}{" "}
              </strong>
            </p>
          </div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="flex flex-col justify-center w-full text-gray-500 gap-y-2">
            <p>Alterar foto de perfil</p>
            <Upload
              listType="picture"
              fileList={imageList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setImageList(fileList)}
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
                    Salvar Foto
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col justify-center w-1/2 text-gray-500 gap-y-2">
            <p>Alterar Senha</p>
            <Space.Compact>
              <Input
                defaultValue=""
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loadingPassword}
              />
              <Button
                onClick={() => {
                  handleUpdatePassword();
                }}
                disabled={!newPassword || newPassword.length < 6}
                className="flex items-center gap-2 bg-[#FF4773] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:!bg-[#FF003D] hover:!text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                loading={loadingPassword}
              >
                Salvar
              </Button>
            </Space.Compact>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-6 mt-2 bg-white rounded-md">
        {user.role === "advertiser" && (
          <div className="col-span-1">
            {user.facebookToken ? (
              <div className="space-y-2 text-gray-400">
                <p>
                  Sua conta do Facebook está vinculada. Você pode criar
                  publicações em suas páginas.
                </p>
                <div>
                  <Link
                    type="button"
                    className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full"
                    to="/publications/create"
                  >
                    Criar Publicação
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-gray-400">
                <p>
                  Você pode vincular ao seu perfil uma conta do Facebook para
                  criar publicações{" "}
                </p>
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    {" "}
                    <Spin />
                  </div>
                ) : (
                  <LoginButton
                    type="button"
                    scope="public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts"
                    onSuccess={handleSuceess}
                    className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full"
                  >
                    Vincular conta do Facebook
                  </LoginButton>
                )}
              </div>
            )}
          </div>
        )}
        {user.role === "consumer" && (
          <>
            <div className="col-span-1 space-y-2">
              Histórico de Assinaturas
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <div
                    key={subscription.subscriptionId}
                    className="flex items-center justify-between p-4 space-x-2 text-sm text-gray-400 bg-gray-200 rounded-md"
                  >
                    <p>
                      Início:{" "}
                      {new Date(subscription.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      Fim:{" "}
                      {new Date(
                        subscription.endDate || new Date()
                      ).toLocaleDateString()}
                    </p>
                    <p> Categoria: {subscription.category}</p>
                    <p> Preço: R${(subscription.price / 100).toFixed(2)}</p>
                    <p>Plano {subscription.isActive ? "ativo" : "inativo"}</p>
                    {subscription.invoiceUrl && (
                      <Tooltip title="Ver Fatura">
                        <a target="_blank" href={subscription.invoiceUrl}>
                          {" "}
                          <RiPriceTag2Fill color="green" size={20} />
                        </a>
                      </Tooltip>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
                  <Empty description={<p>Nenhuma assinatura encontrada</p>} />
                  <Link
                    type="button"
                    className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    to="/subscription"
                  >
                    Ver Planos
                  </Link>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <div className="space-y-2 text-gray-400">
                <p>
                  Você pode avaliar os produtos que você já utilizou e deixar
                  feedbacks para os anunciantes.
                </p>
                <div>
                  <Link
                    type="button"
                    className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full"
                    to="/products"
                  >
                    Avaliar Produtos
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
