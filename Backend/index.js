import express from 'express';
import { config } from './config';

const PORT = config.port

const app = express();

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});