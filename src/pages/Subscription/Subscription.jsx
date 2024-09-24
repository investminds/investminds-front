import { useEffect, useState } from "react";
import { Skeleton, Tag } from "antd";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import bffService from "../../services/bff";
import SubscriptionForm from "./components/SubscriptionForm";
import PageTitle from "../../components/PageTitle";
import SubscriptionCard from "../../components/SubscriptionCard";
import { useSelector } from "react-redux";
import { subscriptionColorsmap } from "../OwnProducts/OwnProducts";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BiSolidPencil } from "react-icons/bi";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Subscription = () => {
  const user = useSelector((state) => state.user);
  const { subscriptions } = user;
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    listSubscriptionPlans();
  }, []);

  const listSubscriptionPlans = async () => {
    try {
      setIsLoading(true);
      const plans = await bffService.listActivePlans();
      const { activePlans } = plans;
      console.log(plans);
      setPlans(activePlans);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao buscar os planos de assinatura");
    }
  };
  return (
    <div>
      <PageTitle title="Assinatura" subtitle="Confira os planos disponíveis" />
      <Elements stripe={stripePromise}>
        {isLoading ? (
          <Skeleton loading={isLoading} />
        ) : (
          <div className="grid h-full grid-cols-3 gap-4 p-6 bg-white rounded-md">
            {selectedPlan ? (
              <div className="grid grid-cols-12 col-span-3 gap-4">
                <p className="flex items-center justify-center w-full col-span-12 text-xl text-gray-400">
                  <span className="mx-2">Checkout</span>
                  <FaCartShopping />
                </p>
                <div className="col-span-6">
                  <Card
                    shadow={false}
                    className="h-full p-4 border border-gray-300 rounded-lg shadow-lg cols-span-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="border border-gray-200 p-2.5 rounded-lg">
                          <RiVipCrownFill />
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-bold"
                          >
                            {selectedPlan.name} - Cartão de Crédito
                          </Typography>
                          <Typography className="!text-gray-600 text-xs font-normal">
                            {selectedPlan.description}
                          </Typography>
                          <Typography className="!text-gray-600 text-xs font-normal">
                            <strong>Usuário:</strong> {user.name}
                          </Typography>
                          <Typography className="!text-gray-600 text-xs font-normal">
                            <strong>Email:</strong> {user.email}
                          </Typography>
                          <Typography className="!text-gray-600 text-xl font-normal mt-4">
                            <strong>Valor:</strong> R$
                            {(selectedPlan.price / 100).toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          variant="text"
                          className={`flex items-center gap-2 ${
                            paymentSuccess && "opacity-35"
                          }`}
                          onClick={() => setSelectedPlan(null)}
                          disabled={isLoading || paymentSuccess}
                        >
                          <BiSolidPencil className="w-4 h-4 text-gray-600" />
                          <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
                            Mudar Plano
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-span-6">
                  <SubscriptionForm
                    selectedPlan={selectedPlan}
                    handlePayment={(value) => setPaymentSuccess(value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="col-span-3 text-xl text-gray-400">
                  Seu plano ativo:
                  <Tag
                    color={subscriptionColorsmap[subscriptions.category]}
                    className="ml-2"
                  >
                    {subscriptions.category}
                  </Tag>
                </p>
                {plans.map((plan) => (
                  <SubscriptionCard
                    className="col-span-1"
                    key={plan.id}
                    title={plan.name}
                    description={plan.description}
                    price={(plan.price / 100).toFixed(2)}
                    benefits={plan.benefits}
                    handleSelect={() => setSelectedPlan(plan)}
                    disabled={plan.name.toLowerCase().includes(subscriptions.category.toLowerCase())}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </Elements>
    </div>
  );
};

export default Subscription;
