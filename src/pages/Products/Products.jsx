import React, { useEffect, useState } from "react";
import { Card, Avatar, Empty } from "antd";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import PageTitle from "../../components/PageTitle";
import softwareCatalogService from "../../services/software-catalog";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const { Meta } = Card;

const Products = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [softwareList, setSoftwareList] = useState([]);

  const loadData = async () => {
    try {
      setSoftwareList([]);
      setIsLoading(true);
      const res = await softwareCatalogService.getSoftwaresList();
      setSoftwareList(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao buscar a lista de softwares");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageTitle
        title="Lista de softwares"
        subtitle="Confira os softwares disponíveis para o seu plano"
      />
      <div className="flex items-center justify-between p-4 my-2 text-gray-500 bg-white rounded-md">
        <span>
        Atualmente o seu plano é:{" "}
        <strong>{user?.subscriptions?.category || "Free"}</strong>
        </span>
        <Link
          type="button"
          className="bg-[#FF4773] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 "
          to="/subscription"
        >
          Ver planos disponíveis
        </Link>
      </div>
      <div className="flex flex-col flex-wrap">
        {isLoading ? (
          <div className="flex items-center justify-start w-full space-x-2">
            <Card loading className="min-w-64" />
            <Card loading className="min-w-64" />
            <Card loading className="min-w-64" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {softwareList.length === 0 ? (
              <div className="w-full">
                <Empty description={<p>Nenhum produto cadastrado</p>} />
              </div>
            ) : (
              softwareList.map((product) => (
                <Card
                  className="min-w-full"
                  key={product.id}
                  title={
                    <Meta
                      className="py-4"
                      avatar={
                        <Avatar
                          src={
                            product.owner.picture ||
                            `https://api.dicebear.com/7.x/miniavs/svg?seed=${product.id}`
                          }
                        />
                      }
                      title={product.owner.name}
                      description={product.name}
                    />
                  }
                  extra={
                    <Link to={`/products/${product._id}`}>
                      <FaSearch />
                    </Link>
                  }
                  cover={
                    <img
                      className="object-cover w-full h-48"
                      src={product.images[0] || "https://placehold.co/600x400"}
                      alt={product.name}
                    />
                  }
                >
                  <p>{product.description}</p>
                  <hr className="my-2" />
                  <div className="flex justify-between py-2">
                    {/* <p className="font-bold">R${product.preco}</p> */}
                    <p>
                      Plano:{" "}
                      <span className="font-bold">
                        {product.subscription_level}
                      </span>
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
