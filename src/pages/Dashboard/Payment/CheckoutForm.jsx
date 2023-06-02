import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

//this css file code is copyed from https://github.com/stripe/react-stripe-js/blob/master/examples/styles/common.css
import './CheckoutForm.css'


const CheckoutForm = ({ cart, price }) => {

    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const { user } = useAuth()
    //sending price to server
    const [axiosSecure] = useAxiosSecure()
    //clientSecret
    const [clientSecret, setClientSecret] = useState('');

    // 
    const [processing, setProcessing] = useState(false)

    //
    const [transactionId, setTransactionId] = useState('')


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // this will give us a clientSecret. It comes from server 
                    console.log("resposne: ", res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
        // },[])
    }, [price, axiosSecure])

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
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
            //setCardError('')

        }

        console.log('payment intent', paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {

            setTransactionId(paymentIntent.id)
            //save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                data: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                status: 'service pending',
                itemsName: cart.map(item => item.name)
            }

            //sending data using axiosSecure
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        //display confirm sweet alert 2

                    }
                })

        }
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
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {/* card error if card information is error */}
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm; 