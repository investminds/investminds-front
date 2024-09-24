import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

const SubscriptionCard = ({
  title,
  description,
  price,
  benefits = [],
  disabled = false,
  handleSelect,
  handlePayment,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Card
        color="gray"
        variant="gradient"
        className={`w-full p-8 rounded-md h-full flex flex-col justify-between ${
          disabled
            ? "bg-gray-400 cursor-not-allowed opacity-50"
            : "bg-[#FF4773]"
        }`}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="pb-8 m-0 mb-8 text-center border-b rounded-none border-white/10"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {title}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="flex justify-center gap-1 mt-6 font-normal text-7xl"
          >
            <span className="mt-2 text-4xl">R$</span>
            {price} <span className="self-end text-4xl">/mês</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            {benefits.map((benefit, index) => (
              <li
                className="flex items-center gap-4"
                key={`${benefit}-${index}`}
              >
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">{benefit}</Typography>
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="p-0 mt-12 justify-self-end">
          <Button
            size="lg"
            color="white"
            className={`p-2 text-gray-500 ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            }`}
            ripple={false}
            fullWidth={true}
            onClick={handleSelect}
            disabled={disabled}
          >
            SELECIONAR PLANO
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
