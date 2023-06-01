import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";


const CheckoutForm = ({price}) => {

    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
        const {user} = useAuth()
    //sending price to server
    const [axiosSecure] = useAxiosSecure()
    //clientSecret
    const [clientSecret,setClientSecret]= useState('');

    useEffect(()=>{
        console.log(price);
        axiosSecure.post('/create-payment-intent', {price})
        .then(res =>{
            // this will give us a clientSecret. It comes from server 
            console.log("resposne: ",res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        //1. if stripe is not load or cart elements can not load then return
        if (!stripe || !elements) {
            return
        }

        //create a <CardElement reference
        const card = elements.getElement(CardElement)
        // console.log('card', card);
        //2. if the provided information is null then return
        if (card === null) {
            return;
        }

        //3. check the provided card information is valid or not
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
            console.log('error', error);
        }
        else {
            setCardError('')
            console.log('payment method', paymentMethod);
        }

        //confirm payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'unknown',
                  name:user?.displayName || 'anonymous'
                },
              },
            },
          );

          if(confirmError){
            console.log(confirmError);
            //setCardError('')

          }
          console.log(paymentIntent);
    }

    return (
        <>

            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* <button className="btn btn-outline btn-primary">Primary</button> */}
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {/* card error if card information is error */}
            {cardError && <p className="text-red-600 ml-8">{cardError}</p> }
        </>
    );
};

export default CheckoutForm; 