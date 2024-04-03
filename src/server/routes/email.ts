import { Router } from 'express'
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import config from '../config';

const mailgun = new Mailgun(FormData).client({
    username:'api',
    key: config.mailgun.apiKey
})

const router = Router();

//POST /api/email/
router.post('/', async (req,res) => {
    try {
        const newEmail = { ...req.body }
        const result = await mailgun.messages.create(config.mailgun.domain, {
            to: config.mailgun.toEmail,
            subject: newEmail.subject,
            from: newEmail.from,
            text: newEmail.message
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

export default router