import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

//TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const [cart]= useCart()
    const total = cart.reduce((sum,item)=> sum + item.price,0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
            <SectionTitle subHeading='please provide' heading="payment"></SectionTitle>
            <h3 className="text-3xl">payment</h3>

            {/* stripe */}
            <Elements stripe={stripePromise}>

                <CheckoutForm price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;