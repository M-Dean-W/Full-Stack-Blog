// SaveBones view
import React from 'react';
import { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fetchData } from '../services/fetchData';
import { Button, Form, Container, Card } from 'react-bootstrap';


interface SaveBonesProps { }

// load stripe with your public key
const stripePromise = loadStripe('pk_test_51P1yJ0KbzOjcZzb45kwOIrzO7tY6HHXyviOyyKRl5WImbe5ivKGC3KqxkRij1Rv6Jyy8pQGSyH4bbkOaEgxllqOf00Gfn656Bi');

const SaveBones = (props: SaveBonesProps) => {
    const [donation, setDonation] = useState({
        amount: '',
        show: true,
        clientSecret: ''
    });

    const handlePaymentIntent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/donate/payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: Number(donation.amount) })
            });

            if (!res.ok) {
                throw new Error('res failed')
            }
            const { clientSecret } = await res.json();

            setDonation(pre => ({ ...pre, clientSecret, show: false }));

        } catch (error) {
            console.log(error)
        }

    };

    if (donation.show) {
        return (
            <Container>
                <Card className='m-4 bg-primary'>
                <Card.Img variant="top" src="/images/Sad_Bones.jpg" />
                    <Form onSubmit={handlePaymentIntent}>
                        <Form.Group className="mb-3 mt-3" controlId="emailForm.ControlInput1">
                            <Form.Label style={{ fontSize: '1.5em' }}>How much you would like to donate:</Form.Label>
                            <Form.Control
                                className="input-group"
                                value={donation.amount}
                                onChange={e => setDonation(pre => ({ ...pre, amount: e.target.value }))} />
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                    </Form>
                </Card>
            </Container>
        );
    } else {
        return (
            <Elements stripe={stripePromise} options={{ clientSecret: donation.clientSecret }}>
                <CheckoutForm />
            </Elements>
        );
    }
};


export default SaveBones;