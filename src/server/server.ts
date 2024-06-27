import express from 'express';
import cors from 'cors';
import routes from './routes'

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();
app.use(express.json());
app.use(cors());


if (isProduction) {
	app.use(express.static('public'));
}

// all our api routes
app.get('/api/health', (req, res) => res.status(200).json({message: 'server is running!'}))
app.use(routes)

// 404 fallback for client side routing
if (isProduction) {
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: 'public' });
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
