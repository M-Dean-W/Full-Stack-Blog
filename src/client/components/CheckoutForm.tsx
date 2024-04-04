// CheckoutForm
import React from 'react';
// PaymentElement is a combined input of a user's CC number, Expiration, and CVC
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { Button, Form, Container, Card } from 'react-bootstrap';


interface CheckoutFormProps { }

const CheckoutForm = (props: CheckoutFormProps) => {
    // Hook into our connected client-end stripe context provider
    const stripe = useStripe();

    // Hook into the individual element or elements they give us for CC info
    const elements = useElements();

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/thank-you`
            }
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            console.log(error.message);
        } else {
            console.log('An unexpected error occurred.');
        }
    };

    return (
        <Container>
            <Card className='m-4 bg-primary'>
            <Form onSubmit={handleCheckout}>
                <PaymentElement />
                <Button type='submit' variant='secondary'>Confirm Donation</Button>
            </Form>
            </Card>
        </Container>
    );
};

export default CheckoutForm;