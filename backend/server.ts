import express from 'express';
import rootRouter from './routes/index';
import cors from 'cors';
//import checkToken from './checkToken'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//app.use(checkToken);

app.get('/', (req, res) => {
    res.send('Welcome to TypeScript backend!');
});
app.use('/api/v1',rootRouter);

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}`);
});