import React from "react";
import { Link } from "react-router-dom";
import ImgHome from "../../assets/home-image.svg";
import AboutSection from "../../components/AboutSection";

const Home = () => {
  return (
    <>
      <section className="flex items-center justify-center hero">
        <div className="w-2/5">
          <h1 className="pt-2 text-6xl">InvestMinds</h1>
          <h2 className="pt-2 text-3xl">Mais que um clube, um investimento</h2>
          <p className="pt-6">
            O clube por assinatura que vai revolucionar sua forma de investir,
            desde a compra de serviços até a venda de produtos!
          </p>
          {/* <Link to="/about">
            <button className="mt-4 px-6 py-2 bg-[#FF4773] text-white font-semibold rounded-lg shadow-md hover:bg-[#FF003D] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Saiba Mais!
            </button>
          </Link> */}
        </div>
        <div className="w-3/5">
          <img src={ImgHome} className="w-full" alt="imagem de investimento" />
        </div>
      </section>
      <section >
        <AboutSection />
      </section>
    </>
  );
};

export default Home;
