import express from 'express';
import morgan from 'morgan';
import feedRoutes from './routes/feedRoutes'
import { setupSSE } from'./services/sseService'
import './services/redisSubscriber'

require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupSSE(app); // Setup SSE endpoint
app.use('/api', feedRoutes);

// ... other configurations

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`feed-service running on port ${PORT}`));

export default app;
