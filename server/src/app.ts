import express from 'express';
import bodParser from 'body-parser';
import imageRouter from './routes/imageRouter';

const app = express();

app.use(bodParser.urlencoded({ extended: true }));
app.use(bodParser.json());
app.use('/image', imageRouter);

app.get('/', (req, res) => {
  res.send('Welcome To Backend, Let\'S Create Image');
});

export default app;
