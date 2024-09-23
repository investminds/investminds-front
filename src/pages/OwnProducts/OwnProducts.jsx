import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Skeleton, Tag, Rate, Tooltip, Empty } from "antd";
import softwareCatalog from "../../services/software-catalog";
import { toast } from "react-toastify";
import { RiEditFill } from "react-icons/ri";
import { FaArchive } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

export const subscriptionColorsmap = {
  Free: "green",
  Basic: "blue",
  Premium: "orange",
  VIP: "purple",
};

export const archiveColorsmap = (isArchived) => (isArchived ? "red" : "green");

const OwnProducts = () => {
  const navigate = useNavigate();
  const [softwareList, setSoftwareList] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { id } = user;

  useEffect(() => {
    const getData = async () => {
      try {
        const softwares = await softwareCatalog.findByOwner(id);
        setSoftwareList(softwares);
        setIsLoading(false);
        console.log(softwares);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Erro ao buscar seus softwares");
      }
    };
    getData();
  }, [id]);

  const handleArchive = async (id) => {
    try {
      const res = await softwareCatalog.archiveSoftware(id);
      const { software } = res;
      setSoftwareList((prev) =>
        prev.map((s) => (s._id === software._id ? software : s))
      );
      toast.success("Produto arquivado com sucesso");
    } catch (error) {
      toast.error("Erro ao arquivar produto");
    }
  };

  const handleUnarchive = async (id) => {
    try {
      const res = await softwareCatalog.unarchiveSoftware(id);
      const { software } = res;
      setSoftwareList((prev) =>
        prev.map((s) => (s._id === software._id ? software : s))
      );
      toast.success("Produto desarquivado com sucesso");
    } catch (error) {
      toast.error("Erro ao desarquivar produto");
    }
  };

  return (
    <div className="flex flex-col flex-wrap">
      <PageTitle
        title="Produtos"
        subtitle="Consulte e gerencie seus produtos cadastrados."
      />
      {isloading ? (
        <div className="flex items-center justify-start w-full space-x-2">
          <Card loading className="min-w-64" />
          <Card loading className="min-w-64" />
          <Card loading className="min-w-64" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {softwareList.length === 0 ? (
            <div className="col-span-3 ">
              <Empty description={<p>Nenhum produto cadastrado</p>} />
            </div>
          ) : (
            softwareList.map((software) => (
              <Card
                key={software._id}
                title={software.name}
                cover={
                  <img
                    alt={software.name}
                    src={software.images[0] || "https://placehold.co/600x400"}
                    className="object-contain w-full h-72"
                  />
                }
                actions={[
                  <Link to={`/products/${software._id}`}>
                    <Tooltip title="Detalhes">
                      <div className="flex items-center justify-center text-center">
                        <FaInfoCircle key="details" size={20} />
                      </div>
                    </Tooltip>
                  </Link>,
                  <div className="flex items-center justify-center">
                    <Tooltip title="Editar">
                      <RiEditFill
                        key="edit"
                        size={20}
                        onClick={() => {
                          navigate(`/products/edit/${software._id}`, {
                            state: software,
                          });
                        }}
                      />
                    </Tooltip>
                  </div>,
                  <div className="flex items-center justify-center">
                    <Tooltip
                      title={software.isArchived ? "Desarquivar" : "Arquivar"}
                    >
                      <FaArchive
                        key="archive"
                        size={20}
                        onClick={() => {
                          software.isArchived
                            ? handleUnarchive(software._id)
                            : handleArchive(software._id);
                        }}
                      />
                    </Tooltip>
                  </div>,
                ]}
                extra={
                  <Tag color={archiveColorsmap(software.isArchived)}>
                    {software.isArchived ? "Arquivado" : "Disponível"}
                  </Tag>
                }
                className="shadow-lg"
              >
                <p className="h-20 overflow-auto">{software.description}</p>
                <div className="flex flex-wrap items-center justify-between py-2 space-y-2">
                  <Tag
                    color={subscriptionColorsmap[software.subscription_level]}
                  >
                    {software.subscription_level}
                  </Tag>
                  <Rate value={0} disabled />
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OwnProducts;
