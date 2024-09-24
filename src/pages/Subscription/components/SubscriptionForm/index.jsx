import { useMemo, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import bffService from "../../../../services/bff";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { setSubscription } from "../../../../store/reducers/user";

const useOptions = () => {
  const options = useMemo(
    () => ({
      showIcon: true,
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const inputClasses =
  "block p-2.5 px-3.5 text-base font-mono rounded-md bg-white border-2";

const SubscriptionForm = ({ selectedPlan, handlePayment }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      handlePayment(true);

      const paymentMethodRes = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

      console.log(paymentMethodRes);

      if (paymentMethodRes.error) {
        setError(paymentMethodRes.error.message);
        handlePayment(false);
        setLoading(false);
        return;
      }

      const { paymentMethod } = paymentMethodRes;

      const subscriptionData = {
        email: userEmail,
        paymentMethodId: paymentMethod.id,
        priceId: selectedPlan.id,
      };

      const response = await bffService.createSubscription(subscriptionData);
      const subscription = { category: response.planMapped, isActive: true };
      dispatch(setSubscription(subscription));

      const { clientSecret } = response;

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret
      );

      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
        handlePayment(false);
        return;
      }

      setSubscriptionSuccess(true);
      setLoading(false);
    } catch (error) {
      setError("Erro ao processar o pagamento");
      handlePayment(false);
      setLoading(false);
    }
  };

  return (
    <div>
      {subscriptionSuccess ? (
        <Result
          status="success"
          title={`${selectedPlan.name}`}
          subTitle="Sua assinatura foi realizada com sucesso. Os recursos serão disponibilizados em breve e os detalhes estarão disponíveis em seu perfil! Caso demore, realize login novamente."
          extra={[
            <Button type="primary" key="console">
              <Link to="/profile">Ir para seu perfil</Link>
            </Button>,
            <Button key="buy">
              <Link to="/products">Confira os produtos</Link>
            </Button>,
          ]}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid items-center justify-center grid-cols-2 gap-4 p-4 text-black bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <label className={`${loading && "text-gray-400"} col-span-2`}>
            Número do Cartão
            <CardNumberElement
              className={inputClasses}
              options={{ ...options, disabled: loading }}
            />
          </label>
          <label className={`${loading && "text-gray-400"} col-span-1`}>
            Data de expiração
            <CardExpiryElement
              className={inputClasses}
              options={{ ...options, disabled: loading }}
            />
          </label>
          <label className={`${loading && "text-gray-400"} col-span-1`}>
            CVC
            <CardCvcElement
              className={inputClasses}
              options={{ ...options, disabled: loading }}
            />
          </label>
          <Button
            htmlType="submit"
            type="submit"
            disabled={!stripe}
            className={`p-2 text-white bg-[#4773FF] rounded-md ${
              !loading &&
              "hover:brightness-90 hover:-translate-y-1 duration-200"
            }`}
            loading={loading}
          >
            Concluir Assinatura
          </Button>
        </form>
      )}
    </div>
  );
};

export default SubscriptionForm;
