import dotenv from 'dotenv'

dotenv.config()

export default {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
        host: process.env.DB_HOST
    },
    mailgun: {
        apiKey: process.env.MAILGUN_KEY as string,
        domain: process.env.MAILGUN_DOMAIN as string,
        toEmail: process.env.MAILGUN_TO_EMAIL as string
    },
    stripe: {
        apiKey: process.env.STRIPE_API_KEY as string
    }
}