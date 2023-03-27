import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
// import connect from './database/conn.js';
// import router from './router/route.js';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

/** middlewares */
app.use(express.json());
app.use(cors(corsOptions));
// app.use(morgan('tiny'));
// app.disable('x-powered-by');

app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
});

app.listen(8080, () =>
  console.log('API is running on http://localhost:8080/login')
);
