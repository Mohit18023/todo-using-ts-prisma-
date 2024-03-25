import express from 'express';

const app = express();
const PORT = 


app.get('/', (req, res) => {
    res.send('Welcome to TypeScript backend!');
});


app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}`);
});