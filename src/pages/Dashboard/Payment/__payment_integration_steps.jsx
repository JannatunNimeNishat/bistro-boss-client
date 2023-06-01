/**steps
 * 1. install stripe and rect stripe js
 * 2. create a checkout form with card element (card element contains: card number, expiration date, cvs, zip code).
    checkoutForm.jsx is created by us and inside that page there is a <CardElement which is form react-stripe-github ->examples -> hooks -> 0-card-minimal.js 
 * 3. create account on stripe and get the publishable key PK 
 * 4. get card information (checkOut.jsx -> handleSubmit)
 * 5. create a payment method
 * 6. use test card to test payment
 * 7. on the server side: install stripe: npm install --save stripe
 * 8. create a payment intent api with payment method types: ['card']
 * make sure you provide amount in cents (multiply price by 100)
 * 9. call payment intent api to get client secret and store it in a state
 * 10. use confirmCardPayment api with client secret card info
 * 11. display confirm card error
 * 12. display confirm card success
 * 13. do things after payment
 * 
 * 
 * 



 * 






 */