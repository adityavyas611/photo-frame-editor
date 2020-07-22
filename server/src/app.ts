import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import imageRouter from './routes/imageRouter';

const app = express();

app.use(cors());
// setting body-parser's limit to parse upto 50mb size and parameter's length to 50000
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use('/image', imageRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome To Backend, Let\'S Merge Image');
});

export default app;
