import { Router } from 'express'
import Stripe from 'stripe';
import config from '../config';

const stripe = new Stripe(config.stripe.apiKey, {
    apiVersion: '2023-10-16',
    typescript: true
})

const router = Router();

//POST /api/donate/payment-intent
router.post('/payment-intent', async (req, res) => {
    
    try {
        const amount = req.body.amount;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // smallest unit of currency
            currency: 'USD'
        });
        res.json({
            msg: 'payment intent created',
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error', error });
    }
});

export default router;