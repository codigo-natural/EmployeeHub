import cors from 'cors';
import express from 'express';
import adminRouter from './Routes/AdminRoutes.js';
import { config } from './config/index.js';

const PORT = config.port

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', adminRouter)

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});