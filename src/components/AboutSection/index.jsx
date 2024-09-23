import { Typography, Card, CardBody } from "@material-tailwind/react";

function ContentCard({ img, title, desc }) {
  return (
    <Card
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
      color="transparent"
    >
      <img
        src={img}
        alt="bg"
        className="absolute inset-0 object-cover object-center w-full h-full"
      />
      <div className="absolute inset-0 bg-black/30" />
      <CardBody className="relative flex flex-col justify-end">
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="my-2 font-normal"
        >
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}

const contents = [
  {
    img: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Revolução no Cenário Financeiro",
    desc: "Na InvestMinds, estamos revolucionando o cenário financeiro ao fornecer uma plataforma abrangente voltada tanto para investidores iniciantes quanto para experientes.",
  },
  {
    img: "https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Capacitação com Ferramentas de Ponta",
    desc: "Nossa missão é capacitar indivíduos com ferramentas e insights de ponta, permitindo que naveguem pelo complexo mundo das finanças com confiança e precisão.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tecnologia e Expertise em Investimentos",
    desc: "Combinando bots de criptomoedas e investimentos de última geração com dicas e estratégias de investimento especializadas, oferecemos uma mistura única de tecnologia e expertise projetada para otimizar seu crescimento financeiro.",
  },
];

export function AboutSection() {
  return (
    <section className="container px-8 py-10 mx-auto lg:py-28">
      <Typography
        variant="h2"
        color="blue-gray"
        className="!text-2xl !leading-snug lg:!text-3xl"
      >
        Transformando o Cenário Financeiro
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 max-w-lg !font-normal !text-gray-500"
      >
        Na InvestMinds, estamos revolucionando o cenário financeiro ao fornecer
        uma plataforma abrangente voltada tanto para investidores iniciantes
        quanto para experientes. Nossa missão é capacitar indivíduos com
        ferramentas e insights de ponta, permitindo que naveguem pelo complexo
        mundo das finanças com confiança e precisão.
      </Typography>

      <div className="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-3">
        {contents.map(({ img, title, desc }) => (
          <ContentCard key={title} img={img} title={title} desc={desc} />
        ))}
      </div>
    </section>
  );
}

export default AboutSection;
